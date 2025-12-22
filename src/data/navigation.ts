import { NavItem } from '@/types';

/**
 * Static data for navigation menu items
 */
export const navigationItems: NavItem[] = [
  {
    id: 'nav-home',
    label: 'HOME',
    href: '/',
    external: false,
  },
  {
    id: 'nav-about',
    label: 'ABOUT',
    href: '#about',
    external: false,
  },
  {
    id: 'nav-services',
    label: 'SERVICES',
    href: '#services',
    external: false,
  },
  {
    id: 'nav-faq',
    label: 'FAQs',
    href: '#faq',
    external: false,
  },
  {
    id: 'nav-contact',
    label: 'CONTACT US',
    href: '#contact',
    external: false,
  },
];
