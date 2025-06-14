// Utility functions for property-related operations

export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} L`;
  } else {
    return `₹${price.toLocaleString()}`;
  }
};

export const formatArea = (area) => {
  if (area >= 43560) { // 1 acre = 43560 sq ft
    return `${(area / 43560).toFixed(2)} acres`;
  } else {
    return `${area.toLocaleString()} sq ft`;
  }
};

export const getAvailableSubtypes = (propertyTypes, currentType) => {
  if (currentType === 'all') return [];
  return propertyTypes[currentType]?.subcategories || [];
};

export const prepareSearchParams = (searchFilters) => {
  const searchParams = {
    ...searchFilters,
    // Convert 'all' to empty string for API
    city: searchFilters.city === 'all' ? '' : searchFilters.city,
    type: searchFilters.type === 'all' ? '' : searchFilters.type,
    subtype: searchFilters.subtype === 'all' ? '' : searchFilters.subtype,
  };

  // Remove empty parameters
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key] === '' || searchParams[key] === 'all') {
      delete searchParams[key];
    }
  });

  return searchParams;
};

export const getDefaultFilters = () => ({
  city: 'all',
  type: 'all',
  subtype: 'all',
  minPrice: '',
  maxPrice: '',
  minArea: '',
  maxArea: '',
  bathrooms: 'all',
  searchText: ''
});

// Property type display helpers
export const getPropertyTypeDisplay = (property) => {
  const typeMap = {
    'commercial': 'Commercial Space',
    'industrial': 'Industrial Facility',
    'special': 'Special Purpose'
  };
  
  return typeMap[property.type] || property.type;
};

// Contact handler
export const handleContactAgent = (property, event) => {
  if (event) {
    event.stopPropagation();
  }
  window.open(`tel:${property.agentContact}`, '_self');
};

// Property click handler - Updated for routing
export const handlePropertyClick = (property, navigate) => {
  const slug = generatePropertySlug(property);
  navigate(`/property/${slug}`);
};

// Animation delay calculator
export const getAnimationDelay = (index) => 600 + (index * 100);

// Search debounce delay
export const SEARCH_DEBOUNCE_DELAY = 500;

// Loading delay for smooth transitions
export const LOADING_TRANSITION_DELAY = 200;

// URL Slug Generation and Parsing Functions
export const generatePropertySlug = (property) => {
  if (!property || !property.title || !property.city || !property.location) {
    throw new Error('Property must have title, city, and location to generate slug');
  }
  
  // Create SEO-friendly slug from title, location, and city
  const titleSlug = property.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
  
  const locationSlug = property.location
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  const citySlug = property.city
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/\(|\)/g, '') // Remove parentheses from city names like "Kozhikode (Calicut)"
    .trim();
  
  // Combine title, location, and city for uniqueness without ID
  return `${titleSlug}-${locationSlug}-${citySlug}`;
};

export const parsePropertySlug = (slug) => {
  if (!slug) {
    return { titleSlug: null, locationSlug: null, citySlug: null };
  }
  
  // For clean URLs without IDs, we'll need to search by slug pattern
  // The backend will handle finding the property by matching title, location, city
  return { 
    fullSlug: slug,
    titleSlug: null, // Will be extracted by backend
    locationSlug: null, // Will be extracted by backend  
    citySlug: null // Will be extracted by backend
  };
};

// SEO-friendly URL generation
export const generatePropertyUrl = (property, baseUrl = '') => {
  const slug = generatePropertySlug(property);
  return `${baseUrl}/property/${slug}`;
};

// Property URL validation
export const validatePropertyUrl = (slug, property) => {
  if (!slug || !property) return false;
  
  const { id } = parsePropertySlug(slug);
  return id === property.id;
};

// Generate breadcrumb data for property page
export const generatePropertyBreadcrumbs = (property) => {
  return [
    { name: 'Home', url: '/' },
    { name: 'Properties', url: '/' },
    { name: property.city, url: `/?city=${encodeURIComponent(property.city)}` },
    { name: property.subtype, url: `/?type=${property.type}&subtype=${encodeURIComponent(property.subtype)}` },
    { name: property.title, url: null, current: true }
  ];
};

// Generate canonical URL for property page
export const generatePropertyCanonicalUrl = (property, baseUrl = '') => {
  return generatePropertyUrl(property, baseUrl);
};

// Generate property share data
export const generatePropertyShareData = (property, baseUrl = '') => {
  return {
    title: `${property.title} - ${property.city} | Ideal Plots`,
    text: `Check out this ${property.subtype} in ${property.city}. ${formatPrice(property.price)} - ${formatArea(property.area)}`,
    url: generatePropertyUrl(property, baseUrl),
  };
};

// Property page meta keywords generator
export const generatePropertyKeywords = (property) => {
  const keywords = [
    property.title,
    `${property.city} real estate`,
    `${property.type} ${property.city}`,
    property.subtype,
    `property ${property.city}`,
    `${property.city} ${property.subtype}`,
    'Kerala real estate',
    'Kerala property',
    `${property.city} property for sale`,
    `buy ${property.subtype} ${property.city}`,
    'Ideal Plots',
    'real estate Kerala'
  ];
  
  // Add price-related keywords
  if (property.price) {
    if (property.price >= 10000000) {
      keywords.push('luxury property Kerala', 'premium real estate Kerala');
    } else if (property.price <= 2000000) {
      keywords.push('affordable property Kerala', 'budget property Kerala');
    }
  }
  
  // Add area-related keywords
  if (property.area) {
    if (property.area >= 5000) {
      keywords.push('large property Kerala', 'spacious property Kerala');
    }
  }
  
  // Add property-specific keywords
  if (property.bedrooms) {
    keywords.push(`${property.bedrooms} bedroom ${property.city}`, `${property.bedrooms} BHK ${property.city}`);
  }
  
  return keywords.join(', ');
};

// Generate property structured data for individual property page
export const generatePropertyStructuredData = (property, baseUrl = '') => {
  const propertyUrl = generatePropertyUrl(property, baseUrl);
  
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": propertyUrl,
    "name": property.title,
    "description": property.description,
    "url": propertyUrl,
    "image": property.images || [property.mainImage],
    "datePosted": property.datePosted,
    "validThrough": property.validThrough,
    "price": property.price,
    "priceCurrency": "INR",
    "availabilityStarts": property.availabilityStarts,
    "listingType": "ForSale",
    "property": {
      "@type": "Property",
      "propertyType": property.subtype,
      "numberOfRooms": property.bedrooms,
      "numberOfBathroomsTotal": property.bathrooms,
      "parkingSpaces": property.parking,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.area,
        "unitText": "square feet"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": property.location,
        "addressLocality": property.city,
        "addressRegion": "Kerala",
        "addressCountry": "IN"
      },
      "geo": property.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": property.coordinates.lat,
        "longitude": property.coordinates.lng
      } : undefined,
      "amenityFeature": property.features ? property.features.map(feature => ({
        "@type": "LocationFeatureSpecification",
        "name": feature
      })) : undefined
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": property.datePosted,
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Ideal Plots",
        "url": baseUrl,
        "telephone": property.agentContact,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        }
      }
    },
    "potentialAction": {
      "@type": "ViewAction",
      "target": propertyUrl
    }
  };
};