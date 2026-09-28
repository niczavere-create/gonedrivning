/* Tak-popup efter afsendt formular */
(function(){
  if(!/[?&]sendt=1/.test(location.search))return;
  try{history.replaceState({},'',location.pathname+location.hash)}catch(e){}
  var css='.gn-ty{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:20px;background:rgba(8,9,10,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:gnf .25s ease}'+
  '.gn-ty-card{position:relative;width:min(440px,100%);background:#16181b;color:#F3F0E9;border:1px solid #3a3f44;border-radius:20px;padding:34px 26px 26px;text-align:center;box-shadow:0 40px 90px -20px rgba(0,0,0,.8);animation:gnu .35s cubic-bezier(.2,.7,.1,1);font-family:Archivo,system-ui,sans-serif;overflow:hidden}'+
  '.gn-ty-card::before{content:"";position:absolute;left:0;right:0;top:0;height:8px;background:repeating-linear-gradient(-45deg,#FFC21A 0 12px,#141210 12px 24px)}'+
  '.gn-ty-ic{width:68px;height:68px;margin:6px auto 18px;border-radius:50%;background:#FFC21A;color:#141210;display:grid;place-items:center;box-shadow:0 0 0 8px rgba(255,194,26,.15)}'+
  '.gn-ty h2{margin:0 0 10px;font-size:26px;line-height:1.15;font-weight:800;font-stretch:115%;text-transform:uppercase;letter-spacing:-.01em}'+
  '.gn-ty p{margin:0 0 8px;color:#D2CCC1;font-size:16px;line-height:1.55}'+
  '.gn-ty .tel{display:inline-block;margin:6px 0 20px;color:#FFC21A;font-weight:700;text-decoration:none;font-size:18px}'+
  '.gn-ty button{width:100%;min-height:52px;border:0;border-radius:999px;background:#FFC21A;color:#141210;font:inherit;font-weight:800;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}'+
  '.gn-ty .x{position:absolute;top:16px;right:14px;width:40px;min-height:40px;height:40px;border-radius:50%;background:transparent;color:#A39E95;font-size:22px;letter-spacing:0}'+
  '@keyframes gnf{from{opacity:0}}@keyframes gnu{from{opacity:0;transform:translateY(18px) scale(.97)}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var w=document.createElement('div');w.className='gn-ty';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-labelledby','gnTyH');
  w.innerHTML='<div class="gn-ty-card"><button type="button" class="x" aria-label="Luk">×</button>'+
    '<div class="gn-ty-ic" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>'+
    '<h2 id="gnTyH">Tak for din forespørgsel!</h2>'+
    '<p>Vi har modtaget din henvendelse og kontakter dig hurtigst muligt – som regel inden for 24 timer.</p>'+
    '<p>Haster det? Ring til os:</p><a class="tel" href="tel:+4522123277">+45 22 12 32 77</a>'+
    '<button type="button" class="ok">Luk</button></div>';
  function close(){w.remove();document.removeEventListener('keydown',esc)}
  function esc(e){if(e.key==='Escape')close()}
  w.addEventListener('click',function(e){if(e.target===w||e.target.closest('.x,.ok'))close()});
  document.addEventListener('keydown',esc);
  function show(){document.body.appendChild(w);var b=w.querySelector('.ok');if(b)b.focus()}
  if(document.body)show();else document.addEventListener('DOMContentLoaded',show);
})();
