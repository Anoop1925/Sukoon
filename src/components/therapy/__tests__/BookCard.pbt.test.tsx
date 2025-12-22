/**
 * Property-Based Tests for BookCard Component
 * Feature: sukoon-nextjs-migration, Property 1: External Link Preservation
 * Validates: Requirements 1.4
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import { BookCard } from '../BookCard';

describe('BookCard Property-Based Tests', () => {
  /**
   * Property 1: External Link Preservation
   * For any therapy page or footer section, all external links should have valid,
   * non-empty href attributes that match the original site's link destinations.
   */
  it('should have valid non-empty external purchase links', () => {
    fc.assert(
      fc.property(
        // Generate random book card data
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          author: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 500 }),
          coverImage: fc.constantFrom(
            '/images/book1.jpg',
            '/images/book2.jpg',
            '/images/book3.jpg'
          ),
          purchaseLink: fc.webUrl()
        }),
        (bookData) => {
          const { container } = render(
            <BookCard
              title={bookData.title}
              author={bookData.author}
              description={bookData.description}
              coverImage={bookData.coverImage}
              purchaseLink={bookData.purchaseLink}
            />
          );

          // Find the external link
          const linkElement = container.querySelector('a[href]');
          
          // Property: External link should exist
          expect(linkElement).toBeTruthy();

          if (linkElement) {
            const href = linkElement.getAttribute('href');
            
            // Property: href should be non-empty
            expect(href).toBeTruthy();
            expect(href).not.toBe('');
            
            // Property: href should match the provided purchase link
            expect(href).toBe(bookData.purchaseLink);
            
            // Property: External links should have target="_blank" for opening in new tab
            expect(linkElement.getAttribute('target')).toBe('_blank');
            
            // Property: External links should have rel="noopener noreferrer" for security
            expect(linkElement.getAttribute('rel')).toBe('noopener noreferrer');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property: All book cards should display complete information
   */
  it('should display all book information including title, author, and description', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          author: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          description: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
          coverImage: fc.constantFrom('/images/book1.jpg'),
          purchaseLink: fc.webUrl()
        }),
        (bookData) => {
          const { container } = render(
            <BookCard
              title={bookData.title}
              author={bookData.author}
              description={bookData.description}
              coverImage={bookData.coverImage}
              purchaseLink={bookData.purchaseLink}
            />
          );

          // Property: Title should be displayed
          const titleElement = container.querySelector('h3');
          expect(titleElement).toBeTruthy();
          expect(titleElement?.textContent).toBe(bookData.title);
          
          // Property: Author should be displayed (with "by" prefix)
          const authorElement = container.querySelector('p.text-sm');
          expect(authorElement).toBeTruthy();
          expect(authorElement?.textContent).toBe(`by ${bookData.author}`);
          
          // Property: Description should be displayed
          const descriptionElement = container.querySelector('p.text-gray-600');
          expect(descriptionElement).toBeTruthy();
          expect(descriptionElement?.textContent).toBe(bookData.description);
          
          // Property: Cover image should be present
          const imgElement = container.querySelector('img');
          expect(imgElement).toBeTruthy();
          if (imgElement) {
            expect(imgElement.getAttribute('alt')).toBe(`${bookData.title} by ${bookData.author}`);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
