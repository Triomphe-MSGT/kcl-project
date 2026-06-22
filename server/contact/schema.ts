import { z } from 'zod'

const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .refine(
      (phone) => {
        if (!phone) return true
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
      },
      { message: 'Invalid phone number' }
    ),
  company: z.string().trim().max(160).optional(),
  department: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.enum(['sales', 'info', 'support', 'partnership', 'other']).optional()
  ),
  subject: z.string().trim().min(5).max(200),
  message: z.string().trim().min(10).max(5000),
})

export type ContactMessageInput = z.infer<typeof contactMessageSchema>
export type ContactMessagePayload = ContactMessageInput

export function parseContactMessage(
  data: unknown
): ContactMessagePayload {
  const parsed = contactMessageSchema.parse(data)

  return {
    ...parsed,
    phone: parsed.phone || undefined,
    company: parsed.company || undefined,
  }
}
