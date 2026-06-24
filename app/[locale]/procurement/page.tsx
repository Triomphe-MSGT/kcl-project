'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import {
  Search,
  Grid3X3,
  List,
  Laptop,
  Wheat,
  Coffee,
  Heart,
  Car,
  Zap,
  Building,
  Settings,
  Sparkles,
  Scissors,
  Shirt,
  Palette,
  Droplets,
  Sprout,
  PiggyBank,
  Apple,
  GlassWater,
  Shield,
  Dumbbell,
  ChevronRight,
  ShoppingCart,
  Filter,
  CheckCircle,
  X,
  Package,
} from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { siteImages } from '@/lib/site-images'

// Types
interface ProductSubcategory {
  key: string
  icon: React.ElementType
  image: string
}

interface ProductCategory {
  id: string
  icon: React.ElementType
  color: string
  bgColor: string
  gradient: string
  subcategories: ProductSubcategory[]
  totalProducts: number
  image: string
}

function getContactOrderHref(categoryName: string, productName: string) {
  const params = new URLSearchParams({
    department: 'sales',
    subject: `Commande - ${categoryName} - ${productName}`,
    message: `Bonjour,\n\nJe souhaite passer une commande pour : ${productName} (catégorie : ${categoryName}).\n\nMerci de me recontacter.`,
  })
  return `/contact?${params.toString()}#contact-form`
}

const productCategories: ProductCategory[] = [
  {
    id: 'technology',
    icon: Laptop,
    color: 'text-kci-brand',
    bgColor: 'bg-kci-brand/10',
    gradient: 'from-kci-brand to-blue-600',
    totalProducts: 2847,
    image: siteImages.procurement.technology,
    subcategories: [
      {
        key: 'electronics',
        icon: Laptop,
        image: siteImages.procurement.electronics,
      },
      {
        key: 'automotive',
        icon: Car,
        image: siteImages.procurement.automotive,
      },
      {
        key: 'energy',
        icon: Zap,
        image: siteImages.procurement.energy,
      },
      {
        key: 'construction',
        icon: Building,
        image: siteImages.procurement.construction,
      },
      {
        key: 'electromechanical',
        icon: Settings,
        image: siteImages.procurement.electromechanical,
      },
    ],
  },
  {
    id: 'fashion',
    icon: Shirt,
    color: 'text-kci-warm',
    bgColor: 'bg-kci-warm/10',
    gradient: 'from-kci-warm to-orange-600',
    totalProducts: 1965,
    image: siteImages.procurement.fashion,
    subcategories: [
      {
        key: 'beauty',
        icon: Sparkles,
        image: siteImages.procurement.beauty,
      },
      {
        key: 'haircare',
        icon: Scissors,
        image: siteImages.procurement.haircare,
      },
      {
        key: 'clothing',
        icon: Shirt,
        image: siteImages.procurement.clothing,
      },
      {
        key: 'cosmetics',
        icon: Palette,
        image: siteImages.procurement.cosmetics,
      },
      {
        key: 'bodycare',
        icon: Droplets,
        image: siteImages.procurement.bodycare,
      },
    ],
  },
  {
    id: 'agriculture',
    icon: Wheat,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-emerald-600',
    totalProducts: 834,
    image: siteImages.procurement.agriculture,
    subcategories: [
      {
        key: 'crops',
        icon: Sprout,
        image: siteImages.procurement.crops,
      },
      {
        key: 'livestock',
        icon: PiggyBank,
        image: siteImages.procurement.livestock,
      },
    ],
  },
  {
    id: 'food',
    icon: Coffee,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    gradient: 'from-amber-500 to-orange-600',
    totalProducts: 1247,
    image: siteImages.procurement.food,
    subcategories: [
      {
        key: 'foodProducts',
        icon: Apple,
        image: siteImages.procurement.foodProducts,
      },
      {
        key: 'beverages',
        icon: GlassWater,
        image: siteImages.procurement.beverages,
      },
    ],
  },
  {
    id: 'healthcare',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    gradient: 'from-red-500 to-pink-600',
    totalProducts: 673,
    image: siteImages.procurement.healthcare,
    subcategories: [
      {
        key: 'health',
        icon: Shield,
        image: siteImages.procurement.health,
      },
      {
        key: 'fitness',
        icon: Dumbbell,
        image: siteImages.procurement.fitness,
      },
    ],
  },
]

export default function ProcurementPage() {
  const t = useTranslations('ProcurementPage')
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
  const filteredCategories = productCategories.filter((category) => {
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
        titleHighlight={t('hero.titleHighlight')}
        description={t('hero.description')}
      />

      <section className='page-section'>
        <div className='page-container'>
          {/* Search and Filters */}
          <div className='bg-white/90 backdrop-blur-md rounded-xl border border-gray-100/30 shadow-lg mb-8 p-4 sm:p-6'>
            <div className='flex flex-col gap-3 sm:gap-4'>
              <div className='w-full min-w-0 relative'>
                <Search
                  className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 shrink-0 pointer-events-none'
                  size={20}
                />
                <input
                  placeholder={t('search.placeholder')}
                  className='w-full min-w-0 pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kci-brand/50 focus:border-transparent shadow-md bg-white/90 text-gray-800 placeholder-gray-400 transition-all duration-300'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    type='button'
                    onClick={() => setSearchTerm('')}
                    className='absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-kci-brand transition-colors duration-200'
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between w-full min-w-0'>
                <div className='relative w-full min-w-0 sm:max-w-xs'>
                  <Filter
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={18}
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='w-full min-w-0 pl-10 pr-8 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kci-brand/50 focus:border-transparent bg-white/90 text-gray-800 transition-all duration-300 appearance-none shadow-md truncate'
                  >
                    <option value='all'>{t('search.allCategories')}</option>
                    {productCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {t(`categories.${category.id}.name`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex border border-gray-200 rounded-lg overflow-hidden shadow-md self-end sm:self-auto shrink-0'>
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

          {/* Products Grid */}
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
                      {category.totalProducts.toLocaleString('en-US')}{' '}
                      {t('common.products')}
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
                    <p className='text-gray-600 tracking-wide'>
                      {t(`categories.${category.id}.description`)}
                    </p>
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
                      {category.subcategories.map((subcategory, index) => (
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
              className='absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/90 rounded-full shadow-md hover:shadow-lg'
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
                    {t('modal.popularProducts')}
                  </h3>
                  <p className='text-gray-600 tracking-wide'>
                    {t(
                      `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.description`
                    )}
                  </p>
                </div>

                <div className='grid grid-cols-1 gap-3 mb-8'>
                  {t
                    .raw(
                      `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.popularProducts`
                    )
                    .map((product: string, index: number) => (
                      <div
                        key={index}
                        className='flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100/30 hover:bg-gray-100 transition-all duration-200'
                      >
                        <CheckCircle
                          className='text-green-600 mr-3'
                          size={18}
                        />
                        <span className='font-medium text-gray-900 text-sm tracking-wide'>
                          {product}
                        </span>
                      </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 gap-4'>
                  <Link
                    href={getContactOrderHref(
                      t(`categories.${selectedSubcategory.categoryId}.name`),
                      t(
                        `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.name`
                      )
                    )}
                    onClick={() => {
                      document.body.style.overflow = ''
                    }}
                    className='bg-gradient-to-r from-kci-brand to-kci-accent hover:from-kci-brand/90 hover:to-kci-accent/90 text-white tracking-wide shadow-md hover:shadow-lg px-6 py-3 rounded-lg flex items-center justify-center'
                  >
                    <ShoppingCart size={18} className='mr-2' />
                    {t('modal.placeOrder')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
