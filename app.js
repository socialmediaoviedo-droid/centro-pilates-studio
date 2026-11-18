const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const schedule=[
 {day:"Lunes",time:"09:00",name:"Pilates Reformer",level:"Todos los niveles",teacher:"Equipo Studio",spots:3},
 {day:"Lunes",time:"18:00",name:"Pilates Suelo",level:"Iniciación",teacher:"Equipo Studio",spots:5},
 {day:"Lunes",time:"19:15",name:"Pilates Reformer",level:"Intermedio",teacher:"Equipo Studio",spots:2},
 {day:"Martes",time:"10:00",name:"Pilates Reformer",level:"Todos los niveles",teacher:"Equipo Studio",spots:4},
 {day:"Martes",time:"17:30",name:"Pilates Suelo",level:"Todos los niveles",teacher:"Equipo Studio",spots:6},
 {day:"Martes",time:"19:00",name:"Sesión privada",level:"Individual",teacher:"Equipo Studio",spots:1},
 {day:"Miércoles",time:"09:00",name:"Pilates Reformer",level:"Intermedio",teacher:"Equipo Studio",spots:2},
 {day:"Miércoles",time:"18:00",name:"Pilates Suelo",level:"Iniciación",teacher:"Equipo Studio",spots:5},
 {day:"Jueves",time:"10:00",name:"Pilates Reformer",level:"Todos los niveles",teacher:"Equipo Studio",spots:3},
 {day:"Jueves",time:"18:30",name:"Pilates Reformer",level:"Todos los niveles",teacher:"Equipo Studio",spots:2},
 {day:"Viernes",time:"09:30",name:"Pilates Suelo",level:"Todos los niveles",teacher:"Equipo Studio",spots:6},
 {day:"Viernes",time:"17:30",name:"Pilates Reformer",level:"Todos los niveles",teacher:"Equipo Studio",spots:3},
 {day:"Sábado",time:"10:00",name:"Pilates Reformer",level:"Todos los niveles",teacher:"Equipo Studio",spots:2}
];
let selectedDay="Lunes";
const readBookings=()=>{try{return JSON.parse(localStorage.getItem("cps_demo_bookings")||"[]")}catch{return []}};
const writeBookings=x=>localStorage.setItem("cps_demo_bookings",JSON.stringify(x));
function renderSchedule(){
 const filter=$("#classFilter").value, bookings=readBookings();
 const rows=schedule.filter(x=>x.day===selectedDay&&(filter==="Todas"||x.name===filter));
 $("#scheduleList").innerHTML=rows.length?rows.map(x=>{
  const count=bookings.filter(b=>b.day===x.day&&b.time===x.time&&b.class===x.name).length;
  const remaining=Math.max(0,x.spots-count);
  return `<div class="schedule-row"><div class="schedule-time">${x.time}</div><div><div class="schedule-name">${x.name}</div><div class="schedule-meta">${x.level} · ${x.teacher}</div></div><div class="schedule-meta">${x.day}</div><div class="spots">${remaining?remaining+" plazas":"Completa"}</div><button class="small-book" ${remaining===0?"disabled":""} data-book data-class="${x.name}" data-day="${x.day}" data-time="${x.time}">${remaining?"Reservar":"Lista espera"}</button></div>`
 }).join(""):`<div class="schedule-empty">No hay clases para este filtro. Prueba otro día.</div>`;
}
function openBooking(cls,day,time){
 $("#bookingModal").classList.add("open");$("#bookingModal").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
 if(cls)$("#bookingClass").value=cls;
 const date=$("#bookingDate");const today=new Date();date.min=today.toISOString().slice(0,10);
 if(day){const offset=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"].indexOf(day);const d=new Date();let delta=(offset-d.getDay()+7)%7;if(delta===0&&time&&time<d.toTimeString().slice(0,5))delta=7;d.setDate(d.getDate()+delta);date.value=d.toISOString().slice(0,10);}
 updateTimes(time);
}
function updateTimes(preferred){
 const date=$("#bookingDate").value, type=$("#bookingClass").value;
 if(!date){$("#bookingTime").innerHTML='<option value="">Selecciona fecha</option>';return}
 const dayName=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][new Date(date+"T12:00:00").getDay()];
 const opts=schedule.filter(x=>x.day===dayName&&(type==="Sesión privada"||x.name===type));
 $("#bookingTime").innerHTML=opts.length?opts.map(x=>`<option ${x.time===preferred?"selected":""} value="${x.time}">${x.time} · ${x.spots} plazas orientativas</option>`).join(""):'<option value="">Consultar disponibilidad</option>';
}
$("#dayTabs").addEventListener("click",e=>{const b=e.target.closest("button[data-day]");if(!b)return;selectedDay=b.dataset.day;$$("button",$("#dayTabs")).forEach(x=>x.classList.toggle("active",x===b));renderSchedule()});
$("#classFilter").addEventListener("change",renderSchedule);
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-book]");if(b){e.preventDefault();openBooking(b.dataset.class,b.dataset.day,b.dataset.time)}
 if(e.target.id==="closeBooking"||e.target.id==="bookingModal"){ $("#bookingModal").classList.remove("open");$("#bookingModal").setAttribute("aria-hidden","true");document.body.style.overflow=""}
});
$("#bookingDate").addEventListener("change",()=>updateTimes());
$("#bookingClass").addEventListener("change",()=>updateTimes());
$("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.currentTarget), date=f.get("date"), day=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][new Date(date+"T12:00:00").getDay()];
 const item={id:Date.now(),class:f.get("class"),date,day,time:f.get("time"),name:f.get("name"),email:f.get("email"),phone:f.get("phone"),created:new Date().toISOString()};
 const bookings=readBookings();bookings.push(item);writeBookings(bookings);
 $("#bookingFeedback").textContent="Solicitud de demostración guardada en este navegador. No es una reserva confirmada ni se ha enviado al centro.";
 renderSchedule();e.currentTarget.reset();updateTimes();
});
$("#contactForm").addEventListener("submit",e=>{e.preventDefault();$("#contactFeedback").textContent="Formulario de demostración: para recibir consultas por email hay que conectar un servicio de formularios o backend. No se ha enviado ningún mensaje.";e.currentTarget.reset()});
$("#menuToggle").addEventListener("click",()=>{const nav=$("#mainNav"),open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open))});
$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false")}));
$("#year").textContent=new Date().getFullYear();
if(!localStorage.getItem("cps_cookie_seen"))$("#cookieNote").classList.add("show");
$("#acceptCookies").addEventListener("click",()=>{localStorage.setItem("cps_cookie_seen","1");$("#cookieNote").classList.remove("show")});
renderSchedule();