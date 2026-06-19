// Percentage Calculator
(function(){
  // Tab switching
  var tabs = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(function(p){ p.hidden = true; });
      this.classList.add('active');
      this.setAttribute('aria-selected','true');
      document.getElementById(this.dataset.tab).hidden = false;
    });
  });

  function fmt(n){ return parseFloat(n.toFixed(4)).toLocaleString(); }

  // Panel 1: X% of Y
  document.getElementById('form1').addEventListener('submit', function(e){
    e.preventDefault();
    var x = parseFloat(document.getElementById('p1x').value);
    var y = parseFloat(document.getElementById('p1y').value);
    if(isNaN(x)||isNaN(y)) return;
    var res = x/100 * y;
    showResult('result1', x + '% of ' + y + ' = <strong>' + fmt(res) + '</strong>');
  });

  // Panel 2: X is what % of Y
  document.getElementById('form2').addEventListener('submit', function(e){
    e.preventDefault();
    var x = parseFloat(document.getElementById('p2x').value);
    var y = parseFloat(document.getElementById('p2y').value);
    if(isNaN(x)||isNaN(y)||y===0) return;
    var res = (x/y)*100;
    showResult('result2', x + ' is <strong>' + fmt(res) + '%</strong> of ' + y);
  });

  // Panel 3: Percent change
  document.getElementById('form3').addEventListener('submit', function(e){
    e.preventDefault();
    var from = parseFloat(document.getElementById('p3from').value);
    var to = parseFloat(document.getElementById('p3to').value);
    if(isNaN(from)||isNaN(to)||from===0) return;
    var change = ((to-from)/Math.abs(from))*100;
    var dir = change >= 0 ? 'increase' : 'decrease';
    showResult('result3', 'Change: <strong>' + (change>=0?'+':'') + fmt(change) + '%</strong> (' + dir + ')');
  });

  // Panel 4: Add/subtract percent
  document.getElementById('form4').addEventListener('submit', function(e){
    e.preventDefault();
    var base = parseFloat(document.getElementById('p4base').value);
    var pct = parseFloat(document.getElementById('p4pct').value);
    var op = document.querySelector('input[name="p4op"]:checked').value;
    if(isNaN(base)||isNaN(pct)) return;
    var pctAmt = base * pct / 100;
    var res = op === 'add' ? base + pctAmt : base - pctAmt;
    showResult('result4', base + (op==='add'?' + ':' - ') + pct + '% = <strong>' + fmt(res) + '</strong> (change: ' + fmt(pctAmt) + ')');
  });

  function showResult(id, html){
    var el = document.getElementById(id);
    el.innerHTML = html;
    el.classList.add('show');
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
