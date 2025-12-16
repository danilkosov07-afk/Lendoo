'use client'

interface IconProps {
  className?: string
  color?: string
}

// Hero - Rocket Icon
export function RocketIcon({ className = 'w-6 h-6', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 16V22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 19L12 22L15 19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Hero - Sparkle Icon
export function SparkleIcon({ className = 'w-6 h-6', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="4" cy="4" r="1.5" fill={color} opacity="0.8" />
      <circle cx="20" cy="4" r="1.5" fill={color} opacity="0.8" />
      <circle cx="4" cy="20" r="1.5" fill={color} opacity="0.8" />
      <circle cx="20" cy="20" r="1.5" fill={color} opacity="0.8" />
    </svg>
  )
}

// Hero - Arrow Down Icon
export function ArrowDownIcon({ className = 'w-6 h-6', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V20M12 20L6 14M12 20L18 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Hero - Play Icon
export function PlayIcon({ className = 'w-6 h-6', color = 'currentColor' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <path
        d="M10 8L16 12L10 16V8Z"
        fill={color}
      />
    </svg>
  )
}


