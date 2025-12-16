import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        'background-alt': 'var(--background-alt)',
        foreground: 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          'primary-dark': 'var(--accent-primary-dark)',
          'secondary-dark': 'var(--accent-secondary-dark)',
        },
        surface: 'var(--surface)',
        'surface-muted': 'var(--surface-muted)',
        border: 'var(--border)',
        'border-muted': 'var(--border-muted)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw + 1rem, 5rem)',
        'display': 'clamp(3rem, 6vw + 1rem, 6rem)',
        'h1': 'clamp(2rem, 4vw + 0.5rem, 3.5rem)',
        'h2': 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)',
        'h3': 'clamp(1.5rem, 2.5vw + 0.5rem, 2rem)',
        'h4': 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)',
        'body-lg': 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)',
        'body': 'clamp(1rem, 1vw + 0.5rem, 1.125rem)',
        'body-sm': 'clamp(0.875rem, 0.8vw + 0.5rem, 1rem)',
        'caption': 'clamp(0.75rem, 0.6vw + 0.5rem, 0.875rem)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      blur: {
        'xs': '2px',
        '4xl': '72px',
        '5xl': '96px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(79, 209, 197, 0.2)',
        'glow': '0 0 20px rgba(79, 209, 197, 0.3)',
        'glow-md': '0 0 30px rgba(79, 209, 197, 0.4)',
        'glow-lg': '0 0 40px rgba(79, 209, 197, 0.5)',
        'glow-xl': '0 0 60px rgba(79, 209, 197, 0.6)',
        'glow-blue-sm': '0 0 10px rgba(56, 189, 248, 0.2)',
        'glow-blue': '0 0 20px rgba(56, 189, 248, 0.3)',
        'glow-blue-md': '0 0 30px rgba(56, 189, 248, 0.4)',
        'glow-blue-lg': '0 0 40px rgba(56, 189, 248, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(79, 209, 197, 0.1)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, var(--surface) 1px, transparent 1px), linear-gradient(to bottom, var(--surface) 1px, transparent 1px)',
        'grid-pattern-dense': 'linear-gradient(to right, var(--surface) 1px, transparent 1px), linear-gradient(to bottom, var(--surface) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
      },
      backgroundSize: {
        'grid': '4rem 4rem',
        'grid-sm': '2rem 2rem',
        'grid-lg': '6rem 6rem',
        'grid-xl': '8rem 8rem',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(79, 209, 197, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(79, 209, 197, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config

