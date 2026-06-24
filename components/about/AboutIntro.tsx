'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { siteImages } from '@/lib/site-images'

const easeOut = [0.22, 1, 0.36, 1] as const

export function AboutIntro() {
  const t = useTranslations('AboutUsPage.intro')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className='relative py-14 sm:py-16 lg:py-20 bg-white overflow-hidden'>
      <div
        className='pointer-events-none absolute top-16 -right-24 h-64 w-64 rounded-full bg-kci-accent/6 blur-3xl'
        aria-hidden='true'
      />

      <div className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10'>
        <div className='grid lg:grid-cols-12 gap-8 lg:gap-10 items-center'>
          <motion.div
            className='lg:col-span-7 space-y-5'
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <p className='text-slate-600 leading-relaxed text-base'>
              {t('paragraph2')}
            </p>
            <p className='text-slate-600 leading-relaxed text-base'>
              {t('paragraph3')}
            </p>
          </motion.div>

          <motion.div
            className='lg:col-span-5 relative'
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
          >
            <div
              className='absolute -top-3 -left-3 h-full w-full rounded-2xl border-2 border-kci-accent/25 -z-10'
              aria-hidden='true'
            />
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200/80'>
              <Image
                src={siteImages.about.intro}
                alt={t('imageAlt')}
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 40vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-kci-bar/30 via-transparent to-transparent' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
