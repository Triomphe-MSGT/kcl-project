import { describe, expect, it } from 'vitest'
import { routing } from '@/i18n/routing'

describe('i18n routing', () => {
  it('supports French and English locales', () => {
    expect(routing.locales).toEqual(['en', 'fr'])
  })

  it('uses English as the default locale', () => {
    expect(routing.defaultLocale).toBe('en')
  })
})
