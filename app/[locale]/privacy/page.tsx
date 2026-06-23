'use client'

import { useTranslations } from 'next-intl'
import { PageHero } from '@/components/layout/PageHero'

export default function PrivacyPage() {
  const t = useTranslations('PrivacyPage')

  return (
    <main className='min-h-screen bg-kci-surface'>
      <PageHero title={t('hero.title')} description={t('hero.description')} />

      <section className='page-section'>
        <div className='page-container max-w-3xl'>
          <div className='bg-white rounded-2xl ring-1 ring-slate-200/80 p-6 sm:p-10 space-y-8 text-gray-700 leading-relaxed'>
            {(['collection', 'usage', 'sharing', 'rights', 'contact'] as const).map(
              (section) => (
                <div key={section}>
                  <h2 className='text-xl text-gray-900 mb-3'>
                    {t(`sections.${section}.title`)}
                  </h2>
                  <p>{t(`sections.${section}.body`)}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
