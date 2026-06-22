import type { ContactMessagePayload } from '@/server/contact/schema'

const DEPARTMENT_LABELS: Record<
  NonNullable<ContactMessagePayload['department']>,
  string
> = {
  sales: 'Sales',
  info: 'Information',
  support: 'Technical Support',
  partnership: 'Partnerships',
  other: 'Other',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatField(label: string, value?: string): string {
  if (!value) return ''
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;vertical-align:top;width:140px;">${label}</td><td style="padding:8px 12px;color:#0f172a;">${escapeHtml(value)}</td></tr>`
}

export function buildContactEmailContent(payload: ContactMessagePayload) {
  const departmentLabel = payload.department
    ? DEPARTMENT_LABELS[payload.department]
    : undefined

  const text = [
    'New contact message from the KCI website',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    departmentLabel ? `Department: ${departmentLabel}` : null,
    `Subject: ${payload.subject}`,
    '',
    'Message:',
    payload.message,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;">
      <h2 style="margin:0 0 16px;color:#0b3d91;">New contact message</h2>
      <p style="margin:0 0 20px;color:#475569;">A visitor submitted the contact form on the KCI website.</p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
        <tbody>
          ${formatField('Name', payload.name)}
          ${formatField('Email', payload.email)}
          ${formatField('Phone', payload.phone)}
          ${formatField('Company', payload.company)}
          ${formatField('Department', departmentLabel)}
          ${formatField('Subject', payload.subject)}
        </tbody>
      </table>
      <div style="margin-top:20px;padding:16px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;">
        <p style="margin:0 0 8px;font-weight:600;color:#334155;">Message</p>
        <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>
    </div>
  `.trim()

  return { text, html }
}

export function buildContactEmailSubject(payload: ContactMessagePayload): string {
  return `[KCI Contact] ${payload.subject}`
}
