'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, lazy, Suspense } from 'react'
import { getCasesData } from '@/lib/data'

// Lazy loading для тяжелых компонентов
const CaseCard = lazy(() => import('./CaseCard'))

function CaseCardSkeleton() {
  return (
    <div className="relative p-8 bg-surface rounded-2xl border border-surface animate-pulse">
      <div className="h-48 bg-surface-muted/20 rounded-lg mb-4" />
      <div className="h-6 bg-surface-muted/20 rounded mb-2" />
      <div className="h-4 bg-surface-muted/20 rounded w-3/4" />
    </div>
  )
}

function CaseCardWrapper({ caseItem, index }: { caseItem: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Suspense fallback={<CaseCardSkeleton />}>
        <CaseCard caseItem={caseItem} />
      </Suspense>
    </motion.div>
  )
}

export default function Cases() {
  const casesData = getCasesData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  if (!casesData.items || casesData.items.length === 0) {
    return null
  }

  return (
    <section id="работы" ref={ref} className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-h1 font-bold mb-6">
            <span className="gradient-text">{casesData.title}</span>
          </h2>
          <p className="text-foreground-muted text-body-lg max-w-2xl mx-auto">
            {casesData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {casesData.items.map((caseItem, index) => (
            <CaseCardWrapper key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

