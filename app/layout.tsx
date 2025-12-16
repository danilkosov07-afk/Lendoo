import type { Metadata } from 'next'
import { Exo_2, Inter } from 'next/font/google'
import './globals.css'
import { getSEOData, getSiteData } from '@/lib/data'
import { generateSchema } from './schema'

const headingFont = Exo_2({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const bodyFont = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const seoData = getSEOData()
const siteData = getSiteData()

export const metadata: Metadata = {
  metadataBase: new URL(seoData.url || 'https://digitalstudio.com'),
  title: {
    default: seoData.title,
    template: `%s | ${siteData.site.name}`,
  },
  description: seoData.description,
  keywords: seoData.keywords?.split(', '),
  authors: [{ name: siteData.site.name }],
  creator: siteData.site.name,
  publisher: siteData.site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: seoData.type || 'website',
    locale: seoData.locale || 'ru_RU',
    url: seoData.url,
    siteName: seoData.siteName || siteData.site.name,
    title: seoData.title,
    description: seoData.description,
    images: [
      {
        url: seoData.image || '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: seoData.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoData.title,
    description: seoData.description,
    images: [seoData.image || '/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Добавьте ваши ключи верификации при необходимости
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemas = generateSchema()

  return (
    <html lang="ru" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.website) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }}
        />
        {children}
      </body>
    </html>
  )
}

