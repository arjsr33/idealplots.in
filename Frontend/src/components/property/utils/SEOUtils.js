// SEO utility functions for property listings - Backend ready

/**
 * Generate dynamic page title based on filters and property data
 */
export const generatePropertyListingTitle = (filters, properties = [], propertyTypes = {}) => {
  const { city, type, subtype, minPrice, maxPrice } = filters;
  const count = properties.length;
  
  // Build title components
  let titleParts = [];
  
  // Property type
  if (type && type !== 'all') {
    const typeDisplay = propertyTypes[type]?.name || type;
    if (subtype && subtype !== 'all') {
      titleParts.push(subtype);
    } else {
      titleParts.push(typeDisplay);
    }
  }
  
  // Location
  if (city && city !== 'all') {
    titleParts.push(`in ${city}`);
  }
  
  // Price range
  if (minPrice || maxPrice) {
    if (minPrice && maxPrice) {
      titleParts.push(`₹${formatPriceShort(minPrice)} - ₹${formatPriceShort(maxPrice)}`);
    } else if (minPrice) {
      titleParts.push(`Above ₹${formatPriceShort(minPrice)}`);
    } else if (maxPrice) {
      titleParts.push(`Under ₹${formatPriceShort(maxPrice)}`);
    }
  }
  
  // Base title
  let baseTitle = titleParts.length > 0 ? titleParts.join(' ') : 'Properties';
  
  // Add count if available
  if (count > 0) {
    baseTitle = `${baseTitle} - ${count} Available`;
  }
  
  return `${baseTitle} | Ideal Plots Kerala`;
};

/**
 * Generate dynamic meta description
 */
export const generatePropertyListingDescription = (filters, properties = [], propertyTypes = {}) => {
  const { city, type, subtype, minPrice, maxPrice } = filters;
  const count = properties.length;
  
  let descParts = [];
  
  // Opening
  if (count > 0) {
    descParts.push(`Discover ${count} premium`);
  } else {
    descParts.push('Find premium');
  }
  
  // Property type
  if (type && type !== 'all') {
    const typeDisplay = propertyTypes[type]?.name?.toLowerCase() || type;
    if (subtype && subtype !== 'all') {
      descParts.push(subtype.toLowerCase());
    } else {
      descParts.push(typeDisplay);
    }
  } else {
    descParts.push('properties');
  }
  
  // Location
  if (city && city !== 'all') {
    descParts.push(`in ${city}, Kerala`);
  } else {
    descParts.push('across Kerala');
  }
  
  // Features
  const features = [
    'DTCP approved',
    'clear titles',
    'verified listings',
    'competitive prices'
  ];
  
  let description = descParts.join(' ') + '. ' + 
    features.slice(0, 2).map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ') + 
    ' with expert guidance from Ideal Plots.';
  
  // Add price range if specified
  if (minPrice || maxPrice) {
    if (minPrice && maxPrice) {
      description += ` Price range: ₹${formatPriceShort(minPrice)} - ₹${formatPriceShort(maxPrice)}.`;
    } else if (minPrice) {
      description += ` Starting from ₹${formatPriceShort(minPrice)}.`;
    } else if (maxPrice) {
      description += ` Priced under ₹${formatPriceShort(maxPrice)}.`;
    }
  }
  
  return description;
};

/**
 * Generate dynamic keywords
 */
export const generatePropertyListingKeywords = (filters, properties = [], propertyTypes = {}) => {
  const { city, type, subtype } = filters;
  
  let keywords = ['real estate Kerala', 'property Kerala', 'Kerala real estate'];
  
  // Location-based keywords
  if (city && city !== 'all') {
    keywords.push(
      `${city} real estate`,
      `property ${city}`,
      `${city} property`,
      `real estate ${city}`,
      `${city} Kerala property`,
      `buy property ${city}`
    );
  }
  
  // Type-based keywords
  if (type && type !== 'all') {
    const typeDisplay = propertyTypes[type]?.name?.toLowerCase() || type;
    keywords.push(
      `${typeDisplay} Kerala`,
      `Kerala ${typeDisplay}`,
      `${typeDisplay} property Kerala`
    );
    
    if (city && city !== 'all') {
      keywords.push(
        `${typeDisplay} ${city}`,
        `${city} ${typeDisplay}`,
        `${typeDisplay} for sale ${city}`
      );
    }
  }
  
  // Subtype keywords
  if (subtype && subtype !== 'all') {
    keywords.push(subtype.toLowerCase());
    if (city && city !== 'all') {
      keywords.push(`${subtype} ${city}`, `${city} ${subtype}`);
    }
  }
  
  // Property-specific keywords from actual data
  if (properties.length > 0) {
    const uniqueSubtypes = [...new Set(properties.map(p => p.subtype))];
    const uniqueCities = [...new Set(properties.map(p => p.city))];
    
    uniqueSubtypes.slice(0, 3).forEach(subtype => {
      keywords.push(subtype.toLowerCase());
    });
    
    uniqueCities.slice(0, 3).forEach(city => {
      keywords.push(`${city} property`);
    });
  }
  
  return keywords.join(', ');
};

/**
 * Generate structured data for property listings page
 */
export const generatePropertyListingSchema = (filters, properties = [], baseUrl = '') => {
  const { city, type } = filters;
  
  // Main page schema
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": generatePropertyListingTitle(filters, properties),
    "description": generatePropertyListingDescription(filters, properties),
    "url": baseUrl,
    "numberOfItems": properties.length,
    "itemListElement": []
  };
  
  // Add individual properties to schema
  properties.slice(0, 10).forEach((property, index) => {
    pageSchema.itemListElement.push({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "RealEstateListing",
        "@id": `${baseUrl}/property/${property.id}`,
        "name": property.title,
        "description": property.description,
        "image": property.mainImage,
        "price": property.price,
        "priceCurrency": "INR",
        "url": `${baseUrl}/property/${property.id}`,
        "datePosted": property.datePosted,
        "property": {
          "@type": "Property",
          "propertyType": property.subtype,
          "numberOfRooms": property.bedrooms,
          "numberOfBathroomsTotal": property.bathrooms,
          "floorSize": {
            "@type": "QuantitativeValue",
            "value": property.area,
            "unitText": "square feet"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": property.city,
            "addressRegion": "Kerala",
            "addressCountry": "IN"
          }
        }
      }
    });
  });
  
  return pageSchema;
};

/**
 * Generate breadcrumb schema
 */
export const generateBreadcrumbSchema = (filters, baseUrl = '') => {
  const { city, type, subtype } = filters;
  const propertyTypes = {}; // This will come from props/context
  
  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Properties", url: `${baseUrl}/properties` }
  ];
  
  // Add type breadcrumb
  if (type && type !== 'all') {
    const typeDisplay = propertyTypes[type]?.name || type;
    breadcrumbs.push({
      name: typeDisplay,
      url: `${baseUrl}/properties/${type}`
    });
  }
  
  // Add location breadcrumb
  if (city && city !== 'all') {
    breadcrumbs.push({
      name: city,
      url: `${baseUrl}/properties/${city.toLowerCase().replace(/\s+/g, '-')}`
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generate Open Graph data for social sharing
 */
export const generateOpenGraphData = (filters, properties = [], baseUrl = '') => {
  const title = generatePropertyListingTitle(filters, properties);
  const description = generatePropertyListingDescription(filters, properties);
  
  // Get representative image from properties
  const featuredImage = properties.length > 0 
    ? properties[0].mainImage 
    : `${baseUrl}/images/default-property.jpg`;
  
  return {
    title,
    description,
    type: 'website',
    url: baseUrl,
    image: featuredImage,
    site_name: 'Ideal Plots',
    locale: 'en_IN'
  };
};

/**
 * Helper function to format price for titles/descriptions
 */
const formatPriceShort = (price) => {
  const numPrice = parseInt(price);
  if (numPrice >= 10000000) {
    return `${(numPrice / 10000000).toFixed(1)}Cr`;
  } else if (numPrice >= 100000) {
    return `${(numPrice / 100000).toFixed(1)}L`;
  } else {
    return `${numPrice.toLocaleString()}`;
  }
};

/**
 * Backend-ready SEO data structure
 * This structure matches what backend should send
 */
export const createSEODataStructure = (filters, properties = [], config = {}) => {
  const {
    baseUrl = '',
    siteName = 'Ideal Plots',
    defaultImage = '/images/default-property.jpg',
    propertyTypes = {}
  } = config;
  
  return {
    // Basic meta tags
    meta: {
      title: generatePropertyListingTitle(filters, properties, propertyTypes),
      description: generatePropertyListingDescription(filters, properties, propertyTypes),
      keywords: generatePropertyListingKeywords(filters, properties, propertyTypes),
      canonical: baseUrl,
      robots: 'index, follow'
    },
    
    // Open Graph data
    openGraph: generateOpenGraphData(filters, properties, baseUrl),
    
    // Structured data
    structuredData: {
      main: generatePropertyListingSchema(filters, properties, baseUrl),
      breadcrumb: generateBreadcrumbSchema(filters, baseUrl)
    },
    
    // Additional SEO data
    additional: {
      geoRegion: 'IN-KL',
      geoPlacename: filters.city && filters.city !== 'all' ? filters.city : 'Kerala',
      propertyCount: properties.length,
      lastModified: new Date().toISOString()
    }
  };
};