'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themes, ThemeMode } from '@/context/ThemeContext';

// Professional SVG Icons
const ThemeIcons = {
  calm: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  focus: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  energize: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  night: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  serenity: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  sunset: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="relative">
        <div className="p-3 rounded-xl glass shadow-lg">
          <div className="w-6 h-6 text-primary">
            {ThemeIcons.calm}
          </div>
        </div>
      </div>
    );
  }

  const currentIcon = ThemeIcons[theme];

  return (
    <div className="relative">
      {/* Theme Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-3 rounded-xl glass shadow-lg hover:shadow-xl transition-all duration-300 focus-ring border border-border/50 hover:border-primary/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
        aria-expanded={isOpen}
      >
        <div className="relative text-primary group-hover:text-primary/80 transition-colors">
          {currentIcon}
        </div>
      </motion.button>

      {/* Theme Picker Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-3 w-96 z-50"
            >
              <div className="glass rounded-2xl shadow-2xl border border-border/50 p-6 backdrop-blur-xl">
                {/* Header */}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-foreground mb-1.5 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Choose Your Theme
                  </h3>
                  <p className="text-sm text-muted">Select a theme that matches your mood</p>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(themes) as ThemeMode[]).map((themeKey) => {
                    const themeData = themes[themeKey];
                    const isActive = theme === themeKey;

                    return (
                      <motion.button
                        key={themeKey}
                        onClick={() => {
                          setTheme(themeKey);
                          setIsOpen(false);
                        }}
                        className={`
                          relative p-4 rounded-xl text-left transition-all duration-300 overflow-hidden
                          ${isActive 
                            ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg ring-2 ring-primary/50' 
                            : 'bg-surface hover:bg-surface-elevated border border-border hover:border-primary/30 hover:shadow-md'
                          }
                        `}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Background Gradient Effect */}
                        {!isActive && (
                          <div 
                            className="absolute inset-0 opacity-0 hover:opacity-5 transition-opacity"
                            style={{ 
                              background: `linear-gradient(135deg, ${themeData.colors.primary}, ${themeData.colors.secondary})`
                            }}
                          />
                        )}

                        <div className="relative flex items-start gap-3">
                          {/* Icon */}
                          <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-primary'}`}>
                            {ThemeIcons[themeKey]}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-foreground'}`}>
                              {themeData.name}
                            </div>
                            <div className={`text-xs leading-snug ${isActive ? 'text-white/90' : 'text-muted'}`}>
                              {themeData.description}
                            </div>
                          </div>

                          {/* Active Check Icon */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          )}
                        </div>

                        {/* Color Preview Bars */}
                        <div className="flex gap-1.5 mt-3">
                          <div 
                            className="h-1 flex-1 rounded-full"
                            style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : themeData.colors.primary }}
                          />
                          <div 
                            className="h-1 flex-1 rounded-full"
                            style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.5)' : themeData.colors.secondary }}
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-5 pt-5 border-t border-border/50">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Theme preference saved automatically</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
