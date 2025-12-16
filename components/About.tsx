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
        className="font-heading text-h1 font-bold gradient-text mb-2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: 'backOut' }}
      >
        {stat.value}
      </motion.div>
      <motion.div
        className="text-foreground-muted text-body-lg"
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
  const isInView = useInView(ref, { once: true, margin: '-150px' })

  return (
    <section id="о-нас" ref={ref} className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="font-heading text-h1 font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="gradient-text">{aboutData.title.highlight}</span>{' '}
              <span className="text-foreground">{aboutData.title.text}</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              {aboutData.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-foreground-muted text-body-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.a
              href={aboutData.cta.href}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, x: 5, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent-primary text-accent-primary font-heading font-semibold rounded-lg transition-all duration-300 hover:bg-accent-primary hover:text-background group"
            >
              {aboutData.cta.text}
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-8"
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

