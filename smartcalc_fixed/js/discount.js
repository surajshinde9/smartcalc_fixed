// Discount Calculator
(function(){
  var form = document.getElementById('discountForm');
  var result = document.getElementById('discountResult');

  form.addEventListener('submit', function(e){ e.preventDefault(); calculate(); });

  function fmt(n){ return n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}); }

  function calculate(){
    var mode = document.querySelector('input[name="mode"]:checked').value;
    var origPrice, discPct, discAmt, finalPrice, savings;

    if(mode === 'pct'){
      origPrice = parseFloat(document.getElementById('origPrice').value);
      discPct = parseFloat(document.getElementById('discPct').value);
      if(!origPrice || isNaN(discPct) || origPrice<=0 || discPct<0 || discPct>100) return;
      discAmt = origPrice * discPct / 100;
      finalPrice = origPrice - discAmt;
      savings = discAmt;
    } else if(mode === 'amt'){
      origPrice = parseFloat(document.getElementById('origPrice2').value);
      discAmt = parseFloat(document.getElementById('discAmt').value);
      if(!origPrice || !discAmt || origPrice<=0 || discAmt<0) return;
      finalPrice = origPrice - discAmt;
      discPct = (discAmt / origPrice) * 100;
      savings = discAmt;
    } else {
      origPrice = parseFloat(document.getElementById('origPrice3').value);
      finalPrice = parseFloat(document.getElementById('salePrice').value);
      if(!origPrice || !finalPrice || origPrice<=0 || finalPrice<0) return;
      discAmt = origPrice - finalPrice;
      discPct = (discAmt / origPrice) * 100;
      savings = discAmt;
    }

    document.getElementById('resOriginal').textContent = '₹' + fmt(origPrice);
    document.getElementById('resDiscount').textContent = discPct.toFixed(1) + '%';
    document.getElementById('resSavings').textContent = '₹' + fmt(savings);
    document.getElementById('resFinal').textContent = '₹' + fmt(finalPrice);

    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  // Mode toggle
  document.querySelectorAll('input[name="mode"]').forEach(function(r){
    r.addEventListener('change', function(){
      document.querySelectorAll('.mode-panel').forEach(function(p){ p.style.display='none'; });
      document.getElementById('mode-'+this.value).style.display = '';
      result.classList.remove('show');
    });
  });

  document.getElementById('resetBtn').addEventListener('click', function(){
    form.reset();
    document.querySelectorAll('.mode-panel').forEach(function(p){ p.style.display='none'; });
    document.getElementById('mode-pct').style.display = '';
    result.classList.remove('show');
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
