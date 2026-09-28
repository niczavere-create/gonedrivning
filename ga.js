/* Google Analytics 4 + samtykke (Consent Mode v2) + events */
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
(function(){
  var ID='G-KRDW78V2G3',KEY='gn-consent',c=null;
  try{c=localStorage.getItem(KEY)}catch(e){}
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c==='yes'?'granted':'denied',wait_for_update:500});
  gtag('js',new Date());gtag('config',ID);
  var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(s);

  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}
    gtag('consent','update',{analytics_storage:v==='yes'?'granted':'denied'})}
  function banner(){
    var css='.gn-ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:900;max-width:560px;margin:0 auto;background:#16181b;color:#F3F0E9;border:1px solid #3a3f44;border-radius:16px;padding:16px 16px 14px;box-shadow:0 24px 60px -16px rgba(0,0,0,.8);font:15px/1.5 Archivo,system-ui,sans-serif}'+
      '.gn-ck p{margin:0 0 12px;color:#D2CCC1}.gn-ck b{color:#F3F0E9}.gn-ck div{display:flex;gap:8px}'+
      '.gn-ck button{flex:1;min-height:44px;border-radius:999px;font:inherit;font-weight:700;cursor:pointer;border:1px solid #3a3f44;background:transparent;color:#F3F0E9}'+
      '.gn-ck .y{background:#FFC21A;border-color:#FFC21A;color:#141210}'+
      '@media(max-width:860px){.gn-ck{bottom:84px}}';
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var b=document.createElement('div');b.className='gn-ck';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookies');
    b.innerHTML='<p><b>Vi bruger cookies</b> til anonym statistik (Google Analytics), så vi kan gøre hjemmesiden bedre. Du vælger selv.</p><div><button type="button" class="n">Kun nødvendige</button><button type="button" class="y">Accepter</button></div>';
    b.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;set(t.classList.contains('y')?'yes':'no');b.remove()});
    document.body.appendChild(b);
  }
  if(c!=='yes'&&c!=='no'){if(document.body)banner();else document.addEventListener('DOMContentLoaded',banner)}

  /* events */
  document.addEventListener('submit',function(e){var f=e.target;if(f&&/formsubmit/.test(f.action||'')){
    var j=f.querySelector('[name=Opgave],select');gtag('event','generate_lead',{form_page:location.pathname,job:j?(j.options?j.options[j.selectedIndex].text:j.value):''})}},true);
  document.addEventListener('click',function(e){var a=e.target.closest('a[href^="tel:"],a[href^="mailto:"]');if(!a)return;
    gtag('event',a.href.indexOf('tel:')===0?'phone_click':'email_click',{link_url:a.href,page:location.pathname})},true);
})();
