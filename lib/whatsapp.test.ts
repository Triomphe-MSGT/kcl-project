import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildWhatsAppMessage, openWhatsAppMessage } from './whatsapp'

describe('buildWhatsAppMessage', () => {
  it('builds a structured multiline message with a title', () => {
    const message = buildWhatsAppMessage('New order — KCI Ltd', [
      { label: 'Name', value: 'Jean Dupont' },
      { label: 'Quantity', value: '5' },
    ])

    expect(message).toBe(
      ['New order — KCI Ltd', '', 'Name: Jean Dupont', 'Quantity: 5'].join('\n')
    )
  })

  it('uses an em dash placeholder for empty field values', () => {
    const message = buildWhatsAppMessage('Title', [
      { label: 'Requirements', value: '' },
    ])

    expect(message).toContain('Requirements: —')
  })
})

describe('openWhatsAppMessage', () => {
  const openMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('window', { open: openMock })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    openMock.mockReset()
  })

  it('normalizes the phone number and encodes the message for wa.me', () => {
    openWhatsAppMessage('+237 683 242 277', 'Hello & World')

    expect(openMock).toHaveBeenCalledOnce()
    expect(openMock).toHaveBeenCalledWith(
      'https://wa.me/237683242277?text=Hello%20%26%20World',
      '_blank'
    )
  })
})
