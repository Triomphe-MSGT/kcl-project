'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'

const serviceKeys = [
  'accounting',
  'sourcing',
  'events',
  'realEstate',
  'facilities',
  'travel',
  'fintech',
  'support',
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

export function AboutWhatWeDo() {
  const t = useTranslations('AboutUsPage.whatWeDo')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className='relative py-14 sm:py-16 lg:py-20 bg-white overflow-hidden'>
      <div
        className='pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-kci-brand/5 blur-3xl'
        aria-hidden='true'
      />

      <div className='page-container'>
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
          <p className='text-slate-600 leading-relaxed text-base'>
            {t('description')}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5'>
          {serviceKeys.map((key, index) => {
            const items = t.raw(`services.${key}.items`) as string[]

            return (
              <motion.div
                key={key}
                className='rounded-2xl bg-kci-surface p-6 ring-1 ring-slate-200/80'
                initial={{ opacity: 0, y: 28 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.06,
                  ease: easeOut,
                }}
              >
                <h3 className='text-base sm:text-lg font-bold text-slate-900 mb-4 leading-snug'>
                  {t(`services.${key}.title`)}
                </h3>
                <ul className='space-y-2.5'>
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed'
                    >
                      <CheckCircle2
                        size={16}
                        className='text-kci-accent shrink-0 mt-0.5'
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
