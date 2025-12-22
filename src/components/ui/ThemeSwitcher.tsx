'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themes, ThemeMode } from '@/context/ThemeContext';

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
        <div className="p-4 rounded-2xl glass shadow-lg">
          <span className="text-2xl">🌊</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Theme Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-4 rounded-2xl glass shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
      >
        <div className="relative">
          <span className="text-2xl">{themes[theme].icon}</span>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity" />
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
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 w-80 z-50"
            >
              <div className="glass rounded-2xl shadow-2xl border border-border p-4">
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-foreground mb-1">Choose Your Mood</h3>
                  <p className="text-xs text-muted">Select a theme that matches your current state</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
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
                          relative p-4 rounded-xl text-left transition-all duration-300
                          ${isActive 
                            ? 'bg-primary text-white shadow-lg' 
                            : 'bg-surface hover:bg-surface-elevated border border-border'
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{themeData.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold mb-0.5 ${isActive ? 'text-white' : 'text-foreground'}`}>
                              {themeData.name}
                            </div>
                            <div className={`text-xs ${isActive ? 'text-white/80' : 'text-muted'}`}>
                              {themeData.description}
                            </div>
                          </div>
                        </div>

                        {/* Color Preview */}
                        <div className="flex gap-1 mt-3">
                          <div 
                            className="h-1.5 flex-1 rounded-full"
                            style={{ backgroundColor: themeData.colors.primary }}
                          />
                          <div 
                            className="h-1.5 flex-1 rounded-full"
                            style={{ backgroundColor: themeData.colors.secondary }}
                          />
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 border-2 border-white rounded-xl"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted text-center">
                    Your theme preference is saved automatically
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
