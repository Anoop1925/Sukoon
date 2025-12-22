/**
 * SkipToContent component
 * 
 * Provides a skip-to-content link for keyboard navigation accessibility.
 * The link is visually hidden until focused, allowing keyboard users to
 * bypass navigation and jump directly to the main content.
 * 
 * Requirements: 11.2 - Keyboard navigation accessibility
 */

'use client';

import React from 'react';

export interface SkipToContentProps {
  /**
   * The ID of the main content element to skip to
   * @default "main-content"
   */
  targetId?: string;
  /**
   * Custom text for the skip link
   * @default "Skip to main content"
   */
  text?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * SkipToContent component that provides keyboard navigation to main content
 * 
 * @component
 * @example
 * // Basic usage (skips to element with id="main-content")
 * <SkipToContent />
 * 
 * @example
 * // Custom target and text
 * <SkipToContent 
 *   targetId="content" 
 *   text="Jump to content"
 * />
 * 
 * Features:
 * - Visually hidden until focused
 * - Smooth scroll to main content
 * - Proper focus management
 * - High contrast for visibility when focused
 * 
 * @param props - SkipToContentProps
 * @returns SkipToContent component
 */
export function SkipToContent({
  targetId = 'main-content',
  text = 'Skip to main content',
  className = ''
}: SkipToContentProps): React.ReactElement {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const target = document.getElementById(targetId);
    if (target) {
      // Scroll to the target element
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Set focus to the target element
      // Make it focusable if it's not already
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus();
      
      // Remove tabindex after focus to restore natural tab order
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`
        fixed top-0 left-0 z-[9999]
        px-6 py-3
        bg-purple-600 text-white
        font-semibold
        rounded-br-lg
        shadow-lg
        transform -translate-y-full
        focus:translate-y-0
        transition-transform duration-200
        focus:outline-none focus:ring-4 focus:ring-purple-300
        ${className}
      `}
    >
      {text}
    </a>
  );
}
