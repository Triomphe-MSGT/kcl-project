import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import localFont from 'next/font/local'

import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppAssistant } from '@/components/whatsapp-assistant'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { NavigationProgress } from '@/components/NavigationProgress'

const brockMann = localFont({
  src: [
    {
      path: './fonts/Brockmann-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Brockmann-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/Brockmann-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Brockmann-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Brockmann-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Brockmann-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Brockmann-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Brockmann-SemiBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-brockmann',
})

export const metadata: Metadata = {
  title: "KCI Ltd | Importation de la Chine vers l'Afrique",
  description:
    "KCI Ltd facilite l'importation de produits de qualité de la Chine vers l'Afrique avec des services complets de sourcing, logistique, contrôle qualité et dédouanement.",
  keywords:
    'importation, Chine, Afrique, export, import, logistique, sourcing, douanes, transport international, qualité, commerce international',
  authors: [{ name: 'KCI Ltd' }],
  creator: 'KCI Ltd',
  publisher: 'KCI Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.kciltd.com'),
  alternates: {
    canonical: '/',
    languages: {
      fr: '/fr',
      en: '/en',
    },
  },
  openGraph: {
    title: "KCI Ltd | Solutions d'importation Chine-Afrique",
    description:
      "Facilitez vos importations de la Chine vers l'Afrique avec nos services complets de sourcing, logistique, contrôle qualité et dédouanement.",
    url: 'https://www.kciltd.com',
    siteName: 'KCI Ltd',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.kciltd.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "KCI Ltd - Importation de la Chine vers l'Afrique",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "KCI Ltd | Solutions d'importation Chine-Afrique",
    description:
      "Facilitez vos importations de la Chine vers l'Afrique avec nos services complets de sourcing, logistique, contrôle qualité et dédouanement.",
    images: ['https://www.kciltd.com/images/twitter-image.jpg'],
    creator: '@KCILtd',
    site: '@KCILtd',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  category: 'Business',
  applicationName: 'KCI Ltd',
  referrer: 'origin-when-cross-origin',
  appleWebApp: {
    title: 'KCI Ltd',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${brockMann.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <NavigationProgress />
          <Navbar />
          {children}
          <Footer />
          <ScrollProgress />
          <WhatsAppAssistant />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
