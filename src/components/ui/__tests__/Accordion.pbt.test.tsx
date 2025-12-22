/**
 * Property-Based Tests for Accordion Component
 * Feature: sukoon-nextjs-migration, Property 22: Accordion Single Expansion
 * Validates: Requirements 8.2, 8.4
 */

import { render, fireEvent } from '@testing-library/react';
import fc from 'fast-check';
import { Accordion, AccordionItem } from '../Accordion';

describe('Accordion Property-Based Tests', () => {
  /**
   * Property 22: Accordion Single Expansion
   * For any FAQ accordion, clicking a question should expand that item 
   * and collapse all other items (only one item expanded at a time).
   */
  it('should maintain only one expanded item at a time when allowMultiple is false', () => {
    fc.assert(
      fc.property(
        // Generate an array of accordion items (2-10 items)
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            question: fc.string({ minLength: 1 }),
            answer: fc.string({ minLength: 1 })
          }),
          { minLength: 2, maxLength: 10 }
        ).map((items) => {
          // Ensure unique IDs
          return items.map((item, index) => ({
            ...item,
            id: `item-${index}-${item.id}`
          }));
        }),
        // Generate a sequence of click indices
        fc.array(fc.nat(), { minLength: 2, maxLength: 5 }),
        (items: AccordionItem[], clickSequence: number[]) => {
          // Render the accordion
          const { container } = render(
            <Accordion items={items} allowMultiple={false} />
          );

          // Perform a sequence of clicks
          clickSequence.forEach((clickIndex) => {
            const itemIndex = clickIndex % items.length;
            const buttons = container.querySelectorAll('button[aria-expanded]');
            
            if (buttons[itemIndex]) {
              fireEvent.click(buttons[itemIndex]);

              // After each click, verify only one item is expanded
              const expandedButtons = Array.from(buttons).filter(
                (btn) => btn.getAttribute('aria-expanded') === 'true'
              );

              // Property: Only one item should be expanded at a time
              expect(expandedButtons.length).toBeLessThanOrEqual(1);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property: Clicking an expanded item should collapse it
   */
  it('should collapse an item when clicked while expanded', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            question: fc.string({ minLength: 1 }),
            answer: fc.string({ minLength: 1 })
          }),
          { minLength: 1, maxLength: 5 }
        ).map((items) => {
          return items.map((item, index) => ({
            ...item,
            id: `item-${index}-${item.id}`
          }));
        }),
        fc.nat(),
        (items: AccordionItem[], clickIndex: number) => {
          if (items.length === 0) return;

          const itemIndex = clickIndex % items.length;
          const { container } = render(
            <Accordion items={items} allowMultiple={false} />
          );

          const buttons = container.querySelectorAll('button[aria-expanded]');
          const targetButton = buttons[itemIndex] as HTMLElement;

          // Click to expand
          fireEvent.click(targetButton);
          expect(targetButton.getAttribute('aria-expanded')).toBe('true');

          // Click again to collapse
          fireEvent.click(targetButton);
          expect(targetButton.getAttribute('aria-expanded')).toBe('false');
        }
      ),
      { numRuns: 100 }
    );
  });
});
