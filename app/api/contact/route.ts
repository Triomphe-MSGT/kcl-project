import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { EmailNotConfiguredError } from '@/server/email/config'
import { parseContactMessage } from '@/server/contact/schema'
import { sendContactMessage } from '@/server/contact/send-message'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = parseContactMessage(body)
    await sendContactMessage(payload)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    if (error instanceof EmailNotConfiguredError) {
      return NextResponse.json(
        {
          success: false,
          error: 'EMAIL_NOT_CONFIGURED',
        },
        { status: 503 }
      )
    }

    console.error('[contact] Failed to send email:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'SEND_FAILED',
      },
      { status: 500 }
    )
  }
}
