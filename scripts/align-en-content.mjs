#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const enPath = join(root, 'messages/en.json')
const frPath = join(root, 'messages/fr.json')
const en = JSON.parse(readFileSync(enPath, 'utf8'))
const fr = JSON.parse(readFileSync(frPath, 'utf8'))

// 1. Navbar
Object.assign(en.NavbarSection.navigation, {
  home: 'Home',
  about: 'About Us',
  services: 'Our Services',
  procurement: 'Procurement Hubs',
  resources: 'Resources & Insights',
  contact: 'Contact Us',
})
en.NavbarSection.cta.button = 'Contact Us'
en.NavbarSection.logo.alt = 'KC International SARL Logo'

// 2. HomePage
en.HomePage.hero.description =
  "Since our beginnings in 2021, our consulting firm has been dedicated to helping business owners grow, structure their operations, and overcome their daily challenges. We don't believe in one-size-fits-all solutions. That's why we take the time to listen and offer tailored support adapted to your reality."

en.HomePage.presentation.eyebrow = 'Presentation'
en.HomePage.presentation.title = 'A consulting firm rooted on the ground'
en.HomePage.presentation.paragraph1 =
  "At the heart of KC International SARL is a simple idea: your success is our greatest mission. Since our beginnings in 2021, our consulting firm has been dedicated to helping business owners grow, structure their operations, and overcome their daily challenges."
en.HomePage.presentation.paragraph2 =
  "We don't believe in one-size-fits-all solutions. That's why we take the time to listen and offer tailored support adapted to your reality. With teams on the ground in Yaoundé (Cameroon), Lagos (Nigeria), and Guangzhou (China), we connect your local projects to global opportunities, bringing you the best of each market."
en.HomePage.presentation.paragraph3 =
  "Our team brings together passionate professionals who understand the challenges and realities of running a business today. Whether you're a young founder launching a startup, an SME manager looking to better organize your work, or a larger company ready to expand into a new region, we walk alongside you. We are the trusted partner you can rely on to navigate every stage of your growth with confidence."
en.HomePage.presentation.link = 'Get to know us'
en.HomePage.presentation.highlights.founded.label = 'Year founded'
en.HomePage.presentation.highlights.hubs.label = 'Regional hubs'
en.HomePage.presentation.highlights.approach.label = 'Support'

en.HomePage.axes.eyebrow = 'Commercial focus'
en.HomePage.axes.title = 'What we can do for you'
en.HomePage.axes.description =
  'At KCI SARL, we take care of your business by freeing you from daily constraints. Our flexible, high-performance solutions are designed to organize your operations, save you valuable time, and guide you toward success with peace of mind.'

en.HomePage.axes.items.financial.description =
  'Accounting & Tax (Bookkeeping, financial audit, and tax optimization)'
en.HomePage.axes.items.procurement.title = 'Procurement & Logistics'
en.HomePage.axes.items.procurement.description =
  'Global sourcing, customs formalities, and integrated freight'
en.HomePage.axes.items.events.description =
  'Professional planning, logistics, and coordination'
en.HomePage.axes.items.realEstate.description =
  'Real estate brokerage, acquisitions, leases, and property development'
en.HomePage.axes.items.facilities.description =
  'Commercial maintenance, technical upkeep, and outsourcing'
en.HomePage.axes.items.travel.description =
  'Visa guidance and support for the UK, Canada, China, India, Russia, and many other destinations.'

en.HomePage.presence.eyebrow = 'Bi-market footprint'
en.HomePage.presence.title = 'Present where you need us'
en.HomePage.presence.description =
  'Three operational hubs connecting Africa to global opportunities.'
en.HomePage.presence.offices.yaounde.name = 'Regional HQ — Cameroon'
en.HomePage.presence.offices.yaounde.role = 'Central Africa'
en.HomePage.presence.offices.lagos.name = 'Lagos Hub — Nigeria'
en.HomePage.presence.offices.lagos.role = 'West Africa'
en.HomePage.presence.offices.guangzhou.name = 'Guangzhou Hub — China'
en.HomePage.presence.offices.guangzhou.role = 'Sourcing & Quality'

en.HomePage.cta.title = 'Join the KCI SARL Family'
en.HomePage.cta.description =
  "Whether you're a startup founder seeking advice, a merchant looking to import safely, or a neighbor with a project close to your heart, we're here to listen. At KC International, we combine on-the-ground experience with networks worldwide to open doors and simplify your life. Your project is unique, and our greatest joy is helping you bring it to life."
en.HomePage.cta.button = 'Contact Us'

// 3. AboutUsPage
en.AboutUsPage.hero.eyebrow = 'About Us'
en.AboutUsPage.hero.title = 'Get to Know Us'
en.AboutUsPage.hero.paragraph1 =
  "At the heart of KC International SARL is a simple idea: your success is our greatest mission. Since our beginnings in 2021, our consulting firm has been dedicated to helping business owners grow, structure their operations, and overcome their daily challenges."

en.AboutUsPage.intro.paragraph2 =
  "We don't believe in one-size-fits-all solutions. That's why we take the time to listen and offer tailored support adapted to your reality. With teams on the ground in Yaoundé (Cameroon), Lagos (Nigeria), and Guangzhou (China), we connect your local projects to global opportunities, bringing you the best of each market."
en.AboutUsPage.intro.paragraph3 =
  "Our team brings together passionate professionals who understand the challenges and realities of running a business today. Whether you're a young founder launching a startup, an SME manager looking to better organize your work, or a larger company ready to expand into a new region, we walk alongside you. We are the trusted partner you can rely on to navigate every stage of your growth with confidence."
en.AboutUsPage.intro.imageAlt = 'KC International SARL team'

en.AboutUsPage.mission.description =
  "Our core business is to give power back to entrepreneurs. We provide flexible, human, and innovative solutions that free you from administrative burdens, protect your legal compliance, and fuel solid, sustainable growth — because your success is the only true measure of ours."

en.AboutUsPage.vision.description =
  "To be the trusted guide businesses turn to for transformation. We want to design, hand in hand with you, a bright and secure economic future for our commerce and industries in Africa and beyond, through honest relationships, attentive listening, and impeccable service."

en.AboutUsPage.values.description =
  'Everything we build at KCI SARL is rooted in our CITIE values. They are the heart of our company and guide how we work alongside you, protect your business, and support you every day with respect and care.'
en.AboutUsPage.values.closing =
  'These shared values are the foundation that allows us to build strong, sincere, and lasting bonds with each of our clients and partners, here and abroad.'
en.AboutUsPage.values.items.customer.title = 'Customer Centricity'
en.AboutUsPage.values.items.customer.subtitle = 'Respecting your needs'
en.AboutUsPage.values.items.customer.description =
  'Your satisfaction and peace of mind are our absolute priorities. We take the time to understand your unique challenges and join forces to go beyond your expectations.'
en.AboutUsPage.values.items.integrity.description =
  'We believe in frank and transparent relationships. Honesty and respect for the rules guide every exchange, because your business deserves total clarity and flawless ethics.'
en.AboutUsPage.values.items.trust.description =
  'Trust is not asked for — it is earned every day. We build strong, lasting partnerships by always keeping our promises and remaining the faithful partner you can rely on.'
en.AboutUsPage.values.items.innovation.description =
  'We love fresh ideas that simplify your life! We keep learning and seeking creative solutions to improve how we work and help you save time and boost efficiency.'
en.AboutUsPage.values.items.excellence.description =
  'We put our heart and expertise into everything we do. We are committed to delivering products and services of impeccable quality you can count on with complete confidence.'

en.AboutUsPage.whatWeDo.eyebrow = 'Our Services'
en.AboutUsPage.whatWeDo.description =
  'At KCI SARL, we take care of your business by freeing you from daily constraints. Our flexible, high-performance solutions are designed to organize your operations, save you valuable time, and guide you toward success with peace of mind.'

en.AboutUsPage.whatWeDo.services.accounting.title =
  '1. Accounting, Finance & Tax (Your Financial Peace of Mind)'
en.AboutUsPage.whatWeDo.services.accounting.items = [
  'Accounting & Tax Advisory: We keep your books clean, clear, and well organized every day. We perform internal reviews to safeguard the financial health of your business.',
  'Easy Accounting Tools: We install digital tools suited to your team size and teach you how to use them to track your money with ease.',
  'Business Creation & Future Planning: We guide you step by step through all legal steps to create your company and draft solid business plans to help you secure funding.',
  'Annual Financial Statement Management (DSF): We prepare and file your Statistical and Fiscal Declaration (DSF) in strict compliance with mandatory OHADA zone rules.',
  'Smart Tax Optimization: We find every legal solution to reduce your tax expenses, protect your profits, and improve your cash flow.',
]

en.AboutUsPage.whatWeDo.services.sourcing.title =
  '2. Procurement, Import/Export & Logistics (Your Gateway to the World)'
en.AboutUsPage.whatWeDo.services.sourcing.items = [
  'Trusted Sourcing & Procurement: We find the best local and international suppliers (especially in China), negotiate bulk prices, and verify product quality directly at the factory to help you avoid unpleasant surprises.',
  'Freight & Cargo Transport: Whether by air, sea, or road, we move your cargo safely while handling all customs and transit formalities.',
  'Turnkey Delivery: We track your parcels and orders all the way through, delivering your goods directly to your shop, factory, or warehouse door.',
]

en.AboutUsPage.whatWeDo.services.events.title =
  '3. Event Management (Your Successful Events)'
en.AboutUsPage.whatWeDo.services.events.items = [
  'Budget Tracking & Savings: We plan spending for your professional or private events to scrupulously respect your budget while guaranteeing maximum quality.',
  'Audiovisual Equipment & Premium Catering: We set up the best technology (screens, sound, lighting) and select delicious menus to welcome your guests in the best conditions.',
  'Reception & On-Site Staff: We recruit and coordinate dedicated teams — welcoming hostesses, reassuring security agents, and motivated volunteers so your event runs stress-free.',
]

en.AboutUsPage.whatWeDo.services.realEstate.title =
  '4. Your Real Estate Projects (Buy, Sell & Build)'
en.AboutUsPage.whatWeDo.services.realEstate.items = [
  'Advisory, Purchase & Leasing: We support you in buying, selling, or renting offices, commercial premises, or land while fully securing your transactions.',
  'Property Development & Real Estate Projects: We help owners and investors design their projects, obtain building permits, and manage construction sites from start to finish.',
]

en.AboutUsPage.whatWeDo.services.facilities.title =
  '5. Premises Care & Management (Facilities Management)'
en.AboutUsPage.whatWeDo.services.facilities.items = [
  'Professional Cleaning & Minor Repairs: Careful housekeeping, disinfection, and quick handyman interventions to keep your offices clean and welcoming.',
  'Preventive Maintenance: We regularly monitor your equipment (electrical, plumbing, generators) to repair natural wear before breakdowns occur, saving you unexpected expenses.',
  'Staffing Solutions: We find and select trusted employees (reception agents, technicians, etc.) to strengthen your team according to your needs.',
]

en.AboutUsPage.whatWeDo.services.travel.title =
  '6. Travel Services & Visa Assistance'
en.AboutUsPage.whatWeDo.services.travel.items = [
  'Visa Guidance & Support: A caring, expert guide to help you prepare your visa application flawlessly (business or study visas) for the UK, Canada, China, India, Russia, and many other destinations.',
]

en.AboutUsPage.whatWeDo.services.fintech.title =
  '7. Easy Payment Solutions (FinTech)'
en.AboutUsPage.whatWeDo.services.fintech.items = [
  'Simplified Bill Payments: Save time by letting us securely manage payment of your water and electricity bills, professional subscriptions, and taxes.',
  'Secure Money Transfers: Reliable, fast solutions to send and receive funds across countries to keep your business activities running smoothly.',
]

en.AboutUsPage.whatWeDo.services.support.title =
  '8. Personalized Assistance (Tailored Services)'
en.AboutUsPage.whatWeDo.services.support.items = [
  'Unique Support: Because every journey is different, we remain fully available to provide flexible, tailored help for any other specific professional or personal need.',
]

en.AboutUsPage.cta.title = 'Join the KCI SARL Family: Let\'s Build the Future Together'
en.AboutUsPage.cta.description =
  'Your project is unique, and our greatest joy is helping you bring it to life.'
en.AboutUsPage.cta.button = 'Contact Us'

// 4. ServicesPage
en.ServicesPage.hero.description =
  'At KCI SARL, we take care of your business by freeing you from daily constraints. Our flexible, high-performance solutions are designed to organize your operations, save you valuable time, and guide you toward success with peace of mind.'

en.ServicesPage.categories = {
  financial: {
    name: 'Financial Services',
    description: 'Accounting & Tax, FinTech payment solutions, and financial peace of mind',
    badge: 'Finance & Tax',
    clientsServed: 'clients served',
    subcategories: {
      accounting: {
        name: 'Accounting & Tax',
        description: 'Bookkeeping, financial audit, and tax optimization',
        duration: 'Ongoing service',
        price: 'On quote',
        features: ['Daily accounting', 'Internal reviews', 'Digital tools', 'Cash flow tracking'],
      },
      fintech: {
        name: 'FinTech Payment Solutions',
        description: 'Tax payments, subscriptions, and secure fund transfers',
        duration: 'On demand',
        price: 'On quote',
        features: ['Bill payments', 'Taxes & subscriptions', 'International transfers', 'Multi-currency routing'],
      },
      businessCreation: {
        name: 'Business Creation & Future Planning',
        description: 'Legal support to create your company and draft solid business plans',
        duration: '2-8 weeks',
        price: 'On quote',
        features: ['Registration', 'Legal structuring', 'Business plans', 'OHADA compliance'],
      },
      dsf: {
        name: 'Annual Financial Statement (DSF)',
        description: 'Preparation and filing of your Statistical and Fiscal Declaration in the OHADA zone',
        duration: 'Annual',
        price: 'On quote',
        features: ['Structural audit', 'Financial statements', 'Timely submission', 'Compliance guaranteed'],
      },
    },
  },
  procurementLogistics: {
    name: 'Procurement, Import/Export & Logistics',
    description: 'Global sourcing, customs formalities, and integrated freight',
    badge: 'Sourcing & Freight',
    clientsServed: 'clients served',
    subcategories: {
      sourcing: {
        name: 'Trusted Sourcing & Procurement',
        description: 'Supplier research, bulk negotiation, and factory quality control',
        duration: 'Variable',
        price: 'On quote',
        features: ['Local & international suppliers', 'Price negotiation', 'Factory inspection', 'Presence in China'],
      },
      freight: {
        name: 'Freight & Cargo Transport',
        description: 'Transport by air, sea, or road with customs formalities',
        duration: '2-55 days',
        price: 'On quote',
        features: ['Air freight', 'Sea freight', 'Road transport', 'Customs clearance included'],
      },
      delivery: {
        name: 'Turnkey Delivery',
        description: 'Order tracking to your shop, factory, or warehouse',
        duration: 'Door to door',
        price: 'On quote',
        features: ['Parcel tracking', 'Last mile', 'Secure delivery', 'Proof of delivery'],
      },
    },
  },
  eventManagement: {
    name: 'Event Management',
    description: 'Professional planning, logistics, and coordination',
    badge: 'Tailored Events',
    clientsServed: 'clients served',
    subcategories: {
      budget: {
        name: 'Budget Tracking & Savings',
        description: 'Expense planning to respect your budget with maximum quality',
        duration: 'Throughout the project',
        price: 'On quote',
        features: ['Detailed budgets', 'Cost tracking', 'Targeted savings', 'Financial reports'],
      },
      audiovisual: {
        name: 'Audiovisual Equipment',
        description: 'Screens, sound, lighting, and technology for successful events',
        duration: '1-2 weeks',
        price: 'On quote',
        features: ['Professional sound', 'Stage lighting', 'Large screens', 'Live streaming'],
      },
      catering: {
        name: 'Premium Catering',
        description: 'Delicious menus and full service to welcome your guests',
        duration: '1-3 weeks',
        price: 'On quote',
        features: ['Custom menus', 'Full service', 'Cocktail bar', 'Dietary accommodations'],
      },
      staff: {
        name: 'Reception & On-Site Staff',
        description: 'Hostesses, security agents, and volunteers coordinated for your event',
        duration: '2-6 weeks',
        price: 'On quote',
        features: ['Targeted recruitment', 'Team training', 'Coordination', 'Dedicated staff'],
      },
    },
  },
  facilitiesManagement: {
    name: 'Facilities Management',
    description: 'Commercial maintenance, technical upkeep, and outsourcing',
    badge: 'Premises Management',
    clientsServed: 'clients served',
    subcategories: {
      cleaning: {
        name: 'Professional Cleaning',
        description: 'Careful housekeeping, disinfection, and minor repairs for welcoming premises',
        duration: 'Flexible contracts',
        price: 'On quote',
        features: ['Daily cleaning', 'Disinfection', 'Minor repairs', 'Eco-friendly products'],
      },
      maintenance: {
        name: 'Preventive Maintenance',
        description: 'Monitoring of electrical, plumbing, and generators to prevent breakdowns',
        duration: 'Annual contracts',
        price: 'On quote',
        features: ['Regular inspections', 'Preventive repairs', 'Technical team', 'Cost reduction'],
      },
      staffing: {
        name: 'Staffing Solutions',
        description: 'Reception agents, technicians, and trusted staff to strengthen your team',
        duration: 'Ongoing service',
        price: 'On quote',
        features: ['Recruitment', 'Rigorous selection', 'Training', 'Contract management'],
      },
    },
  },
  realEstate: {
    name: 'Real Estate',
    description: 'Real estate brokerage, acquisitions, leases, and property development',
    badge: 'Real Estate Projects',
    clientsServed: 'clients served',
    subcategories: {
      brokerage: {
        name: 'Advisory, Purchase & Leasing',
        description: 'Support to buy, sell, or rent offices, commercial premises, or land',
        duration: 'Variable',
        price: 'On quote',
        features: ['Secure transactions', 'Legal verification', 'Brokerage', 'Property management'],
      },
      promotion: {
        name: 'Property Development & Real Estate Projects',
        description: 'Project design, building permits, and construction site management',
        duration: '6-24 months',
        price: 'On quote',
        features: ['Building permits', 'Architectural design', 'Site management', 'Investor partnerships'],
      },
    },
  },
  travel: {
    name: 'Travel & Visa Services',
    description:
      'Visa guidance and support for the UK, Canada, China, India, Russia, and many other destinations.',
    badge: 'Global Mobility',
    clientsServed: 'clients served',
    subcategories: {
      visa: {
        name: 'Visa Assistance',
        description: 'Flawless preparation of business or study visa applications',
        duration: '2-8 weeks',
        price: 'On quote',
        features: ['UK, Canada, China', 'India, Russia, Schengen', 'File audit', 'Interview preparation'],
      },
      delegation: {
        name: 'Delegation Logistics',
        description: 'Flights, accommodation, and coordination for international business delegations',
        duration: 'Tailored',
        price: 'On quote',
        features: ['Flight booking', 'Premium accommodation', 'Local transport', 'Full coordination'],
      },
    },
  },
}

// 5. ProcurementPage
en.ProcurementPage.hero.title = 'Procurement'
en.ProcurementPage.hero.titleHighlight = 'Hubs'
en.ProcurementPage.hero.description =
  'Forget the stress of imports and the risks of buying abroad! With our direct presence in China, Nigeria, and Cameroon, we find the best products for you — directly from the factory and at the best market prices. We connect you with the most reliable manufacturers to supply your business safely.'

en.ProcurementPage.categories.technology.name = 'Technology & Electronics'
en.ProcurementPage.categories.technology.description =
  'Sourcing of IT, electronic, and industrial equipment'

en.ProcurementPage.categories.fashion.name = 'Fashion & Textiles'
en.ProcurementPage.categories.fashion.description =
  'Ready-to-wear sourcing, bulk manufacturing, and raw materials'

en.ProcurementPage.categories.agriculture.name = 'Agricultural Sector'
en.ProcurementPage.categories.agriculture.description =
  'Agricultural raw materials, inputs, and equipment sourcing'

en.ProcurementPage.categories.healthcare.name = 'Medical Equipment'
en.ProcurementPage.categories.healthcare.description =
  'Clinical supplies, consumables, and regulatory compliance'

en.ProcurementPage.categories.food.name = 'Food & Beverages'
en.ProcurementPage.categories.food.description =
  'Supply chains, processing, and imports'

// 6. ResourcesPage
en.ResourcesPage.hero.titleHighlight = 'Insights'
en.ResourcesPage.hero.description =
  'We firmly believe we grow better when we move forward together. Discover our sharing and support center — a complete library of practical tools, simple explanations, and concrete advice to help you make the right decisions and help your business thrive.'

en.ResourcesPage.sections.blog.title = 'Our Practical Blog'
en.ResourcesPage.sections.blog.description =
  'Simple, clear articles packed with tips for your business. We decode market trends, new tax laws, transport management, and all the latest news from our team.'
en.ResourcesPage.sections.blog.cta = 'Browse articles'

en.ResourcesPage.sections.successStories.title = 'Our Client Stories'
en.ResourcesPage.sections.successStories.description =
  'Sincere testimonials, real examples, and inspiring journeys of business owners who overcame challenges and grew their businesses alongside KCI SARL.'
en.ResourcesPage.sections.successStories.cta = 'Read testimonials'

en.ResourcesPage.sections.partners.title = 'Our Partners Journal'
en.ResourcesPage.sections.partners.description =
  'Follow the life and evolution of the vast network of friends, suppliers, and associations who trust us across our commercial corridors in Cameroon, Nigeria, and China.'
en.ResourcesPage.sections.partners.cta = 'Follow our partners'

en.ResourcesPage.sections.events.title = 'Our Events & Workshops'
en.ResourcesPage.sections.events.description =
  'Your invitation to our upcoming on-the-ground training workshops, entrepreneur seminars, and online meetings (webinars) to develop your skills.'
en.ResourcesPage.sections.events.cta = 'View events'

en.ResourcesPage.sections.downloads.title = 'Downloads Center'
en.ResourcesPage.sections.downloads.description =
  'Useful documents to save in one click! Find our tax preparation guides, free advice sheets, service sheets, and startup forms.'
en.ResourcesPage.sections.downloads.cta = 'Access resources'

en.ResourcesPage.sections.faq.title = 'Frequently Asked Questions (FAQ)'
en.ResourcesPage.sections.faq.description =
  'Clear, simple, and direct answers to everyday questions about customs management, tax calculations, payment security, or how we handle your file.'
en.ResourcesPage.sections.faq.cta = 'View FAQ'

en.ResourcesPage.cta.title = 'Join the KCI SARL Family'
en.ResourcesPage.cta.description =
  "Let's build the future together. Your project is unique, and our greatest joy is helping you bring it to life."
en.ResourcesPage.cta.button = 'Contact Us'

// 7. ContactPage
en.ContactPage.hero.title = 'Contact'
en.ContactPage.hero.titleHighlight = 'Us'
en.ContactPage.hero.description =
  "Whether you're a startup founder seeking advice, a merchant looking to import safely, or a neighbor with a project close to your heart, we're here to listen. At KC International, we combine on-the-ground experience with networks worldwide to open doors and simplify your life."

en.ContactPage.offices.title = 'Our Regional Hubs'
en.ContactPage.offices.description =
  'On-the-ground offices to support you as close as possible to your needs.'
en.ContactPage.offices.guangzhou.name = 'Guangzhou Hub (China)'
en.ContactPage.offices.guangzhou.role = 'Sourcing & Quality Control'
en.ContactPage.offices.guangzhou.description =
  'By your side to oversee your purchases, find the best factories, and inspect the quality of your goods before shipment.'
en.ContactPage.offices.guangzhou.phoneLabel =
  "Let's chat on WhatsApp (Direct line for our sourcing team)"
en.ContactPage.offices.lagos.name = 'Lagos Hub (Nigeria)'
en.ContactPage.offices.lagos.role = 'West Africa & Logistics'
en.ContactPage.offices.lagos.description =
  'To grow your business in West Africa, manage your logistics transport, and secure your payment solutions.'
en.ContactPage.offices.lagos.phoneLabel = 'Direct line'
en.ContactPage.offices.yaounde.name = 'Yaoundé Regional HQ (Cameroon)'
en.ContactPage.offices.yaounde.role = 'Accounting, Tax & Visas'
en.ContactPage.offices.yaounde.description =
  'Your trusted office for accounting, taxes, property management, and visa applications.'
en.ContactPage.offices.yaounde.phoneLabel = 'Direct line'
en.ContactPage.offices.emails.title = 'Our Digital Mailboxes'
en.ContactPage.offices.emails.sales =
  'For orders, purchases, and import/export: sales@kci-ltd.com'
en.ContactPage.offices.emails.info =
  'For general questions or business advice: info@kci-ltd.com'
en.ContactPage.offices.social.title = 'Follow Our Stories'
en.ContactPage.offices.social.description =
  'Join our online community to discover our free advice and the successes of the entrepreneurs we support.'

// 8. FAQ categories
en.FAQPage.categories.financial.name =
  'Financial Engineering, OHADA Compliance & Taxation'
en.FAQPage.categories.procurement.name =
  'Global Procurement, Sourcing & Manufacturing Chains'
en.FAQPage.categories.logistics.name =
  'Multimodal Logistics, Freight & Global Mobility Services'
en.FAQPage.categories.realEstate.name =
  'Real Estate Solutions & Facilities Management'
en.FAQPage.categories.strategy.name =
  'Business Strategy, FinTech & Impact Incubation'

// 9. Footer
Object.assign(en.FooterSection.navigation.links, {
  about: 'About Us',
  services: 'Our Services',
  procurement: 'Procurement Hubs',
  resources: 'Resources & Insights',
  contact: 'Contact Us',
})

// 10. Remove extra keys not in fr.json
if (en.ProductsPage?.categories) {
  delete en.ProductsPage.categories
}

writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n')
console.log('en.json aligned with fr.json successfully')
