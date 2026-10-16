(function(){var $=function(s){return document.querySelector(s)};var lang='da';
var CALC=[
 {k:'kitchen',en:['Kitchen demolition','Kitchen taken down and removed incl. cabinets, worktops and installations.'],
  da:['Nedrivning af køkken','Nedtagning og bortskaffelse af køkken inkl. skabe, bordplader og installationer.'],
  fixedOpts:[{price:4500,en:'Small kitchen (up to 7 m²)',da:'Lille køkken (op til 7 m²)'},{price:7500,en:'Large kitchen (from 7 m²)',da:'Stort køkken (fra 7 m²)'}]},
 {k:'wall',en:['Wall demolition','Light or load-bearing walls removed incl. clean-up.'],
  da:['Nedrivning af vægge','Nedrivning af lette eller bærende vægge inkl. oprydning.'],
  opts:[{r:299,en:'Plasterboard wall',da:'Gipsvæg'},{r:449,en:'Brick / concrete wall',da:'Murvæg / Betonvæg'}]},
 {k:'floor',en:['Floor demolition','Floor covering and subfloor removed incl. clean-up.'],
  da:['Nedrivning af gulve','Fjernelse af gulvbelægning og underlag inkl. oprydning.'],
  opts:[{r:199,en:'Wooden floor',da:'Trægulv'},{r:299,en:'Tiled floor',da:'Flisegulv'},{r:600,en:'Concrete floor',da:'Betongulv'}]},
 {k:'ceiling',en:['Ceiling demolition','Ceiling boards taken down incl. insulation and clean-up.'],
  da:['Nedrivning af lofter','Nedtagning af loftbeklædning inkl. isolering og oprydning.'],
  opts:[{r:399,en:'Plasterboard ceiling',da:'Gipsloft'},{r:399,en:'Timber ceiling',da:'Træloft'}]},
 {k:'garage',en:['Garage demolition','Garage demolished and materials removed.'],
  da:['Nedrivning af garage','Nedrivning af garage og bortskaffelse af materialer.'],
  opts:[{r:499,en:'Timber garage',da:'Trægarage'},{r:999,en:'Brick / concrete garage',da:'Murstensgarage / Betongarage'}]},
 {k:'shed',en:['Shed demolition','Sheds and smaller buildings removed incl. clean-up.'],
  da:['Nedrivning af skur','Nedrivning af skure og mindre bygninger inkl. oprydning.'],
  opts:[{r:599,en:'Timber shed',da:'Træskur'},{r:999,en:'Brick / concrete shed',da:'Mursten / Betonskur'}]},
 {k:'house',en:['Summer house demolition','Summer houses demolished incl. waste disposal.'],
  da:['Nedrivning sommerhus','Nedrivning af sommerhuse inkl. bortskaffelse af affald.'],rate:999,sk:'summerhouse'},
 {k:'house',en:['House demolition','Full or partial house demolition incl. waste disposal.'],
  da:['Nedrivning af hus','Total- eller delvis nedrivning af huse inkl. bortskaffelse.'],rate:1199,sk:'fullhouse'},
 {k:'other',en:['Another job','Something else? Call us and we will price it.'],
  da:['Anden opgave','Har du en anden opgave? Ring til os, så giver vi en pris.'],ask:1}
];
var calcState={};
var CT={da:{cat:'Kategori',type:'Type',m2:'Areal (m²)',pickCat:'Vælg kategori',fixed:'Fast pris',rm:'Fjern',perm2:'kr/m²',call:'Ring til os på 22 12 32 77, så giver vi en pris.',price:'Pris'},
        en:{cat:'Category',type:'Type',m2:'Area (m²)',pickCat:'Choose category',fixed:'Fixed price',rm:'Remove',perm2:'kr/m²',call:'Call us on 22 12 32 77 and we will price it.',price:'Price'}};
function ccType(c){return c.fixedOpts||c.opts||[{r:c.rate,en:'Standard',da:'Standard'}]}
var calcRowsState=[{c:-1,o:0,m2:''}];
function nf(n){return n.toLocaleString(lang==='da'?'da-DK':'en-GB')}
function renderCalc(){
  var box=$('#calcCats'),T=CT[lang]||CT.da;box.innerHTML='';
  calcRowsState.forEach(function(st,ri){
    var c=CALC[st.c],row=document.createElement('div');row.className='crow';
    var cat='<label class="f-cat"><span>'+T.cat+'</span><select data-f="c"><option value="-1">'+T.pickCat+'</option>'+
      CALC.map(function(x,i){return '<option value="'+i+'"'+(st.c===i?' selected':'')+'>'+x[lang][0]+'</option>'}).join('')+'</select></label>';
    var list=c&&!c.ask?ccType(c):null;
    var type='<label class="f-type"><span>'+T.type+'</span><select data-f="o"'+(list?'':' disabled')+'>'+(list?list.map(function(o,j){return '<option value="'+j+'"'+(st.o===j?' selected':'')+'>'+o[lang]+'</option>'}).join(''):'<option>–</option>')+'</select></label>';
    var m2=(c&&c.fixedOpts)?'<label class="f-m2"><span>'+T.m2+'</span><div class="fixed">'+T.fixed+'</div></label>':
      '<label class="f-m2"><span>'+T.m2+'</span><input data-f="m2" type="number" min="0" step="1" inputmode="decimal" placeholder="0" value="'+st.m2+'"'+(c&&!c.ask?'':' disabled')+'></label>';
    var rm='<button type="button" class="rm" aria-label="'+T.rm+'" title="'+T.rm+'"'+(calcRowsState.length<2&&st.c<0?' style="visibility:hidden"':'')+'>×</button>';
    var info='';
    if(c&&c.ask)info='<p class="rate">'+T.call+'</p>';
    
    row.innerHTML=cat+type+m2+rm+info;
    if(c&&!c.ask&&(c.fixedOpts||parseFloat(st.m2)>0))row.classList.add('ok');
    row.querySelector('[data-f=c]').addEventListener('change',function(e){st.c=+e.target.value;st.o=0;renderCalc();sumCalc();var n=box.children[ri];var f=n&&(n.querySelector('input[data-f=m2]:not([disabled])'));if(f)f.focus()});
    var so=row.querySelector('[data-f=o]');if(so)so.addEventListener('change',function(e){st.o=+e.target.value;renderCalc();sumCalc()});
    var si=row.querySelector('[data-f=m2]');if(si)si.addEventListener('input',function(e){st.m2=e.target.value;row.classList.toggle('ok',parseFloat(st.m2)>0);sumCalc()});
    row.querySelector('.rm').addEventListener('click',function(){calcRowsState.splice(ri,1);if(!calcRowsState.length)calcRowsState.push({c:-1,o:0,m2:''});renderCalc();sumCalc()});
    box.appendChild(row)});
}

$('#calcAdd').addEventListener('click',function(){calcRowsState.push({c:-1,o:0,m2:''});renderCalc()});
function calcRows(){
  var rows=[],area=0,total=0;
  calcRowsState.forEach(function(st){var c=CALC[st.c];if(!c||c.ask)return;var list=ccType(c),o=list[st.o]||list[0];
    if(c.fixedOpts){rows.push({n:c[lang][0]+' ('+o[lang]+')',d:nf(o.price)+' kr',v:o.price});total+=o.price;return}
    var m2=Math.max(0,parseFloat(String(st.m2).replace(',','.'))||0);if(!m2)return;area+=m2;
    var name=c[lang][0]+(c.opts?' ('+o[lang]+')':''),v=Math.round(o.r*m2);
    rows.push({n:name,d:nf(m2)+' m² × '+nf(o.r)+' kr/m² = '+nf(v)+' kr',v:v});total+=v});
  return {rows:rows,area:area,total:total};
}
function sumCalc(){
  var r=calcRows();
  $('#calcArea').textContent=nf(Math.round(r.area*10)/10);
  $('#calcTotal').textContent=nf(r.total);
  $('#calcVat').textContent=nf(Math.round(r.total*1.25));
  var ul=$('#calcLines');ul.innerHTML='';
  r.rows.forEach(function(x){var li=document.createElement('li');li.innerHTML='<span>'+x.n+'</span><b>'+x.d+'</b>';ul.appendChild(li)});
  ul.hidden=!r.rows.length;$('#calcEmpty').hidden=!!r.rows.length;
}

$('#calcSend').addEventListener('click',function(){var r=calcRows();var t=r.rows.length?'Prisoverslag fra hjemmesiden:\n'+r.rows.map(function(x){return '· '+x.n+' - '+x.d}).join('\n')+'\nI alt ca. '+nf(r.total)+' kr ekskl. moms':'';var m=$('#f-msg');if(m&&t)m.value=t;var q=$('#tilbud');if(q)q.scrollIntoView({behavior:'smooth'})});
var pre=+(document.getElementById('beregner').getAttribute('data-cat'));if(pre>=0)calcRowsState[0].c=pre;
renderCalc();sumCalc();
})();
(function(){var m=document.querySelector('.rvm');if(!m)return;
function fit(){m.querySelectorAll('.rev').forEach(function(f){var q=f.querySelector('.rv-q'),b=f.querySelector('.rv-more');if(!q||!b||f.classList.contains('open'))return;b.hidden=!(q.scrollHeight>q.clientHeight+2)})}
m.addEventListener('click',function(e){var b=e.target.closest('.rv-more');if(!b)return;var f=b.closest('.rev');var o=f.classList.toggle('open');b.textContent=o?'Vis mindre':'Læs mere';m.classList.toggle('paused',!!m.querySelector('.rev.open'))});
m.addEventListener('touchstart',function(){m.classList.add('paused')},{passive:true});
m.addEventListener('touchend',function(){setTimeout(function(){if(!m.querySelector('.rev.open'))m.classList.remove('paused')},2500)},{passive:true});
addEventListener('load',fit);addEventListener('resize',fit);fit()})();
(function(){var s=document.querySelector('.stats');if(!s)return;var t=document.createElement('div');t.className='st-track';var h=s.innerHTML;t.innerHTML=h+h+h+h;s.innerHTML='';s.appendChild(t);s.classList.add('marq');[].slice.call(t.children,s.children.length?0:0).forEach(function(d,i){if(i>=3)d.setAttribute('aria-hidden','true')})})();
