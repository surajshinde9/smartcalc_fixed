// Date Calculator
(function(){
  var today = new Date().toISOString().split('T')[0];
  document.getElementById('date1').value = today;
  document.getElementById('date1').max = '2099-12-31';
  document.getElementById('date2').value = today;
  document.getElementById('date2').max = '2099-12-31';

  var form = document.getElementById('dateForm');
  var result = document.getElementById('dateResult');
  form.addEventListener('submit', function(e){ e.preventDefault(); calculate(); });

  var addForm = document.getElementById('addDateForm');
  var addResult = document.getElementById('addDateResult');
  if(addForm) addForm.addEventListener('submit', function(e){ e.preventDefault(); addDays(); });

  function calculate(){
    var d1 = new Date(document.getElementById('date1').value);
    var d2 = new Date(document.getElementById('date2').value);
    if(isNaN(d1)||isNaN(d2)) return;
    if(d2 < d1){ var tmp=d1; d1=d2; d2=tmp; }

    var diffMs = d2 - d1;
    var diffDays = Math.round(diffMs / (1000*60*60*24));
    var diffWeeks = Math.floor(diffDays / 7);
    var remDays = diffDays % 7;

    // Months and years
    var years = d2.getFullYear() - d1.getFullYear();
    var months = d2.getMonth() - d1.getMonth();
    var days = d2.getDate() - d1.getDate();
    if(days < 0){ months--; var pm = new Date(d2.getFullYear(),d2.getMonth(),0); days += pm.getDate(); }
    if(months < 0){ years--; months += 12; }
    var totalMonths = years*12 + months;

    document.getElementById('resTotalDays').textContent = diffDays.toLocaleString();
    document.getElementById('resWeeks').textContent = diffWeeks + ' weeks, ' + remDays + ' days';
    document.getElementById('resMonths').textContent = totalMonths + ' months';
    document.getElementById('resYMD').textContent = years + 'y ' + months + 'm ' + days + 'd';

    // Weekdays/weekends
    var wdays = 0, wends = 0;
    var cur = new Date(d1);
    while(cur <= d2){
      var day = cur.getDay();
      if(day===0||day===6) wends++; else wdays++;
      cur.setDate(cur.getDate()+1);
    }
    document.getElementById('resWeekdays').textContent = wdays;
    document.getElementById('resWeekends').textContent = wends;

    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  function addDays(){
    var base = new Date(document.getElementById('baseDate').value);
    var num = parseInt(document.getElementById('daysNum').value) || 0;
    var op = document.querySelector('input[name="addOp"]:checked').value;
    if(isNaN(base)) return;
    var res = new Date(base);
    if(op==='add') res.setDate(res.getDate()+num); else res.setDate(res.getDate()-num);
    var opts = {weekday:'long',year:'numeric',month:'long',day:'numeric'};
    document.getElementById('addResDate').textContent = res.toLocaleDateString('en-IN',opts);
    addResult.classList.add('show');
  }

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
