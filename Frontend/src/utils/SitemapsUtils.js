// 📍 LOCATION: /src/utils/SitemapUtils.js
// Sitemap generation utilities for SEO
import { generatePropertyUrl } from '../components/property/utils/PropertyUtils';

/**
 * Generate sitemap data for all properties
 * This can be used by backend to generate XML sitemap or for client-side SEO
 */
export const generatePropertySitemap = (properties = [], baseUrl = '') => {
  const sitemapEntries = [];
  
  // Add homepage
  sitemapEntries.push({
    url: baseUrl || '/',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '1.0'
  });
  
  // Add individual property pages with clean slug URLs
  properties.forEach(property => {
    try {
      sitemapEntries.push({
        url: generatePropertyUrl(property, baseUrl),
        lastmod: property.lastUpdated || property.datePosted || new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8',
        images: property.images ? property.images.map(img => ({
          url: img,
          title: property.title,
          caption: `${property.title} - ${property.location}, ${property.city}`
        })) : []
      });
    } catch (error) {
      console.warn('Error generating URL for property:', property.id, error);
    }
  });
  
  return sitemapEntries;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (baseUrl = '') => {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
};

/**
 * Generate XML sitemap string from sitemap data
 */
export const generateXMLSitemap = (sitemapEntries = []) => {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
  
  const xmlFooter = `</urlset>`;
  
  const urlEntries = sitemapEntries.map(entry => {
    let urlXml = `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`;
    
    // Add image entries if available
    if (entry.images && entry.images.length > 0) {
      entry.images.forEach(image => {
        urlXml += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
    </image:image>`;
      });
    }
    
    urlXml += `
  </url>`;
    
    return urlXml;
  }).join('\n');
  
  return `${xmlHeader}\n${urlEntries}\n${xmlFooter}`;
};

/**
 * Generate structured data for website navigation
 */
export const generateWebsiteStructuredData = (baseUrl = '', properties = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ideal Plots",
    "url": baseUrl,
    "description": "Premier real estate platform for Kerala properties",
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "mainEntity": {
      "@type": "ItemList",
      "name": "Properties",
      "numberOfItems": properties.length,
      "itemListElement": properties.slice(0, 10).map((property, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": generatePropertyUrl(property, baseUrl)
      }))
    }
  };
};

/**
 * Generate meta tags for property listing pages with filters
 */
export const generateFilteredPageMeta = (filters = {}, properties = [], baseUrl = '') => {
  const { city, type, subtype, minPrice, maxPrice } = filters;
  
  // Generate dynamic title
  let title = 'Properties';
  if (subtype && subtype !== 'all') {
    title = subtype;
  } else if (type && type !== 'all') {
    title = type.charAt(0).toUpperCase() + type.slice(1) + ' Properties';
  }
  
  if (city && city !== 'all') {
    title += ` in ${city}`;
  }
  
  title += ' | Ideal Plots Kerala';
  
  // Generate description
  let description = `Find premium ${title.toLowerCase()} with Ideal Plots. `;
  if (properties.length > 0) {
    description += `${properties.length} verified listings available. `;
  }
  
  if (minPrice || maxPrice) {
    if (minPrice && maxPrice) {
      description += `Price range ₹${formatPriceShort(minPrice)} - ₹${formatPriceShort(maxPrice)}. `;
    } else if (minPrice) {
      description += `Starting from ₹${formatPriceShort(minPrice)}. `;
    } else if (maxPrice) {
      description += `Under ₹${formatPriceShort(maxPrice)}. `;
    }
  }
  
  description += 'DTCP approved, clear titles, expert guidance.';
  
  // Generate keywords
  const keywords = [
    'Kerala real estate',
    'Kerala property',
    city && city !== 'all' ? `${city} property` : null,
    type && type !== 'all' ? `${type} Kerala` : null,
    subtype && subtype !== 'all' ? subtype : null,
    'Ideal Plots'
  ].filter(Boolean).join(', ');
  
  return {
    title,
    description,
    keywords,
    canonical: baseUrl + buildFilterUrl(filters)
  };
};

/**
 * Build URL with filter parameters
 */
export const buildFilterUrl = (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all' && value !== '') {
      params.append(key, value);
    }
  });
  
  const queryString = params.toString();
  return queryString ? `/?${queryString}` : '/';
};

/**
 * Helper function to format price for meta descriptions
 */
const formatPriceShort = (price) => {
  const numPrice = parseInt(price);
  if (numPrice >= 10000000) {
    return `${(numPrice / 10000000).toFixed(1)}Cr`;
  } else if (numPrice >= 100000) {
    return `${(numPrice / 100000).toFixed(1)}L`;
  } else {
    return numPrice.toLocaleString();
  }
};

/**
 * Generate Open Graph data for filtered property pages
 */
export const generateFilteredPageOG = (filters = {}, properties = [], baseUrl = '') => {
  const meta = generateFilteredPageMeta(filters, properties, baseUrl);
  
  // Get representative image
  const featuredImage = properties.length > 0 
    ? properties[0].mainImage 
    : `${baseUrl}/images/kerala-real-estate-default.jpg`;
  
  return {
    title: meta.title,
    description: meta.description,
    type: 'website',
    url: baseUrl + buildFilterUrl(filters),
    image: featuredImage,
    site_name: 'Ideal Plots',
    locale: 'en_IN'
  };
};

/**
 * Generate JSON-LD for filtered property listing pages
 */
export const generateFilteredPageSchema = (filters = {}, properties = [], baseUrl = '') => {
  const meta = generateFilteredPageMeta(filters, properties, baseUrl);
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": meta.title,
    "description": meta.description,
    "url": baseUrl + buildFilterUrl(filters),
    "numberOfItems": properties.length,
    "itemListElement": properties.map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "RealEstateListing",
        "@id": generatePropertyUrl(property, baseUrl),
        "name": property.title,
        "url": generatePropertyUrl(property, baseUrl),
        "price": property.price,
        "priceCurrency": "INR",
        "image": property.mainImage,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.city,
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        }
      }
    }))
  };
};

/**
 * Generate breadcrumb schema for filtered pages
 */
export const generateFilteredPageBreadcrumbs = (filters = {}, baseUrl = '') => {
  const { city, type, subtype } = filters;
  
  const breadcrumbs = [
    { name: "Home", url: baseUrl }
  ];
  
  if (type && type !== 'all') {
    breadcrumbs.push({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      url: `${baseUrl}/?type=${type}`
    });
  }
  
  if (city && city !== 'all') {
    breadcrumbs.push({
      name: city,
      url: `${baseUrl}/?city=${encodeURIComponent(city)}`
    });
  }
  
  if (subtype && subtype !== 'all') {
    breadcrumbs.push({
      name: subtype,
      url: `${baseUrl}/?type=${type}&subtype=${encodeURIComponent(subtype)}`
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

export default {
  generatePropertySitemap,
  generateRobotsTxt,
  generateXMLSitemap,
  generateWebsiteStructuredData,
  generateFilteredPageMeta,
  generateFilteredPageOG,
  generateFilteredPageSchema,
  generateFilteredPageBreadcrumbs,
  buildFilterUrl
};