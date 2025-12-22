/**
 * Property-based tests for Header component
 * Feature: sukoon-nextjs-migration, Property 26: Sticky Navigation
 * Validates: Requirements 9.2
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import { Header } from '../Header';

// Mock the useScrollPosition hook
jest.mock('@/hooks', () => ({
  useScrollPosition: jest.fn(() => ({ x: 0, y: 0 })),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Header - Property-Based Tests', () => {
  /**
   * Property 26: Sticky Navigation
   * For any scroll position greater than 100px, the navigation bar should have
   * sticky positioning with a background overlay.
   */
  it('should have background when scroll position is greater than 100px', () => {
    const { useScrollPosition } = require('@/hooks');

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }), // Generate scroll positions
        (scrollY) => {
          // Mock the scroll position
          useScrollPosition.mockReturnValue({ x: 0, y: scrollY });

          const { container, rerender } = render(<Header />);

          // Force re-render to trigger useEffect
          rerender(<Header />);

          const header = container.querySelector('header');
          expect(header).toBeTruthy();

          if (scrollY > 100) {
            // Should have background classes when scrolled
            expect(header?.className).toContain('bg-white');
            expect(header?.className).toContain('shadow-md');
          } else {
            // When not scrolled and transparent is false (default), should still have background
            // This is because transparent defaults to false
            expect(header?.className).toContain('bg-white');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 26: Sticky Navigation (transparent variant)
   * For any scroll position greater than 100px with transparent header,
   * the navigation bar should transition from transparent to having a background.
   */
  it('should transition from transparent to background when scrolled past 100px', () => {
    const { useScrollPosition } = require('@/hooks');

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }), // Generate scroll positions
        (scrollY) => {
          // Mock the scroll position
          useScrollPosition.mockReturnValue({ x: 0, y: scrollY });

          const { container, rerender } = render(<Header transparent={true} />);

          // Force re-render to trigger useEffect
          rerender(<Header transparent={true} />);

          const header = container.querySelector('header');
          expect(header).toBeTruthy();

          if (scrollY > 100) {
            // Should have background when scrolled past threshold
            expect(header?.className).toContain('bg-white');
            expect(header?.className).toContain('shadow-md');
            expect(header?.className).not.toContain('bg-transparent');
          } else {
            // Should be transparent when not scrolled
            expect(header?.className).toContain('bg-transparent');
            expect(header?.className).not.toContain('bg-white');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Header should always have fixed positioning
   * For any configuration, the header should maintain fixed positioning
   */
  it('should always have fixed positioning', () => {
    const { useScrollPosition } = require('@/hooks');

    fc.assert(
      fc.property(
        fc.record({
          scrollY: fc.integer({ min: 0, max: 5000 }),
          transparent: fc.boolean(),
        }),
        ({ scrollY, transparent }) => {
          useScrollPosition.mockReturnValue({ x: 0, y: scrollY });

          const { container } = render(<Header transparent={transparent} />);

          const header = container.querySelector('header');
          expect(header).toBeTruthy();
          expect(header?.className).toContain('fixed');
          expect(header?.className).toContain('top-0');
          expect(header?.className).toContain('z-50');
        }
      ),
      { numRuns: 100 }
    );
  });
});
