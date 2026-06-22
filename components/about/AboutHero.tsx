'use client'

import { useTranslations } from 'next-intl'
import { PageHero } from '@/components/layout/PageHero'

export function AboutHero() {
  const t = useTranslations('AboutUsPage.hero')

  return (
    <PageHero
      align='left'
      eyebrow={t('eyebrow')}
      title={t('title')}
      description={t('paragraph1')}
    />
  )
}
