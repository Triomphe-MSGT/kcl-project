'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const easeOut = [0.22, 1, 0.36, 1] as const

type PageHeroProps = {
  eyebrow?: string
  title: string
  titleHighlight?: string
  description?: string
  align?: 'left' | 'center'
  image?: string
}

export function PageHero({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = 'center',
  image = '/images/home/hero-2.jpg',
}: PageHeroProps) {
  const isCenter = align === 'center'

  return (
    <section className='relative pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 overflow-hidden'>
      <Image
        src={image}
        alt=''
        fill
        priority
        className='object-cover'
        aria-hidden
        sizes='100vw'
      />
      <div
        className='absolute inset-0 bg-gradient-to-br from-kci-brand/92 via-kci-brand/85 to-kci-bar/95'
        aria-hidden='true'
      />

      <div className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10'>
        <motion.div
          className={isCenter ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          {eyebrow && (
            <p
              className={`flex items-center gap-3 mb-5 text-sm font-medium text-kci-accent tracking-wide ${
                isCenter ? 'justify-center' : ''
              }`}
            >
              <span
                className='inline-block w-10 h-[2px] bg-kci-accent shrink-0'
                aria-hidden='true'
              />
              {eyebrow}
              {isCenter && (
                <span
                  className='inline-block w-10 h-[2px] bg-kci-accent shrink-0'
                  aria-hidden='true'
                />
              )}
            </p>
          )}

          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4'>
            {title}
            {titleHighlight && (
              <span className='block text-kci-warm mt-1'>{titleHighlight}</span>
            )}
          </h1>

          {description && (
            <p className='text-sm sm:text-base md:text-lg text-white/85 leading-relaxed'>
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
