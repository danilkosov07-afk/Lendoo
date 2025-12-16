'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getHeaderData } from '@/lib/data'

export default function Header() {
  const headerData = getHeaderData()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  // Smooth scroll для якорных ссылок
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          const headerHeight = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-surface shadow-lg shadow-accent-primary/5'
          : 'bg-transparent backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-h3 font-bold gradient-text"
          >
            {headerData.logo}
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {headerData.nav.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-foreground-muted hover:text-accent-primary transition-colors font-body text-body min-h-[32px] flex items-center"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href={headerData.cta.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                boxShadow: [
                  '0 0 15px rgba(79, 209, 197, 0.3)',
                  '0 0 25px rgba(79, 209, 197, 0.4)',
                  '0 0 15px rgba(79, 209, 197, 0.3)',
                ],
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.4 },
                y: { duration: 0.6, delay: 0.4 },
                scale: { duration: 0.15, ease: 'easeOut' },
                boxShadow: {
                  default: { duration: 0.15, ease: 'easeOut' },
                  animate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                },
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(79, 209, 197, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 bg-accent-primary text-background font-heading font-semibold rounded-lg hover:bg-accent-secondary min-h-[44px] flex items-center justify-center overflow-hidden"
            >
              <span className="relative z-10">{headerData.cta.text}</span>
              {/* Subtle glow */}
              <motion.div
                className="absolute -inset-1 bg-accent-primary rounded-lg blur-md opacity-30"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.a>
          </div>

          <button
            className="md:hidden text-foreground p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6 space-y-4 pt-4"
          >
            {headerData.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-foreground-muted hover:text-accent-primary transition-colors py-3 min-h-[48px] flex items-center touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={headerData.cta.href}
              className="block w-full mt-4 px-6 py-3 bg-accent-primary text-background font-heading font-semibold rounded-lg hover:bg-accent-secondary text-center min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {headerData.cta.text}
            </a>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

