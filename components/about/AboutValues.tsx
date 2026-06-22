'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'motion/react'

const valueKeys = [
  'customer',
  'integrity',
  'trust',
  'innovation',
  'excellence',
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

export function AboutValues() {
  const t = useTranslations('AboutUsPage.values')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className='relative py-14 sm:py-16 lg:py-20 bg-kci-surface overflow-hidden'>
      <div className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10'>
        <motion.div
          className='text-center max-w-3xl mx-auto mb-10 lg:mb-12'
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <p className='flex items-center justify-center gap-3 mb-4 text-sm font-medium text-kci-brand tracking-wide'>
            <span className='inline-block w-10 h-[2px] bg-kci-accent shrink-0' />
            {t('eyebrow')}
            <span className='inline-block w-10 h-[2px] bg-kci-accent shrink-0' />
          </p>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-3'>
            {t('title')}
          </h2>
          <span className='inline-flex items-center rounded-full bg-kci-brand px-5 py-2 text-sm font-bold tracking-[0.2em] text-white mb-4'>
            {t('subtitle')}
          </span>
          <p className='text-slate-600 leading-relaxed text-base'>
            {t('description')}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
          {valueKeys.map((key, index) => {
            const subtitle = t(`items.${key}.subtitle`)

            return (
              <motion.div
                key={key}
                className='bg-white rounded-2xl p-6 ring-1 ring-slate-200/80 hover:shadow-md transition-shadow duration-300'
                initial={{ opacity: 0, y: 28 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.12 + index * 0.08,
                  ease: easeOut,
                }}
              >
                <div className='flex items-start gap-4 mb-4'>
                  <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-kci-brand text-white text-xl font-bold'>
                    {t(`items.${key}.letter`)}
                  </div>
                  <div>
                    <h3 className='text-sm sm:text-base font-bold text-slate-900 leading-snug'>
                      {t(`items.${key}.title`)}
                    </h3>
                    {subtitle && (
                      <p className='text-xs text-kci-accent font-medium mt-0.5'>
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
                <p className='text-sm text-slate-500 leading-relaxed'>
                  {t(`items.${key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className='mt-10 text-center text-slate-600 leading-relaxed text-base max-w-3xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: 0.6, ease: easeOut }}
        >
          {t('closing')}
        </motion.p>
      </div>
    </section>
  )
}
