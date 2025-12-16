import { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Dynamic imports с оптимизацией для мобильных
// Используем next/dynamic для лучшей оптимизации
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: true, // Hero должен быть на сервере для SEO
})

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="min-h-[400px] bg-background-alt" />,
})

const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="min-h-[400px] bg-background" />,
})

const Process = dynamic(() => import('@/components/Process'), {
  loading: () => <div className="min-h-[400px] bg-background-alt" />,
})

const Benefits = dynamic(() => import('@/components/Benefits'), {
  loading: () => <div className="min-h-[400px] bg-background" />,
})

const Cases = dynamic(() => import('@/components/Cases'), {
  loading: () => <div className="min-h-[400px] bg-background" />,
})

const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <div className="min-h-[300px] bg-background-alt" />,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-[500px] bg-background-alt" />,
})

function SectionSkeleton() {
  return <div className="min-h-screen bg-background" />
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Benefits />
        <Cases />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

