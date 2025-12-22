'use client';

import { motion } from 'framer-motion';
import { TeamMember } from '@/types';
import Image from 'next/image';
import { FaGlobe, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export interface TeamMembersProps {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const socialIcons = {
  website: FaGlobe,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export function TeamMembers({
  members,
  title = 'Meet Our Team',
  subtitle = 'Dedicated individuals working to make mental wellness accessible to everyone',
  className = ''
}: TeamMembersProps): React.ReactElement {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="team" className={`section-spacing bg-surface ${className}`}>
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
            <span className="text-sm font-medium text-primary">Our Team</span>
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

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className="group"
            >
              <div className="card-premium overflow-hidden">
                {/* Image */}
                <div className="relative h-64 -m-6 mb-6 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium">
                    {member.role}
                  </p>
                  
                  {member.bio && (
                    <p className="text-muted text-sm line-clamp-2">
                      {member.bio}
                    </p>
                  )}

                  {/* Social Links */}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="flex gap-2 pt-2">
                      {member.socialLinks.map((link, index) => {
                        const Icon = socialIcons[link.platform] || FaGlobe;
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-lg glass hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            aria-label={`${member.name}'s ${link.platform}`}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
