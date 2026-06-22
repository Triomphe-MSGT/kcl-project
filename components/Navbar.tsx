'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/navigation'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { LanguageSelector } from '@/components/LanguageSelector'

type NavItem = {
  labelKey: string
  href: string
}

const navItems: NavItem[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'about', href: '/about' },
  { labelKey: 'services', href: '/services' },
  { labelKey: 'procurement', href: '/procurement' },
  { labelKey: 'resources', href: '/resources' },
  { labelKey: 'contact', href: '/contact' },
]

export function Navbar() {
  const t = useTranslations('NavbarSection')
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const overlayNav = isHome && !scrolled && !isOpen

  const linkClass = (href: string) =>
    `text-sm xl:text-base font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-150 ${
      isActiveLink(href)
        ? 'text-kci-accent'
        : overlayNav
          ? 'text-slate-700 hover:text-kci-brand'
          : 'text-slate-700 hover:text-kci-brand'
    }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        overlayNav ? 'nav-header-over-hero' : ''
      }`}
    >
      {/* Barre utilitaire — pleine largeur, PC uniquement */}
      <div
        className={`text-[11px] xl:text-xs py-2 hidden lg:block transition-colors border-b ${
          overlayNav
            ? 'bg-kci-bar/95 text-white/80 border-kci-warm/20'
            : 'bg-kci-bar text-white/80 border-kci-warm/25'
        }`}
      >
        <div className='w-full px-6 lg:px-10 xl:px-16 2xl:px-24 flex justify-between items-center'>
          <div className='flex items-center gap-6 xl:gap-8'>
            <div className='flex items-center gap-1.5'>
              <Phone size={13} className='text-kci-warm shrink-0' />
              <span>(+237) 683 242 277</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Mail size={13} className='text-kci-accent shrink-0' />
              <span>info@kci-ltd.com</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <MapPin size={13} className='text-kci-warm shrink-0' />
              <span>Yaoundé · Lagos · Guangzhou</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale — pleine largeur */}
      <div
        className={`w-full transition-all duration-300 ${
          overlayNav
            ? 'nav-over-hero'
            : scrolled
              ? 'nav-scrolled border-b border-slate-100'
              : 'bg-white border-b border-slate-200 shadow-sm'
        } ${scrolled ? 'py-2' : 'py-2.5 lg:py-3'}`}
      >
        <div className='w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 flex items-center justify-between gap-3 lg:gap-6'>
          <Link href='/' prefetch className='shrink-0'>
            <Image
              src='/images/kci-logo.png'
              alt={t('logo.alt')}
              width={200}
              height={48}
              priority
              className='h-9 sm:h-10 lg:h-11 w-auto object-contain'
            />
          </Link>

          {/* Menu desktop — pleine largeur, liens centrés */}
          <nav className='hidden lg:flex flex-1 items-center justify-center gap-5 xl:gap-7 2xl:gap-9 px-3'>
            {navItems.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href}
                prefetch
                className={linkClass(item.href)}
              >
                {t(`navigation.${item.labelKey}`)}
              </Link>
            ))}
          </nav>

          <div className='hidden lg:flex items-center gap-4 shrink-0'>
            <Suspense fallback={null}>
              <LanguageSelector variant='desktop' light={false} />
            </Suspense>
            <Link
              href='/contact'
              prefetch
              className='bg-kci-accent hover:bg-sky-400 text-white text-sm xl:text-base font-bold uppercase px-5 xl:px-6 py-2.5 rounded-full transition-all shadow-md shadow-kci-accent/25 whitespace-nowrap'
            >
              {t('cta.button')}
            </Link>
          </div>

          {/* Hamburger — tablette & mobile */}
          <button
            type='button'
            className={`lg:hidden p-2 rounded-lg transition-colors text-kci-brand hover:bg-kci-surface`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu hamburger — plein écran mobile/tablette */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 top-[60px] sm:top-[64px] z-40 bg-black/40'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}
      <div
        className={`lg:hidden fixed left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-xl transition-all duration-300 overflow-y-auto ${
          isOpen
            ? 'top-[60px] sm:top-[64px] max-h-[calc(100vh-60px)] opacity-100'
            : 'top-[60px] sm:top-[64px] max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className='w-full px-6 py-6 flex flex-col'>
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              href={item.href}
              prefetch
              className={`text-base font-bold uppercase tracking-wide py-3.5 border-b border-slate-100 transition-colors ${
                isActiveLink(item.href)
                  ? 'text-kci-accent border-l-4 border-l-kci-accent pl-4 -ml-px bg-kci-surface/60'
                  : 'text-slate-800 pl-2'
              }`}
            >
              {t(`navigation.${item.labelKey}`)}
            </Link>
          ))}
          <div className='pt-5 mt-2'>
            <Suspense fallback={null}>
              <LanguageSelector variant='mobile' onMobileClose={() => setIsOpen(false)} />
            </Suspense>
          </div>
          <Link
            href='/contact'
            prefetch
            className='mt-4 bg-kci-accent hover:bg-sky-400 text-white text-base font-bold uppercase py-3 rounded-full text-center shadow-md'
          >
            {t('cta.button')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
