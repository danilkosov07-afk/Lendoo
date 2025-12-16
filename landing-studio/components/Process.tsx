'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
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
    <section ref={sectionRef} className="relative py-32 bg-background-alt">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-surface md:hidden" />
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary to-accent-secondary md:hidden origin-top"
            style={{ scaleY: pathLength }}
          />

          {/* Горизонтальная линия связи (для десктопа) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-surface -translate-y-1/2" />
          <motion.div
            className="hidden md:block absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary -translate-y-1/2 origin-left"
            style={{ scaleX: pathLength }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
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
  const stepProgress = useTransform(
    scrollProgress,
    [index / totalSteps, (index + 1) / totalSteps],
    [0, 1]
  )

  const opacity = useTransform(stepProgress, [0, 0.5, 1], [0.3, 1, 1])
  const scale = useTransform(stepProgress, [0, 0.5, 1], [0.8, 1, 1])
  const y = useTransform(stepProgress, [0, 0.5, 1], [30, 0, 0])

  return (
    <motion.div
      ref={stepRef}
      style={{ opacity, scale, y }}
      className="relative"
    >
      {/* Номер шага с анимацией */}
      <div className="flex items-start gap-6 md:flex-col md:items-center md:text-center">
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Круг с номером */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface border-2 border-accent-primary/30 flex items-center justify-center relative z-10 hover:border-accent-primary transition-colors">
            <motion.span
              className="font-heading text-h3 md:text-h2 font-bold gradient-text"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {step.number}
            </motion.span>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-accent-primary/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Контент */}
        <div className="flex-1 md:mt-6">
          <motion.h3
            className="font-heading text-h3 font-bold mb-3 text-foreground"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          >
            {step.title}
          </motion.h3>
          <motion.p
            className="text-foreground-muted text-body leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
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

