// SIP Calculator
(function(){
  var form = document.getElementById('sipForm');
  var result = document.getElementById('sipResult');

  form.addEventListener('submit', function(e){ e.preventDefault(); calculate(); });

  function fmt(n){ return n.toLocaleString('en-IN',{maximumFractionDigits:0}); }

  function calculate(){
    var monthly = parseFloat(document.getElementById('monthly').value);
    var rate = parseFloat(document.getElementById('rate').value);
    var years = parseInt(document.getElementById('years').value);
    if (!monthly || !rate || !years || monthly<=0 || rate<=0 || years<=0) return;

    var r = rate / 12 / 100;
    var n = years * 12;
    // SIP Future Value = P × [(1 + r)^n - 1] / r × (1 + r)
    var fv = monthly * (Math.pow(1+r, n) - 1) / r * (1 + r);
    var invested = monthly * n;
    var gains = fv - invested;

    document.getElementById('resFV').textContent = '₹' + fmt(fv);
    document.getElementById('resInvested').textContent = '₹' + fmt(invested);
    document.getElementById('resGains').textContent = '₹' + fmt(gains);
    var wealthRatio = ((fv / invested - 1) * 100).toFixed(1);
    document.getElementById('resWealthRatio').textContent = wealthRatio + '%';

    var pct = Math.round((invested / fv) * 100);
    var bar = document.getElementById('investedBar');
    var gainBar = document.getElementById('gainsBar');
    if(bar) bar.style.width = pct + '%';
    if(gainBar) gainBar.style.width = (100-pct) + '%';
    var pEl = document.getElementById('investedPct');
    var gEl = document.getElementById('gainsPct');
    if(pEl) pEl.textContent = pct + '%';
    if(gEl) gEl.textContent = (100-pct) + '%';

    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  document.getElementById('resetBtn').addEventListener('click', function(){
    form.reset(); result.classList.remove('show');
  });
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var exp = this.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.faq-q').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
      document.querySelectorAll('.faq-a').forEach(function(a){ a.classList.remove('open'); });
      if(!exp){ this.setAttribute('aria-expanded','true'); this.nextElementSibling.classList.add('open'); }
    });
  });
  var mt=document.getElementById('menuToggle'),mn=document.getElementById('mobileNav');
  if(mt) mt.addEventListener('click',function(){ mn.classList.toggle('open'); });
})();
