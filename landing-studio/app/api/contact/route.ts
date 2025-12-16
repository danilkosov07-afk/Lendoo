import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, contact, message } = body

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

    // Mock: логируем данные (в реальном проекте здесь была бы отправка на email/CRM)
    console.log('📧 Новое сообщение:', {
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    })

    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock: успешный ответ
    return NextResponse.json(
      {
        success: true,
        message: 'Сообщение успешно отправлено',
        data: {
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке сообщения' },
      { status: 500 }
    )
  }
}

