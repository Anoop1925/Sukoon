import { useState, useEffect, RefObject } from 'react';

/**
 * Options for the Intersection Observer
 */
export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Custom hook to observe element visibility using Intersection Observer API
 * 
 * Tracks when an element enters or exits the viewport. Useful for implementing
 * scroll animations, lazy loading, and infinite scroll patterns.
 * Automatically handles cleanup and browser compatibility.
 * 
 * @param ref - React ref object pointing to the element to observe
 * @param options - Intersection Observer options
 * @param options.threshold - Percentage of element visibility to trigger (0-1 or array)
 * @param options.root - Element to use as viewport (null = browser viewport)
 * @param options.rootMargin - Margin around root element (e.g., '50px')
 * @returns boolean indicating if the element is currently intersecting/visible
 * 
 * @example
 * // Trigger animation when element is 50% visible
 * const ref = useRef(null);
 * const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });
 * 
 * return (
 *   <div ref={ref} className={isVisible ? 'animate-in' : ''}>
 *     Content
 *   </div>
 * );
 * 
 * @example
 * // Trigger earlier with rootMargin
 * const isVisible = useIntersectionObserver(ref, {
 *   threshold: 0,
 *   rootMargin: '100px'
 * });
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    // Check if element exists and IntersectionObserver is supported
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: options.threshold ?? 0,
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.root, options.rootMargin]);

  return isIntersecting;
}
