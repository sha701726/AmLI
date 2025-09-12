// Disable right-click context menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable copy-paste functionality
document.addEventListener('keydown', function (e) {
    // Disable Ctrl+C (Copy)
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+V (Paste)
    if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+A (Select All)
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+X (Cut)
    if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Z (Undo)
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Y (Redo)
    if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        return false;
    }
    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
});

// Disable text selection
document.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
});

// Disable drag and drop
document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
});

// Disable copy on mouse events
document.addEventListener('copy', function (e) {
    e.preventDefault();
    return false;
});

// Disable paste on mouse events
document.addEventListener('paste', function (e) {
    e.preventDefault();
    return false;
});

// Disable cut on mouse events
document.addEventListener('cut', function (e) {
    e.preventDefault();
    return false;
});

// Additional protection for mobile devices
document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

document.addEventListener('touchend', function (e) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

var lastTouchEnd = 0;

// Add CSS to prevent text selection
var style = document.createElement('style');
style.textContent = `
    * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
    }
    
    input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
    }
`;
document.head.appendChild(style);

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