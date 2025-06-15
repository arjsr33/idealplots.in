import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Fade,
  Slide,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import PropertyListings from '../components/property/PropertyListings';

// Import centralized design constants
import {
  BRAND_COLORS,
  SHADOWS,
  BORDER_RADIUS,
  TRANSITIONS,
  Z_INDEX,
} from '../theme/constants';

// Styled components with centralized styling
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  minHeight: '45vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  // Use centralized color instead of hard-coded
  backgroundColor: BRAND_COLORS.primary.dark,
  
  [theme.breakpoints.down('md')]: {
    minHeight: '35vh',
    padding: theme.spacing(6, 0),
  },
}));

const VideoBackground = styled('video')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: Z_INDEX.base + 1, // Use centralized z-index
}));

const VideoOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: Z_INDEX.base + 2, // Use centralized z-index
});

const ContentContainer = styled(Container)({
  position: 'relative',
  zIndex: Z_INDEX.base + 3, // Use centralized z-index
});

// Hero button with centralized styling
const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontSize: '1.1rem',
  backgroundColor: 'rgba(255,255,255,0.9)',
  color: BRAND_COLORS.primary.main, // Use centralized color
  backdropFilter: 'blur(10px)',
  borderRadius: BORDER_RADIUS.xl, // Use centralized border radius
  boxShadow: SHADOWS.lg, // Use centralized shadow
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`, // Use centralized transition
  
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)',
    transform: 'scale(1.05)',
    boxShadow: SHADOWS.xl, // Use centralized shadow
  },
}));

// CTA section with centralized gradient
const CTASection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

// CTA button with centralized styling
const CTAButton = styled(Button)(({ theme }) => ({
  borderColor: 'white',
  color: 'white',
  padding: theme.spacing(2, 4),
  borderRadius: BORDER_RADIUS.xl, // Use centralized border radius
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`, // Use centralized transition
  
  '&:hover': {
    borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.md, // Use centralized shadow
  },
}));

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleGetStarted = () => {
    const propertySection = document.querySelector('#property-listings');
    if (propertySection) {
      propertySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactUs = () => {
    console.log('Contact Us clicked');
    // Future: Add contact functionality
  };

  return (
    <>
      <SEO 
        title="Ideal Plots - Find Your Dream Property in Kerala | Premium Real Estate"
        description="Discover premium real estate opportunities in Kerala. Residential plots, luxury villas, commercial properties in Thrissur, Kochi, Calicut. DTCP approved with clear titles."
        keywords="real estate Kerala, property Kerala, plots Kerala, houses Kerala, Kerala land sale, Thrissur real estate, Kochi property, residential plots Kerala"
        location="Kerala"
        url={typeof window !== 'undefined' ? window.location.href : ''}
        image="https://idealplots.in/images/kerala-real-estate-hero.jpg"
      />

      {/* Navigation */}
      <Navbar />

      <Box>
        {/* Hero Section with Video Background */}
        <Fade in={isLoaded} timeout={1000}>
          <HeroSection>
            {/* Video Background */}
            <VideoBackground
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source 
                src="https://videos.pexels.com/video-files/3773486/3773486-hd_1280_720_60fps.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </VideoBackground>
            
            {/* Dark Overlay for Text Readability */}
            <VideoOverlay />
            
            {/* Content Container */}
            <ContentContainer maxWidth="md">
              <Slide direction="down" in={isLoaded} timeout={1200}>
                <div>
                  <Typography
                    variant={isMobile ? 'h4' : 'h2'}
                    component="h1"
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: 1.5,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
                    }}
                  >
                    Your Trusted Partner in All Property Needs
                  </Typography>
                </div>
              </Slide>
              
              <Slide direction="up" in={isLoaded} timeout={1400}>
                <div>
                  <Typography
                    variant={isMobile ? 'body2' : 'h6'}
                    component="h2"
                    sx={{ 
                      mb: 3,
                      opacity: 0.9, 
                      fontWeight: 300,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      maxWidth: '600px',
                      mx: 'auto'
                    }}
                  >
                    Find your dream home with exceptional service and integrity
                  </Typography>
                </div>
              </Slide>

              <Fade in={isLoaded} timeout={1600}>
                <Box>
                  <HeroButton
                    variant="contained"
                    size="large"
                    onClick={handleGetStarted}
                  >
                    Explore Properties
                  </HeroButton>
                </Box>
              </Fade>
            </ContentContainer>
          </HeroSection>
        </Fade>

        {/* Property Listings Section */}
        <Box sx={{ py: 8 }} id="property-listings">
          <PropertyListings />
        </Box>

        {/* CTA Section */}
        <CTASection>
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Find Your Dream Property?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of satisfied customers who found their perfect property with Ideal Plots
            </Typography>
            <CTAButton
              variant="outlined"
              size="large"
              onClick={handleContactUs}
            >
              Contact Us Today
            </CTAButton>
          </Container>
        </CTASection>
      </Box>
    </>
  );
};

export default Homepage;