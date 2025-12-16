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

// Social - Email Icon
export function EmailIcon({ className = 'w-5 h-5', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 6L12 13L2 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Social - Phone Icon
export function PhoneIcon({ className = 'w-5 h-5', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22 16.92V19.92C22 20.98 21.1 21.92 20.04 22.02C19.5 22.05 19 22 18.5 21.87C9.5 19.87 4.13 14.5 2.13 5.5C2 5 1.95 4.5 1.98 3.96C2.08 2.9 3.02 2 4.08 2H7.08C8.18 2 9.08 2.9 9.18 4L9.58 8.5C9.58 9.55 8.73 10.4 7.68 10.5L5.58 10.8C6.88 14.3 9.7 17.12 13.2 18.42L13.5 16.32C13.6 15.27 14.45 14.42 15.5 14.42L20 14.82C21.1 14.92 22 15.82 22 16.92Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

