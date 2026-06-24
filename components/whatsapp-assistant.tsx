'use client'

import { useState } from 'react'
import { X, Clock } from 'lucide-react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

const WHATSAPP_CONFIG = {
  phoneNumber: '+237683242277',
}

export function WhatsAppAssistant({ embedded = false }: { embedded?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const t = useTranslations('whatsapp')

  const quickMessages = [
    t('quickMessages.0'),
    t('quickMessages.1'),
    t('quickMessages.2'),
    t('quickMessages.3'),
  ]

  const openWhatsApp = (
    message: string = customMessage || t('config.defaultMessage')
  ) => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
  }

  const isBusinessHours = () => {
    const now = new Date()
    const hour = now.getHours()
    return hour >= 9 && hour <= 18 && now.getDay() >= 1 && now.getDay() <= 5
  }

  const rootClass = embedded ? 'relative' : 'fixed bottom-6 right-6 z-50'

  return (
    <div className={rootClass}>
      {isOpen && (
        <>
          <button
            type='button'
            className='fixed inset-0 z-40 bg-black/40 sm:hidden'
            onClick={() => setIsOpen(false)}
            aria-label={t('texts.closeButton')}
          />
          <div className='fixed sm:absolute inset-x-3 sm:inset-x-auto bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-full sm:mb-4 left-auto right-0 sm:right-0 w-[min(20rem,calc(100vw-1.5rem))] max-h-[min(32rem,calc(100dvh-6rem))] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 z-50'>
          <div className='bg-gradient-to-r from-green-500 to-green-600 p-4 text-white'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                  <IconBrandWhatsapp size={22} className='text-white' />
                </div>
                <div>
                  <h3 className='font-bold text-sm'>{t('texts.title')}</h3>
                  <p className='text-green-100 text-xs'>{t('texts.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='p-1 hover:bg-white/20 rounded-full transition-colors'
                aria-label={t('texts.closeButton')}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className='p-4'>
            <div className='mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100'>
              <div className='flex items-center space-x-2 mb-1'>
                <Clock size={14} className='text-blue-600' />
                <span className='text-xs font-medium text-blue-700'>
                  {t('texts.businessHours')}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isBusinessHours() ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <p className='text-xs text-blue-600'>
                {t('businessHours.hours')} ({t('businessHours.days')}) ·{' '}
                {t('businessHours.timezone')}
              </p>
              <p className='text-xs text-blue-500 mt-1'>{t('texts.responseTime')}</p>
            </div>

            <div className='mb-4'>
              <p className='text-xs font-medium text-gray-700 mb-2'>
                {t('texts.quickReplies')}
              </p>
              <div className='space-y-2'>
                {quickMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => openWhatsApp(message)}
                    className='w-full text-left p-2 text-xs bg-gray-50 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors border border-transparent hover:border-green-200'
                  >
                    {message}
                  </button>
                ))}
              </div>
            </div>

            <div className='mb-4'>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={t('texts.placeholder')}
                className='w-full p-3 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                rows={3}
              />
            </div>

            <button
              onClick={() => openWhatsApp()}
              className='w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'
            >
              <IconBrandWhatsapp size={18} />
              <span>{t('texts.sendButton')}</span>
            </button>
          </div>
          </div>
        </>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className='h-11 w-11 sm:h-14 sm:w-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation shrink-0'
        aria-label='WhatsApp Assistant'
      >
        {isOpen ? (
          <X size={22} className='sm:h-6 sm:w-6' />
        ) : (
          <>
            <IconBrandWhatsapp size={24} className='sm:hidden' />
            <IconBrandWhatsapp size={28} className='hidden sm:block' />
          </>
        )}
      </button>
    </div>
  )
}
