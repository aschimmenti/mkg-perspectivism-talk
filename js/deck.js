/* Tiny dependency-free deck engine.
   - slides are <section class="slide" data-steps="N" data-label="…">
   - inside a slide, [data-from="a"] [data-until="b"] elements are shown while a <= step <= b
   - [data-goto-step="k"] buttons jump to a step
   - keys: → / Space next · ← back · N notes · A auto-advance · F fullscreen · ? help
   - URL: #2.3 = slide 2, step 3 · ?auto=20 = auto-advance, 20 s per slide */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const slides = $$('.slide');
  const stage = $('#stage');
  const dotsEl = $('#dots');
  const notesEl = $('#notes');
  const notesBody = $('#notes-body');
  const helpEl = $('#help');
  const bar = $('#bar');
  const live = $('#live');
  const params = new URLSearchParams(location.search);

  let i = 0;
  let step = 0;
  let timer = null;
  let auto = params.has('auto');
  const autoSecs = Math.max(5, parseInt(params.get('auto'), 10) || 60);

  const maxStep = n => parseInt(slides[n].dataset.steps || '0', 10);

  function fit() {
    stage.style.setProperty('--scale', Math.min(innerWidth / 1600, innerHeight / 900));
  }

  function schedule() {
    clearTimeout(timer);
    bar.style.transition = 'none';
    bar.style.width = '0';
    if (!auto) return;
    if (i === slides.length - 1 && step === maxStep(i)) { auto = false; return; }
    const t = (parseInt(slides[i].dataset.secs, 10) || autoSecs) / (maxStep(i) + 1);
    void bar.offsetWidth;
    bar.style.transition = `width ${t}s linear`;
    bar.style.width = '100%';
    timer = setTimeout(next, t * 1000);
  }

  function paint() {
    slides.forEach((el, n) => el.classList.toggle('active', n === i));
    const el = slides[i];
    el.dataset.step = step;
    $$('[data-from],[data-until]', el).forEach(x => {
      const from = x.dataset.from === undefined ? 0 : +x.dataset.from;
      const until = x.dataset.until === undefined ? Infinity : +x.dataset.until;
      x.classList.toggle('on', step >= from && step <= until);
    });
    $$('[data-goto-step]', el).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.gotoStep === step)));
    $$('.dot').forEach((d, n) => d.setAttribute('aria-current', String(n === i)));
    const note = $('.note', el);
    notesBody.innerHTML = note ? note.innerHTML : '';
    live.textContent = (el.dataset.label || '') + (step ? `, step ${step}` : '');
    history.replaceState(null, '', location.pathname + location.search + '#' + i + (step ? '.' + step : ''));
    schedule();
  }

  function go(n, st = 0) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    step = Math.max(0, Math.min(maxStep(i), st));
    paint();
  }
  function next() {
    if (step < maxStep(i)) { step++; paint(); }
    else if (i < slides.length - 1) go(i + 1, 0);
  }
  function prev() {
    if (step > 0) { step--; paint(); }
    else if (i > 0) go(i - 1, maxStep(i - 1));
  }

  const txtBtn = $('#txt');
  function toggleText() {
    document.body.classList.toggle('notext');
    txtBtn.setAttribute('aria-pressed', String(!document.body.classList.contains('notext')));
  }
  txtBtn.addEventListener('click', () => { toggleText(); txtBtn.blur(); });

  // dots
  slides.forEach((s, n) => {
    const b = document.createElement('button');
    b.className = 'dot';
    b.textContent = s.dataset.label || String(n);
    b.addEventListener('click', () => { go(n, 0); b.blur(); });
    dotsEl.appendChild(b);
  });

  // clicks
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-goto-step]');
    if (b) { step = Math.min(+b.dataset.gotoStep, maxStep(i)); paint(); b.blur(); }
  });
  $('#next').addEventListener('click', e => { next(); e.currentTarget.blur(); });
  $('#prev').addEventListener('click', e => { prev(); e.currentTarget.blur(); });

  // keyboard
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const onBtn = e.target.closest && e.target.closest('button, a');
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': next(); break;
      case ' ': case 'Enter': if (onBtn) return; next(); break;
      case 'ArrowLeft': case 'PageUp': case 'Backspace': prev(); break;
      case 'Home': go(0, 0); break;
      case 'End': go(slides.length - 1, 0); break;
      case 'n': case 'N': notesEl.hidden = !notesEl.hidden; break;
      case 'a': case 'A': auto = !auto; schedule(); break;
      case 'f': case 'F':
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
        break;
      case 't': case 'T': toggleText(); break;
      case '?': helpEl.hidden = !helpEl.hidden; break;
      case 'Escape': helpEl.hidden = true; notesEl.hidden = true; break;
      default: return;
    }
    e.preventDefault();
  });
  helpEl.addEventListener('click', () => { helpEl.hidden = true; });

  // touch swipe
  let x0 = null;
  stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  });

  // hide the chrome when idle
  let idle;
  const wake = () => {
    document.body.classList.remove('idle');
    clearTimeout(idle);
    idle = setTimeout(() => document.body.classList.add('idle'), 2500);
  };
  ['mousemove', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, wake, { passive: true }));

  addEventListener('resize', fit);

  // start
  const m = location.hash.match(/^#(\d+)(?:\.(\d+))?$/);
  fit();
  wake();
  if (m) go(+m[1], +(m[2] || 0)); else go(0, 0);
})();
