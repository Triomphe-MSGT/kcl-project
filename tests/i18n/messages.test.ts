import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { collectLeafKeys, missingKeys } from '../helpers/i18n'

const messagesDir = path.resolve(__dirname, '../../messages')

function loadLocale(locale: 'en' | 'fr') {
  const filePath = path.join(messagesDir, `${locale}.json`)
  return JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, unknown>
}

const REQUIRED_NAMESPACES = [
  'NavbarSection',
  'HomePage',
  'AboutUsPage',
  'ServicesPage',
  'ProcurementPage',
  'ResourcesPage',
  'ContactPage',
  'FAQPage',
  'FooterSection',
] as const

describe('i18n message files', () => {
  const fr = loadLocale('fr')
  const en = loadLocale('en')
  const frKeys = new Set(collectLeafKeys(fr))
  const enKeys = new Set(collectLeafKeys(en))

  it('loads valid JSON files for fr and en', () => {
    expect(fr).toBeTypeOf('object')
    expect(en).toBeTypeOf('object')
  })

  it('includes required namespaces in both locales', () => {
    for (const namespace of REQUIRED_NAMESPACES) {
      expect(fr).toHaveProperty(namespace)
      expect(en).toHaveProperty(namespace)
    }
  })

  it('keeps French keys available in English', () => {
    const missingInEn = missingKeys(frKeys, enKeys)
    expect(missingInEn).toEqual([])
  })

  it('defines WhatsApp order modal labels in both locales', () => {
    for (const page of ['ServicesPage', 'ProcurementPage'] as const) {
      expect(fr[page]).toBeDefined()
      expect(en[page]).toBeDefined()
    }
  })

  it('contains 50 FAQ entries in each locale', () => {
    const countFaqItems = (messages: Record<string, unknown>) => {
      const faq = messages.FAQPage as { faqs?: Record<string, unknown> }
      return Object.keys(faq.faqs ?? {}).length
    }

    expect(countFaqItems(fr)).toBe(50)
    expect(countFaqItems(en)).toBe(50)
  })
})
