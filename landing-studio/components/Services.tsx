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
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const IconComponent = iconMap[service.title] || LandingIcon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -12, 
        scale: 1.02, 
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="relative p-8 bg-surface rounded-2xl border border-surface hover:border-accent-primary/50 transition-all duration-300 group overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      {/* Icon container */}
      <motion.div
        className="mb-6 text-accent-primary"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <IconComponent className="w-12 h-12" />
      </motion.div>

      <h3 className="font-heading text-h3 font-bold mb-4 text-foreground group-hover:text-accent-primary transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-foreground-muted text-body leading-relaxed">
        {service.description}
      </p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      />
    </motion.div>
  )
}

export default function Services() {
  const servicesData = getServicesData()

  return (
    <section id="услуги" className="relative py-32 bg-background-alt">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-h1 font-bold mb-6">
            <span className="gradient-text">{servicesData.title}</span>
          </h2>
          <p className="text-foreground-muted text-body-lg max-w-2xl mx-auto">
            {servicesData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.items.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

