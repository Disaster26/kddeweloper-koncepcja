(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
function grp(n,d){var p=n.toFixed(d).split('.');p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,' ');return p.join(',')}
var zl=function(n){return grp(n,0)+' zł'},zl2=function(n){return grp(n,2)+' zł'},m2=function(n){return grp(n,2)+' m²'};
var ST={dost:'Dostępny',rez:'Rezerwacja',sprz:'Sprzedany'};
var L=[
 {id:'A1',b:'A',pol:'l',pow:85,pok:5,mp:2,st:'dost',cena:829000,hist:[['23.11.2026',829000]]},
 {id:'A2',b:'A',pol:'p',pow:85,pok:5,mp:2,st:'dost',cena:829000,hist:[['23.11.2026',829000]]},
 {id:'B1',b:'B',pol:'l',pow:85,pok:5,mp:2,st:'dost',cena:829000,hist:[['23.11.2026',829000]]},
 {id:'B2',b:'B',pol:'p',pow:85,pok:5,mp:2,st:'dost',cena:829000,hist:[['23.11.2026',829000]]}
];
function mini(l){
 var a=l.pol==='l'?'#C6A16A':'#2A2A2A',b=l.pol==='p'?'#C6A16A':'#2A2A2A';
 return '<svg class="mini" viewBox="0 0 64 38" aria-hidden="true"><path d="M32 2 2 20v16h30z" fill="'+a+'"/><path d="M32 2l30 18v16H32z" fill="'+b+'"/><path d="M2 20 32 2l30 18M2 20v16h60V20M32 2v34" fill="none" stroke="#E6DFD3" stroke-width="1.6"/></svg>';
}
function akcje(l){
 return '<button type="button" data-rzut="'+l.id+'">Rzut</button><button type="button" data-hist="'+l.id+'">Historia cen</button><a href="#" data-toast="Tu otworzy się prospekt lokalu '+l.id+' (PDF z panelu).">Prospekt</a>'+(l.st==='sprz'?'':'<a class="zap" href="#kontakt" data-zap="'+l.id+'">Zapytaj</a>');
}
var tb=$('#tb'),kf=$('#kafle'),sel=$('#sel-lokal');
L.forEach(function(l){
 var cm=l.cena/l.pow;
 tb.insertAdjacentHTML('beforeend','<tr data-st="'+l.st+'" id="w-'+l.id+'"><td><b>'+l.id+'</b></td><td>'+l.b+'</td><td>'+m2(l.pow)+'</td><td>'+l.pok+'</td><td>'+l.mp+'</td><td><span class="st '+l.st+'">'+ST[l.st]+'</span></td><td class="cena"><b>'+zl(l.cena)+'</b><small>'+zl2(cm)+' / m²</small></td><td><div class="akcje">'+akcje(l)+'</div></td></tr>');
 kf.insertAdjacentHTML('beforeend','<article class="kafel" data-st="'+l.st+'" id="k-'+l.id+'"><div class="gora"><div><h3>Lokal '+l.id+'</h3><span class="st '+l.st+'">'+ST[l.st]+'</span></div>'+mini(l)+'</div><dl><dt>Powierzchnia</dt><dd>'+m2(l.pow)+'</dd><dt>Pokoje</dt><dd>'+l.pok+'</dd><dt>Miejsca postojowe</dt><dd>'+l.mp+'</dd></dl><p class="cena">'+zl(l.cena)+'<small>'+zl2(cm)+' za m²</small></p><div class="akcje">'+akcje(l)+'</div></article>');
 sel.insertAdjacentHTML('beforeend','<option value="'+l.id+'">Lokal '+l.id+' - '+ST[l.st].toLowerCase()+'</option>');
});
var ileD=$('#ile-dost');if(ileD)ileD.textContent=L.filter(function(l){return l.st==='dost'}).length;

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
var RZP="<svg class=\"kond\" data-k=\"p\" viewBox=\"0 0 703 354\" font-family=\"Figtree,sans-serif\" fill=\"#F1ECE3\" role=\"img\" aria-label=\"Rzut parteru lokalu\"><rect x=\"463.5\" y=\"20.0\" width=\"199.6\" height=\"314.3\" fill=\"#3A3128\"/><rect x=\"266.3\" y=\"20.0\" width=\"197.2\" height=\"241.2\" fill=\"#3A3128\"/><rect x=\"293.0\" y=\"261.2\" width=\"170.5\" height=\"73.2\" fill=\"#1B1B1B\"/><line x1=\"293.0\" y1=\"261.2\" x2=\"293.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"308.5\" y1=\"261.2\" x2=\"308.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"324.0\" y1=\"261.2\" x2=\"324.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"339.5\" y1=\"261.2\" x2=\"339.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"355.0\" y1=\"261.2\" x2=\"355.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"370.5\" y1=\"261.2\" x2=\"370.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"386.0\" y1=\"261.2\" x2=\"386.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"401.5\" y1=\"261.2\" x2=\"401.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"417.0\" y1=\"261.2\" x2=\"417.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"432.5\" y1=\"261.2\" x2=\"432.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"448.0\" y1=\"261.2\" x2=\"448.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"463.5\" y1=\"261.2\" x2=\"463.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><rect x=\"58.0\" y=\"20.0\" width=\"198.4\" height=\"169.9\" fill=\"#2E2924\"/><text x=\"157.2\" y=\"98.9\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">3. Gabinet</text><text x=\"157.2\" y=\"116.9\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">8,20 m²</text><rect x=\"58.0\" y=\"196.7\" width=\"99.2\" height=\"67.0\" fill=\"#262626\"/><rect x=\"58.0\" y=\"263.7\" width=\"64.5\" height=\"70.7\" fill=\"#262626\"/><rect x=\"157.2\" y=\"196.7\" width=\"109.1\" height=\"67.0\" fill=\"#3A3128\"/><rect x=\"122.5\" y=\"266.8\" width=\"167.4\" height=\"67.6\" fill=\"#25303A\"/><text x=\"206.2\" y=\"294.5\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">2. Łazienka</text><text x=\"206.2\" y=\"312.5\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">2,50 m²</text><text x=\"467.2\" y=\"131.8\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">4. Salon z aneksem kuchennym</text><text x=\"467.2\" y=\"149.8\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">30,50 m²</text><text x=\"107.6\" y=\"226.2\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"12\">1. Wiatrołap</text><text x=\"107.6\" y=\"241.2\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"12\">3,00 m²</text><line x1=\"259.5\" y1=\"20.0\" x2=\"259.5\" y2=\"196.7\" stroke=\"#E6DFD3\" stroke-width=\"4\" stroke-linecap=\"square\"/><line x1=\"58.0\" y1=\"193.6\" x2=\"256.4\" y2=\"193.6\" stroke=\"#E6DFD3\" stroke-width=\"4\" stroke-linecap=\"square\"/><line x1=\"157.2\" y1=\"196.7\" x2=\"157.2\" y2=\"243.2\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"122.5\" y1=\"266.8\" x2=\"122.5\" y2=\"334.3\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"122.5\" y1=\"264.9\" x2=\"289.9\" y2=\"264.9\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"289.9\" y1=\"264.9\" x2=\"289.9\" y2=\"334.3\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"463.5\" y1=\"261.2\" x2=\"463.5\" y2=\"334.3\" stroke=\"#E6DFD3\" stroke-width=\"2\" stroke-linecap=\"square\"/><line x1=\"663.1\" y1=\"94.4\" x2=\"663.1\" y2=\"255.6\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><line x1=\"516.8\" y1=\"20.0\" x2=\"585.0\" y2=\"20.0\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><line x1=\"58.0\" y1=\"88.2\" x2=\"58.0\" y2=\"156.4\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><path d=\"M56.8 300.2h-22m8 -7-8 7 8 7\" fill=\"none\" stroke=\"#C6A16A\" stroke-width=\"3\"/><text x=\"35.9\" y=\"278.2\" font-size=\"11\" fill=\"#C6A16A\" font-weight=\"700\" text-anchor=\"middle\" transform=\"rotate(-90 35.9 278.2)\">wejście</text><text x=\"678.0\" y=\"176.9\" font-size=\"11\" fill=\"#94B981\" font-weight=\"700\" text-anchor=\"middle\" transform=\"rotate(90 678.0 176.9)\">ogródek i taras</text><rect x=\"54.0\" y=\"16.0\" width=\"613.1\" height=\"322.3\" fill=\"none\" stroke=\"#C6A16A\" stroke-width=\"7\"/></svg>",RZG="<svg class=\"kond\" data-k=\"g\" hidden viewBox=\"0 0 703 354\" font-family=\"Figtree,sans-serif\" fill=\"#F1ECE3\" role=\"img\" aria-label=\"Rzut piętra lokalu\"><rect x=\"415.1\" y=\"20.0\" width=\"248.0\" height=\"154.4\" fill=\"#2E2924\"/><text x=\"539.1\" y=\"91.2\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">5. Pokój</text><text x=\"539.1\" y=\"109.2\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">10,00 m²</text><rect x=\"470.3\" y=\"181.2\" width=\"192.8\" height=\"153.1\" fill=\"#2E2924\"/><text x=\"566.7\" y=\"251.8\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">6. Pokój</text><text x=\"566.7\" y=\"269.8\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">7,00 m²</text><rect x=\"284.3\" y=\"20.0\" width=\"123.4\" height=\"154.4\" fill=\"#25303A\"/><text x=\"346.0\" y=\"91.2\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">4. Łazienka</text><text x=\"346.0\" y=\"109.2\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">4,30 m²</text><rect x=\"58.0\" y=\"20.0\" width=\"210.8\" height=\"173.6\" fill=\"#2E2924\"/><text x=\"163.4\" y=\"100.8\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">3. Sypialnia</text><text x=\"163.4\" y=\"118.8\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">9,50 m²</text><rect x=\"58.0\" y=\"201.0\" width=\"122.8\" height=\"133.3\" fill=\"#262626\"/><text x=\"119.4\" y=\"261.7\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"16\">2. Garderoba</text><text x=\"119.4\" y=\"279.7\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"14\">4,20 m²</text><rect x=\"180.8\" y=\"181.2\" width=\"289.5\" height=\"80.0\" fill=\"#262626\"/><rect x=\"268.8\" y=\"174.4\" width=\"146.3\" height=\"6.8\" fill=\"#262626\"/><rect x=\"190.1\" y=\"261.2\" width=\"266.6\" height=\"73.2\" fill=\"#1B1B1B\"/><line x1=\"190.1\" y1=\"261.2\" x2=\"190.1\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"214.3\" y1=\"261.2\" x2=\"214.3\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"238.5\" y1=\"261.2\" x2=\"238.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"262.8\" y1=\"261.2\" x2=\"262.8\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"287.0\" y1=\"261.2\" x2=\"287.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"311.2\" y1=\"261.2\" x2=\"311.2\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"335.5\" y1=\"261.2\" x2=\"335.5\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"359.7\" y1=\"261.2\" x2=\"359.7\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"384.0\" y1=\"261.2\" x2=\"384.0\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"408.2\" y1=\"261.2\" x2=\"408.2\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"432.4\" y1=\"261.2\" x2=\"432.4\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><line x1=\"456.7\" y1=\"261.2\" x2=\"456.7\" y2=\"334.3\" stroke=\"#5C5852\" stroke-width=\"1\"/><text x=\"240.9\" y=\"217.5\" text-anchor=\"middle\" font-weight=\"700\" font-size=\"12\">1. Korytarz</text><text x=\"240.9\" y=\"232.5\" text-anchor=\"middle\" fill=\"#D6B57E\" font-size=\"12\">5,80 m²</text><line x1=\"415.1\" y1=\"20.0\" x2=\"415.1\" y2=\"174.4\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"408.3\" y1=\"20.0\" x2=\"408.3\" y2=\"174.4\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"284.3\" y1=\"20.0\" x2=\"284.3\" y2=\"174.4\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"268.8\" y1=\"20.0\" x2=\"268.8\" y2=\"193.6\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"58.0\" y1=\"197.3\" x2=\"180.8\" y2=\"197.3\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"180.8\" y1=\"201.0\" x2=\"180.8\" y2=\"261.2\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"470.3\" y1=\"181.2\" x2=\"470.3\" y2=\"261.2\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"415.1\" y1=\"178.1\" x2=\"663.1\" y2=\"178.1\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"268.8\" y1=\"197.3\" x2=\"268.8\" y2=\"197.3\" stroke=\"#E6DFD3\" stroke-width=\"3\" stroke-linecap=\"square\"/><line x1=\"663.1\" y1=\"51.0\" x2=\"663.1\" y2=\"137.8\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><line x1=\"663.1\" y1=\"206.0\" x2=\"663.1\" y2=\"292.8\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><line x1=\"58.0\" y1=\"63.4\" x2=\"58.0\" y2=\"150.2\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><line x1=\"58.0\" y1=\"224.6\" x2=\"58.0\" y2=\"280.4\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><line x1=\"330.8\" y1=\"20.0\" x2=\"368.0\" y2=\"20.0\" stroke=\"#7FA9C9\" stroke-width=\"7\"/><rect x=\"54.0\" y=\"16.0\" width=\"613.1\" height=\"322.3\" fill=\"none\" stroke=\"#C6A16A\" stroke-width=\"7\"/></svg>";
function rzut(l){
 var lustro=l.pol==='p'?' Układ lustrzany względem rzutu.':'';
 return '<p>Rzut lokalu według projektu budowlanego, z metrażem pomieszczeń.'+lustro+'</p><div class="rzut-tab" role="group" aria-label="Kondygnacja"><button type="button" data-kond="p" aria-pressed="true">Parter</button><button type="button" data-kond="g" aria-pressed="false">Piętro</button></div><div class="rzut">'+RZP+RZG+'<p style="margin-top:8px;font-size:14px;color:#8F887D">Lokal '+l.id+', '+m2(l.pow)+' na dwóch poziomach</p></div>';
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
 if(kaf){el.animate&&el.animate([{boxShadow:'0 0 0 3px #C6A16A'},{boxShadow:'0 0 0 0 transparent'}],{duration:1800})}
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
 wi.innerHTML='<div><h3>Lokal '+l.id+' <span class="st '+l.st+'" style="font-size:15px;margin-left:6px">'+ST[l.st]+'</span></h3><p class="dane-l">Budynek '+l.b+' · '+m2(l.pow)+' · '+l.pok+' pokoi · '+l.mp+' miejsca postojowe · <b>'+zl(l.cena)+'</b> ('+zl2(l.cena/l.pow)+' / m²)</p></div><div class="akcje">'+akcje(l)+'</div>';
}
$$('.lw').forEach(function(g){
 g.addEventListener('click',function(){wybierz(g.dataset.lokal);if(g.classList.contains('lp'))wi.scrollIntoView({behavior:'smooth',block:'center'})});
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
 if(sv[0])wstaw(sv[0],'#rz-p','Rzut parteru lokalu');
 if(sv[1])wstaw(sv[1],'#rz-g','Rzut piętra lokalu');
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
