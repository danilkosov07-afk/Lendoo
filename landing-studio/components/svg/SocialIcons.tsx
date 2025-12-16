'use client'

interface IconProps {
  className?: string
  color?: string
}

// Social - Telegram Icon (оригинальный стиль Telegram)
export function TelegramIcon({ className = 'w-5 h-5', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Круглый фон */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Telegram самолетик - оригинальный стиль */}
      <path
        d="M6.5 12.5L11.5 11L16.5 7.5C17 7.2 17.5 7.4 17.3 8L15.5 16.5C15.3 17.2 14.8 17.3 14.3 17L11.5 14.5L10 16L7.5 16.5C7 16.6 6.5 16.2 6.7 15.7L6.5 12.5Z"
        fill={color}
      />
      <path
        d="M6.5 12.5L11.5 11L15.5 7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// Social - WhatsApp Icon (оригинальный стиль WhatsApp)
export function WhatsAppIcon({ className = 'w-5 h-5', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Круглый фон */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* WhatsApp телефон - упрощенная версия */}
      <path
        d="M9 7H15C15.6 7 16 7.4 16 8V16C16 16.6 15.6 17 15 17H9C8.4 17 8 16.6 8 16V8C8 7.4 8.4 7 9 7Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Точки сообщения (характерные для WhatsApp) */}
      <circle
        cx="11"
        cy="11"
        r="1"
        fill={color}
      />
      <circle
        cx="13"
        cy="11"
        r="1"
        fill={color}
      />
      <circle
        cx="12"
        cy="13"
        r="1"
        fill={color}
      />
      {/* Галочка (характерная для WhatsApp) */}
      <path
        d="M9 10L11 12L15 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}


