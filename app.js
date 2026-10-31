const $ = id => document.getElementById(id);
const fields = ['fromName','fromEmail','fromAddress','toName','toEmail','toAddress','invoiceNo','issueDate','dueDate','currency','tax','notes'];
const currencySymbols = {USD:'$',EUR:'€',GBP:'£',PKR:'Rs ',AED:'AED ',INR:'₹'};
let itemCount = 0;
function addItem(description='',qty=1,rate=0){
  const id = ++itemCount;
  const row = document.createElement('div'); row.className='item-row'; row.dataset.id=id;
  row.innerHTML = `<input aria-label="Item description" class="desc" placeholder="Website development" value="${escapeAttr(description)}"><input aria-label="Quantity" class="qty" type="number" min="0" step="0.01" value="${qty}"><input aria-label="Rate" class="rate" type="number" min="0" step="0.01" value="${rate}"><button type="button" class="remove" aria-label="Remove item">×</button>`;
  $('items').appendChild(row);
  row.querySelectorAll('input').forEach(el=>el.addEventListener('input',update));
  row.querySelector('.remove').addEventListener('click',()=>{row.remove();update()});
  update();
}
function escapeAttr(value){return String(value).replace(/[&"<>]/g,c=>({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'}[c]));}
function money(value){const symbol=currencySymbols[$('currency').value] || $('currency').value+' ';return symbol+Number(value||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
function safeText(id,value){$(id).textContent=value||''}
function update(){
  safeText('p-from',$('fromName').value||'Your Name'); safeText('p-from-address',$('fromAddress').value); safeText('p-from-email',$('fromEmail').value);
  safeText('p-client',$('toName').value||'Client name'); safeText('p-client-address',$('toAddress').value); safeText('p-client-email',$('toEmail').value);
  safeText('p-number',$('invoiceNo').value); safeText('p-issue',$('issueDate').value); safeText('p-due',$('dueDate').value);
  safeText('p-notes',$('notes').value||'Thank you for your business.');
  const tbody=$('p-items');tbody.innerHTML='';let subtotal=0;
  document.querySelectorAll('.item-row').forEach(row=>{
    const desc=row.querySelector('.desc').value||'Service';const qty=Number(row.querySelector('.qty').value)||0;const rate=Number(row.querySelector('.rate').value)||0;const amount=qty*rate;subtotal+=amount;
    const tr=document.createElement('tr');[desc,qty, money(rate),money(amount)].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.appendChild(td)});tbody.appendChild(tr);
  });
  const taxRate=Math.max(0,Math.min(100,Number($('tax').value)||0));const tax=subtotal*taxRate/100;
  safeText('p-subtotal',money(subtotal));safeText('p-tax-rate',taxRate);safeText('p-tax',money(tax));safeText('p-total',money(subtotal+tax));
}
function getDraft(){return {fields:Object.fromEntries(fields.map(id=>[id,$(id).value])),items:[...document.querySelectorAll('.item-row')].map(row=>({description:row.querySelector('.desc').value,qty:row.querySelector('.qty').value,rate:row.querySelector('.rate').value}))};}
function loadDraft(data){fields.forEach(id=>{if(data.fields&&data.fields[id]!==undefined)$(id).value=data.fields[id]});$('items').innerHTML='';itemCount=0;(data.items||[]).forEach(i=>addItem(i.description,i.qty,i.rate));if(!data.items?.length)addItem();update();}
fields.forEach(id=>$(id).addEventListener('input',update));
$('currency').addEventListener('change',update);$('add-item').addEventListener('click',()=>addItem());
$('save').addEventListener('click',()=>{localStorage.setItem('invoicekit-draft',JSON.stringify(getDraft()));alert('Draft saved on this device.');});
$('load').addEventListener('click',()=>{const data=localStorage.getItem('invoicekit-draft');if(!data){alert('No saved draft found.');return;}try{loadDraft(JSON.parse(data));alert('Draft loaded.');}catch{alert('Saved draft could not be read.');}});
$('download').addEventListener('click',()=>window.print());
$('invoice-form').addEventListener('reset',()=>setTimeout(()=>{ $('items').innerHTML='';itemCount=0;addItem();update();},0));
const today=new Date();const dateString=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
$('issueDate').value=dateString(today);const due=new Date(today);due.setDate(due.getDate()+14);$('dueDate').value=dateString(due);
addItem('Project / service',1,100);update();
