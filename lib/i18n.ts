// Структура для мультиязычности
// В будущем можно интегрировать next-intl или i18next

export type Locale = 'ru' | 'en'

export const defaultLocale: Locale = 'ru'
export const locales: Locale[] = ['ru', 'en']

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/')
  const firstSegment = segments[1]
  
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  return defaultLocale
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return pathname
  }
  
  return `/${locale}${pathname}`
}

// Заглушка для будущей реализации
export async function getTranslations(locale: Locale) {
  // В будущем здесь будет загрузка переводов из JSON файлов
  // const translations = await import(`@/data/translations/${locale}.json`)
  // return translations.default
  
  // Пока возвращаем данные из основного файла
  const siteData = await import('@/data/site.json')
  return siteData.default
}

