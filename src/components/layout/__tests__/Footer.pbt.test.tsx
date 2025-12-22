/**
 * Property-based tests for Footer component
 * Feature: sukoon-nextjs-migration, Property 28: Footer Link Validity
 * Validates: Requirements 9.4
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import { Footer } from '../Footer';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Footer - Property-Based Tests', () => {
  /**
   * Property 28: Footer Link Validity
   * For all footer links, they should have valid href attributes pointing to
   * the correct internal or external destinations.
   */
  it('should have valid href attributes for all links', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // No random input needed, testing static footer
        () => {
          const { container } = render(<Footer />);

          // Get all anchor tags in the footer
          const links = container.querySelectorAll('a');
          expect(links.length).toBeGreaterThan(0);

          links.forEach((link) => {
            const href = link.getAttribute('href');
            
            // Every link should have a non-empty href
            expect(href).toBeTruthy();
            expect(href).not.toBe('');
            expect(href).not.toBe('#');
            
            // Href should be a valid string
            expect(typeof href).toBe('string');
            
            // Href should start with /, http://, https://, mailto:, or tel:
            const validPrefixes = ['/', 'http://', 'https://', 'mailto:', 'tel:'];
            const hasValidPrefix = validPrefixes.some(prefix => 
              href!.startsWith(prefix)
            );
            expect(hasValidPrefix).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: All service links should point to valid therapy pages
   * For all therapy service links in the footer, they should point to /therapies/{slug}
   */
  it('should have valid therapy service links', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<Footer />);

          // Find the services section
          const servicesSection = Array.from(
            container.querySelectorAll('h3')
          ).find((h3) => h3.textContent === 'Our Services');

          expect(servicesSection).toBeTruthy();

          // Get all links in the services section
          const servicesContainer = servicesSection?.parentElement;
          const serviceLinks = servicesContainer?.querySelectorAll('a');

          expect(serviceLinks).toBeTruthy();
          expect(serviceLinks!.length).toBeGreaterThan(0);

          serviceLinks?.forEach((link) => {
            const href = link.getAttribute('href');
            expect(href).toBeTruthy();
            
            // Service links should start with /therapies/
            expect(href).toMatch(/^\/therapies\/[a-z]+$/);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: All social media links should be external with proper attributes
   * For all social media links, they should have target="_blank" and rel="noopener noreferrer"
   */
  it('should have proper attributes for external social links', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<Footer />);

          // Find social media links (they have aria-label attributes)
          const socialLinks = container.querySelectorAll('a[aria-label]');
          
          expect(socialLinks.length).toBeGreaterThan(0);

          socialLinks.forEach((link) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            const rel = link.getAttribute('rel');
            
            // Should have valid external URL
            expect(href).toBeTruthy();
            expect(href).toMatch(/^https?:\/\//);
            
            // Should have security attributes for external links
            expect(target).toBe('_blank');
            expect(rel).toBe('noopener noreferrer');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Contact links should have proper protocols
   * For all contact links (email, phone), they should use mailto: or tel: protocols
   */
  it('should have proper protocols for contact links', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<Footer />);

          // Find contact section
          const contactSection = Array.from(
            container.querySelectorAll('h3')
          ).find((h3) => h3.textContent === 'Contact Us');

          expect(contactSection).toBeTruthy();

          const contactContainer = contactSection?.parentElement;
          const contactLinks = contactContainer?.querySelectorAll('a');

          contactLinks?.forEach((link) => {
            const href = link.getAttribute('href');
            expect(href).toBeTruthy();
            
            // Contact links should use mailto: or tel: protocols
            const isMailto = href!.startsWith('mailto:');
            const isTel = href!.startsWith('tel:');
            expect(isMailto || isTel).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Footer should always render all required sections
   * For any render, footer should contain About, Services, Quick Links, and Contact sections
   */
  it('should always render all required sections', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<Footer />);

          const headings = Array.from(container.querySelectorAll('h3')).map(
            (h3) => h3.textContent
          );

          // Should have all required sections
          expect(headings).toContain('Sukoon');
          expect(headings).toContain('Our Services');
          expect(headings).toContain('Quick Links');
          expect(headings).toContain('Contact Us');
        }
      ),
      { numRuns: 100 }
    );
  });
});
