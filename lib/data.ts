import siteData from '@/data/site.json'

export type SiteData = typeof siteData

export function getSiteData(): SiteData {
  return siteData
}

export function getHeroData() {
  return siteData.hero
}

export function getServicesData() {
  return siteData.services
}

export function getAboutData() {
  return siteData.about
}

export function getProcessData() {
  return siteData.process
}

export function getBenefitsData() {
  return siteData.benefits
}

export function getCasesData() {
  return siteData.cases
}

export function getCTAData() {
  return siteData.cta
}

export function getContactData() {
  return siteData.contact
}

export function getBenefitsData() {
  return siteData.benefits
}

export function getHeaderData() {
  return siteData.header
}

export function getFooterData() {
  return siteData.footer
}

export function getSEOData() {
  return siteData.seo
}

