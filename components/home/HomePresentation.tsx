'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion, useInView } from 'motion/react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const highlightKeys = ['founded', 'hubs', 'approach'] as const

const floatClasses = [
  'presentation-float',
  'presentation-float-alt',
  'presentation-float presentation-float-delay-2',
]

const easeOut = [0.22, 1, 0.36, 1] as const

export function HomePresentation() {
  const t = useTranslations('HomePage.presentation')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className='relative w-full py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-kci-surface overflow-x-clip'
    >
      {/* Décor symétrique */}
      <div
        className='pointer-events-none absolute top-16 -left-24 h-64 w-64 rounded-full bg-kci-accent/8 blur-3xl'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute bottom-16 -right-24 h-64 w-64 rounded-full bg-kci-brand/8 blur-3xl'
        aria-hidden='true'
      />

      <div className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10'>
        <div className='grid md:grid-cols-12 gap-8 md:gap-6 lg:gap-8 xl:gap-10 items-center'>
          {/* Visuel — entre depuis la gauche */}
          <motion.div
            className='md:col-span-5 relative order-2 md:order-1 md:pb-4 xl:pb-20 min-w-0'
            initial={{ opacity: 0, x: -48 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
            transition={{ duration: 0.75, ease: easeOut }}
          >
            <div
              className='absolute -top-3 -left-3 h-full w-full rounded-2xl border-2 border-kci-accent/25 -z-10'
              aria-hidden='true'
            />
            <div
              className='absolute -bottom-3 -right-3 h-full w-full rounded-2xl bg-kci-brand/8 -z-10'
              aria-hidden='true'
            />

            <motion.div
              className='relative w-full max-w-sm mx-auto md:max-w-none max-h-[min(420px,55vh)] sm:max-h-[min(440px,58vh)] md:max-h-[min(320px,48vh)] lg:max-h-[min(360px,52vh)] xl:max-h-[min(460px,58vh)] aspect-[4/5] md:aspect-[3/4] rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-200/80 bg-slate-200 presentation-float'
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <img
                src='/images/home/presentation.jpg'
                alt='Équipe de conseil KC International'
                className='w-full h-full object-cover object-center'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-kci-bar/50 via-transparent to-transparent' />
            </motion.div>

            <div className='mt-4 grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-2 lg:gap-2.5 xl:absolute xl:-bottom-5 xl:-right-4 xl:mt-0 xl:w-[calc(100%-1.5rem)]'>
              {highlightKeys.map((key, index) => (
                <motion.div
                  key={key}
                  className={`bg-white rounded-lg px-1.5 py-2.5 sm:px-2 sm:py-3 md:px-1.5 md:py-2.5 lg:px-2 lg:py-3 text-center shadow-md ring-1 ring-slate-100 min-w-0 ${floatClasses[index]}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.25 + index * 0.12,
                    ease: easeOut,
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 16px 32px rgb(15 23 42 / 12%)',
                  }}
                >
                  <p className='text-base sm:text-lg md:text-base lg:text-lg xl:text-xl font-bold text-kci-brand leading-none'>
                    {t(`highlights.${key}.value`)}
                  </p>
                  <p className='text-[10px] sm:text-[11px] md:text-[10px] lg:text-[11px] xl:text-xs text-slate-500 mt-1.5 sm:mt-2 leading-snug line-clamp-2'>
                    {t(`highlights.${key}.label`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contenu — entre depuis la droite */}
          <motion.div
            className='md:col-span-7 order-1 md:order-2 md:pl-2 lg:pl-4 min-w-0'
            initial={{ opacity: 0, x: 48 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.1 }}
          >
            <motion.p
              className='flex items-center gap-3 mb-5 text-sm font-medium text-kci-brand tracking-wide'
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
            >
              <span
                className='inline-block w-10 h-[2px] bg-kci-accent shrink-0'
                aria-hidden='true'
              />
              {t('eyebrow')}
            </motion.p>

            <motion.h2
              className='text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 leading-tight mb-4 md:mb-5'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.28, ease: easeOut }}
            >
              {t('title')}
            </motion.h2>

            <div className='space-y-3 md:space-y-3.5 lg:space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base mb-5 md:mb-6'>
              {[t('paragraph1'), t('paragraph2')].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.36 + index * 0.1,
                    ease: easeOut,
                  }}
                >
                  {text}
                </motion.p>
              ))}
              <motion.p
                className='flex items-start gap-3'
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.55, delay: 0.56, ease: easeOut }}
              >
                <CheckCircle2
                  size={20}
                  className='text-kci-accent shrink-0 mt-1'
                  aria-hidden='true'
                />
                <span>{t('paragraph3')}</span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.65, ease: easeOut }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href='/about'
                prefetch
                className='inline-flex items-center gap-2 bg-kci-brand hover:bg-kci-brand-light text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full transition-colors duration-300 shadow-md shadow-kci-brand/20'
              >
                {t('link')}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
