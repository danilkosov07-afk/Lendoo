'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getProcessData } from '@/lib/data'

export default function Process() {
  const processData = getProcessData()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Анимация прогресс-линии
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 bg-background-alt">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px', amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="font-heading text-h1 font-bold mb-6">
            <span className="gradient-text">{processData.title}</span>
          </h2>
          <p className="text-foreground-muted text-body-lg max-w-2xl mx-auto">
            {processData.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Вертикальная линия связи (для мобильных) */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-surface md:hidden" />
          <motion.div
            className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary to-accent-secondary md:hidden origin-top"
            style={{ scaleY: pathLength }}
          />
          {/* Glow on progress line mobile */}
          <motion.div
            className="absolute left-4 sm:left-8 top-0 bottom-0 h-1 w-0.5 bg-gradient-to-b from-accent-primary to-accent-secondary md:hidden origin-top blur-sm opacity-50"
            style={{ scaleY: pathLength }}
          />

          {/* Горизонтальная линия связи (для десктопа) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-surface -translate-y-1/2" />
          <motion.div
            className="hidden md:block absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary -translate-y-1/2 origin-left"
            style={{ scaleX: pathLength }}
          />
          {/* Glow on progress line */}
          <motion.div
            className="hidden md:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary -translate-y-1/2 origin-left blur-sm opacity-50"
            style={{ scaleX: pathLength }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 md:gap-4 relative">
            {processData.steps.map((step, index) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={index}
                totalSteps={processData.steps.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({
  step,
  index,
  totalSteps,
  scrollProgress,
}: {
  step: { number: string; title: string; description: string }
  index: number
  totalSteps: number
  scrollProgress: any
}) {
  const stepRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(stepRef, { once: true, margin: '-50px' })
  
  // Используем scrollProgress только для визуального эффекта, не для появления
  const stepProgress = useTransform(
    scrollProgress,
    [index / totalSteps, (index + 1) / totalSteps],
    [0, 1]
  )

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="relative"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Номер шага с анимацией */}
      <div className="flex items-start gap-4 sm:gap-6 md:flex-col md:items-center md:text-center">
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Круг с номером */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-surface border-2 border-accent-primary/30 flex items-center justify-center relative z-10 hover:border-accent-primary transition-colors">
            <motion.span
              className="font-heading text-body-lg sm:text-h3 md:text-h2 font-bold gradient-text relative z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 0.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              {step.number}
            </motion.span>
            {/* Enhanced glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-accent-primary/30 blur-xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? {
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              } : { opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.6, delay: index * 0.2 + 0.3 },
                scale: { duration: 0.6, delay: index * 0.2 + 0.3 },
                repeat: Infinity,
                duration: 2.5,
                ease: 'easeInOut',
                delay: index * 0.3 + 1,
              }}
              style={{ willChange: 'transform, opacity' }}
            />
            {/* Pulsing border glow */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent-primary/0"
              initial={{ borderColor: 'rgba(79, 209, 197, 0)' }}
              animate={isInView ? {
                borderColor: [
                  'rgba(79, 209, 197, 0)',
                  'rgba(79, 209, 197, 0.5)',
                  'rgba(79, 209, 197, 0)',
                ],
              } : { borderColor: 'rgba(79, 209, 197, 0)' }}
              transition={{
                borderColor: { duration: 0.6, delay: index * 0.2 + 0.3 },
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
                delay: index * 0.2 + 1,
              }}
            />
          </div>

          {/* Outer glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-accent-primary/10 blur-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? {
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            } : { opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.6, delay: index * 0.2 + 0.4 },
              scale: { duration: 0.6, delay: index * 0.2 + 0.4 },
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
              delay: index * 0.25 + 1,
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        </motion.div>

        {/* Контент */}
        <div className="flex-1 md:mt-6">
          <motion.h3
            className="font-heading text-h3 font-bold mb-4 sm:mb-5 text-foreground"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2 + 0.3, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {step.title}
          </motion.h3>
          <motion.p
            className="text-foreground-muted text-body leading-relaxed pt-2 sm:pt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2 + 0.4, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {step.description}
          </motion.p>
        </div>
      </div>

      {/* Стрелка связи (только для десктопа, кроме последнего) */}
      {index < totalSteps - 1 && (
        <div className="hidden md:block absolute top-10 left-full w-full h-0.5">
          <motion.svg
            className="absolute right-0 top-1/2 -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2 + 0.5, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-primary)" />
                <stop offset="100%" stopColor="var(--accent-secondary)" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>
      )}
    </motion.div>
  )
}

