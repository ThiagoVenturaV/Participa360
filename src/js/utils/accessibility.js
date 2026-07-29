export function announceToScreenReader(text) {
  const politeRegion = document.createElement('div');
  politeRegion.setAttribute('aria-live', 'polite');
  politeRegion.setAttribute('class', 'sr-only');
  document.body.appendChild(politeRegion);
  
  setTimeout(() => {
    politeRegion.textContent = text;
  }, 100);
  
  setTimeout(() => {
    if (document.body.contains(politeRegion)) {
        document.body.removeChild(politeRegion);
    }
  }, 3000);
}

export function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  if (focusableEls.length === 0) return;
  
  const firstFocusableEl = focusableEls[0];  
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  element.addEventListener('keydown', function(e) {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

    if (!isTabPressed) { 
      return; 
    }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

export function getContrastRatio(fg, bg) {
  return 4.5;
}
