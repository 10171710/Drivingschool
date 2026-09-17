(() => {
  'use strict';

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function isActive(href) {
    return currentPage() === href.split('/').pop();
  }

  function link(href, label) {
    const active = isActive(href);
    return `<a href="${href}" class="${active ? 'font-semibold text-paper' : 'text-paper/60 hover:text-paper'} transition-colors">${label}</a>`;
  }

  function mobileLink(href, label) {
    const active = isActive(href);
    return `<a href="${href}" class="block text-paper/80 hover:text-paper${active ? ' font-semibold' : ''}">${label}</a>`;
  }

  function dropdownItem(href, label) {
    const active = isActive(href);
    return `<a href="${href}" class="block px-3 py-2 rounded-lg hover:bg-paper/10 text-sm text-paper/80${active ? ' font-semibold' : ''}">${label}</a>`;
  }

  function chevron() {
    return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;
  }

  function sunIcon() {
    return `<svg data-icon-sun class="w-4 h-4 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
  }

  function moonIcon() {
    return `<svg data-icon-moon class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;
  }

  const homeActive = isActive('index.html') || isActive('home-driving-school.html');

  const html = `
  <header class="fixed top-0 left-0 right-0 z-40 bg-ink backdrop-blur border-b border-paper/10 transition-shadow" style="background:#1a1d23;">
    <div class="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between py-2">
      <a href="index.html" class="flex items-center gap-2 shrink-0">
        <span class="w-8 h-8 rounded-md bg-white grid place-items-center">
          <span class="w-2 h-2 rounded-full bg-signal"></span>
        </span>
        <span class="font-display font-semibold text-lg tracking-tight text-paper">RouteWise</span>
      </a>

      <nav class="hidden lg:flex items-center gap-7 text-sm" aria-label="Primary">
        <div class="relative">
          <button data-dropdown-toggle="home-menu" class="flex items-center gap-1 ${homeActive ? 'font-semibold text-paper' : 'text-paper/60 hover:text-paper'}" aria-haspopup="true">
            Home ${chevron()}
          </button>
          <div id="home-menu" class="hidden absolute top-full mt-3 w-56 bg-ink border border-paper/10 rounded-xl shadow-card p-2">
            ${dropdownItem('index.html', 'Driving School')}
            ${dropdownItem('home-driving-school.html', 'License Training')}
          </div>
        </div>
        ${link('about.html', 'About')}
        ${link('services.html', 'Services')}
        ${link('programs.html', 'Programs')}
        ${link('blog.html', 'Blog')}
        ${link('pricing.html', 'Pricing')}
        ${link('contact.html', 'Contact')}
      </nav>

      <div class="flex items-center gap-2">
        <button data-theme-toggle aria-pressed="false" class="w-9 h-9 grid place-items-center rounded-full border border-paper/20 bg-ink/80 backdrop-blur-sm hover:bg-paper/10 text-paper transition-colors" aria-label="Toggle dark mode">
          ${sunIcon()}${moonIcon()}
        </button>
        <button data-dir-toggle class="w-9 h-9 grid place-items-center rounded-full border border-paper/20 bg-ink/80 backdrop-blur-sm hover:bg-paper/10 text-paper transition-colors" aria-label="Toggle Arabic/RTL layout"><span class="text-[10px] font-bold tracking-wide">RTL</span></button>
        <a href="login.html" class="hidden md:inline-flex items-center gap-1.5 bg-signal hover:bg-signal-600 text-ink font-semibold text-sm px-4 py-2.5 rounded-full transition-colors">Log in</a>
        <a href="contact.html" class="hidden sm:inline-flex items-center gap-1.5 bg-signal hover:bg-signal-600 text-ink font-semibold text-sm px-4 py-2.5 rounded-full transition-colors">Book a Lesson</a>
        <button data-menu-toggle aria-expanded="false" class="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-paper/20 text-paper" aria-label="Open menu">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>

    <div data-mobile-menu class="hidden lg:hidden border-t border-paper/10 px-5 py-4 space-y-3 text-sm text-paper">
      ${mobileLink('index.html', 'Driving School')}
      ${mobileLink('home-driving-school.html', 'License Training')}
      ${mobileLink('about.html', 'About')}
      ${mobileLink('services.html', 'Services')}
      ${mobileLink('programs.html', 'Programs')}
      ${mobileLink('blog.html', 'Blog')}
      ${mobileLink('pricing.html', 'Pricing')}
      ${mobileLink('contact.html', 'Contact')}
      <a href="student-dashboard.html" class="block font-semibold text-paper/80 hover:text-paper">Student login</a>
    </div>
  </header>
  <div class="content-particles" aria-hidden="true">
    <span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span>
  </div>`;

  const footerHtml = `
  <footer class="bg-ink text-paper/80 mt-16 border-t border-paper/10">
    <div class="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <a href="index.html" class="flex items-center gap-2 mb-4 shrink-0 inline-flex">
          <span class="w-9 h-9 rounded-md bg-white grid place-items-center">
            <span class="w-2.5 h-2.5 rounded-full bg-signal"></span>
          </span>
          <span class="font-display font-bold text-lg tracking-tight text-paper">RouteWise</span>
        </a>
        <p class="text-sm leading-relaxed max-w-xs text-paper/60">Government-certified driving school with dual-control vehicles, online lesson scheduling, hour tracking and student dashboard.</p>
        <div class="flex flex-wrap gap-3 mt-5">
          <a href="#" aria-label="Facebook" class="px-4 h-9 rounded-full border border-paper/20 grid items-center hover:bg-paper/10 text-paper transition-colors text-xs font-semibold">facebook</a>
          <a href="#" aria-label="Instagram" class="px-4 h-9 rounded-full border border-paper/20 grid items-center hover:bg-paper/10 text-paper transition-colors text-xs font-semibold">instagram</a>
          <a href="#" aria-label="X" class="px-4 h-9 rounded-full border border-paper/20 grid items-center hover:bg-paper/10 text-paper transition-colors text-xs font-semibold">X</a>
          <a href="#" aria-label="YouTube" class="px-4 h-9 rounded-full border border-paper/20 grid items-center hover:bg-paper/10 text-paper transition-colors text-xs font-semibold">youtube</a>
        </div>
      </div>
      <div>
        <h4 class="font-display font-semibold text-paper mb-4">Driving School</h4>
        <ul class="space-y-2.5 text-sm">
          <li><a href="index.html" class="hover:text-signal transition-colors">Home</a></li>
          <li><a href="programs.html" class="hover:text-signal transition-colors">Courses & Programs</a></li>
          <li><a href="instructors.html" class="hover:text-signal transition-colors">Instructors</a></li>
          <li><a href="vehicles.html" class="hover:text-signal transition-colors">Fleet & Vehicles</a></li>
          <li><a href="fees.html" class="hover:text-signal transition-colors">Fees & Pricing</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-display font-semibold text-paper mb-4">Portals & Links</h4>
        <ul class="space-y-2.5 text-sm">
          <li><a href="student-dashboard.html" class="hover:text-signal transition-colors">Student Portal</a></li>
          <li><a href="admin-dashboard.html" class="hover:text-signal transition-colors">Admin Dashboard</a></li>
          <li><a href="about.html" class="hover:text-signal transition-colors">About Us</a></li>
          <li><a href="blog.html" class="hover:text-signal transition-colors">Blog & Guides</a></li>
          <li><a href="contact.html" class="hover:text-signal transition-colors">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-display font-semibold text-paper mb-4">Stay Updated</h4>
        <p class="text-sm mb-3 text-paper/60">Driving tips, license road-test updates, and new schedule openings.</p>
        <form onsubmit="event.preventDefault(); document.getElementById('subscribe-popup').classList.remove('hidden');" class="flex gap-2">
          <label for="footer-email-input" class="sr-only">Email address</label>
          <input id="footer-email-input" type="email" required placeholder="you@example.com" class="min-w-0 flex-1 rounded-full bg-paper/10 border border-paper/20 px-4 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-signal">
          <button type="submit" class="bg-signal text-ink font-semibold text-sm px-4 py-2.5 rounded-full shrink-0 hover:bg-signal-600 transition-colors">Join</button>
        </form>
      </div>
    </div>
    <div class="route-line is-progress mx-5 lg:mx-8 opacity-30"></div>
    <div class="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-paper/50">
      <p>&copy; 2026 RouteWise Driving School. All rights reserved.</p>
      <div class="flex gap-5">
        <a href="#" class="hover:text-signal transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-signal transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-signal transition-colors">Security</a>
      </div>
    </div>
  </footer>

  <div id="subscribe-popup" class="hidden fixed inset-0 z-[9999] grid place-items-center bg-ink/60 backdrop-blur-sm" onclick="if(event.target===this)this.classList.add('hidden')">
    <div class="bg-paper dark:bg-ink rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-5 text-center relative">
      <button onclick="document.getElementById('subscribe-popup').classList.add('hidden')" class="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-ink/10 dark:hover:bg-paper/10 grid place-items-center text-ink/50 dark:text-paper/50" aria-label="Close">&times;</button>
      <div class="w-14 h-14 rounded-full bg-signal/15 grid place-items-center mx-auto mb-4">
        <svg class="w-7 h-7 text-signal" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 class="font-display font-bold text-xl text-ink dark:text-paper mb-2">Thank you for subscribing!</h3>
      <p class="text-sm text-ink/60 dark:text-paper/60 mb-5">You'll receive driving tips, license updates, and new schedule openings in your inbox.</p>
      <button onclick="document.getElementById('subscribe-popup').classList.add('hidden')" class="bg-signal hover:bg-signal-600 text-ink font-semibold text-sm px-6 py-2.5 rounded-full transition-colors">Got it</button>
    </div>
  </div>`;

  function mount() {
    const navEl = document.getElementById('navbar-mount');
    if (navEl) navEl.innerHTML = '<div class="h-[52px] bg-ink" style="background:#1a1d23;"></div>' + html;

    const footerEl = document.getElementById('footer-mount');
    if (footerEl) footerEl.innerHTML = footerHtml;

    // Scroll listener for sticky header
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header.sticky, .admin-topbar');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
