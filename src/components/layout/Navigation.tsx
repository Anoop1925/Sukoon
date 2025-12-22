'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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
 * Navigation Component with scroll-based active states
 */
export function Navigation({
  variant = 'desktop',
  className = '',
  onItemClick,
}: NavigationProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Only run on home page
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['about', 'services', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Check if we're at the top (hero section)
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  /**
   * Check if a navigation item is currently active
   */
  const isActive = (item: NavItem): boolean => {
    // Handle null pathname
    if (!pathname) {
      return false;
    }
    
    // For home page link
    if (item.href === '/') {
      return pathname === '/' && !activeSection;
    }
    
    // For hash links on home page
    if (item.href.startsWith('#') && pathname === '/') {
      const sectionId = item.href.substring(1);
      return activeSection === sectionId;
    }
    
    // For other pages
    if (!item.href.startsWith('#') && item.href !== '/') {
      return pathname.startsWith(item.href);
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
        ? 'text-sm font-medium transition-colors duration-300 hover:text-primary relative pb-1'
        : 'text-lg font-medium transition-colors duration-300 hover:text-primary';

    return `${baseLink} ${
      active
        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
        : 'text-foreground hover:text-primary'
    }`;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onItemClick) {
      onItemClick();
    }

    // Handle smooth scrolling for hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        const offset = 80; // Header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
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
              onClick={() => onItemClick?.()}
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
              onClick={(e) => handleClick(e, item.href)}
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
            onClick={(e) => handleClick(e, item.href)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
