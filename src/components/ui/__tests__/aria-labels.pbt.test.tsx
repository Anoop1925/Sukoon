/**
 * Property-Based Tests for ARIA Label Presence
 * Feature: sukoon-nextjs-migration, Property 33: ARIA Label Presence
 * Validates: Requirements 11.1
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import { BackToTop } from '../BackToTop';
import { Button } from '../Button';

describe('ARIA Label Presence Property-Based Tests', () => {
  /**
   * Property 33: ARIA Label Presence
   * For all interactive elements without visible text labels (icon buttons, etc.), 
   * they should have aria-label or aria-labelledby attributes.
   */

  /**
   * Test: BackToTop button (icon-only) should have aria-label
   */
  it('should have aria-label for icon-only BackToTop button', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 1000 }),
        (threshold: number) => {
          const { container } = render(<BackToTop threshold={threshold} />);
          
          const button = container.querySelector('button');
          expect(button).toBeTruthy();
          
          if (button) {
            // Property: Icon-only button must have aria-label
            const ariaLabel = button.getAttribute('aria-label');
            const ariaLabelledBy = button.getAttribute('aria-labelledby');
            
            // Must have either aria-label or aria-labelledby
            expect(ariaLabel || ariaLabelledBy).toBeTruthy();
            
            // If aria-label exists, it should be non-empty
            if (ariaLabel) {
              expect(ariaLabel.trim().length).toBeGreaterThan(0);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Buttons with text content don't require aria-label
   * (but can have it for additional context)
   */
  it('should allow buttons with visible text to optionally have aria-label', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('primary' as const, 'secondary' as const, 'outline' as const, 'ghost' as const),
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        (variant: 'primary' | 'secondary' | 'outline' | 'ghost', text: string) => {
          const { container } = render(
            <Button variant={variant}>{text}</Button>
          );
          
          const button = container.querySelector('button');
          expect(button).toBeTruthy();
          
          if (button) {
            // Property: Button with visible text content is accessible
            // It either has text content OR aria-label
            const hasTextContent = button.textContent && button.textContent.trim().length > 0;
            const hasAriaLabel = button.getAttribute('aria-label');
            
            // At least one should be present for accessibility
            expect(hasTextContent || hasAriaLabel).toBeTruthy();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Icon-only buttons should have descriptive aria-labels
   */
  it('should have descriptive aria-labels for icon-only buttons', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 1000 }),
        (threshold: number) => {
          const { container } = render(<BackToTop threshold={threshold} />);
          
          const button = container.querySelector('button');
          
          if (button) {
            const ariaLabel = button.getAttribute('aria-label');
            
            // Property: aria-label should be descriptive (more than just one word)
            if (ariaLabel) {
              // Should have meaningful content (at least 3 characters)
              expect(ariaLabel.length).toBeGreaterThanOrEqual(3);
              
              // Should not be just whitespace
              expect(ariaLabel.trim()).toBe(ariaLabel);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Loading state buttons should have aria-busy attribute
   */
  it('should have aria-busy when button is in loading state', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('primary' as const, 'secondary' as const, 'outline' as const, 'ghost' as const),
        fc.boolean(),
        (variant: 'primary' | 'secondary' | 'outline' | 'ghost', loading: boolean) => {
          const { container } = render(
            <Button variant={variant} loading={loading}>
              Submit
            </Button>
          );
          
          const button = container.querySelector('button');
          
          if (button) {
            const ariaBusy = button.getAttribute('aria-busy');
            
            // Property: aria-busy should match loading state
            if (loading) {
              expect(ariaBusy).toBe('true');
            } else {
              expect(ariaBusy).toBe('false');
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Hidden elements should have aria-hidden
   */
  it('should have aria-hidden for visually hidden elements', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 1000 }),
        (threshold: number) => {
          const { container } = render(<BackToTop threshold={threshold} />);
          
          const button = container.querySelector('button');
          
          if (button) {
            const ariaHidden = button.getAttribute('aria-hidden');
            const isVisible = button.className.includes('opacity-100');
            
            // Property: aria-hidden should match visibility state
            if (isVisible) {
              expect(ariaHidden).toBe('false');
            } else {
              expect(ariaHidden).toBe('true');
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
