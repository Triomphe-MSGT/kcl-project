/** Site imagery — local assets + Unsplash fallbacks */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const companyPresentation = '/images/company/presentation.jpg'

export const siteImages = {
  home: {
    hero: [
      '/images/home/hero-1.jpg',
      '/images/home/hero-2.jpg',
      '/images/home/hero-3.jpg',
      '/images/home/hero-logistics.jpg',
      '/images/home/hero-5.jpg',
    ],
    presentation: companyPresentation,
  },
  about: {
    intro: companyPresentation,
  },
  offices: {
    yaounde: '/images/offices/yaounde.jpg',
    lagos: '/images/offices/lagos.jpg',
    guangzhou: '/images/offices/guangzhou.jpg',
  },
  services: {
    // --- FINANCE / CONSEIL ---
    accounting: u('photo-1573164574511-73c773193279'),       // équipe en réunion de gestion
    accountingAudit: u('photo-1573164574572-cb89e39749b4'),  // revue de dossiers avec laptops
    businessCreation: u('photo-1594098882270-66ce9399b040'), // entrepreneur en discussion stratégique
    dsf: u('photo-1454165804606-c3d57bc86b40'),               // rédaction de rapport / déclaration fiscale
    fintech: u('photo-1758876202167-f81c995c3fdc'),           // pro au téléphone/laptop (paiement, transfert)
  
    // --- SOURCING & SHIPPING ---
    procurement: u('photo-1687422809617-a7d97879b3b0'),  // sourcing fournisseur / marché
    sourcing: u('photo-1575303093127-18b3c4ef8c41'),     // négociation produit
    freight: u('photo-1611746351408-c0a1346be8e8'),      // camion sur route (Afrique du Sud)
    delivery: u('photo-1611746351408-c0a1346be8e8'),     // (même visuel — voir note plus bas)
  
    // --- ÉVÉNEMENTIEL ---
    events: u('photo-1540575467063-178a50c2df87'),       // salle de conférence pleine
    eventBudget: u('photo-1503428593586-e225b39bddfe'),  // planification / prise de notes
    eventAv: u('photo-1511578314322-379afb476865'),      // salle avec écran de projection
    eventCatering: u('photo-1511795409834-ef04bbd61622'),// service de table / vaisselle
    eventStaff: u('photo-1515169067868-5387ec356754'),   // équipe coordination événement
  
    // --- FACILITIES MANAGEMENT ---
    facilities: u('photo-1581578731548-c64695cc6952'),
    maintenance: u('photo-1482449609509-eae2a7ea42b7'),  // technicien sur plateforme, vitrage
    cleaning: u('photo-1581578731548-c64695cc6952'),
    staffing: u('photo-1515169067868-5387ec356754'),
  
    // --- REAL ESTATE ---
    realEstate: u('photo-1560518883-ce09059eeffa'),
    brokerage: u('photo-1560520653-9e0e4c89eb11'),
    promotion: u('photo-1533750349088-cd871a92f312'),    // stratégie marketing / branding
  
    // ... reste inchangé
  },
  procurement: {
    technology: u('photo-1594736797933-d0401ba2a0b8'),
    electronics: u('photo-1511707171634-5f897ff02aa9'),
    automotive: u('photo-1486262715619-67b85e0b08d3'),
    energy: u('photo-1509391366360-2e959784a276'),
    construction: u('photo-1591825729380-8ea092eeabf8'),
    electromechanical: u('photo-1581091226825-a6a2a5aee158'),
    fashion: u('photo-1618354691373-d8510635a3a7'),
    beauty: u('photo-1522337360788-8b13dee7a37e'),
    haircare: u('photo-1560869713-7d0a29430803'),
    clothing: u('photo-1558171813-0c2a497a9a2f'),
    cosmetics: u('photo-1596462502278-27bfdc403348'),
    bodycare: u('photo-1556228720-195a672e8a03'),
    agriculture: u('photo-1593113598332-cd288d649433'),
    crops: u('photo-1625246333195-78d9c38ad449'),
    livestock: u('photo-1500595046743-c3e5eded5b30'),
    food: u('photo-1532629345422-c3e5eded5b3d'),
    foodProducts: u('photo-1606787366859-62c697750b0c'),
    beverages: u('photo-1544145945-f90425340c7e'),
    healthcare: u('photo-1576091160399-112ba8d25d1d'),
    health: u('photo-1631813281876-443d123b49b0'),
    fitness: u('photo-1517836357463-d25dfeac3438'),
  },
} as const
