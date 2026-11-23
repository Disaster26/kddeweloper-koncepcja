(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
function grp(n,d){var p=n.toFixed(d).split('.');p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,' ');return p.join(',')}
var zl=function(n){return grp(n,0)+' zł'},zl2=function(n){return grp(n,2)+' zł'},m2=function(n){return grp(n,2)+' m²'};
var ST={dost:'Dostępny',rez:'Rezerwacja',sprz:'Sprzedany'};
var L=[
 {id:'A1',b:'A',pol:'l',pow:94.6,pok:4,ogr:286,st:'dost',cena:719000,hist:[['15.09.2026',699000],['03.11.2026',719000]]},
 {id:'A2',b:'A',pol:'p',pow:94.6,pok:4,ogr:312,st:'rez',cena:729000,hist:[['15.09.2026',709000],['03.11.2026',729000]]},
 {id:'B1',b:'B',pol:'l',pow:101.2,pok:5,ogr:340,st:'dost',cena:769000,hist:[['15.09.2026',769000]]},
 {id:'B2',b:'B',pol:'p',pow:101.2,pok:5,ogr:298,st:'dost',cena:759000,hist:[['15.09.2026',749000],['20.10.2026',759000]]}
];
function mini(l){
 var a=l.pol==='l'?'#D2541E':'#fff',b=l.pol==='p'?'#D2541E':'#fff';
 return '<svg class="mini" viewBox="0 0 64 38" aria-hidden="true"><path d="M32 2 2 20v16h30z" fill="'+a+'"/><path d="M32 2l30 18v16H32z" fill="'+b+'"/><path d="M2 20 32 2l30 18M2 20v16h60V20M32 2v34" fill="none" stroke="#0F2E4A" stroke-width="2"/></svg>';
}
function akcje(l){
 return '<button type="button" data-rzut="'+l.id+'">Rzut</button><button type="button" data-hist="'+l.id+'">Historia cen</button><a href="#" data-toast="Tu otworzy się prospekt lokalu '+l.id+' (PDF z panelu).">Prospekt</a>'+(l.st==='sprz'?'':'<a class="zap" href="#kontakt" data-zap="'+l.id+'">Zapytaj</a>');
}
var tb=$('#tb'),kf=$('#kafle'),sel=$('#sel-lokal');
L.forEach(function(l){
 var cm=l.cena/l.pow;
 tb.insertAdjacentHTML('beforeend','<tr data-st="'+l.st+'" id="w-'+l.id+'"><td><b>'+l.id+'</b></td><td>'+l.b+'</td><td>'+m2(l.pow)+'</td><td>'+l.pok+'</td><td>'+l.ogr+' m²</td><td><span class="st '+l.st+'">'+ST[l.st]+'</span></td><td class="cena"><b>'+zl(l.cena)+'</b><small>'+zl2(cm)+' / m²</small></td><td><div class="akcje">'+akcje(l)+'</div></td></tr>');
 kf.insertAdjacentHTML('beforeend','<article class="kafel" data-st="'+l.st+'" id="k-'+l.id+'"><div class="gora"><div><h3>Lokal '+l.id+'</h3><span class="st '+l.st+'">'+ST[l.st]+'</span></div>'+mini(l)+'</div><dl><dt>Powierzchnia</dt><dd>'+m2(l.pow)+'</dd><dt>Pokoje</dt><dd>'+l.pok+'</dd><dt>Ogród</dt><dd>'+l.ogr+' m²</dd></dl><p class="cena">'+zl(l.cena)+'<small>'+zl2(cm)+' za m²</small></p><div class="akcje">'+akcje(l)+'</div></article>');
 sel.insertAdjacentHTML('beforeend','<option value="'+l.id+'">Lokal '+l.id+' - '+ST[l.st].toLowerCase()+'</option>');
});
$('#ile-dost').textContent=L.filter(function(l){return l.st==='dost'}).length;

/* naglowek */
var top=$('#top'),bur=$('#burger');
function sc(){top.classList.toggle('jest',scrollY>40)}
addEventListener('scroll',sc,{passive:true});sc();
bur.addEventListener('click',function(){var o=top.classList.toggle('otw');bur.setAttribute('aria-expanded',o);bur.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
$$('#nav a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('otw');bur.setAttribute('aria-expanded',false)})});

/* filtr i widok */
$$('[data-filtr]').forEach(function(b){b.addEventListener('click',function(){
 $$('[data-filtr]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
 var f=b.dataset.filtr;$$('#tb tr,#kafle .kafel').forEach(function(r){r.hidden=f==='dost'&&r.dataset.st!=='dost'});
})});
$$('[data-widok]').forEach(function(b){b.addEventListener('click',function(){
 $$('[data-widok]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
 var k=b.dataset.widok==='kaf';$('.tab-wrap').classList.toggle('off',k);kf.classList.toggle('on',k);
})});

/* toast */
var to=$('#toast'),tt;
function toast(t){to.textContent=t;to.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){to.classList.remove('on')},3200)}

/* okno */
var ok=$('#okno'),last;
function otworz(t,h){last=document.activeElement;$('#okno-t').textContent=t;$('#okno-b').innerHTML=h;ok.classList.add('on');$('.zamk',ok).focus()}
function zamknij(){ok.classList.remove('on');if(last)last.focus()}
$('.zamk',ok).addEventListener('click',zamknij);
ok.addEventListener('click',function(e){if(e.target===ok)zamknij()});
function rzut(l){
 var w=l.pow>100,r='#E9DCC6',k='#DDE3E8',t='#F4EFE6';
 function pok(x,y,ww,hh,f,n,m){return '<rect x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" fill="'+f+'"/><text x="'+(x+ww/2)+'" y="'+(y+hh/2-2)+'" text-anchor="middle" font-weight="600">'+n+'</text><text x="'+(x+ww/2)+'" y="'+(y+hh/2+15)+'" text-anchor="middle" fill="#6B7682" font-size="12">'+m+' m²</text>'}
 var sc='<path d="M10 10h380v240H10z" fill="none" stroke="#0F2E4A" stroke-width="6"/>';
 var parter='<svg class="kond" data-k="p" viewBox="0 0 400 260" font-family="Figtree,sans-serif" font-size="13" fill="#15212C">'+pok(10,10,190,150,r,'Salon z aneksem',w?'34,2':'31,8')+pok(200,10,110,90,t,'Kuchnia','11,4')+pok(310,10,80,90,k,'Spiżarnia','3,1')+pok(10,160,110,90,k,'Łazienka','5,2')+pok(120,160,140,90,t,'Wiatrołap','6,8')+pok(260,160,130,90,r,w?'Pokój':'Gabinet','9,6')+pok(200,100,110,60,t,'Hol','5,3')+pok(310,100,80,60,t,'Schody','4,0')+'<path d="M200 10v150M10 160h250M260 160v90M120 160v90M310 10v150M200 100h190" stroke="#0F2E4A" stroke-width="2.5" fill="none"/>'+sc+'<path d="M40 10h80M230 10h50M10 60v60M390 180v40" stroke="#9FC3E0" stroke-width="6"/></svg>';
 var pietro='<svg class="kond" data-k="g" hidden viewBox="0 0 400 260" font-family="Figtree,sans-serif" font-size="13" fill="#15212C">'+pok(10,10,150,120,r,'Sypialnia','14,6')+pok(160,10,150,120,r,'Pokój','11,9')+pok(310,10,80,120,k,'Garderoba','4,2')+pok(10,130,150,120,r,'Pokój','11,2')+pok(160,130,100,120,k,'Łazienka','7,4')+pok(260,130,130,120,t,'Korytarz','6,1')+'<path d="M160 10v240M10 130h380M310 10v120M260 130v120" stroke="#0F2E4A" stroke-width="2.5" fill="none"/>'+sc+'<path d="M50 10h70M200 10h70M10 170v50" stroke="#9FC3E0" stroke-width="6"/></svg>';
 return '<p>Przykład kolorowego rzutu z metrażem każdego pomieszczenia. Prawdziwe rzuty lokali dodaje się w panelu.</p><div class="rzut-tab" role="group" aria-label="Kondygnacja"><button type="button" data-kond="p" aria-pressed="true">Parter</button><button type="button" data-kond="g" aria-pressed="false">Poddasze</button></div><div class="rzut">'+parter+pietro+'<p style="margin-top:8px;font-size:14px;color:#6B7682">Lokal '+l.id+', '+m2(l.pow)+' całego lokalu (liczby przykładowe)</p></div>';
}
function hist(l){
 var h='<p>Zmiany ceny lokalu '+l.id+' zapisane przez stronę automatycznie.</p><table class="hist"><thead><tr><th>Od dnia</th><th>Cena</th><th>Za m²</th></tr></thead><tbody>';
 l.hist.slice().reverse().forEach(function(r){h+='<tr><td>'+r[0]+'</td><td>'+zl(r[1])+'</td><td>'+zl2(r[1]/l.pow)+'</td></tr>'});
 return h+'</tbody></table>';
}
var byId={};L.forEach(function(l){byId[l.id]=l});
document.addEventListener('click',function(e){
 var kb=e.target.closest('[data-kond]');if(kb){$$('[data-kond]').forEach(function(x){x.setAttribute('aria-pressed',x===kb)});$$('.rzut .kond').forEach(function(v){v.hidden=v.dataset.k!==kb.dataset.kond});return}
 var t=e.target.closest('[data-rzut],[data-hist],[data-toast],[data-zap]');if(!t)return;
 if(t.dataset.rzut){otworz('Rzut lokalu '+t.dataset.rzut,rzut(byId[t.dataset.rzut]))}
 else if(t.dataset.hist){otworz('Historia cen',hist(byId[t.dataset.hist]))}
 else if(t.dataset.toast){e.preventDefault();toast(t.dataset.toast)}
 else if(t.dataset.zap){sel.value=t.dataset.zap}
});

/* schemat budynkow */
function pokaz(id){
 var mob=matchMedia('(max-width:760px)').matches,kaf=mob||kf.classList.contains('on');
 var el=$((kaf?'#k-':'#w-')+id);if(!el)return;
 if(el.hidden){$('[data-filtr="all"]').click()}
 el.scrollIntoView({behavior:'smooth',block:'center'});
 el.classList.remove('blysk');void el.offsetWidth;el.classList.add('blysk');
 if(kaf){el.animate&&el.animate([{boxShadow:'0 0 0 3px #D2541E'},{boxShadow:'0 0 0 0 transparent'}],{duration:1800})}
}
$$('.domy .pol').forEach(function(p){
 p.addEventListener('click',function(){pokaz(p.dataset.lokal)});
 p.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pokaz(p.dataset.lokal)}});
});

/* wizualizacja */
var wi=$('#wiz-info');
function wybierz(id){
 var l=byId[id];if(!l)return;
 $$('.lw').forEach(function(g){g.classList.toggle('akt',g.dataset.lokal===id)});
 wi.innerHTML='<div><h3>Lokal '+l.id+' <span class="st '+l.st+'" style="font-size:15px;margin-left:6px">'+ST[l.st]+'</span></h3><p class="dane-l">Budynek '+l.b+' · '+m2(l.pow)+' · '+l.pok+' pokoje · ogród '+l.ogr+' m² · <b>'+zl(l.cena)+'</b> ('+zl2(l.cena/l.pow)+' / m²)</p></div><div class="akcje">'+akcje(l)+'</div>';
}
$$('.lw').forEach(function(g){
 g.addEventListener('click',function(){wybierz(g.dataset.lokal)});
 g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();wybierz(g.dataset.lokal)}});
});

/* karuzela */
$$('[data-karuzela]').forEach(function(k){
 var tor=$('.tor',k),n=tor.children.length,licz=$('.licz',k);
 function idx(){return Math.round(tor.scrollLeft/(tor.clientWidth+12))}
 function idz(i){i=Math.max(0,Math.min(n-1,i));tor.scrollTo({left:i*(tor.clientWidth+12),behavior:'smooth'})}
 tor.addEventListener('scroll',function(){licz.textContent=(idx()+1)+' / '+n},{passive:true});
 $('.strz.l',k).addEventListener('click',function(){idz(idx()-1)});
 $('.strz.p',k).addEventListener('click',function(){idz(idx()+1)});
 tor.addEventListener('keydown',function(e){if(e.key==='ArrowRight')idz(idx()+1);if(e.key==='ArrowLeft')idz(idx()-1)});
 var x0=0,s0=0,ciag=false,moved=false;
 tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;moved=false;x0=e.clientX;s0=tor.scrollLeft;tor.classList.add('ciag')});
 addEventListener('pointermove',function(e){if(!ciag)return;var d=e.clientX-x0;if(Math.abs(d)>5)moved=true;tor.scrollLeft=s0-d});
 addEventListener('pointerup',function(e){if(!ciag)return;ciag=false;tor.classList.remove('ciag');var d=e.clientX-x0;var i=Math.round(s0/(tor.clientWidth+12));if(d<-50)i++;else if(d>50)i--;idz(i)});
 tor.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
});

/* lightbox */
var lb=$('#lb'),li=$('img',lb),lt=$('.lbl',lb),lista=[],cur=0;
function lbShow(i){cur=(i+lista.length)%lista.length;var b=lista[cur];li.src=b.dataset.lb;li.alt=b.dataset.alt||'';lt.textContent=(b.dataset.alt||'')+'  ·  '+(cur+1)+' / '+lista.length}
$$('[data-lb]').forEach(function(b){b.addEventListener('click',function(){lista=$$('[data-lb]',b.closest('[data-siatka]')||document);last=b;lbShow(lista.indexOf(b));lb.classList.add('on');$('.zamk',lb).focus()})});
function lbZ(){lb.classList.remove('on');li.removeAttribute('src');if(last)last.focus()}
$('.zamk',lb).addEventListener('click',lbZ);
$('.strz.l',lb).addEventListener('click',function(){lbShow(cur-1)});
$('.strz.p',lb).addEventListener('click',function(){lbShow(cur+1)});
lb.addEventListener('click',function(e){if(e.target===lb)lbZ()});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(d<-50)lbShow(cur+1);else if(d>50)lbShow(cur-1)});
document.addEventListener('keydown',function(e){
 if(lb.classList.contains('on')){if(e.key==='Escape')lbZ();if(e.key==='ArrowRight')lbShow(cur+1);if(e.key==='ArrowLeft')lbShow(cur-1)}
 else if(ok.classList.contains('on')&&e.key==='Escape')zamknij();
});

/* rzuty w sekcji oferty */
(function(){var t=document.createElement('div');t.innerHTML=rzut(byId.A1);var sv=$$('svg.kond',t);
 function wstaw(v,cel,opis){v.setAttribute('class','plan');v.hidden=false;v.setAttribute('role','img');v.setAttribute('aria-label',opis);$(cel).appendChild(v)}
 if(sv[0])wstaw(sv[0],'#rz-p','Rzut parteru, przykład');
 if(sv[1])wstaw(sv[1],'#rz-g','Rzut poddasza, przykład');
})();

/* aktywna pozycja menu */
var linki=$$('#nav a[href^="#"]'),mapaL={};linki.forEach(function(a){mapaL[a.getAttribute('href').slice(1)]=a});
if('IntersectionObserver' in window){
 var widoczne={},sekcje=$$('main section[id]');
 var io=new IntersectionObserver(function(en){
  en.forEach(function(e){widoczne[e.target.id]=e.isIntersecting});
  var akt=null;
  sekcje.forEach(function(s){if(akt||!widoczne[s.id])return;var p=s;while(p&&!mapaL[p.id])p=p.previousElementSibling;if(p)akt=p.id});
  linki.forEach(function(a){a.classList.toggle('akt',!!akt&&a===mapaL[akt])});
 },{rootMargin:'-45% 0px -50% 0px'});
 sekcje.forEach(function(s){io.observe(s)});
 /* mapa po przewinieciu */
 var mp=$('#mapa');
 if(mp){var im=new IntersectionObserver(function(en){if(en[0].isIntersecting){im.disconnect();var f=document.createElement('iframe');f.src=mp.dataset.src;f.title='Mapa Google: lokalizacja inwestycji';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';f.allowFullscreen=true;mp.appendChild(f)}},{rootMargin:'300px'});im.observe(mp)}
}

/* formularz */
$('#form').addEventListener('submit',function(e){e.preventDefault();$('#ok-msg').style.display='block'});
})();
