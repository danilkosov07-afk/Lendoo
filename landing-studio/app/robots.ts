import { MetadataRoute } from 'next'
import { getSEOData } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  const seoData = getSEOData()
  const baseUrl = seoData.url || 'https://digitalstudio.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

