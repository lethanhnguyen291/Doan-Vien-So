(function bootQr() {
const QR=window.QR={
 saved:{owners:[],memberId:2,receipts:[]},admin:null,scan:null,event:null,receipt:null,error:'',gps:null,busy:false,loading:false,scanner:null,cameraRun:0,refreshing:false,pending:null,
 save(){try{localStorage.setItem('dvs-qr-gps-v1',JSON.stringify(this.saved));}catch{showToast('Giữ trang này để quản lý QR, trình duyệt đang chặn lưu dữ liệu.');}},
 owner(){return this.saved.owners.find(o=>o.id===this.saved.activeId);},
 stamp(t){return new Date(t).toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit',year:'numeric'});},
 localTime(t){const d=new Date(t);return new Date(d-d.getTimezoneOffset()*60000).toISOString().slice(0,16);},
 async api(url,options={}){
  if(state.offline)throw Error('Đang thử mất mạng. Kết nối lại để gửi điểm danh.');
  const control=new AbortController(),timer=setTimeout(()=>control.abort(),20000);
  try{const r=await fetch(url,{...options,signal:control.signal,headers:{'Content-Type':'application/json',...options.headers}});const data=await r.json();if(!r.ok)throw Object.assign(Error(data.error||'Chưa xử lý được yêu cầu.'),{detail:data});return data;}
  catch(e){if(e.name==='AbortError'||e instanceof TypeError)throw Error('Kết nối bị gián đoạn. Hãy thử lại để lưu kết quả.');throw e;}finally{clearTimeout(timer);}
 },
 position(){
  if(!isSecureContext)return Promise.reject(Error('Mở link HTTPS để sử dụng GPS.'));
  if(!navigator.geolocation)return Promise.reject(Error('Thiết bị chưa hỗ trợ định vị.'));
  return new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(p=>resolve({latitude:p.coords.latitude,longitude:p.coords.longitude,accuracy:p.coords.accuracy,timestamp:p.timestamp}),e=>reject(Error({1:'Cho phép Vị trí chính xác trong cài đặt trình duyệt rồi thử lại.',2:'Chưa tìm được GPS. Bật vị trí và thử ở nơi thoáng.',3:'Lấy GPS quá lâu. Hãy thử lại ở nơi thoáng.'}[e.code]||'Không lấy được GPS.')),{enableHighAccuracy:true,timeout:20000,maximumAge:0}));
 },
 openCreate(){
  const now=Date.now();this.pending=null;
  openModal(modalTitle('Tạo QR điểm danh')+`<form id="qrForm" onsubmit="QR.create(event)">
   <div class="field"><label for="qrTitle">Tên sự kiện</label><input class="input" id="qrTitle" name="title" required maxlength="120" placeholder="Sinh hoạt chi đoàn tháng 11"></div>
   <div class="field"><label for="qrPlace">Địa điểm tổ chức</label><input class="input" id="qrPlace" name="place" required maxlength="180" placeholder="Nhà văn hóa Khu phố 5"></div>
   <div class="input-grid"><div class="field"><label for="qrStart">Mở điểm danh</label><input class="input" id="qrStart" name="starts" type="datetime-local" required value="${this.localTime(now-60000)}"></div><div class="field"><label for="qrEnd">Kết thúc</label><input class="input" id="qrEnd" name="ends" type="datetime-local" required value="${this.localTime(now+7200000)}"></div></div>
   <div class="gps-settings"><h3>Vị trí sự kiện</h3><button type="button" class="btn btn-soft full" style="margin:14px 0" id="getVenueGps" onclick="QR.venueGps()">${icon('pin')}Lấy vị trí hiện tại</button><p class="hint">Lấy GPS khi đang ở địa điểm tổ chức, hoặc nhập tọa độ bên dưới.</p>
   <div class="input-grid" style="margin-top:16px"><div class="field"><label for="qrLat">Vĩ độ</label><input class="input" id="qrLat" name="lat" type="number" step="any" min="-90" max="90" required></div><div class="field"><label for="qrLon">Kinh độ</label><input class="input" id="qrLon" name="lon" type="number" step="any" min="-180" max="180" required></div></div>
   <div class="field"><label for="qrRadius">Bán kính cho phép (mét)</label><input class="input" id="qrRadius" name="radius" type="number" min="25" max="1000" value="100" required></div><p id="venueStatus" class="hint" aria-live="polite"></p></div>
   <p class="hint" style="margin:16px 0">QR có hiệu lực 15 phút trong thời gian mở điểm danh. Quyền quản lý được lưu trên thiết bị tạo sự kiện.</p>
   <p id="qrFormError" class="qr-error" role="alert"></p><button id="qrSubmit" class="btn btn-primary full">Tạo sự kiện và mã QR</button></form>`);
 },
 async venueGps(){
  const button=document.getElementById('getVenueGps'),status=document.getElementById('venueStatus');
  button.disabled=true;status.textContent='Đang lấy GPS…';
  try{const p=await this.position();if(p.accuracy>50)throw Error('Sai số ±'+Math.ceil(p.accuracy)+' m. Ra nơi thoáng rồi lấy lại GPS.');document.getElementById('qrLat').value=p.latitude.toFixed(7);document.getElementById('qrLon').value=p.longitude.toFixed(7);status.textContent='Đã lấy vị trí · GPS ±'+Math.ceil(p.accuracy)+' m';}
  catch(e){status.textContent=e.message;}finally{button.disabled=false;}
 },
 async create(event){
  event.preventDefault();const form=event.target;if(!form.reportValidity())return;
  const v=new FormData(form),title=v.get('title').trim(),place=v.get('place').trim(),startsAt=new Date(v.get('starts')).getTime(),endsAt=new Date(v.get('ends')).getTime();
  const error=document.getElementById('qrFormError');if(!title||!place||endsAt<=Date.now()||endsAt<=startsAt){error.textContent='Kiểm tra tên, địa điểm và giờ kết thúc.';return;}
  document.getElementById('qrSubmit').disabled=true;
  if(!this.pending)this.pending={id:crypto.randomUUID(),key:crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','')};
  const p=this.pending;if(!this.saved.owners.some(o=>o.id===p.id)){this.saved.owners.push({...p,title});this.save();}
  try{
   const result=await this.api('/api/events',{method:'POST',headers:{'X-Organizer-Key':p.key},body:JSON.stringify({id:p.id,title,place,startsAt,endsAt,latitude:Number(v.get('lat')),longitude:Number(v.get('lon')),radius:Number(v.get('radius'))})});
   this.saved.activeId=p.id;this.saved.owners.find(o=>o.id===p.id).title=result.event.title;this.save();this.pending=null;this.admin={...result,attendees:[]};this.error='';
   closeModal();state.role='bithu';state.tab='qr';render();showToast('Đã tạo QR gắn với vị trí sự kiện.');
  }catch(e){error.textContent=e.message;document.getElementById('qrSubmit').disabled=false;}
 },
 async select(id){this.saved.activeId=id;this.save();this.admin=null;this.error='';render();await this.refresh();},
 async refresh(){
  const o=this.owner();if(!o||this.refreshing)return;this.refreshing=true;
  try{const data=await this.api('/api/events/'+o.id+'/admin',{headers:{'X-Organizer-Key':o.key}});if(this.saved.activeId===o.id){this.admin=data;this.error='';}}
  catch(e){this.error=e.message;}finally{this.refreshing=false;if(state.role==='bithu'&&state.tab==='qr'&&!document.getElementById('modalOverlay').classList.contains('show'))render();}
 },
 async manage(action){
  const o=this.owner();if(!o||this.busy)return;this.busy=true;render();
  try{this.admin=await this.api('/api/events/'+o.id+'/'+action,{method:'POST',headers:{'X-Organizer-Key':o.key},body:'{}'});this.error='';}catch(e){this.error=e.message;}finally{this.busy=false;render();}
 },
 closeEvent(){openModal(modalTitle('Đóng điểm danh?')+`<p style="margin-bottom:20px">QR sẽ hết hiệu lực. Các lượt đã điểm danh vẫn được lưu.</p><div class="button-row"><button class="btn btn-secondary" onclick="closeModal()">Tiếp tục mở</button><button class="btn btn-primary" onclick="closeModal();QR.manage('close')">Đóng điểm danh</button></div>`);},
 url(){return location.origin+location.pathname+'#diem-danh='+this.admin.event.id+'.'+this.admin.token;},
 image(){const code=qrcode(0,'M');code.addData(this.url());code.make();return code.createDataURL(6,24);},
 download(){const a=document.createElement('a');a.href=this.image();a.download='QR-diem-danh-'+this.admin.event.id+'.gif';a.click();},
 async copy(){try{await navigator.clipboard.writeText(this.url());showToast('Đã sao chép link điểm danh.');}catch{openModal(modalTitle('Link điểm danh')+'<textarea class="input" rows="4" readonly>'+esc(this.url())+'</textarea>');}},
 organizer(){
  setNavigation([['home','Trang chủ','home'],['qr','QR điểm danh','qr'],['members','Đoàn viên','users']]);
  const heading=pageHeading('Bí thư chi đoàn','QR điểm danh','Tạo mã, đặt vị trí và theo dõi đoàn viên tham dự.');
  const picker=`<div class="qr-toolbar"><select class="input" aria-label="Chọn sự kiện" onchange="QR.select(this.value)"><option value="">Chọn sự kiện đã tạo</option>${this.saved.owners.map(o=>`<option value="${o.id}" ${o.id===this.saved.activeId?'selected':''}>${esc(o.title)}</option>`).join('')}</select><button class="btn btn-primary" onclick="QR.openCreate()">${icon('plus')}Tạo QR</button></div>`;
  if(!this.admin)return heading+picker+(this.error?'<p class="qr-error">'+esc(this.error)+'</p>':'')+renderEmpty('Tạo mã cho buổi sinh hoạt','Đặt vị trí để xác nhận đoàn viên có mặt trong bán kính sự kiện.','QR.openCreate()','Tạo sự kiện và QR','qr');
  const e=this.admin.event,expired=Date.now()>e.expires_at||Date.now()>e.ends_at,active=!e.closed&&!expired;
  return heading+picker+`<div class="grid"><section class="card center"><span class="badge ${active?'teal':'red'}">${e.closed?'Đã đóng điểm danh':expired?'QR hết hạn':Date.now()<e.starts_at?'Chờ giờ mở':'Đang mở điểm danh'}</span><h2 style="margin:16px 0 8px">${esc(e.title)}</h2><p class="hint">${esc(e.place)}</p>
   ${active?`<img class="real-qr" src="${this.image()}" alt="Mã QR điểm danh sự kiện"><p class="hint">Hiệu lực đến ${this.stamp(e.expires_at)}</p>`:'<div class="scan-area">'+icon('clock')+'</div>'}
   <div class="button-row" style="margin-top:18px"><button class="btn btn-secondary" onclick="QR.download()" ${!active?'disabled':''}>Tải ảnh QR</button><button class="btn btn-secondary" onclick="QR.copy()" ${!active?'disabled':''}>Sao chép link</button></div>
   <div class="button-row" style="margin-top:10px"><button class="btn btn-primary" onclick="QR.manage('rotate')" ${e.closed||Date.now()>e.ends_at||this.busy?'disabled':''}>Đổi QR · 15 phút</button><button class="btn btn-danger" onclick="QR.closeEvent()" ${e.closed||this.busy?'disabled':''}>Đóng điểm danh</button></div><p class="hint" style="margin-top:14px">Đổi mã sẽ làm QR cũ hết hiệu lực.</p>${this.error?'<p class="qr-error" role="alert">'+esc(this.error)+'</p>':''}</section>
   <div class="stack"><section class="card"><div class="section-heading"><h2>Phạm vi điểm danh</h2><span class="badge teal">${e.radius} m</span></div><div class="gps-target">${icon('pin')}<strong>${e.radius} m</strong><span>từ vị trí sự kiện</span></div><p class="hint">${e.latitude.toFixed(6)}, ${e.longitude.toFixed(6)}</p><a class="text-btn" href="https://www.google.com/maps?q=${e.latitude},${e.longitude}" target="_blank" rel="noopener noreferrer">Xem trên bản đồ</a><p class="hint">${this.stamp(e.starts_at)} – ${this.stamp(e.ends_at)}</p></section>
   <section class="card"><div class="section-heading"><h2>Đã điểm danh · ${this.admin.attendees.length}</h2><button class="text-btn" onclick="QR.refresh()">Làm mới</button></div><p class="hint">Tự cập nhật khoảng 8 giây.</p>${this.admin.attendees.length?this.admin.attendees.map(a=>`<div class="timeline-item"><span class="timeline-icon">${icon('check')}</span><div><h3>${esc(a.member_name)}</h3><p>${this.stamp(a.checked_at)}<br>Cách ${a.distance_m} m · GPS ±${a.accuracy_m} m</p></div></div>`).join(''):'<p class="muted" style="margin-top:18px">Chưa có đoàn viên điểm danh.</p>'}</section></div></div>`;
 },
 parse(text){let link;try{link=new URL(text,location.origin);}catch{throw Error('Không đọc được mã QR.');}
  if(link.origin!==location.origin)throw Error('Hãy quét QR sự kiện của trang Đoàn viên số này.');
  const m=link.hash.match(/^#diem-danh=([a-f0-9-]{36})\.([a-f0-9]{32})$/);if(!m)throw Error('QR chưa đúng định dạng điểm danh.');return{id:m[1],token:m[2]};
 },
 async accept(text){
  let scan;try{scan=this.parse(text);}catch(e){this.error=e.message;showToast(e.message);return;}
  await this.stopCamera();this.scan=scan;this.event=null;this.receipt=null;this.gps=null;this.error='';this.loading=true;state.role='doanvien';state.tab='scan';location.hash='diem-danh='+scan.id+'.'+scan.token;render();
  try{const data=await this.api('/api/events/'+scan.id,{headers:{'X-QR-Token':scan.token}});this.event=data.event;}
  catch(e){this.error=e.message;}finally{this.loading=false;render();}
 },
 async stopCamera(){this.cameraRun++;const s=this.scanner;this.scanner=null;if(s){try{await s.stop();}catch{}try{s.clear();}catch{}}},
 async startCamera(){
  if(this.scanner)return;this.error='';this.scan=null;this.event=null;this.receipt=null;render();
  const run=++this.cameraRun,s=new Html5Qrcode('cameraReader',{formatsToSupport:[Html5QrcodeSupportedFormats.QR_CODE],verbose:false});this.scanner=s;
  const info=document.getElementById('cameraStatus');info.textContent='Đang mở camera…';
  try{await s.start({facingMode:'environment'},{fps:10,qrbox:(w,h)=>({width:Math.floor(Math.min(w,h)*.72),height:Math.floor(Math.min(w,h)*.72)})},text=>{if(this.cameraRun===run){this.accept(text);}},()=>{});
   if(this.cameraRun!==run){try{await s.stop();}catch{}return;}info.textContent='Đưa QR của bí thư vào khung hình.';
  }catch{this.scanner=null;try{s.clear();}catch{}this.error='Chưa mở được camera. Cho phép Camera rồi thử lại, hoặc tải ảnh QR hay dán link.';render();}
 },
 async scanFile(input){const file=input.files?.[0];if(!file)return;await this.stopCamera();try{const s=new Html5Qrcode('fileReader',{formatsToSupport:[Html5QrcodeSupportedFormats.QR_CODE],verbose:false});const text=await s.scanFile(file,false);s.clear();await this.accept(text);}catch{this.error='Ảnh chưa đọc được QR. Chọn ảnh rõ nét, đủ bốn góc mã.';render();}},
 paste(){openModal(modalTitle('Dán link điểm danh')+`<form onsubmit="event.preventDefault();const link=document.getElementById('attendanceLink').value;closeModal();QR.accept(link)"><div class="field"><label for="attendanceLink">Link do bí thư chia sẻ</label><input class="input" id="attendanceLink" type="url" required></div><button class="btn btn-primary full">Mở sự kiện</button></form>`);},
 changeMember(id){this.saved.memberId=Number(id);this.save();this.receipt=null;this.gps=null;render();},
 async attend(){
  if(!this.scan||!this.event||this.busy)return;this.busy=true;this.error='';this.gps=null;render();
  const scan={...this.scan},memberId=this.saved.memberId;
  try{const position=await this.position();const data=await this.api('/api/events/'+scan.id+'/attendance',{method:'POST',body:JSON.stringify({token:scan.token,memberId,position})});this.receipt=data.receipt;this.event=data.event;
   if(!this.saved.receipts.some(r=>r.eventId===scan.id&&r.memberId===memberId)){this.saved.receipts.unshift({eventId:scan.id,memberId,title:data.event.title,...data.receipt});this.save();}
  }catch(e){this.error=e.message;this.gps=e.detail;}finally{this.busy=false;render();requestAnimationFrame(()=>document.querySelector('.qr-error:not(:empty),.gps-result')?.scrollIntoView({behavior:'smooth',block:'center'}));}
 },
 clear(){this.stopCamera();this.scan=null;this.event=null;this.receipt=null;this.error='';this.gps=null;history.replaceState(null,'',location.pathname);render();},
 member(){
  setNavigation([['scan','Điểm danh','qr'],['makeup','Sinh hoạt bù','calendar'],['points','Của tôi','heart']]);
  const selected=state.members.find(m=>m.id===this.saved.memberId)||state.members[1];
  const heading=pageHeading('Đoàn viên · QR và GPS','Điểm danh tại sự kiện','Quét mã, cho phép định vị và xác nhận tham gia.');
  const identity=`<div class="field"><label for="gpsMember">Tài khoản đoàn viên thử nghiệm</label><select id="gpsMember" class="input" onchange="QR.changeMember(this.value)" ${this.busy?'disabled':''}>${state.members.map(m=>`<option value="${m.id}" ${m.id===selected.id?'selected':''}>DV${String(m.id).padStart(3,'0')} · ${esc(m.name)}</option>`).join('')}</select><small class="hint">Dùng danh tính mẫu để thử luồng QR/GPS.</small></div>`;
  let content;
  if(this.receipt)content=`<div class="gps-result success">${icon('check')}<h2>Điểm danh thành công</h2><p>${esc(this.receipt.member_name)}</p><strong>${esc(this.event.title)}</strong><p>${this.stamp(this.receipt.checked_at)}</p><div class="gps-metrics"><span>Cách địa điểm <b>${this.receipt.distance_m} m</b></span><span>Sai số GPS <b>±${this.receipt.accuracy_m} m</b></span></div><p class="hint">Đã lưu kết quả và hiển thị cho bí thư.</p><button class="btn btn-secondary full" onclick="QR.clear()">Quét sự kiện khác</button></div>`;
  else if(this.event)content=`<div class="event-summary"><span class="badge teal">Đã đọc QR</span><h2>${esc(this.event.title)}</h2><p>${esc(this.event.place)}</p><div class="detail-row">${icon('clock')}${this.stamp(this.event.starts_at)}</div><div class="detail-row">${icon('pin')}Trong bán kính ${this.event.radius} m</div></div><div class="callout blue" style="margin:20px 0">${icon('pin')}<div><strong>Xác nhận vị trí của bạn</strong><span>Vị trí được dùng lúc điểm danh. Kết quả lưu khoảng cách và sai số, không lưu tọa độ cá nhân.</span></div></div><button class="btn btn-primary full" onclick="QR.attend()" ${this.busy?'disabled':''}>${icon('pin')}${this.busy?'Đang kiểm tra GPS…':'Lấy GPS và điểm danh'}</button><button class="text-btn" onclick="QR.clear()" ${this.busy?'disabled':''}>Quét mã khác</button>`;
  else if(this.loading)content='<div class="empty-state"><h3>Đang kiểm tra mã QR…</h3></div>';
  else content=`<div id="cameraReader" class="camera-reader"></div><p id="cameraStatus" class="hint center" aria-live="polite">Hướng camera về mã QR do bí thư cung cấp.</p><button class="btn btn-primary full" style="margin-top:18px" onclick="QR.startCamera()">${icon('qr')}Mở camera quét QR</button><div class="button-row" style="margin-top:12px"><label class="btn btn-secondary" for="qrImageFile">Tải ảnh QR</label><input id="qrImageFile" type="file" accept="image/*" hidden onchange="QR.scanFile(this)"><button class="btn btn-secondary" onclick="QR.paste()">Dán link QR</button></div><button class="text-btn" onclick="QR.stopCamera()">Tắt camera</button><div id="fileReader" class="file-reader"></div>`;
  const error=this.error?`<div class="qr-error" role="alert">${esc(this.error)}${this.gps?.distance!==undefined?`<p>Cách ${this.gps.distance} m · GPS ±${this.gps.accuracy} m · Bán kính ${this.gps.radius} m</p>`:''}</div>`:'';
  const rows=this.saved.receipts.filter(r=>r.memberId===selected.id);
  return heading+`<div class="grid"><section class="card">${identity}${content}${error}</section><section class="card"><h2>Lịch sử QR/GPS</h2><p class="hint" style="margin:10px 0">Các lượt đã xác nhận của ${esc(selected.name)} trên thiết bị này.</p>${rows.length?rows.map(r=>`<div class="timeline-item"><span class="timeline-icon">${icon('check')}</span><div><h3>${esc(r.title)}</h3><p>${this.stamp(r.checked_at)} · Cách ${r.distance_m} m</p></div></div>`).join(''):'<p class="muted">Chưa có lượt điểm danh GPS.</p>'}<div class="callout" style="margin-top:22px">${icon('shield')}<span>Đến gần địa điểm, bật vị trí chính xác và giữ kết nối mạng trong lúc điểm danh.</span></div></section></div>`;
 }
};
try{const s=JSON.parse(localStorage.getItem('dvs-qr-gps-v1'));if(s&&Array.isArray(s.owners)&&Array.isArray(s.receipts))QR.saved=s;}catch{}
const baseSecretary=renderBiThu,baseMember=renderDoanVien;
renderBiThu=function(){return state.tab==='qr'?QR.organizer():baseSecretary();};
renderDoanVien=function(){return state.tab==='scan'?QR.member():baseMember();};
openSessionForm=function(){QR.openCreate();};
const baseRole=switchRole,baseTab=setTab;
switchRole=function(role){QR.stopCamera();if(role!=='doanvien')history.replaceState(null,'',location.pathname);baseRole(role);if(role==='bithu')QR.refresh();};
setTab=function(tab){QR.stopCamera();baseTab(tab);if(state.role==='bithu'&&tab==='qr')QR.refresh();};
toggleOffline=function(){state.offline=!state.offline;state.offlineQueue=[];state.workerProfile.pending=false;render();showToast(state.offline?'Đang thử mất mạng. Kết nối lại để gửi điểm danh GPS.':'Đã kết nối lại. Hãy lấy GPS mới để điểm danh.');};
window.addEventListener('pagehide',()=>QR.stopCamera());
document.addEventListener('visibilitychange',()=>{if(document.hidden)QR.stopCamera();});
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#diem-danh=')&&(!QR.scan||location.hash!=='#diem-danh='+QR.scan.id+'.'+QR.scan.token))QR.accept(location.href);});
setInterval(()=>{if(!document.hidden&&state.role==='bithu'&&state.tab==='qr'&&QR.owner())QR.refresh();},8000);
if(location.hash.startsWith('#diem-danh='))QR.accept(location.href);else{render();if(state.role==='bithu')QR.refresh();}
})();