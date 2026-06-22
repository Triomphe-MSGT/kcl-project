'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type HeroSlide = {
  id: number
  image: string
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://kimi-web-img.moonshot.cn/img/www.thehabarinetwork.com/fd34a554b2043404824b5ae4d66c133d4d359bb8.jpg',
    
  },
  {
    id: 2,
    image: '/images/home/hero-2.jpg',
  },
  {
    id: 3,
    image: '/images/home/hero-3.jpg',
  },
]

function useLoopingTypewriter(
  text: string,
  typeMs = 28,
  deleteMs = 16,
  pauseFull = 3200,
  pauseEmpty = 700
) {
  const [value, setValue] = useState('')

  useEffect(() => {
    let index = 0
    let deleting = false
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout>

    const run = () => {
      if (cancelled) return

      if (!deleting) {
        if (index < text.length) {
          index += 1
          setValue(text.slice(0, index))
          timeout = setTimeout(run, typeMs)
        } else {
          timeout = setTimeout(() => {
            deleting = true
            run()
          }, pauseFull)
        }
      } else if (index > 0) {
        index -= 1
        setValue(text.slice(0, index))
        timeout = setTimeout(run, deleteMs)
      } else {
        deleting = false
        timeout = setTimeout(run, pauseEmpty)
      }
    }

    setValue('')
    run()

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [text, typeMs, deleteMs, pauseFull, pauseEmpty])

  return value
}

function TypewriterCursor() {
  return (
    <span
      className='hero-cursor inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-kci-accent rounded-sm'
      aria-hidden='true'
    />
  )
}

export function HomeHero() {
  const t = useTranslations('HomePage.hero')
  const [activeSlide, setActiveSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const headline1 = t('headline.part1')
  const headline2 = t('headline.part2')
  const headlineFull = `${headline1}\n${headline2}`
  const headlineTw = useLoopingTypewriter(headlineFull, 55, 32, 2800, 600)

  const newlineIndex = headlineTw.indexOf('\n')
  const displayedLine1 =
    newlineIndex === -1 ? headlineTw : headlineTw.slice(0, newlineIndex)
  const displayedLine2 =
    newlineIndex === -1 ? '' : headlineTw.slice(newlineIndex + 1)
  const isTypingLine2 = headlineTw.includes('\n')

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveSlide(index)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  useEffect(() => {
    const timer = setTimeout(nextSlide, 12000)
    return () => clearTimeout(timer)
  }, [activeSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
    setTouchStart(null)
  }

  return (
    <section
      className='relative w-full min-h-screen h-screen overflow-hidden'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className='absolute inset-0 w-full h-full'>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt=''
              className='w-full h-full object-cover object-center'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-kci-brand/70 via-kci-brand/50 to-kci-brand/35' />
          </div>
        ))}
      </div>

      <div className='relative z-20 flex items-center h-full w-full pt-28 sm:pt-32 lg:pt-36 pb-20'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16'>
          <div className='max-w-3xl'>
            <p className='flex items-center gap-3 mb-6 text-sm md:text-base font-medium text-white/90 hero-text-shadow'>
              <span
                className='inline-block w-10 h-[2px] bg-kci-accent/80 shrink-0'
                aria-hidden='true'
              />
              <span className='tracking-wide'>{t('tagline')}</span>
            </p>

            <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 hero-text-shadow min-h-[2.6em] sm:min-h-[2.4em]'>
              <span className='text-white'>
                {displayedLine1}
                {!isTypingLine2 && <TypewriterCursor />}
              </span>
              {isTypingLine2 && (
                <>
                  <br />
                  <span className='text-kci-warm hero-glow-warm'>
                    {displayedLine2}
                    <TypewriterCursor />
                  </span>
                </>
              )}
            </h1>

            <p className='text-white text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-xl lg:max-w-2xl font-bold hero-text-shadow'>
              {t('description')}
            </p>

            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>
              <Link
                href='/services'
                prefetch
                className='inline-flex items-center justify-center bg-kci-accent hover:bg-sky-300 text-white text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-kci-accent/50 ring-2 ring-white/20'
              >
                {t('cta.primary')}
              </Link>
              <Link
                href='/contact'
                prefetch
                className='inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-kci-brand text-sm font-bold uppercase tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-black/20'
              >
                {t('cta.secondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 flex justify-center px-4'>
        <div className='flex gap-2'>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type='button'
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === activeSlide
                  ? 'w-10 sm:w-12 h-1.5 bg-kci-accent rounded-full shadow-[0_0_8px_#00adee]'
                  : 'w-3 h-1.5 bg-white/50 hover:bg-white/80 rounded-full'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
