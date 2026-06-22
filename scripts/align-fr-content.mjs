#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const frPath = join(root, 'messages/fr.json')
const fr = JSON.parse(readFileSync(frPath, 'utf8'))

// 1. Navigation
Object.assign(fr.NavbarSection.navigation, {
  home: 'Accueil',
  about: 'À Propos de Nous',
  services: 'Nos Services',
  procurement: "Pôles d'Approvisionnement",
  resources: 'Ressources & Perspectives',
  contact: 'Contactez-nous',
})

// 2. HomePage
fr.HomePage.hero.description =
  "Depuis nos débuts en 2021, notre cabinet de conseil se donne pour but d'aider les femmes et les hommes d'affaires à grandir, à se structurer et à surmonter leurs défis quotidiens. Nous ne croyons pas aux solutions toutes faites. C'est pourquoi nous prenons le temps de vous écouter pour vous proposer un accompagnement sur mesure, adapté à votre réalité."

fr.HomePage.presentation.paragraph1 =
  "Au cœur de KC International Sarl, il y a une idée simple : votre réussite est notre plus belle mission. Depuis nos débuts en 2021, notre cabinet de conseil se donne pour but d'aider les femmes et les hommes d'affaires à grandir, à se structurer et à surmonter leurs défis quotidiens."

fr.HomePage.presentation.paragraph2 =
  "Nous ne croyons pas aux solutions toutes faites. C'est pourquoi nous prenons le temps de vous écouter pour vous proposer un accompagnement sur mesure, adapté à votre réalité. Grâce à nos équipes présentes sur le terrain à Yaoundé (Cameroun), Lagos (Nigeria) et Guangzhou (Chine), nous relions vos projets locaux aux opportunités du monde entier, pour vous apporter le meilleur de chaque marché."

fr.HomePage.presentation.paragraph3 =
  "Notre équipe rassemble des professionnels passionnés qui comprennent parfaitement les difficultés et les réalités de la gestion d'entreprise d'aujourd'hui. Que vous soyez un jeune créateur qui lance sa startup, un gérant de PME qui souhaite mieux organiser son travail, ou une plus grande entreprise prête à s'installer dans une nouvelle région, nous marchons à vos côtés. Nous sommes le partenaire de confiance sur qui vous pouvez vous appuyer pour traverser les étapes de votre croissance en toute sérénité."

fr.HomePage.axes.description =
  "Chez KCI SARL, nous prenons soin de votre activité en vous libérant des contraintes quotidiennes. Nos solutions souples et performantes sont pensées pour organiser votre business, vous faire gagner un temps précieux et vous accompagner vers le succès en toute sérénité."

fr.HomePage.axes.items.financial.description =
  'Comptabilité & Fiscalité (Tenue de livres, audit financier et optimisation fiscale)'

fr.HomePage.axes.items.procurement.description =
  'Sourcing mondial, formalités douanières et fret intégré'

fr.HomePage.axes.items.events.description =
  'Planification professionnelle, logistique et coordination'

fr.HomePage.axes.items.realEstate.description =
  'Courtage immobilier, acquisitions, baux et promotion immobilière'

fr.HomePage.axes.items.facilities.description =
  'Entretien commercial, maintenance technique et externalisation'

fr.HomePage.axes.items.travel.description =
  "Encadrement et assistance visa pour le Royaume-Uni, le Canada, la Chine, l'Inde, la Russie et bien d'autres destinations."

fr.HomePage.cta.title = 'Rejoignez la Famille KCI SARL'
fr.HomePage.cta.description =
  "Que vous soyez un créateur d'entreprise en quête de conseils, un commerçant cherchant à importer en toute sécurité, ou simplement un habitant du quartier avec un projet qui lui tient à cœur, nous sommes là pour vous écouter. Chez KC International, nous combinons notre expérience du terrain avec nos réseaux partout dans le monde pour vous ouvrir des portes et vous simplifier la vie. Votre projet est unique, et notre plus grande joie est de vous aider à le réaliser."

// 3. AboutUsPage
fr.AboutUsPage.mission.description =
  "Notre cœur de métier est de redonner le pouvoir aux entrepreneurs. Nous vous apportons des solutions souples, humaines et innovantes qui vous libèrent des contraintes administratives, protègent votre conformité face aux lois et allument le moteur d'une croissance solide et durable - parce que votre succès est la seule vraie mesure du nôtre."

fr.AboutUsPage.whatWeDo.eyebrow = 'Nos Services'
fr.AboutUsPage.whatWeDo.description =
  "Chez KCI SARL, nous prenons soin de votre activité en vous libérant des contraintes quotidiennes. Nos solutions souples et performantes sont pensées pour organiser votre business, vous faire gagner un temps précieux et vous accompagner vers le succès en toute sérénité."

fr.AboutUsPage.whatWeDo.services.accounting.title =
  "1. Comptabilité, Finance & Fiscalité (Votre Sérénité Financière)"
fr.AboutUsPage.whatWeDo.services.accounting.items = [
  "Comptabilité & Conseil Fiscal : Nous gardons vos comptes propres, clairs et bien organisés au quotidien. Nous réalisons des vérifications internes pour veiller à la bonne santé financière de votre activité.",
  "Outils Comptables Faciles : Nous installons les outils numériques adaptés à la taille de votre équipe et nous vous apprenons à les utiliser pour suivre votre argent facilement.",
  "Création d'Entreprise & Plans d'Avenir : Nous vous guidons pas à pas dans toutes les démarches légales pour créer votre société, et nous rédigeons des business plans solides pour vous aider à obtenir des financements.",
  "Gestion de votre Bilan Annuel (DSF) : Nous préparons et déposons votre Déclaration Statistique et Fiscale (DSF) dans le strict respect des règles obligatoires de la zone OHADA.",
  "Optimisation Fiscale Intelligente : Nous cherchons pour vous toutes les solutions légales pour réduire vos dépenses d'impôts, protéger vos bénéfices et améliorer votre trésorerie.",
]

fr.AboutUsPage.whatWeDo.services.sourcing.title =
  '2. Achats, Import/Export & Logistique (Votre Passerelle sur le Monde)'
fr.AboutUsPage.whatWeDo.services.sourcing.items = [
  "Sourcing & Achats de Confiance : Nous cherchons les meilleurs fournisseurs locaux et à l'étranger (notamment en Chine), négocions les prix de gros et vérifions la qualité des produits directement en usine pour vous éviter les mauvaises surprises.",
  'Transport de Marchandises (Fret) : Que ce soit par avion, par bateau ou par route, nous acheminons votre cargaison en toute sécurité, en prenant soin de toutes les formalités de douane et de transit.',
  'Livraison Clé en Main : Nous suivons vos colis et vos commandes jusqu\'au bout, pour livrer vos marchandises directement à la porte de votre boutique, de votre usine ou de votre entrepôt.',
]

fr.AboutUsPage.whatWeDo.services.events.title =
  "3. Organisation d'Événements (Vos Rendez-vous Réussis)"
fr.AboutUsPage.whatWeDo.services.events.items = [
  'Suivi Budgétaire & Économies : Nous planifions les dépenses de vos événements professionnels ou privés pour respecter scrupuleusement votre budget tout en garantissant une qualité maximale.',
  'Matériel Audiovisuel & Traiteurs de Choix : Nous installons le meilleur de la technologie (écrans, sons, lumières) et sélectionnons des menus délicieux pour accueillir vos invités dans les meilleures conditions.',
  'Accueil & Personnel de Terrain : Nous recrutons et coordonnons des équipes dévouées : hôtesses souriantes, agents de sécurité rassurants et bénévoles motivés pour que votre événement se déroule sans stress.',
]

fr.AboutUsPage.whatWeDo.services.realEstate.title =
  '4. Vos Projets Immobiliers (Achat, Vente & Construction)'
fr.AboutUsPage.whatWeDo.services.realEstate.items = [
  'Conseil, Achat & Location : Nous vous accompagnons pour acheter, vendre ou louer des bureaux, des locaux commerciaux ou des terrains en sécurisant entièrement vos transactions.',
  'Promotion & Projets Immobiliers : Nous aidons les propriétaires et les investisseurs à dessiner leurs projets, à obtenir les permis de construire et à piloter les chantiers de construction du début à la fin.',
]

fr.AboutUsPage.whatWeDo.services.facilities.title =
  '5. Entretien & Gestion de vos Locaux (Facilities Management)'
fr.AboutUsPage.whatWeDo.services.facilities.items = [
  'Nettoyage Professionnel & Petites Réparations : Des services de ménage soignés, de désinfection et des interventions rapides de bricolage pour garder vos bureaux toujours propres et accueillants.',
  'Maintenance Préventive : Nous surveillons régulièrement vos équipements (électricité, plomberie, générateurs) pour réparer l\'usure naturelle avant que les pannes ne surviennent, vous évitant ainsi des dépenses imprévues.',
  'Mise à disposition de Personnel (Staffing) : Nous trouvons et sélectionnons pour vous des employés de confiance (agents d\'accueil, techniciens, etc) pour renforcer votre équipe selon vos besoins.',
]

fr.AboutUsPage.whatWeDo.services.travel.title =
  '6. Services de Voyage & Aide pour les Visas'
fr.AboutUsPage.whatWeDo.services.travel.items = [
  "Accompagnement et Guides Visa : Un guide bienveillant et expert pour vous aider à préparer votre dossier de visa de manière irréprochable (visas d'affaires ou d'études) pour le Royaume-Uni, le Canada, la Chine, l'Inde, la Russie et bien d'autres destinations.",
]

fr.AboutUsPage.whatWeDo.services.fintech.title =
  '7. Solutions de Paiement Faciles (FinTech)'
fr.AboutUsPage.whatWeDo.services.fintech.items = [
  "Règlement Simplifié des Factures : Gagnez du temps en nous laissant gérer en toute sécurité le paiement de vos factures d'eau et d'électricité, de vos abonnements professionnels et de vos taxes.",
  "Transferts d'Argent Sécurisés : Des solutions fiables et rapides pour envoyer et recevoir vos fonds d'un pays à l'autre afin de maintenir vos activités commerciales fluides.",
]

fr.AboutUsPage.whatWeDo.services.support.title =
  '8. Assistance Personnalisée (Prestations sur mesure)'
fr.AboutUsPage.whatWeDo.services.support.items = [
  'Un Accompagnement Unique : Parce que chaque parcours est différent, nous restons à votre entière disposition pour vous apporter une aide flexible et sur mesure pour n\'importe quel autre besoin spécifique de votre quotidien professionnel ou personnel.',
]

fr.AboutUsPage.cta.title = "Rejoignez la Famille KCI SARL : Construisons l'Avenir Ensemble"
fr.AboutUsPage.cta.description =
  "Votre projet est unique, et notre plus grande joie est de vous aider à le réaliser."

// 4. ServicesPage hero + menu-aligned category labels
fr.ServicesPage.hero.description =
  "Chez KCI SARL, nous prenons soin de votre activité en vous libérant des contraintes quotidiennes. Nos solutions souples et performantes sont pensées pour organiser votre business, vous faire gagner un temps précieux et vous accompagner vers le succès en toute sérénité."

fr.ServicesPage.categories.financial.description =
  'Comptabilité & Fiscalité, solutions de paiement FinTech et sérénité financière'
fr.ServicesPage.categories.financial.subcategories.accounting.name =
  'Comptabilité & Fiscalité'
fr.ServicesPage.categories.financial.subcategories.accounting.description =
  'Tenue de livres, audit financier et optimisation fiscale'
fr.ServicesPage.categories.financial.subcategories.fintech.description =
  'Traitement des taxes, abonnements et transferts de fonds'

fr.ServicesPage.categories.procurementLogistics.description =
  'Sourcing mondial, formalités douanières et fret intégré'

fr.ServicesPage.categories.eventManagement.description =
  'Planification professionnelle, logistique et coordination'

fr.ServicesPage.categories.realEstate.name = 'Immobilier'
fr.ServicesPage.categories.realEstate.description =
  'Courtage immobilier, acquisitions, baux et promotion immobilière'

fr.ServicesPage.categories.facilitiesManagement.description =
  'Entretien commercial, maintenance technique et externalisation'

fr.ServicesPage.categories.travel.description =
  "Encadrement et assistance visa pour le Royaume-Uni, le Canada, la Chine, l'Inde, la Russie et bien d'autres destinations."

// 5. ProcurementPage
fr.ProcurementPage.hero.description =
  "Oubliez le stress des importations et les risques d'achats à l'étranger ! Grâce à notre présence directe en Chine, au Nigeria et au Cameroun, nous trouvons pour vous les meilleurs produits, directement en usine et aux meilleurs prix du marché. Nous vous connectons aux fabricants les plus fiables pour approvisionner votre commerce ou votre entreprise en toute sécurité."

fr.ProcurementPage.categories.technology.name = 'Technologies & Électronique'
fr.ProcurementPage.categories.technology.description =
  'Sourcing de matériel informatique, électronique et industriel'

fr.ProcurementPage.categories.fashion.name = 'Mode & Textiles'
fr.ProcurementPage.categories.fashion.description =
  'Sourcing de prêt-à-porter, fabrication en gros et matières premières'

fr.ProcurementPage.categories.agriculture.name = 'Filière Agricole'
fr.ProcurementPage.categories.agriculture.description =
  "Matières premières agricoles, intrants et sourcing d'équipements"

fr.ProcurementPage.categories.healthcare.name = 'Équipements Médicaux'
fr.ProcurementPage.categories.healthcare.description =
  'Fournitures cliniques, consommables et conformité réglementaire'

fr.ProcurementPage.categories.food.name = 'Agroalimentaire & Boissons'
fr.ProcurementPage.categories.food.description =
  "Chaînes d'approvisionnement, transformation et importations"

delete fr.ProcurementPage.categories.entertainment
delete fr.ProcurementPage.categories.others

// 6. ResourcesPage
fr.ResourcesPage.hero.description =
  "Nous croyons fermement qu'on grandit mieux lorsqu'on avance ensemble. Découvrez notre centre de partage et d'entraide, une bibliothèque complète d'outils pratiques, d'explications simples et de conseils concrets pour vous aider à prendre les bonnes décisions et à faire prospérer votre activité."

fr.ResourcesPage.sections.blog.title = 'Notre Blog Pratique'
fr.ResourcesPage.sections.blog.description =
  "Des articles simples et clairs remplis d'astuces pour votre business. Nous y décryptons les tendances des marchés, les nouvelles lois sur les impôts, la gestion de transport et toutes les actualités de notre équipe."

fr.ResourcesPage.sections.successStories.title = 'Histoires de nos Clients'
fr.ResourcesPage.sections.successStories.description =
  "Les témoignages sincères, les exemples réels et les parcours inspirants de femmes et d'hommes d'affaires qui ont surmonté leurs difficultés et fait grandir leur activité aux côtés de KCI SARL."

fr.ResourcesPage.sections.partners.title = 'Le Journal de nos Partenaires'
fr.ResourcesPage.sections.partners.description =
  "Suivez la vie et l'évolution du grand réseau d'amis, de fournisseurs et d'associations qui nous font confiance à travers nos couloirs commerciaux au Cameroun, au Nigeria et en Chine."

fr.ResourcesPage.sections.events.title = 'Nos Rendez-vous & Ateliers'
fr.ResourcesPage.sections.events.description =
  'Votre invitation à nos prochains ateliers de formation sur le terrain, nos séminaires entre entrepreneurs et nos rencontres sur internet (webinaires) pour développer vos compétences.'

fr.ResourcesPage.sections.downloads.title = 'Le Centre de Téléchargement'
fr.ResourcesPage.sections.downloads.description =
  'Vos documents utiles à enregistrer en un clic ! Retrouvez nos guides de préparation pour vos impôts, nos fiches conseils gratuites, nos fiches de services et nos formulaires de démarrage.'

fr.ResourcesPage.sections.faq.title = 'Foire Aux Questions (FAQ)'
fr.ResourcesPage.sections.faq.description =
  "Des réponses claires, simples et directes à toutes les questions quotidiennes que vous vous posez sur la gestion des douanes, le calcul de vos impôts, la sécurité de vos paiements ou l'accueil de votre dossier."

fr.ResourcesPage.cta.title = 'Rejoignez la Famille KCI SARL'
fr.ResourcesPage.cta.description =
  "Construisons l'avenir ensemble. Votre projet est unique, et notre plus grande joie est de vous aider à le réaliser."

// 7. ContactPage
fr.ContactPage.hero.title = 'Contactez'
fr.ContactPage.hero.titleHighlight = 'Nous'
fr.ContactPage.hero.description =
  "Que vous soyez un créateur d'entreprise en quête de conseils, un commerçant cherchant à importer en toute sécurité, ou simplement un habitant du quartier avec un projet qui lui tient à cœur, nous sommes là pour vous écouter. Chez KC International, nous combinons notre expérience du terrain avec nos réseaux partout dans le monde pour vous ouvrir des portes et vous simplifier la vie."

fr.ContactPage.offices.guangzhou.phoneLabel =
  'Discutons sur WhatsApp (Ligne directe de notre équipe sourcing)'

// 8. FAQ categories
fr.FAQPage.categories.financial.name =
  'Génie Financier, Conformité OHADA & Fiscalité'
fr.FAQPage.categories.procurement.name =
  'Approvisionnement Mondial, Sourcing & Chaînes de Fabrication'
fr.FAQPage.categories.logistics.name =
  'Logistique Multimodale, Fret & Services de Mobilité Globale'
fr.FAQPage.categories.realEstate.name =
  'Solutions Immobilières & Facilities Management'
fr.FAQPage.categories.strategy.name =
  "Stratégie d'Entreprise, FinTech & Incubation d'Impact"

// 9. Footer
Object.assign(fr.FooterSection.navigation.links, {
  about: 'À Propos de Nous',
  services: 'Nos Services',
  procurement: "Pôles d'Approvisionnement",
  resources: 'Ressources & Perspectives',
  contact: 'Contactez-nous',
})

writeFileSync(frPath, JSON.stringify(fr, null, 2) + '\n')
console.log('fr.json updated successfully')

// Sync en.json: remove deprecated procurement categories
const enPath = join(root, 'messages/en.json')
const en = JSON.parse(readFileSync(enPath, 'utf8'))
for (const page of ['ProductsPage', 'ProcurementPage']) {
  if (en[page]?.categories) {
    delete en[page].categories.entertainment
    delete en[page].categories.others
  }
}
writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n')
console.log('en.json synced successfully')
