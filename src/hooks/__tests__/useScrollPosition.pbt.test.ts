/**
 * Property-based test for useScrollPosition hook
 * Feature: sukoon-nextjs-migration, Property: Scroll position tracking accuracy
 * Validates: Requirements 3.4
 */
import { renderHook, act } from '@testing-library/react';
import fc from 'fast-check';
import { useScrollPosition } from '../useScrollPosition';

describe('useScrollPosition Property-Based Tests', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    window.scrollTo(0, 0);
  });

  it('should accurately track scroll position for any valid scroll coordinates', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }),
        fc.integer({ min: 0, max: 10000 }),
        (scrollX, scrollY) => {
          // Render the hook
          const { result } = renderHook(() => useScrollPosition());

          // Simulate scroll event
          act(() => {
            // Set scroll position
            Object.defineProperty(window, 'scrollX', {
              writable: true,
              configurable: true,
              value: scrollX,
            });
            Object.defineProperty(window, 'scrollY', {
              writable: true,
              configurable: true,
              value: scrollY,
            });

            // Trigger scroll event
            window.dispatchEvent(new Event('scroll'));
          });

          // Verify the hook returns the correct scroll position
          expect(result.current.x).toBe(scrollX);
          expect(result.current.y).toBe(scrollY);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return non-negative scroll coordinates', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }),
        fc.integer({ min: 0, max: 10000 }),
        (scrollX, scrollY) => {
          const { result } = renderHook(() => useScrollPosition());

          act(() => {
            Object.defineProperty(window, 'scrollX', {
              writable: true,
              configurable: true,
              value: scrollX,
            });
            Object.defineProperty(window, 'scrollY', {
              writable: true,
              configurable: true,
              value: scrollY,
            });

            window.dispatchEvent(new Event('scroll'));
          });

          // Property: scroll positions should always be non-negative
          expect(result.current.x).toBeGreaterThanOrEqual(0);
          expect(result.current.y).toBeGreaterThanOrEqual(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should initialize with current scroll position', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }),
        fc.integer({ min: 0, max: 5000 }),
        (initialX, initialY) => {
          // Set initial scroll position before rendering hook
          Object.defineProperty(window, 'scrollX', {
            writable: true,
            configurable: true,
            value: initialX,
          });
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: initialY,
          });

          const { result } = renderHook(() => useScrollPosition());

          // Property: hook should initialize with current scroll position
          expect(result.current.x).toBe(initialX);
          expect(result.current.y).toBe(initialY);
        }
      ),
      { numRuns: 100 }
    );
  });
});
