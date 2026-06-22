'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { MapPin, Phone, Globe } from 'lucide-react'

const offices = [
  { key: 'yaounde', image: '/images/offices/yaounde.jpg', flag: '🇨🇲' },
  { key: 'lagos', image: '/images/offices/lagos.jpg', flag: '🇳🇬' },
  { key: 'guangzhou', image: '/images/offices/guangzhou.jpg', flag: '🇨🇳' },
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

const contentVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: 0.3, ease: easeOut },
  },
} as const

const imageVariants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: { duration: 0.3, ease: easeOut },
  },
} as const

export function HomePresence() {
  const t = useTranslations('HomePage.presence')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const [imageReady, setImageReady] = useState(true)

  useEffect(() => {
    offices.forEach((o) => {
      const img = new window.Image()
      img.src = o.image
    })
  }, [])

  const current = offices[active]

  const switchOffice = (index: number) => {
    if (index === active) return
    setImageReady(false)
    setActive(index)
  }

  return (
    <section
      ref={sectionRef}
      className='relative w-full py-14 sm:py-16 lg:py-20 bg-kci-surface overflow-hidden'
    >
      <div
        className='pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full bg-kci-brand/6 blur-3xl'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-kci-accent/6 blur-3xl'
        aria-hidden='true'
      />

      <div className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10'>
        <motion.div
          className='text-center max-w-2xl mx-auto mb-10 lg:mb-12'
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <p className='flex items-center justify-center gap-3 mb-5 text-sm font-medium text-kci-brand tracking-wide'>
            <span
              className='inline-block w-10 h-[2px] bg-kci-accent shrink-0'
              aria-hidden='true'
            />
            {t('eyebrow')}
            <span
              className='inline-block w-10 h-[2px] bg-kci-accent shrink-0'
              aria-hidden='true'
            />
          </p>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-3'>
            {t('title')}
          </h2>
          <p className='text-slate-600 leading-relaxed text-base lg:text-lg'>
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          className='flex flex-wrap justify-center gap-2 sm:gap-3 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: 0.15, ease: easeOut }}
        >
          {offices.map((office, index) => (
            <button
              key={office.key}
              type='button'
              onClick={() => switchOffice(index)}
              className={`relative px-5 sm:px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                active === index
                  ? 'text-white'
                  : 'bg-white text-slate-600 hover:bg-kci-brand/5 hover:text-kci-brand shadow-sm ring-1 ring-slate-200/80'
              }`}
            >
              {active === index && (
                <motion.span
                  layoutId='presence-tab'
                  className='absolute inset-0 rounded-full bg-kci-brand shadow-md shadow-kci-brand/25'
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className='relative z-10 flex items-center gap-2'>
                <span aria-hidden='true'>{office.flag}</span>
                {t(`offices.${office.key}.city`)}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          className='grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80 bg-white'
          initial={{ opacity: 0, y: 48, scale: 0.96, filter: 'blur(8px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, y: 48, scale: 0.96, filter: 'blur(8px)' }
          }
          transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
        >
          <div className='relative min-h-[240px] sm:min-h-[300px] lg:min-h-[380px] order-1 lg:order-2 overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={current.key}
                variants={imageVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='absolute inset-0'
              >
                <Image
                  src={current.image}
                  alt={t(`offices.${current.key}.city`)}
                  fill
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  onLoad={() => setImageReady(true)}
                  className={`object-cover transition-opacity duration-300 ${
                    imageReady ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-kci-bar/70 via-kci-bar/20 to-transparent' />
                <div className='absolute bottom-5 left-5 right-5'>
                  <span className='inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 text-xs font-semibold text-white uppercase tracking-wider'>
                    <Globe size={13} className='text-kci-accent' />
                    {t(`offices.${current.key}.role`)}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={current.key}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <div className='flex items-center gap-2 text-kci-accent mb-4'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-kci-accent/10'>
                    <MapPin size={18} />
                  </div>
                  <span className='text-xs font-bold uppercase tracking-wider text-kci-brand'>
                    {t(`offices.${current.key}.role`)}
                  </span>
                </div>

                <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight'>
                  {t(`offices.${current.key}.name`)}
                </h3>

                <p className='text-slate-600 leading-relaxed text-base mb-6'>
                  {t(`offices.${current.key}.description`)}
                </p>

                <div className='space-y-3 rounded-xl bg-kci-surface p-4 ring-1 ring-slate-200/60'>
                  <p className='flex items-start gap-2.5 text-sm text-slate-600'>
                    <MapPin
                      size={16}
                      className='text-kci-warm shrink-0 mt-0.5'
                      aria-hidden='true'
                    />
                    {t(`offices.${current.key}.address`)}
                  </p>
                  <p className='flex items-center gap-2.5 text-sm font-semibold text-kci-brand'>
                    <Phone size={16} className='text-kci-warm shrink-0' />
                    {t(`offices.${current.key}.phone`)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3'
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.45, ease: easeOut }}
        >
          {offices.map((office, index) => (
            <button
              key={office.key}
              type='button'
              onClick={() => switchOffice(index)}
              className={`group text-left rounded-xl p-4 transition-all duration-300 ${
                active === index
                  ? 'bg-white shadow-md ring-2 ring-kci-brand/30'
                  : 'bg-white/60 ring-1 ring-slate-200/60 hover:bg-white hover:shadow-sm'
              }`}
            >
              <p className='flex items-center gap-2 text-sm font-bold text-slate-900 mb-1'>
                <span aria-hidden='true'>{office.flag}</span>
                {t(`offices.${office.key}.city`)}
              </p>
              <p className='text-xs text-slate-500 leading-snug'>
                {t(`offices.${office.key}.role`)}
              </p>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
