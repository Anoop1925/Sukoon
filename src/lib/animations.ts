/**
 * Animation configurations for Framer Motion
 * Provides reusable animation variants for consistent animations across the application
 */

import { Variants } from 'framer-motion';

/**
 * Fade-in animation variants
 * Elements fade in from transparent to opaque
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Fade-in with delay
 * Useful for staggered animations where elements appear one after another
 * 
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Framer Motion variants object
 * 
 * @example
 * <motion.div variants={fadeInWithDelay(0.2)}>
 *   Second element (appears 0.2s after first)
 * </motion.div>
 */
export const fadeInWithDelay = (delay: number = 0): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  },
});

/**
 * Fade-in from bottom
 * Elements fade in while sliding up from below
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Fade-in from top
 * Elements fade in while sliding down from above
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Slide-in from left
 * Elements slide in from the left side
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Slide-in from right
 * Elements slide in from the right side
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Scale-in animation
 * Elements scale up from smaller size
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Scale-in with bounce
 * Elements scale up with a bouncy effect
 */
export const scaleInBounce: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1], // Cubic bezier for bounce
    },
  },
};

/**
 * Zoom-in animation
 * Elements zoom in from center
 */
export const zoomIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Rotate-in animation
 * Elements rotate while fading in
 */
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Stagger container
 * Container for staggered children animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger item
 * Individual items in a staggered animation
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Modal/Overlay animation
 * For modal backgrounds and overlays
 */
export const modalOverlay: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Modal content animation
 * For modal content that slides up
 */
export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Page transition animation
 * For page-level transitions
 */
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Hover scale animation
 * For interactive elements that scale on hover
 */
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

/**
 * Hover lift animation
 * For cards that lift on hover
 */
export const hoverLift = {
  rest: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Pulse animation
 * For attention-grabbing elements
 */
export const pulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Bounce animation
 * For playful elements
 */
export const bounce: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Default animation configuration
 * Can be used as a base for custom animations
 */
export const defaultAnimation = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  viewport: { once: true, amount: 0.3 },
};

/**
 * Scroll reveal animation
 * For elements that animate when scrolled into view
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Custom animation creator
 * Creates a custom animation with specified parameters
 * 
 * Utility function to generate Framer Motion variants with custom
 * starting and ending states. Useful when predefined animations
 * don't meet specific requirements.
 * 
 * @param from - Initial state properties (e.g., { opacity: 0, x: -100 })
 * @param to - Final state properties (e.g., { opacity: 1, x: 0 })
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param delay - Delay before animation starts in seconds (default: 0)
 * @returns Framer Motion variants object with hidden and visible states
 * 
 * @example
 * // Create a custom slide and rotate animation
 * const customVariant = createCustomAnimation(
 *   { opacity: 0, x: -50, rotate: -45 },
 *   { opacity: 1, x: 0, rotate: 0 },
 *   0.8,
 *   0.2
 * );
 * 
 * <motion.div variants={customVariant} initial="hidden" animate="visible">
 *   Custom animated content
 * </motion.div>
 */
export const createCustomAnimation = (
  from: Record<string, any>,
  to: Record<string, any>,
  duration: number = 0.6,
  delay: number = 0
): Variants => ({
  hidden: from,
  visible: {
    ...to,
    transition: {
      duration,
      delay,
      ease: 'easeOut',
    },
  },
});
