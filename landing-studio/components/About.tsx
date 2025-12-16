'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getAboutData } from '@/lib/data'

function StatItem({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <motion.div
        className="font-heading text-h2 sm:text-h1 font-bold gradient-text mb-2 break-words"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: 'backOut' }}
      >
        {stat.value}
      </motion.div>
      <motion.div
        className="text-foreground-muted text-body-lg break-words"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
      >
        {stat.label}
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const aboutData = getAboutData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.2 })

  return (
    <section id="о-нас" ref={ref} className="relative py-20 sm:py-32 bg-background">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="font-heading text-h1 font-bold mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <span className="gradient-text">{aboutData.title.highlight}</span>{' '}
              <span className="text-foreground">{aboutData.title.text}</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-4 mb-8"
            >
              {aboutData.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-foreground-muted text-body-lg leading-relaxed break-words"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.a
              href={aboutData.cta.href}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                boxShadow: [
                  '0 0 15px rgba(79, 209, 197, 0.2)',
                  '0 0 25px rgba(79, 209, 197, 0.3)',
                  '0 0 15px rgba(79, 209, 197, 0.2)',
                ],
              } : { opacity: 0, y: 20 }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.3 },
                y: { duration: 0.6, delay: 0.3 },
                scale: { duration: 0.15, ease: 'easeOut' },
                x: { duration: 0.15, ease: 'easeOut' },
                boxShadow: {
                  default: { duration: 0.15, ease: 'easeOut' },
                  animate: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  },
                },
              }}
              whileHover={{ 
                scale: 1.05, 
                x: 5,
                boxShadow: '0 0 30px rgba(79, 209, 197, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-2 px-8 py-4 border-2 border-accent-primary text-accent-primary font-heading font-semibold rounded-lg hover:bg-accent-primary hover:text-background group overflow-hidden"
            >
              <span className="relative z-10">{aboutData.cta.text}</span>
              <motion.svg
                className="w-5 h-5 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
              {/* Subtle glow */}
              <motion.div
                className="absolute -inset-1 bg-accent-primary rounded-lg blur-md opacity-20"
                animate={isInView ? {
                  opacity: [0.15, 0.3, 0.15],
                } : {}}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.a>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
            >
            {aboutData.stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

