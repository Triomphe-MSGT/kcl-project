'use client'

import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

type PageCtaProps = {
  title: string
  description: string
  button: string
  href?: string
}

export function PageCta({
  title,
  description,
  button,
  href = '/contact',
}: PageCtaProps) {
  return (
    <section className='w-full py-12 sm:py-14 bg-kci-brand'>
      <div className='w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 text-center'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3'>
          {title}
        </h2>
        <p className='text-white/70 leading-relaxed mb-6 text-sm sm:text-base'>
          {description}
        </p>
        <Link
          href={href}
          className='inline-flex items-center gap-2 bg-kci-accent hover:bg-sky-400 text-white font-bold uppercase text-xs sm:text-sm tracking-wide px-6 py-3 rounded-full transition-colors shadow-lg shadow-kci-accent/25'
        >
          {button}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
