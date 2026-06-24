'use client'

import { SocialDock } from '@/components/SocialDock'
import { WhatsAppAssistant } from '@/components/whatsapp-assistant'

export function FloatingContactStack() {
  return (
    <div className='floating-contact-stack fixed z-50 flex flex-row-reverse sm:flex-col items-center gap-2 sm:gap-3'>
      <WhatsAppAssistant embedded />
      <SocialDock keys={['facebook', 'tiktok', 'telegram']} compact />
    </div>
  )
}
