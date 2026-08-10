const cursor = document.querySelector('.cursor');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let cursorX = mouseX, cursorY = mouseY;
let hovering = false;
let lastLineX = mouseX, lastLineY = mouseY;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animatePointer(){
  cursorX += (mouseX - cursorX) * 0.22;
  cursorY += (mouseY - cursorY) * 0.22;
  if(cursor){
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  }
  if(!reduceMotion && !hovering) drawTrailLine(cursorX,cursorY);
  requestAnimationFrame(animatePointer);
}

function drawTrailLine(x,y){
  const dx=x-lastLineX, dy=y-lastLineY;
  const dist=Math.hypot(dx,dy);
  if(dist < 10) return;
  const line=document.createElement('span');
  line.className='cursor-line';
  line.style.left=lastLineX+'px';
  line.style.top=lastLineY+'px';
  line.style.width=Math.min(dist,90)+'px';
  line.style.transform=`translateY(-50%) rotate(${Math.atan2(dy,dx)}rad)`;
  line.style.opacity='.42';
  document.body.appendChild(line);
  requestAnimationFrame(()=>{
    line.style.opacity='0';
    line.style.width='0px';
    line.style.transition='width .38s ease, opacity .38s ease';
  });
  setTimeout(()=>line.remove(),430);
  lastLineX=x; lastLineY=y;
}

window.addEventListener('mousemove',e=>{
  mouseX=e.clientX; mouseY=e.clientY;
},{passive:true});

if(cursor){
  const targets=document.querySelectorAll('a,button,.skill-cloud span,.photo-frame,.about-photo,.case-image,.step');
  targets.forEach(el=>{
    el.addEventListener('mouseenter',()=>{hovering=true;cursor.classList.add('is-hover');});
    el.addEventListener('mouseleave',()=>{hovering=false;cursor.classList.remove('is-hover');});
  });
  window.addEventListener('mousedown',()=>cursor.classList.add('is-click'));
  window.addEventListener('mouseup',()=>cursor.classList.remove('is-click'));
}

animatePointer();

// Keep the existing site's other interactions intact.
const nav=document.querySelector('.nav');
let lastScroll=window.scrollY;
window.addEventListener('scroll',()=>{
  const now=window.scrollY;
  if(nav) nav.style.transform=(now>lastScroll && now>120)?'translateY(-100%)':'translateY(0)';
  lastScroll=now;
},{passive:true});
