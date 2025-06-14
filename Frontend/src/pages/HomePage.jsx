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

// Styled components for animations and custom styling
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: 'white',
  padding: theme.spacing(8, 0), // Reduced from 12 to 8
  textAlign: 'center',
  minHeight: '45vh', // Reduced from 70vh to 45vh (35% reduction)
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  // Fallback background - only shows if video fails to load
  backgroundColor: '#1e3c72',
}));

const VideoBackground = styled('video')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 1, // Above background but below overlay
}));

const VideoOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for text readability
  zIndex: 2, // Above video
});

const ContentContainer = styled(Container)({
  position: 'relative',
  zIndex: 3, // Above everything else
});

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleGetStarted = () => {
    // Scroll to property listings section
    const propertySection = document.querySelector('#property-listings');
    if (propertySection) {
      propertySection.scrollIntoView({ behavior: 'smooth' });
    }
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
            {/* Video Background - Always Visible */}
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
            
            {/* Content Container with Proper Z-Index */}
            <ContentContainer maxWidth="md">
              <Slide direction="down" in={isLoaded} timeout={1200}>
                <div>
                  <Typography
                    variant={isMobile ? 'h4' : 'h2'} // Reduced from h3/h1 to h4/h2
                    component="h1"
                    gutterBottom
                    sx={{ 
                      fontWeight: 600, // Reduced from 700 to 600
                      mb: 1.5, // Reduced margin
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
                    variant={isMobile ? 'body2' : 'h6'} // Reduced from body1/h5 to body2/h6
                    component="h2"
                    sx={{ 
                      mb: 3, // Reduced margin
                      opacity: 0.9, 
                      fontWeight: 300,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      maxWidth: '600px', // Reduced from 800px
                      mx: 'auto'
                    }}
                  >
                    Find your dream home with exceptional service and integrity
                  </Typography>
                </div>
              </Slide>

              <Fade in={isLoaded} timeout={1600}>
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGetStarted}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: 'primary.main',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                  >
                    Explore Properties
                  </Button>
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
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Find Your Dream Property?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of satisfied customers who found their perfect property with Ideal Plots
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 2,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Contact Us Today
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;