'use strict';
(() => {
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d'),W=1200,H=600,GROUND=510,anchor={x:205,y:365},$=id=>document.getElementById(id);
const levels=[
 {name:'গিফট চাই, এখনই চাই!',quote:'“সারপ্রাইজ গিফট কোথায়?” — “সারপ্রাইজ! আমি ভুলে গেছি!”',items:['গিফট','ফুল','চকলেট'],shots:5,banter:'বউ: “আমি দেখেই তোমার সংসার করছি!”\nস্বামী: “তাহলে পাঁচ তারার রিভিউটা দাও!”'},
 {name:'সোনার গয়নার মহাযুদ্ধ',quote:'“সোনার হার চাই!” — “আমার সোনার মনটা চলবে?”',items:['হার','দুল','বালা','আংটি'],shots:5,banter:'বউ: “একটু সোনা কিনে দাও।”\nস্বামী: “একটু বলতে কত ভরি?”'},
 {name:'আমার বাড়ি বনাম তোমার বাড়ি',quote:'“আমার বাবা-মা ভালো!” — “দুই বাড়িতেই চা খাই, শান্তি পাই!”',items:['তুলনা','অভিমান','তর্ক','ইগো'],shots:5,banter:'বউ: “তোমার মা-বোন আমাকে বোঝে না!”\nস্বামী: “আজ সবাই মিলে আড্ডা দিই?”'},
 {name:'বার্ষিকী ভুললে সর্বনাশ!',quote:'“আজ কী দিন?” — “বাঁচার শেষ সুযোগ?”',items:['তারিখ','কেক','বুকিং','সেলফি','গিফট'],shots:6,banter:'বউ: “আমার জন্মদিন মনে আছে?”\nস্বামী: “ফোনে তিনটা অ্যালার্ম দিয়ে রেখেছি!”'},
 {name:'শান্তির সংসার: শেষ চ্যালেঞ্জ',quote:'“ফোনটা রাখো, কথা বলো!” — “ঠিক আছে, আজ চা আমি বানাই।”',items:['ফোন','বাসন','বাজার','রাগ','ইগো','আলসেমি'],shots:7,banter:'বউ: “আজ রান্না তুমি করো।”\nস্বামী: “তাহলে ফায়ার সার্ভিসের নম্বরটা দাও!”'}
];
let level=0,score=0,total=0,shots=0,targets=[],blocks=[],ball=null,particles=[],drag=null,state='ready',elapsed=0,last=0,settle=0,sound=false,audio=null,aim={angle:.55,power:75},best=0;
try{best=Number(localStorage.getItem('angry-bou-best'))||0}catch{} $('best').textContent=bn(best);
function bn(n){return String(n).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d])}
function hud(){ $('level').textContent=bn(level+1)+' / ৫';$('score').textContent=bn(total+score);$('shots').textContent=bn(shots);$('targets').textContent=bn(targets.filter(t=>!t.dead).length); }
function reset(){score=0;shots=levels[level].shots;blocks=[];targets=[];particles=[];ball=null;drag=null;state='ready';settle=0;$('overlay').hidden=true;const data=levels[level];$('title').textContent=data.name;$('quote').textContent=data.quote;$('banter').innerText=data.banter;
 const cols=Math.ceil(data.items.length/2),baseX=790-(cols-2)*25;
 data.items.forEach((label,i)=>{let col=i%cols,row=Math.floor(i/cols),x=baseX+col*115,y=GROUND-29-row*116;targets.push({x,y,r:28,label,dead:false});});
 for(let i=0;i<cols;i++){const x=baseX+i*115;blocks.push({x:x-49,y:GROUND-93,w:17,h:93,hp:1,dead:false},{x:x+32,y:GROUND-93,w:17,h:93,hp:1,dead:false},{x:x-54,y:GROUND-116,w:108,h:20,hp:1,dead:false});}
 hud();}
function tone(freq,duration=.1){if(!sound)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.frequency.value=freq;g.gain.setValueAtTime(.08,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.start();o.stop(audio.currentTime+duration)}catch{}}
function puff(x,y,color,n=15){for(let i=0;i<n;i++)particles.push({x,y,vx:(Math.random()-.5)*280,vy:-Math.random()*260,life:.8+Math.random()*.4,color});}
function hitTarget(t){if(t.dead)return;t.dead=true;score+=500;puff(t.x,t.y,'#ffc85b',22);tone(520);hud();}
function launch(p){if(state!=='ready'||shots<=0)return;const dx=anchor.x-p.x,dy=anchor.y-p.y;if(Math.hypot(dx,dy)<8){drag=null;return;}shots--;ball={x:p.x,y:p.y,vx:dx*8,vy:dy*8,r:23};state='flying';elapsed=0;settle=0;drag=null;tone(220,.15);hud();}
function finish(win){if(state==='won'||state==='lost')return;state=win?'won':'lost';if(win){score+=shots*150;hud();}const current=total+score;if(current>best){best=current;$('best').textContent=bn(best);try{localStorage.setItem('angry-bou-best',best)}catch{}}$('resultIcon').textContent=win?'🎉':'☕';$('resultTitle').textContent=win?(level===4?'সংসারে শান্তি ফিরে এল!':'অভিমান ভাঙল!'):'চা খেয়ে আবার চেষ্টা!';$('resultText').textContent=win?'স্কোর '+bn(current)+' · বাকি প্রতি শটে ১৫০ বোনাস।':'আরও একটু পেছনে টানুন, টাওয়ারের গোড়ায় নিশানা করুন।';$('continue').textContent=win?(level===4?'আবার শুরু করি ↻':'পরের পর্ব →'):'আবার চেষ্টা ↻';$('overlay').hidden=false;tone(win?780:160,.3);}
function step(dt){for(const p of particles){p.life-=dt;p.vy+=600*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}particles=particles.filter(p=>p.life>0);
 if(state!=='flying'&&state!=='settling')return;
 if(ball){elapsed+=dt;ball.vy+=520*dt;ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;
 for(const t of targets)if(!t.dead&&Math.hypot(ball.x-t.x,ball.y-t.y)<ball.r+t.r){hitTarget(t);ball.vx*=.83;ball.vy-=50;}
 for(const b of blocks)if(!b.dead&&ball.x+ball.r>b.x&&ball.x-ball.r<b.x+b.w&&ball.y+ball.r>b.y&&ball.y-ball.r<b.y+b.h){b.dead=true;score+=75;puff(b.x+b.w/2,b.y+b.h/2,'#c67b49');ball.vx*=.82;ball.vy*=.85;tone(300,.06);hud();}
 if(ball.y+ball.r>GROUND){ball.y=GROUND-ball.r;if(Math.abs(ball.vy)>65){ball.vy=-Math.abs(ball.vy)*.42;ball.vx*=.78;tone(130,.05);}else{ball.vy=0;ball.vx*=Math.pow(.15,dt);}}
 if(ball.x>W+80||ball.x<-100||ball.y>H+100||elapsed>8||(elapsed>1&&Math.abs(ball.vx)<12&&Math.abs(ball.vy)<12)){ball=null;state='settling';settle=0;}}
 // Broken supports let shelves and gift boxes fall, allowing chain reactions.
 for(const b of blocks)if(!b.dead&&b.w>b.h){const support=blocks.some(s=>!s.dead&&s.h>s.w&&Math.abs(s.y-(b.y+b.h))<4&&s.x<b.x+b.w&&s.x+s.w>b.x);if(!support){b.dead=true;score+=75;puff(b.x+b.w/2,b.y,'#c67b49');hud();}}
 let falling=false;
 for(const t of targets)if(!t.dead){let floor=GROUND-t.r;for(const b of blocks)if(!b.dead&&b.w>b.h&&t.x+t.r>b.x&&t.x-t.r<b.x+b.w&&t.y+t.r<=b.y+10)floor=Math.min(floor,b.y-t.r);if(t.y<floor-1){falling=true;t.vy=(t.vy||0)+520*dt;t.y+=t.vy*dt;if(t.y>=floor){t.y=floor;if(t.vy>150){hitTarget(t);for(const other of targets)if(!other.dead&&other!==t&&Math.hypot(t.x-other.x,t.y-other.y)<65)hitTarget(other);}t.vy=0;}}}
 if(targets.every(t=>t.dead)){finish(true);return;}
 if(state==='settling'){settle+=dt;if(!falling&&settle>.65){if(shots<=0)finish(false);else state='ready';}}
}
function round(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}}
function circle(x,y,r,fill){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();}
function wife(x,y,r=24){ctx.save();ctx.translate(x,y);circle(0,0,r+3,'#342b40');circle(0,2,r,'#ed775d');ctx.fillStyle='#271f31';ctx.beginPath();ctx.arc(0,-3,r,-Math.PI,0);ctx.fill();circle(13,-19,9,'#271f31');circle(0,-7,2.8,'#b7314a');ctx.strokeStyle='#30283c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-14,-5);ctx.lineTo(-5,-2);ctx.moveTo(5,-2);ctx.lineTo(14,-5);ctx.stroke();circle(-9,2,2,'#30283c');circle(9,2,2,'#30283c');ctx.beginPath();ctx.arc(0,9,6,0,Math.PI);ctx.stroke();circle(-19,10,3,'#ffd56c');circle(19,10,3,'#ffd56c');ctx.restore();}
function gift(t,i){round(t.x-27,t.y-27,54,54,8,['#ed887e','#ffc565','#a5b9ed','#bba0db'][i%4],'#fff7');ctx.fillStyle='#fff4df';ctx.fillRect(t.x-4,t.y-27,8,54);ctx.fillRect(t.x-27,t.y-11,54,7);ctx.strokeStyle='#fff4df';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(t.x-8,t.y-29,9,5,.6,0,Math.PI*2);ctx.ellipse(t.x+8,t.y-29,9,5,-.6,0,Math.PI*2);ctx.stroke();round(t.x-33,t.y+5,66,23,6,'#253147');ctx.fillStyle='#fff';ctx.font='13px "Nirmala UI",sans-serif';ctx.textAlign='center';ctx.fillText(t.label,t.x,t.y+22);}
function background(){const sky=ctx.createLinearGradient(0,0,0,GROUND);sky.addColorStop(0,'#b6deda');sky.addColorStop(1,'#f9e5b9');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);circle(1008,92,48,'#fff1bf');circle(1008,92,67,'#fff1bf44');ctx.fillStyle='#ffffff75';for(const [x,y]of [[135,80],[435,125],[760,65]]){circle(x,y,21,'#ffffff80');circle(x+26,y-10,30,'#ffffff80');circle(x+53,y,22,'#ffffff80');ctx.fillRect(x,y,53,20);}ctx.fillStyle='#8bb8ab66';ctx.beginPath();ctx.moveTo(0,420);ctx.quadraticCurveTo(180,250,350,430);ctx.quadraticCurveTo(570,245,800,420);ctx.quadraticCurveTo(1000,240,1200,385);ctx.lineTo(1200,510);ctx.lineTo(0,510);ctx.fill();
 // A small Bengali courtyard, drawn entirely with original canvas shapes.
 round(385,315,185,165,5,'#f1cda1');ctx.fillStyle='#be725b';ctx.beginPath();ctx.moveTo(365,323);ctx.lineTo(478,246);ctx.lineTo(590,323);ctx.fill();round(447,394,47,86,3,'#806f6a');round(404,350,30,38,4,'#688f91');round(521,350,30,38,4,'#688f91');ctx.fillStyle='#6d9675';ctx.fillRect(0,GROUND,W,12);ctx.fillStyle='#cbaf80';ctx.fillRect(0,GROUND+12,W,90);ctx.fillStyle='#b49b7290';for(let x=0;x<W;x+=32)ctx.fillRect(x,GROUND+28+(x%3)*9,12,3);
 ctx.strokeStyle='#6b8159';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(1100,GROUND);ctx.lineTo(1100,370);ctx.stroke();circle(1100,350,54,'#7eaa7b');circle(1070,385,36,'#7eaa7b');circle(1135,380,35,'#7eaa7b');ctx.fillStyle='#688650';ctx.fillRect(80,485,30,25);ctx.fillStyle='#a77962';ctx.fillRect(76,489,38,21);
}
function draw(){background();ctx.textAlign='center';ctx.fillStyle='#4c716d';ctx.font='bold 14px "Nirmala UI",sans-serif';ctx.fillText('সংসার কমেডি ক্লাব',478,343);
 for(const b of blocks)if(!b.dead){round(b.x,b.y,b.w,b.h,3,'#bc8255','#855b3d');ctx.strokeStyle='#dca778';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(b.x+4,b.y+5);ctx.lineTo(b.x+b.w-4,b.y+b.h-5);ctx.stroke();}
 targets.forEach((t,i)=>{if(!t.dead)gift(t,i);});
 ctx.strokeStyle='#60443a';ctx.lineWidth=15;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(205,490);ctx.lineTo(205,390);ctx.moveTo(205,413);ctx.lineTo(176,355);ctx.moveTo(205,413);ctx.lineTo(232,355);ctx.stroke();
 const p=drag||(state==='ready'?anchor:null);if(p){ctx.strokeStyle='#493b41';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(176,355);ctx.lineTo(p.x,p.y);ctx.lineTo(232,355);ctx.stroke();wife(p.x,p.y);if(drag){let vx=(anchor.x-p.x)*8,vy=(anchor.y-p.y)*8;for(let t=.12;t<1.9;t+=.12){let x=p.x+vx*t,y=p.y+vy*t+260*t*t;if(y>GROUND)break;circle(x,y,3.5,'#35495888');}}else{ctx.fillStyle='#42585c';ctx.font='bold 16px "Nirmala UI",sans-serif';ctx.fillText('← টানুন ও ছাড়ুন',200,280);}}
 if(ball)wife(ball.x,ball.y);for(let i=0;i<Math.max(0,shots-1);i++)wife(75+i*35,GROUND-19,13);
 for(const p of particles){ctx.globalAlpha=Math.min(1,p.life*2);round(p.x,p.y,7,7,2,p.color);}ctx.globalAlpha=1;
}
function position(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};}
function clamp(p){let dx=p.x-anchor.x,dy=p.y-anchor.y;const d=Math.hypot(dx,dy);if(d>110){dx*=110/d;dy*=110/d;}return{x:anchor.x+Math.min(25,dx),y:anchor.y+dy};}
canvas.addEventListener('pointerdown',e=>{if(state!=='ready')return;const p=position(e);if(Math.hypot(p.x-anchor.x,p.y-anchor.y)>80)return;canvas.setPointerCapture(e.pointerId);drag=clamp(p);canvas.focus();e.preventDefault();});
canvas.addEventListener('pointermove',e=>{if(drag)drag=clamp(position(e));});canvas.addEventListener('pointerup',()=>{if(drag)launch(drag);});canvas.addEventListener('pointercancel',()=>{drag=null;});
canvas.addEventListener('keydown',e=>{if(e.code==='KeyR'){reset();return;}if(state!=='ready')return;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)){e.preventDefault();if(e.code==='ArrowLeft')aim.angle=Math.min(1.35,aim.angle+.05);if(e.code==='ArrowRight')aim.angle=Math.max(.1,aim.angle-.05);if(e.code==='ArrowUp')aim.power=Math.min(110,aim.power+5);if(e.code==='ArrowDown')aim.power=Math.max(25,aim.power-5);drag={x:anchor.x-Math.cos(aim.angle)*aim.power,y:anchor.y+Math.sin(aim.angle)*aim.power};if(e.code==='Space')launch(drag);}});
$('restart').onclick=reset;$('continue').onclick=()=>{if(state==='won'){if(level===4){level=0;total=0;}else{total+=score;level++;}}reset();};$('sound').onclick=()=>{sound=!sound;$('sound').textContent='শব্দ: '+(sound?'চালু':'বন্ধ');$('sound').setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-label',sound?'শব্দ বন্ধ করুন':'শব্দ চালু করুন');tone(500);};
function frame(ts){const dt=Math.min((ts-last)/1000||0,.05);last=ts;for(let i=0;i<4;i++)step(dt/4);draw();requestAnimationFrame(frame);}reset();requestAnimationFrame(frame);
})();
