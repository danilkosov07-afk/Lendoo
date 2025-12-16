'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number }
}

export default function HeroBackground({ mousePosition }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isWebGLSupported, setIsWebGLSupported] = useState(false)
  const { scrollY } = useScroll()
  const parallaxOffset = useTransform(scrollY, [0, 500], [0, 250])
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    const unsubscribe = parallaxOffset.on('change', (latest) => {
      setParallaxValue(latest)
    })
    return () => unsubscribe()
  }, [parallaxOffset])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Проверка поддержки WebGL
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      setIsWebGLSupported(false)
      return
    }

    setIsWebGLSupported(true)
    const ctx = gl

    // Настройка canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Простая анимация частиц (можно заменить на более сложную WebGL-анимацию)
    let animationFrame: number
    const animate = () => {
      // Здесь можно добавить WebGL-рендеринг
      // Пока используем CSS-градиенты как fallback
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      {/* WebGL Canvas (структура готова для будущей реализации) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        style={{ display: isWebGLSupported ? 'block' : 'none' }}
      />

      {/* Fallback: CSS-анимация градиентов */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Основной градиент с параллаксом */}
        <div
          className="absolute w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(79, 209, 197, 0.5) 0%, rgba(56, 189, 248, 0.3) 40%, transparent 70%)',
            transform: `translate3d(${mousePosition.x * 0.5 + parallaxValue * 0.1}px, ${mousePosition.y * 0.5 + parallaxValue * 0.1}px, 0)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            left: '50%',
            top: '50%',
            marginLeft: 'clamp(-400px, -50vw, -200px)',
            marginTop: 'clamp(-400px, -50vh, -200px)',
            willChange: 'transform',
          }}
        />

        {/* Вторичный градиент */}
        <div
          className="absolute w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(79, 209, 197, 0.2) 50%, transparent 70%)',
            transform: `translate3d(${-mousePosition.x * 0.3 + parallaxValue * 0.05}px, ${-mousePosition.y * 0.3 + parallaxValue * 0.05}px, 0)`,
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            right: '10%',
            top: '30%',
            willChange: 'transform',
          }}
        />

        {/* Третичный градиент для глубины */}
        <div
          className="absolute w-[250px] sm:w-[375px] md:w-[500px] h-[250px] sm:h-[375px] md:h-[500px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(79, 209, 197, 0.3) 0%, transparent 60%)',
            transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px, 0)`,
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            left: '5%',
            bottom: '20%',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Grid pattern с параллаксом */}
      <div
        className="absolute inset-0 bg-grid opacity-20"
        style={{
          transform: `translate3d(0, ${parallaxValue * 0.2}px, 0)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform',
        }}
      />

      {/* Overlay для контраста */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </>
  )
}

