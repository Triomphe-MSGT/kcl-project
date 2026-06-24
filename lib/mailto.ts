export type ContactMailtoPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  department?: string
  departmentLabel?: string
  subject: string
  message: string
}

const DEFAULT_EMAIL = 'info@kci-ltd.com'

export function resolveContactEmail(): string {
  return DEFAULT_EMAIL
}

export function buildContactMailtoBody(
  payload: ContactMailtoPayload
): string {
  const lines = [
    'Message depuis le site KCI',
    '',
    `Nom : ${payload.name}`,
    `Email : ${payload.email}`,
    payload.phone ? `Téléphone : ${payload.phone}` : null,
    payload.company ? `Entreprise : ${payload.company}` : null,
    payload.departmentLabel
      ? `Département : ${payload.departmentLabel}`
      : null,
    '',
    'Message :',
    payload.message,
  ]

  return lines.filter(Boolean).join('\n')
}

export function buildContactMailtoUrl(payload: ContactMailtoPayload): string {
  const to = resolveContactEmail()
  const subject = `[KCI Contact] ${payload.subject}`
  const body = buildContactMailtoBody(payload)

  const params = new URLSearchParams({
    subject,
    body,
  })

  return `mailto:${to}?${params.toString()}`
}

export function openContactMailto(payload: ContactMailtoPayload): void {
  window.location.href = buildContactMailtoUrl(payload)
}
