import { describe, expect, it } from 'vitest'
import {
  buildContactMailtoUrl,
  resolveContactEmail,
} from '@/lib/mailto'

describe('mailto contact', () => {
  it('always routes to the main contact inbox', () => {
    expect(resolveContactEmail()).toBe('info@kci-ltd.com')
  })

  it('builds a mailto url with encoded subject and body', () => {
    const url = buildContactMailtoUrl({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Order inquiry',
      message: 'I would like to place an order.',
      department: 'sales',
      departmentLabel: 'Sales',
    })

    expect(url.startsWith('mailto:info@kci-ltd.com?')).toBe(true)
    const query = url.split('?')[1] ?? ''
    const params = new URLSearchParams(query)

    expect(params.get('subject')).toBe('[KCI Contact] Order inquiry')
    expect(params.get('body')).toContain('Jane Doe')
    expect(params.get('body')).toContain('jane@example.com')
  })
})
