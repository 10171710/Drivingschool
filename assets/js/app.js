(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || (localStorage.getItem('rw_dark') === 'true' ? 'dark' : null);
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  function toggleTheme() {
    root.classList.toggle('dark');
    var isDark = root.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    localStorage.setItem('rw_dark', String(isDark));
    updateThemeIcons();
  }
  function updateThemeIcons() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const isDark = root.classList.contains('dark');
      btn.setAttribute('aria-pressed', isDark);
      btn.querySelectorAll('[data-icon-sun]').forEach(i => i.classList.toggle('hidden', !isDark));
      btn.querySelectorAll('[data-icon-moon]').forEach(i => i.classList.toggle('hidden', isDark));
    });
  }

  const savedDir = localStorage.getItem('dir') || 'ltr';
  root.setAttribute('dir', savedDir);
  root.setAttribute('lang', savedDir === 'rtl' ? 'ar' : 'en');

  function fixPeriods() {
    const isRtl = root.getAttribute('dir') === 'rtl';
    if (isRtl) {
      const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK']);
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function(t) {
        if (skip.has(t.parentElement.tagName)) return;
        if (!t.textContent.endsWith('.')) return;
        if (t.parentElement.classList && t.parentElement.classList.contains('period-fix')) return;
        if (t.parentElement.closest('.period-fix')) return;
        var span = document.createElement('span');
        span.className = 'period-fix';
        span.textContent = '.';
        t.parentNode.insertBefore(span, t.nextSibling);
        t.textContent = t.textContent.slice(0, -1);
      });
    } else {
      document.querySelectorAll('.period-fix').forEach(function(el) {
        var prev = el.previousSibling;
        if (prev && prev.nodeType === Node.TEXT_NODE) {
          prev.textContent = prev.textContent + '.';
        }
        el.remove();
      });
    }
  }

  function toggleDir() {
    const next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    root.setAttribute('dir', next);
    root.setAttribute('lang', next === 'rtl' ? 'ar' : 'en');
    localStorage.setItem('dir', next);
    document.querySelectorAll('[data-dir-toggle]').forEach(b => {
      b.innerHTML = next === 'ltr' ? '<span class="text-[10px] font-bold tracking-wide">RTL</span>' : '<span class="text-[10px] font-bold tracking-wide">LTR</span>';
      b.setAttribute('aria-label', next === 'rtl' ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
    });
    fixPeriods();
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeIcons();
    fixPeriods();
    const currentDir = root.getAttribute('dir') || 'ltr';
    if (currentDir === 'rtl') {
      document.querySelectorAll('[data-dir-toggle]').forEach(b => {
        b.innerHTML = '<span class="text-[10px] font-bold tracking-wide">LTR</span>';
        b.setAttribute('aria-label', 'Switch to left-to-right layout');
      });
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', toggleTheme));
    document.querySelectorAll('[data-dir-toggle]').forEach(b => b.addEventListener('click', toggleDir));

    // Mobile nav
    const menuBtn = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!open));
      });
    }

    // Sidebar mobile toggle
    const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }

    // Dropdown
    document.querySelectorAll('[data-dropdown-toggle]').forEach(btn => {
      const panel = document.getElementById(btn.getAttribute('data-dropdown-toggle'));
      if (!panel) return;
      btn.addEventListener('click', (e) => { e.stopPropagation(); panel.classList.toggle('hidden'); });
      document.addEventListener('click', () => panel.classList.add('hidden'));
      panel.addEventListener('click', (e) => e.stopPropagation());
    });

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .container-animate').forEach(el => io.observe(el));

    // Route-line progress fills
    document.querySelectorAll('[data-progress]').forEach(el => {
      const pct = Math.max(0, Math.min(100, parseFloat(el.getAttribute('data-progress')) || 0));
      const fill = document.createElement('div');
      fill.className = 'route-fill';
      fill.style.width = '0%';
      el.appendChild(fill);
      requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = pct + '%'; }));
    });

    // FAQ accordions
    document.querySelectorAll('[data-accordion-trigger]').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        if (panel) panel.classList.toggle('hidden', isOpen);
        const icon = btn.querySelector('[data-accordion-icon]');
        if (icon) icon.classList.toggle('rotate-45', !isOpen);
      });
    });

    // Tabs
    document.querySelectorAll('[data-tabs]').forEach(group => {
      const buttons = group.querySelectorAll('[data-tab]');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tab');
          buttons.forEach(b => {
            const active = b === btn;
            b.classList.toggle('neu-btn-primary', active);
            b.classList.toggle('neu-btn', !active);
            b.classList.toggle('text-white', active);
          });
          group.querySelectorAll('[data-tab-panel]').forEach(p => {
            p.classList.toggle('hidden', p.getAttribute('data-tab-panel') !== target);
          });
        });
      });
    });

    // Animated counter
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString() + suffix;
      }, 30);
    }
    document.querySelectorAll('[data-count]').forEach(el => {
      const counterIo = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterIo.unobserve(e.target); } });
      }, { threshold: 0.5 });
      counterIo.observe(el);
    });

    // Back to top
    const btt = document.querySelector('.back-to-top');
    if (btt) {
      window.addEventListener('scroll', () => {
        btt.classList.toggle('show', window.scrollY > 400);
      }, { passive: true });
      btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Notification panel toggle
    document.querySelectorAll('[data-notif-toggle]').forEach(btn => {
      const panel = btn.querySelector('.notif-panel');
      if (!panel) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('hidden');
      });
      document.addEventListener('click', () => panel.classList.add('hidden'));
    });

    // Dashboard sidebar active state
    document.querySelectorAll('.admin-sidebar .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.admin-sidebar .nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Skill bar animation
    document.querySelectorAll('[data-skill]').forEach(el => {
      const pct = Math.max(0, Math.min(100, parseFloat(el.getAttribute('data-skill')) || 0));
      const skillIo = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            el.style.width = '0%';
            requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = pct + '%'; }));
            skillIo.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      skillIo.observe(el);
    });

    // Progress ring animation
    document.querySelectorAll('.progress-ring .ring-fill').forEach(ring => {
      const circumference = 2 * Math.PI * parseFloat(ring.getAttribute('r'));
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = circumference;
      const ringIo = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const pct = parseFloat(ring.getAttribute('data-pct')) || 0;
            const offset = circumference - (pct / 100) * circumference;
            requestAnimationFrame(() => requestAnimationFrame(() => { ring.style.strokeDashoffset = offset; }));
            ringIo.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      ringIo.observe(ring);
    });

    // Mini calendar
    document.querySelectorAll('[data-mini-cal]').forEach(cal => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const today = now.getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const lessons = (cal.getAttribute('data-lessons') || '').split(',').map(Number).filter(n => !isNaN(n));
      const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
      let html = days.map(d => '<div class="cal-head">' + d + '</div>').join('');
      for (let i = 0; i < firstDay; i++) html += '<div class="cal-day empty"></div>';
      for (let d = 1; d <= daysInMonth; d++) {
        const cls = d === today ? 'today' : lessons.includes(d) ? 'has-lesson' : '';
        html += '<div class="cal-day ' + cls + '">' + d + '</div>';
      }
      cal.innerHTML = html;
    });

    // Mock test functionality
    document.querySelectorAll('[data-mock-test]').forEach(btn => {
      btn.addEventListener('click', () => {
        const testId = btn.getAttribute('data-mock-test');
        const panel = document.getElementById(testId);
        if (panel) {
          panel.classList.toggle('hidden');
          if (!panel.classList.contains('hidden')) {
            startQuiz(panel);
          }
        }
      });
    });

    function startQuiz(panel) {
      const questions = [
        { q: 'When approaching a yellow traffic light, you should:', opts: ['Speed up to beat the red', 'Slow down and prepare to stop', 'Maintain your speed', 'Honk your horn'], correct: 1 },
        { q: 'What is the minimum following distance in dry conditions?', opts: ['1 second', '2 seconds', '3 seconds', '5 seconds'], correct: 1 },
        { q: 'When merging onto a highway, you should:', opts: ['Enter at any speed', 'Match highway speed in the acceleration lane', 'Stop at the end of the on-ramp', 'Use the emergency lane'], correct: 1 },
        { q: 'What does a solid white line on the road mean?', opts: ['You may cross freely', 'Lane changes discouraged', 'No stopping allowed', 'Pedestrian crossing'], correct: 1 },
        { q: 'Before parallel parking, you should first:', opts: ['Turn on hazard lights', 'Check mirrors and blind spots', 'Open your door', 'Sound the horn'], correct: 1 }
      ];
      const state = { current: 0, score: 0, answers: [] };
      function renderQuestion() {
        if (state.current >= questions.length) {
          const pct = Math.round((state.score / questions.length) * 100);
          panel.innerHTML = '<div class="text-center p-6">' +
            '<div class="stat-mono text-4xl font-bold ' + (pct >= 70 ? 'text-route-700' : 'text-clay') + '">' + pct + '%</div>' +
            '<p class="text-sm mt-2 text-ink/60 dark:text-paper/60">You got ' + state.score + ' out of ' + questions.length + ' correct</p>' +
            '<button onclick="location.reload()" class="neu-btn-primary neu-btn mt-4">Retake Quiz</button></div>';
          return;
        }
        const q = questions[state.current];
        let html = '<div class="p-5">' +
          '<div class="flex items-center justify-between mb-4">' +
          '<span class="neu-badge"><span class="dot bg-signal"></span>Question ' + (state.current + 1) + ' of ' + questions.length + '</span>' +
          '<div class="skill-bar-track w-32"><div class="skill-bar-fill bg-route" style="width:' + ((state.current / questions.length) * 100) + '%"></div></div>' +
          '</div>' +
          '<p class="font-display font-bold text-lg mb-4">' + q.q + '</p>' +
          '<div class="space-y-3">';
        q.opts.forEach((opt, i) => {
          html += '<button class="quiz-opt w-full text-left neu-btn justify-start p-3" data-idx="' + i + '">' +
            '<span class="w-7 h-7 rounded-full neu-inset flex items-center justify-center text-xs font-bold shrink-0">' + String.fromCharCode(65 + i) + '</span>' +
            '<span>' + opt + '</span></button>';
        });
        html += '</div></div>';
        panel.innerHTML = html;
        panel.querySelectorAll('.quiz-opt').forEach(optBtn => {
          optBtn.addEventListener('click', () => {
            const idx = parseInt(optBtn.getAttribute('data-idx'));
            const isCorrect = idx === q.correct;
            if (isCorrect) state.score++;
            state.answers.push({ q: state.current, correct: isCorrect });
            state.current++;
            renderQuestion();
          });
        });
      }
      renderQuestion();
    }

    // Schedule booking form
    document.querySelectorAll('[data-booking-form]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn.textContent;
        btn.textContent = 'Booking...';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Booked!';
          btn.classList.remove('neu-btn-primary');
          btn.classList.add('neu-btn-route');
          setTimeout(() => {
            btn.textContent = origText;
            btn.disabled = false;
            btn.classList.add('neu-btn-primary');
            btn.classList.remove('neu-btn-route');
          }, 2000);
        }, 1000);
      });
    });

    // Chart bar hover tooltip
    document.querySelectorAll('.chart-bar .bar').forEach(bar => {
      bar.addEventListener('mouseenter', () => {
        const val = bar.getAttribute('data-value');
        if (!val) return;
        const tip = document.createElement('div');
        tip.className = 'absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold neu-badge whitespace-nowrap';
        tip.textContent = val;
        bar.style.position = 'relative';
        bar.appendChild(tip);
      });
      bar.addEventListener('mouseleave', () => {
        const tip = bar.querySelector('.absolute');
        if (tip) tip.remove();
      });
    });

  });

  // Newsletter subscribe popup
  function ensureSubscribePopup() {
    let popup = document.getElementById('subscribe-popup');
    if (popup) return popup;
    popup = document.createElement('div');
    popup.id = 'subscribe-popup';
    popup.className = 'hidden fixed inset-0 z-[9999] grid place-items-center bg-ink/60 backdrop-blur-sm px-5';
    popup.innerHTML = `
      <div class="bg-paper dark:bg-ink rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
        <button type="button" data-popup-close class="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-ink/10 dark:hover:bg-paper/10 grid place-items-center text-ink/50 dark:text-paper/50" aria-label="Close">&times;</button>
        <div class="w-14 h-14 rounded-full bg-signal/15 grid place-items-center mx-auto mb-4">
          <svg class="w-7 h-7 text-signal" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 class="font-display font-bold text-xl text-ink dark:text-paper mb-2">Thanks for subscribing!</h3>
        <p data-popup-message class="text-sm text-ink/60 dark:text-paper/60 mb-5">You're on the list — watch your inbox for pass-rate tips and new course dates.</p>
        <button type="button" data-popup-close class="bg-signal hover:bg-signal-600 text-ink font-semibold text-sm px-6 py-2.5 rounded-full transition-colors">Got it</button>
      </div>`;
    document.body.appendChild(popup);
    popup.addEventListener('click', (e) => {
      if (e.target === popup || e.target.closest('[data-popup-close]')) {
        popup.classList.add('hidden');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popup.classList.contains('hidden')) popup.classList.add('hidden');
    });
    return popup;
  }

  document.querySelectorAll('input#footer-email').forEach((input) => {
    const form = input.closest('form');
    if (!form || form.dataset.subscribeBound) return;
    form.dataset.subscribeBound = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
      const popup = ensureSubscribePopup();
      const msg = popup.querySelector('[data-popup-message]');
      if (msg) msg.textContent = `We've sent a confirmation to ${input.value}. Watch your inbox for pass-rate tips and new course dates.`;
      popup.classList.remove('hidden');
      form.reset();
    });
  });
// Legal modals (Privacy Policy / Terms of Service)
  const legalContent = {
    privacy: {
      title: 'Privacy Policy',
      body: '<p class="mb-4">Last updated: September 2026</p><p class="mb-4">RouteWise ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our driving-school services.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Information We Collect</h4><ul class="list-disc pl-5 space-y-1 text-ink/70 dark:text-paper/70 mb-4"><li>Name, email, phone number and address when you register or book a lesson.</li><li>Payment details processed securely through our payment provider — we never store card numbers.</li><li>Lesson hours, progress data and instructor feedback recorded during your training.</li><li>Usage data (pages visited, device type) collected automatically via cookies.</li></ul><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">How We Use Your Information</h4><ul class="list-disc pl-5 space-y-1 text-ink/70 dark:text-paper/70 mb-4"><li>To schedule and deliver driving lessons and track your progress.</li><li>To send booking confirmations, reminders and course updates.</li><li>To improve our website, curriculum and student experience.</li><li>To comply with legal obligations and resolve disputes.</li></ul><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Data Sharing</h4><p class="mb-4">We do not sell your personal data. We share information only with trusted service providers (payment processing, email delivery) bound by confidentiality agreements, and when required by law.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Your Rights</h4><p class="mb-4">You may request access to, correction of, or deletion of your personal data at any time by emailing <span class="text-signal">privacy@routewise.com</span>. We will respond within 30 days.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Contact</h4><p>For questions about this policy, contact us at <span class="text-signal">privacy@routewise.com</span>.</p>'
    },
    terms: {
      title: 'Terms of Service',
      body: '<p class="mb-4">Last updated: September 2026</p><p class="mb-4">By accessing the RouteWise website and booking our driving-school services, you agree to these Terms of Service.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Eligibility</h4><p class="mb-4">You must be at least 15 years old to enrol in a RouteWise course. Learner\'s permit applicants must meet the minimum age and documentation requirements of their state or country.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Booking &amp; Payment</h4><ul class="list-disc pl-5 space-y-1 text-ink/70 dark:text-paper/70 mb-4"><li>Lessons are confirmed only after payment is received in full.</li><li>Cancellations made 24+ hours before the session receive a full refund.</li><li>Late cancellations (under 24 hours) are non-refundable but may be rescheduled once.</li><li>No-shows are charged in full and forfeit the session.</li></ul><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Lesson Conduct</h4><p class="mb-4">Students must hold a valid learner\'s permit (where applicable) and follow all instructor directions. RouteWise reserves the right to suspend a student who behaves unsafely or disruptively, without refund.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Dashboard &amp; Data</h4><p class="mb-4">Your learning dashboard, including logged hours and instructor feedback, is provided for informational purposes only. It does not constitute a guarantee of licence issuance — final testing is governed by your local licensing authority.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Limitation of Liability</h4><p class="mb-4">RouteWise\'s total liability for any claim shall not exceed the amount paid for the specific lesson or course giving rise to the claim. We are not liable for indirect, incidental or consequential damages.</p><h4 class="font-display font-semibold text-ink dark:text-paper mt-6 mb-2">Contact</h4><p>For questions about these terms, contact us at <span class="text-signal">legal@routewise.com</span>.</p>'
    }
  };

  function ensureLegalModal() {
    let modal = document.getElementById('legal-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'legal-modal';
    modal.className = 'hidden fixed inset-0 z-[9999] grid place-items-center bg-ink/60 backdrop-blur-sm p-5';
    modal.innerHTML = '<div class="bg-paper dark:bg-ink rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col relative"><div class="flex items-center justify-between px-8 pt-6 pb-4 border-b border-ink/10 dark:border-paper/10 shrink-0"><h2 id="legal-title" class="font-display font-semibold text-xl text-ink dark:text-paper"></h2><button type="button" data-legal-close class="w-8 h-8 rounded-full hover:bg-ink/10 dark:hover:bg-paper/10 grid place-items-center text-ink/50 dark:text-paper/50 shrink-0" aria-label="Close">&times;</button></div><div id="legal-body" class="px-8 py-6 overflow-y-auto text-sm text-ink/70 dark:text-paper/70 leading-relaxed"></div><div class="px-8 py-4 border-t border-ink/10 dark:border-paper/10 shrink-0"><button type="button" data-legal-close class="bg-signal hover:bg-signal-600 text-ink font-semibold text-sm px-6 py-2.5 rounded-full transition-colors">Got it</button></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('[data-legal-close]')) modal.classList.add('hidden'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) modal.classList.add('hidden'); });
    return modal;
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('a[data-legal]');
    if (!link) return;
    e.preventDefault();
    const key = link.getAttribute('data-legal');
    const content = legalContent[key];
    if (!content) return;
    const modal = ensureLegalModal();
    modal.querySelector('#legal-title').textContent = content.title;
    modal.querySelector('#legal-body').innerHTML = content.body;
    modal.classList.remove('hidden');
  });
})();
