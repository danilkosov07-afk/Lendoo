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
          className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 transition-all min-h-[48px] ${
            errors.name
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-surface-muted focus:border-accent-primary focus:ring-accent-primary/50'
          }`}
          placeholder="Ваше имя"
          whileFocus={{ scale: 1.01 }}
          style={{ fontSize: '16px' }} // Предотвращает zoom на iOS
          autoComplete="name"
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
          className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 transition-all min-h-[48px] ${
            errors.contact
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-surface-muted focus:border-accent-primary focus:ring-accent-primary/50'
          }`}
          placeholder="email@example.com или @telegram"
          whileFocus={{ scale: 1.01 }}
          style={{ fontSize: '16px' }} // Предотвращает zoom на iOS
          inputMode="email"
          autoComplete="email"
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
          className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 transition-all resize-none min-h-[120px] ${
            errors.message
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-surface-muted focus:border-accent-primary focus:ring-accent-primary/50'
          }`}
          placeholder="Расскажите о вашем проекте..."
          whileFocus={{ scale: 1.01 }}
          style={{ fontSize: '16px' }} // Предотвращает zoom на iOS
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
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-green-500 text-background font-heading font-semibold rounded-lg min-h-[48px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Отправлено
            </span>
          </motion.div>
        ) : (
          <motion.button
            key="submit-button"
            type="submit"
            disabled={isSubmitting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            transition={{
              scale: { duration: 0.15, ease: 'easeOut' },
            }}
            className={`w-full px-6 sm:px-8 py-3 sm:py-4 bg-accent-primary text-background font-heading font-semibold rounded-lg min-h-[48px] flex items-center justify-center ${
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
            ) : (
              'Отправить сообщение'
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Статус отправки */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 sm:p-5 bg-green-500/20 border-2 border-green-500/50 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <div className="flex-1">
                <h4 className="text-green-400 font-heading font-bold text-body mb-1">
                  Заявка отправлена ✅
                </h4>
                <p className="text-green-300 text-body-sm leading-relaxed">
                  Я получил ваше сообщение и скоро свяжусь с вами.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 sm:p-5 bg-red-500/20 border-2 border-red-500/50 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>
              <div className="flex-1">
                <h4 className="text-red-400 font-heading font-bold text-body mb-1">
                  Ошибка отправки
                </h4>
                <p className="text-red-300 text-body-sm leading-relaxed">
                  Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь со мной напрямую через Telegram.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

