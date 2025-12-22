'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeMode = 'calm' | 'focus' | 'energize' | 'night' | 'serenity' | 'sunset';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  calm: {
    name: 'Calm',
    description: 'Soft blues and greens for tranquility',
    icon: '🌊',
    colors: {
      primary: 'rgb(59 130 246)',
      secondary: 'rgb(16 185 129)',
    },
  },
  focus: {
    name: 'Focus',
    description: 'Warm oranges for concentration',
    icon: '🔥',
    colors: {
      primary: 'rgb(249 115 22)',
      secondary: 'rgb(234 179 8)',
    },
  },
  energize: {
    name: 'Energize',
    description: 'Vibrant pinks for motivation',
    icon: '⚡',
    colors: {
      primary: 'rgb(236 72 153)',
      secondary: 'rgb(168 85 247)',
    },
  },
  night: {
    name: 'Night',
    description: 'Dark mode for evening relaxation',
    icon: '🌙',
    colors: {
      primary: 'rgb(99 102 241)',
      secondary: 'rgb(139 92 246)',
    },
  },
  serenity: {
    name: 'Serenity',
    description: 'Soft teals for peace',
    icon: '🍃',
    colors: {
      primary: 'rgb(20 184 166)',
      secondary: 'rgb(34 197 94)',
    },
  },
  sunset: {
    name: 'Sunset',
    description: 'Warm reds for comfort',
    icon: '🌅',
    colors: {
      primary: 'rgb(239 68 68)',
      secondary: 'rgb(251 146 60)',
    },
  },
} as const;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('calm');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('sukoon-theme') as ThemeMode;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'calm');
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('sukoon-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Always render the provider, even before mounting
  // This prevents the "useTheme must be used within a ThemeProvider" error
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
