'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  Search,
  Grid3X3,
  List,
  Truck,
  Calendar,
  Building2,
  Ship,
  Car,
  ChefHat,
  Volume2,
  DollarSign,
  Users,
  Wrench,
  ShoppingBag,
  TrendingUp,
  Target,
  Calculator,
  BarChart3,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle,
  Filter,
  X,
  MapPin,
  FileText,
  Package,
} from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { siteImages } from '@/lib/site-images'

// Types
interface ServiceSubcategory {
  key: string
  icon: React.ElementType
  image: string
}

interface ServiceCategory {
  id: string
  icon: React.ElementType
  color: string
  bgColor: string
  gradient: string
  subcategories: ServiceSubcategory[]
  totalClients: number
  image: string
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'accounting',
    icon: Calculator,
    color: 'text-kci-brand',
    bgColor: 'bg-kci-brand/10',
    gradient: 'from-kci-brand to-blue-600',
    totalClients: 320,
    image: siteImages.services.accounting,
    subcategories: [
      {
        key: 'accounting',
        icon: BarChart3,
        image: siteImages.services.accountingAudit,
      },
      {
        key: 'businessCreation',
        icon: Target,
        image: siteImages.services.businessCreation,
      },
      {
        key: 'dsf',
        icon: FileText,
        image: siteImages.services.dsf,
      },
    ],
  },
  {
    id: 'fintech',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-teal-600',
    totalClients: 210,
    image: siteImages.services.fintech,
    subcategories: [
      {
        key: 'fintech',
        icon: DollarSign,
        image: siteImages.services.fintech,
      },
    ],
  },
  {
    id: 'procurementLogistics',
    icon: Truck,
    color: 'text-kci-accent',
    bgColor: 'bg-kci-accent/10',
    gradient: 'from-kci-accent to-blue-600',
    totalClients: 450,
    image: siteImages.services.procurement,
    subcategories: [
      {
        key: 'sourcing',
        icon: ShoppingBag,
        image: siteImages.services.sourcing,
      },
      {
        key: 'freight',
        icon: Ship,
        image: siteImages.services.freight,
      },
      {
        key: 'delivery',
        icon: Car,
        image: siteImages.services.delivery,
      },
    ],
  },
  {
    id: 'eventManagement',
    icon: Calendar,
    color: 'text-kci-warm',
    bgColor: 'bg-kci-warm/10',
    gradient: 'from-kci-warm to-orange-600',
    totalClients: 320,
    image: siteImages.services.events,
    subcategories: [
      {
        key: 'budget',
        icon: DollarSign,
        image: siteImages.services.eventBudget,
      },
      {
        key: 'audiovisual',
        icon: Volume2,
        image: siteImages.services.eventAv,
      },
      {
        key: 'catering',
        icon: ChefHat,
        image: siteImages.services.eventCatering,
      },
      {
        key: 'staff',
        icon: Users,
        image: siteImages.services.eventStaff,
      },
    ],
  },
  {
    id: 'facilitiesManagement',
    icon: Building2,
    color: 'text-kci-accent',
    bgColor: 'bg-kci-accent/10',
    gradient: 'from-kci-accent to-blue-600',
    totalClients: 180,
    image: siteImages.services.facilities,
    subcategories: [
      {
        key: 'maintenance',
        icon: Wrench,
        image: siteImages.services.maintenance,
      },
      {
        key: 'cleaning',
        icon: Sparkles,
        image: siteImages.services.cleaning,
      },
      {
        key: 'staffing',
        icon: Users,
        image: siteImages.services.staffing,
      },
    ],
  },
  {
    id: 'realEstate',
    icon: Building2,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    gradient: 'from-amber-500 to-orange-600',
    totalClients: 150,
    image: siteImages.services.realEstate,
    subcategories: [
      {
        key: 'brokerage',
        icon: MapPin,
        image: siteImages.services.brokerage,
      },
      {
        key: 'promotion',
        icon: TrendingUp,
        image: siteImages.services.promotion,
      },
    ],
  },
]

export default function ServicesPage() {
  const t = useTranslations('ServicesPage')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedSubcategory, setSelectedSubcategory] = useState<{
    categoryId: string
    subcategoryKey: string
    image: string
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter categories based on search and selection
  const filteredCategories = serviceCategories.filter((category) => {
    const categoryName = t(`categories.${category.id}.name`)
    const matchesSearch =
      categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some((sub) =>
        t(`categories.${category.id}.subcategories.${sub.key}.name`)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    const matchesCategory =
      selectedCategory === 'all' || category.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const openSubcategoryModal = (
    categoryId: string,
    subcategoryKey: string,
    image: string
  ) => {
    setSelectedSubcategory({ categoryId, subcategoryKey, image })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedSubcategory(null)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = ''
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isModalOpen])

  return (
    <main className='min-h-screen bg-kci-surface'>
      <PageHero
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <section className='page-section'>
        <div className='page-container'>
          {/* Search and Filters */}
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
                {/* Category Filter */}
                <div className='relative'>
                  <Filter
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-kci-brand transition-colors duration-200'
                    size={18}
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kci-brand/50 focus:border-transparent bg-white/90 text-gray-800 transition-all duration-300 appearance-none shadow-md'
                  >
                    <option value='all'>{t('search.allServices')}</option>
                    {serviceCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {t(`categories.${category.id}.name`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className='flex border border-gray-200 rounded-lg overflow-hidden shadow-md'>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-kci-brand text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid3X3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-kci-brand text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div
            className={`grid gap-6 mb-12 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-white/90 backdrop-blur-md border border-gray-100/30 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden rounded-lg ${
                  viewMode === 'list' ? 'flex flex-row' : 'flex flex-col h-full'
                }`}
              >
                <div
                  className={`relative overflow-hidden group ${
                    viewMode === 'list' ? 'w-1/3' : 'h-48'
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={t(`categories.${category.id}.name`)}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
                  <div className='absolute top-4 left-4'>
                    <div className='p-2 bg-white/90 rounded-full shadow-md'>
                      <category.icon className={category.color} size={22} />
                    </div>
                  </div>
                  <div className='absolute bottom-4 right-4'>
                    <span
                      className={`bg-gradient-to-r ${category.gradient} text-white tracking-wide px-3 py-1 rounded-full text-sm`}
                    >
                      {t(`categories.${category.id}.badge`)}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-6 ${
                    viewMode === 'list' ? 'flex-1' : 'flex-1 flex flex-col'
                  }`}
                >
                  <div className='p-0 mb-4'>
                    <h3 className='text-xl font-bold text-gray-900 flex items-center justify-between tracking-wide mb-2'>
                      {t(`categories.${category.id}.name`)}
                      <ChevronRight
                        className='text-kci-brand group-hover:scale-110 transition-transform duration-200'
                        size={22}
                      />
                    </h3>
                    <p className='text-gray-600 tracking-wide mb-2'>
                      {t(`categories.${category.id}.description`)}
                    </p>
                    <div className='flex items-center text-sm text-gray-500 mt-2'>
                      <Users size={14} className='mr-1' />
                      <span className=''>
                        {category.totalClients}+{' '}
                        {t(`categories.${category.id}.clientsServed`)}
                      </span>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div
                    className={`mb-6 ${viewMode === 'grid' ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`grid gap-2 ${
                        viewMode === 'list'
                          ? 'grid-cols-1 lg:grid-cols-2'
                          : 'grid-cols-1'
                      }`}
                    >
                      {category.subcategories
                        .slice(0, viewMode === 'list' ? 6 : 4)
                        .map((subcategory, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              openSubcategoryModal(
                                category.id,
                                subcategory.key,
                                subcategory.image
                              )
                            }
                            className='flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 text-left border border-gray-100/30 group'
                          >
                            <subcategory.icon
                              className={`${category.color} mr-3 group-hover:scale-110 transition-transform duration-200`}
                              size={18}
                            />
                            <div className='flex-1'>
                              <div className='font-medium text-gray-900 text-sm tracking-wide'>
                                {t(
                                  `categories.${category.id}.subcategories.${subcategory.key}.name`
                                )}
                              </div>
                            </div>
                            <ChevronRight
                              size={16}
                              className='text-gray-400 group-hover:text-kci-brand transition-colors duration-200'
                            />
                          </button>
                        ))}
                      {category.subcategories.length >
                        (viewMode === 'list' ? 6 : 4) && (
                        <div className='text-center py-2'>
                          <span className='text-sm text-gray-500 '>
                            +
                            {category.subcategories.length -
                              (viewMode === 'list' ? 6 : 4)}{' '}
                            {t('common.moreServices')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className='text-center py-12 bg-white/90 backdrop-blur-md rounded-xl border border-gray-100/30 shadow-lg'>
              <Package className='text-gray-400 mx-auto mb-4' size={64} />
              <h3 className='text-xl font-semibold text-gray-900 mb-2 tracking-wide'>
                {t('search.noResults.title')}
              </h3>
              <p className='text-gray-600 mb-6 tracking-wide'>
                {t('search.noResults.description')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className='bg-gradient-to-r from-kci-brand to-kci-accent hover:from-kci-brand/90 hover:to-kci-accent/90 text-white tracking-wide shadow-md hover:shadow-lg px-6 py-3 rounded-lg'
              >
                {t('search.noResults.resetButton')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Subcategory Modal */}
      {isModalOpen && selectedSubcategory && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto'>
          <div className='w-full sm:max-w-4xl max-h-[92dvh] sm:max-h-[95vh] overflow-y-auto bg-white/95 backdrop-blur-md rounded-t-2xl sm:rounded-xl border border-gray-100/30 shadow-xl relative'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/90 rounded-full shadow-md hover:shadow-lg z-10'
              aria-label={t('modal.close')}
            >
              <X size={20} />
            </button>

            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div className='relative h-[220px] sm:h-[280px] lg:h-full min-h-[200px] overflow-hidden'>
                <Image
                  src={selectedSubcategory.image}
                  alt={t(
                    `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.name`
                  )}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                <div className='absolute bottom-6 left-6'>
                  <h3 className='text-white text-2xl font-bold mb-2 tracking-wide'>
                    {t(
                      `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.name`
                    )}
                  </h3>
                </div>
              </div>

              <div className='p-8'>
                <div className='mb-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-2 tracking-wide'>
                    {t('modal.serviceDetails')}
                  </h3>
                  <p className='text-gray-600 tracking-wide'>
                    {t(
                      `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.description`
                    )}
                  </p>
                </div>

                {/* Service Details */}
                <div className='space-y-6 mb-8'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='p-3 bg-gray-50 rounded-lg border border-gray-200'>
                      <div className='flex items-center mb-2'>
                        <Clock className='text-kci-brand mr-2' size={16} />
                        <span className='text-sm font-medium text-gray-900 '>
                          {t('modal.duration')}
                        </span>
                      </div>
                      <span className='text-sm text-gray-600 '>
                        {t(
                          `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.duration`
                        )}
                      </span>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-lg border border-gray-200'>
                      <div className='flex items-center mb-2'>
                        <DollarSign className='text-kci-warm mr-2' size={16} />
                        <span className='text-sm font-medium text-gray-900 '>
                          {t('modal.price')}
                        </span>
                      </div>
                      <span className='text-sm text-gray-600 '>
                        {t(
                          `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.price`
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className='font-semibold text-gray-900 mb-3 '>
                      {t('modal.includedServices')}
                    </h4>
                    <div className='grid grid-cols-1 gap-2'>
                      {t
                        .raw(
                          `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.features`
                        )
                        .map((feature: string, index: number) => (
                          <div
                            key={index}
                            className='flex items-center p-2 bg-gray-50 rounded border border-gray-200'
                          >
                            <CheckCircle
                              className='text-green-600 mr-3'
                              size={16}
                            />
                            <span className='text-sm text-gray-700 '>
                              {feature}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
