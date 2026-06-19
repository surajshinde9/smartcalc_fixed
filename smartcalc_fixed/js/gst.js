// GST Calculator
(function(){
  var form = document.getElementById('gstForm');
  var result = document.getElementById('gstResult');

  form.addEventListener('submit', function(e){ e.preventDefault(); calculate(); });

  function fmt(n){ return n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}); }

  function calculate(){
    var amount = parseFloat(document.getElementById('amount').value);
    var rate = parseFloat(document.getElementById('gstRate').value);
    var type = document.querySelector('input[name="gstType"]:checked').value;
    if(!amount || isNaN(rate) || amount<=0) return;

    var gstAmount, preGst, postGst;
    if(type === 'add'){
      preGst = amount;
      gstAmount = amount * rate / 100;
      postGst = amount + gstAmount;
    } else {
      postGst = amount;
      preGst = amount / (1 + rate/100);
      gstAmount = postGst - preGst;
    }

    var cgst = gstAmount / 2;
    var sgst = gstAmount / 2;

    document.getElementById('resPreGst').textContent = '₹' + fmt(preGst);
    document.getElementById('resGstAmount').textContent = '₹' + fmt(gstAmount);
    document.getElementById('resPostGst').textContent = '₹' + fmt(postGst);
    document.getElementById('resCgst').textContent = '₹' + fmt(cgst);
    document.getElementById('resSgst').textContent = '₹' + fmt(sgst);
    document.getElementById('resRate').textContent = rate + '%';

    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  document.getElementById('resetBtn').addEventListener('click', function(){
    form.reset(); result.classList.remove('show');
  });
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var exp=this.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.faq-q').forEach(function(b){b.setAttribute('aria-expanded','false');});
      document.querySelectorAll('.faq-a').forEach(function(a){a.classList.remove('open');});
      if(!exp){this.setAttribute('aria-expanded','true');this.nextElementSibling.classList.add('open');}
    });
  });
  var mt=document.getElementById('menuToggle'),mn=document.getElementById('mobileNav');
  if(mt) mt.addEventListener('click',function(){mn.classList.toggle('open');});
})();
