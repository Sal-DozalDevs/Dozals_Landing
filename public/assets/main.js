/* Dozals — shared site behavior (no dependencies) */
(function () {
  'use strict';

  var state = { observers: [] };

  function disconnect() {
    state.observers.forEach(function (o) { if (o && o.disconnect) o.disconnect(); });
    state.observers = [];
  }

  function init() {
    disconnect();

    /* Staggered reveal cascade */
    document.querySelectorAll('.grid-2, .grid-3, .grid-4, .steps, .plans, .hero__left, .stagger')
      .forEach(function (group) {
        group.querySelectorAll('.reveal').forEach(function (el, i) {
          el.style.setProperty('--i', Math.min(i, 6));
        });
      });

    /* Reveal on scroll */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
      state.observers.push(io);
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }

    /* Nav: scrolled state + mobile toggle */
    var nav = document.querySelector('.nav');
    if (nav) {
      var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      state.observers.push({ disconnect: function () { window.removeEventListener('scroll', onScroll); } });

      var toggle = nav.querySelector('.nav__toggle');
      if (toggle) {
        toggle.addEventListener('click', function () {
          var open = nav.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        nav.querySelectorAll('.nav__links a').forEach(function (a) {
          a.addEventListener('click', function () { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); });
        });
      }
    }

    /* Active nav link */
    var path = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav__links a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === path) { a.classList.add('is-active'); a.setAttribute('aria-current', 'page'); }
    });

    /* Demo form */
    var form = document.querySelector('form[data-demo]');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = document.querySelector('#form-ok');
        if (ok) { form.style.display = 'none'; ok.hidden = false; ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      });
    }
  }

  window.Dozals = { init: init, state: state };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();