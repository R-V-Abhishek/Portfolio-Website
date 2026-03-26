/**
 * Intersection Observer utility for scroll-triggered animations
 * Adds 'animate-in' class when elements enter viewport
 */

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Initialize scroll animations for elements matching the selector
 * @param selector - CSS selector for elements to animate
 * @param options - Intersection Observer options
 */
export function initScrollAnimations(
  selector: string,
  options: ScrollAnimationOptions = {}
): void {
  // Check if IntersectionObserver is supported
  if (typeof IntersectionObserver === 'undefined') {
    console.warn('IntersectionObserver not supported');
    return;
  }

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    once = true,
  } = options;

  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // Unobserve if animation should only happen once
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // Remove class if animation should repeat
          entry.target.classList.remove('animate-in');
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Initialize staggered animations for grid children
 * @param selector - CSS selector for grid containers
 * @param options - Intersection Observer options
 */
export function initStaggeredAnimations(
  selector: string,
  options: ScrollAnimationOptions = {}
): void {
  if (typeof IntersectionObserver === 'undefined') {
    return;
  }

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
  } = options;

  const grids = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove('animate-in');
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  grids.forEach((grid) => {
    observer.observe(grid);
  });
}

/**
 * Initialize all scroll animations on page load
 */
export function initAllScrollAnimations(): void {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupAnimations();
    });
  } else {
    setupAnimations();
  }
}

function setupAnimations(): void {
  // Animate fade-in sections
  initScrollAnimations('.fade-in', {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
    once: true,
  });

  // Animate stagger grids
  initStaggeredAnimations('.stagger-grid', {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once: true,
  });

  // Animate cards individually
  initScrollAnimations('.hoverable-card', {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    once: true,
  });
}

// Auto-initialize if script is loaded
if (typeof window !== 'undefined') {
  initAllScrollAnimations();
}
