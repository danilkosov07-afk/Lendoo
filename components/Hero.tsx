'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getHeroData } from '@/lib/data'
import HeroBackground from './HeroBackground'

export default function Hero() {
  const heroData = getHeroData()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Параллакс для контента
  const contentY = useTransform(scrollY, [0, 500], [0, 150])
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Анимированный фон с поддержкой WebGL/Canvas */}
      <HeroBackground mousePosition={mousePosition} />

      {/* Контент с параллаксом */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge с эффектом появления */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <motion.p
              className="text-accent-primary font-heading text-body-lg tracking-wider uppercase inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative">
                {heroData.badge}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </motion.p>
          </motion.div>

          {/* Заголовок с эффектной анимацией */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-hero font-bold mb-8 leading-[1.1]"
          >
            <motion.span
              className="gradient-text block mb-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              {heroData.title.highlight}
            </motion.span>
            <motion.span
              className="text-foreground block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            >
              {heroData.title.text}
            </motion.span>
          </motion.h1>

          {/* Подзаголовок с УТП */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
            className="text-foreground-muted text-body-lg max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {heroData.subtitle}
          </motion.p>

          {/* CTA кнопки с улучшенными эффектами */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 sm:mb-20"
          >
            <motion.a
              href={heroData.cta.primary.href}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 40px rgba(79, 209, 197, 0.5)',
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-10 py-5 bg-accent-primary text-background font-heading font-semibold rounded-lg transition-all duration-300 hover:bg-accent-secondary overflow-hidden group"
            >
              <span className="relative z-10">{heroData.cta.primary.text}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.a>
            
            <motion.a
              href={heroData.cta.secondary.href}
              whileHover={{ 
                scale: 1.05,
                borderColor: 'var(--accent-primary)',
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-10 py-5 border-2 border-surface text-foreground font-heading font-semibold rounded-lg transition-all duration-300 hover:border-accent-primary hover:text-accent-primary group overflow-hidden"
            >
              <span className="relative z-10">{heroData.cta.secondary.text}</span>
              <motion.div
                className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.a>
          </motion.div>

          {/* Индикатор скролла с улучшенной анимацией (под кнопками) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
          >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-6 h-10 border-2 border-foreground-muted/50 rounded-full flex justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1.5 h-1.5 bg-accent-primary rounded-full"
              />
            </div>
            <motion.p
              className="text-foreground-muted text-caption uppercase tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Scroll
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

