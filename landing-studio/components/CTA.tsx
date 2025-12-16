'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getCTAData } from '@/lib/data'

export default function CTA() {
  const ctaData = getCTAData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.2 })

  return (
    <section ref={ref} className="relative py-20 sm:py-32 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent" />
      {/* Animated glow background */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-accent-primary/10 via-transparent to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="font-heading text-h1 md:text-display font-bold mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="gradient-text">{ctaData.title}</span>
          </motion.h2>
          
          <motion.p
            className="text-foreground-muted text-body-lg md:text-h4 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {ctaData.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto"
          >
            <motion.a
              href={ctaData.buttons.primary.href}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 50px rgba(79, 209, 197, 0.7), 0 0 100px rgba(79, 209, 197, 0.4)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 25px rgba(79, 209, 197, 0.5)',
                  '0 0 40px rgba(79, 209, 197, 0.6)',
                  '0 0 25px rgba(79, 209, 197, 0.5)',
                ],
              }}
              transition={{
                scale: { duration: 0.15, ease: 'easeOut' },
                y: { duration: 0.15, ease: 'easeOut' },
                boxShadow: {
                  default: { duration: 0.15, ease: 'easeOut' },
                  animate: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                },
              }}
              className="relative w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 bg-accent-primary text-background font-heading font-bold text-body sm:text-body-lg rounded-lg hover:bg-accent-secondary overflow-hidden group min-h-[48px] flex items-center justify-center"
            >
              <span className="relative z-10 whitespace-nowrap">{ctaData.buttons.primary.text}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              {/* Enhanced glow effect */}
              <motion.div
                className="absolute -inset-2 bg-accent-primary rounded-lg blur-2xl opacity-40"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.a>
            
            <motion.a
              href={ctaData.buttons.secondary.href}
              whileHover={{ 
                scale: 1.05,
                borderColor: 'var(--accent-primary)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                scale: { duration: 0.15, ease: 'easeOut' },
                y: { duration: 0.15, ease: 'easeOut' },
              }}
              className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 border-2 border-foreground-muted/30 text-foreground font-heading font-semibold text-body sm:text-body-lg rounded-lg hover:border-accent-primary hover:text-accent-primary min-h-[48px] flex items-center justify-center"
            >
              <span className="whitespace-nowrap">{ctaData.buttons.secondary.text}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

