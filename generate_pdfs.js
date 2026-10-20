const fs=require('fs'),path=require('path'),http=require('http');
const root=__dirname,out=(process.env.PDF_OUTPUT_DIR?path.resolve(process.env.PDF_OUTPUT_DIR):path.resolve(root,'../PDFs'));
const puppeteer=require(process.env.PUPPETEER_MODULE||'puppeteer-core');
const {PDFDocument}=require('./assets/vendor/pdflib.js');
const sections=[['hero','Capa_Hero'],['quem-somos','Quem_Somos'],['projeto','O_Projeto'],['impacto','Impacto_Social'],['contrapartidas','Contrapartidas_Patrocinador'],['transparencia','Transparencia_Fiscal'],['como-participar','Como_Participar'],['galeria','Galeria_Fotos_Oficiais'],['contato','Contato_Central_Patrocinador']];
async function run(){
 fs.mkdirSync(out,{recursive:true});fs.mkdirSync(path.resolve(root,'../qa'),{recursive:true});
 const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2'};
 const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!p.startsWith(root)||!fs.existsSync(p)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',types[path.extname(p)]||'application/octet-stream');fs.createReadStream(p).pipe(res);});
 await new Promise(r=>server.listen(3456,'127.0.0.1',r));
 const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
 const page=await browser.newPage();await page.setViewport({width:1123,height:794,deviceScaleFactor:1.5});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3456/',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
 // Validate the live interactions before entering print layout.
 const live=await page.evaluate(()=>{const input=document.getElementById('simIrpjInput');input.value='500000';calculateTaxSimulation();const calc=document.getElementById('simDestinationValue').textContent;input.value='-50';calculateTaxSimulation();const neg=document.getElementById('simDestinationValue').textContent;input.value='0';calculateTaxSimulation();const zero=document.getElementById('simDestinationValue').textContent;input.value='500000';calculateTaxSimulation();openLightbox(0);nextLightboxPhoto();const gallery=document.getElementById('lightboxCounter').textContent;closeLightbox();return {calc,neg,zero,gallery,photos:galleryPhotos.length,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)};});
 if(!live.calc.includes('10.000')||!live.zero.includes('0,00')||!live.neg.includes('0,00')||live.photos!==17||live.brokenImages.length||errors.length)throw Error(JSON.stringify({live,errors}));
 await page.screenshot({path:path.resolve(root,'../qa/desktop.png'),fullPage:true});
 await page.setViewport({width:390,height:844,deviceScaleFactor:1});await page.screenshot({path:path.resolve(root,'../qa/mobile.png'),fullPage:true});const mobile=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
 if(mobile.scrollWidth>mobile.width+1)throw Error('Overflow mobile: '+JSON.stringify(mobile));
 await page.setViewport({width:1123,height:794,deviceScaleFactor:1.5});await page.emulateMediaType('print');
 await page.addStyleTag({content:'html,body,main{margin:0!important;padding:0!important;display:block!important;width:1122.5px!important}header,footer,.no-print{display:none!important}.site-section{border:0!important}*{animation:none!important;transition:none!important}'});
 await page.evaluate(()=>{window.AVBN_EXPORTING=true;prepareAvbnPrint();});
 const merged=await PDFDocument.create(),report={live,mobile,errors,pages:[]};
 for(let i=0;i<sections.length;i++){
 const [id,title]=sections[i];await page.evaluate(id=>{document.querySelectorAll('.site-section').forEach(s=>s.style.setProperty('display',s.id===id?'block':'none','important'));},id);
 const filename=`Dobra_${String(i+1).padStart(2,'0')}_${title}.pdf`;const bytes=await page.pdf({format:'A4',landscape:true,printBackground:true,margin:{top:0,right:0,bottom:0,left:0},preferCSSPageSize:true});
 const doc=await PDFDocument.load(bytes);if(doc.getPageCount()!==1)throw Error(filename+' tem '+doc.getPageCount()+' páginas');fs.writeFileSync(path.join(out,filename),bytes);const [copied]=await merged.copyPages(doc,[0]);merged.addPage(copied);
 const geometry=await page.evaluate(id=>{const s=document.getElementById(id),r=s.getBoundingClientRect();const children=[...s.querySelectorAll('h1,h2,h3,h4,p,img,.official-marks,.qr-white')].filter(e=>getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width);return {height:r.height,overflow:children.filter(e=>{const b=e.getBoundingClientRect();return b.bottom>r.bottom+2||b.top<r.top-2}).map(e=>e.textContent.slice(0,70)||e.getAttribute('src'))};},id);
 await page.screenshot({path:path.resolve(root,`../qa/dobra-${i+1}.png`),fullPage:true});report.pages.push({id,filename,...geometry});console.log(filename+' - 1 página');
 }
 const complete=path.join(out,'AVBN_Midia_Kit_Atualizado_A4.pdf');fs.writeFileSync(complete,await merged.save());report.pageCount=merged.getPageCount();fs.writeFileSync(path.resolve(root,'../qa/validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();server.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;});
