import { useState, useEffect } from 'react';

/**
 * Custom hook to track media query matches for responsive breakpoints
 * 
 * Uses the matchMedia API to track whether a CSS media query matches.
 * Automatically updates when the viewport size changes.
 * Safe to use during SSR (returns false on server).
 * 
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query currently matches
 * 
 * @example
 * // Check if viewport is mobile size
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * 
 * @example
 * // Check if viewport is desktop size
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * 
 * @example
 * // Check for dark mode preference
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (using addEventListener for better browser support)
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
