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

export default function CaseCard({ caseItem }: { caseItem: CaseItem }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full flex flex-col p-8 bg-surface rounded-2xl border border-surface hover:border-accent-primary/50 transition-all duration-300 group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-surface-muted/20">
        <Image
          src={caseItem.image || '/placeholder-case.jpg'}
          alt={caseItem.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Category */}
      <span className="inline-block px-3 py-1 bg-accent-primary/20 text-accent-primary text-caption font-heading font-semibold rounded-full mb-4">
        {caseItem.category}
      </span>

      {/* Title */}
      <h3 className="font-heading text-h3 font-bold mb-3 text-foreground group-hover:text-accent-primary transition-colors">
        {caseItem.title}
      </h3>

      {/* Description */}
      <p className="text-foreground-muted text-body mb-6 leading-relaxed flex-grow">
        {caseItem.userDescription || caseItem.description}
      </p>

      {/* Metrics */}
      {caseItem.metrics && (
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(caseItem.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="font-heading text-h4 font-bold gradient-text">
                {value}
              </div>
              <div className="text-foreground-muted text-body-sm capitalize">
                {key}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits */}
      {caseItem.benefits && caseItem.benefits.length > 0 && (
        <div className="mb-6">
          <p className="text-foreground-muted text-body-sm mb-3">Преимущества:</p>
          <ul className="space-y-2">
            {caseItem.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-foreground-muted text-body-sm">
                <span className="text-accent-primary mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {caseItem.tags && caseItem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {caseItem.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-surface text-foreground-muted text-body-sm rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {caseItem.cta && (
        <motion.a
          href={caseItem.cta.href}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full mt-auto px-6 py-3 bg-accent-primary text-background font-heading font-semibold rounded-lg text-center hover:bg-accent-secondary transition-colors"
        >
          {caseItem.cta.text}
        </motion.a>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </motion.div>
  )
}

