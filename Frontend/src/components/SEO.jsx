import React from 'react';
import { Helmet } from 'react-helmet';
import { getOrganizationSchema } from '../components/property/utils/OrganizationSchema';

const SEO = ({
  title = 'Ideal Plots - Premium Real Estate in Kerala',
  description = 'Find your dream property in Kerala. Premium plots, houses, and commercial spaces across Thrissur, Kochi, Calicut, and other prime locations.',
  keywords = 'real estate Kerala, plots Kerala, houses Kerala, property Kerala, land Kerala, Thrissur real estate, Kochi property, Calicut plots',
  location = '',
  propertyType = '',
  price = '',
  area = '',
  url = '',
  image = '',
  noIndex = false,
  canonicalUrl = '',
  propertyData = null,
  organizationData = null,
}) => {
  // Get current URL if not provided
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const canonical = canonicalUrl || currentUrl;

  // Build location-specific keywords
  const locationKeywords = location ? [
    `${propertyType} ${location}`,
    `property ${location}`,
    `real estate ${location}`,
    `${location} ${propertyType}`,
    `${location} property for sale`,
    `buy ${propertyType} ${location}`,
  ].join(', ') : '';

  // Combine all keywords
  const allKeywords = [keywords, locationKeywords].filter(Boolean).join(', ');
  // Default Organisation scheme imported from OrganisationSchema.js 
  const defaultOrganizationData = getOrganizationSchema(currentUrl);
  // Property-specific structured data
  const propertyStructuredData = propertyData ? {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": propertyData.name || title,
    "description": propertyData.description || description,
    "url": currentUrl,
    "image": propertyData.images || image,
    "datePosted": propertyData.datePosted || new Date().toISOString(),
    "validThrough": propertyData.validThrough,
    "price": propertyData.price,
    "priceCurrency": "INR",
    "availabilityStarts": propertyData.availabilityStarts,
    "property": {
      "@type": "Property",
      "propertyType": propertyData.propertyType || propertyType,
      "numberOfRooms": propertyData.numberOfRooms,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": propertyData.area || area,
        "unitText": "square feet"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": propertyData.streetAddress,
        "addressLocality": propertyData.locality || location,
        "addressRegion": "Kerala",
        "addressCountry": "IN",
        "postalCode": propertyData.postalCode
      },
      "geo": propertyData.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": propertyData.coordinates.lat,
        "longitude": propertyData.coordinates.lng
      } : undefined
    },
    "offers": {
      "@type": "Offer",
      "price": propertyData.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Ideal Plots"
      }
    }
  } : null;

  const finalOrganizationData = organizationData || defaultOrganizationData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Ideal Plots" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Geo-targeting for Kerala */}
      <meta name="geo.region" content="IN-KL" />
      <meta name="geo.placename" content="Kerala" />
      {location && <meta name="geo.placename" content={location} />}
      <meta name="ICBM" content="10.8505, 76.2711" /> {/* Kerala coordinates */}
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph for Real Estate */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="Ideal Plots" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Property-specific Open Graph */}
      {propertyType && <meta property="product:category" content={propertyType} />}
      {price && <meta property="product:price:amount" content={price} />}
      {price && <meta property="product:price:currency" content="INR" />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Real Estate specific meta tags */}
      {location && <meta name="location" content={location} />}
      {propertyType && <meta name="property-type" content={propertyType} />}
      {price && <meta name="price" content={`₹${price}`} />}
      {area && <meta name="area" content={area} />}
      
      {/* Local Business Tags */}
      <meta name="business-type" content="Real Estate" />
      <meta name="business-location" content="Kerala, India" />
      
      {/* Mobile and App Meta Tags */}
      <meta name="theme-color" content="#2E7D32" />
      <meta name="msapplication-TileColor" content="#2E7D32" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Ideal Plots" />
      
      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify(finalOrganizationData)}
      </script>
      
      {/* Structured Data for Property (if provided) */}
      {propertyStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(propertyStructuredData)}
        </script>
      )}
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//maps.googleapis.com" />
    </Helmet>
  );
};

export default SEO;