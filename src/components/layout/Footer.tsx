import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { therapies } from '@/data';

export interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { id: 'facebook', icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { id: 'twitter', icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { id: 'instagram', icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { id: 'linkedin', icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className={`bg-surface border-t border-border ${className}`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <Image 
                src="/images/Sukoon_logo.png" 
                alt="Sukoon Logo" 
                width={100}
                height={35}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Your trusted companion for mental wellness and stress relief.
              Discover various therapy services designed to help you find peace
              and balance in your life.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {therapies.slice(0, 6).map((therapy) => (
                <li key={therapy.id}>
                  <Link
                    href={`/therapies/${therapy.slug}`}
                    className="text-sm text-muted hover:text-primary transition-colors duration-300"
                  >
                    {therapy.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-muted hover:text-primary transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-sm text-muted hover:text-primary transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted hover:text-primary transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted hover:text-primary transition-colors duration-300">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted">
                  123 Wellness Street, Peace City, PC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-muted hover:text-primary transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a
                  href="mailto:info@sukoon.com"
                  className="text-sm text-muted hover:text-primary transition-colors duration-300"
                >
                  info@sukoon.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted">
            &copy; {currentYear} Sukoon. All rights reserved. Made with{' '}
            <span className="text-red-500">❤</span> for mental wellness.
          </p>
        </div>
      </div>
    </footer>
  );
}
