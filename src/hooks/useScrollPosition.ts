import { useState, useEffect } from 'react';

/**
 * Interface for scroll position coordinates
 */
export interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Custom hook to track the current scroll position
 * 
 * Listens to window scroll events and returns the current scroll position.
 * The hook automatically cleans up event listeners on unmount.
 * 
 * @returns ScrollPosition object with x and y coordinates
 * @returns {number} x - Horizontal scroll position in pixels
 * @returns {number} y - Vertical scroll position in pixels
 * 
 * @example
 * const { x, y } = useScrollPosition();
 * console.log(`Scrolled ${y}px from top`);
 * 
 * // Show back-to-top button when scrolled down
 * const showButton = y > 800;
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    // Set initial position
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}
