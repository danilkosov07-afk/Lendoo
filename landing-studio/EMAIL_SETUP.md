# Настройка отправки email заявок

## Требования

Для работы отправки email заявок необходимо настроить переменные окружения.

## Настройка Gmail

1. **Включите двухфакторную аутентификацию** в вашем Google аккаунте
2. Перейдите в [настройки безопасности Google](https://myaccount.google.com/security)
3. Найдите раздел "Пароли приложений" (App Passwords)
4. Создайте новый пароль приложения для "Почта"
5. Скопируйте созданный пароль (16 символов)

## Настройка переменных окружения

Создайте файл `.env.local` в корне проекта `landing-studio/`:

```env
EMAIL_USER=danil.kosov.07@gmail.com
EMAIL_PASS=ваш_пароль_приложения_здесь
```

**Важно:** 
- Не коммитьте файл `.env.local` в Git (он уже в `.gitignore`)
- Используйте именно App Password, а не обычный пароль от Gmail

## Альтернативные варианты

Если не хотите использовать Gmail, можно настроить другой SMTP сервис:

### Resend (рекомендуется для production)
```env
RESEND_API_KEY=your_api_key
```

### SendGrid
```env
SENDGRID_API_KEY=your_api_key
```

### Другой SMTP сервер
Обновите настройки в `app/api/contact/route.ts`:
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-provider.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
```

## Режим разработки

В режиме разработки (если email не настроен), заявки будут логироваться в консоль сервера, но API вернет успешный ответ для тестирования UX.

## Проверка работы

1. Запустите проект: `npm run dev`
2. Отправьте тестовую заявку через форму контактов
3. Проверьте почту `danil.kosov.07@gmail.com`
4. Проверьте консоль сервера на наличие ошибок

