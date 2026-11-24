
    // Dữ liệu giả lập chuẩn theo Đề 1 (TP. Đồng Nai)
    const state = {
      role: 'login',
      selectedLoginRole: 'bithu',
      tab: 'home',
      offline: false,
      offlineQueue: [],
      memberFilter: 'all',
      memberSearch: '',
      reportMonth: '10/2026',
      qrExpiredDemo: false,
      activeSession: {
        id: 'SH-2026-11',
        title: 'Sinh hoạt Chi đoàn tháng 11: Chuyển đổi số cơ sở',
        date: '28/11/2026',
        time: '19:00 – 20:30',
        location: 'Nhà văn hóa Khu phố 5, P. Trấn Biên',
        allowMakeup: true,
        code: 'DVS-KP5-241126',
        attended: 0,
        totalLocal: 31,
        totalMembers: 46,
        minutesLeft: 14
      },
      pastSessions: [
        { label: 'Tháng 8', count: 28, pct: 61 },
        { label: 'Tháng 9', count: 19, pct: 41 },
        { label: 'Tháng 10', count: 33, pct: 72 }
      ],
      members: [
        { id: 1, name: 'Nguyễn Minh Tuấn', status: 'local', role: 'Bí thư chi đoàn', job: 'Nhân viên kỹ thuật', phone: '0901 234 501', attended: 3, points: 96 },
        { id: 2, name: 'Trần Thị Lan Anh', status: 'local', role: 'Đoàn viên', job: 'Công nhân KCN Amata (Ca 2)', phone: '0901 234 502', attended: 3, points: 85 },
        { id: 3, name: 'Phạm Quốc Bảo', status: 'local', role: 'Phó Bí thư', job: 'Giáo viên tiểu học', phone: '0901 234 503', attended: 3, points: 92 },
        { id: 4, name: 'Lê Văn Hùng', status: 'local', role: 'Đoàn viên', job: 'Công nhân KCN Biên Hòa 2 (Ca 1)', phone: '0901 234 504', attended: 2, points: 74 },
        { id: 5, name: 'Võ Thị Thu Hà', status: 'local', role: 'Đoàn viên', job: 'Sinh viên ĐH Đồng Nai', phone: '0901 234 505', attended: 3, points: 88 },
        { id: 6, name: 'Đặng Hoàng Phúc', status: 'far', role: 'Đoàn viên', job: 'Làm việc tại TP.HCM (Thủ Đức)', phone: '0901 234 506', attended: 1, points: 55 },
        { id: 7, name: 'Nguyễn Thị Mỹ Duyên', status: 'far', role: 'Đoàn viên', job: 'Công nhân tại Bình Dương', phone: '0901 234 507', attended: 1, points: 60 },
        { id: 8, name: 'Huỳnh Tấn Phát', status: 'far', role: 'Đoàn viên', job: 'Kỹ sư công trình Long Thành', phone: '0901 234 508', attended: 2, points: 68 },
        { id: 9, name: 'Bùi Ngọc Trâm', status: 'transfer', role: 'Đoàn viên', job: 'Đang làm hồ sơ chuyển về P. Tân Phong', phone: '0901 234 509', attended: 1, points: 50 },
        { id: 10, name: 'Trương Minh Khoa', status: 'transfer', role: 'Đoàn viên', job: 'Chuyển sinh hoạt sang Đoàn trường CĐ', phone: '0901 234 510', attended: 0, points: 45 }
      ],
      memberCounts: { all: 46, local: 31, far: 12, transfer: 3 },
      workerProfile: {
        name: 'Trần Thị Lan Anh',
        unit: 'Chi đoàn Khu phố 5',
        shift: 'Ca 2 (14:00 – 22:00) • KCN Amata',
        checkedInCurrent: false,
        points: 85,
        rank: 3,
        reminders: { before24h: true, before1h: true, zalo: true },
        bookedMakeup: null,
        history: [
          { title: 'Sinh hoạt tháng 10: Thanh niên xung kích', date: '25/10/2026', mode: 'Sinh hoạt bù (Chủ nhật)', points: '+10đ' },
          { title: 'Sinh hoạt tháng 9: An toàn giao thông', date: '27/09/2026', mode: 'Quét QR trực tiếp', points: '+10đ' },
          { title: 'Sinh hoạt tháng 8: Ngày hội chuyển đổi số', date: '23/08/2026', mode: 'Quét QR trực tiếp', points: '+15đ' }
        ],
        volunteerEvents: [
          { id: 'v1', title: 'Ngày Chủ nhật Xanh – Dọn tuyến đường KP5', date: '06/12/2026 (07:00)', points: 15, joined: false },
          { id: 'v2', title: 'Tổ công nghệ số cộng đồng hỗ trợ người cao tuổi', date: '13/12/2026 (08:00)', points: 20, joined: true }
        ]
      },
      makeupSlots: [
        { id: 'm1', label: 'Sáng Chủ nhật (29/11) • 08:30 – 09:30', format: 'Trực tiếp tại Nhà văn hóa KP5', seats: '8/15 chỗ' },
        { id: 'm2', label: 'Sáng thứ Hai (30/11) • 09:00 – 10:00', format: 'Trực tiếp • Dành cho công nhân Ca 2 & Ca 3', seats: '11/20 chỗ' },
        { id: 'm3', label: 'Tối thứ Hai (30/11) • 21:00 – 21:20', format: 'Trực tuyến • Theo lịch của chi đoàn', seats: 'Không giới hạn' }
      ],
      wardUnits: [
        { name: 'Chi đoàn Khu phố 1', total: 52, attended: 45, rate: 87, submitted: true },
        { name: 'Chi đoàn Khu phố 2', total: 38, attended: 31, rate: 82, submitted: true },
        { name: 'Chi đoàn Khu phố 3', total: 44, attended: 26, rate: 59, submitted: true },
        { name: 'Chi đoàn Khu phố 4', total: 41, attended: 32, rate: 78, submitted: true },
        { name: 'Chi đoàn Khu phố 5', total: 46, attended: 33, rate: 72, submitted: true },
        { name: 'Chi đoàn Khu phố 6', total: 35, attended: 21, rate: 60, submitted: false }
      ]
    };


const storageKey = 'doan-vien-so-demo-v1';
const seededNames = ['Nguyễn Hoài An','Trần Minh Anh','Lê Gia Bảo','Phạm Ngọc Bích','Võ Minh Châu','Đặng Quốc Dũng','Bùi Thanh Duy','Hoàng Minh Đức','Ngô Ngọc Hà','Đỗ Thu Hằng','Huỳnh Quốc Huy','Nguyễn Trung Kiên','Trần Ngọc Lan','Lê Minh Long','Phạm Bảo Minh','Võ Hồng Ngân','Đặng Thành Nhân','Bùi Quỳnh Như','Hoàng Hải Phong','Ngô Minh Phúc','Đỗ Thanh Phương','Huỳnh Ngọc Quỳnh','Nguyễn Anh Quân','Trần Ngọc Sơn','Lê Bảo Thảo','Phạm Thanh Thư','Võ Quốc Tiến','Đặng Bích Trâm','Bùi Anh Tú','Hoàng Thanh Tùng','Ngô Mỹ Uyên','Đỗ Quốc Việt','Huỳnh Minh Vũ','Nguyễn Hải Yến','Trần Ngọc Ánh','Lê Đức Thành'];
seededNames.forEach((name, index) => {
  const status = index < 26 ? 'local' : index < 35 ? 'far' : 'transfer';
  state.members.push({id:index + 11,name,status,role:'Đoàn viên',job:status === 'local' ? 'Sinh hoạt tại Khu phố 5' : status === 'far' ? 'Đang làm việc xa địa phương' : 'Đang chuyển sinh hoạt',attended:index % 4,points:40 + index});
});
state.makeupSlots[0].used = 8; state.makeupSlots[0].capacity = 15;
state.makeupSlots[1].used = 11; state.makeupSlots[1].capacity = 20;
state.makeupSlots[2].used = 0; state.makeupSlots[2].capacity = null;
state.activeSession.checkedMemberIds = [];
state.workerProfile.pending = false;
state.workerProfile.expectedPoints = 20;
state.noEventsDemo = false;
const initialState = JSON.stringify(state);
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (saved && saved.version === 1 && Array.isArray(saved.state.members) && saved.state.members.length === 46) {
    Object.assign(state, saved.state);
    state.memberSearch = '';
  }
} catch { storageAvailable = false; }
let toastTimer;
let modalTrigger;
let rosterFocus;
const namesByRole = {bithu:'Nguyễn Minh Tuấn',doanvien:'Trần Thị Lan Anh',doanxa:'Lê Hoàng Nam'};
const statusLabels = {local:'Tại chỗ',far:'Đi làm xa',transfer:'Chuyển SH'};
const icons = {
home:'<path d="m3 10 9-7 9 7v10H15v-7H9v7H3z"/>',
users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18M7 15h3M14 15h3"/>',
qr:'<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><path d="M15 15h3v3h3v3h-6v-3M21 15v-3M12 3v9H3M12 21v-6"/>',
chart:'<path d="M4 20h17M7 16v-5M12 16V4M17 16V8"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
check:'<path d="m5 12 4 4L19 6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
close:'<path d="m6 6 12 12M18 6 6 18"/>',
search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
alert:'<path d="m12 3 10 18H2zM12 9v5M12 17v1"/>',
wifi:'<path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 16a5 5 0 0 1 6 0M12 20h.01"/>'
};
function icon(name) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icons[name] || icons.calendar) + '</svg>'; }
function esc(value) { return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character])); }
function initials(name) { return name.split(' ').slice(-2).map(word => word[0]).join(''); }
function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify({version:1,state})); }
  catch { storageAvailable = false; }
}
function showToast(message) {
  const box = document.getElementById('toastBox');
  box.textContent = message;
  box.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove('show'), 4200);
}
function openModal(content) {
  modalTrigger = document.activeElement;
  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('modalOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  document.getElementById('screenBody').inert = true;
  document.getElementById('bottomNav').inert = true;
  document.querySelector('#modalContent button, #modalContent input')?.focus();
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('screenBody').inert = false;
  document.getElementById('bottomNav').inert = false;
  modalTrigger?.isConnected && modalTrigger.focus();
}
function modalTitle(title) { return '<div class="modal-top"><h2>' + esc(title) + '</h2><button class="icon-btn" onclick="closeModal()" aria-label="Đóng">' + icon('close') + '</button></div>'; }
document.addEventListener('keydown', event => {
  if (!document.getElementById('modalOverlay').classList.contains('show')) return;
  if (event.key === 'Escape') closeModal();
  if (event.key !== 'Tab') return;
  const buttons = [...document.querySelectorAll('#modalContent button:not(:disabled), #modalContent a, #modalContent input, #modalContent select')];
  const first = buttons[0], last = buttons[buttons.length-1];
  if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
  else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
});
function switchRole(role) {
  closeModal();
  state.role = role;
  state.tab = {login:'login',bithu:'home',doanvien:'scan',doanxa:'dashboard'}[role];
  state.memberSearch = ''; state.memberFilter = 'all'; state.qrExpiredDemo = false;
  render(); window.scrollTo(0,0);
}
function selectLoginRole(role) { state.selectedLoginRole = role; render(); }
function doLogin() { switchRole(state.selectedLoginRole); }
function setTab(tab) {
  state.tab = tab;
  render(); window.scrollTo(0,0);
}
function topbar() {
  return '<header class="topbar"><div class="brand"><span class="brand-mark">đ</span>Đoàn viên số</div><div class="topbar-actions"><span class="demo-tag">Bản trải nghiệm</span><button class="icon-btn" onclick="openDemoMenu()" aria-label="Mở tùy chọn">' + icon('more') + '</button></div></header>';
}
function pageHeading(eyebrow, title, description, avatar) {
  return topbar() + '<div class="page-heading"><div><div class="eyebrow">' + esc(eyebrow) + '</div><h1>' + esc(title) + '</h1><p>' + esc(description) + '</p></div>' + (avatar ? '<span class="avatar">' + esc(avatar) + '</span>' : '') + '</div>';
}
function setNavigation(items) {
  const nav = document.getElementById('bottomNav');
  nav.style.display = items.length ? 'flex' : 'none';
  nav.innerHTML = items.map(item => '<button class="nav-item ' + (state.tab === item[0] ? 'active' : '') + '" onclick="setTab(\'' + item[0] + '\')" ' + (state.tab === item[0] ? 'aria-current="page"' : '') + '>' + icon(item[2]) + '<span>' + item[1] + '</span></button>').join('');
}
function openDemoMenu() {
  openModal(modalTitle('Tùy chọn trải nghiệm') + '<p class="hint" style="margin-bottom:18px">Dữ liệu minh họa được lưu trên trình duyệt này. QR và GPS dùng dữ liệu chung. Đăng nhập và nhắc lịch đang dùng dữ liệu mẫu.</p><div class="stack" style="gap:10px"><button class="btn btn-soft full" onclick="switchRole(\'login\')">Chọn vai trò khác</button><button class="btn btn-secondary full" onclick="closeModal();toggleOffline()">' + (state.offline ? 'Kết thúc thử mất mạng' : 'Thử tình huống mất mạng') + '</button><button class="btn btn-secondary full" onclick="closeModal();state.noEventsDemo=!state.noEventsDemo;switchRole(\'bithu\')">' + (state.noEventsDemo ? 'Hiện lại lịch sinh hoạt' : 'Thử trạng thái chưa có lịch') + '</button><button class="btn btn-danger full" onclick="confirmReset()">Đặt lại dữ liệu mẫu</button></div>');
}
function confirmReset() {
  openModal(modalTitle('Đặt lại dữ liệu mẫu?') + '<p class="muted" style="margin-bottom:22px">Các buổi tạo thêm, lượt điểm danh và lịch đã chọn trên thiết bị này sẽ được thay bằng dữ liệu ban đầu.</p><div class="button-row"><button class="btn btn-secondary" onclick="closeModal()">Giữ dữ liệu</button><button class="btn btn-primary" onclick="resetDemo()">Đặt lại</button></div>');
}
function resetDemo() { Object.assign(state, JSON.parse(initialState)); closeModal(); render(); showToast('Đã khôi phục dữ liệu mẫu.'); }
function toggleOffline() {
  state.offline = !state.offline;
  if (!state.offline && state.offlineQueue.length) {
    const hasCurrent = state.offlineQueue.some(item => item.sessionId === state.activeSession.id);
    state.offlineQueue = []; state.workerProfile.pending = false;
    if (hasCurrent && !state.workerProfile.checkedInCurrent) recordWorkerCheckin();
    showToast('Đã xác nhận lượt điểm danh mẫu đang chờ.');
  } else showToast(state.offline ? 'Đang thử mất mạng. Bạn có thể thử điểm danh.' : 'Đã kết thúc tình huống mất mạng.');
  render();
}
function createSessionSubmit(event) {
  event.preventDefault();
  const form = event.target;
  if (!form.reportValidity()) return;
  const date = form.elements.sessionDate.value;
  state.activeSession = {
    ...state.activeSession, id:'SH-' + Date.now(), title:form.elements.sessionTitle.value.trim(),
    date:date.split('-').reverse().join('/'),time:form.elements.sessionTime.value,
    location:form.elements.sessionLocation.value.trim(),allowMakeup:form.elements.allowMakeup.checked,
    code:'DVS-KP5-' + Math.floor(100000 + Math.random()*900000),attended:0,checkedMemberIds:[]
  };
  if (!state.activeSession.title || !state.activeSession.location) { showToast('Vui lòng nhập tên buổi và địa điểm.'); return; }
  state.workerProfile.checkedInCurrent = false;
  state.workerProfile.pending = false; state.workerProfile.bookedMakeup = null;
  state.offlineQueue = []; state.noEventsDemo = false;
  closeModal(); render(); showToast('Đã tạo buổi sinh hoạt trong bản trải nghiệm.');
}
function openSessionForm() {
  openModal(modalTitle('Tạo buổi sinh hoạt') + '<form onsubmit="createSessionSubmit(event)"><div class="field"><label for="sessionTitle">Tên buổi sinh hoạt</label><input class="input" name="sessionTitle" id="sessionTitle" required maxlength="100" placeholder="Ví dụ: Sinh hoạt chi đoàn tháng 12"></div><div class="input-grid"><div class="field"><label for="sessionDate">Ngày tổ chức</label><input class="input" id="sessionDate" name="sessionDate" type="date" required value="2026-11-28"></div><div class="field"><label for="sessionTime">Giờ bắt đầu</label><input class="input" id="sessionTime" name="sessionTime" type="time" required value="19:00"></div></div><div class="field"><label for="sessionLocation">Địa điểm</label><input class="input" id="sessionLocation" name="sessionLocation" maxlength="150" required value="Nhà văn hóa Khu phố 5"></div><label class="check-row"><input name="allowMakeup" type="checkbox" checked>Cho phép đăng ký buổi sinh hoạt bù</label><button class="btn btn-primary full" type="submit">Tạo buổi sinh hoạt</button></form>');
}
function recordWorkerCheckin() {
  if (state.workerProfile.checkedInCurrent) return;
  state.workerProfile.checkedInCurrent = true;
  state.activeSession.checkedMemberIds.push(2);
  state.activeSession.attended = state.activeSession.checkedMemberIds.length;
  state.workerProfile.points += 10;
  state.workerProfile.history.unshift({title:state.activeSession.title,date:state.activeSession.date,mode:'Điểm danh trong bản trải nghiệm',points:'+10đ'});
}
function doWorkerScan() {
  if (state.noEventsDemo) { showToast('Chi đoàn chưa mở buổi sinh hoạt.'); return; }
  if (state.qrExpiredDemo) { render(); return; }
  if (state.workerProfile.checkedInCurrent) { showToast('Bạn đã được ghi nhận cho buổi này.'); return; }
  if (state.offline) {
    if (!state.offlineQueue.some(item => item.sessionId === state.activeSession.id)) state.offlineQueue.push({sessionId:state.activeSession.id});
    state.workerProfile.pending = true;
    render(); showToast('Đã lưu một lượt điểm danh mẫu chờ xác nhận.'); return;
  }
  recordWorkerCheckin(); render(); showToast('Đã ghi nhận điểm danh mẫu và cộng 10 điểm.');
}
function simulateMemberCheckin() {
  const next = state.members.find(member => member.id !== 2 && !state.activeSession.checkedMemberIds.includes(member.id) && member.status !== 'transfer');
  if (!next) { showToast('Đã thử hết đoàn viên trong danh sách hoạt động.'); return; }
  state.activeSession.checkedMemberIds.push(next.id);
  state.activeSession.attended = state.activeSession.checkedMemberIds.length;
  render(); showToast('Đã thêm lượt điểm danh mẫu của ' + next.name + '.');
}
function triggerQrError() { state.qrExpiredDemo = true; render(); }
function clearQrError() { state.qrExpiredDemo = false; render(); }
function setMemberFilter(filter) { state.memberFilter = filter; render(); }
function onMemberSearch(value) {
  const scroll = window.scrollY;
  state.memberSearch = value; render();
  const input = document.getElementById('memberSearchInput');
  input.focus({preventScroll:true}); input.setSelectionRange(value.length,value.length); window.scrollTo(0,scroll);
}
function resetMemberSearch() { state.memberSearch = ''; state.memberFilter = 'all'; render(); }
function normalize(value) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d'); }
function showMemberDetail(id) {
  const member = state.members.find(item => item.id === id);
  openModal(modalTitle('Hồ sơ đoàn viên') + '<div class="center" style="margin-bottom:24px"><span class="avatar" style="margin:0 auto 12px">' + initials(member.name) + '</span><h2>' + member.name + '</h2><p class="muted">' + member.role + ' · Khu phố 5</p></div><div class="card" style="background:var(--bg)"><div class="detail-row">' + icon('pin') + esc(member.job) + '</div><div class="detail-row">' + icon('calendar') + 'Tham gia ' + member.attended + '/3 buổi gần đây</div><div class="detail-row">' + icon('heart') + member.points + ' điểm thi đua mẫu</div></div><div class="field" style="margin-top:20px"><label for="memberStatus">Tình trạng sinh hoạt</label><select class="input" id="memberStatus">' + Object.entries(statusLabels).map(([key,label]) => '<option value="' + key + '" ' + (key === member.status ? 'selected' : '') + '>' + label + '</option>').join('') + '</select></div><button class="btn btn-primary full" onclick="saveMemberStatus(' + id + ')">Lưu thay đổi</button><p class="hint center" style="margin-top:12px">Hồ sơ giả lập phục vụ trải nghiệm giao diện.</p>');
}
function saveMemberStatus(id) { state.members.find(member => member.id === id).status = document.getElementById('memberStatus').value; closeModal(); render(); showToast('Đã lưu tình trạng trên thiết bị này.'); }
function bookMakeupSlot(id) {
  const slot = state.makeupSlots.find(item => item.id === id);
  if (!slot || !state.activeSession.allowMakeup) return;
  if (state.workerProfile.bookedMakeup?.id === id) return;
  if (slot.capacity && slot.used >= slot.capacity) { showToast('Buổi này đã đủ chỗ. Hãy chọn lịch khác.'); return; }
  const previous = state.makeupSlots.find(item => item.id === state.workerProfile.bookedMakeup?.id);
  if (previous) previous.used = Math.max(0,previous.used - 1);
  slot.used += 1; state.workerProfile.bookedMakeup = {id:slot.id,label:slot.label,format:slot.format};
  render(); showToast('Đã đăng ký lịch bù trong bản trải nghiệm.');
}
function cancelMakeup() {
  const previous = state.makeupSlots.find(item => item.id === state.workerProfile.bookedMakeup?.id);
  if (previous) previous.used = Math.max(0,previous.used-1);
  state.workerProfile.bookedMakeup = null; render(); showToast('Đã hủy đăng ký buổi bù.');
}
function toggleReminder(key) { state.workerProfile.reminders[key] = !state.workerProfile.reminders[key]; render(); showToast('Đã lưu lựa chọn nhắc lịch mẫu.'); }
function toggleVolunteer(id) {
  const activity = state.workerProfile.volunteerEvents.find(item => item.id === id);
  activity.joined = !activity.joined;
  render(); showToast(activity.joined ? 'Đã đăng ký mẫu. Điểm được ghi nhận sau khi tham gia.' : 'Đã hủy đăng ký mẫu.');
}
function setReportMonth(month) { state.reportMonth = month; render(); }
function reportUnits() { return state.reportMonth === '10/2026' ? state.wardUnits : []; }
function downloadCsvReport() {
  const units = reportUnits(); if (!units.length) return;
  const rows = [['Tháng','Chi đoàn','Tổng đoàn viên','Số tham dự','Tỷ lệ (%)','Trạng thái'],...units.map(unit=>[state.reportMonth,unit.name,unit.total,unit.attended,Math.round(unit.attended/unit.total*100),unit.submitted?'Đã chốt':'Chờ chốt'])];
  const csv = '\uFEFF' + rows.map(row=>row.map(value=>'"'+String(value).replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'Bao-cao-Doan-thang-' + state.reportMonth.replace('/','-') + '.csv';
  anchor.click(); setTimeout(()=>URL.revokeObjectURL(url),2000);
  showToast('Đã tải báo cáo CSV với dữ liệu mẫu.');
}
function printReport() {
  if (!reportUnits().length) return;
  document.getElementById('printReport').innerHTML = '<h1>Báo cáo sinh hoạt chi đoàn</h1><p>Đoàn phường Trấn Biên · Tháng ' + state.reportMonth + '</p><table><thead><tr><th>Chi đoàn</th><th>Tổng ĐV</th><th>Tham dự</th><th>Tỷ lệ</th></tr></thead><tbody>'+reportUnits().map(unit=>'<tr><td>'+unit.name+'</td><td>'+unit.total+'</td><td>'+unit.attended+'</td><td>'+Math.round(unit.attended/unit.total*100)+'%</td></tr>').join('')+'</tbody></table><small>Dữ liệu minh họa. Tỷ lệ mẫu tính trên tổng đoàn viên của từng chi đoàn. Ngưỡng hỗ trợ đề xuất 70%.</small>';
  window.print();
}
function render() {
  state.memberCounts = {all:state.members.length,local:state.members.filter(item=>item.status==='local').length,far:state.members.filter(item=>item.status==='far').length,transfer:state.members.filter(item=>item.status==='transfer').length};
  document.getElementById('offlineBanner').classList.toggle('show',state.offline);
  document.getElementById('screenBody').innerHTML = state.role === 'login' ? renderLogin() : state.role === 'bithu' ? renderBiThu() : state.role === 'doanvien' ? renderDoanVien() : renderDoanXa();
  persist();
}
    function generateQrSvg() {
      return `
        <svg viewBox="0 0 120 120" width="144" height="144" aria-label="Mã QR điểm danh">
          <rect width="120" height="120" fill="#ffffff"/>
          <rect x="6" y="6" width="32" height="32" fill="none" stroke="#0F172A" stroke-width="6"/>
          <rect x="15" y="15" width="14" height="14" fill="#0057B8"/>
          <rect x="82" y="6" width="32" height="32" fill="none" stroke="#0F172A" stroke-width="6"/>
          <rect x="91" y="15" width="14" height="14" fill="#0057B8"/>
          <rect x="6" y="82" width="32" height="32" fill="none" stroke="#0F172A" stroke-width="6"/>
          <rect x="15" y="91" width="14" height="14" fill="#0057B8"/>
          <rect x="46" y="8" width="8" height="8" fill="#0F172A"/>
          <rect x="62" y="8" width="8" height="8" fill="#0F172A"/>
          <rect x="54" y="18" width="10" height="8" fill="#0F172A"/>
          <rect x="46" y="30" width="8" height="14" fill="#0F172A"/>
          <rect x="62" y="28" width="12" height="8" fill="#0F172A"/>
          <rect x="8" y="48" width="14" height="8" fill="#0F172A"/>
          <rect x="28" y="48" width="12" height="8" fill="#0F172A"/>
          <rect x="12" y="62" width="8" height="12" fill="#0F172A"/>
          <rect x="26" y="62" width="14" height="8" fill="#0F172A"/>
          <rect x="48" y="48" width="24" height="24" rx="4" fill="#0057B8"/>
          <text x="60" y="64" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="800">ĐTN</text>
          <rect x="80" y="48" width="10" height="12" fill="#0F172A"/>
          <rect x="96" y="48" width="16" height="8" fill="#0F172A"/>
          <rect x="82" y="66" width="16" height="8" fill="#0F172A"/>
          <rect x="104" y="62" width="8" height="14" fill="#0F172A"/>
          <rect x="48" y="82" width="12" height="8" fill="#0F172A"/>
          <rect x="66" y="82" width="10" height="16" fill="#0F172A"/>
          <rect x="48" y="96" width="14" height="16" fill="#0F172A"/>
          <rect x="82" y="84" width="14" height="10" fill="#0F172A"/>
          <rect x="102" y="84" width="10" height="10" fill="#0F172A"/>
          <rect x="82" y="100" width="30" height="12" fill="#0F172A"/>
        </svg>`;
    }

function renderLogin() {
  setNavigation([]);
  const roles = [
    {id:'bithu',title:'Bí thư chi đoàn',description:'Quản lý đoàn viên và theo dõi sinh hoạt chi đoàn',icon:'users'},
    {id:'doanvien',title:'Đoàn viên',description:'Xem lịch, điểm danh và đăng ký buổi bù',icon:'qr'},
    {id:'doanxa',title:'Cán bộ Đoàn xã, phường',description:'Tạo hoạt động, mã QR điểm danh và báo cáo tháng',icon:'chart'}
  ];
  return `${topbar()}<div class="login-layout">
    <section class="login-intro"><div class="eyebrow">Cùng thanh niên Đồng Nai</div><h1>Gần nhau hơn.<br><span>Dễ tham gia hơn.</span></h1><p>Một nơi để theo dõi lịch sinh hoạt, kết nối đoàn viên và cùng xây dựng chi đoàn.</p><div class="intro-note">${icon('calendar')}<span>Lịch sinh hoạt linh hoạt<br>cho cả những ngày làm ca.</span></div></section>
    <section class="login-card"><h2>Chào bạn!</h2><p>Chọn vai trò để khám phá trải nghiệm của bạn.</p>
    <div role="group" aria-label="Chọn vai trò">${roles.map(role => `<button class="role-option ${state.selectedLoginRole===role.id?'selected':''}" aria-pressed="${state.selectedLoginRole===role.id}" onclick="selectLoginRole('${role.id}')"><span class="quick-icon">${icon(role.icon)}</span><span class="role-text"><strong>${role.title}</strong><small>${role.description}</small></span><span class="radio" aria-hidden="true"></span></button>`).join('')}</div>
    <p class="login-account">Tài khoản mẫu · <strong>${namesByRole[state.selectedLoginRole]}</strong></p><button class="btn btn-primary full" onclick="doLogin()">Bắt đầu trải nghiệm</button><p class="login-foot">Dữ liệu minh họa · Lưu trên thiết bị của bạn</p>${!storageAvailable?'<p class="hint">Trình duyệt đang chặn lưu dữ liệu. Thao tác sẽ giữ trong lần mở này.</p>':''}</section></div>`;
}

function renderEventCard() {
  const session=state.activeSession;
  const [day,month]=session.date.split('/');
  return `<article class="card event-card"><div class="event-top"><div class="date-tile"><strong>${esc(day)}</strong><span>THÁNG ${esc(month)}</span></div><div><span class="badge">Đoàn phường triển khai</span><h2>${esc(session.title)}</h2></div></div>
  <div class="detail-row">${icon('clock')}<span>${esc(session.time)} · ${esc(session.date)}</span></div><div class="detail-row">${icon('pin')}<span>${esc(session.location)}</span></div>
  <button class="btn btn-primary full" onclick="setTab('qr')">${icon('calendar')}Xem chi tiết buổi sinh hoạt</button><div class="event-foot"><span>${session.attended} lượt điểm danh mẫu</span><span>${session.allowMakeup?'Có lịch sinh hoạt bù':'Buổi sinh hoạt trực tiếp'}</span></div></article>`;
}

function renderEmpty(title,description,action,button,iconName='calendar') {
  return `<div class="empty-state"><div class="quick-icon">${icon(iconName)}</div><h3>${title}</h3><p>${description}</p>${button?`<button class="btn btn-soft" onclick="${action}">${button}</button>`:''}</div>`;
}

function renderBiThu() {
  setNavigation([['home','Trang chủ','home'],['qr','Sinh hoạt','calendar'],['members','Đoàn viên','users']]);
  if(state.tab==='home') {
    return `${pageHeading('Xin chào, Minh Tuấn','Chi đoàn Khu phố 5','Phường Trấn Biên · Đồng Nai','MT')}
    <div class="stats"><div class="stat"><strong>${state.memberCounts.all}</strong><span>Tổng đoàn viên</span></div><div class="stat"><strong>${state.memberCounts.local}</strong><span>Ở địa phương</span></div><div class="stat"><strong>${state.memberCounts.far}</strong><span>Đi làm xa</span></div><div class="stat"><strong>${state.memberCounts.transfer}</strong><span>Chuyển sinh hoạt</span></div></div>
    <div class="grid"><div class="stack"><div><div class="section-heading"><h2>Buổi sinh hoạt sắp tới</h2><span class="badge">Từ Đoàn phường, xã</span></div>${state.noEventsDemo?renderEmpty('Chưa có lịch sinh hoạt','Lịch hoạt động và mã QR sẽ do cán bộ Đoàn phường, xã tạo và triển khai.','',''):renderEventCard()}</div>
    <div class="callout">${icon('clock')}<div><strong>Để ai cũng có thể tham gia</strong><span>Có 12 đoàn viên đi làm xa. Cùng mở thêm lịch bù phù hợp với ca làm.</span></div></div></div>
    <div class="stack"><div class="card"><div class="section-heading"><h2>Tham gia sinh hoạt</h2><span class="muted">3 buổi gần đây</span></div><div class="chart" role="img" aria-label="Ba buổi gần đây có 28, 19, 33 người tham dự">${state.pastSessions.map(session=>`<div class="chart-column"><strong>${session.count}</strong><div class="chart-bar" style="height:${session.count*3.5}px"></div></div>`).join('')}</div><div class="chart-labels">${state.pastSessions.map(session=>`<span>${session.label}</span>`).join('')}</div><p class="hint">Buổi gần nhất có 33 người tham dự, tăng 14 người so với buổi trước.</p></div>
    <div class="card"><button class="quick-row" onclick="setTab('members')"><span class="quick-icon">${icon('users')}</span><span><strong>Danh sách đoàn viên</strong><small>Tìm kiếm và cập nhật tình trạng</small></span></button><button class="quick-row" onclick="openReminderPreview()"><span class="quick-icon">${icon('bell')}</span><span><strong>Nhắc lịch sinh hoạt</strong><small>Xem nội dung thông báo mẫu</small></span></button></div></div></div>`;
  }
  if(state.tab==='qr') {
    return `${pageHeading('Bí thư chi đoàn','Sinh hoạt chi đoàn','Theo dõi lịch hoạt động do Đoàn phường, xã phát động và sĩ số đoàn viên.')}
    ${state.noEventsDemo?renderEmpty('Chưa có buổi sinh hoạt','Cán bộ Đoàn phường, xã sẽ tạo hoạt động và mã QR điểm danh.','',''):`
    <div class="grid"><div class="card center"><span class="badge">Hoạt động từ Đoàn phường, xã</span><h2 style="margin-top:15px">${esc(state.activeSession.title)}</h2><p class="hint" style="margin-top:8px">${esc(state.activeSession.date)} · ${esc(state.activeSession.time)}</p><div class="stats three" style="margin:24px 0 18px"><div class="stat"><strong>${state.activeSession.attended}</strong><span>Đã điểm danh</span></div><div class="stat"><strong>${state.memberCounts.local+state.memberCounts.far}</strong><span>Đang quản lý</span></div><div class="stat"><strong>${state.workerProfile.bookedMakeup?1:0}</strong><span>Đăng ký bù</span></div></div><button class="btn btn-primary full" onclick="simulateMemberCheckin()">${icon('plus')}Thêm lượt điểm danh mẫu</button><p class="hint" style="margin-top:14px">Mã QR điểm danh do cán bộ Đoàn phường, xã tạo và quản lý.</p></div>
    <div class="stack"><div class="card"><div class="section-heading"><h2>Thông tin buổi sinh hoạt</h2></div><div class="detail-row">${icon('pin')}<span>${esc(state.activeSession.location)}</span></div><div class="detail-row">${icon('clock')}<span>${esc(state.activeSession.date)} · ${esc(state.activeSession.time)}</span></div><div class="detail-row">${icon('calendar')}<span>${state.activeSession.allowMakeup?'Cho phép đăng ký sinh hoạt bù':'Sinh hoạt trực tiếp theo lịch'}</span></div><button class="btn btn-secondary full" style="margin-top:22px" onclick="openReminderPreview()">${icon('bell')}Xem thông báo nhắc lịch</button></div><div class="card"><div class="section-heading"><h2>Vừa điểm danh</h2></div>${state.activeSession.checkedMemberIds.length?state.activeSession.checkedMemberIds.slice(-4).reverse().map(id=>{const member=state.members.find(item=>item.id===id);return `<div class="timeline-item"><span class="timeline-icon">${icon('check')}</span><div><h3>${esc(member.name)}</h3><p>Đã ghi nhận · Dữ liệu mẫu</p></div></div>`;}).join(''):'<p class="hint">Các lượt điểm danh thử sẽ xuất hiện tại đây.</p>'}</div></div></div>`}`;
  }
  const filtered=state.members.filter(member=>(state.memberFilter==='all'||member.status===state.memberFilter)&&normalize(member.name+' '+member.job).includes(normalize(state.memberSearch)));
  const filters=[['all','Tất cả'],['local','Tại chỗ'],['far','Đi làm xa'],['transfer','Chuyển SH']];
  return `${pageHeading('Chi đoàn Khu phố 5','Đoàn viên','Mỗi đoàn viên, một kết nối được quan tâm.')}
  <div class="search-box">${icon('search')}<input id="memberSearchInput" aria-label="Tìm đoàn viên theo tên hoặc nơi làm việc" value="${esc(state.memberSearch)}" placeholder="Tìm tên, nơi làm việc…" oninput="onMemberSearch(this.value)" autocomplete="off"></div>
  <div class="chips" aria-label="Lọc tình trạng">${filters.map(([key,label])=>`<button class="chip ${state.memberFilter===key?'active':''}" aria-pressed="${state.memberFilter===key}" onclick="setMemberFilter('${key}')">${label} · ${state.memberCounts[key]}</button>`).join('')}</div>
  <div class="section-heading"><span class="hint">${filtered.length} đoàn viên${state.memberSearch?' phù hợp':''}</span><span class="badge">Dữ liệu mẫu</span></div>
  ${filtered.length?`<div class="member-list">${filtered.map(member=>`<button class="member-row" onclick="showMemberDetail(${member.id})"><span class="avatar ${member.status==='local'?'teal':''}">${initials(member.name)}</span><span class="member-info"><strong>${member.name}</strong><small>${esc(member.job)}</small></span><span class="badge ${member.status==='local'?'teal':member.status==='far'?'amber':''}">${statusLabels[member.status]}</span></button>`).join('')}</div>`:renderEmpty('Chưa tìm thấy đoàn viên','Thử tên khác hoặc xóa bộ lọc để xem lại danh sách.','resetMemberSearch()','Xóa tìm kiếm và bộ lọc','search')}`;
}

function openReminderPreview() {
  openModal(modalTitle('Nhắc lịch sinh hoạt')+`<div class="card" style="background:var(--blue-light);margin-bottom:20px"><h3>${esc(state.activeSession.title)}</h3><p style="font-size:14px;margin-top:12px">Chi đoàn mời bạn tham gia lúc ${esc(state.activeSession.time)}, ngày ${esc(state.activeSession.date)} tại ${esc(state.activeSession.location)}. Nếu trùng ca làm, bạn có thể chọn buổi sinh hoạt bù.</p></div><p class="hint">Đây là nội dung thông báo mẫu để duyệt giao diện nhắc lịch.</p><button class="btn btn-primary full" style="margin-top:20px" onclick="closeModal()">Đã xem</button>`);
}

function renderDoanVien() {
  setNavigation([['scan','Điểm danh','qr'],['makeup','Sinh hoạt bù','calendar'],['points','Của tôi','heart']]);
  if(state.tab==='scan') {
    const checked=state.workerProfile.checkedInCurrent,pending=state.workerProfile.pending;
    let scanner;
    if(state.noEventsDemo) scanner=renderEmpty('Chưa có buổi sinh hoạt','Lịch mới sẽ xuất hiện khi Đoàn phường, xã mở hoạt động.','','');
    else if(state.qrExpiredDemo) scanner=`<div class="empty-state error-state"><div class="quick-icon">${icon('alert')}</div><h3>Mã điểm danh đã hết hạn</h3><p>Nhờ cán bộ Đoàn phường, xã mở mã mới để tiếp tục điểm danh.</p><button class="btn btn-primary full" onclick="clearQrError()">Thử lại với mã mới</button><button class="text-btn" onclick="setTab('makeup')">Xem lịch sinh hoạt bù</button></div>`;
    else scanner=`<div class="card center"><span class="badge ${checked?'teal':pending?'amber':''}">${checked?'Đã điểm danh':pending?'Đang chờ xác nhận':'Buổi sinh hoạt sắp tới'}</span><h2 style="margin-top:14px">${esc(state.activeSession.title)}</h2><p class="hint" style="margin-top:7px">${esc(state.activeSession.date)} · ${esc(state.activeSession.time)}</p><div class="scan-area">${icon(checked?'check':pending?'clock':'qr')}${checked||pending?'':'<span class="scan-line"></span>'}</div><p class="muted" style="font-size:14px;margin-bottom:18px">${checked?'Lượt tham gia mẫu của bạn đã được ghi nhận.':pending?'Lượt điểm danh đã lưu trên máy. Kết nối lại để xác nhận.':'Chọn nút bên dưới để thử trải nghiệm điểm danh QR.'}</p><button class="btn ${checked?'btn-teal':'btn-primary'} full" onclick="doWorkerScan()" ${checked||pending?'disabled':''}>${icon(checked?'check':'qr')}${checked?'Đã ghi nhận · +10 điểm':pending?'Chờ kết nối lại':'Thử điểm danh'}</button>${checked||pending?'':'<button class="text-btn" onclick="triggerQrError()">Thử tình huống QR hết hạn</button>'}</div>`;
    return `${pageHeading('Xin chào, Lan Anh','Hẹn bạn ở buổi sinh hoạt','Chi đoàn Khu phố 5 · Công nhân ca 2','LA')}<div class="grid"><div class="stack">${scanner}<div class="callout">${icon('clock')}<div><strong>Lịch chính trùng ca làm?</strong><span>Bạn có thể chọn buổi sinh hoạt bù phù hợp.</span><br><button class="text-btn" onclick="setTab('makeup')">Xem lịch sinh hoạt bù</button></div></div></div><div class="card"><div class="section-heading"><h2>Lịch sử tham gia</h2><span class="muted">${state.workerProfile.history.length} buổi</span></div>${state.workerProfile.history.map(item=>`<div class="timeline-item"><span class="timeline-icon">${icon('check')}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.date)} · ${esc(item.mode)}</p><span class="badge teal" style="margin-top:7px">${esc(item.points)}</span></div></div>`).join('')}</div></div>`;
  }
  if(state.tab==='makeup') {
    const booked=state.workerProfile.bookedMakeup;
    return `${pageHeading('Linh hoạt cùng ca làm','Chọn lịch phù hợp','Đăng ký buổi bù để cùng tham gia với chi đoàn.')}
    <div class="grid"><div><div class="callout blue">${icon('clock')}<div><strong>Ca 2 · 14:00–22:00</strong><span>Ca làm của bạn trùng lịch sinh hoạt chính lúc 19:00.</span></div></div>
    ${!state.activeSession.allowMakeup||state.noEventsDemo?renderEmpty('Chưa mở lịch sinh hoạt bù','Đoàn phường, xã sẽ thông báo khi có thêm lịch phù hợp.','',''):state.makeupSlots.map(slot=>{
      const selected=booked?.id===slot.id;
      return `<article class="slot ${selected?'selected':''}"><div class="slot-top"><span class="badge ${selected?'teal':''}">${selected?'Đã đăng ký':'Lịch sinh hoạt bù'}</span><span class="hint">${slot.capacity?`${slot.used}/${slot.capacity} chỗ`:'Trực tuyến'}</span></div><h3>${slot.label}</h3><p>${slot.format}</p><button class="btn ${selected?'btn-teal':'btn-secondary'} full" onclick="bookMakeupSlot('${slot.id}')" ${selected||slot.capacity&&slot.used>=slot.capacity?'disabled':''}>${selected?'Đã chọn lịch này':slot.capacity&&slot.used>=slot.capacity?'Đã đủ chỗ':'Chọn buổi này'}</button></article>`;
    }).join('')}</div><div class="stack"><div class="card"><h2 style="margin-bottom:15px">Lịch của bạn</h2>${booked?`<span class="badge teal">${icon('check')}Đã đăng ký</span><h3 style="margin-top:15px">${booked.label}</h3><p class="hint" style="margin:8px 0 18px">${booked.format}</p><button class="btn btn-secondary full" onclick="cancelMakeup()">Hủy đăng ký</button>`:'<p class="muted" style="font-size:14px">Bạn chưa chọn buổi bù. Chọn một khung giờ thuận tiện để giữ chỗ.</p>'}</div><div class="callout">${icon('bell')}<div><strong>Chủ động sắp xếp thời gian</strong><span>Đăng ký buổi bù giúp chi đoàn chuẩn bị. Điểm danh được ghi nhận khi bạn tham dự.</span></div></div></div></div>`;
  }
  const reminder=state.workerProfile.reminders;
  return `${pageHeading('Lan Anh · Chi đoàn Khu phố 5','Mỗi lần tham gia đều ý nghĩa','Theo dõi hoạt động và lựa chọn nhắc lịch của bạn.','LA')}<div class="grid"><div class="stack"><div class="card"><div class="section-heading"><h2>Điểm thi đua</h2><span class="badge">Quý IV · Mẫu</span></div><div class="score"><div class="score-number">${state.workerProfile.points}<small>điểm</small></div><span class="muted" style="font-size:14px">Ghi nhận từ<br>các buổi đã tham gia</span></div><div class="progress teal" style="margin:22px 0 12px"><span style="width:${Math.min(100,state.workerProfile.points)}%"></span></div><p class="hint">Điểm minh họa. Quy tắc thi đua sẽ do đơn vị xác nhận.</p></div>
    <div class="card"><h2 style="margin-bottom:7px">Nhắc lịch cho tôi</h2>${[['before24h','Trước 24 giờ','Dành thời gian sắp xếp ca làm'],['before1h','Trước 1 giờ','Nhớ thời gian và địa điểm'],['zalo','Qua Zalo','Tùy chọn kênh thông báo dự kiến']].map(([key,title,desc])=>`<div class="toggle-row"><div><strong>${title}</strong><small>${desc}</small></div><button class="switch ${reminder[key]?'on':''}" role="switch" aria-checked="${reminder[key]}" aria-label="${title}" onclick="toggleReminder('${key}')"></button></div>`).join('')}<p class="hint" style="margin-top:14px">Các công tắc lưu lựa chọn để trải nghiệm giao diện nhắc lịch.</p></div></div>
    <div><div class="section-heading"><h2>Hoạt động tình nguyện</h2></div><div class="stack">${state.workerProfile.volunteerEvents.map(event=>`<article class="card"><span class="badge teal">Dự kiến +${event.points} điểm</span><h3 style="margin:13px 0 9px">${event.title}</h3><div class="detail-row muted">${icon('calendar')}${event.date}</div><button class="btn ${event.joined?'btn-secondary':'btn-primary'} full" style="margin-top:20px" onclick="toggleVolunteer('${event.id}')">${event.joined?'Đã đăng ký · Hủy':'Đăng ký tham gia'}</button></article>`).join('')}</div></div></div>`;
}

function renderDoanXa() {
  setNavigation([['dashboard','Tổng quan','chart'],['qr','Hoạt động & QR','qr'],['report','Báo cáo','download']]);
  const units=reportUnits();
  const total=units.reduce((sum,unit)=>sum+unit.total,0);
  const attended=units.reduce((sum,unit)=>sum+unit.attended,0);
  const low=units.filter(unit=>unit.attended/unit.total<.7).length;
  const filter=`<div class="filter-row"><label for="reportMonth">Kỳ báo cáo</label><select class="input" id="reportMonth" onchange="setReportMonth(this.value)">${['10/2026','11/2026','12/2026'].map(month=>`<option value="${month}" ${state.reportMonth===month?'selected':''}>Tháng ${month}</option>`).join('')}</select></div>`;
  const empty=renderEmpty('Chưa có báo cáo tháng này','Chọn tháng 10/2026 để xem dữ liệu minh họa của 6 chi đoàn.',"setReportMonth('10/2026')",'Xem tháng 10/2026','chart');
  const summary=`<div class="stats three"><div class="stat"><strong>${total}</strong><span>Tổng đoàn viên</span></div><div class="stat"><strong>${total?Math.round(attended/total*100):0}%</strong><span>Tỷ lệ tham gia</span></div><div class="stat"><strong>${low}</strong><span>Cần hỗ trợ</span></div></div>`;
  if(state.tab==='report')return `${pageHeading('Đoàn phường Trấn Biên','Báo cáo sinh hoạt','Kiểm tra số liệu và tải báo cáo theo tháng.')}${filter}${units.length?`${summary}<div class="grid"><div class="card"><h2 style="margin-bottom:18px">Báo cáo tháng ${state.reportMonth}</h2><div style="overflow:auto"><table class="report-table"><thead><tr><th>Chi đoàn</th><th>Tham dự</th><th>Tỷ lệ</th></tr></thead><tbody>${units.map(unit=>`<tr><td>${unit.name.replace('Chi đoàn ','')}</td><td>${unit.attended}/${unit.total}</td><td>${Math.round(unit.attended/unit.total*100)}%</td></tr>`).join('')}</tbody></table></div><p class="hint" style="margin-top:18px">Tỷ lệ mẫu tính trên tổng đoàn viên. Số liệu các chi đoàn dùng để minh họa giao diện tổng hợp.</p></div><div class="card"><h2 style="margin-bottom:12px">Tải báo cáo</h2><p class="muted" style="font-size:14px;margin-bottom:22px">Chọn CSV để mở bằng Excel, hoặc mở bản in để lưu PDF trên trình duyệt.</p><div class="stack" style="gap:12px"><button class="btn btn-primary full" onclick="downloadCsvReport()">${icon('download')}Tải CSV · Mở bằng Excel</button><button class="btn btn-secondary full" onclick="printReport()">In / Lưu PDF</button></div><div class="callout amber" style="margin-top:22px">${icon('clock')}<span>Còn 1 chi đoàn chưa chốt số liệu. Bản tải xuống có ghi trạng thái từng đơn vị.</span></div></div></div>`:empty}`;
  return `${pageHeading('Xin chào, Hoàng Nam','Toàn cảnh chi đoàn','Đoàn phường Trấn Biên · Đồng Nai','HN')}${filter}${units.length?`${summary}<div class="grid"><div class="card"><div class="section-heading"><h2>Tình hình các chi đoàn</h2><span class="muted">${units.length} đơn vị</span></div>${units.map(unit=>{
    const rate=Math.round(unit.attended/unit.total*100);
    return `<div class="unit-row"><div class="unit-top"><strong>${unit.name}</strong><span class="badge ${rate<70?'red':'teal'}">${rate}%</span></div><div class="progress ${rate<70?'red':'teal'}"><span style="width:${rate}%"></span></div><div class="unit-meta"><span>${unit.attended}/${unit.total} đoàn viên tham dự</span><span>${unit.submitted?'Đã chốt':'Chờ chốt'}</span></div></div>`;
  }).join('')}</div><div class="stack"><div class="card"><span class="quick-icon" style="margin-bottom:15px">${icon('qr')}</span><h2>Tạo hoạt động & QR điểm danh</h2><p class="muted" style="font-size:14px;margin:10px 0 20px">Khởi tạo hoạt động Đoàn phường, xã, đặt vị trí GPS và phát mã QR cho đoàn viên điểm danh.</p><div class="button-row"><button class="btn btn-primary" onclick="openSessionForm()">${icon('plus')}Tạo hoạt động & QR</button><button class="btn btn-secondary" onclick="setTab('qr')">Quản lý QR</button></div></div><div class="card"><span class="quick-icon" style="margin-bottom:15px">${icon('download')}</span><h2>Báo cáo tháng ${state.reportMonth}</h2><p class="muted" style="font-size:14px;margin:10px 0 20px">5/6 chi đoàn đã chốt số liệu. Xem bảng tổng hợp trước khi tải báo cáo.</p><button class="btn btn-primary full" onclick="setTab('report')">Xem và xuất báo cáo</button></div><div class="callout amber">${icon('users')}<div><strong>Quan tâm các chi đoàn tham gia ít</strong><span>Khu phố 3 và Khu phố 6 đang dưới ngưỡng tham gia đề xuất 70%.</span></div></div><p class="hint">Dữ liệu minh họa tháng 10/2026. Ngưỡng hỗ trợ và cách tính tỷ lệ cần được đơn vị thống nhất khi triển khai.</p></div></div>`:empty}`;
}
render();
