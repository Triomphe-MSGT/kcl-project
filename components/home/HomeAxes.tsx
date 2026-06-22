'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion, useInView } from 'motion/react'
import {
  Calculator,
  ShoppingCart,
  Calendar,
  Building2,
  Wrench,
  Plane,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

const axes = [
  {
    key: 'financial',
    icon: Calculator,
    href: '/services',
    image: '/images/home/axes/financial.jpg',
    featured: true,
  },
  {
    key: 'procurement',
    icon: ShoppingCart,
    href: '/procurement',
    image: '/images/home/axes/procurement.jpg',
    featured: false,
  },
  {
    key: 'events',
    icon: Calendar,
    href: '/services',
    image: '/images/home/axes/events.jpg',
    featured: false,
  },
  {
    key: 'realEstate',
    icon: Building2,
    href: '/services',
    image: '/images/home/axes/real-estate.jpg',
    featured: false,
  },
  {
    key: 'facilities',
    icon: Wrench,
    href: '/services',
    image: '/images/home/axes/facilities.jpg',
    featured: false,
  },
  {
    key: 'travel',
    icon: Plane,
    href: '/services',
    image: '/images/home/axes/travel.jpg',
    featured: false,
  },
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
} as const

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 56,
    scale: 0.92,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
} as const

const panelVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.15,
      ease: easeOut,
    },
  },
} as const

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
} as const

export function HomeAxes() {
  const t = useTranslations('HomePage.axes')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className='relative w-full py-14 sm:py-16 lg:py-20 bg-white overflow-hidden'
    >
      <div
        className='pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-kci-accent/5 blur-3xl'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-kci-brand/5 blur-3xl'
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
          <p className='text-slate-600 leading-relaxed text-base lg:text-lg max-w-2xl mx-auto'>
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'
          variants={gridVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {axes.map(({ key, icon: Icon, href, image, featured }) => (
            <motion.div
              key={key}
              className='h-[240px] sm:h-[260px]'
              variants={cardVariants}
            >
              <Link
                href={href}
                prefetch
                className={`group relative flex h-full w-full rounded-2xl overflow-hidden bg-slate-900 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 ${
                  featured
                    ? 'ring-2 ring-kci-accent/60 shadow-kci-brand/15'
                    : 'ring-1 ring-slate-200/60 hover:ring-kci-brand/30'
                }`}
              >
                <img
                  src={image}
                  alt=''
                  className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
                />

                <div className='absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/10 to-slate-900/80 transition-opacity duration-500 group-hover:via-slate-900/20 group-hover:to-slate-900/90' />

                {featured && (
                  <div
                    className='absolute inset-0 bg-gradient-to-br from-kci-brand/30 via-transparent to-kci-accent/20 opacity-80 group-hover:opacity-100 transition-opacity duration-500'
                    aria-hidden='true'
                  />
                )}

                <div className='relative z-10 flex h-full w-full flex-col p-5'>
                  <div className='flex items-start justify-between gap-3'>
                    <motion.div
                      variants={iconVariants}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl backdrop-blur-md border transition-all duration-300 group-hover:scale-105 ${
                        featured
                          ? 'bg-white/20 border-white/30 text-white shadow-lg shadow-kci-brand/20'
                          : 'bg-white/15 border-white/20 text-white group-hover:bg-kci-accent/25 group-hover:border-kci-accent/40'
                      }`}
                    >
                      <Icon size={20} />
                    </motion.div>

                    <div className='flex items-center gap-2'>
                      <span className='flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className='mt-auto'
                    variants={panelVariants}
                  >
                    <div className='rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-4 transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/25'>
                      <h3 className='text-base sm:text-lg font-bold text-white mb-1.5 leading-tight'>
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className='text-xs sm:text-sm text-white/80 leading-relaxed mb-3 line-clamp-2'>
                        {t(`items.${key}.description`)}
                      </p>
                      <span className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-kci-accent group-hover:text-sky-300 transition-colors'>
                        {t('learnMore')}
                        <ArrowRight
                          size={14}
                          className='group-hover:translate-x-1 transition-transform'
                        />
                      </span>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='mt-10 text-center'
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 24, scale: 0.96 }
          }
          transition={{ duration: 0.6, delay: 0.85, ease: easeOut }}
        >
          <Link
            href='/services'
            prefetch
            className='inline-flex items-center gap-2 bg-kci-brand hover:bg-kci-brand-light text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 shadow-md shadow-kci-brand/20 hover:shadow-lg hover:shadow-kci-brand/30'
          >
            {t('viewAll')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
