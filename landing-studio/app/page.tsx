import { lazy, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Lazy loading для тяжелых компонентов (оптимизация производительности)
const Hero = lazy(() => import('@/components/Hero'))
const Services = lazy(() => import('@/components/Services'))
const About = lazy(() => import('@/components/About'))
const Process = lazy(() => import('@/components/Process'))
const Benefits = lazy(() => import('@/components/Benefits'))
const Cases = lazy(() => import('@/components/Cases'))
const CTA = lazy(() => import('@/components/CTA'))
const Contact = lazy(() => import('@/components/Contact'))

function SectionSkeleton() {
  return <div className="min-h-screen bg-background" />
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<SectionSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Process />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Benefits />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Cases />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

