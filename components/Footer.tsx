'use client'

import { JSX, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import {
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from '@tabler/icons-react'
import { DEVELOPER_PHONES } from '@/lib/developer'

const navLinks = [
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'procurement', href: '/procurement' },
  { key: 'resources', href: '/resources' },
  { key: 'contact', href: '/contact' },
] as const

const legalLinks = [
  { key: 'privacy', href: '/privacy' },
  { key: 'faq', href: '/faq' },
] as const

const socialLinks = [
  {
    icon: IconBrandFacebook,
    href: 'https://www.facebook.com/share/165s3npC8M/',
    label: 'Facebook',
  },
  {
    icon: IconBrandTiktok,
    href: 'https://www.tiktok.com/@moock_media?_t=ZM-8zbnXqJLwts&_r=1',
    label: 'TikTok',
  },
  {
    icon: IconBrandTelegram,
    href: 'https://t.me/kci_ltd',
    label: 'Telegram',
  },
  {
    icon: IconBrandWhatsapp,
    href: 'https://chat.whatsapp.com/FUPwuge53AeGHsrUXvU8Q5',
    label: 'WhatsApp',
  },
] as const

export function Footer(): JSX.Element {
  const t = useTranslations('FooterSection')
  const currentYear = new Date().getFullYear()
  const [showDeveloperPhones, setShowDeveloperPhones] = useState(false)

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
    <footer className='w-full bg-kci-bar text-white/75'>
      <div className='h-0.5 w-full bg-gradient-to-r from-transparent via-kci-accent to-transparent' />

      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-12'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
          <div className='max-w-xs'>
            <Link href='/' prefetch className='inline-block mb-4'>
              <Image
                src='/images/kci-logo-white.png'
                alt='KC International'
                width={200}
                height={48}
                className='h-10 w-auto object-contain'
              />
            </Link>
            <p className='text-sm leading-relaxed text-white/60'>
              {t('companyTagline')}
            </p>
          </div>

          <nav
            className='flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium'
            aria-label={t('navigation.title')}
          >
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                prefetch
                className='text-white/70 hover:text-kci-accent transition-colors duration-200'
              >
                {t(`navigation.links.${link.key}`)}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-2.5'>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white/70 ring-1 ring-white/10 hover:bg-kci-brand hover:text-white hover:ring-kci-brand/50 transition-all duration-200'
              >
                <Icon size={17} stroke={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className='mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:text-sm text-white/50 sm:flex-row sm:flex-wrap sm:gap-x-6'>
          <a
            href='mailto:info@kci-ltd.com'
            className='hover:text-kci-accent transition-colors'
          >
            info@kci-ltd.com
          </a>
          <a
            href='mailto:sales@kci-ltd.com'
            className='hover:text-kci-accent transition-colors'
          >
            sales@kci-ltd.com
          </a>
          <span>+237 683 242 277 · +234 903 162 2889</span>
        </div>
      </div>

      <div className='border-t border-white/10'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-white/45 text-center sm:text-left'>
            © {currentYear} {t('bottom.copyright')}
          </p>

          <div className='flex items-center gap-5'>
            {legalLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                prefetch
                className='text-xs text-white/45 hover:text-kci-accent transition-colors'
              >
                {t(`bottom.links.${link.key}`)}
              </Link>
            ))}
            <button
              type='button'
              onClick={scrollToTop}
              aria-label={t('bottom.backToTop')}
              className='flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-white/60 ring-1 ring-white/10 hover:bg-kci-accent hover:text-white hover:ring-kci-accent/40 transition-all duration-200'
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>

    <div className='w-full bg-kci-bar'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-1 text-center'>
        <button
          type='button'
          onClick={() => setShowDeveloperPhones((visible) => !visible)}
          className={`group inline-block max-w-full cursor-pointer border-0 bg-transparent p-0 text-[9px] leading-tight transition-colors duration-300 ${
            showDeveloperPhones ? 'text-white/35' : 'text-white/[0.1] hover:text-white/30'
          }`}
          aria-expanded={showDeveloperPhones}
          aria-label={
            showDeveloperPhones
              ? DEVELOPER_PHONES.join(' · ')
              : t('bottom.developedBy')
          }
        >
          <span
            className={
              showDeveloperPhones ? 'hidden' : 'inline group-hover:hidden'
            }
          >
            {t('bottom.developedBy')}
          </span>
          <span
            className={
              showDeveloperPhones
                ? 'inline'
                : 'hidden group-hover:inline'
            }
          >
            {DEVELOPER_PHONES.join(' · ')}
          </span>
        </button>
      </div>
    </div>
    </>
  )
}
