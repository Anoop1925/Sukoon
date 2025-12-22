'use client';

import { motion } from 'framer-motion';
import { FAQItem } from '@/types';
import { Accordion } from '@/components/ui/Accordion';

export interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FAQ({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about our services',
  className = ''
}: FAQProps): React.ReactElement {
  const accordionItems = items.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer
  }));

  return (
    <section id="faq" className={`section-spacing bg-background ${className}`}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {items.length > 0 ? (
            <Accordion items={accordionItems} allowMultiple={false} />
          ) : (
            <div className="text-center text-muted py-12 glass rounded-2xl">
              No FAQs available at the moment.
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-muted mb-6">
              We're here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
