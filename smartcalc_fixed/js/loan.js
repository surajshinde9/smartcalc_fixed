// Loan Calculator
(function(){
  var form = document.getElementById('loanForm');
  var result = document.getElementById('loanResult');

  form.addEventListener('submit', function(e){ e.preventDefault(); calculate(); });

  function fmt(n){ return n.toLocaleString('en-IN',{maximumFractionDigits:0}); }
  function fmtD(n){ return n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}); }

  function calculate(){
    var P = parseFloat(document.getElementById('loanAmt').value);
    var annualRate = parseFloat(document.getElementById('loanRate').value);
    var years = parseFloat(document.getElementById('loanYears').value);
    if(!P||!annualRate||!years||P<=0||annualRate<=0||years<=0) return;

    var r = annualRate/12/100;
    var n = years*12;
    var emi = (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    var totalPayment = emi*n;
    var totalInterest = totalPayment - P;

    document.getElementById('resEmi').textContent = '₹'+fmt(emi);
    document.getElementById('resTotal').textContent = '₹'+fmt(totalPayment);
    document.getElementById('resInterest').textContent = '₹'+fmt(totalInterest);
    document.getElementById('resPrincipal').textContent = '₹'+fmt(P);

    var interestPct = Math.round((totalInterest/totalPayment)*100);
    var prinPct = 100-interestPct;
    var pbar = document.getElementById('loanPrinBar');
    var ibar = document.getElementById('loanIntBar');
    if(pbar) pbar.style.width = prinPct+'%';
    if(ibar) ibar.style.width = interestPct+'%';
    var ppctEl = document.getElementById('loanPrinPct');
    var ipctEl = document.getElementById('loanIntPct');
    if(ppctEl) ppctEl.textContent = prinPct+'%';
    if(ipctEl) ipctEl.textContent = interestPct+'%';

    // Amortization table (first 12 months)
    var tbody = document.getElementById('amorBody');
    if(tbody){
      tbody.innerHTML='';
      var balance = P;
      var rowsToShow = Math.min(n, 12);
      for(var i=1;i<=rowsToShow;i++){
        var intPart = balance*r;
        var prinPart = emi - intPart;
        balance -= prinPart;
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>'+i+'</td><td>₹'+fmtD(emi)+'</td><td>₹'+fmtD(prinPart)+'</td><td>₹'+fmtD(intPart)+'</td><td>₹'+fmtD(Math.max(0,balance))+'</td>';
        tbody.appendChild(tr);
      }
      if(n>12){
        var tr2=document.createElement('tr');
        tr2.innerHTML='<td colspan="5" style="text-align:center;color:var(--text-light);font-size:13px">... and '+(n-12)+' more months</td>';
        tbody.appendChild(tr2);
      }
    }

    result.classList.add('show');
    var amorSection = document.getElementById('amorSection');
    if(amorSection) amorSection.style.display = 'block';
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
