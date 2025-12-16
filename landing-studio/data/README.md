# Структура данных сайта

Все тексты и данные сайта хранятся в `site.json`. Это позволяет легко редактировать контент без изменения кода компонентов.

## Структура файла

### `site` - Основная информация
- `name` - Название студии
- `tagline` - Слоган

### `seo` - SEO метаданные
- `title` - Заголовок страницы
- `description` - Описание для поисковых систем
- `keywords` - Ключевые слова

### `header` - Навигация
- `logo` - Текст логотипа
- `nav` - Массив пунктов меню (label, href)
- `cta` - Кнопка призыва к действию

### `hero` - Hero-секция
- `badge` - Бейдж над заголовком
- `title` - Заголовок (highlight - выделенная часть, text - обычный текст)
- `subtitle` - Подзаголовок
- `cta` - Кнопки призыва к действию (primary, secondary)

### `services` - Услуги
- `title` - Заголовок секции
- `subtitle` - Подзаголовок
- `items` - Массив услуг (title, description, icon)

### `about` - О студии
- `title` - Заголовок (highlight, text)
- `description` - Массив абзацев описания
- `stats` - Статистика (value, label)
- `cta` - Кнопка призыва к действию

### `process` - Процесс работы
- `title` - Заголовок секции
- `subtitle` - Подзаголовок
- `steps` - Массив шагов (number, title, description)

### `benefits` - Преимущества
- `title` - Заголовок секции
- `subtitle` - Подзаголовок
- `items` - Массив преимуществ (title, description, icon)

### `cases` - Кейсы
- `title` - Заголовок секции
- `subtitle` - Подзаголовок
- `items` - Массив кейсов (id, title, category, description, image, metrics, tags)

### `cta` - CTA-блок
- `title` - Заголовок
- `subtitle` - Подзаголовок
- `buttons` - Кнопки (primary, secondary)
- `note` - Дополнительный текст

### `contact` - Контакты
- `title` - Заголовок
- `subtitle` - Подзаголовок
- `email` - Email (label, value, href)
- `phone` - Телефон (label, value, href)
- `social` - Социальные сети (name, href, icon)

### `footer` - Футер
- `logo` - Текст логотипа
- `copyright` - Текст копирайта (используйте {year} для года)
- `links` - Ссылки (label, href)

## Использование в компонентах

Все компоненты получают данные через функции из `lib/data.ts`:

```typescript
import { getHeroData } from '@/lib/data'

const heroData = getHeroData()
// Используйте heroData.title, heroData.subtitle и т.д.
```

## Редактирование

Просто откройте `site.json` и измените нужные тексты. Изменения применятся после перезагрузки страницы (в dev-режиме) или после пересборки (в production).

## Важные замечания

- Все тексты должны быть в формате строк
- Для многострочного текста используйте массив строк
- Ссылки должны начинаться с `#` для якорей или быть полными URL
- Иконки можно использовать как эмодзи или имена классов
- Изображения указывайте относительно папки `public`

