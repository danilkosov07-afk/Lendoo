# Деплой на Vercel

Проект полностью готов к деплою на Vercel.

## Быстрый деплой

1. **Подготовка репозитория**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Деплой через Vercel Dashboard**
   - Перейдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Импортируйте ваш репозиторий
   - Vercel автоматически определит настройки Next.js
   - Нажмите "Deploy"

3. **Деплой через Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

## Переменные окружения

Проект не требует переменных окружения для базовой работы. При необходимости добавьте:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Проверка перед деплоем

1. **Build проверка**
   ```bash
   npm run build
   ```

2. **Lint проверка**
   ```bash
   npm run lint
   ```

3. **Локальный запуск production**
   ```bash
   npm run build
   npm start
   ```

## После деплоя

1. Обновите URL в `data/site.json`:
   ```json
   "seo": {
     "url": "https://yourdomain.com"
   }
   ```

2. Добавьте OG-изображение в `public/og-image.jpg` (1200x630px)

3. Добавьте favicon в `public/favicon.ico`

4. Проверьте работу всех секций и форм

## Оптимизации

Проект уже включает:
- ✅ Оптимизацию шрифтов (next/font)
- ✅ Lazy loading компонентов
- ✅ Оптимизацию изображений (next/image)
- ✅ SEO мета-теги
- ✅ Schema.org разметку
- ✅ Sitemap и robots.txt

## Масштабирование

### Добавление кейсов

1. Добавьте данные в `data/site.json` → `cases.items`
2. Компонент `Cases` автоматически отобразит новые кейсы
3. Добавьте изображения в `public/cases/`

### Мультиязычность

1. Раскомментируйте i18n в `next.config.js`
2. Создайте файлы переводов в `data/translations/`
3. Используйте функции из `lib/i18n.ts`

### Кастомизация

Все тексты в `data/site.json` - легко редактировать без изменения кода.


