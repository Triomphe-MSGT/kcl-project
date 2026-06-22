'use client'

import { useTranslations } from 'next-intl'
import { PageCta } from '@/components/layout/PageCta'

export function AboutCta() {
  const t = useTranslations('AboutUsPage.cta')

  return (
    <PageCta
      title={t('title')}
      description={t('description')}
      button={t('button')}
    />
  )
}
