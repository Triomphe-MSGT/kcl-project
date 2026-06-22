export type EmailConfig = {
  smtpHost: string
  smtpPort: number
  smtpSecure: boolean
  smtpUser: string
  smtpPass: string
  fromName: string
  defaultTo: string
  salesTo: string
}

export class EmailNotConfiguredError extends Error {
  constructor() {
    super('EMAIL_NOT_CONFIGURED')
    this.name = 'EmailNotConfiguredError'
  }
}

export function getEmailConfig(): EmailConfig {
  const smtpUser = process.env.SMTP_USER?.trim()
  const smtpPass = process.env.SMTP_PASS?.trim()

  if (!smtpUser || !smtpPass) {
    throw new EmailNotConfiguredError()
  }

  const smtpPort = Number(process.env.SMTP_PORT ?? '587')
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465

  return {
    smtpHost: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    fromName: process.env.CONTACT_FROM_NAME?.trim() || 'KCI Website',
    defaultTo:
      process.env.CONTACT_TO_EMAIL?.trim() || 'info@kci-ltd.com',
    salesTo:
      process.env.CONTACT_SALES_EMAIL?.trim() || 'sales@kci-ltd.com',
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim())
}
