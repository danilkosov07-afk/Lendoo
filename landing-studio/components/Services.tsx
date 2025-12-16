'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getServicesData } from '@/lib/data'
import {
  LandingIcon,
  AnimationIcon,
  DataIcon,
  HeroIcon,
  InterfaceIcon,
  WebIcon,
} from './icons/ServiceIcons'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Лендинги': LandingIcon,
  'Анимированные интерфейсы': AnimationIcon,
  'Data-визуал': DataIcon,
  'Hero-блоки': HeroIcon,
  'Веб-приложения': InterfaceIcon,
  'Интерактивные решения': WebIcon,
}

function ServiceCard({ service, index }: { service: { title: string; description: string; icon: string }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.2 })
  const IconComponent = iconMap[service.title] || LandingIcon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05, 
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: '0 10px 40px rgba(79, 209, 197, 0.2)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
      }}
      whileTap={{ scale: 0.98, y: -8 }}
      className="relative p-6 sm:p-8 bg-surface rounded-2xl border border-surface hover:border-accent-primary/50 transition-all duration-300 group overflow-hidden cursor-pointer"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      {/* Subtle border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-accent-primary/0 group-hover:border-accent-primary/30 transition-colors duration-300"
        initial={false}
      />
      
      {/* Icon container */}
      <motion.div
        className="mb-4 sm:mb-6 text-accent-primary relative"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1, 
          y: 0,
        } : { opacity: 0, scale: 0.8, y: 20 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05 + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isInView ? {
            y: [0, -5, 0],
          } : {}}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2 + 1,
            },
          }}
        >
          <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 relative z-10" />
        </motion.div>
        {/* Subtle glow on icon */}
        <motion.div
          className="absolute inset-0 bg-accent-primary/20 blur-xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? {
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          } : { opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.6, delay: index * 0.15 + 0.3 },
            scale: { duration: 0.6, delay: index * 0.15 + 0.3 },
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut',
            delay: index * 0.15 + 1,
          }}
        />
      </motion.div>

      <motion.h3 
        className="font-heading text-h3 font-bold mb-3 sm:mb-4 text-foreground group-hover:text-accent-primary transition-colors duration-300 break-words"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15 + 0.3, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {service.title}
      </motion.h3>
      <motion.p 
        className="text-foreground-muted text-body leading-relaxed break-words"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15 + 0.4, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {service.description}
      </motion.p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15 + 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      />
    </motion.div>
  )
}

export default function Services() {
  const servicesData = getServicesData()

  return (
    <section id="услуги" className="relative py-20 sm:py-32 bg-background-alt">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px', amount: 0.2 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="font-heading text-h1 font-bold mb-6">
            <span className="gradient-text">{servicesData.title}</span>
          </h2>
          <p className="text-foreground-muted text-body-lg max-w-2xl mx-auto">
            {servicesData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.items.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

