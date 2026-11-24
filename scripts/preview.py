import hashlib
import json
import math
import re
import sqlite3
import time
import uuid
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
MEMBERS = json.loads((ROOT / "server" / "members.json").read_text(encoding="utf-8"))

db = sqlite3.connect(":memory:", check_same_thread=False)
db.row_factory = sqlite3.Row
schema = (ROOT / "drizzle" / "0000_qr_attendance.sql").read_text(encoding="utf-8")
for stmt in schema.split("--> statement-breakpoint"):
    if stmt.strip():
        db.execute(stmt)
db.commit()


def sha256(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def valid_number(value, min_v, max_v) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value) and min_v <= value <= max_v


def distance_meters(a, b, c, d) -> float:
    rad = math.pi / 180.0
    h = math.sin((c - a) * rad / 2) ** 2 + math.cos(a * rad) * math.cos(c * rad) * math.sin((d - b) * rad / 2) ** 2
    return 6371000 * 2 * math.atan2(math.sqrt(min(1.0, h)), math.sqrt(max(0.0, 1.0 - h)))


def public_event(row) -> dict:
    d = dict(row)
    d.pop("owner_hash", None)
    d.pop("token", None)
    return d


def check_token(event, token, now_ms):
    if not token or token != event["token"]:
        return ("Mã QR đã đổi hoặc không hợp lệ. Hãy quét mã mới.", 403, {})
    if event["closed"]:
        return ("Đoàn phường, xã đã đóng điểm danh.", 410, {})
    if now_ms < event["starts_at"]:
        return ("Buổi điểm danh chưa đến giờ mở.", 409, {})
    if now_ms > event["ends_at"] or now_ms > event["expires_at"]:
        return ("Mã QR đã hết hạn. Nhờ cán bộ Đoàn phường, xã tạo mã mới.", 410, {})
    return None


def check_position(event, pos, now_ms):
    if (
        not isinstance(pos, dict)
        or not valid_number(pos.get("latitude"), -90, 90)
        or not valid_number(pos.get("longitude"), -180, 180)
        or not valid_number(pos.get("accuracy"), 0, 100000)
        or not valid_number(pos.get("timestamp"), now_ms - 90000, now_ms + 30000)
    ):
        return None, ("Vị trí đã cũ hoặc không hợp lệ. Hãy lấy lại GPS.", 400, {})
    dist = distance_meters(event["latitude"], event["longitude"], pos["latitude"], pos["longitude"])
    result = {"distance": round(dist), "accuracy": math.ceil(pos["accuracy"]), "radius": event["radius"]}
    if dist > event["radius"]:
        return None, ("Bạn chưa được xác định nằm trong phạm vi sự kiện. Hãy di chuyển gần địa điểm hơn.", 422, result)
    return result, None


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST), **kwargs)

    def send_json(self, body: dict, status: int = 200):
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        if length > 12000:
            return None, ("Nội dung gửi quá dài.", 400)
        raw = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            return json.loads(raw), None
        except Exception:
            return None, ("Dữ liệu gửi không hợp lệ.", 400)

    def do_GET(self):
        parsed = urlparse(self.path)
        if not parsed.path.startswith("/api/"):
            return super().do_GET()
        if parsed.path == "/api/health":
            return self.send_json({"ready": True})
        m = re.match(r"^/api/events/([a-f0-9-]{36})(?:/(admin))?$", parsed.path)
        if not m:
            return self.send_json({"error": "Không tìm thấy chức năng."}, 404)
        event_id, action = m.group(1), m.group(2)
        event = db.execute("SELECT * FROM qr_events WHERE id=?", (event_id,)).fetchone()
        if not event:
            return self.send_json({"error": "Sự kiện không tồn tại. Kiểm tra lại mã QR."}, 404)
        if action == "admin":
            key = self.headers.get("X-Organizer-Key", "")
            if not re.match(r"^[a-f0-9]{64}$", key) or sha256(key) != event["owner_hash"]:
                return self.send_json({"error": "Thiết bị này không có quyền quản lý sự kiện."}, 403)
            rows = db.execute(
                "SELECT member_id,member_name,checked_at,distance_m,accuracy_m FROM qr_attendance WHERE event_id=? ORDER BY checked_at DESC",
                (event_id,),
            ).fetchall()
            return self.send_json({"event": public_event(event), "token": event["token"], "attendees": [dict(r) for r in rows]})
        err = check_token(event, self.headers.get("X-QR-Token", ""), int(time.time() * 1000))
        if err:
            return self.send_json({"error": err[0], **err[2]}, err[1])
        return self.send_json({"event": public_event(event)})

    def do_POST(self):
        parsed = urlparse(self.path)
        if not parsed.path.startswith("/api/"):
            return self.send_json({"error": "Không tìm thấy chức năng."}, 404)
        now = int(time.time() * 1000)
        if parsed.path == "/api/events":
            inp, err = self.read_json()
            if err:
                return self.send_json({"error": err[0]}, err[1])
            owner_key = self.headers.get("X-Organizer-Key", "")
            event_id = inp.get("id", "")
            if not re.match(r"^[a-f0-9]{64}$", owner_key) or not re.match(r"^[a-f0-9-]{36}$", str(event_id)):
                return self.send_json({"error": "Phiên tạo QR không hợp lệ."}, 400)
            title = inp.get("title")
            place = inp.get("place")
            if not isinstance(title, str) or not title.strip() or len(title) > 120 or not isinstance(place, str) or not place.strip() or len(place) > 180:
                return self.send_json({"error": "Nhập tên sự kiện và địa điểm."}, 400)
            if not valid_number(inp.get("latitude"), -90, 90) or not valid_number(inp.get("longitude"), -180, 180) or not valid_number(inp.get("radius"), 25, 1000):
                return self.send_json({"error": "Kiểm tra tọa độ và bán kính 25–1000 m."}, 400)
            starts_at = inp.get("startsAt")
            ends_at = inp.get("endsAt")
            if not valid_number(starts_at, now - 86400000, now + 31536000000) or not valid_number(ends_at, starts_at + 60000, starts_at + 86400000) or ends_at <= now:
                return self.send_json({"error": "Thời gian kết thúc phải ở tương lai, sau giờ bắt đầu và trong vòng 24 giờ."}, 400)
            owner_hash = sha256(owner_key)
            old = db.execute("SELECT * FROM qr_events WHERE id=?", (event_id,)).fetchone()
            if old:
                if old["owner_hash"] != owner_hash:
                    return self.send_json({"error": "Không có quyền quản lý sự kiện."}, 403)
                return self.send_json({"event": public_event(old), "token": old["token"]})
            token = uuid.uuid4().hex
            expires = min(max(now, int(starts_at)) + 15 * 60000, int(ends_at))
            db.execute(
                "INSERT OR IGNORE INTO qr_events (id,title,place,latitude,longitude,radius,starts_at,ends_at,expires_at,token,owner_hash,closed,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,0,?)",
                (event_id, title.strip(), place.strip(), inp["latitude"], inp["longitude"], inp["radius"], int(starts_at), int(ends_at), expires, token, owner_hash, now),
            )
            db.commit()
            created = db.execute("SELECT * FROM qr_events WHERE id=?", (event_id,)).fetchone()
            return self.send_json({"event": public_event(created), "token": created["token"]}, 201)

        m = re.match(r"^/api/events/([a-f0-9-]{36})/(rotate|close|attendance)$", parsed.path)
        if not m:
            return self.send_json({"error": "Không tìm thấy chức năng."}, 404)
        event_id, action = m.group(1), m.group(2)
        event = db.execute("SELECT * FROM qr_events WHERE id=?", (event_id,)).fetchone()
        if not event:
            return self.send_json({"error": "Sự kiện không tồn tại. Kiểm tra lại mã QR."}, 404)

        if action in ("rotate", "close"):
            key = self.headers.get("X-Organizer-Key", "")
            if not re.match(r"^[a-f0-9]{64}$", key) or sha256(key) != event["owner_hash"]:
                return self.send_json({"error": "Thiết bị này không có quyền quản lý sự kiện."}, 403)
            if action == "rotate":
                if event["closed"] or event["ends_at"] <= now:
                    return self.send_json({"error": "Sự kiện đã kết thúc điểm danh."}, 410)
                token = uuid.uuid4().hex
                expires = min(max(now, event["starts_at"]) + 15 * 60000, event["ends_at"])
                db.execute("UPDATE qr_events SET token=?,expires_at=? WHERE id=? AND closed=0", (token, expires, event_id))
            else:
                db.execute("UPDATE qr_events SET closed=1 WHERE id=?", (event_id,))
            db.commit()
            updated = db.execute("SELECT * FROM qr_events WHERE id=?", (event_id,)).fetchone()
            rows = db.execute(
                "SELECT member_id,member_name,checked_at,distance_m,accuracy_m FROM qr_attendance WHERE event_id=? ORDER BY checked_at DESC",
                (event_id,),
            ).fetchall()
            return self.send_json({"event": public_event(updated), "token": updated["token"], "attendees": [dict(r) for r in rows]})

        if action == "attendance":
            inp, err = self.read_json()
            if err:
                return self.send_json({"error": err[0]}, err[1])
            tok_err = check_token(event, inp.get("token"), now)
            if tok_err:
                return self.send_json({"error": tok_err[0], **tok_err[2]}, tok_err[1])
            member_id = inp.get("memberId")
            if not isinstance(member_id, int) or isinstance(member_id, bool) or not (1 <= member_id <= len(MEMBERS)):
                return self.send_json({"error": "Chọn tài khoản đoàn viên thử nghiệm."}, 400)
            member_name = MEMBERS[member_id - 1]
            gps, pos_err = check_position(event, inp.get("position"), now)
            if pos_err:
                return self.send_json({"error": pos_err[0], **pos_err[2]}, pos_err[1])
            db.execute(
                "INSERT OR IGNORE INTO qr_attendance (event_id,member_id,member_name,checked_at,distance_m,accuracy_m) SELECT id,?,?,?,?,? FROM qr_events WHERE id=? AND closed=0 AND token=? AND starts_at<=? AND ends_at>=? AND expires_at>=?",
                (member_id, member_name, now, gps["distance"], gps["accuracy"], event_id, inp.get("token"), now, now, now),
            )
            db.commit()
            receipt = db.execute("SELECT member_id,member_name,checked_at,distance_m,accuracy_m FROM qr_attendance WHERE event_id=? AND member_id=?", (event_id, member_id)).fetchone()
            if not receipt:
                return self.send_json({"error": "QR vừa thay đổi hoặc điểm danh đã đóng. Vui lòng quét lại."}, 409)
            return self.send_json({"receipt": dict(receipt), "event": public_event(event)})


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 8766), Handler)
    print("Preview running at http://0.0.0.0:8766", flush=True)
    server.serve_forever()
