'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface AboutProps {
  title?: string;
  description?: string;
  teamImage?: string;
  className?: string;
}

export function About({
  title = 'About Sukoon',
  description = 'Sukoon is a mental health and wellness platform dedicated to providing accessible stress-relief resources. We believe everyone deserves peace of mind and a stress-free life. Our platform offers various therapy services designed to help you find your inner calm and balance.',
  teamImage = '/images/about.jpg',
  className = ''
}: AboutProps): React.ReactElement {

  return (
    <section
      id="about"
      className={`section-spacing bg-surface ${className}`}
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={teamImage}
                alt="Sukoon Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Who We Are</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {title}
            </h2>
            
            <div className="space-y-4 text-lg text-muted leading-relaxed mb-8">
              {description.split('\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center p-4 glass rounded-xl shadow-md"
              >
                <div className="text-3xl font-bold text-primary">9+</div>
                <div className="text-sm text-muted mt-1">Therapies</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center p-4 glass rounded-xl shadow-md"
              >
                <div className="text-3xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted mt-1">Available</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center p-4 glass rounded-xl shadow-md"
              >
                <div className="text-3xl font-bold text-accent">Free</div>
                <div className="text-sm text-muted mt-1">Access</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
