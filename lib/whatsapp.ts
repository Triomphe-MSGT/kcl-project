export function openWhatsAppMessage(phone: string, message: string) {
  const phoneDigits = phone.replace(/\D/g, '')
  const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

export function buildWhatsAppMessage(
  title: string,
  fields: Array<{ label: string; value: string }>
): string {
  const lines = fields.map(({ label, value }) => `${label}: ${value || '—'}`)
  return [title, '', ...lines].join('\n')
}
