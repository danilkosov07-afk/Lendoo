'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, FormEvent } from 'react'

interface FormData {
  name: string
  contact: string
  message: string
}

interface FormErrors {
  name?: string
  contact?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateTelegram = (telegram: string): boolean => {
    const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/
    return telegramRegex.test(telegram)
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Email или Telegram обязательны'
    } else {
      const isEmail = formData.contact.includes('@')
      if (isEmail && !validateEmail(formData.contact)) {
        newErrors.contact = 'Введите корректный email'
      } else if (!isEmail && !validateTelegram(formData.contact)) {
        newErrors.contact = 'Введите корректный Telegram (например: @username)'
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Форма обратной связи',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        // Очищаем форму только после успешной отправки
        setTimeout(() => {
          setFormData({ name: '', contact: '', message: '' })
          setErrors({})
        }, 2000) // Очищаем через 2 секунды после показа success
      } else {
        setSubmitStatus('error')
        // Форма НЕ очищается при ошибке
      }
    } catch (error) {
      setSubmitStatus('error')
      // Форма НЕ очищается при ошибке
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Очищаем ошибку при вводе
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Имя */}
      <div>
        <label htmlFor="name" className="block text-foreground-muted text-body-sm mb-2 font-medium">
          Имя <span className="text-accent-primary">*</span>
        </label>
        <motion.input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 transition-all ${
            errors.name
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-surface-muted focus:border-accent-primary focus:ring-accent-primary/50'
          }`}
          placeholder="Ваше имя"
          whileFocus={{ scale: 1.01 }}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-body-sm text-red-500"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email / Telegram */}
      <div>
        <label htmlFor="contact" className="block text-foreground-muted text-body-sm mb-2 font-medium">
          Email или Telegram <span className="text-accent-primary">*</span>
        </label>
        <motion.input
          type="text"
          id="contact"
          value={formData.contact}
          onChange={(e) => handleChange('contact', e.target.value)}
          className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 transition-all ${
            errors.contact
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-surface-muted focus:border-accent-primary focus:ring-accent-primary/50'
          }`}
          placeholder="email@example.com или @telegram"
          whileFocus={{ scale: 1.01 }}
        />
        <AnimatePresence>
          {errors.contact && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-body-sm text-red-500"
            >
              {errors.contact}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Сообщение */}
      <div>
        <label htmlFor="message" className="block text-foreground-muted text-body-sm mb-2 font-medium">
          Сообщение <span className="text-accent-primary">*</span>
        </label>
        <motion.textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={5}
          className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-surface-muted focus:border-accent-primary focus:ring-accent-primary/50'
          }`}
          placeholder="Расскажите о вашем проекте..."
          whileFocus={{ scale: 1.01 }}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-body-sm text-red-500"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Кнопка отправки */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className={`w-full px-8 py-4 bg-accent-primary text-background font-heading font-semibold rounded-lg transition-all duration-300 ${
          isSubmitting
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-accent-secondary hover:shadow-lg hover:shadow-accent-primary/30'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </motion.svg>
            Отправка...
          </span>
        ) : submitStatus === 'success' ? (
          'Отправлено'
        ) : (
          'Отправить сообщение'
        )}
      </motion.button>

      {/* Статус отправки */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-body-sm flex items-center gap-2"
          >
            <span className="text-lg">✅</span>
            <span>Заявка отправлена ✅ Я получил ваше сообщение и скоро свяжусь с вами.</span>
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-body-sm flex items-center gap-2"
          >
            <span className="text-lg">❌</span>
            <span>Произошла ошибка при отправке. Попробуйте еще раз или свяжитесь через Telegram.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

