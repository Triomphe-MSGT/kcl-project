import {
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from '@tabler/icons-react'

export const CONTACT_EMAIL = 'info@kci-ltd.com'

export const socialLinks = [
  {
    key: 'facebook',
    icon: IconBrandFacebook,
    href: 'https://www.facebook.com/share/165s3npC8M/',
    label: 'Facebook',
    className:
      'bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-lg shadow-[#1877F2]/30',
  },
  {
    key: 'tiktok',
    icon: IconBrandTiktok,
    href: 'https://www.tiktok.com/@moock_media?_t=ZM-8zbnXqJLwts&_r=1',
    label: 'TikTok',
    className:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/30',
  },
  {
    key: 'telegram',
    icon: IconBrandTelegram,
    href: 'https://t.me/kci_ltd',
    label: 'Telegram',
    className:
      'bg-[#229ED9] hover:bg-[#1E8FC7] text-white shadow-lg shadow-[#229ED9]/30',
  },
  {
    key: 'whatsapp',
    icon: IconBrandWhatsapp,
    href: 'https://chat.whatsapp.com/FUPwuge53AeGHsrUXvU8Q5',
    label: 'WhatsApp',
    className:
      'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-600/30',
  },
] as const

export type SocialLinkKey = (typeof socialLinks)[number]['key']
