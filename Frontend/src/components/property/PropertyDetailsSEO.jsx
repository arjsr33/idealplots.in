import React from 'react';
import { getOrganizationSchema } from './utils/OrganizationSchema';
import { Helmet } from 'react-helmet';
import { 
  generatePropertyKeywords,
  generatePropertyStructuredData,
  generatePropertyCanonicalUrl,
  generatePropertyBreadcrumbs,
  formatPrice,
  formatArea
} from './utils/PropertyUtils';

/**
 * Enhanced SEO component specifically for Property Details pages
 * Provides rich structured data, social sharing, and search engine optimization
 */
const PropertyDetailsSEO = ({ 
  property, 
  baseUrl = '',
  additionalImages = [],
  relatedProperties = []
}) => {
  if (!property) {
    return null;
  }

  // Generate URLs and metadata
  const currentUrl = baseUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const canonicalUrl = generatePropertyCanonicalUrl(property, baseUrl);
  const breadcrumbs = generatePropertyBreadcrumbs(property);
  
  // Enhanced title and description
  const title = `${property.title} for Sale in ${property.city} - ${formatPrice(property.price)} | Ideal Plots Kerala`;
  
  const description = `${property.subtype} for sale in ${property.location}, ${property.city}. ${formatArea(property.area)} property priced at ${formatPrice(property.price)}. ${property.description.substring(0, 100)}... Contact Ideal Plots for viewing.`;

  // Generate keywords
  const keywords = generatePropertyKeywords(property);

  // Generate structured data
  const propertyStructuredData = generatePropertyStructuredData(property, baseUrl);
  
  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
      .filter(item => item.url)
      .map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
      }))
  };

  // Organization structured data
  const organizationData = getOrganizationSchema(baseUrl, property.agentContact);

  // FAQ structured data for property
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the price of this ${property.subtype} in ${property.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `This ${property.subtype} in ${property.location}, ${property.city} is priced at ${formatPrice(property.price)} for ${formatArea(property.area)}.`
        }
      },
      {
        "@type": "Question",
        "name": `What are the key features of this property?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": property.features ? property.features.join(', ') : 'DTCP approved property with clear title and modern amenities.'
        }
      },
      {
        "@type": "Question",
        "name": `How can I contact the agent for this property?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can contact our agent at ${property.agentContact} or visit our website to schedule a viewing of this ${property.subtype} in ${property.city}.`
        }
      }
    ]
  };

  // Image gallery structured data
  const imageGalleryData = property.images && property.images.length > 1 ? {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `${property.title} - Photo Gallery`,
    "description": `Image gallery for ${property.title} in ${property.city}`,
    "image": property.images.map((image, index) => ({
      "@type": "ImageObject",
      "url": image,
      "name": `${property.title} - Image ${index + 1}`,
      "description": `Photo ${index + 1} of ${property.title} in ${property.location}, ${property.city}`
    }))
  } : null;

  // Get primary image for social sharing
  const primaryImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : property.mainImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ideal Plots" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced Property Meta Tags */}
      <meta name="property-id" content={property.id} />
      <meta name="property-type" content={property.subtype} />
      <meta name="property-price" content={property.price.toString()} />
      <meta name="property-area" content={property.area.toString()} />
      <meta name="property-location" content={`${property.location}, ${property.city}`} />
      <meta name="property-status" content={property.status} />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="IN-KL" />
      <meta name="geo.placename" content={property.city} />
      <meta name="ICBM" content={property.coordinates ? `${property.coordinates.lat}, ${property.coordinates.lng}` : "10.8505, 76.2711"} />
      
      {/* Property-specific Meta Tags */}
      {property.bedrooms && <meta name="property-bedrooms" content={property.bedrooms.toString()} />}
      {property.bathrooms && <meta name="property-bathrooms" content={property.bathrooms.toString()} />}
      {property.parking && <meta name="property-parking" content={property.parking.toString()} />}
      
      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={primaryImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={property.title} />
      <meta property="og:site_name" content="Ideal Plots" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Additional Open Graph Images */}
      {property.images && property.images.slice(1, 4).map((image, index) => (
        <meta key={index} property="og:image" content={image} />
      ))}
      
      {/* Product-specific Open Graph */}
      <meta property="product:price:amount" content={property.price.toString()} />
      <meta property="product:price:currency" content="INR" />
      <meta property="product:category" content={property.subtype} />
      <meta property="product:condition" content="new" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={primaryImage} />
      <meta name="twitter:image:alt" content={property.title} />
      
      {/* Article Meta Tags */}
      <meta property="article:published_time" content={property.datePosted} />
      <meta property="article:modified_time" content={property.lastUpdated || property.datePosted} />
      <meta property="article:author" content="Ideal Plots" />
      <meta property="article:section" content="Real Estate" />
      <meta property="article:tag" content={property.city} />
      <meta property="article:tag" content={property.subtype} />
      <meta property="article:tag" content="Kerala Real Estate" />
      
      {/* Mobile and App Meta Tags */}
      <meta name="theme-color" content="#2E5BBA" />
      <meta name="apple-mobile-web-app-title" content="Ideal Plots" />
      <meta name="application-name" content="Ideal Plots" />
      
      {/* Structured Data Scripts */}
      {/* Main Property Listing */}
      <script type="application/ld+json">
        {JSON.stringify(propertyStructuredData)}
      </script>
      
      {/* Breadcrumb Navigation */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      
      {/* Organization Information */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      
      {/* FAQ Section */}
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
      
      {/* Image Gallery (if multiple images) */}
      {imageGalleryData && (
        <script type="application/ld+json">
          {JSON.stringify(imageGalleryData)}
        </script>
      )}
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": currentUrl,
          "mainEntity": propertyStructuredData,
          "isPartOf": {
            "@type": "WebSite",
            "name": "Ideal Plots",
            "url": baseUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/?search={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          },
          "breadcrumb": breadcrumbStructuredData
        })}
      </script>
      
      {/* Performance and Preload Hints */}
      <link rel="preload" as="image" href={primaryImage} />
      {property.images && property.images.slice(1, 3).map((image, index) => (
        <link key={index} rel="prefetch" as="image" href={image} />
      ))}
      
      {/* Alternate URLs for different languages (if applicable) */}
      <link rel="alternate" hrefLang="en-IN" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={currentUrl} />
    </Helmet>
  );
};

export default PropertyDetailsSEO;