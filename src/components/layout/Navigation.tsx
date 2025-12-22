'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavItem } from '@/types';
import { navigationItems } from '@/data';

/**
 * Props for the Navigation component
 */
export interface NavigationProps {
  /**
   * Variant of navigation (desktop or mobile)
   */
  variant?: 'desktop' | 'mobile';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Callback when a navigation item is clicked (useful for mobile menu)
   */
  onItemClick?: () => void;
}

/**
 * Navigation Component
 * 
 * Responsive navigation with desktop and mobile variants, active link highlighting.
 * 
 * @component
 * @example
 * // Desktop navigation
 * <Navigation variant="desktop" />
 * 
 * @example
 * // Mobile navigation with click handler
 * <Navigation 
 *   variant="mobile" 
 *   onItemClick={() => closeMobileMenu()} 
 * />
 * 
 * Features:
 * - Uses Next.js Link for client-side navigation
 * - Active link highlighting based on current pathname
 * - Support for both desktop and mobile layouts
 * - Handles both internal and external links
 * 
 * @param props - NavigationProps
 * @returns Navigation component
 */
export function Navigation({
  variant = 'desktop',
  className = '',
  onItemClick,
}: NavigationProps) {
  const pathname = usePathname();

  /**
   * Check if a navigation item is currently active
   */
  const isActive = (item: NavItem): boolean => {
    // Handle null pathname (e.g., in test environments)
    if (!pathname) {
      return false;
    }
    
    // For home page
    if (item.href === '/' && pathname === '/') {
      return true;
    }
    
    // For hash links (anchor links on same page)
    if (item.href.startsWith('#')) {
      return pathname === '/';
    }
    
    // For other pages
    if (item.href !== '/' && pathname.startsWith(item.href)) {
      return true;
    }
    
    return false;
  };

  const baseStyles =
    variant === 'desktop'
      ? 'flex items-center space-x-8'
      : 'flex flex-col space-y-4';

  const linkStyles = (item: NavItem) => {
    const active = isActive(item);
    const baseLink =
      variant === 'desktop'
        ? 'text-sm font-medium transition-colors duration-300 hover:text-primary'
        : 'text-lg font-medium transition-colors duration-300 hover:text-primary';

    return `${baseLink} ${
      active
        ? 'text-primary border-b-2 border-primary'
        : 'text-gray-700'
    }`;
  };

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <nav className={`${baseStyles} ${className}`}>
      {navigationItems.map((item) => {
        // Handle external links
        if (item.external) {
          return (
            <a
              key={item.id}
              href={item.href}
              className={linkStyles(item)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
            >
              {item.label}
            </a>
          );
        }

        // Handle hash/anchor links
        if (item.href.startsWith('#')) {
          return (
            <a
              key={item.id}
              href={item.href}
              className={linkStyles(item)}
              onClick={handleClick}
            >
              {item.label}
            </a>
          );
        }

        // Handle internal Next.js routes
        return (
          <Link
            key={item.id}
            href={item.href}
            className={linkStyles(item)}
            onClick={handleClick}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
