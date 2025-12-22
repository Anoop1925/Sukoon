'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navigation } from './Navigation';

export interface HeaderProps {
  transparent?: boolean;
  onMenuClick?: () => void;
}

/**
 * Premium Header Component
 * Features: Glass morphism, smooth scroll effects, consistent layout
 */
export function Header({ transparent = false, onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [transparent ? 0 : 1, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'glass shadow-lg border-b border-border/50' 
          : 'bg-background/80 backdrop-blur-sm'
        }
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative px-5 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-md">
                <span className="text-lg md:text-xl font-bold text-white tracking-tight">Sukoon</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation variant="desktop" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Login Button */}
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus-ring"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={onMenuClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2.5 rounded-lg bg-surface hover:bg-surface-elevated border border-border transition-colors focus-ring"
              aria-label="Open mobile menu"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
