'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import {
  Send,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PageHero } from '@/components/layout/PageHero'
import { SocialDock } from '@/components/SocialDock'
import { CONTACT_EMAIL } from '@/lib/social-links'
import { openContactMailto } from '@/lib/mailto'

const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, t('form.validation.name.required'))
      .min(2, t('form.validation.name.minLength')),
    email: z
      .string()
      .min(1, t('form.validation.email.required'))
      .email(t('form.validation.email.invalid')),
    phone: z
      .string()
      .optional()
      .refine((phone) => {
        if (!phone || phone.trim() === '') return true
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
      }, t('form.validation.phone.invalid')),
    company: z.string().optional(),
    department: z.string().optional(),
    subject: z
      .string()
      .min(1, t('form.validation.subject.required'))
      .min(5, t('form.validation.subject.minLength')),
    message: z
      .string()
      .min(1, t('form.validation.message.required'))
      .min(10, t('form.validation.message.minLength')),
  })

type ContactFormData = {
  name: string
  email: string
  phone?: string
  company?: string
  department?: string
  subject: string
  message: string
}

export default function ContactPage() {
  const t = useTranslations('ContactPage')
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const contactSchema = createContactSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    const department = searchParams.get('department') ?? ''
    const subject = searchParams.get('subject') ?? ''
    const message = searchParams.get('message') ?? ''

    if (department || subject || message) {
      reset({
        name: '',
        email: '',
        phone: '',
        company: '',
        department,
        subject,
        message,
      })
    }

    if (window.location.hash === '#contact-form') {
      requestAnimationFrame(() => {
        document
          .getElementById('contact-form')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [searchParams, reset])

  const departmentOptions = [
    { value: 'sales', label: t('form.fields.department.options.sales') },
    { value: 'info', label: t('form.fields.department.options.info') },
    { value: 'support', label: t('form.fields.department.options.support') },
    {
      value: 'partnership',
      label: t('form.fields.department.options.partnership'),
    },
    { value: 'other', label: t('form.fields.department.options.other') },
  ]

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const departmentLabel = departmentOptions.find(
        (option) => option.value === data.department
      )?.label

      openContactMailto({
        ...data,
        departmentLabel,
      })

      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const offices = ['guangzhou', 'lagos', 'yaounde'] as const

  return (
    <main className='min-h-screen bg-kci-surface'>
      <PageHero
        title={t('hero.title')}
        titleHighlight={t('hero.titleHighlight')}
        description={t('hero.description')}
      />

      <section className='page-section'>
        <div className='page-container'>
          {/* Regional Offices */}
          <div className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl lg:text-4xl text-gray-900 mb-4'>
                {t('offices.title')}
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                {t('offices.description')}
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
              {offices.map((office) => (
                <div
                  key={office}
                  className='bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-slate-200/80 hover:shadow-md transition-all duration-300'
                >
                  <h3 className='text-xl text-gray-900 mb-2'>
                    {t(`offices.${office}.name`)}
                  </h3>
                  <p className='text-sm text-kci-brand mb-3'>
                    {t(`offices.${office}.role`)}
                  </p>
                  <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
                    {t(`offices.${office}.description`)}
                  </p>
                  <div className='space-y-2 text-sm'>
                    <div className='flex items-start gap-2 text-gray-700'>
                      <MapPin size={16} className='text-kci-brand mt-0.5 shrink-0' />
                      <span className=''>
                        {t(`offices.${office}.address`)}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-700'>
                      <Phone size={16} className='text-kci-brand shrink-0' />
                      <span className=''>
                        {t(`offices.${office}.phoneLabel`)}: {t(`offices.${office}.phone`)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='bg-white rounded-2xl p-6 sm:p-8 ring-1 ring-slate-200/80 max-w-3xl mx-auto text-center space-y-8'>
              <div>
                <h3 className='text-xl text-gray-900 mb-3'>
                  {t('offices.emails.title')}
                </h3>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='inline-flex items-center justify-center gap-2 text-kci-brand font-medium hover:text-kci-brand-light transition-colors'
                >
                  <Mail size={18} className='shrink-0' />
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className='border-t border-slate-100 pt-8'>
                <h3 className='text-xl text-gray-900 mb-2'>
                  {t('offices.social.availableOn')}
                </h3>
                <p className='text-sm text-gray-600 mb-5 max-w-lg mx-auto'>
                  {t('offices.social.description')}
                </p>
                <div className='max-w-sm mx-auto'>
                  <SocialDock showLabels />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id='contact-form' className='max-w-4xl mx-auto scroll-mt-24'>
            <div className='bg-white rounded-2xl ring-1 ring-slate-200/80 overflow-hidden shadow-sm'>
              <div className='bg-kci-brand p-6 sm:p-8 text-white'>
                <div className='flex items-center mb-4'>
                  <Send size={32} className='mr-4' />
                  <h3 className='text-2xl lg:text-3xl font-bold'>
                    {t('form.title')}
                  </h3>
                </div>
                <p className='text-blue-100 text-lg'>
                  {t('form.description')}
                </p>
              </div>

              <div className='p-4 sm:p-6 lg:p-8'>
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center'>
                    <CheckCircle className='text-green-600 mr-3' size={20} />
                    <span className='text-green-800 '>
                      {t('form.success')}
                    </span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center'>
                    <AlertCircle className='text-red-600 mr-3' size={20} />
                    <span className='text-red-800 '>
                      {t('form.error')}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Name Field */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2 '>
                        {t('form.fields.name.label')} *
                      </label>
                      <input
                        type='text'
                        {...register('name')}
                        className={`kci-input ${
                          errors.name ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder={t('form.fields.name.placeholder')}
                      />
                      {errors.name && (
                        <p className='mt-1 text-sm text-red-600 '>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2 '>
                        {t('form.fields.email.label')} *
                      </label>
                      <input
                        type='email'
                        {...register('email')}
                        className={`kci-input ${
                          errors.email ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder={t('form.fields.email.placeholder')}
                      />
                      {errors.email && (
                        <p className='mt-1 text-sm text-red-600 '>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Phone Field */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2 '>
                        {t('form.fields.phone.label')}
                      </label>
                      <input
                        type='tel'
                        {...register('phone')}
                        className={`kci-input ${
                          errors.phone ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder={t('form.fields.phone.placeholder')}
                      />
                      {errors.phone && (
                        <p className='mt-1 text-sm text-red-600 '>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Company Field */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2 '>
                        {t('form.fields.company.label')}
                      </label>
                      <input
                        type='text'
                        {...register('company')}
                        className='kci-input'
                        placeholder={t('form.fields.company.placeholder')}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Department Field */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2 '>
                        {t('form.fields.department.label')}
                      </label>
                      <select
                        {...register('department')}
                        className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kci-brand/50 focus:border-transparent bg-white text-gray-800 transition-all duration-200'
                      >
                        <option value=''>
                          {t('form.fields.department.placeholder')}
                        </option>
                        {departmentOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2 '>
                        {t('form.fields.subject.label')} *
                      </label>
                      <input
                        type='text'
                        {...register('subject')}
                        className={`kci-input ${
                          errors.subject ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder={t('form.fields.subject.placeholder')}
                      />
                      {errors.subject && (
                        <p className='mt-1 text-sm text-red-600 '>
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2 '>
                      {t('form.fields.message.label')} *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      className={`w-full kci-input resize-none ${
                        errors.message ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder={t('form.fields.message.placeholder')}
                    />
                    {errors.message && (
                      <p className='mt-1 text-sm text-red-600 '>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type='submit'
                    disabled={isSubmitting || !isValid}
                    className={`w-full kci-btn-primary py-4 rounded-xl shadow-md hover:shadow-lg group ${
                      isSubmitting || !isValid
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <Send size={20} className='mr-3' />
                    {isSubmitting ? (
                      <span className='flex items-center'>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        {t('form.sending')}
                      </span>
                    ) : (
                      <>
                        {t('form.submitButton')}
                        <ArrowRight
                          size={20}
                          className='ml-3 group-hover:translate-x-1 transition-transform duration-200'
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
