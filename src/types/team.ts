/**
 * Team member type definitions
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  socialLinks: {
    platform: 'twitter' | 'linkedin' | 'github' | 'website';
    url: string;
  }[];
}
