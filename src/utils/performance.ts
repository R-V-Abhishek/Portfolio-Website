/**
 * Smart will-change performance optimization utility
 * Applies will-change property only during animations to improve performance
 */

interface PerformanceOptimizationOptions {
  properties?: string;
  duration?: number;
  debounce?: number;
}

const defaultOptions: Required<PerformanceOptimizationOptions> = {
  properties: 'transform, box-shadow',
  duration: 400, // Match transition duration
  debounce: 50,
};

/**
 * Initialize smart will-change for elements on hover
 * @param selector - CSS selector for elements to optimize
 * @param options - Optimization options
 */
export function initSmartWillChange(
  selector: string,
  options: PerformanceOptimizationOptions = {}
): void {
  const { properties, duration, debounce } = {
    ...defaultOptions,
    ...options,
  };

  const elements = document.querySelectorAll<HTMLElement>(selector);

  if (elements.length === 0) {
    return;
  }

  elements.forEach((element) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isAnimating = false;

    // Apply will-change on mouseenter
    element.addEventListener('mouseenter', () => {
      if (isAnimating) return;

      isAnimating = true;
      element.style.willChange = properties;
    });

    // Remove will-change after animation completes
    element.addEventListener('mouseleave', () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        element.style.willChange = 'auto';
        isAnimating = false;
      }, duration + debounce);
    });

    // Also handle focus for keyboard navigation
    element.addEventListener('focusin', () => {
      if (isAnimating) return;

      isAnimating = true;
      element.style.willChange = properties;
    });

    element.addEventListener('focusout', () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        element.style.willChange = 'auto';
        isAnimating = false;
      }, duration + debounce);
    });
  });
}

/**
 * Initialize smart will-change for buttons
 */
export function initButtonPerformance(): void {
  initSmartWillChange('.btn', {
    properties: 'background-color, box-shadow, transform',
    duration: 400,
  });

  initSmartWillChange('a:not(.btn)', {
    properties: 'color, text-shadow',
    duration: 300,
  });
}

/**
 * Initialize smart will-change for cards
 */
export function initCardPerformance(): void {
  initSmartWillChange('.hoverable-card', {
    properties: 'transform, box-shadow, background-color, border-color',
    duration: 400,
  });

  initSmartWillChange('.project-card', {
    properties: 'transform, box-shadow, border-color',
    duration: 400,
  });

  initSmartWillChange('.skill-card', {
    properties: 'transform, box-shadow, background-color',
    duration: 400,
  });
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations(): void {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupPerformance();
    });
  } else {
    setupPerformance();
  }
}

function setupPerformance(): void {
  // Only apply on devices that support hover (not touch-only devices)
  if (window.matchMedia('(hover: hover)').matches) {
    initButtonPerformance();
    initCardPerformance();
  }
}

/**
 * Debounce utility for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle utility for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Auto-initialize if script is loaded
if (typeof window !== 'undefined') {
  initPerformanceOptimizations();
}
