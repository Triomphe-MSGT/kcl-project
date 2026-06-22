'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion, useInView } from 'motion/react'
import {
  BookOpen,
  Users,
  Newspaper,
  Calendar,
  Download,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'

const resourceItems = [
  {
    key: 'blog',
    icon: BookOpen,
    color: 'text-kci-brand',
    bg: 'bg-kci-brand/10',
  },
  {
    key: 'successStories',
    icon: Users,
    color: 'text-kci-accent',
    bg: 'bg-kci-accent/10',
  },
  {
    key: 'partners',
    icon: Newspaper,
    color: 'text-kci-warm',
    bg: 'bg-kci-warm/10',
  },
  {
    key: 'events',
    icon: Calendar,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    key: 'downloads',
    icon: Download,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    key: 'faq',
    icon: HelpCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    href: '/faq',
  },
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

export default function ResourcesPage() {
  const t = useTranslations('ResourcesPage')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <main className='min-h-screen bg-kci-surface'>
      <PageHero
        title={t('hero.title')}
        titleHighlight={t('hero.titleHighlight')}
        description={t('hero.description')}
      />

      <section ref={ref} className='page-section'>
        <div className='page-container'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
            {resourceItems.map(({ key, icon: Icon, color, bg, ...rest }, index) => {
              const href = 'href' in rest ? rest.href : undefined
              const card = (
                <motion.div
                  className='bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 group'
                  initial={{ opacity: 0, y: 28 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.08,
                    ease: easeOut,
                  }}
                >
                  <div
                    className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className={color} size={22} />
                  </div>
                  <h3 className='text-lg font-bold text-slate-900 mb-2'>
                    {t(`sections.${key}.title`)}
                  </h3>
                  <p className='text-sm text-slate-500 leading-relaxed mb-4'>
                    {t(`sections.${key}.description`)}
                  </p>
                  <span className='inline-flex items-center text-xs font-bold uppercase tracking-wide text-kci-brand group-hover:text-kci-accent transition-colors'>
                    {t(`sections.${key}.cta`)}
                    <ArrowRight size={14} className='ml-2' />
                  </span>
                </motion.div>
              )

              if (href) {
                return (
                  <Link key={key} href={href} className='block h-full'>
                    {card}
                  </Link>
                )
              }

              return <div key={key}>{card}</div>
            })}
          </div>
        </div>
      </section>

      <PageCta
        title={t('cta.title')}
        description={t('cta.description')}
        button={t('cta.button')}
      />
    </main>
  )
}
