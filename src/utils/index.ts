/**
 * Portfolio Utilities - Main Export File
 * Centralized exports for all utility functions
 */

// 3D Card Effects
export { init3DCardEffect } from './card3d';

// Scroll Animations
export {
  initScrollAnimations,
  initStaggeredAnimations,
  initAllScrollAnimations,
} from './scrollAnimations';

// Performance Optimizations
export {
  initSmartWillChange,
  initButtonPerformance,
  initCardPerformance,
  initPerformanceOptimizations,
  debounce,
  throttle,
} from './performance';

// Lazy Loading
export {
  initLazyLoading,
  initLazyBackgrounds,
  initAllLazyLoading,
} from './lazyLoad';
