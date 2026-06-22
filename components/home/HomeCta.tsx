'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

export function HomeCta() {
  const t = useTranslations('HomePage.cta')

  return (
    <section className='w-full py-10 sm:py-12 lg:py-14 bg-kci-brand'>
      <div className='w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 text-center'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3'>
          {t('title')}
        </h2>
        <p className='text-white/70 leading-relaxed mb-6 text-sm sm:text-base'>
          {t('description')}
        </p>
        <Link
          href='/contact'
          className='inline-flex items-center gap-2 bg-kci-accent hover:bg-sky-400 text-white font-bold uppercase text-xs sm:text-sm tracking-wide px-6 py-3 rounded-full transition-colors shadow-lg shadow-kci-accent/25'
        >
          {t('button')}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
