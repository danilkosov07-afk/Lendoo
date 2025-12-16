import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Настройка транспорта для отправки email
// В production используйте переменные окружения для безопасности
let transporter: nodemailer.Transporter | null = null

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password от Gmail
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, contact, message, source } = body

    // Валидация на сервере
    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Имя должно содержать минимум 2 символа' },
        { status: 400 }
      )
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Сообщение должно содержать минимум 10 символов' },
        { status: 400 }
      )
    }

    // Определяем источник заявки
    const sourceText = source || 'Форма обратной связи'

    // Формируем текст письма
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4fd1c5; border-bottom: 2px solid #4fd1c5; padding-bottom: 10px;">
          Новая заявка с сайта Lendoo
        </h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Имя:</strong> ${name.trim()}</p>
          <p style="margin: 10px 0;"><strong>Email/Telegram:</strong> ${contact.trim()}</p>
          <p style="margin: 10px 0;"><strong>Источник:</strong> ${sourceText}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-left: 4px solid #4fd1c5; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Сообщение:</h3>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</p>
        </div>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Дата отправки: ${new Date().toLocaleString('ru-RU', { 
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    `

    const emailText = `
Новая заявка с сайта Lendoo

Имя: ${name.trim()}
Email/Telegram: ${contact.trim()}
Источник: ${sourceText}

Сообщение:
${message.trim()}

Дата отправки: ${new Date().toLocaleString('ru-RU')}
    `

    // Отправка email
    if (!transporter) {
      // Если email не настроен, логируем и возвращаем успех (для разработки)
      console.log('📧 Email не настроен - данные заявки:', {
        name: name.trim(),
        contact: contact.trim(),
        message: message.trim(),
        source: sourceText,
        timestamp: new Date().toISOString(),
      })
      
      return NextResponse.json(
        {
          success: true,
          message: 'Заявка успешно отправлена (email не настроен)',
        },
        { status: 200 }
      )
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'danil.kosov.07@gmail.com',
        to: 'danil.kosov.07@gmail.com',
        subject: 'Новая заявка с сайта Lendoo',
        text: emailText,
        html: emailHtml,
      })

      console.log('✅ Email успешно отправлен:', {
        name: name.trim(),
        contact: contact.trim(),
        source: sourceText,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: true,
          message: 'Заявка успешно отправлена',
        },
        { status: 200 }
      )
    } catch (emailError: any) {
      console.error('❌ Ошибка отправки email:', emailError)
      
      return NextResponse.json(
        { error: 'Ошибка при отправке email. Попробуйте позже или свяжитесь через Telegram.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке сообщения' },
      { status: 500 }
    )
  }
}
