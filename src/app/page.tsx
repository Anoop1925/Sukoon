'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Hero } from '@/components/sections';
import { therapies, testimonials, teamMembers, faqItems } from '@/data';

// Lazy load heavy components with dynamic imports
const About = dynamic(() => import('@/components/sections/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="py-16 text-center">Loading...</div>
});

const Services = dynamic(() => import('@/components/sections/Services').then(mod => ({ default: mod.Services })), {
  loading: () => <div className="py-16 text-center">Loading...</div>
});

const TeamMembers = dynamic(() => import('@/components/sections/TeamMembers').then(mod => ({ default: mod.TeamMembers })), {
  loading: () => <div className="py-16 text-center">Loading...</div>
});

const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="py-16 text-center">Loading...</div>
});

const FAQ = dynamic(() => import('@/components/sections/FAQ').then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="py-16 text-center">Loading...</div>
});

/**
 * Home page component
 * 
 * Integrates all main sections:
 * - Hero section with animated title and CTA
 * - About section with team photo
 * - Services section with therapy cards
 * - Team members section
 * - Testimonials carousel
 * - FAQ accordion
 * 
 * Uses Framer Motion for scroll animations
 */
export default function Home() {
  // Animation variants for sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <>
      {/* Hero Section - No animation wrapper needed as Hero has its own animations */}
      <Hero />

      {/* About Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <About />
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <Services services={therapies} />
      </motion.div>

      {/* Team Members Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <TeamMembers members={teamMembers} />
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <Testimonials testimonials={testimonials} />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <FAQ items={faqItems} />
      </motion.div>
    </>
  );
}
