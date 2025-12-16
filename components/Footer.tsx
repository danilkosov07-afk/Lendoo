'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getFooterData } from '@/lib/data'
import { TelegramIcon } from './svg/SocialIcons'

export default function Footer() {
  const footerData = getFooterData()
  const currentYear = new Date().getFullYear()
  const copyright = footerData.copyright.replace('{year}', currentYear.toString())
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer ref={ref} className="relative py-16 bg-background border-t border-surface overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Логотип и описание */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <motion.h3
              className="font-heading text-h2 font-bold gradient-text mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {footerData.logo}
            </motion.h3>
            {footerData.tagline && (
              <p className="text-foreground-muted text-body mb-6 max-w-md">
                {footerData.tagline}
              </p>
            )}
          </motion.div>

          {/* Навигация */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-body-lg font-semibold mb-4 text-foreground">
              Навигация
            </h4>
            <nav className="flex flex-col gap-3">
              {footerData.links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 5, color: 'var(--accent-primary)' }}
                  className="text-foreground-muted text-body hover:text-accent-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Социальные сети */}
          {footerData.social && footerData.social.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-heading text-body-lg font-semibold mb-4 text-foreground">
                Социальные сети
              </h4>
              <div className="flex flex-col gap-3">
                {footerData.social.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    whileHover={{ x: 5, color: 'var(--accent-primary)' }}
                    className="flex items-center gap-3 text-foreground-muted text-body hover:text-accent-primary transition-colors group"
                  >
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {social.icon === 'telegram' && (
                        <TelegramIcon className="w-5 h-5" color="currentColor" />
                      )}
                    </motion.div>
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Копирайт */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-surface flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-foreground-muted text-body-sm text-center md:text-left">
            {copyright}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

