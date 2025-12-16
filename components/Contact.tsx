'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getContactData } from '@/lib/data'
import ContactForm from './ContactForm'
import { TelegramIcon } from './svg/SocialIcons'

export default function Contact() {
  const contactData = getContactData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="контакты" ref={ref} className="relative py-32 bg-background-alt">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-h1 font-bold mb-6">
            <span className="gradient-text">{contactData.title}</span>
          </h2>
          <p className="text-foreground-muted text-body-lg max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-h3 font-semibold mb-6 text-foreground">
                Свяжитесь с нами
              </h3>
              
              <div className="space-y-6">
                <motion.a
                  href={contactData.email.href}
                  whileHover={{ x: 5, color: 'var(--accent-primary)' }}
                  className="flex items-center gap-4 text-foreground-muted hover:text-accent-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body-sm text-foreground-muted mb-1">{contactData.email.label}</p>
                    <p className="text-body font-medium">{contactData.email.value}</p>
                  </div>
                </motion.a>

                <motion.a
                  href={contactData.phone.href}
                  whileHover={{ x: 5, color: 'var(--accent-primary)' }}
                  className="flex items-center gap-4 text-foreground-muted hover:text-accent-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body-sm text-foreground-muted mb-1">{contactData.phone.label}</p>
                    <p className="text-body font-medium">{contactData.phone.value}</p>
                  </div>
                </motion.a>
              </div>

              {/* Кнопка Telegram */}
              <div className="mt-8 pt-8 border-t border-surface">
                <p className="text-foreground-muted text-body-sm mb-4">Написать в Telegram</p>
                <motion.a
                  href="https://t.me/Mmmmogme"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/30 hover:border-accent-primary/50 text-accent-primary font-heading font-semibold rounded-lg transition-all group min-h-[48px]"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center group-hover:bg-accent-primary/30 transition-colors">
                    <TelegramIcon className="w-5 h-5" color="currentColor" />
                  </div>
                  <span>Написать в Telegram</span>
                  <svg className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Форма */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-surface/50 p-8 rounded-2xl border border-surface"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


