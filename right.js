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

// Anti-download and anti-scraping protection
(function() {
    'use strict';
    
    // Detect and block common download tools
    var suspiciousUserAgents = [
        'wget', 'curl', 'python', 'requests', 'urllib', 'scrapy', 'beautifulsoup',
        'selenium', 'phantomjs', 'headless', 'bot', 'crawler', 'spider',
        'httrack', 'webcopier', 'offline', 'downloader', 'grabber'
    ];
    
    var userAgent = navigator.userAgent.toLowerCase();
    var isSuspicious = suspiciousUserAgents.some(function(agent) {
        return userAgent.includes(agent);
    });
    
    if (isSuspicious) {
        document.body.innerHTML = '<h1>Access Denied</h1><p>Automated access is not allowed.</p>';
        throw new Error('Access denied');
    }
    
    // Block iframe embedding (prevents some scraping methods)
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // Detect headless browsers
    if (navigator.webdriver || 
        window.phantom || 
        window._phantom || 
        window.callPhantom ||
        window.chrome && window.chrome.runtime && window.chrome.runtime.onConnect ||
        navigator.plugins.length === 0 ||
        navigator.languages.length === 0) {
        document.body.innerHTML = '<h1>Access Denied</h1><p>Headless browser detected.</p>';
        throw new Error('Headless browser detected');
    }
    
    // Anti-debugging measures
    var devtools = {
        open: false,
        orientation: null
    };
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            if (!devtools.open) {
                devtools.open = true;
                console.clear();
                console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
                console.log('%cThis is a browser feature intended for developers. Do not enter any code here.', 'color: red; font-size: 16px;');
                // Redirect or clear page
                document.body.innerHTML = '<h1>Developer Tools Detected</h1><p>Please close developer tools to continue.</p>';
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    // Disable console
    var noop = function() {};
    var methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'clear', 'count', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace'];
    methods.forEach(function(method) {
        console[method] = noop;
    });
    
    // Block common scraping libraries
    Object.defineProperty(window, 'XMLHttpRequest', {
        value: function() {
            throw new Error('XMLHttpRequest blocked');
        }
    });
    
    Object.defineProperty(window, 'fetch', {
        value: function() {
            throw new Error('Fetch API blocked');
        }
    });
    
    // Disable right-click and context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Block common keyboard shortcuts for saving
    document.addEventListener('keydown', function(e) {
        // Block Ctrl+S, Ctrl+Shift+S
        if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.shiftKey && e.key === 'S')) {
            e.preventDefault();
            return false;
        }
        // Block Ctrl+Shift+I (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Block Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable drag and drop of images and links
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable image saving
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // Block common scraping patterns
    var originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'load' && this === window) {
            // Block window load events that might be used for scraping
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    // Disable common automation tools
    Object.defineProperty(navigator, 'webdriver', {
        get: function() { return undefined; }
    });
    
    // Block iframe access
    if (window.frames && window.frames.length > 0) {
        for (var i = 0; i < window.frames.length; i++) {
            try {
                window.frames[i].document;
            } catch (e) {
                // Blocked
            }
        }
    }
    
    // Disable common developer tools shortcuts
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+K
        if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
            e.preventDefault();
            return false;
        }
    });
    
    // Block common download managers
    var blockedExtensions = ['.exe', '.zip', '.rar', '.7z', '.tar', '.gz'];
    var originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        var element = originalCreateElement.call(this, tagName);
        if (tagName.toLowerCase() === 'a') {
            Object.defineProperty(element, 'download', {
                set: function() {
                    throw new Error('Download attribute blocked');
                },
                get: function() { return undefined; }
            });
        }
        return element;
    };
    
    // Disable print functionality
    window.print = function() {
        throw new Error('Print function disabled');
    };
    
    // Block common automation frameworks
    if (window.Prototype || window.jQuery || window.$) {
        // Block if common libraries are detected (they might be used for scraping)
        setTimeout(function() {
            if (window.Prototype) delete window.Prototype;
            if (window.jQuery) delete window.jQuery;
            if (window.$) delete window.$;
        }, 1000);
    }
    
    // Add watermark to prevent screenshots
    var watermark = document.createElement('div');
    watermark.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.03) 10px,
            rgba(0,0,0,0.03) 20px
        );
        user-select: none;
    `;
    document.body.appendChild(watermark);
    
    // Block common scraping user agents
    var blockedAgents = [
        'python-requests', 'scrapy', 'beautifulsoup', 'selenium',
        'phantomjs', 'headless-chrome', 'puppeteer', 'playwright'
    ];
    
    var currentAgent = navigator.userAgent.toLowerCase();
    for (var i = 0; i < blockedAgents.length; i++) {
        if (currentAgent.includes(blockedAgents[i])) {
            document.body.innerHTML = '<h1>Access Denied</h1><p>Automated tools are not allowed.</p>';
            throw new Error('Blocked user agent');
        }
    }
    
})();

// Advanced anti-debugging and obfuscation
(function() {
    'use strict';
    
    // Anti-debugging: Detect if debugger is attached
    var startTime = new Date().getTime();
    debugger;
    var endTime = new Date().getTime();
    
    if (endTime - startTime > 100) {
        // Debugger detected, redirect or clear page
        document.body.innerHTML = '<h1>Debugging Detected</h1><p>Please disable debugging tools to continue.</p>';
        window.location.href = 'about:blank';
    }
    
    // Obfuscate function names and variables
    var _0x1a2b = ['log', 'warn', 'error', 'debug', 'info'];
    var _0x3c4d = function() {
        return Math.random().toString(36).substr(2, 9);
    };
    
    // Create fake console to confuse scrapers
    var fakeConsole = {
        log: function() { return false; },
        warn: function() { return false; },
        error: function() { return false; },
        debug: function() { return false; },
        info: function() { return false; }
    };
    
    // Override console periodically
    setInterval(function() {
        if (Math.random() > 0.5) {
            window.console = fakeConsole;
        }
    }, 1000);
    
    // Detect and block common browser automation
    var automationDetected = false;
    
    // Check for automation indicators
    if (navigator.webdriver || 
        window.phantom || 
        window._phantom || 
        window.callPhantom ||
        window.Buffer ||
        window.emit ||
        window.spawn) {
        automationDetected = true;
    }
    
    // Check for headless browser indicators
    if (navigator.plugins.length === 0 && 
        navigator.languages.length === 0 &&
        !navigator.cookieEnabled) {
        automationDetected = true;
    }
    
    // Check for missing browser features
    if (!window.chrome || 
        !window.chrome.runtime || 
        !window.chrome.runtime.onConnect) {
        automationDetected = true;
    }
    
    if (automationDetected) {
        document.body.innerHTML = '<h1>Automation Detected</h1><p>Automated access is not allowed.</p>';
        throw new Error('Automation detected');
    }
    
    // Block common scraping patterns
    var originalQuerySelector = document.querySelector;
    var originalQuerySelectorAll = document.querySelectorAll;
    
    document.querySelector = function(selector) {
        // Block common scraping selectors
        if (selector.includes('script') || 
            selector.includes('link') || 
            selector.includes('meta')) {
            throw new Error('Selector blocked');
        }
        return originalQuerySelector.call(this, selector);
    };
    
    document.querySelectorAll = function(selector) {
        // Block common scraping selectors
        if (selector.includes('script') || 
            selector.includes('link') || 
            selector.includes('meta')) {
            throw new Error('Selector blocked');
        }
        return originalQuerySelectorAll.call(this, selector);
    };
    
    // Block common DOM manipulation methods used by scrapers
    var originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    Object.defineProperty(Element.prototype, 'innerHTML', {
        get: function() {
            if (this.tagName === 'SCRIPT' || this.tagName === 'LINK') {
                throw new Error('Access denied');
            }
            return originalInnerHTML.get.call(this);
        },
        set: function(value) {
            return originalInnerHTML.set.call(this, value);
        }
    });
    
    // Block access to document.documentElement
    var originalDocumentElement = Object.getOwnPropertyDescriptor(Document.prototype, 'documentElement');
    Object.defineProperty(Document.prototype, 'documentElement', {
        get: function() {
            // Add random delay to confuse scrapers
            var delay = Math.random() * 100;
            var start = new Date().getTime();
            while (new Date().getTime() - start < delay) {
                // Busy wait
            }
            return originalDocumentElement.get.call(this);
        }
    });
    
    // Block common network requests
    var originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        // Block requests to common scraping endpoints
        if (url.includes('api') || 
            url.includes('data') || 
            url.includes('json') ||
            url.includes('xml')) {
            throw new Error('Network request blocked');
        }
        return originalOpen.call(this, method, url, async, user, password);
    };
    
    // Block fetch API
    if (window.fetch) {
        window.fetch = function() {
            throw new Error('Fetch API blocked');
        };
    }
    
    // Add random delays to confuse timing-based scrapers
    var originalSetTimeout = window.setTimeout;
    window.setTimeout = function(callback, delay) {
        var randomDelay = delay + Math.random() * 100;
        return originalSetTimeout(callback, randomDelay);
    };
    
    // Block common screenshot tools
    if (window.html2canvas || window.domtoimage) {
        delete window.html2canvas;
        delete window.domtoimage;
    }
    
    // Block common PDF generation tools
    if (window.jsPDF || window.PDFMake) {
        delete window.jsPDF;
        delete window.PDFMake;
    }
    
    // Add mouse movement detection to ensure human interaction
    var mouseMovements = 0;
    document.addEventListener('mousemove', function() {
        mouseMovements++;
    });
    
    // Check if user is actually interacting
    setTimeout(function() {
        if (mouseMovements < 5) {
            // Very few mouse movements, might be automated
            document.body.innerHTML = '<h1>Human Interaction Required</h1><p>Please interact with the page to continue.</p>';
        }
    }, 5000);
    
    // Block common browser extensions used for scraping
    var blockedExtensions = [
        'scraper', 'downloader', 'grabber', 'extractor',
        'web-scraper', 'data-miner', 'content-grabber'
    ];
    
    // Check for extension indicators
    if (window.chrome && window.chrome.runtime) {
        try {
            var extensions = window.chrome.runtime.getManifest();
            if (extensions && extensions.name) {
                var extensionName = extensions.name.toLowerCase();
                for (var i = 0; i < blockedExtensions.length; i++) {
                    if (extensionName.includes(blockedExtensions[i])) {
                        document.body.innerHTML = '<h1>Extension Blocked</h1><p>Please disable scraping extensions to continue.</p>';
                        throw new Error('Blocked extension detected');
                    }
                }
            }
        } catch (e) {
            // Extension check failed, continue
        }
    }
    
    // Add fake content to confuse scrapers
    var fakeElements = document.createElement('div');
    fakeElements.style.display = 'none';
    fakeElements.innerHTML = `
        <script>var fakeData = "This is fake data to confuse scrapers";</script>
        <link rel="stylesheet" href="fake-styles.css">
        <meta name="fake-meta" content="fake content">
    `;
    document.head.appendChild(fakeElements);
    
    // Block common scraping libraries from loading
    var blockedLibraries = [
        'jquery', 'prototype', 'mootools', 'dojo', 'yui',
        'angular', 'react', 'vue', 'backbone', 'ember'
    ];
    
    blockedLibraries.forEach(function(lib) {
        if (window[lib] || window[lib.charAt(0).toUpperCase() + lib.slice(1)]) {
            delete window[lib];
            delete window[lib.charAt(0).toUpperCase() + lib.slice(1)];
        }
    });
    
})();

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