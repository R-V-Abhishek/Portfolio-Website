/**
 * Lazy loading utility for images
 * Improves performance by loading images only when they enter viewport
 */

interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  fadeInDuration?: number;
  placeholderClass?: string;
}

const defaultOptions: Required<LazyLoadOptions> = {
  threshold: 0.01,
  rootMargin: '50px 0px',
  fadeInDuration: 300,
  placeholderClass: 'lazy-placeholder',
};

/**
 * Initialize lazy loading for images
 * @param selector - CSS selector for images to lazy load
 * @param options - Lazy loading options
 */
export function initLazyLoading(
  selector: string = 'img[data-src], img[loading="lazy"]',
  options: LazyLoadOptions = {}
): void {
  // Check if IntersectionObserver is supported
  if (typeof IntersectionObserver === 'undefined') {
    console.warn('IntersectionObserver not supported, loading all images immediately');
    loadAllImagesImmediately(selector);
    return;
  }

  const config = { ...defaultOptions, ...options };
  const images = document.querySelectorAll<HTMLImageElement>(selector);

  if (images.length === 0) {
    return;
  }

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          loadImage(img, config);
          observer.unobserve(img);
        }
      });
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin,
    }
  );

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

/**
 * Load a single image with fade-in effect
 */
function loadImage(img: HTMLImageElement, config: Required<LazyLoadOptions>): void {
  const src = img.dataset.src || img.src;

  if (!src) {
    console.warn('No src found for image:', img);
    return;
  }

  // Create a temporary image to preload
  const tempImage = new Image();

  tempImage.onload = () => {
    // Set the actual source
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }

    // Remove placeholder class
    img.classList.remove(config.placeholderClass);

    // Add loaded class for fade-in animation
    img.classList.add('lazy-loaded');

    // Apply fade-in effect
    img.style.opacity = '0';
    img.style.transition = `opacity ${config.fadeInDuration}ms ease-in`;

    // Trigger reflow
    void img.offsetWidth;

    // Fade in
    img.style.opacity = '1';
  };

  tempImage.onerror = () => {
    console.error('Failed to load image:', src);
    img.classList.add('lazy-error');
  };

  // Start loading
  tempImage.src = src;
}

/**
 * Fallback: Load all images immediately if IntersectionObserver is not supported
 */
function loadAllImagesImmediately(selector: string): void {
  const images = document.querySelectorAll<HTMLImageElement>(selector);

  images.forEach((img) => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
  });
}

/**
 * Initialize lazy loading for background images
 */
export function initLazyBackgrounds(
  selector: string = '[data-bg]',
  options: LazyLoadOptions = {}
): void {
  if (typeof IntersectionObserver === 'undefined') {
    loadAllBackgroundsImmediately(selector);
    return;
  }

  const config = { ...defaultOptions, ...options };
  const elements = document.querySelectorAll<HTMLElement>(selector);

  if (elements.length === 0) {
    return;
  }

  const bgObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          loadBackground(element, config);
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin,
    }
  );

  elements.forEach((element) => {
    bgObserver.observe(element);
  });
}

/**
 * Load a background image
 */
function loadBackground(element: HTMLElement, config: Required<LazyLoadOptions>): void {
  const bg = element.dataset.bg;

  if (!bg) {
    return;
  }

  // Preload the image
  const tempImage = new Image();

  tempImage.onload = () => {
    element.style.backgroundImage = `url(${bg})`;
    element.classList.remove(config.placeholderClass);
    element.classList.add('lazy-loaded');
    delete element.dataset.bg;
  };

  tempImage.onerror = () => {
    console.error('Failed to load background image:', bg);
    element.classList.add('lazy-error');
  };

  tempImage.src = bg;
}

/**
 * Fallback: Load all backgrounds immediately
 */
function loadAllBackgroundsImmediately(selector: string): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);

  elements.forEach((element) => {
    if (element.dataset.bg) {
      element.style.backgroundImage = `url(${element.dataset.bg})`;
      delete element.dataset.bg;
    }
  });
}

/**
 * Initialize all lazy loading on page load
 */
export function initAllLazyLoading(): void {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupLazyLoading();
    });
  } else {
    setupLazyLoading();
  }
}

function setupLazyLoading(): void {
  // Initialize lazy loading for regular images
  initLazyLoading();

  // Initialize lazy loading for background images
  initLazyBackgrounds();
}

// Auto-initialize if script is loaded
if (typeof window !== 'undefined') {
  initAllLazyLoading();
}
