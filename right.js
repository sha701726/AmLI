document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert('Right-click disabled');
});

// Viewport-based reveal animations for Services section
(function () {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback: make all reveal elements visible
    var fallbackEls = document.querySelectorAll('.reveal');
    for (var i = 0; i < fallbackEls.length; i++) {
      fallbackEls[i].classList.add('in-view');
    }
    return;
  }

  function onIntersection(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Once revealed, we can unobserve to avoid retrigger
        observer.unobserve(entry.target);
      }
    });
  }

  function initReveal() {
    // Auto-tag common content blocks without explicit .reveal
    var autoSelectors = [
      'section',
      'header',
      'footer',
      '.container',
      '.max-w-4xl',
      '.max-w-6xl',
      '.grid > *',
      '.space-y-6 > *',
      '.space-y-8 > *',
      '.space-y-12 > *',
      '.card',
      '.shadow',
      '.shadow-lg',
      '.rounded-lg',
      '.bg-white',
      '.bg-gray-50'
    ];

    try {
      autoSelectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
          }
        });
      });
    } catch (_) {}

    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(onIntersection, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    });

    revealElements.forEach(function (el, index) {
      // Stagger via transition-delay for nicer cascade
      var baseDelayMs = 60;
      var groupSize = 4;
      el.style.transitionDelay = (index % groupSize) * baseDelayMs + 'ms';
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();