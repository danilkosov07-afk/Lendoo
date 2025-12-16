# Архитектура проекта

## Структура

```
landing-studio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── layout.tsx         # Root layout с SEO
│   ├── page.tsx           # Главная страница
│   ├── schema.tsx         # Schema.org разметка
│   ├── sitemap.ts         # Sitemap генератор
│   └── robots.ts          # Robots.txt генератор
├── components/            # React компоненты
│   ├── icons/            # SVG иконки
│   ├── Header.tsx        # Навигация
│   ├── Hero.tsx          # Hero-блок
│   ├── Services.tsx       # Услуги
│   ├── About.tsx         # О студии
│   ├── Process.tsx       # Процесс работы
│   ├── Benefits.tsx      # Преимущества
│   ├── Cases.tsx         # Кейсы (lazy)
│   ├── CaseCard.tsx      # Карточка кейса
│   ├── CTA.tsx           # CTA-блок
│   ├── Contact.tsx       # Контакты
│   ├── ContactForm.tsx   # Форма контактов
│   ├── Footer.tsx        # Футер
│   └── HeroBackground.tsx # Фон Hero
├── data/                  # Данные
│   ├── site.json         # Все тексты и данные
│   └── README.md         # Документация данных
├── lib/                   # Утилиты
│   ├── data.ts           # Функции получения данных
│   └── i18n.ts           # Мультиязычность (структура)
├── public/                # Статические файлы
│   └── robots.txt         # Robots.txt
└── app/globals.css        # Глобальные стили
```

## Принципы

### 1. Данные из JSON
- ✅ Все тексты в `data/site.json`
- ✅ Нет хардкода текста в компонентах
- ✅ Легко редактировать контент

### 2. Компонентная архитектура
- ✅ Переиспользуемые компоненты
- ✅ Разделение логики и представления
- ✅ Lazy loading для тяжелых компонентов

### 3. SEO и оптимизация
- ✅ Meta-теги через Next.js Metadata API
- ✅ OG-теги для социальных сетей
- ✅ Schema.org разметка
- ✅ Sitemap и robots.txt
- ✅ Оптимизация шрифтов (next/font)
- ✅ Lazy loading компонентов

### 4. Масштабируемость

#### Добавление кейсов
1. Добавьте данные в `data/site.json` → `cases.items`
2. Компонент автоматически отобразит новые кейсы
3. Структура готова для расширения

#### Мультиязычность
- Структура в `lib/i18n.ts`
- Готово к интеграции next-intl или i18next
- Данные можно разделить по языкам

#### Расширение функционала
- API routes в `app/api/`
- Компоненты легко добавлять
- Стили через TailwindCSS утилиты

## Технологии

- **Next.js 14** (App Router)
- **TypeScript** (типобезопасность)
- **TailwindCSS** (стилизация)
- **Framer Motion** (анимации)
- **next/font** (оптимизация шрифтов)
- **next/image** (оптимизация изображений)

## Производительность

- Lazy loading компонентов
- Оптимизация шрифтов
- Оптимизация изображений
- Минимум зависимостей
- Оптимизированные анимации

## Готовность к деплою

- ✅ Build без ошибок
- ✅ Lint без ошибок
- ✅ SEO оптимизация
- ✅ Готовность к Vercel
- ✅ Production-ready код

