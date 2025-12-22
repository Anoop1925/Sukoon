import { TeamMember } from '@/types';

/**
 * Static data for team members
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Susmita Dey',
    role: 'Head of The Team',
    image: '/images/susmita.jpg',
    bio: 'Leading the Sukoon project with passion for mental health awareness',
    socialLinks: [
      {
        platform: 'website',
        url: 'https://bio.link/susmitadey',
      },
    ],
  },
  {
    id: 'team-2',
    name: 'Soumyadeep Dhali',
    role: 'Member',
    image: '/images/soumyadeep.jpg',
    bio: 'Contributing to make mental health resources accessible to everyone',
    socialLinks: [
      {
        platform: 'website',
        url: 'https://soumyadeep.bio.link',
      },
    ],
  },
  {
    id: 'team-3',
    name: 'Chaitri Saha Chowdhury',
    role: 'Member',
    image: '/images/chaitri.jpg',
    bio: 'Dedicated to creating a stress-free environment for all',
    socialLinks: [
      {
        platform: 'website',
        url: 'https://bio.link/chaitri',
      },
    ],
  },
  {
    id: 'team-4',
    name: 'Sasanka Kundu',
    role: 'Member',
    image: '/images/sasanka.jpg',
    bio: 'Working towards making mental wellness accessible',
    socialLinks: [
      {
        platform: 'website',
        url: 'https://bio.link/sasankakundu',
      },
    ],
  },
];
