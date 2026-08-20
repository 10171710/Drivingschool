/**
 * RouteWise Admin Sidebar & Topbar — shared component
 * Include after style.css in every admin dashboard page.
 * Expects: <aside data-dash-sidebar></aside>  and  <header data-dash-topbar></header>
 * Read page title from <body data-page-title="Overview">
 */
(function () {
  'use strict';

  /* ── icons (inline SVG strings) ── */
  var ICO = {
    grid:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    users:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    card:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    gear:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    home:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    logout:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    menu:    '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    sun:     '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:    '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    rtl:     '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ── nav items ── */
  var NAV = [
    { section: 'Main' },
    { label: 'Overview',  href: 'admin-overview.html',  icon: 'grid' },
    { label: 'Students',  href: 'admin-students.html',  icon: 'users' },
    { label: 'Schedule',  href: 'admin-schedule.html',  icon: 'calendar' },
    { label: 'Payments',  href: 'admin-payments.html',  icon: 'card' },
    { section: 'Account' },
    { label: 'Settings',  href: 'admin-settings.html',  icon: 'gear' }
  ];

  /* ── helpers ── */
  function currentPage() {
    var path = window.location.pathname.replace(/\\/g, '/');
    return path.substring(path.lastIndexOf('/') + 1);
  }

  function buildNavItems() {
    var page = currentPage();
    var html = '';
    NAV.forEach(function (item) {
      if (item.section) {
        html += '<div class="dash-sidebar-section">' + item.section + '</div>';
        return;
      }
      var active = item.href === page ? ' active' : '';
      html += '<a href="' + item.href + '" class="' + active + '">'
        + '<span class="nav-ico">' + ICO[item.icon] + '</span>'
        + item.label
        + '</a>';
    });
    return html;
  }

  /* ── build sidebar ── */
  function renderSidebar(el) {
    el.innerHTML =
      '<div class="dash-sidebar-brand">'
        + '<span class="w-10 h-10 rounded-lg bg-white grid place-items-center shrink-0"><span class="w-3 h-3 rounded-full bg-signal"></span></span>'
        + '<div><span class="font-display font-bold text-lg text-white leading-none">RouteWise</span>'
        + '<span class="text-[10px] text-white/40 font-mono uppercase tracking-wider">Admin</span></div>'
      + '</div>'
      + '<nav class="dash-sidebar-nav">' + buildNavItems() + '</nav>'
      + '<div class="dash-sidebar-footer">'
        + '<a href="../../index.html"><span class="nav-ico">' + ICO.home + '</span>Back to site</a>'
        + '<a href="#" id="rw-admin-logout"><span class="nav-ico">' + ICO.logout + '</span>Log out</a>'
      + '</div>';
  }

  /* ── build topbar ── */
  function renderTopbar(el) {
    var title = document.body.getAttribute('data-page-title') || 'Dashboard';
    el.innerHTML =
      '<div class="min-w-0 flex-1">'
          + '<h1 class="font-display font-bold text-lg leading-tight truncate">' + title + '</h1>'
          + '<p class="text-[11px] text-ink/40 dark:text-paper/40">RouteWise Admin</p>'
      + '</div>'
      + '<div class="flex items-center gap-2 shrink-0 ml-auto">'
        + '<button data-theme-toggle aria-pressed="false" class="w-9 h-9 grid place-items-center rounded-full border border-ink/15 dark:border-paper/20 hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors" aria-label="Toggle dark mode">'
          + '<span class="icon-sun hidden">' + ICO.sun + '</span>'
          + '<span class="icon-moon">' + ICO.moon + '</span>'
        + '</button>'
        + '<button data-dir-toggle class="w-9 h-9 grid place-items-center rounded-full border border-ink/15 dark:border-paper/20 hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors" aria-label="Toggle RTL">'
          + ICO.rtl
        + '</button>'
        + '<button class="dash-toggle-btn" data-dash-toggle aria-label="Toggle sidebar">'
          + ICO.menu
        + '</button>'
      + '</div>';
  }

  /* ── dark mode ── */
  function applyDark(saved) {
    var dark = saved === 'true';
    document.documentElement.classList.toggle('dark', dark);
    injectDarkOverrides(dark);
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(dark));
    var sun = btn.querySelector('.icon-sun');
    var moon = btn.querySelector('.icon-moon');
    if (sun) sun.classList.toggle('hidden', !dark);
    if (moon) moon.classList.toggle('hidden', dark);
  }

  var DARK_MAP = [
    [/text-ink\/40/,  'color', 'rgba(240,235,227,.4)'],
    [/text-ink\/50/,  'color', 'rgba(240,235,227,.5)'],
    [/text-ink\/60/,  'color', 'rgba(240,235,227,.6)'],
    [/text-ink\/70/,  'color', 'rgba(240,235,227,.7)'],
    [/(?:^|\s)text-ink(?:\s|$)/, 'color', 'rgba(240,235,227,.95)'],
    [/text-paper\/40/, 'color', 'rgba(240,235,227,.4)'],
    [/text-paper\/50/, 'color', 'rgba(240,235,227,.5)'],
    [/text-paper\/60/, 'color', 'rgba(240,235,227,.6)'],
    [/(?:^|\s)text-route(?:\s|$)/, 'color', '#0FA36B'],
    [/(?:^|\s)text-signal(?:\s|$)/, 'color', '#e8a43a'],
    [/(?:^|\s)text-clay(?:\s|$)/, 'color', '#E0563D'],
    [/(?:^|\s)text-white(?:\s|$)/, 'color', '#ffffff'],
    [/bg-ink\/5/,  'background-color', 'rgba(240,235,227,.05)'],
    [/bg-ink\/10/, 'background-color', 'rgba(240,235,227,.1)'],
    [/border-ink\/5/,  'border-color', 'rgba(240,235,227,.05)'],
    [/border-ink\/10/, 'border-color', 'rgba(240,235,227,.1)'],
    [/divide-ink\/5/,  'border-color', 'rgba(240,235,227,.05)']
  ];

  function clearDarkStyles() {
    if (window._rwDarkObs) { window._rwDarkObs.disconnect(); window._rwDarkObs = null; }
    document.querySelectorAll('[data-rw-dark]').forEach(function(el) {
      el.style.removeProperty('color');
      el.style.removeProperty('background-color');
      el.style.removeProperty('border-color');
      el.removeAttribute('data-rw-dark');
    });
    var main = document.querySelector('.dash-main');
    if (main) main.style.removeProperty('color');
  }

  function applyDarkStyles() {
    var main = document.querySelector('.dash-main');
    if (!main) return;
    main.style.setProperty('color', '#f0ebe3', 'important');
    main.setAttribute('data-rw-dark', '1');
    var els = main.querySelectorAll('*');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var c = el.className;
      if (typeof c !== 'string') continue;
      for (var j = 0; j < DARK_MAP.length; j++) {
        if (DARK_MAP[j][0].test(c)) {
          el.style.setProperty(DARK_MAP[j][1], DARK_MAP[j][2], 'important');
          el.setAttribute('data-rw-dark', '1');
          break;
        }
      }
    }
  }

  function injectDarkOverrides(dark) {
    clearDarkStyles();
    if (!dark) return;
    applyDarkStyles();
    var main = document.querySelector('.dash-main');
    if (!main) return;
    window._rwDarkObs = new MutationObserver(applyDarkStyles);
    window._rwDarkObs.observe(main, { childList: true, subtree: true });
  }

  /* ── RTL ── */
  function applyRtl(saved) {
    var rtl = saved === 'true';
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  }

  /* ── init ── */
  function init() {
    var sidebar  = document.querySelector('[data-dash-sidebar]');
    var topbar   = document.querySelector('[data-dash-topbar]');
    var overlay  = document.querySelector('[data-dash-overlay]');

    /* render */
    if (sidebar)  renderSidebar(sidebar);
    if (topbar)   renderTopbar(topbar);

    /* restore preferences */
    applyDark(localStorage.getItem('theme') === 'dark' || localStorage.getItem('rw_dark') === 'true' ? 'true' : 'false');
    applyRtl(localStorage.getItem('dir') === 'rtl' || localStorage.getItem('rw_rtl') === 'true' ? 'true' : 'false');

    /* ── sidebar toggle (mobile) ── */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-dash-toggle]');
      if (btn && sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
      }
    });

    /* ── overlay click to close ── */
    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
      });
    }

    /* ── close sidebar on nav click (mobile) ── */
    if (sidebar) {
      sidebar.addEventListener('click', function (e) {
        if (e.target.closest('.dash-sidebar-nav a') && window.innerWidth < 1024) {
          sidebar.classList.remove('open');
          if (overlay) overlay.classList.remove('open');
        }
      });
    }

    /* ── dark-mode toggle ── */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-theme-toggle]');
      if (!btn) return;
      var next = !document.documentElement.classList.contains('dark');
      localStorage.setItem('rw_dark', String(next));
      localStorage.setItem('theme', next ? 'dark' : 'light');
      applyDark(String(next));
    });

    /* ── RTL toggle ── */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-dir-toggle]');
      if (!btn) return;
      var next = document.documentElement.getAttribute('dir') !== 'rtl';
      localStorage.setItem('rw_rtl', String(next));
      localStorage.setItem('dir', next ? 'rtl' : 'ltr');
      applyRtl(String(next));
    });

    /* ── logout ── */
    document.addEventListener('click', function (e) {
      if (e.target.closest('#rw-admin-logout')) {
        e.preventDefault();
        localStorage.removeItem('rw_session');
        window.location.href = '../../login.html';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
