/**
 * Property-Based Tests for BackToTop Component
 * Feature: sukoon-nextjs-migration, Property 16: Back-to-Top Button Visibility
 * Validates: Requirements 6.4
 */

import { render, fireEvent, waitFor } from '@testing-library/react';
import fc from 'fast-check';
import { BackToTop } from '../BackToTop';

describe('BackToTop Property-Based Tests', () => {
  beforeEach(() => {
    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0
    });
  });

  /**
   * Property 16: Back-to-Top Button Visibility
   * For any scroll position greater than 800px from the top, the back-to-top button 
   * should be visible; otherwise, it should be hidden.
   */
  it('should be visible when scroll position is greater than threshold and hidden otherwise', async () => {
    fc.assert(
      fc.asyncProperty(
        // Generate scroll positions from 0 to 2000px
        fc.integer({ min: 0, max: 2000 }),
        // Generate threshold values
        fc.integer({ min: 100, max: 1000 }),
        async (scrollPosition: number, threshold: number) => {
          const { container } = render(<BackToTop threshold={threshold} />);
          
          // Simulate scroll
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          // Trigger scroll event
          fireEvent.scroll(window);

          // Wait for state update
          await waitFor(() => {
            const button = container.querySelector('button');
            expect(button).not.toBeNull();
          });

          const button = container.querySelector('button') as HTMLElement;

          // Property: Button visibility should match scroll position vs threshold
          if (scrollPosition > threshold) {
            // Button should be visible (not have opacity-0 or pointer-events-none in a way that makes it invisible)
            expect(button.className).toContain('opacity-100');
            expect(button.getAttribute('aria-hidden')).toBe('false');
          } else {
            // Button should be hidden
            expect(button.className).toContain('opacity-0');
            expect(button.getAttribute('aria-hidden')).toBe('true');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property: Default threshold should be 800px
   */
  it('should use 800px as default threshold when not specified', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: 2000 }),
        async (scrollPosition: number) => {
          const { container } = render(<BackToTop />);
          
          // Simulate scroll
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          fireEvent.scroll(window);

          await waitFor(() => {
            const button = container.querySelector('button');
            expect(button).not.toBeNull();
          });

          const button = container.querySelector('button') as HTMLElement;

          // Property: With default threshold of 800px
          if (scrollPosition > 800) {
            expect(button.className).toContain('opacity-100');
          } else {
            expect(button.className).toContain('opacity-0');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property: Clicking button should trigger smooth scroll to top
   */
  it('should scroll to top when clicked', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 801, max: 2000 }),
        (scrollPosition: number) => {
          // Mock scrollTo
          const scrollToMock = jest.fn();
          window.scrollTo = scrollToMock;

          const { container } = render(<BackToTop />);
          
          // Set scroll position above threshold
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          fireEvent.scroll(window);

          const button = container.querySelector('button') as HTMLElement;
          fireEvent.click(button);

          // Property: scrollTo should be called with top: 0 and smooth behavior
          expect(scrollToMock).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth'
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
