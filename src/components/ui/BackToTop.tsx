'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

/**
 * Props for the BackToTop component
 */
export interface BackToTopProps {
  /** Scroll position threshold in pixels to show the button (default: 800) */
  threshold?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * BackToTop Component
 * 
 * A floating button that appears when the user scrolls down past a threshold.
 * Clicking the button smoothly scrolls the page back to the top.
 * 
 * @component
 * @example
 * // Basic usage with default threshold (800px)
 * <BackToTop />
 * 
 * @example
 * // Custom threshold
 * <BackToTop threshold={500} />
 * 
 * @example
 * // With custom styling
 * <BackToTop className="bottom-4 right-4" />
 * 
 * Features:
 * - Appears/disappears based on scroll position
 * - Smooth scroll animation
 * - Fade and slide transition
 * - Accessible with ARIA labels
 * - Keyboard navigable
 * - Fixed positioning in bottom-right corner
 * 
 * Accessibility:
 * - aria-label for screen readers
 * - aria-hidden when not visible
 * - Focus ring for keyboard navigation
 * - Proper button semantics
 */
export function BackToTop({ 
  threshold = 800,
  className = '' 
}: BackToTopProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollPosition > threshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      } ${className}`}
      aria-label="Back to top"
      aria-hidden={!isVisible}
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
}
