'use client'

import { usePathname } from '@/i18n/navigation'
import { useEffect, useRef, useState } from 'react'

export function NavigationProgress() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setVisible(true)
    setWidth(30)

    const raf = requestAnimationFrame(() => setWidth(70))

    timerRef.current = setTimeout(() => {
      setWidth(100)
      setTimeout(() => {
        setVisible(false)
        setWidth(0)
      }, 120)
    }, 180)

    return () => {
      cancelAnimationFrame(raf)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [pathname])

  if (!visible && width === 0) return null

  return (
    <div
      className='fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none'
      aria-hidden='true'
    >
      <div
        className='h-full bg-kci-accent transition-[width] duration-200 ease-out'
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
