(function(){
  'use strict';
  var root=document.querySelector('[data-cluster-generator]');
  if(!root||!window.StyleEngine)return;
  var wanted=(root.getAttribute('data-style-ids')||'').split(',').filter(Boolean);
  var sample=root.getAttribute('data-sample')||'Your Text';
  var styles=wanted.map(function(id){return StyleEngine.STYLES.find(function(s){return s.id===id;});}).filter(Boolean);
  var input=root.querySelector('.cluster-input');
  var grid=root.querySelector('.cluster-grid');
  var count=root.querySelector('.cluster-count');
  var active='all';
  function esc(v){var d=document.createElement('div');d.textContent=v;return d.innerHTML;}
  function copy(text,button){
    var done=function(){button.classList.add('copied');button.textContent='Copied!';setTimeout(function(){button.classList.remove('copied');button.textContent='Copy';},1400);};
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done);return;}
    var area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();try{document.execCommand('copy');done();}finally{area.remove();}
  }
  function render(){
    var text=input.value||sample;
    var shown=active==='all'?styles:styles.filter(function(s){return s.cats.indexOf(active)!==-1;});
    grid.innerHTML=shown.map(function(s,i){var out=s.fn(text);return '<article class="cluster-card"><div class="cluster-card-head"><span class="cluster-name">'+esc(s.name)+'</span><button class="cluster-copy" type="button" data-i="'+i+'">Copy</button></div><div class="cluster-output">'+esc(out)+'</div></article>';}).join('');
    count.textContent=shown.length+' copy-and-paste styles';
    Array.prototype.forEach.call(grid.querySelectorAll('.cluster-copy'),function(btn){btn.addEventListener('click',function(){copy(shown[Number(btn.getAttribute('data-i'))].fn(input.value||sample),btn);});});
  }
  input.addEventListener('input',render);
  var reset=root.querySelector('.cluster-reset');if(reset)reset.addEventListener('click',function(){input.value=sample;input.focus();render();});
  Array.prototype.forEach.call(root.querySelectorAll('.cluster-chip'),function(btn){btn.addEventListener('click',function(){active=btn.getAttribute('data-cat');Array.prototype.forEach.call(root.querySelectorAll('.cluster-chip'),function(b){var on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});render();});});
  render();
})();
