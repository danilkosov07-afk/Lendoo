import { getSiteData, getContactData } from '@/lib/data'

export function generateSchema() {
  const siteData = getSiteData()
  const contactData = getContactData()

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.site.name,
    description: siteData.site.tagline,
    url: 'https://digitalstudio.com',
    logo: 'https://digitalstudio.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactData.phone.value,
      contactType: 'customer service',
      email: contactData.email.value,
    },
    sameAs: contactData.social?.map((social) => social.href) || [],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteData.site.name,
    url: 'https://digitalstudio.com',
    description: siteData.site.tagline,
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Design & Development',
    provider: {
      '@type': 'Organization',
      name: siteData.site.name,
    },
    areaServed: 'Worldwide',
    description: siteData.site.tagline,
  }

  return {
    organization: organizationSchema,
    website: websiteSchema,
    service: serviceSchema,
  }
}


