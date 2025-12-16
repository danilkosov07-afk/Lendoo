'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getCTAData } from '@/lib/data'

export default function CTA() {
  const ctaData = getCTAData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-heading text-h1 md:text-display font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="gradient-text">{ctaData.title}</span>
          </motion.h2>
          
          <motion.p
            className="text-foreground-muted text-body-lg md:text-h4 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {ctaData.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href={ctaData.buttons.primary.href}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 40px rgba(79, 209, 197, 0.6)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 bg-accent-primary text-background font-heading font-bold text-body-lg rounded-lg transition-all duration-300 hover:bg-accent-secondary overflow-hidden group"
            >
              <span className="relative z-10">{ctaData.buttons.primary.text}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
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
              className="px-10 py-5 border-2 border-foreground-muted/30 text-foreground font-heading font-semibold text-body-lg rounded-lg transition-all duration-300 hover:border-accent-primary hover:text-accent-primary"
            >
              {ctaData.buttons.secondary.text}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

