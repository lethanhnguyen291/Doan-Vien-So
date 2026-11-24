
function json(body, status = 200) {
  return Response.json(body, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
function fail(message, status = 400, extra = {}) {
  throw Object.assign(new Error(message), {status, extra});
}
async function bodyOf(request) {
  const raw = await request.text();
  if (raw.length > 12000) fail('Nội dung gửi quá dài.');
  try { return JSON.parse(raw); } catch { fail('Dữ liệu gửi không hợp lệ.'); }
}
async function hash(value) {
  const bytes = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), x=>x.toString(16).padStart(2,'0')).join('');
}
export function distanceMeters(a,b,c,d) {
  const rad = Math.PI / 180;
  const h = Math.sin((c-a)*rad/2)**2 + Math.cos(a*rad)*Math.cos(c*rad)*Math.sin((d-b)*rad/2)**2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(Math.min(1,h)),Math.sqrt(Math.max(0,1-h)));
}
function validNumber(value,min,max) { return typeof value==='number' && Number.isFinite(value) && value>=min && value<=max; }
export function checkPosition(event, position, now=Date.now()) {
  if (!position || !validNumber(position.latitude,-90,90) || !validNumber(position.longitude,-180,180) ||
      !validNumber(position.accuracy,0,100000) || !validNumber(position.timestamp,now-90000,now+30000)) {
    fail('Vị trí đã cũ hoặc không hợp lệ. Hãy lấy lại GPS.');
  }
  const distance = distanceMeters(event.latitude,event.longitude,position.latitude,position.longitude);
  const result = {distance:Math.round(distance),accuracy:Math.ceil(position.accuracy),radius:event.radius};
  if (distance > event.radius) fail('Bạn chưa được xác định nằm trong phạm vi sự kiện. Hãy di chuyển gần địa điểm hơn.',422,result);
  return result;
}
function publicEvent(event) {
  const {owner_hash,token,...visible}=event;
  return visible;
}
function checkToken(event,token,now=Date.now()) {
  if (!token || token !== event.token) fail('Mã QR đã đổi hoặc không hợp lệ. Hãy quét mã mới.',403);
  if(event.closed) fail('Đoàn phường, xã đã đóng điểm danh.',410);
  if(now<event.starts_at) fail('Buổi điểm danh chưa đến giờ mở.',409);
  if(now>event.ends_at || now>event.expires_at) fail('Mã QR đã hết hạn. Nhờ cán bộ Đoàn phường, xã tạo mã mới.',410);
}
export default {
  async fetch(request,env) {
    try {
      const url = new URL(request.url);
      if(!url.pathname.startsWith('/api/')) {
        const asset = STATIC_ASSETS[url.pathname==='/'?'/index.html':url.pathname];
        if(!asset) return new Response('Không tìm thấy trang',{status:404});
        return new Response(request.method==='HEAD'?null:asset.content,{headers:{
          'Content-Type':asset.type,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff',
          'Referrer-Policy':'no-referrer','Permissions-Policy':'geolocation=(self), camera=(self)'
        }});
      }
      if(!env.DB) fail('Dữ liệu điểm danh chưa sẵn sàng. Vui lòng thử lại.',503);
      const origin=request.headers.get('Origin');
      if(origin && origin!==url.origin) fail('Nguồn yêu cầu không hợp lệ.',403);
      const db=env.DB;
      if(url.pathname==='/api/health') return json({ready:true});
      if(url.pathname==='/api/events' && request.method==='POST') {
        const input=await bodyOf(request), now=Date.now();
        const ownerKey=request.headers.get('X-Organizer-Key')||'';
        if(!/^[a-f0-9]{64}$/.test(ownerKey) || !/^[a-f0-9-]{36}$/.test(input.id||'')) fail('Phiên tạo QR không hợp lệ.');
        if(typeof input.title!=='string'||!input.title.trim()||input.title.length>120 ||
           typeof input.place!=='string'||!input.place.trim()||input.place.length>180) fail('Nhập tên sự kiện và địa điểm.');
        if(!validNumber(input.latitude,-90,90)||!validNumber(input.longitude,-180,180)||
           !validNumber(input.radius,25,1000)) fail('Kiểm tra tọa độ và bán kính 25–1000 m.');
        if(!validNumber(input.startsAt,now-86400000,now+31536000000) ||
           !validNumber(input.endsAt,input.startsAt+60000,input.startsAt+86400000) || input.endsAt<=now) fail('Thời gian kết thúc phải ở tương lai, sau giờ bắt đầu và trong vòng 24 giờ.');
        const ownerHash=await hash(ownerKey);
        const old=await db.prepare('SELECT * FROM qr_events WHERE id=?').bind(input.id).first();
        if(old) {
          if(old.owner_hash!==ownerHash) fail('Không có quyền quản lý sự kiện.',403);
          return json({event:publicEvent(old),token:old.token});
        }
        const token=crypto.randomUUID().replaceAll('-','');
        const expires=Math.min(Math.max(now,input.startsAt)+15*60000,input.endsAt);
        await db.prepare('INSERT OR IGNORE INTO qr_events (id,title,place,latitude,longitude,radius,starts_at,ends_at,expires_at,token,owner_hash,closed,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,0,?)')
          .bind(input.id,input.title.trim(),input.place.trim(),input.latitude,input.longitude,input.radius,input.startsAt,input.endsAt,expires,token,ownerHash,now).run();
        const created=await db.prepare('SELECT * FROM qr_events WHERE id=?').bind(input.id).first();
        if(created.owner_hash!==ownerHash) fail('Không có quyền quản lý sự kiện.',403);
        return json({event:publicEvent(created),token:created.token},201);
      }
      const route=url.pathname.match(/^\/api\/events\/([a-f0-9-]{36})(?:\/(admin|rotate|close|attendance))?$/);
      if(!route) fail('Không tìm thấy chức năng.',404);
      const [,id,action]=route;
      const event=await db.prepare('SELECT * FROM qr_events WHERE id=?').bind(id).first();
      if(!event) fail('Sự kiện không tồn tại. Kiểm tra lại mã QR.',404);
      if(['admin','rotate','close'].includes(action)) {
        const key=request.headers.get('X-Organizer-Key')||'';
        if(!/^[a-f0-9]{64}$/.test(key)||await hash(key)!==event.owner_hash) fail('Thiết bị này không có quyền quản lý sự kiện.',403);
        if(action==='rotate' && request.method==='POST') {
          if(event.closed||event.ends_at<=Date.now()) fail('Sự kiện đã kết thúc điểm danh.',410);
          const token=crypto.randomUUID().replaceAll('-','');
          const expires=Math.min(Math.max(Date.now(),event.starts_at)+15*60000,event.ends_at);
          await db.prepare('UPDATE qr_events SET token=?,expires_at=? WHERE id=? AND closed=0').bind(token,expires,id).run();
        } else if(action==='close' && request.method==='POST') {
          await db.prepare('UPDATE qr_events SET closed=1 WHERE id=?').bind(id).run();
        } else if(action!=='admin'||request.method!=='GET') fail('Thao tác không hợp lệ.',405);
        const updated=await db.prepare('SELECT * FROM qr_events WHERE id=?').bind(id).first();
        const rows=await db.prepare('SELECT member_id,member_name,checked_at,distance_m,accuracy_m FROM qr_attendance WHERE event_id=? ORDER BY checked_at DESC').bind(id).all();
        return json({event:publicEvent(updated),token:updated.token,attendees:rows.results});
      }
      if(!action && request.method==='GET') {
        checkToken(event,request.headers.get('X-QR-Token'));
        return json({event:publicEvent(event)});
      }
      if(action==='attendance' && request.method==='POST') {
        const input=await bodyOf(request),now=Date.now();
        checkToken(event,input.token,now);
        const member=MEMBER_NAMES[input.memberId-1];
        if(!Number.isInteger(input.memberId)||!member) fail('Chọn tài khoản đoàn viên thử nghiệm.');
        const gps=checkPosition(event,input.position,now);
        // The conditional insert rechecks QR/time/closure and the unique key prevents retry duplicates.
        await db.prepare('INSERT OR IGNORE INTO qr_attendance (event_id,member_id,member_name,checked_at,distance_m,accuracy_m) SELECT id,?,?,?,?,? FROM qr_events WHERE id=? AND closed=0 AND token=? AND starts_at<=? AND ends_at>=? AND expires_at>=?')
          .bind(input.memberId,member,now,gps.distance,gps.accuracy,id,input.token,now,now,now).run();
        const receipt=await db.prepare('SELECT member_id,member_name,checked_at,distance_m,accuracy_m FROM qr_attendance WHERE event_id=? AND member_id=?').bind(id,input.memberId).first();
        if(!receipt) fail('QR vừa thay đổi hoặc điểm danh đã đóng. Vui lòng quét lại.',409);
        return json({receipt,event:publicEvent(event)});
      }
      fail('Thao tác không được hỗ trợ.',405);
    } catch(error) {
      if(error.status) return json({error:error.message,...error.extra},error.status);
      console.error('Attendance request failed',error.name);
      return json({error:'Chưa lưu được kết quả. Vui lòng thử lại khi có mạng.'},500);
    }
  }
};
