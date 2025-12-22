'use client';

import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { Navigation } from './Navigation';
import { useFocusTrap } from '@/hooks';

/**
 * Props for the MobileMenu component
 */
export interface MobileMenuProps {
  /**
   * Whether the mobile menu is open
   */
  isOpen: boolean;
  /**
   * Callback to close the menu
   */
  onClose: () => void;
}

/**
 * MobileMenu Component
 * 
 * Slide-in mobile navigation menu with overlay and focus trap.
 * 
 * @component
 * @example
 * // Basic mobile menu
 * const [isOpen, setIsOpen] = useState(false);
 * <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
 * 
 * Features:
 * - Slide-in animation from the right
 * - Open/close state management
 * - Closes on link click
 * - Closes on overlay click
 * - Prevents body scroll when open
 * - Login/Signup button
 * 
 * @param props - MobileMenuProps
 * @returns MobileMenu component
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Focus trap for keyboard navigation
  const menuRef = useFocusTrap<HTMLDivElement>({
    isActive: isOpen,
    initialFocus: true,
    restoreFocus: true
  });

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Close mobile menu"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6">
          <Navigation variant="mobile" onItemClick={onClose} />
        </div>

        {/* Login/Signup Button */}
        <div className="p-6 border-t border-gray-200">
          <Link
            href="/login"
            className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-full hover:shadow-lg transition-shadow duration-300"
            onClick={onClose}
          >
            Login / Signup
          </Link>
        </div>
      </div>
    </>
  );
}
