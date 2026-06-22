import { getEmailConfig } from '@/server/email/config'
import { getMailTransporter } from '@/server/email/transporter'
import {
  buildContactEmailContent,
  buildContactEmailSubject,
} from '@/server/email/templates/contact-email'
import { resolveContactRecipient } from '@/server/contact/resolve-recipient'
import type { ContactMessagePayload } from '@/server/contact/schema'

export type SendContactMessageResult = {
  messageId: string
  recipient: string
}

export async function sendContactMessage(
  payload: ContactMessagePayload
): Promise<SendContactMessageResult> {
  const config = getEmailConfig()
  const transporter = getMailTransporter()
  const recipient = resolveContactRecipient(config, payload.department)
  const subject = buildContactEmailSubject(payload)
  const { text, html } = buildContactEmailContent(payload)

  const info = await transporter.sendMail({
    from: `"${config.fromName}" <${config.smtpUser}>`,
    to: recipient,
    replyTo: `"${payload.name}" <${payload.email}>`,
    subject,
    text,
    html,
  })

  return {
    messageId: info.messageId,
    recipient,
  }
}
