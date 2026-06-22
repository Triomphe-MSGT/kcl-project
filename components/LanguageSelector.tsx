'use client'

import { useLocale, Locale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'

type Language = {
  code: 'fr' | 'en'
  name: string
  flag: string
}

const languages: Language[] = [
  {
    code: 'fr',
    name: 'French',
    flag: 'https://flagcdn.com/w20/fr.png',
  },
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/w20/gb.png',
  },
]

type LanguageSelectorProps = {
  variant?: 'desktop' | 'mobile'
  onMobileClose?: () => void
  light?: boolean
}

export function LanguageSelector({
  variant = 'desktop',
  onMobileClose,
  light = false,
}: LanguageSelectorProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current language based on locale
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0]

  const handleLanguageChange = (language: Language) => {
    const query = Object.fromEntries(searchParams)
    router.replace({ pathname, query }, { locale: language.code as Locale })

    if (variant === 'mobile' && onMobileClose) {
      onMobileClose()
    }
  }

  if (variant === 'desktop') {
    return (
      <div className='flex items-center space-x-2'>
        <img
          src={currentLanguage.flag}
          alt={`${currentLanguage.name} flag`}
          className='w-5 h-auto'
        />
        <select
          value={currentLanguage.code}
          onChange={(e) => {
            const selectedLang = languages.find(
              (lang) => lang.code === e.target.value
            )
            if (selectedLang) handleLanguageChange(selectedLang)
          }}
          className={`border-none bg-transparent text-sm xl:text-base font-semibold focus:outline-none cursor-pointer ${
            light ? 'text-white' : 'text-gray-700'
          }`}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.code.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // Mobile variant
  return (
    <div className='flex items-center space-x-3 mb-3'>
      <img
        src={currentLanguage.flag}
        alt={`${currentLanguage.name} flag`}
        className='w-5 h-auto'
      />
      <select
        value={currentLanguage.code}
        onChange={(e) => {
          const selectedLang = languages.find(
            (lang) => lang.code === e.target.value
          )
          if (selectedLang) handleLanguageChange(selectedLang)
        }}
        className='flex-1 py-2 px-3 border border-gray-200 rounded-md text-gray-700 text-base font-medium focus:outline-none focus:ring-2 focus:ring-kci-brand'
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  )
}
