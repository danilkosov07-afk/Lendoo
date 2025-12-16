# SVG Компоненты

Набор SVG-элементов в стиле минимализм, outline, tech UI для использования на сайте.

## Декоративные формы

### TechGridPattern
Сетка в tech-стиле
```tsx
<TechGridPattern className="w-full h-64" color="var(--accent-primary)" />
```

### HexagonPattern
Шестиугольный паттерн
```tsx
<HexagonPattern className="w-full h-64" color="var(--accent-primary)" />
```

### CircuitLines
Схематические линии
```tsx
<CircuitLines className="w-full h-64" color="var(--accent-primary)" />
```

### WavePattern
Волновой паттерн
```tsx
<WavePattern className="w-full h-32" color="var(--accent-primary)" />
```

### TechOrbs
Технологические сферы
```tsx
<TechOrbs className="w-full h-64" color="var(--accent-primary)" />
```

### CornerBrackets
Угловые скобки
```tsx
<CornerBrackets className="w-full h-64" color="var(--accent-primary)" />
```

## Hero иконки

### RocketIcon
```tsx
<RocketIcon className="w-8 h-8" color="var(--accent-primary)" />
```

### SparkleIcon
```tsx
<SparkleIcon className="w-8 h-8" color="var(--accent-primary)" />
```

### ArrowDownIcon
```tsx
<ArrowDownIcon className="w-6 h-6" color="var(--foreground-muted)" />
```

### PlayIcon
```tsx
<PlayIcon className="w-12 h-12" color="var(--accent-primary)" />
```

## Feature иконки

### CodeIcon, DesignIcon, SpeedIcon, ShieldIcon, ZapIcon, TargetIcon, LayersIcon
```tsx
<CodeIcon className="w-6 h-6" color="var(--accent-primary)" />
```

## Social иконки

### TelegramIcon, GitHubIcon, BehanceIcon, EmailIcon, PhoneIcon
```tsx
<TelegramIcon className="w-5 h-5" color="var(--foreground-muted)" />
```

## Использование

### Адаптивные размеры
Используйте Tailwind классы для адаптивных размеров:
```tsx
<CodeIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
```

### Настройка цвета через CSS
Все иконки принимают `color` prop, который можно настроить через CSS переменные:
```tsx
<CodeIcon color="var(--accent-primary)" />
<CodeIcon color="var(--foreground-muted)" />
<CodeIcon color="#4FD1C5" />
```

### Использование в компонентах
```tsx
import { CodeIcon, TechGridPattern } from '@/components/svg'

// В компоненте
<div className="relative">
  <TechGridPattern className="absolute inset-0 opacity-10" color="var(--accent-primary)" />
  <CodeIcon className="w-12 h-12 text-accent-primary" />
</div>
```

## Стилизация

Все SVG используют:
- `stroke` вместо `fill` для outline стиля
- `currentColor` по умолчанию для наследования цвета текста
- Адаптивные размеры через `className`
- Настройка цвета через `color` prop или CSS переменные


