// Shared organization schema to prevent duplication
export const getOrganizationSchema = (baseUrl = '', contactPhone = '') => {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Ideal Plots",
    "url": baseUrl || "https://idealplots.in",
    "logo": `${baseUrl}/Idealplotslogo.jpg`,
    "description": "Premium real estate services in Kerala specializing in residential and commercial properties",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thrissur",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactPhone || "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Malayalam", "Hindi"]
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Kerala"
      }
    ],
    "knowsAbout": [
      "Real Estate",
      "Property Sales",
      "Land Development",
      "Residential Properties",
      "Commercial Properties"
    ]
  };
};