(function(){
window.prepareAvbnPrint=function(){
 if(document.body.dataset.printReady)return;
 document.body.dataset.printReady='true';
 const pageH=793.7,pageW=1122.5;
 document.querySelectorAll('.site-section').forEach(s=>{
  s.style.cssText+=';position:relative!important;width:'+pageW+'px!important;height:'+pageH+'px!important;min-height:0!important;max-height:'+pageH+'px!important;padding:0!important;overflow:hidden!important;break-after:page!important;box-sizing:border-box!important';
  if(s.id==='hero'){
   const wrap=document.createElement('div');wrap.className='hero-print-wrap';
   while(s.firstChild)wrap.append(s.firstChild);s.append(wrap);
   wrap.style.cssText='position:relative;width:'+pageW+'px;min-height:'+pageH+'px;display:flex;flex-direction:column;justify-content:center';
   const hh=wrap.scrollHeight;const scale=Math.min(1,(pageH-20)/hh);wrap.style.transformOrigin='top left';wrap.style.transform='scale('+scale+')';wrap.style.marginTop=((pageH-hh*scale)/2)+'px';wrap.style.marginLeft=((pageW-pageW*scale)/2)+'px';
  }else{
   const w=s.querySelector(':scope > .max-w-7xl');if(!w)return;
   w.style.cssText+=';width:1058px!important;max-width:none!important;max-height:none!important;padding:0!important;margin:0!important;position:absolute!important;left:32px!important;top:0!important';
   const ht=w.scrollHeight;const sc=Math.min(1.06,(pageH-64)/ht);w.style.transformOrigin='top center';w.style.transform='scale('+sc+')';w.style.top=((pageH-ht*sc)/2)+'px';
  }
 });
};
window.addEventListener('beforeprint',window.prepareAvbnPrint);
window.addEventListener('afterprint',()=>{if(document.body.dataset.printReady&&!window.AVBN_EXPORTING)setTimeout(()=>location.reload(),1000);});
})();
