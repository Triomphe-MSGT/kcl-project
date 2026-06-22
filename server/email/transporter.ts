import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { getEmailConfig, type EmailConfig } from './config'

let cachedTransporter: Transporter | null = null
let cachedConfigKey: string | null = null

function getConfigKey(config: EmailConfig): string {
  return [
    config.smtpHost,
    config.smtpPort,
    config.smtpSecure,
    config.smtpUser,
  ].join(':')
}

export function getMailTransporter(): Transporter {
  const config = getEmailConfig()
  const configKey = getConfigKey(config)

  if (!cachedTransporter || cachedConfigKey !== configKey) {
    cachedTransporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    })
    cachedConfigKey = configKey
  }

  return cachedTransporter
}
