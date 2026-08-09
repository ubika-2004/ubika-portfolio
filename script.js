const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');
if(cursor&&dot){addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'});
document.querySelectorAll('a,.skill-cloud span,.photo-frame,.about-photo,.phone').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='52px';cursor.style.height='52px'});el.addEventListener('mouseleave',()=>{cursor.style.width='30px';cursor.style.height='30px'})})}
const header=document.querySelector('.nav');let last=0;
addEventListener('scroll',()=>{const y=scrollY;header.style.transform=(y>last&&y>120)?'translateY(-105%)':'translateY(0)';last=y},{passive:true});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));
document.querySelectorAll('.skill-cloud span').forEach((el,i)=>{el.style.transitionDelay=(i*25)+'ms'});

// V5: make touch/mobile interactions feel intentional
document.querySelectorAll('.step,.case,.skill-cloud span').forEach(el=>{
  el.addEventListener('touchstart',()=>el.classList.add('touch-active'),{passive:true});
  el.addEventListener('touchend',()=>setTimeout(()=>el.classList.remove('touch-active'),220),{passive:true});
});
