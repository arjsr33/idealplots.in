import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { createSEODataStructure } from './utils/SEOUtils';

/**
 * Dynamic SEO Component for Property Listings
 * Works with both mock data (frontend) and real API data (backend)
 */
const DynamicSEO = ({
  filters = {},
  properties = [],
  propertyTypes = {},
  keralaCities = [],
  baseUrl = '',
  // Backend can override with pre-generated SEO data
  seoDataFromAPI = null,
  // Configuration
  config = {}
}) => {
  // If backend provides SEO data, use it; otherwise generate client-side
  const seoData = seoDataFromAPI || createSEODataStructure(filters, properties, {
    baseUrl: baseUrl || (typeof window !== 'undefined' ? window.location.origin : ''),
    propertyTypes,
    ...config
  });

  // Update page title dynamically for SPA navigation
  useEffect(() => {
    if (seoData.meta.title && typeof document !== 'undefined') {
      document.title = seoData.meta.title;
    }
  }, [seoData.meta.title]);

  // Build current page URL
  const currentUrl = baseUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Generate filter-based URL parameters for canonical
  const getCanonicalUrl = () => {
    if (seoData.meta.canonical) return seoData.meta.canonical;
    
    const basePageUrl = currentUrl.split('?')[0];
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.append(key, value);
      }
    });
    
    return params.toString() ? `${basePageUrl}?${params.toString()}` : basePageUrl;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.meta.title}</title>
      <meta name="description" content={seoData.meta.description} />
      <meta name="keywords" content={seoData.meta.keywords} />
      <meta name="robots" content={seoData.meta.robots || 'index, follow'} />
      <link rel="canonical" href={getCanonicalUrl()} />
      
      {/* Geographic targeting */}
      <meta name="geo.region" content={seoData.additional?.geoRegion || 'IN-KL'} />
      <meta name="geo.placename" content={seoData.additional?.geoPlacename || 'Kerala'} />
      
      {/* Property-specific meta tags */}
      {filters.city && filters.city !== 'all' && (
        <meta name="location" content={filters.city} />
      )}
      {filters.type && filters.type !== 'all' && (
        <meta name="property-type" content={propertyTypes[filters.type]?.name || filters.type} />
      )}
      {seoData.additional?.propertyCount && (
        <meta name="property-count" content={seoData.additional.propertyCount.toString()} />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.openGraph.title} />
      <meta property="og:description" content={seoData.openGraph.description} />
      <meta property="og:type" content={seoData.openGraph.type} />
      <meta property="og:url" content={seoData.openGraph.url} />
      <meta property="og:image" content={seoData.openGraph.image} />
      <meta property="og:site_name" content={seoData.openGraph.site_name} />
      <meta property="og:locale" content={seoData.openGraph.locale} />
      
      {/* Property-specific Open Graph */}
      {filters.minPrice && (
        <meta property="product:price:amount" content={filters.minPrice} />
      )}
      {filters.minPrice && (
        <meta property="product:price:currency" content="INR" />
      )}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.openGraph.title} />
      <meta name="twitter:description" content={seoData.openGraph.description} />
      <meta name="twitter:image" content={seoData.openGraph.image} />
      
      {/* Last Modified for SEO */}
      {seoData.additional?.lastModified && (
        <meta name="last-modified" content={seoData.additional.lastModified} />
      )}
      
      {/* Main Property Listings Schema */}
      <script type="application/ld+json">
        {JSON.stringify(seoData.structuredData.main)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(seoData.structuredData.breadcrumb)}
      </script>
      {/* Property ItemList Schema Only */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `${seoData.additional?.propertyCount || 0} Properties Available`,
          "numberOfItems": seoData.additional?.propertyCount || 0,
          "url": currentUrl
        })}
      </script>
    </Helmet>
  );
};

export default DynamicSEO;