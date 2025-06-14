// Mock data for real estate properties in Kerala

export const propertyTypes = {
  residential: {
    name: 'Residential',
    subcategories: [
      '1 BHK',
      '2 BHK',
      '3 BHK and above',
      'Studio Apartments',
      'Villas / Independent Houses',
      'Duplex / Triplex Homes',
      'Gated Community Flats'
    ]
  },
  commercial: {
    name: 'Commercial',
    subcategories: [
      'Office Spaces',
      'Retail Shops / Showrooms',
      'Coworking Spaces',
      'Restaurants / Cafes',
      'Clinics / Spas',
      'Mixed-use'
    ]
  },
  industrial: {
    name: 'Industrial',
    subcategories: [
      'Factories / Manufacturing Units',
      'Warehouses / Godowns',
      'Logistics & Distribution Centers',
      'Cold Storage Units',
      'Industrial Sheds'
    ]
  },
  land: {
    name: 'Land / Plots',
    subcategories: [
      'Residential Plots',
      'Commercial Plots',
      'Agricultural Land',
      'Industrial Plots',
      'Farm Land / Farm Houses'
    ]
  },
  special: {
    name: 'Special-Purpose',
    subcategories: [
      'Educational Institutions',
      'Religious Buildings',
      'Healthcare Facilities',
      'Banquet Halls',
      'Theaters / Cinemas',
      'Hostels / Dormitories'
    ]
  }
};

export const keralaCities = [
  'Thiruvananthapuram',
  'Kochi',
  'Kozhikode (Calicut)',
  'Thrissur',
  'Kollam',
  'Palakkad',
  'Alappuzha',
  'Malappuram',
  'Kannur',
  'Kasaragod',
  'Pathanamthitta',
  'Idukki',
  'Wayanad',
  'Ernakulam',
  'Kottayam'
];

export const mockProperties = [
  // Residential Properties
  {
    id: 'prop_001',
    title: '3 BHK Luxury Villa in Thrissur',
    type: 'residential',
    subtype: '3 BHK and above',
    city: 'Thrissur',
    location: 'Peramangalam',
    price: 8500000,
    area: 2500,
    bedrooms: 3,
    bathrooms: 4, // 3 BHK with 4 bathrooms (including guest bathroom)
    parking: 2,
    description: 'Luxury villa with modern amenities, garden, and excellent connectivity to city center.',
    features: ['Swimming Pool', 'Garden', 'Security', 'Power Backup', 'Vastu Compliant'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    status: 'available',
    datePosted: '2024-01-15',
    agentContact: '+91-9876543210',
    coordinates: { lat: 10.5276, lng: 76.2144 },
    verified: true
  },
  {
    id: 'prop_002',
    title: '2 BHK Apartment in Kochi',
    type: 'residential',
    subtype: '2 BHK',
    city: 'Kochi',
    location: 'Kakkanad',
    price: 4500000,
    area: 1200,
    bedrooms: 2,
    bathrooms: 2, // Standard 2 BHK with 2 bathrooms
    parking: 1,
    description: 'Modern apartment in prime location with metro connectivity.',
    features: ['Elevator', 'Gym', 'Security', 'Club House', 'Metro Nearby'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    status: 'available',
    datePosted: '2024-01-20',
    agentContact: '+91-9876543211',
    coordinates: { lat: 10.0261, lng: 76.3105 },
    verified: true
  },
  {
    id: 'prop_003',
    title: 'Studio Apartment in Kozhikode',
    type: 'residential',
    subtype: 'Studio Apartments',
    city: 'Kozhikode (Calicut)',
    location: 'Chevayur',
    price: 2200000,
    area: 450,
    bedrooms: 0,
    bathrooms: 1, // Studio with 1 bathroom
    parking: 1,
    description: 'Compact studio apartment perfect for young professionals.',
    features: ['Furnished', 'AC', 'Security', 'Beach Nearby'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    status: 'available',
    datePosted: '2024-01-22',
    agentContact: '+91-9876543212',
    coordinates: { lat: 11.2588, lng: 75.7804 },
    verified: true
  },

  // Commercial Properties
  {
    id: 'prop_004',
    title: 'Premium Office Space in Kochi',
    type: 'commercial',
    subtype: 'Office Spaces',
    city: 'Kochi',
    location: 'Infopark',
    price: 12000000,
    area: 3000,
    bathrooms: 6, // Commercial spaces also have bathrooms
    description: 'Grade A office space in IT hub with modern facilities.',
    features: ['IT Park', 'Cafeteria', 'Parking', '24/7 Security', 'Metro Access'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    status: 'available',
    datePosted: '2024-01-18',
    agentContact: '+91-9876543213',
    coordinates: { lat: 10.0419, lng: 76.3657 },
    verified: true
  },
  {
    id: 'prop_005',
    title: 'Retail Shop in Thrissur',
    type: 'commercial',
    subtype: 'Retail Shops / Showrooms',
    city: 'Thrissur',
    location: 'Round East',
    price: 3500000,
    area: 800,
    bathrooms: 2, // Retail space with customer and staff bathrooms
    description: 'Prime retail space in busy commercial area.',
    features: ['Main Road', 'High Footfall', 'Parking Available', 'Corner Shop'],
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    status: 'available',
    datePosted: '2024-01-25',
    agentContact: '+91-9876543214',
    coordinates: { lat: 10.5200, lng: 76.2100 },
    verified: true
  },

  // Land/Plots (No bathrooms for land)
  {
    id: 'prop_006',
    title: 'Residential Plot in Palakkad',
    type: 'land',
    subtype: 'Residential Plots',
    city: 'Palakkad',
    location: 'Mannarkkad',
    price: 1800000,
    area: 5000,
    description: 'DTCP approved residential plot with clear title.',
    features: ['DTCP Approved', 'Clear Title', 'Road Access', 'Electricity Available'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    status: 'available',
    datePosted: '2024-01-12',
    agentContact: '+91-9876543215',
    coordinates: { lat: 10.9931, lng: 76.4597 },
    verified: true
  },
  {
    id: 'prop_007',
    title: 'Agricultural Land in Wayanad',
    type: 'land',
    subtype: 'Agricultural Land',
    city: 'Wayanad',
    location: 'Sulthan Bathery',
    price: 2500000,
    area: 10000,
    description: 'Fertile agricultural land suitable for spice cultivation.',
    features: ['Water Source', 'Fertile Soil', 'Spice Cultivation', 'Hill View'],
    images: [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    status: 'available',
    datePosted: '2024-01-10',
    agentContact: '+91-9876543216',
    coordinates: { lat: 11.6854, lng: 76.2663 },
    verified: true
  },

  // Industrial Properties
  {
    id: 'prop_008',
    title: 'Industrial Warehouse in Kollam',
    type: 'industrial',
    subtype: 'Warehouses / Godowns',
    city: 'Kollam',
    location: 'Kundara',
    price: 15000000,
    area: 8000,
    bathrooms: 4, // Industrial facilities have bathrooms for workers
    description: 'Large warehouse facility with excellent connectivity.',
    features: ['Highway Access', 'Loading Dock', 'High Ceiling', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    status: 'available',
    datePosted: '2024-01-08',
    agentContact: '+91-9876543217',
    coordinates: { lat: 8.8932, lng: 76.6413 },
    verified: true
  },

  // Special Purpose
  {
    id: 'prop_009',
    title: 'Educational Institution Building',
    type: 'special',
    subtype: 'Educational Institutions',
    city: 'Thiruvananthapuram',
    location: 'Technopark',
    price: 25000000,
    area: 12000,
    bathrooms: 20, // Educational institutions have multiple bathrooms
    description: 'Purpose-built educational facility with modern amenities.',
    features: ['Multiple Classrooms', 'Auditorium', 'Library Space', 'Playground'],
    images: [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    status: 'available',
    datePosted: '2024-01-05',
    agentContact: '+91-9876543218',
    coordinates: { lat: 8.5241, lng: 76.9366 },
    verified: true
  },

  // Additional properties for better search results
  {
    id: 'prop_010',
    title: '4 BHK Villa in Kottayam',
    type: 'residential',
    subtype: '3 BHK and above',
    city: 'Kottayam',
    location: 'Changanassery',
    price: 12000000,
    area: 3500,
    bedrooms: 4,
    bathrooms: 5, // 4 BHK with 5 bathrooms (master + 3 bedrooms + guest)
    parking: 3,
    description: 'Spacious villa with traditional Kerala architecture.',
    features: ['Traditional Design', 'Large Garden', 'Backwaters View', 'Heritage Style'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    status: 'available',
    datePosted: '2024-01-28',
    agentContact: '+91-9876543219',
    coordinates: { lat: 9.4981, lng: 76.5442 },
    verified: true
  },
  {
    id: 'prop_011',
    title: '1 BHK Flat in Kannur',
    type: 'residential',
    subtype: '1 BHK',
    city: 'Kannur',
    location: 'Thaliparamba',
    price: 2800000,
    area: 650,
    bedrooms: 1,
    bathrooms: 1, // Standard 1 BHK with 1 bathroom
    parking: 1,
    description: 'Affordable flat in peaceful location.',
    features: ['Peaceful Area', 'Good Connectivity', 'Market Nearby'],
    images: [
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800',
    status: 'available',
    datePosted: '2024-01-30',
    agentContact: '+91-9876543220',
    coordinates: { lat: 12.1063, lng: 75.4904 },
    verified: true
  },
  {
    id: 'prop_012',
    title: 'Coworking Space in Thiruvananthapuram',
    type: 'commercial',
    subtype: 'Coworking Spaces',
    city: 'Thiruvananthapuram',
    location: 'Technopark',
    price: 8000000,
    area: 2000,
    bathrooms: 4, // Coworking space with multiple bathrooms
    description: 'Modern coworking space in IT hub.',
    features: ['High-Speed Internet', 'Meeting Rooms', 'Cafeteria', 'IT Hub'],
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    status: 'available',
    datePosted: '2024-02-01',
    agentContact: '+91-9876543221',
    coordinates: { lat: 8.5241, lng: 76.9366 },
    verified: true
  },
  // Additional residential properties with varied bathroom counts
  {
    id: 'prop_013',
    title: '2 BHK Duplex in Alappuzha',
    type: 'residential',
    subtype: 'Duplex / Triplex Homes',
    city: 'Alappuzha',
    location: 'Kumbakonam',
    price: 5200000,
    area: 1400,
    bedrooms: 2,
    bathrooms: 3, // 2 BHK duplex with 3 bathrooms (one on each floor + guest)
    parking: 2,
    description: 'Beautiful duplex home near backwaters with modern amenities.',
    features: ['Duplex Design', 'Backwater View', 'Modern Kitchen', 'Terrace Garden'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    status: 'available',
    datePosted: '2024-02-03',
    agentContact: '+91-9876543222',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    verified: true
  },
  {
    id: 'prop_014',
    title: '3 BHK Gated Community Flat in Ernakulam',
    type: 'residential',
    subtype: 'Gated Community Flats',
    city: 'Ernakulam',
    location: 'Palarivattom',
    price: 6800000,
    area: 1800,
    bedrooms: 3,
    bathrooms: 3, // 3 BHK with 3 bathrooms (attached to each bedroom)
    parking: 2,
    description: 'Premium gated community apartment with world-class amenities.',
    features: ['Gated Community', 'Swimming Pool', 'Gym', 'Children Play Area', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    status: 'available',
    datePosted: '2024-02-05',
    agentContact: '+91-9876543223',
    coordinates: { lat: 9.9816, lng: 76.2999 },
    verified: true
  },
  {
    id: 'prop_015',
    title: '5 BHK Independent Villa in Idukki',
    type: 'residential',
    subtype: 'Villas / Independent Houses',
    city: 'Idukki',
    location: 'Munnar',
    price: 18500000,
    area: 4200,
    bedrooms: 5,
    bathrooms: 6, // 5 BHK villa with 6 bathrooms (5 attached + 1 common)
    parking: 4,
    description: 'Luxury hill station villa with panoramic mountain views.',
    features: ['Hill Station', 'Mountain View', 'Tea Garden Nearby', 'Cool Climate', 'Luxury Interiors'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    status: 'available',
    datePosted: '2024-02-07',
    agentContact: '+91-9876543224',
    coordinates: { lat: 10.0889, lng: 77.0595 },
    verified: true
  }
];

// Helper functions for filtering
export const getPropertiesByType = (type) => {
  return mockProperties.filter(property => property.type === type);
};

export const getPropertiesByCity = (city) => {
  return mockProperties.filter(property => property.city === city);
};

export const getPropertiesBySubtype = (subtype) => {
  return mockProperties.filter(property => property.subtype === subtype);
};

export const searchProperties = ({ city, type, subtype, minPrice, maxPrice, minArea, maxArea, bathrooms, searchText }) => {
  return mockProperties.filter(property => {
    let matches = true;
    
    if (city && city !== 'all') {
      matches = matches && property.city === city;
    }
    
    if (type && type !== 'all') {
      matches = matches && property.type === type;
    }
    
    if (subtype && subtype !== 'all') {
      matches = matches && property.subtype === subtype;
    }
    
    if (minPrice) {
      matches = matches && property.price >= parseInt(minPrice);
    }
    
    if (maxPrice) {
      matches = matches && property.price <= parseInt(maxPrice);
    }
    
    if (minArea) {
      matches = matches && property.area >= parseInt(minArea);
    }
    
    if (maxArea) {
      matches = matches && property.area <= parseInt(maxArea);
    }
    
    if (bathrooms && bathrooms !== 'all') {
      const minBathrooms = parseInt(bathrooms);
      matches = matches && property.bathrooms && property.bathrooms >= minBathrooms;
    }
    
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      matches = matches && (
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.city.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower)
      );
    }
    
    return matches;
  });
};

export const getPropertyStats = () => {
  const stats = {
    total: mockProperties.length,
    byType: {},
    byCity: {},
    avgPrice: 0,
    priceRange: { min: Infinity, max: 0 }
  };
  
  let totalPrice = 0;
  
  mockProperties.forEach(property => {
    // Count by type
    stats.byType[property.type] = (stats.byType[property.type] || 0) + 1;
    
    // Count by city
    stats.byCity[property.city] = (stats.byCity[property.city] || 0) + 1;
    
    // Price calculations
    totalPrice += property.price;
    stats.priceRange.min = Math.min(stats.priceRange.min, property.price);
    stats.priceRange.max = Math.max(stats.priceRange.max, property.price);
  });
  
  stats.avgPrice = Math.round(totalPrice / mockProperties.length);
  
  return stats;
};