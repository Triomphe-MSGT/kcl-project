import { describe, expect, it } from 'vitest'
import { parseContactMessage } from '@/server/contact/schema'
import { resolveContactRecipient } from '@/server/contact/resolve-recipient'
import {
  buildContactEmailContent,
  buildContactEmailSubject,
} from '@/server/email/templates/contact-email'

describe('contact message schema', () => {
  it('accepts a valid payload', () => {
    const payload = parseContactMessage({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+237 683 242 277',
      company: 'KCI Client',
      department: 'sales',
      subject: 'Order inquiry',
      message: 'I would like to place an order for electronics.',
    })

    expect(payload.name).toBe('Jane Doe')
    expect(payload.department).toBe('sales')
  })

  it('rejects invalid email', () => {
    expect(() =>
      parseContactMessage({
        name: 'Jane Doe',
        email: 'not-an-email',
        subject: 'Hello there',
        message: 'This is a long enough message.',
      })
    ).toThrow()
  })
})

describe('resolveContactRecipient', () => {
  const config = {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: 'sender@gmail.com',
    smtpPass: 'secret',
    fromName: 'KCI Website',
    defaultTo: 'info@kci-ltd.com',
    salesTo: 'sales@kci-ltd.com',
  }

  it('routes sales department to sales inbox', () => {
    expect(resolveContactRecipient(config, 'sales')).toBe('sales@kci-ltd.com')
  })

  it('routes other departments to default inbox', () => {
    expect(resolveContactRecipient(config, 'info')).toBe('info@kci-ltd.com')
    expect(resolveContactRecipient(config, undefined)).toBe('info@kci-ltd.com')
  })
})

describe('contact email template', () => {
  it('builds subject and body with visitor details', () => {
    const payload = parseContactMessage({
      name: 'John Smith',
      email: 'john@example.com',
      subject: 'Partnership request',
      message: 'We would like to discuss a partnership opportunity.',
    })

    expect(buildContactEmailSubject(payload)).toBe(
      '[KCI Contact] Partnership request'
    )

    const { text, html } = buildContactEmailContent(payload)
    expect(text).toContain('John Smith')
    expect(text).toContain('john@example.com')
    expect(html).toContain('Partnership request')
  })
})
