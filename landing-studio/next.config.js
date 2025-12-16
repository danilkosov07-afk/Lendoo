/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Использовать SWC для минификации (быстрее чем Terser)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Оптимизация для production
  productionBrowserSourceMaps: false, // Отключить source maps в production
  optimizeFonts: true, // Оптимизация шрифтов
  // Компрессия и минификация
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Экспериментальные оптимизации
  experimental: {
    optimizeCss: true, // Оптимизация CSS
  },
  // Подготовка для мультиязычности
  // i18n: {
  //   locales: ['ru', 'en'],
  //   defaultLocale: 'ru',
  // },
}

module.exports = nextConfig

