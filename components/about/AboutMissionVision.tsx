'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { Target, Eye } from 'lucide-react'

const easeOut = [0.22, 1, 0.36, 1] as const

export function AboutMissionVision() {
  const t = useTranslations('AboutUsPage')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className='relative py-14 sm:py-16 bg-white'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10'>
        <div className='grid lg:grid-cols-2 gap-4 lg:gap-5'>
          <motion.div
            className='relative rounded-2xl bg-kci-brand p-8 sm:p-10 overflow-hidden'
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <div
              className='pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 blur-2xl'
              aria-hidden='true'
            />
            <div className='relative flex items-center gap-3 mb-5'>
              <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-kci-accent'>
                <Target size={22} />
              </div>
              <h3 className='text-xl sm:text-2xl font-bold text-white'>
                {t('mission.title')}
              </h3>
            </div>
            <p className='relative text-white/80 leading-relaxed text-sm sm:text-base'>
              {t('mission.description')}
            </p>
          </motion.div>

          <motion.div
            className='relative rounded-2xl bg-kci-bar p-8 sm:p-10 overflow-hidden ring-1 ring-kci-warm/20'
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
          >
            <div
              className='pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-kci-accent/15 blur-2xl'
              aria-hidden='true'
            />
            <div className='relative flex items-center gap-3 mb-5'>
              <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-kci-warm/20 text-kci-warm'>
                <Eye size={22} />
              </div>
              <h3 className='text-xl sm:text-2xl font-bold text-white'>
                {t('vision.title')}
              </h3>
            </div>
            <p className='relative text-white/75 leading-relaxed text-sm sm:text-base'>
              {t('vision.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
