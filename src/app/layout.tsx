'use client';

import { useState } from 'react';
import { Inter, Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import { Header, Footer, MobileMenu } from '@/components/layout';
import { BackToTop, SkipToContent } from '@/components/ui';
import { ThemeProvider } from '@/context/ThemeContext';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuOpen = () => setIsMobileMenuOpen(true);
  const handleMenuClose = () => setIsMobileMenuOpen(false);

  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}
    >
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0EA5E9" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Sukoon offers various therapy services including audio, reading, yoga, and more for stress relief and mental wellness." />
        <meta name="keywords" content="stress relief, mental wellness, therapy, audio therapy, reading therapy, yoga therapy, mental health" />
        <meta name="author" content="Sukoon Team" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sukoon - Stress Relief & Mental Wellness" />
        <meta property="og:description" content="Your trusted companion for mental wellness and stress relief" />
        <meta property="og:type" content="website" />
        
        {/* Title */}
        <title>Sukoon - Stress Relief & Mental Wellness</title>
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {/* Skip to Content Link for Keyboard Navigation */}
          <SkipToContent />
          
          {/* Header */}
          <Header onMenuClick={handleMenuOpen} />
          
          {/* Mobile Menu */}
          <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
          
          {/* Main Content */}
          <main id="main-content" className="min-h-screen particles">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Back to Top Button */}
          <BackToTop />
          
          {/* Theme Switcher - Fixed Position */}
          <div className="fixed bottom-24 right-6 z-50">
            <ThemeSwitcher />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
