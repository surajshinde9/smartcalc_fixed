// EMI Calculator
(function(){
  var form = document.getElementById('emiForm');
  var result = document.getElementById('emiResult');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    calculate();
  });

  // Sync range inputs
  ['principal','tenure'].forEach(function(id){
    var input = document.getElementById(id);
    var range = document.getElementById(id+'Range');
    if(!input || !range) return;
    input.addEventListener('input', function(){ range.value = this.value; });
    range.addEventListener('input', function(){ input.value = this.value; });
  });
  var rInput = document.getElementById('rate');
  var rRange = document.getElementById('rateRange');
  if(rInput && rRange){
    rInput.addEventListener('input', function(){ rRange.value = this.value; });
    rRange.addEventListener('input', function(){ rInput.value = this.value; });
  }

  function fmt(n){ return n.toLocaleString('en-IN',{maximumFractionDigits:0}); }

  function calculate(){
    var P = parseFloat(document.getElementById('principal').value);
    var r = parseFloat(document.getElementById('rate').value) / 12 / 100;
    var n = parseInt(document.getElementById('tenure').value);
    var type = document.querySelector('input[name="tenureType"]:checked').value;
    if (type === 'years') n = n * 12;

    if (!P || !r || !n || P <= 0 || r <= 0 || n <= 0) return;

    var emi = (P * r * Math.pow(1+r,n)) / (Math.pow(1+r,n) - 1);
    var totalPayment = emi * n;
    var totalInterest = totalPayment - P;

    document.getElementById('resEmi').textContent = '₹' + fmt(emi);
    document.getElementById('resPrincipal').textContent = '₹' + fmt(P);
    document.getElementById('resTotalInterest').textContent = '₹' + fmt(totalInterest);
    document.getElementById('resTotalPayment').textContent = '₹' + fmt(totalPayment);

    // Chart bar
    var pct = Math.round((P / totalPayment) * 100);
    var bar = document.getElementById('principalBar');
    var intBar = document.getElementById('interestBar');
    if(bar) bar.style.width = pct + '%';
    if(intBar) intBar.style.width = (100-pct) + '%';
    var pctEl = document.getElementById('principalPct');
    var intPctEl = document.getElementById('interestPct');
    if(pctEl) pctEl.textContent = pct + '%';
    if(intPctEl) intPctEl.textContent = (100-pct) + '%';

    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  document.getElementById('resetBtn').addEventListener('click', function(){
    form.reset();
    result.classList.remove('show');
  });

  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var exp = this.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
      document.querySelectorAll('.faq-a').forEach(function(a){ a.classList.remove('open'); });
      if(!exp){ this.setAttribute('aria-expanded','true'); this.nextElementSibling.classList.add('open'); }
    });
  });
  var mt = document.getElementById('menuToggle');
  var mn = document.getElementById('mobileNav');
  if(mt) mt.addEventListener('click', function(){ mn.classList.toggle('open'); });
})();
