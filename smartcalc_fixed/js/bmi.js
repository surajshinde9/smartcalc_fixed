// BMI Calculator
(function(){
  var form = document.getElementById('bmiForm');
  var result = document.getElementById('bmiResult');

  form.addEventListener('submit', function(e){ e.preventDefault(); calculate(); });

  function calculate(){
    var unit = document.querySelector('input[name="unit"]:checked').value;
    var bmi;
    if(unit === 'metric'){
      var weight = parseFloat(document.getElementById('weight').value);
      var heightCm = parseFloat(document.getElementById('height').value);
      if(!weight || !heightCm || weight<=0 || heightCm<=0) return;
      var heightM = heightCm / 100;
      bmi = weight / (heightM * heightM);
    } else {
      var weightLb = parseFloat(document.getElementById('weightLb').value);
      var heightFt = parseFloat(document.getElementById('heightFt').value);
      var heightIn = parseFloat(document.getElementById('heightIn').value) || 0;
      if(!weightLb || !heightFt || weightLb<=0 || heightFt<=0) return;
      var totalIn = heightFt * 12 + heightIn;
      bmi = (weightLb / (totalIn * totalIn)) * 703;
    }

    bmi = Math.round(bmi * 10) / 10;
    var category, color, advice;
    if (bmi < 18.5) {
      category = 'Underweight'; color = '#3b82f6'; advice = 'You may need to gain some weight. Consult a nutritionist.';
    } else if (bmi < 25) {
      category = 'Normal Weight'; color = '#16a34a'; advice = 'Great! You are at a healthy weight. Keep it up!';
    } else if (bmi < 30) {
      category = 'Overweight'; color = '#f97316'; advice = 'Consider a balanced diet and regular exercise.';
    } else if (bmi < 35) {
      category = 'Obese (Class I)'; color = '#dc2626'; advice = 'Please consult a doctor for a personalized health plan.';
    } else if (bmi < 40) {
      category = 'Obese (Class II)'; color = '#b91c1c'; advice = 'Seek medical advice. Significant health risks involved.';
    } else {
      category = 'Obese (Class III)'; color = '#7f1d1d'; advice = 'Seek immediate medical attention.';
    }

    document.getElementById('resBmi').textContent = bmi;
    document.getElementById('resCategory').textContent = category;
    document.getElementById('resAdvice').textContent = advice;

    var needle = document.getElementById('bmiNeedle');
    var pct = Math.min(Math.max((bmi - 10) / (45 - 10), 0), 1) * 100;
    if(needle) needle.style.left = pct + '%';

    var catEl = document.getElementById('bmiCategoryBadge');
    if(catEl){ catEl.textContent = category; catEl.style.background = color + '22'; catEl.style.color = color; catEl.style.border = '1px solid ' + color + '55'; }

    result.classList.add('show');
    result.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  // Toggle metric/imperial
  document.querySelectorAll('input[name="unit"]').forEach(function(radio){
    radio.addEventListener('change', function(){
      document.getElementById('metricFields').style.display = this.value==='metric' ? '' : 'none';
      document.getElementById('imperialFields').style.display = this.value==='imperial' ? '' : 'none';
      result.classList.remove('show');
    });
  });

  document.getElementById('resetBtn').addEventListener('click', function(){
    form.reset();
    document.getElementById('metricFields').style.display = '';
    document.getElementById('imperialFields').style.display = 'none';
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
