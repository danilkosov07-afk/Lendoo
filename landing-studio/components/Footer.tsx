'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getFooterData } from '@/lib/data'

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
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      )}
                      {social.icon === 'behance' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.637 1.711 5.052 3H15.927c-.245-1.272-1.162-2.105-2.898-2.105-2.5 0-4.508 1.98-4.508 5.335 0 3.435 2.108 5.605 4.926 5.605 2.29 0 3.579-1.168 4.049-2.811h-4.547v-2.517h8.631c.05.309.075.612.075.91 0 2.299-1.187 3.694-3.574 3.694-2.008 0-3.25-1.04-3.852-2.201zm-7.894-6.354h5.256c-.059-1.196-.508-2.121-1.421-2.121-1.008 0-1.792.956-1.835 2.121zm-9.832 6.354h6.008v-2.629H5.833v2.629zm0-4.258h5.715v-2.558H5.833v2.558z"/>
                        </svg>
                      )}
                      {social.icon === 'github' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
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
          <p className="text-foreground-muted text-body-sm text-center md:text-right">
            Сделано с <span className="text-accent-primary">❤</span> для digital-будущего
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

