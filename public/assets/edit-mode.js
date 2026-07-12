/* Dozals Section Picker — name every section so you can point me at it.
   Toggle: floating § button (bottom-right) or Cmd/Ctrl+E.
   Click any section's badge → copies "page.html § Name" to clipboard. */
(function () {
  'use strict';

  var on = false;
  var PAGE = location.pathname.split('/').pop() || 'index.html';
  var css = [
    '#dz-fab{position:fixed;bottom:16px;right:16px;z-index:2147483647;display:flex;gap:6px;align-items:center;',
    '  background:#0f172a;color:#f1f5f9;border:1px solid #334155;border-radius:999px;padding:8px 14px;',
    '  font:600 12px/1 -apple-system,Segoe UI,Roboto,sans-serif;cursor:pointer;box-shadow:0 8px 24px -8px rgba(0,0,0,.5);}',
    '#dz-fab:hover{background:#1e293b;}',
    '#dz-fab.is-on{background:#c2410c;border-color:#f97316;}',
    '#dz-fab .dot{width:7px;height:7px;border-radius:50%;background:#22c55e;}',
    '#dz-fab.is-on .dot{background:#fde047;}',
    '#dz-toast{position:fixed;bottom:74px;right:16px;z-index:2147483647;background:#059669;color:#fff;',
    '  padding:9px 16px;border-radius:8px;font:600 12px/1.3 -apple-system,sans-serif;',
    '  box-shadow:0 8px 24px -10px rgba(0,0,0,.4);opacity:0;transform:translateY(6px);transition:.2s; pointer-events:none;}',
    '#dz-toast.is-show{opacity:1;transform:none;}',
    '#dz-side{position:fixed;top:0;right:0;bottom:0;width:280px;z-index:2147483646;background:#0f172a;color:#e2e8f0;',
    '  box-shadow:-10px 0 30px -10px rgba(0,0,0,.5);transform:translateX(100%);transition:transform .25s;',
    '  font:13px/1.4 -apple-system,sans-serif;display:flex;flex-direction:column;}',
    '#dz-side.is-open{transform:none;}',
    '#dz-side__h{padding:14px 16px 10px;border-bottom:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;}',
    '#dz-side__h b{font-size:13px;letter-spacing:.02em;}',
    '#dz-side__h small{color:#64748b;font-weight:400;font-size:11px;}',
    '#dz-side__list{overflow-y:auto;padding:8px 6px;}',
    '#dz-side__list .item{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:start;padding:8px 10px;border-radius:7px;cursor:pointer;}',
    '#dz-side__list .item:hover{background:#1e293b;}',
    '#dz-side__list .idx{font:600 11px/1.2 var(--mono,monospace);color:#f97316;padding-top:2px;}',
    '#dz-side__list .name{font-weight:500;color:#f1f5f9;}',
    '#dz-side__list .sid{font:10px/1.2 var(--mono,monospace);color:#64748b;margin-top:3px;}',
    '.dz-badge{position:absolute;top:8px;right:10px;z-index:2147483645;display:inline-flex;align-items:center;gap:5px;',
    '  background:#c2410c;color:#fff;border:1px solid #f97316;border-radius:6px;padding:4px 9px;',
    '  font:600 11px/1 -apple-system,sans-serif;cursor:pointer;box-shadow:0 4px 14px -4px rgba(194,65,12,.7);',
    '  pointer-events:auto; user-select:none;}',
    '.dz-badge:hover{background:#ea580c;}',
    '.dz-badge::before{content:"§";opacity:.7;}',
    '.dz-badge .idx{opacity:.65;font-weight:400;}',
    '[data-section].dz-target{outline:2px dashed rgba(249,115,22,.55) !important;outline-offset:-2px;}',
    '[data-section].dz-flash{outline:3px solid #2563eb !important;outline-offset:-2px;',
    '  box-shadow:0 0 0 0 rgba(37,99,235,.5);animation:dz-flash 1.4s ease-out forwards;}',
    '@keyframes dz-flash{0%{box-shadow:0 0 0 0 rgba(37,99,235,.55);}100%{box-shadow:0 0 0 24px rgba(37,99,235,0);}}'
  ].join('\n');
  var st = document.createElement('style');
  st.id = 'dz-picker-css';
  st.textContent = css;
  document.head.appendChild(st);

  function make(html){ var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  var fab = make(
    '<button id="dz-fab" title="Toggle section picker (Cmd/Ctrl+E)">' +
    '  <span class="dot"></span><span>§ Sections</span></button>');
  var toast = make('<div id="dz-toast" role="status" aria-live="polite"></div>');
  var side = make(
    '<aside id="dz-side" aria-hidden="true">' +
    '  <div id="dz-side__h"><div><b>Sections</b><br/><small id="dz-side__page">—</small></div>' +
    '    <button id="dz-side__close" title="Close" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:18px;line-height:1;">×</button></div>' +
    '  <div id="dz-side__list"></div>' +
    '  <div style="padding:10px 14px;border-top:1px solid #1e293b;color:#64748b;font-size:11px;line-height:1.5;">' +
    '    Click a section to copy its address, then paste it in chat to tell the assistant what to edit. ' +
    '    <strong style="color:#94a3b8;">Tip:</strong> Cmd/Ctrl+E toggles this panel.</div>' +
    '</aside>');
  document.body.appendChild(fab);
  document.body.appendChild(toast);
  document.body.appendChild(side);
  side.querySelector('#dz-side__close').addEventListener('click', function(){ side.classList.remove('is-open'); });

  function notify(msg, color){
    toast.textContent = msg;
    if (color) toast.style.background = color; else toast.style.background = '#059669';
    toast.classList.add('is-show');
    clearTimeout(notify._t); notify._t = setTimeout(function(){ toast.classList.remove('is-show'); }, 1800);
  }

  var sections = [];
  function collect(){
    sections = [];
    var list = document.querySelectorAll('[data-section]');
    list.forEach(function(el, i){
      var name = el.getAttribute('data-section');
      var id = el.getAttribute('id') || '';
      var info = el.getBoundingClientRect();
      sections.push({ el: el, name: name, id: id, idx: String(i+1).padStart(2,'0') });
    });
  }

  function renderBadges(){
    sections.forEach(function(s){
      if (s.el.querySelector(':scope > .dz-badge')) return;
      var b = make('<span class="dz-badge" tabindex="0"><span class="idx">' + s.idx + '</span>' + s.name + '</span>');
      s.el.classList.add('dz-target');
      if (getComputedStyle(s.el).position === 'static') s.el.style.position = 'relative';
      s.el.appendChild(b);
      b.addEventListener('click', function(e){ e.stopPropagation(); e.preventDefault(); copyForChat(s); });
      b.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); copyForChat(s); }});
    });
  }
  function stripBadges(){
    document.querySelectorAll('.dz-badge').forEach(function(b){ b.remove(); });
    document.querySelectorAll('.dz-target').forEach(function(e){ e.classList.remove('dz-target'); });
  }

  function renderSidebar(){
    var list = side.querySelector('#dz-side__list');
    side.querySelector('#dz-side__page').textContent = PAGE + ' · ' + sections.length + ' sections';
    list.innerHTML = '';
    sections.forEach(function(s){
      var item = make(
        '<div class="item" role="button" tabindex="0">' +
        '  <div class="idx">' + s.idx + '</div>' +
        '  <div><div class="name">' + s.name + '</div>' +
        '  <div class="sid">#' + s.id + '</div></div>' +
        '</div>');
      item.addEventListener('click', function(){
        s.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        flash(s); copyForChat(s);
      });
      item.addEventListener('keydown', function(e){ if (e.key==='Enter'||e.key===' '){ e.preventDefault(); item.click(); }});
      list.appendChild(item);
    });
  }

  function flash(s){
    s.el.classList.remove('dz-flash');
    void s.el.offsetWidth;
    s.el.classList.add('dz-flash');
    setTimeout(function(){ s.el.classList.remove('dz-flash'); }, 1400);
  }

  function copyForChat(s){
    var payload = PAGE + ' § ' + s.name;
    function done(){ notify('Copied → "' + payload + '"'); flash(s); }
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(payload).then(done, function(){ fallback(); });
    } else { fallback(); }
    function fallback(){
      var ta = document.createElement('textarea');
      ta.value = payload; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch(e){ notify('Copy failed — clipboard blocked', '#dc2626'); }
      document.body.removeChild(ta);
    }
  }

  function open(){ on = true; collect(); renderBadges(); renderSidebar(); side.classList.add('is-open'); side.setAttribute('aria-hidden','false'); fab.classList.add('is-on'); fab.querySelector('span:last-child').textContent = 'Sections on'; }
  function close(){ on = false; stripBadges(); side.classList.remove('is-open'); side.setAttribute('aria-hidden','true'); fab.classList.remove('is-on'); fab.querySelector('span:last-child').textContent = '§ Sections'; }
  function toggle(){ if (on) close(); else open(); }

  fab.addEventListener('click', toggle);
  window.addEventListener('keydown', function(e){
    if ((e.metaKey || e.ctrlKey) && (e.key === 'e' || e.key === 'E')){ e.preventDefault(); toggle(); }
  });
  window.addEventListener('resize', function(){ if (on) collect(); });

  window.DozalsPicker = { toggle: toggle, refresh: function(){ if (on){ stripBadges(); collect(); renderBadges(); renderSidebar(); } } };
})();