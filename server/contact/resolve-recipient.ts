import type { EmailConfig } from '@/server/email/config'
import type { ContactMessagePayload } from './schema'

const DEPARTMENT_RECIPIENTS: Record<
  NonNullable<ContactMessagePayload['department']>,
  keyof Pick<EmailConfig, 'defaultTo' | 'salesTo'>
> = {
  sales: 'salesTo',
  info: 'defaultTo',
  support: 'defaultTo',
  partnership: 'defaultTo',
  other: 'defaultTo',
}

export function resolveContactRecipient(
  config: EmailConfig,
  department?: ContactMessagePayload['department']
): string {
  if (!department) {
    return config.defaultTo
  }

  const configKey = DEPARTMENT_RECIPIENTS[department]
  return config[configKey]
}
