'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Search,
  HelpCircle,
  ChevronDown,
  Package,
  Briefcase,
  Truck,
  Headphones,
  DollarSign,
  Building2,
  X,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/layout/PageHero'
import { PageCta } from '@/components/layout/PageCta'

// Types
interface FAQ {
  id: number
  category: string
  keywords: string[]
}

interface FAQCategory {
  id: string
  icon: React.ElementType
  color: string
  bgColor: string
  gradient: string
}

// FAQ Categories with brand colors
const faqCategories: FAQCategory[] = [
  {
    id: 'all',
    icon: HelpCircle,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    id: 'financial',
    icon: DollarSign,
    color: 'text-kci-brand',
    bgColor: 'bg-kci-brand/10',
    gradient: 'from-kci-brand to-blue-600',
  },
  {
    id: 'procurement',
    icon: Package,
    color: 'text-kci-accent',
    bgColor: 'bg-kci-accent/10',
    gradient: 'from-kci-accent to-blue-500',
  },
  {
    id: 'logistics',
    icon: Truck,
    color: 'text-kci-warm',
    bgColor: 'bg-kci-warm/10',
    gradient: 'from-kci-warm to-orange-600',
  },
  {
    id: 'realEstate',
    icon: Building2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'strategy',
    icon: Briefcase,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500 to-indigo-600',
  },
]

// FAQ Data organized by categories
const faqData: FAQ[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1
  let category = 'strategy'
  if (id <= 10) category = 'financial'
  else if (id <= 20) category = 'procurement'
  else if (id <= 30) category = 'logistics'
  else if (id <= 40) category = 'realEstate'
  return { id, category, keywords: [] as string[] }
})

export default function FAQPage() {
  const t = useTranslations('FAQPage')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Calculate category counts
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return faqData.length
    }
    return faqData.filter((faq) => faq.category === categoryId).length
  }

  // Filter FAQs based on category and search term
  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory

    if (searchTerm === '') {
      return matchesCategory
    }

    const question = t(`faqs.${faq.id}.question`)
    const answer = t(`faqs.${faq.id}.answer`)
    const keywords = t.raw(`faqs.${faq.id}.keywords`) as string[]

    const matchesSearch =
      question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )

    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSelectedCategory('all')
  }

  return (
    <main className='min-h-screen bg-kci-surface'>
      <PageHero
        title={t('hero.title')}
        titleHighlight={t('hero.titleHighlight')}
        description={t('hero.description')}
      />

      <section className='page-section'>
        <div className='page-container'>
          {/* Search and Filter Bar */}
          <div className='bg-white/90 backdrop-blur-md rounded-xl border border-gray-100/30 shadow-lg mb-8 p-6'>
            <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
              <div className='flex-1 relative'>
                <Search
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-kci-brand transition-colors duration-200'
                  size={22}
                />
                <input
                  placeholder={t('search.placeholder')}
                  className='w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kci-brand/50 focus:border-transparent shadow-md bg-white/90 text-gray-800 placeholder-gray-400 transition-all duration-300'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-kci-brand transition-colors duration-200'
                  >
                    <X size={22} />
                  </button>
                )}
              </div>

              <div className='flex items-center gap-4'>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kci-brand/50 focus:border-transparent bg-white/90 text-gray-800 transition-all duration-300 appearance-none shadow-md min-w-[200px]'
                >
                  {faqCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {t(`categories.${category.id}.name`)} (
                      {getCategoryCount(category.id)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10'>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r ' +
                      category.gradient +
                      ' text-white shadow-lg transform scale-105'
                    : 'bg-white ring-1 ring-slate-200/80 hover:shadow-md hover:-translate-y-0.5 text-slate-700'
                }`}
              >
                <div className='flex flex-col items-center text-center'>
                  <div
                    className={`p-3 rounded-full mb-4 ${
                      selectedCategory === category.id
                        ? 'bg-white/20'
                        : category.bgColor
                    }`}
                  >
                    <category.icon
                      size={24}
                      className={
                        selectedCategory === category.id
                          ? 'text-white'
                          : category.color
                      }
                    />
                  </div>
                  <h3 className='text-sm font-semibold mb-1'>
                    {t(`categories.${category.id}.name`)}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {getCategoryCount(category.id)} {t('common.questions')}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className='space-y-4'>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const category = faqCategories.find(
                  (cat) => cat.id === faq.category
                )
                return (
                  <div
                    key={faq.id}
                    className='bg-white/90 backdrop-blur-md border border-gray-100/30 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden'
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className='w-full p-6 text-left flex justify-between items-start group'
                    >
                      <div className='flex-1 pr-4'>
                        <div className='flex items-center gap-3 mb-2'>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              category?.bgColor || 'bg-gray-100'
                            } ${category?.color || 'text-gray-600'}`}
                          >
                            {t(`categories.${category?.id || 'all'}.name`)}
                          </span>
                          <span className='bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs '>
                            #{faq.id.toString().padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-900 group-hover:text-kci-brand transition-colors duration-200'>
                          {t(`faqs.${faq.id}.question`)}
                        </h3>
                      </div>
                      <div className='flex items-center gap-2'>
                        <ChevronDown
                          size={24}
                          className={`text-kci-brand transition-transform duration-300 ${
                            openFAQ === faq.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {openFAQ === faq.id && (
                      <div className='border-t border-gray-100/30 p-6 bg-gradient-to-r from-gray-50/50 to-white/50'>
                        <div className='text-gray-700 leading-relaxed whitespace-pre-line mb-4'>
                          {t(`faqs.${faq.id}.answer`)}
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {t
                            .raw(`faqs.${faq.id}.keywords`)
                            .slice(0, 5)
                            .map((keyword: string, keywordIndex: number) => (
                              <span
                                key={keywordIndex}
                                className='inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs '
                              >
                                {keyword}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className='text-center py-16 bg-white/90 backdrop-blur-md rounded-xl border border-gray-100/30 shadow-lg'>
                <HelpCircle className='text-gray-400 mx-auto mb-4' size={64} />
                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                  {t('search.noResults.title')}
                </h3>
                <p className='text-gray-600 mb-8 text-lg max-w-md mx-auto'>
                  {t('search.noResults.description')}
                </p>
                <button
                  onClick={clearSearch}
                  className='bg-gradient-to-r from-kci-brand to-kci-accent hover:from-kci-brand/90 hover:to-kci-accent/90 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  {t('search.noResults.resetButton')}
                </button>
              </div>
            )}
          </div>

          <PageCta
            title={t('cta.title')}
            description={t('cta.description')}
            button={t('cta.buttonText')}
          />
        </div>
      </section>
    </main>
  )
}
