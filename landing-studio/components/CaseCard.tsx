'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CaseItem {
  id: string
  title: string
  category: string
  description: string
  userDescription?: string
  image: string
  metrics?: Record<string, string>
  tags?: string[]
  benefits?: string[]
  cta?: {
    text: string
    href: string
  }
}

export default function CaseCard({ 
  caseItem, 
  index
}: { 
  caseItem: CaseItem
  index: number
}) {
  return (
    <div className="relative group/card">
      {/* Основная карточка */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative p-4 sm:p-5 bg-surface rounded-xl border border-surface hover:border-accent-primary/50 transition-all duration-300 group overflow-hidden h-full flex flex-col"
        style={{ willChange: 'transform' }}
      >
      {/* Image - всегда видима */}
      <div className="relative h-32 sm:h-36 md:h-40 mb-4 rounded-lg overflow-hidden bg-surface-muted/20 flex-shrink-0">
        <Image
          src={caseItem.image || '/placeholder-case.jpg'}
          alt={caseItem.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
          style={{ 
            objectFit: 'cover', 
            objectPosition: 'center',
            width: '100%',
            height: '100%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      </div>

      {/* Category и Title - всегда видимы */}
      <div className="flex-shrink-0 mb-3">
        <span className="inline-block px-2 py-0.5 bg-accent-primary/20 text-accent-primary text-caption font-heading font-semibold rounded-full mb-2">
          {caseItem.category}
        </span>
        <h3 className="font-heading text-body sm:text-body-lg font-bold text-foreground group-hover:text-accent-primary transition-colors break-words">
          {caseItem.title}
        </h3>
      </div>

      {/* Основной контент */}
      <div className="flex flex-col flex-grow min-h-0">
        {/* Description */}
        <p 
          className="text-foreground-muted text-body-sm mb-3 leading-relaxed break-words"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5rem',
          }}
        >
          {caseItem.userDescription || caseItem.description}
        </p>

        {/* Metrics - фиксированная высота для выравнивания */}
        <div className="min-h-[60px] mb-3 flex-shrink-0">
          {caseItem.metrics && (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {Object.entries(caseItem.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="font-heading text-body sm:text-body-lg font-bold gradient-text break-words">
                    {value}
                  </div>
                  <div className="text-foreground-muted text-caption capitalize break-words">
                    {key}
                  </div>
                </div>
              ))}
              {/* Заполнитель для карточек с меньшим количеством метрик */}
              {caseItem.metrics && Object.keys(caseItem.metrics).length < 3 && (
                <div className="flex-1" />
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        {caseItem.tags && caseItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3 flex-shrink-0">
            {caseItem.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-surface text-foreground-muted text-caption rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Benefits - всегда видимы снизу карточки */}
        {caseItem.benefits && caseItem.benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-auto pt-3 border-t border-surface-muted/30 flex-shrink-0"
          >
            <h4 className="font-heading text-body-sm font-bold mb-2 text-accent-primary break-words">
              Преимущества:
            </h4>
            <ul className="space-y-1.5">
              {caseItem.benefits.slice(0, 2).map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-1.5 text-foreground-muted text-body-sm leading-relaxed"
                >
                  <span className="text-accent-primary mt-0.5 flex-shrink-0 font-bold text-xs">✓</span>
                  <span className="break-words">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* CTA Button */}
        <div className="mt-3 flex-shrink-0">
          {caseItem.cta && (
            <motion.a
              href={caseItem.cta.href}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(79, 209, 197, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              transition={{
                scale: { duration: 0.15, ease: 'easeOut' },
                boxShadow: { duration: 0.15, ease: 'easeOut' },
              }}
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-accent-primary text-background font-heading font-semibold text-body-sm rounded-lg hover:bg-accent-secondary min-h-[40px] relative z-20"
              style={{ willChange: 'transform' }}
            >
              {caseItem.cta.text}
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      </motion.div>
    </div>
  )
}

