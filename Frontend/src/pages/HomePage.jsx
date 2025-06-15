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

// Responsive Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: BRAND_COLORS.primary.dark,
  
  [theme.breakpoints.down('lg')]: {
    minHeight: '45vh',
    padding: theme.spacing(7, 0),
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '40vh',
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '35vh',
    padding: theme.spacing(4, 0),
  },
  [theme.breakpoints.down('xs')]: {
    minHeight: '30vh',
    padding: theme.spacing(3, 0),
  },
}));

// Responsive Video Background
const VideoBackground = styled('video')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: Z_INDEX.base + 1,
  
  // Hide video on very small screens to improve performance
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: Z_INDEX.base + 2,
  
  // Darker overlay on mobile without video
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: Z_INDEX.base + 3,
  
  // Responsive padding
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// Responsive Hero Button
const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontSize: '1.1rem',
  backgroundColor: 'rgba(255,255,255,0.9)',
  color: BRAND_COLORS.primary.main,
  backdropFilter: 'blur(10px)',
  borderRadius: BORDER_RADIUS.xl,
  boxShadow: SHADOWS.lg,
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)',
    transform: 'scale(1.05)',
    boxShadow: SHADOWS.xl,
  },
  
  // Responsive sizing
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 2.5),
    fontSize: '0.95rem',
    minWidth: '140px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.9rem',
    minWidth: '120px',
  },
}));

// Responsive CTA Section
const CTASection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  
  // Responsive padding
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(5, 0),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(4, 0),
  },
}));

// Responsive CTA Button
const CTAButton = styled(Button)(({ theme }) => ({
  borderColor: 'white',
  color: 'white',
  padding: theme.spacing(2, 4),
  borderRadius: BORDER_RADIUS.xl,
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.md,
  },
  
  // Responsive sizing
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5, 3),
    fontSize: '0.95rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 2.5),
    fontSize: '0.9rem',
    minWidth: '140px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.85rem',
    minWidth: '120px',
  },
}));

// Responsive Property Listings Container
const PropertyListingsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  
  // Responsive padding
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(3, 0),
  },
}));

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

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

  // Get responsive text variant for main heading
  const getMainHeadingVariant = () => {
    if (isSmallMobile) return 'h5';
    if (isMobile) return 'h4';
    if (isTablet) return 'h3';
    return 'h2';
  };

  // Get responsive text variant for subheading
  const getSubHeadingVariant = () => {
    if (isSmallMobile) return 'body1';
    if (isMobile) return 'h6';
    if (isTablet) return 'h6';
    return 'h6';
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
            {/* Video Background - Hidden on mobile */}
            {!isMobile && (
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
            )}
            
            {/* Dark Overlay for Text Readability */}
            <VideoOverlay />
            
            {/* Content Container */}
            <ContentContainer maxWidth="md">
              <Slide direction="down" in={isLoaded} timeout={1200}>
                <div>
                  <Typography
                    variant={getMainHeadingVariant()}
                    component="h1"
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: { xs: 1, sm: 1.5, md: 1.5 },
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      px: { xs: 1, sm: 0 }, // Add padding on very small screens
                      lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                    }}
                  >
                    Your Trusted Partner in All Property Needs
                  </Typography>
                </div>
              </Slide>
              
              <Slide direction="up" in={isLoaded} timeout={1400}>
                <div>
                  <Typography
                    variant={getSubHeadingVariant()}
                    component="h2"
                    sx={{ 
                      mb: { xs: 2, sm: 3, md: 3 },
                      opacity: 0.9, 
                      fontWeight: 300,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      maxWidth: { xs: '100%', sm: '600px' },
                      mx: 'auto',
                      px: { xs: 1, sm: 0 },
                      lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 },
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
        <PropertyListingsContainer id="property-listings">
          <PropertyListings />
        </PropertyListingsContainer>

        {/* CTA Section */}
        <CTASection>
          <Container 
            maxWidth="md"
            sx={{
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography 
              variant={isSmallMobile ? "h5" : isMobile ? "h4" : "h4"} 
              component="h2" 
              gutterBottom
              sx={{
                mb: { xs: 1, sm: 2 },
                px: { xs: 1, sm: 0 },
              }}
            >
              Ready to Find Your Dream Property?
            </Typography>
            <Typography 
              variant={isSmallMobile ? "body1" : "h6"}
              sx={{ 
                mb: { xs: 3, sm: 4 }, 
                opacity: 0.9,
                px: { xs: 1, sm: 0 },
                lineHeight: { xs: 1.4, sm: 1.5 },
              }}
            >
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