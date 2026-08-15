const root=document.documentElement;
const saved=localStorage.getItem("portfolio-theme");
if(saved) root.dataset.theme=saved;

const themeToggle=document.getElementById("themeToggle");
themeToggle?.addEventListener("click",()=>{
  const next=root.dataset.theme==="dark"?"light":"dark";
  root.dataset.theme=next;
  localStorage.setItem("portfolio-theme",next);
});

const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav-links");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll(".zoom").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.getElementById(btn.dataset.modal).classList.add("show");
    document.body.style.overflow="hidden";
  });
});
document.querySelectorAll(".modal").forEach(modal=>{
  modal.addEventListener("click",e=>{
    if(e.target===modal || e.target.classList.contains("close")){
      modal.classList.remove("show");
      document.body.style.overflow="";
    }
  });
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    document.querySelectorAll(".modal.show").forEach(m=>m.classList.remove("show"));
    document.body.style.overflow="";
  }
});

const cursor=document.querySelector(".cursor");
const dot=document.querySelector(".cursor-dot");
window.addEventListener("mousemove",e=>{
  if(!cursor||!dot)return;
  cursor.style.left=e.clientX+"px"; cursor.style.top=e.clientY+"px";
  dot.style.left=e.clientX+"px"; dot.style.top=e.clientY+"px";
});
document.querySelectorAll("a,button,.case-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>{if(cursor){cursor.style.width="62px";cursor.style.height="62px";}});
  el.addEventListener("mouseleave",()=>{if(cursor){cursor.style.width="42px";cursor.style.height="42px";}});
});
