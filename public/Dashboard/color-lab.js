/* ============================================================
   DOZALS — Color Lab
   A live UI-color-palette play-box for the static Dashboard pages.
   Self-contained: injects its own panel + styles, scans the page's
   compiled CSS for the brand accent literals, and re-themes them
   live via CSS custom properties.

   Color model (5 colors drive the dashboard):
     • --dz-color-1 / --dz-accent   : primary accent (links, buttons)
     • --dz-color-2                 : secondary accent (badges, bars)
     • --dz-color-3                 : tertiary accent (charts, dots)
     • --dz-bg (light)              : page background, light mode
     • --dz-bg (dark)               : page background, dark mode

   Controls:
     • Hue / Saturation / Lightness sliders (mono accent ramp)
     • Direct HEX input per swatch (overrides the active swatch)
     • Tap a swatch to apply it as the live primary accent
     • Predefined Palettes — click to apply a curated 5-color set
     • Background HSL sliders (Light / Dark theme)
   ============================================================ */
(function () {
  'use strict';

  // ---- Defaults derived from the brand accent #D0342C -------------------
  const DEFAULT_HEX = '#D0342C';

  // ---- Color math --------------------------------------------------------
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function norm360(h) { return ((h % 360) + 360) % 360; }
  function hsl(h, s, l) {
    return { h: norm360(h), s: clamp(s, 0, 100), l: clamp(l, 0, 100) };
  }
  function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hp = h / 60;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    let r = 0, g = 0, b = 0;
    if (hp >= 0 && hp < 1) { r = c; g = x; }
    else if (hp < 2) { r = x; g = c; }
    else if (hp < 3) { g = c; b = x; }
    else if (hp < 4) { g = x; b = c; }
    else if (hp < 5) { r = x; b = c; }
    else { r = c; b = x; }
    const m = l - c / 2;
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }
  function rgbToHex(o) {
    const h = (v) => v.toString(16).padStart(2, '0');
    return '#' + h(o.r) + h(o.g) + h(o.b);
  }
  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgbToHsl(o) {
    let r = o.r / 255, g = o.g / 255, b = o.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === r) h = 60 * (((g - b) / d) % 6);
      else if (max === g) h = 60 * ((b - r) / d + 2);
      else h = 60 * ((r - g) / d + 4);
    }
    if (h < 0) h += 360;
    const l = (max + min) / 2;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  // ---- Predefined palettes ----------------------------------------------
  const PREDEFINED_PALETTES = [
    { id: 'dozals-ember', name: 'Dozals Ember',
      dark: '#0A0A0A', light: '#FAFAFA',
      accent: '#D0342C', shade1: '#8A2A22', shade2: '#3A1A18' },
    { id: 'midnight-slate-gold', name: 'Midnight Slate & Gold',
      dark: '#2C4143', light: '#F2F4F5',
      accent: '#B89961', shade1: '#1A1A1A', shade2: '#E3E8EA' },
    { id: 'earthy-forest-sage', name: 'Earthy Forest & Sage',
      dark: '#1B3E2D', light: '#F4F5F0',
      accent: '#4CAF50', shade1: '#688A75', shade2: '#E8EFE9' },
    { id: 'warm-taupe-burnt', name: 'Warm Taupe & Burnt Orange',
      dark: '#1D1C1A', light: '#FFFFFF',
      accent: '#E66827', shade1: '#B3805B', shade2: '#D5D1C9' },
    { id: 'bronze-architect', name: 'Bronze & Architect Orange',
      dark: '#080808', light: '#FFFFFF',
      accent: '#F57F00', shade1: '#3A230F', shade2: '#70380B' },
    { id: 'high-contrast-mono', name: 'High-Contrast Monochrome & Orange',
      dark: '#080808', light: '#FFFFFF',
      accent: '#F57F00', shade1: '#222222', shade2: '#EAEAEA' },
    { id: 'deep-teal-blaze', name: 'Deep Teal & Blaze Orange',
      dark: '#16232A', light: '#E4EEF0',
      accent: '#FF5B04', shade1: '#075056', shade2: '#0E1B21' },
    { id: 'vibrant-coastal', name: 'Vibrant Coastal Sunset',
      dark: '#021C26', light: '#FFE8D8',
      accent: '#FF601A', shade1: '#07405B', shade2: '#25C9BA' },
    { id: 'aerospace-orange', name: 'Aerospace Orange & Cool Pastels',
      dark: '#141517', light: '#FFFFFF',
      accent: '#FF4F00', shade1: '#EFFEFF', shade2: '#D2F4E0' },
    { id: 'fiery-rust-charcoal', name: 'Fiery Rust & Charcoal',
      dark: '#060808', light: '#FFFFFF',
      accent: '#DD6211', shade1: '#B92717', shade2: '#7B7673' },
    { id: 'candy-apple', name: 'Candy Apple Red & Grayscale',
      dark: '#121212', light: '#FFFFFF',
      accent: '#DD0426', shade1: '#8A0318', shade2: '#888888' }
  ];
  const DEFAULT_PALETTE = PREDEFINED_PALETTES[0];

  // ---- Swatch generation (monochromatic ramp) ---------------------------
  function buildSwatches(H, S, L) {
    const base = hsl(H, S, L);
    return [
      hsl(base.h, base.s,        base.l),
      hsl(base.h, base.s * 0.75, base.l - 11),
      hsl(base.h, base.s * 0.55, base.l - 22),
      hsl(base.h, base.s * 0.9,  base.l + 10),
      hsl(base.h, base.s * 0.6,  base.l + 20)
    ];
  }

  // ---- State ------------------------------------------------------------
  const initState = rgbToHsl(hexToRgb(DEFAULT_HEX));
  const DEFAULT_STATE = {
    mode: 'mono',
    h: initState.h, s: initState.s, l: initState.l,
    active: 0,
    overrides: {},
    palette: {
      id: DEFAULT_PALETTE.id, name: DEFAULT_PALETTE.name,
      accent: DEFAULT_PALETTE.accent,
      shade1: DEFAULT_PALETTE.shade1,
      shade2: DEFAULT_PALETTE.shade2
    },
    activePaletteId: DEFAULT_PALETTE.id,
    bgLight: DEFAULT_PALETTE.light,
    bgDark: DEFAULT_PALETTE.dark,
    bgMode: 'light'
  };
  const STORAGE_KEY = 'dzcl-state-v2';
  const LEGACY_KEY  = 'dzcl-state-v1';
  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Object.assign({}, DEFAULT_STATE, parsed, {
          palette: Object.assign({}, DEFAULT_STATE.palette, parsed.palette || {})
        });
      }
    } catch (e) {}
    try {
      const raw1 = localStorage.getItem(LEGACY_KEY);
      if (raw1) {
        const p = JSON.parse(raw1);
        return Object.assign({}, DEFAULT_STATE, p, {
          mode: 'mono',
          palette: Object.assign({}, DEFAULT_STATE.palette),
          activePaletteId: DEFAULT_PALETTE.id
        });
      }
    } catch (e) {}
    return Object.assign({}, DEFAULT_STATE);
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function currentSwatches() {
    const computed = buildSwatches(state.h, state.s, state.l);
    return computed.map((c, i) => {
      const override = state.overrides[i];
      const rgb = override ? hexToRgb(override) : hslToRgb(c.h, c.s, c.l);
      const hex = override ? normalizeHex(override) : rgbToHex(rgb);
      const hslVals = override ? rgbToHsl(rgb) : c;
      return { index: i, rgb, hex, hsl: hslVals, overridden: !!override };
    });
  }
  function normalizeHex(h) {
    const r = hexToRgb(h); return r ? rgbToHex(r) : DEFAULT_HEX;
  }
  function activeSwatch() {
    const sw = currentSwatches();
    const i = clamp(state.active, 0, sw.length - 1);
    return sw[i];
  }

  // ---- Live application to the page -------------------------------------
  const ROOT = document.documentElement;
  function setRgbVar(name, hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    ROOT.style.setProperty(name, hex);
    ROOT.style.setProperty(name + '-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
  function applyToPage() {
    let c1, c2, c3;
    if (state.mode === 'palette') {
      c1 = state.palette.accent;
      c2 = state.palette.shade1;
      c3 = state.palette.shade2;
    } else {
      const sw = currentSwatches();
      const i = clamp(state.active, 0, sw.length - 1);
      c1 = sw[i].hex;
      c2 = sw[(i + 1) % sw.length].hex;
      c3 = sw[(i + 2) % sw.length].hex;
    }
    ROOT.style.setProperty('--dz-accent', c1);
    setRgbVar('--dz-color-1', c1);
    setRgbVar('--dz-color-2', c2);
    setRgbVar('--dz-color-3', c3);

    const isDark = ROOT.classList.contains('dark');
    const bg = isDark ? state.bgDark : state.bgLight;
    ROOT.style.setProperty('--dz-bg', bg);
    const bgRgb = hexToRgb(bg) || hexToRgb(isDark ? '#0A0A0A' : '#FAFAFA');
    const bgHsl = rgbToHsl(bgRgb);
    const surfL = isDark ? Math.min(bgHsl.l + 6, 100) : Math.min(bgHsl.l + 3, 100);
    const surfRgb = hslToRgb(bgHsl.h, bgHsl.s, surfL);
    ROOT.style.setProperty('--dz-surface', rgbToHex(surfRgb));
    ROOT.style.setProperty('--dz-surface-rgb', `${surfRgb.r}, ${surfRgb.g}, ${surfRgb.b}`);
  }

  // ---- CSS override scan ------------------------------------------------
  const ACCENT_TEST = (v) =>
    /#d0342c/i.test(v) ||
    /\brgba?\(\s*208\s*,\s*52\s*,\s*44\s*(?:,\s*[\d.]+\s*)?\)/i.test(v) ||
    /\brgb\(\s*208\s+52\s+44(?:\s*\/\s*[\d.]+%?)?\s*\)/i.test(v) ||
    /\brgb\(\s*208\s+52\s+44\s*\/\s*var\([^)]+\)\s*\)/i.test(v);

  function transformAccent(v) {
    let out = v;
    out = out.replace(
      /\brgba?\(\s*208\s*,\s*52\s*,\s*44\s*(?:,\s*([\d.]+)\s*)?\)/gi,
      (m, a) => (a ? `rgba(var(--dz-accent-rgb), ${a})` : 'var(--dz-accent)')
    );
    out = out.replace(
      /\brgb\(\s*208\s+52\s+44\s*\/\s*var\(([^)]+)\)\s*\)/gi,
      (m, name) => `rgba(var(--dz-accent-rgb), var(${name}, 1))`
    );
    out = out.replace(
      /\brgb\(\s*208\s+52\s+44(?:\s*\/\s*([\d.]+)%?)?\s*\)/gi,
      (m, a) => (a ? `rgba(var(--dz-accent-rgb), ${a.replace('%', '')})` : 'var(--dz-accent)')
    );
    out = out.replace(/#d0342c/gi, 'var(--dz-accent)');
    return out;
  }

  let overrideSheet = null;
  const seenSelectors = new Set();
  function ensureOverrideSheet() {
    if (overrideSheet) return overrideSheet;
    const el = document.createElement('style');
    el.id = 'dz-overrides';
    document.head.appendChild(el);
    overrideSheet = el.sheet;
    return overrideSheet;
  }
  function scanAndOverride() {
    const sheet = ensureOverrideSheet();
    for (const s of Array.from(document.styleSheets)) {
      if (s.ownerNode && s.ownerNode.id === 'dz-overrides') continue;
      if (s.ownerNode && s.ownerNode.id === 'dz-panel-styles') continue;
      let rules;
      try { rules = s.cssRules; } catch (e) { continue; }
      if (!rules) continue;
      for (const rule of Array.from(rules)) {
        if (rule.type !== 1) continue;
        const sel = rule.selectorText;
        if (!sel || seenSelectors.has(sel)) continue;
        const decl = rule.style;
        let parts = '';
        for (let i = 0; i < decl.length; i++) {
          const prop = decl.item(i);
          if (prop.startsWith('--')) continue;
          const val = decl.getPropertyValue(prop);
          if (!val) continue;
          if (ACCENT_TEST(val)) {
            parts += `${prop}: ${transformAccent(val)} !important; `;
          }
        }
        if (parts) {
          seenSelectors.add(sel);
          try { sheet.insertRule(`${sel} { ${parts} }`, sheet.cssRules.length); } catch (e) {}
        }
      }
    }
  }
  function rescanLoop() {
    scanAndOverride();
    setTimeout(scanAndOverride, 300);
    setTimeout(scanAndOverride, 1200);
  }

  // ---- Panel UI ---------------------------------------------------------
  const PANEL_HTML = `
  <button id="dzcl-toggle" aria-label="Open Color Lab" title="Color Lab">
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0 0 20c.55 0 1-.45 1-1 0-.28-.11-.52-.29-.71-.18-.18-.29-.43-.29-.71 0-.55.45-1 1-1H15a4 4 0 0 0 4-4c0-4.42-3.13-7-7-7z" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="7.5" cy="11.5" r="1.4" fill="currentColor"/>
      <circle cx="10.5" cy="7.5" r="1.4" fill="currentColor"/>
      <circle cx="14.5" cy="7.5" r="1.4" fill="currentColor"/>
      <circle cx="16.5" cy="11.5" r="1.4" fill="currentColor"/>
    </svg>
  </button>
  <div id="dzcl-panel" hidden role="dialog" aria-label="Color Lab">
    <header class="dzcl-head">
      <div class="dzcl-title">
        <span class="dzcl-dot"></span> COLOR LAB
      </div>
      <div class="dzcl-head-actions">
        <button id="dzcl-copy" title="Copy palette HEX">Copy</button>
        <button id="dzcl-reset" title="Reset to brand accent">Reset</button>
        <button id="dzcl-close" title="Close" aria-label="Close">✕</button>
      </div>
    </header>

    <section class="dzcl-sec">
      <div class="dzcl-mode-tag" id="dzcl-mode-tag">MONO MODE</div>
      <div class="dzcl-row">
        <label class="dzcl-label" for="dzcl-hue">Hue</label>
        <span id="dzcl-hue-val" class="dzcl-val">0&deg;</span>
      </div>
      <input type="range" id="dzcl-hue" min="0" max="360" step="1" class="dzcl-range dzcl-hue-range">

      <div class="dzcl-row">
        <label class="dzcl-label" for="dzcl-sat">Saturation</label>
        <span id="dzcl-sat-val" class="dzcl-val">0%</span>
      </div>
      <input type="range" id="dzcl-sat" min="0" max="100" step="1" class="dzcl-range dzcl-sat-range">

      <div class="dzcl-row">
        <label class="dzcl-label" for="dzcl-light">Lightness</label>
        <span id="dzcl-light-val" class="dzcl-val">0%</span>
      </div>
      <input type="range" id="dzcl-light" min="0" max="100" step="1" class="dzcl-range dzcl-light-range">
    </section>

    <section class="dzcl-sec">
      <label class="dzcl-label">Accent Swatches <span class="dzcl-hint dzcl-inline">tap to apply</span></label>
      <div id="dzcl-swatches" class="dzcl-swatches"></div>
      <p class="dzcl-hint">Mono ramp over the accent hue. Tap a chip to set the live primary accent.</p>
    </section>

    <section class="dzcl-sec">
      <label class="dzcl-label">Predefined Palettes <span class="dzcl-hint dzcl-inline">click to apply all 5</span></label>
      <div id="dzcl-palettes" class="dzcl-palettes"></div>
      <p class="dzcl-hint">Accent &middot; Shade 1 &middot; Shade 2 + light &amp; dark backgrounds.</p>
    </section>

    <section class="dzcl-sec">
      <label class="dzcl-label">Background <span class="dzcl-hint dzcl-inline">HSL &middot; per theme</span></label>
      <div class="dzcl-bg-tabs" role="tablist">
        <button type="button" id="dzcl-bg-tab-light" class="dzcl-bg-tab" data-bg="light" role="tab">Light</button>
        <button type="button" id="dzcl-bg-tab-dark"  class="dzcl-bg-tab" data-bg="dark"  role="tab">Dark</button>
      </div>
      <div class="dzcl-bg-chip-row">
        <span class="dzcl-bg-chip-preview" id="dzcl-bg-preview"></span>
        <input type="text" class="dzcl-hex" id="dzcl-bg-hex" value="#FAFAFA" spellcheck="false">
      </div>
      <div class="dzcl-row dzcl-row-bg">
        <label class="dzcl-label" for="dzcl-bg-hue">Hue</label>
        <span id="dzcl-bg-hue-val" class="dzcl-val">0&deg;</span>
      </div>
      <input type="range" id="dzcl-bg-hue" min="0" max="360" step="1" class="dzcl-range dzcl-hue-range">
      <div class="dzcl-row dzcl-row-bg">
        <label class="dzcl-label" for="dzcl-bg-sat">Saturation</label>
        <span id="dzcl-bg-sat-val" class="dzcl-val">0%</span>
      </div>
      <input type="range" id="dzcl-bg-sat" min="0" max="100" step="1" class="dzcl-range dzcl-sat-range">
      <div class="dzcl-row dzcl-row-bg">
        <label class="dzcl-label" for="dzcl-bg-light">Lightness</label>
        <span id="dzcl-bg-light-val" class="dzcl-val">0%</span>
      </div>
      <input type="range" id="dzcl-bg-light" min="0" max="100" step="1" class="dzcl-range dzcl-light-range">
      <p class="dzcl-hint">Toggle Light/Dark to edit each. Body bg + glass panels tint together.</p>
    </section>

    <section class="dzcl-sec dzcl-preview">
      <label class="dzcl-label">Live mock</label>
      <div class="dzcl-mock">
        <div class="dzcl-mock-row">
          <button class="dzcl-mock-btn">Primary</button>
          <button class="dzcl-mock-sec">Secondary</button>
          <button class="dzcl-mock-ghost">Ghost</button>
          <span class="dzcl-mock-tag">TAG</span>
        </div>
        <div class="dzcl-mock-bar"></div>
        <div class="dzcl-mock-grid"></div>
      </div>
    </section>
  </div>`;

  const PANEL_CSS = `
  #dzcl-toggle, #dzcl-panel, #dzcl-panel * { box-sizing: border-box; }
  #dzcl-toggle {
    position: fixed; left: 18px; bottom: 18px; z-index: 2147483646;
    width: 46px; height: 46px; border-radius: 999px; cursor: pointer;
    display: grid; place-items: center;
    background: #0A0A0A; color: #FAFAFA; border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 8px 24px -8px rgba(0,0,0,0.45);
    transition: transform .2s ease, background .2s ease;
  }
  #dzcl-toggle:hover { transform: translateY(-2px) scale(1.04); background: var(--dz-accent, #D0342C); }
  #dzcl-panel[hidden] { display: none !important; }
  #dzcl-panel {
    position: fixed; left: 18px; bottom: 74px; z-index: 2147483647;
    width: 312px; max-height: calc(100vh - 100px); overflow-y: auto; overflow-x: hidden;
    background: #FFFFFF; color: #1a1a1a; border: 1px solid #E5E5E5; border-radius: 10px;
    box-shadow: 0 24px 70px -24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.4) inset;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px; line-height: 1.4;
    --dz-accent: #D0342C; --dz-accent-rgb: 208, 52, 44;
    --dz-color-2: #8A2A22; --dz-color-2-rgb: 138, 42, 34;
    --dz-color-3: #3A1A18; --dz-color-3-rgb: 58, 26, 24;
  }
  #dzcl-panel::-webkit-scrollbar { width: 6px; }
  #dzcl-panel::-webkit-scrollbar-thumb { background: #D0D0D0; border-radius: 3px; }
  .dzcl-head {
    position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between;
    padding: 12px 14px; background: #0A0A0A; color: #FAFAFA; border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #1a1a1a;
  }
  .dzcl-title { letter-spacing: 1.5px; font-size: 11px; display: flex; align-items: center; gap: 8px; }
  .dzcl-dot { width: 9px; height: 9px; border-radius: 999px; background: var(--dz-accent); box-shadow: 0 0 10px rgba(var(--dz-accent-rgb), 0.7); }
  .dzcl-head-actions { display: flex; gap: 6px; }
  .dzcl-head-actions button {
    background: transparent; color: #FAFAFA; border: 1px solid rgba(255,255,255,0.18);
    border-radius: 6px; padding: 4px 8px; font: inherit; font-size: 10px; letter-spacing: .6px; cursor: pointer;
    transition: background .15s ease, border-color .15s ease;
  }
  .dzcl-head-actions button:hover { background: rgba(255,255,255,0.1); border-color: var(--dz-accent); }
  .dzcl-sec { padding: 14px; border-bottom: 1px solid #EFEFEF; }
  .dzcl-sec:last-child { border-bottom: none; }
  .dzcl-label { display: block; font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; color: #5a5a5a; }
  .dzcl-row { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 6px; }
  .dzcl-row-bg { margin-top: 10px; margin-bottom: 4px; }
  .dzcl-mode-tag {
    display: inline-block; padding: 2px 7px; margin-bottom: 10px;
    font-size: 9px; letter-spacing: 1.2px; color: #FAFAFA; background: #1a1a1a;
    border-radius: 4px; text-transform: uppercase;
  }
  .dzcl-val { font-size: 11px; color: #1a1a1a; }
  .dzcl-hint { margin: 8px 0 0; font-size: 10px; color: #8a8a8a; letter-spacing: .2px; line-height: 1.5; }
  .dzcl-hint.dzcl-inline { display: inline; margin: 0; font-style: normal; }

  .dzcl-palettes { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
  .dzcl-pal {
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 8px;
    padding: 6px 8px; border: 1px solid #E5E5E5; border-radius: 8px; cursor: pointer;
    transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
  }
  .dzcl-pal:hover { border-color: #B0B0B0; background: #FAFAFA; }
  .dzcl-pal[data-active="true"] {
    border-color: var(--dz-accent); box-shadow: 0 0 0 2px rgba(var(--dz-accent-rgb), 0.18);
    background: rgba(var(--dz-accent-rgb), 0.06);
  }
  .dzcl-pal-name { font-size: 10px; letter-spacing: .4px; color: #1a1a1a; }
  .dzcl-pal-swatches { display: flex; gap: 3px; }
  .dzcl-pal-sw { width: 14px; height: 14px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.12); }

  .dzcl-bg-tabs { display: flex; gap: 4px; margin-top: 8px; margin-bottom: 8px; }
  .dzcl-bg-tab {
    flex: 1; padding: 5px 0; font: inherit; font-size: 10px; letter-spacing: .6px; cursor: pointer;
    background: #FAFAFA; color: #5a5a5a; border: 1px solid #E5E5E5; border-radius: 6px;
    transition: background .15s ease, color .15s ease, border-color .15s ease;
  }
  .dzcl-bg-tab[data-active="true"] {
    background: var(--dz-accent, #D0342C); color: #FAFAFA; border-color: transparent;
  }
  .dzcl-bg-chip-row { display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 8px; margin-bottom: 6px; }
  .dzcl-bg-chip-preview {
    width: 30px; height: 30px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.12);
    background: #FAFAFA;
  }

  .dzcl-range { -webkit-appearance: none; appearance: none; width: 100%; height: 14px; border-radius: 7px;
    outline: none; cursor: pointer; border: 1px solid #E5E5E5; margin-top: 2px; }
  .dzcl-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none;
    width: 18px; height: 18px; border-radius: 999px; background: #FFFFFF; border: 2px solid #1a1a1a;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25); margin-top: -3px; }
  .dzcl-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 999px; background: #FFFFFF; border: 2px solid #1a1a1a; }
  .dzcl-hue-range { background: linear-gradient(90deg,#ff0000,#ff9e00,#ffe600,#4dff00,#00ffd9,#0080ff,#7a00ff,#ff00d4,#ff0000); }
  .dzcl-sat-range, .dzcl-light-range { background: #EFEFEF; }

  .dzcl-swatches { display: grid; grid-template-columns: 1fr; gap: 6px; margin-top: 8px; }
  .dzcl-swatch {
    display: grid; grid-template-columns: 34px 1fr 22px; align-items: center; gap: 8px;
    padding: 6px; border: 1px solid #E5E5E5; border-radius: 8px;
    transition: border-color .15s ease, box-shadow .15s ease;
  }
  .dzcl-swatch:hover { border-color: #B0B0B0; }
  .dzcl-swatch[data-active="true"] {
    border-color: var(--dz-accent); box-shadow: 0 0 0 2px rgba(var(--dz-accent-rgb), 0.18);
  }
  .dzcl-chip { width: 34px; height: 34px; border-radius: 6px; cursor: pointer; border: 1px solid rgba(0,0,0,0.1); position: relative; }
  .dzcl-swatch[data-overridden="true"] .dzcl-chip::after {
    content: '•'; position: absolute; top: -7px; right: -3px; font-size: 14px; color: #1a1a1a;
    background: #fff; border-radius: 999px; line-height: 1;
  }
  .dzcl-hex {
    font: inherit; font-size: 11px; color: #1a1a1a; border: 1px solid #D0D0D0; border-radius: 6px;
    padding: 5px 7px; background: #FAFAFA; width: 100%; letter-spacing: .5px;
  }
  .dzcl-hex:focus { outline: none; border-color: var(--dz-accent); background: #fff; }
  .dzcl-reset-sw {
    background: transparent; border: none; cursor: pointer; color: #8a8a8a; font-size: 13px; line-height: 1;
    padding: 2px 4px; border-radius: 4px;
  }
  .dzcl-reset-sw:hover { color: #1a1a1a; background: #EFEFEF; }
  .dzcl-reset-sw[hidden] { display: none; }

  .dzcl-mock { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; padding: 12px;
    border: 1px solid #E5E5E5; border-radius: 8px; background: #FAFAFA; }
  .dzcl-mock-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .dzcl-mock-btn, .dzcl-mock-sec, .dzcl-mock-ghost, .dzcl-mock-tag {
    font-family: 'Work Sans', sans-serif; font-size: 11px; border-radius: 999px; cursor: default;
  }
  .dzcl-mock-btn  { background: var(--dz-color-1, #D0342C); color: #fff; padding: 5px 12px; border: 1px solid transparent; }
  .dzcl-mock-sec  { background: var(--dz-color-2, #8A2A22); color: #fff; padding: 5px 12px; border: 1px solid transparent; }
  .dzcl-mock-ghost { background: transparent; color: #1a1a1a; padding: 4px 11px; border: 1px solid #B0B0B0; }
  .dzcl-mock-tag { background: rgba(var(--dz-color-3-rgb, 58, 26, 24), 0.12); color: var(--dz-color-3, #3A1A18);
    padding: 3px 8px; border: 1px solid rgba(var(--dz-color-3-rgb, 58, 26, 24), 0.25); letter-spacing: .6px; }
  .dzcl-mock-bar { height: 8px; border-radius: 4px;
    background: linear-gradient(90deg,
      var(--dz-color-1, #D0342C) 0%, var(--dz-color-1, #D0342C) 33%,
      var(--dz-color-2, #8A2A22) 33%, var(--dz-color-2, #8A2A22) 66%,
      var(--dz-color-3, #3A1A18) 66%, var(--dz-color-3, #3A1A18) 100%); }
  .dzcl-mock-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 3px; height: 28px; }
  .dzcl-mock-grid > i:nth-child(3n+1) { background: rgba(var(--dz-color-1-rgb, 208, 52, 44), 0.6); border-radius: 2px; }
  .dzcl-mock-grid > i:nth-child(3n+2) { background: rgba(var(--dz-color-2-rgb, 138, 42, 34), 0.6); border-radius: 2px; }
  .dzcl-mock-grid > i:nth-child(3n+3) { background: rgba(var(--dz-color-3-rgb, 58, 26, 24), 0.6); border-radius: 2px; }

  html.dark #dzcl-panel { background: #18181b; color: #FAFAFA; border-color: #27272a; }
  html.dark #dzcl-panel::-webkit-scrollbar-thumb { background: #3f3f46; }
  html.dark .dzcl-sec { border-bottom-color: #1f1f23; }
  html.dark .dzcl-label { color: #a1a1aa; }
  html.dark .dzcl-val { color: #FAFAFA; }
  html.dark .dzcl-hint { color: #6b7280; }
  html.dark .dzcl-sat-range, html.dark .dzcl-light-range { background: #1f1f23; }
  html.dark .dzcl-range { border-color: #27272a; }
  html.dark .dzcl-range::-webkit-slider-thumb { background: #1f1f23; border-color: #3f3f46; box-shadow: 0 1px 4px rgba(0,0,0,0.5); }
  html.dark .dzcl-range::-moz-range-thumb { background: #1f1f23; border-color: #3f3f46; }
  html.dark .dzcl-swatch { border-color: #27272a; }
  html.dark .dzcl-swatch:hover { border-color: #52525b; }
  html.dark .dzcl-swatch[data-overridden="true"] .dzcl-chip::after { color: #FAFAFA; background: #18181b; }
  html.dark .dzcl-hex { color: #FAFAFA; border-color: #3f3f46; background: #0A0A0A; }
  html.dark .dzcl-hex:focus { background: #0A0A0A; }
  html.dark .dzcl-reset-sw { color: #6b7280; }
  html.dark .dzcl-reset-sw:hover { color: #FAFAFA; background: #1f1f23; }
  html.dark .dzcl-mock { border-color: #27272a; background: #1f1f23; }
  html.dark .dzcl-mock-ghost { color: #FAFAFA; border-color: #52525b; }
  html.dark .dzcl-head { border-bottom-color: #27272a; }
  html.dark .dzcl-pal { border-color: #27272a; }
  html.dark .dzcl-pal:hover { border-color: #52525b; background: #18181b; }
  html.dark .dzcl-pal-name { color: #FAFAFA; }
  html.dark .dzcl-bg-tab { background: #1f1f23; color: #a1a1aa; border-color: #3f3f46; }
  html.dark .dzcl-bg-chip-preview { border-color: #3f3f46; }
  `;

  // ---- Inject panel -----------------------------------------------------
  function injectPanel() {
    const style = document.createElement('style');
    style.id = 'dz-panel-styles';
    style.textContent = PANEL_CSS;
    document.head.appendChild(style);

    const host = document.createElement('div');
    host.id = 'dzcl-host';
    host.innerHTML = PANEL_HTML;
    document.body.appendChild(host);

    wireUp();
  }

  // ---- Rendering --------------------------------------------------------
  let els = {};
  function cacheEls() {
    els = {
      toggle: document.getElementById('dzcl-toggle'),
      panel: document.getElementById('dzcl-panel'),
      close: document.getElementById('dzcl-close'),
      reset: document.getElementById('dzcl-reset'),
      copy: document.getElementById('dzcl-copy'),
      modeTag: document.getElementById('dzcl-mode-tag'),
      hue: document.getElementById('dzcl-hue'),
      hueVal: document.getElementById('dzcl-hue-val'),
      sat: document.getElementById('dzcl-sat'),
      satVal: document.getElementById('dzcl-sat-val'),
      light: document.getElementById('dzcl-light'),
      lightVal: document.getElementById('dzcl-light-val'),
      swatches: document.getElementById('dzcl-swatches'),
      palettes: document.getElementById('dzcl-palettes'),
      bgTabLight: document.getElementById('dzcl-bg-tab-light'),
      bgTabDark: document.getElementById('dzcl-bg-tab-dark'),
      bgPreview: document.getElementById('dzcl-bg-preview'),
      bgHex: document.getElementById('dzcl-bg-hex'),
      bgHue: document.getElementById('dzcl-bg-hue'),
      bgHueVal: document.getElementById('dzcl-bg-hue-val'),
      bgSat: document.getElementById('dzcl-bg-sat'),
      bgSatVal: document.getElementById('dzcl-bg-sat-val'),
      bgLight: document.getElementById('dzcl-bg-light'),
      bgLightVal: document.getElementById('dzcl-bg-light-val'),
      mockGrid: hostEl().querySelector('.dzcl-mock-grid')
    };
  }
  function hostEl() { return document.getElementById('dzcl-host'); }

  function currentBgHex() {
    return state.bgMode === 'dark' ? state.bgDark : state.bgLight;
  }
  function setCurrentBgHex(hex) {
    if (state.bgMode === 'dark') state.bgDark = hex;
    else state.bgLight = hex;
  }

  function renderBackground() {
    const hex = currentBgHex();
    if (els.bgPreview) els.bgPreview.style.background = hex;
    if (els.bgHex) els.bgHex.value = hex.toUpperCase();
    const hslVals = rgbToHsl(hexToRgb(hex) || hexToRgb('#FAFAFA'));
    if (els.bgHue) { els.bgHue.value = hslVals.h; els.bgHueVal.textContent = hslVals.h + '\u00B0'; }
    if (els.bgSat) { els.bgSat.value = hslVals.s; els.bgSatVal.textContent = hslVals.s + '%'; }
    if (els.bgLightSlider) { els.bgLightSlider.value = hslVals.l; els.bgLightVal.textContent = hslVals.l + '%'; }
    // bgLightSlider is stored as els.bgLight, renamed above
    if (els.bgLight) { els.bgLight.value = hslVals.l; els.bgLightVal.textContent = hslVals.l + '%'; }
    renderBgSliderTracks(hslVals);
    if (els.bgTabLight) els.bgTabLight.dataset.active = (state.bgMode === 'light') ? 'true' : 'false';
    if (els.bgTabDark)  els.bgTabDark.dataset.active  = (state.bgMode === 'dark')  ? 'true' : 'false';
  }

  function renderBgSliderTracks(bg) {
    if (!els.bgSat || !els.bgLight) return;
    els.bgSat.style.background =
      `linear-gradient(90deg, hsl(${bg.h}, 0%, ${bg.l}%), hsl(${bg.h}, 100%, ${bg.l}%))`;
    const mid = `hsl(${bg.h}, ${bg.s}%, 50%)`;
    els.bgLight.style.background = `linear-gradient(90deg, #000 0%, ${mid} 50%, #fff 100%)`;
  }

  function renderSliderTracks() {
    const base = `hsl(${state.h}, ${state.s}%, 50%)`;
    els.sat.style.background = `linear-gradient(90deg, hsl(${state.h}, 0%, ${state.l}%), hsl(${state.h}, 100%, ${state.l}%))`;
    els.light.style.background = `linear-gradient(90deg, #000 0%, ${base} 50%, #fff 100%)`;
  }

  function renderSwatches() {
    const swatches = currentSwatches();
    els.swatches.innerHTML = '';
    swatches.forEach((sw, i) => {
      const row = document.createElement('div');
      row.className = 'dzcl-swatch';
      row.dataset.active = (i === state.active) ? 'true' : 'false';
      row.dataset.overridden = sw.overridden ? 'true' : 'false';

      const chip = document.createElement('div');
      chip.className = 'dzcl-chip';
      chip.style.background = sw.hex;
      chip.title = 'Apply this swatch as the dashboard accent';
      chip.addEventListener('click', () => {
        if (i !== state.active) {
          state.active = i;
          state.mode = 'mono';
          saveState(); render();
        }
      });

      const hexInput = document.createElement('input');
      hexInput.type = 'text';
      hexInput.className = 'dzcl-hex';
      hexInput.value = sw.hex.toUpperCase();
      hexInput.setAttribute('aria-label', 'Swatch HEX value');
      hexInput.spellcheck = false;
      hexInput.addEventListener('change', () => commitHex(i, hexInput));
      hexInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { hexInput.blur(); }
        if (e.key === 'Escape') { hexInput.value = sw.hex.toUpperCase(); hexInput.blur(); }
      });

      const resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'dzcl-reset-sw';
      resetBtn.title = 'Reset this swatch to the ramp calculation';
      resetBtn.textContent = '\u21BA';
      resetBtn.hidden = !sw.overridden;
      resetBtn.addEventListener('click', () => {
        delete state.overrides[i];
        saveState(); render();
      });

      row.appendChild(chip);
      row.appendChild(hexInput);
      row.appendChild(resetBtn);
      els.swatches.appendChild(row);
    });
  }

  function renderPalettes() {
    els.palettes.innerHTML = '';
    PREDEFINED_PALETTES.forEach((p) => {
      const row = document.createElement('div');
      row.className = 'dzcl-pal';
      row.dataset.active = (state.mode === 'palette' && state.activePaletteId === p.id) ? 'true' : 'false';
      row.title = 'Apply palette: ' + p.name;

      const name = document.createElement('div');
      name.className = 'dzcl-pal-name';
      name.textContent = p.name;

      const sw = document.createElement('div');
      sw.className = 'dzcl-pal-swatches';
      [p.accent, p.shade1, p.shade2, p.light, p.dark].forEach((hex) => {
        const dot = document.createElement('span');
        dot.className = 'dzcl-pal-sw';
        dot.style.background = hex;
        sw.appendChild(dot);
      });

      row.appendChild(name);
      row.appendChild(sw);
      row.addEventListener('click', () => applyPalette(p));
      els.palettes.appendChild(row);
    });
  }

  function applyPalette(p) {
    state.mode = 'palette';
    state.activePaletteId = p.id;
    state.palette = {
      id: p.id, name: p.name,
      accent: p.accent, shade1: p.shade1, shade2: p.shade2
    };
    state.bgLight = p.light;
    state.bgDark = p.dark;
    const acc = rgbToHsl(hexToRgb(p.accent));
    state.h = acc.h; state.s = acc.s; state.l = acc.l;
    state.active = 0;
    state.overrides = {};
    saveState(); render();
  }

  function renderMockGrid() {
    const grid = els.mockGrid;
    if (!grid) return;
    grid.innerHTML = '';
    const n = 16;
    for (let i = 0; i < n; i++) {
      const bar = document.createElement('i');
      const h = 20 + ((i * 53) % 60);
      bar.style.height = h + '%';
      bar.style.alignSelf = 'end';
      grid.appendChild(bar);
    }
  }

  function commitHex(i, input) {
    const v = input.value.trim();
    const rgb = hexToRgb(v);
    if (!rgb) { render(); return; }
    if (i === 0) {
      const hl = rgbToHsl(rgb);
      state.h = hl.h; state.s = hl.s; state.l = hl.l;
    } else {
      state.overrides[i] = rgbToHex(rgb);
    }
    state.mode = 'mono';
    saveState(); render();
  }

  function render() {
    if (!els.panel) cacheEls();
    els.hue.value = state.h; els.hueVal.textContent = state.h + '\u00B0';
    els.sat.value = state.s; els.satVal.textContent = state.s + '%';
    els.light.value = state.l; els.lightVal.textContent = state.l + '%';
    if (els.modeTag) els.modeTag.textContent = (state.mode === 'palette') ? 'PALETTE MODE' : 'MONO MODE';
    renderSliderTracks();
    renderSwatches();
    renderPalettes();
    renderBackground();
    renderMockGrid();
    applyToPage();
  }

  // ---- Wiring -----------------------------------------------------------
  function wireUp() {
    cacheEls();
    els.toggle.addEventListener('click', togglePanel);
    els.close.addEventListener('click', closePanel);
    els.reset.addEventListener('click', () => {
      state = Object.assign({}, DEFAULT_STATE, { overrides: {} });
      saveState(); render();
    });
    els.copy.addEventListener('click', () => {
      const colors = [
        state.mode === 'palette' ? state.palette.accent : activeSwatch().hex,
        state.mode === 'palette' ? state.palette.shade1 : currentSwatches()[(state.active + 1) % 5].hex,
        state.mode === 'palette' ? state.palette.shade2 : currentSwatches()[(state.active + 2) % 5].hex,
        state.bgLight, state.bgDark
      ].map((h) => h.toUpperCase());
      const text = colors.join(' \u00B7 ');
      navigator.clipboard && navigator.clipboard.writeText(text).then(() => {
        const orig = els.copy.textContent;
        els.copy.textContent = 'Copied';
        setTimeout(() => { els.copy.textContent = orig; }, 1200);
      }).catch(() => {});
    });
    els.hue.addEventListener('input', () => { state.h = +els.hue.value; state.mode = 'mono'; saveState(); render(); });
    els.sat.addEventListener('input', () => { state.s = +els.sat.value; state.mode = 'mono'; saveState(); render(); });
    els.light.addEventListener('input', () => { state.l = +els.light.value; state.mode = 'mono'; saveState(); render(); });

    els.bgTabLight.addEventListener('click', () => { state.bgMode = 'light'; render(); });
    els.bgTabDark.addEventListener('click',  () => { state.bgMode = 'dark';  render(); });

    els.bgHue.addEventListener('input', () => {
      const cur = rgbToHsl(hexToRgb(currentBgHex()) || hexToRgb('#FAFAFA'));
      const rgb = hslToRgb(+els.bgHue.value, cur.s, cur.l);
      setCurrentBgHex(rgbToHex(rgb));
      saveState(); renderBackground(); applyToPage();
    });
    els.bgSat.addEventListener('input', () => {
      const cur = rgbToHsl(hexToRgb(currentBgHex()) || hexToRgb('#FAFAFA'));
      const rgb = hslToRgb(cur.h, +els.bgSat.value, cur.l);
      setCurrentBgHex(rgbToHex(rgb));
      saveState(); renderBackground(); applyToPage();
    });
    els.bgLight.addEventListener('input', () => {
      const cur = rgbToHsl(hexToRgb(currentBgHex()) || hexToRgb('#FAFAFA'));
      const rgb = hslToRgb(cur.h, cur.s, +els.bgLight.value);
      setCurrentBgHex(rgbToHex(rgb));
      saveState(); renderBackground(); applyToPage();
    });

    els.bgHex.addEventListener('change', () => {
      const rgb = hexToRgb(els.bgHex.value.trim());
      if (!rgb) { render(); return; }
      setCurrentBgHex(rgbToHex(rgb));
      saveState(); render();
    });
    els.bgHex.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') els.bgHex.blur();
      if (e.key === 'Escape') { els.bgHex.value = currentBgHex().toUpperCase(); els.bgHex.blur(); }
    });
  }
  function togglePanel() {
    const open = els.panel.hasAttribute('hidden');
    if (open) { els.panel.removeAttribute('hidden'); render(); }
    else { closePanel(); }
  }
  function closePanel() { els.panel.setAttribute('hidden', ''); }

  // ---- Boot -------------------------------------------------------------
  function boot() {
    injectPanel();
    applyToPage();
    if (document.readyState === 'complete') {
      rescanLoop();
    } else {
      window.addEventListener('load', rescanLoop);
    }
    let scanTimer = null;
    const debouncedScan = () => {
      if (scanTimer) return;
      scanTimer = setTimeout(() => { scanTimer = null; scanAndOverride(); }, 200);
    };
    const mo = new MutationObserver(debouncedScan);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'], subtree: true, childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // ---- Theme toggle (dark/light mode) ------------------------------------
  (function () {
    const KEY = 'dz-theme';
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('.material-symbols-outlined');

    function apply(theme) {
      const isDark = theme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
      try { localStorage.setItem(KEY, theme); } catch (e) {}
      if (typeof applyToPage === 'function') applyToPage();
    }

    btn.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      apply(next);
    });

    const isDark = document.documentElement.classList.contains('dark');
    if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
  })();
})();