'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getBenefitsData } from '@/lib/data'

function StatCard({ stat, index }: { stat: { value: string; label: string; description: string }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -8, 
        scale: 1.02, 
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="relative p-6 bg-surface rounded-xl border border-surface hover:border-accent-primary/50 transition-all duration-300 group"
    >
      <motion.div
        className="font-heading text-h1 font-bold gradient-text mb-2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: 'backOut' }}
      >
        {stat.value}
      </motion.div>
      <h3 className="font-heading text-h4 font-semibold mb-2 text-foreground group-hover:text-accent-primary transition-colors">
        {stat.label}
      </h3>
      <p className="text-foreground-muted text-body-sm">
        {stat.description}
      </p>
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    </motion.div>
  )
}

function FactCard({ fact, index }: { fact: { title: string; description: string; highlight: string }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-6 bg-surface/50 rounded-xl border border-surface/50"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-heading text-h4 font-semibold text-foreground flex-1">
          {fact.title}
        </h3>
        <motion.span
          className="px-3 py-1 bg-accent-primary/20 text-accent-primary font-heading text-caption font-bold rounded-full whitespace-nowrap"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3, ease: 'backOut' }}
        >
          {fact.highlight}
        </motion.span>
      </div>
      <p className="text-foreground-muted text-body leading-relaxed">
        {fact.description}
      </p>
    </motion.div>
  )
}

function MiniCase({ miniCase, index }: { miniCase: { title: string; result: string; period: string }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-6 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-xl border border-accent-primary/20"
    >
      <h4 className="font-heading text-body-lg font-semibold mb-2 text-foreground">
        {miniCase.title}
      </h4>
      <p className="font-heading text-h3 font-bold gradient-text mb-1">
        {miniCase.result}
      </p>
      <p className="text-foreground-muted text-body-sm">
        {miniCase.period}
      </p>
    </motion.div>
  )
}

export default function Benefits() {
  const benefitsData = getBenefitsData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-h1 font-bold mb-6">
            <span className="gradient-text">{benefitsData.title}</span>
          </h2>
          <p className="text-foreground-muted text-body-lg max-w-2xl mx-auto">
            {benefitsData.subtitle}
          </p>
        </motion.div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {benefitsData.stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Факты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefitsData.facts.map((fact, index) => (
            <FactCard key={fact.title} fact={fact} index={index} />
          ))}
        </div>

        {/* Мини-кейсы */}
        {benefitsData.miniCases && benefitsData.miniCases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-heading text-h2 font-bold mb-8 text-center">
              <span className="gradient-text">Результаты</span> наших клиентов
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefitsData.miniCases.map((miniCase, index) => (
                <MiniCase key={miniCase.title} miniCase={miniCase} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

