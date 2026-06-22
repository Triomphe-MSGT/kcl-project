'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  Search,
  Grid3X3,
  List,
  Truck,
  Calendar,
  Building2,
  GraduationCap,
  Briefcase,
  Plane,
  Ship,
  Car,
  Palette,
  ChefHat,
  Volume2,
  DollarSign,
  Users,
  Wrench,
  Trash2,
  ShoppingBag,
  TrendingUp,
  Target,
  Calculator,
  UserCheck,
  ClipboardList,
  BarChart3,
  Sparkles,
  Monitor,
  Sprout,
  Heart,
  ChevronRight,
  Clock,
  MessageCircle,
  CheckCircle,
  Filter,
  X,
  User,
  MapPin,
  FileText,
  Send,
} from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { buildWhatsAppMessage, openWhatsAppMessage } from '@/lib/whatsapp'

const WHATSAPP_NUMBER = '237683242277'

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

// Service Order Modal Component
interface ServiceOrderModalProps {
  isOpen: boolean
  onClose: () => void
  subcategory: {
    categoryId: string
    subcategoryKey: string
    image: string
  } | null
}

function ServiceOrderModal({
  isOpen,
  onClose,
  subcategory,
}: ServiceOrderModalProps) {
  const t = useTranslations('ServicesPage')
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    serviceDescription: '',
    requirements: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset form when modal closes
      setFormData({
        name: '',
        address: '',
        serviceDescription: '',
        requirements: '',
      })
    }
  }, [isOpen])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const categoryName = subcategory
      ? t(`categories.${subcategory.categoryId}.name`)
      : '—'
    const serviceName = subcategory
      ? t(
          `categories.${subcategory.categoryId}.subcategories.${subcategory.subcategoryKey}.name`
        )
      : '—'

    const message = buildWhatsAppMessage(
      t('modalOrder.orderModal.whatsapp.serviceTitle'),
      [
        { label: t('modalOrder.orderModal.name.label'), value: formData.name },
        {
          label: t('modalOrder.orderModal.address.label'),
          value: formData.address,
        },
        {
          label: t('modalOrder.orderModal.category.label'),
          value: categoryName,
        },
        {
          label: t('modalOrder.orderModal.service.label'),
          value: serviceName,
        },
        {
          label: t('modalOrder.orderModal.serviceDescription.label'),
          value: formData.serviceDescription,
        },
        {
          label: t('modalOrder.orderModal.requirements.label'),
          value: formData.requirements,
        },
      ]
    )

    openWhatsAppMessage(WHATSAPP_NUMBER, message)

    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-2xl relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-full shadow-md hover:shadow-lg z-10'
          aria-label={t('modalOrder.close')}
        >
          <X size={20} />
        </button>

        <div className='p-6'>
          <div className='text-center mb-6'>
            <div className='w-16 h-16 bg-gradient-to-r from-kci-brand to-kci-accent rounded-full flex items-center justify-center mx-auto mb-4'>
              <MessageCircle className='text-white' size={28} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 '>
              {t('modalOrder.orderModal.title')}
            </h2>
            <p className='text-gray-600 mt-2'>
              {subcategory &&
                t(
                  `categories.${subcategory.categoryId}.subcategories.${subcategory.subcategoryKey}.name`
                )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1 '
              >
                {t('modalOrder.orderModal.name.label')}
              </label>
              <div className='relative'>
                <User
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('modalOrder.orderModal.name.placeholder')}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kci-brand focus:border-transparent'
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700 mb-1 '
              >
                {t('modalOrder.orderModal.address.label')}
              </label>
              <div className='relative'>
                <MapPin
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t('modalOrder.orderModal.address.placeholder')}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kci-brand focus:border-transparent'
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='serviceDescription'
                className='block text-sm font-medium text-gray-700 mb-1 '
              >
                {t('modalOrder.orderModal.serviceDescription.label')}
              </label>
              <div className='relative'>
                <FileText
                  className='absolute left-3 top-3 text-gray-400'
                  size={18}
                />
                <textarea
                  id='serviceDescription'
                  name='serviceDescription'
                  value={formData.serviceDescription}
                  onChange={handleInputChange}
                  placeholder={t(
                    'modalOrder.orderModal.serviceDescription.placeholder'
                  )}
                  rows={3}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kci-brand focus:border-transparent resize-none'
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='requirements'
                className='block text-sm font-medium text-gray-700 mb-1 '
              >
                {t('modalOrder.orderModal.requirements.label')}
              </label>
              <div className='relative'>
                <ClipboardList
                  className='absolute left-3 top-3 text-gray-400'
                  size={18}
                />
                <textarea
                  id='requirements'
                  name='requirements'
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder={t(
                    'modalOrder.orderModal.requirements.placeholder'
                  )}
                  rows={2}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kci-brand focus:border-transparent resize-none'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-gradient-to-r from-kci-brand to-kci-accent hover:from-kci-brand/90 hover:to-kci-accent/90 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70'
            >
              {isSubmitting ? (
                <>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  {t('modalOrder.orderModal.submit')}...
                </>
              ) : (
                <>
                  <Send size={18} className='mr-2' />
                  {t('modalOrder.orderModal.submit')}
                </>
              )}
            </button>
          </form>

          <p className='text-xs text-gray-500 text-center mt-4'>
            {t('modalOrder.orderModal.note')}
          </p>
        </div>
      </div>
    </div>
  )
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'financial',
    icon: Calculator,
    color: 'text-kci-brand',
    bgColor: 'bg-kci-brand/10',
    gradient: 'from-kci-brand to-blue-600',
    totalClients: 320,
    image: '/images/home/axes/financial.jpg',
    subcategories: [
      {
        key: 'accounting',
        icon: BarChart3,
        image: '/images/home/axes/financial.jpg',
      },
      {
        key: 'fintech',
        icon: DollarSign,
        image: '/images/home/axes/financial.jpg',
      },
      {
        key: 'businessCreation',
        icon: Target,
        image: '/images/home/presentation.jpg',
      },
      {
        key: 'dsf',
        icon: FileText,
        image: '/images/home/axes/financial.jpg',
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
    image: '/images/home/axes/procurement.jpg',
    subcategories: [
      {
        key: 'sourcing',
        icon: ShoppingBag,
        image: '/images/home/axes/procurement.jpg',
      },
      {
        key: 'freight',
        icon: Ship,
        image: '/images/home/axes/procurement.jpg',
      },
      {
        key: 'delivery',
        icon: Car,
        image: '/images/home/axes/procurement.jpg',
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
    image: '/images/home/axes/events.jpg',
    subcategories: [
      {
        key: 'budget',
        icon: DollarSign,
        image: '/images/home/axes/events.jpg',
      },
      {
        key: 'audiovisual',
        icon: Volume2,
        image: '/images/home/axes/events.jpg',
      },
      {
        key: 'catering',
        icon: ChefHat,
        image: '/images/home/axes/events.jpg',
      },
      {
        key: 'staff',
        icon: Users,
        image: '/images/home/axes/events.jpg',
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
    image: '/images/home/axes/facilities.jpg',
    subcategories: [
      {
        key: 'maintenance',
        icon: Wrench,
        image: '/images/home/axes/facilities.jpg',
      },
      {
        key: 'cleaning',
        icon: Sparkles,
        image: '/images/home/axes/facilities.jpg',
      },
      {
        key: 'staffing',
        icon: Users,
        image: '/images/home/axes/facilities.jpg',
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
    image: '/images/home/axes/real-estate.jpg',
    subcategories: [
      {
        key: 'brokerage',
        icon: MapPin,
        image: '/images/home/axes/real-estate.jpg',
      },
      {
        key: 'promotion',
        icon: TrendingUp,
        image: '/images/home/axes/real-estate.jpg',
      },
    ],
  },
  {
    id: 'travel',
    icon: Plane,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-emerald-600',
    totalClients: 220,
    image: '/images/home/axes/travel.jpg',
    subcategories: [
      {
        key: 'visa',
        icon: FileText,
        image: '/images/home/axes/travel.jpg',
      },
      {
        key: 'delegation',
        icon: Briefcase,
        image: '/images/home/axes/travel.jpg',
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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

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
    document.body.style.overflow = 'hidden'
  }

  const openOrderModal = () => {
    setIsModalOpen(false)
    setIsOrderModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedSubcategory(null)
    document.body.style.overflow = ''
  }

  const closeOrderModal = () => {
    setIsOrderModalOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
        closeOrderModal()
      }
    }

    if (isModalOpen || isOrderModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, isOrderModalOpen])

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
                  <img
                    src={category.image}
                    alt={t(`categories.${category.id}.name`)}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
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
              <Briefcase className='text-gray-400 mx-auto mb-4' size={64} />
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
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto'>
          <div className='w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white/95 backdrop-blur-md rounded-xl border border-gray-100/30 shadow-xl relative'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/90 rounded-full shadow-md hover:shadow-lg z-10'
              aria-label={t('modal.close')}
            >
              <X size={20} />
            </button>

            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div className='relative h-[300px] lg:h-full overflow-hidden'>
                <img
                  src={selectedSubcategory.image}
                  alt={t(
                    `categories.${selectedSubcategory.categoryId}.subcategories.${selectedSubcategory.subcategoryKey}.name`
                  )}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
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

                <div className='grid grid-cols-1 gap-4'>
                  <button
                    onClick={openOrderModal}
                    className='bg-gradient-to-r from-kci-brand to-kci-accent hover:from-kci-brand/90 hover:to-kci-accent/90 text-white tracking-wide shadow-md hover:shadow-lg px-6 py-3 rounded-lg flex items-center justify-center'
                  >
                    <MessageCircle size={16} className='mr-2' />
                    {t('modal.placeOrder')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Order Modal */}
      <ServiceOrderModal
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
        subcategory={selectedSubcategory}
      />
    </main>
  )
}
