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

function CaseCardWrapper({ 
  caseItem, 
  index
}: { 
  caseItem: any
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.2 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 50,
      }}
      transition={{ 
        opacity: { duration: 0.4, delay: index * 0.05 },
        y: { duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
      }}
      className="h-full"
    >
      <Suspense fallback={<CaseCardSkeleton />}>
        <CaseCard caseItem={caseItem} index={index} />
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
      <section id="работы" ref={ref} className="relative py-20 sm:py-32 bg-background">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="font-heading text-h1 font-bold mb-6">
              <span className="gradient-text">{casesData.title}</span>
            </h2>
            <p className="text-foreground-muted text-body-lg max-w-2xl mx-auto break-words">
              {casesData.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch overflow-visible">
            {casesData.items.map((caseItem, index) => (
              <div key={caseItem.id} className="relative overflow-visible">
                <CaseCardWrapper 
                  caseItem={caseItem} 
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

