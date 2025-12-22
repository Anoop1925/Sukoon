/**
 * Property-Based Tests for TeamMembers Component
 * 
 * **Feature: sukoon-nextjs-migration, Property 19: Team Member Rendering**
 * **Validates: Requirements 7.3**
 * 
 * Property: For all team members in the data source, each should be rendered 
 * as a card with name, role, image, and social links.
 */

import { render } from '@testing-library/react';
import { TeamMembers } from '../TeamMembers';
import { TeamMember } from '@/types';
import fc from 'fast-check';

// Arbitrary generator for non-empty, non-whitespace strings without leading/trailing spaces
const nonEmptyString = fc.string({ minLength: 1 }).filter(s => {
  const trimmed = s.trim();
  return trimmed.length > 0 && trimmed === s; // Ensure no leading/trailing whitespace
});

// Arbitrary generator for TeamMember with unique IDs
const teamMemberArbitrary = fc.record({
  id: fc.uuid(),
  name: nonEmptyString,
  role: nonEmptyString,
  image: fc.constant('/images/test.jpg'),
  bio: fc.option(fc.string(), { nil: undefined }),
  socialLinks: fc.array(
    fc.record({
      platform: fc.constantFrom('website', 'twitter', 'linkedin', 'github'),
      url: fc.webUrl()
    }),
    { minLength: 0, maxLength: 4 }
  )
}) as fc.Arbitrary<TeamMember>;

// Generator for unique team member arrays
const uniqueTeamMembersArbitrary = (minLength: number, maxLength: number) =>
  fc.uniqueArray(teamMemberArbitrary, {
    minLength,
    maxLength,
    selector: (member) => member.id
  });

describe('TeamMembers Component - Property-Based Tests', () => {
  /**
   * Property 19: Team Member Rendering
   * For all team members in the data source, each should be rendered as a card 
   * with name, role, image, and social links.
   */
  it('should render all team members with name, role, image, and social links', () => {
    fc.assert(
      fc.property(
        uniqueTeamMembersArbitrary(1, 10),
        (members) => {
          const { container } = render(<TeamMembers members={members} />);

          // Verify the correct number of team member cards are rendered
          const teamCards = container.querySelectorAll('.group');
          expect(teamCards.length).toBe(members.length);

          // Verify each team member has their essential elements rendered
          teamCards.forEach((card, index) => {
            const member = members[index];
            
            // Check that the card contains the member's name
            expect(card.textContent).toContain(member.name);
            
            // Check that the card contains the member's role
            expect(card.textContent).toContain(member.role);
            
            // Check that the card has an image
            const image = card.querySelector('img');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('alt', member.name);
            
            // Check social links count matches
            const socialLinks = card.querySelectorAll('a[rel="noopener noreferrer"]');
            expect(socialLinks.length).toBe(member.socialLinks.length);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property: All team member images should have valid src attributes
   */
  it('should render all team member images with valid src attributes', () => {
    fc.assert(
      fc.property(
        uniqueTeamMembersArbitrary(1, 10),
        (members) => {
          const { container } = render(<TeamMembers members={members} />);

          // Check all images have src attributes
          const images = container.querySelectorAll('img');
          expect(images.length).toBe(members.length);
          
          images.forEach((img) => {
            expect(img).toHaveAttribute('src');
            const src = img.getAttribute('src');
            expect(src).toBeTruthy();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property: Social links should have proper accessibility attributes
   */
  it('should render social links with proper aria-labels', () => {
    fc.assert(
      fc.property(
        uniqueTeamMembersArbitrary(1, 5),
        (members) => {
          const { container } = render(<TeamMembers members={members} />);

          members.forEach((member) => {
            member.socialLinks.forEach((link) => {
              // Find all social links and check if any match this URL
              const allSocialLinks = container.querySelectorAll('a[aria-label]');
              const matchingLinks = Array.from(allSocialLinks).filter(
                (el) => el.getAttribute('href') === link.url
              );
              
              expect(matchingLinks.length).toBeGreaterThan(0);
              
              matchingLinks.forEach((socialLink) => {
                expect(socialLink).toHaveAttribute('aria-label');
                const ariaLabel = socialLink.getAttribute('aria-label');
                expect(ariaLabel).toContain(member.name);
                expect(ariaLabel).toContain(link.platform);
              });
            });
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
