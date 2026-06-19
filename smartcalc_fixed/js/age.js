// Age Calculator
(function(){
  var form = document.getElementById('ageForm');
  var result = document.getElementById('ageResult');
  var dobInput = document.getElementById('dob');

  // Set max date to today
  var today = new Date();
  dobInput.max = today.toISOString().split('T')[0];

  form.addEventListener('submit', function(e){
    e.preventDefault();
    calculate();
  });

  function calculate(){
    var dob = new Date(dobInput.value);
    if (!dobInput.value || isNaN(dob)) return;
    var now = new Date();
    if (dob > now) { alert('Date of birth cannot be in the future.'); return; }

    var years = now.getFullYear() - dob.getFullYear();
    var months = now.getMonth() - dob.getMonth();
    var days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      var prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    var totalDays = Math.floor((now - dob) / (1000 * 60 * 60 * 24));
    var totalWeeks = Math.floor(totalDays / 7);
    var totalMonths = years * 12 + months;

    // Next birthday
    var nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday <= now) nextBday.setFullYear(now.getFullYear() + 1);
    var daysToNext = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));

    document.getElementById('resYears').textContent = years;
    document.getElementById('resMonths').textContent = months;
    document.getElementById('resDays').textContent = days;
    document.getElementById('resTotalDays').textContent = totalDays.toLocaleString();
    document.getElementById('resTotalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('resTotalMonths').textContent = totalMonths.toLocaleString();
    document.getElementById('resNextBday').textContent = daysToNext + ' days';

    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  document.getElementById('resetBtn').addEventListener('click', function(){
    form.reset();
    result.classList.remove('show');
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(function(b){ b.setAttribute('aria-expanded','false'); });
      document.querySelectorAll('.faq-a').forEach(function(a){ a.classList.remove('open'); });
      if (!expanded) {
        this.setAttribute('aria-expanded','true');
        this.nextElementSibling.classList.add('open');
      }
    });
  });

  // Mobile menu
  var mt = document.getElementById('menuToggle');
  var mn = document.getElementById('mobileNav');
  if(mt) mt.addEventListener('click', function(){ mn.classList.toggle('open'); });
})();
