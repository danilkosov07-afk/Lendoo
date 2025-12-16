'use client'

interface SVGProps {
  className?: string
  color?: string
}

// Декоративная форма - Tech Grid Pattern
export function TechGridPattern({ className = 'w-full h-full', color = 'currentColor' }: SVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

// Декоративная форма - Hexagon Pattern
export function HexagonPattern({ className = 'w-full h-full', color = 'currentColor' }: SVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity="0.2">
        <path
          d="M50 25L75 12.5L100 25L100 50L75 62.5L50 50L50 25Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M125 25L150 12.5L175 25L175 50L150 62.5L125 50L125 25Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M87.5 75L112.5 62.5L137.5 75L137.5 100L112.5 112.5L87.5 100L87.5 75Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
      </g>
    </svg>
  )
}

// Декоративная форма - Circuit Lines
export function CircuitLines({ className = 'w-full h-full', color = 'currentColor' }: SVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity="0.15" stroke={color} strokeWidth="2" fill="none">
        <path d="M50 50H150V150H50V50Z" />
        <path d="M250 50H350V150H250V50Z" />
        <path d="M50 250H150V350H50V250Z" />
        <path d="M250 250H350V350H250V250Z" />
        <path d="M150 100H250" />
        <path d="M150 300H250" />
        <path d="M100 150V250" />
        <path d="M300 150V250" />
        <circle cx="150" cy="100" r="3" fill={color} />
        <circle cx="250" cy="100" r="3" fill={color} />
        <circle cx="150" cy="300" r="3" fill={color} />
        <circle cx="250" cy="300" r="3" fill={color} />
      </g>
    </svg>
  )
}

// Декоративная форма - Wave Pattern
export function WavePattern({ className = 'w-full h-full', color = 'currentColor' }: SVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M0 100C200 50 400 150 600 100C800 50 1000 150 1200 100V200H0V100Z"
        fill={color}
        opacity="0.05"
      />
      <path
        d="M0 120C200 70 400 170 600 120C800 70 1000 170 1200 120V200H0V120Z"
        fill={color}
        opacity="0.03"
      />
    </svg>
  )
}

// Декоративная форма - Tech Orbs
export function TechOrbs({ className = 'w-full h-full', color = 'currentColor' }: SVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity="0.2">
        <circle cx="75" cy="75" r="30" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="75" cy="75" r="20" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="75" cy="75" r="10" stroke={color} strokeWidth="0.5" fill="none" />
        
        <circle cx="225" cy="75" r="30" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="225" cy="75" r="20" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="225" cy="75" r="10" stroke={color} strokeWidth="0.5" fill="none" />
        
        <circle cx="150" cy="225" r="30" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="150" cy="225" r="20" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="150" cy="225" r="10" stroke={color} strokeWidth="0.5" fill="none" />
        
        <path d="M75 75L150 225" stroke={color} strokeWidth="1" opacity="0.3" />
        <path d="M225 75L150 225" stroke={color} strokeWidth="1" opacity="0.3" />
      </g>
    </svg>
  )
}

// Декоративная форма - Corner Brackets
export function CornerBrackets({ className = 'w-full h-full', color = 'currentColor' }: SVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke={color} strokeWidth="2" fill="none" opacity="0.3">
        {/* Top-left corner */}
        <path d="M20 20H40M20 20V40" />
        {/* Top-right corner */}
        <path d="M180 20H160M180 20V40" />
        {/* Bottom-left corner */}
        <path d="M20 180H40M20 180V160" />
        {/* Bottom-right corner */}
        <path d="M180 180H160M180 180V160" />
      </g>
    </svg>
  )
}


