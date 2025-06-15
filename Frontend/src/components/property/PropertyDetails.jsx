import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  Paper,
  IconButton,
  ImageList,
  ImageListItem,
  Skeleton,
  Alert,
  Breadcrumbs,
  Link,
  Fade,
  Slide,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  Verified as VerifiedIcon,
  SquareFoot as AreaIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  LocalParking as ParkingIcon,
  CalendarToday as DateIcon,
  Star as StarIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon,
  NavigateNext as NavigateNextIcon,
  PhotoLibrary as GalleryIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../../services/api';
import PropertyDetailsSEO from './PropertyDetailsSEO';
import Navbar from '../Navbar';
import { 
  formatPrice, 
  formatArea,
  handleContactAgent,
  generatePropertySlug,
  parsePropertySlug
} from './utils/PropertyUtils';

// Import styled components from PropertyStyles.js
import {
  PropertyCard,
  PriceChip,
  StatsContainer,
} from './styles/PropertyStyles';

// Import centralized theme constants
import {
  BRAND_COLORS,
  SEMANTIC_COLORS,
  SHADOWS,
  BORDER_RADIUS,
  TRANSITIONS,
  Z_INDEX,
} from '../../theme/constants';

// Hero Section with compact height
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '40vh',
  minHeight: '300px',
  overflow: 'hidden',
  borderRadius: BORDER_RADIUS['2xl'],
  marginBottom: theme.spacing(3),
  cursor: 'pointer',
  boxShadow: SHADOWS.lg,
  
  [theme.breakpoints.down('md')]: {
    height: '30vh',
    minHeight: '250px',
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: `transform ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PropertyStatusChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: Z_INDEX.base + 1,
  fontWeight: 'bold',
  borderRadius: BORDER_RADIUS.xl,
  boxShadow: SHADOWS.sm,
}));

const VerifiedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: Z_INDEX.base + 1,
  backgroundColor: SEMANTIC_COLORS.success.main,
  color: 'white',
  padding: theme.spacing(0.5, 1),
  borderRadius: BORDER_RADIUS.lg,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  boxShadow: SHADOWS.sm,
}));

// Property detail cards
const FeatureCard = styled(PropertyCard)(({ theme }) => ({
  textAlign: 'center',
  height: '100%',
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

// Price section
const PriceSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${SEMANTIC_COLORS.success.main} 0%, ${SEMANTIC_COLORS.success.light} 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS['2xl'],
  textAlign: 'center',
  boxShadow: SHADOWS.md,
  marginBottom: theme.spacing(2),
}));

// Contact card
const ContactCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS['2xl'],
  boxShadow: SHADOWS.lg,
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: SHADOWS.xl,
  },
}));

// Scrollable description container
const ScrollableDescription = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: BORDER_RADIUS.xl,
  maxHeight: '200px',
  overflowY: 'auto',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[200],
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: theme.palette.grey[600],
    },
  },
}));

// Gallery container
const GalleryContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: BORDER_RADIUS.xl,
  marginBottom: theme.spacing(2),
  maxHeight: '300px',
  overflowY: 'auto',
  
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[200],
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: theme.palette.grey[600],
    },
  },
}));

// Features container
const FeaturesContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: BORDER_RADIUS.xl,
  backgroundColor: theme.palette.grey[50],
}));

// Action buttons
const ActionButton = styled(Button)(({ theme, variant = 'primary' }) => {
  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
      color: 'white',
    },
    secondary: {
      background: `linear-gradient(135deg, ${BRAND_COLORS.secondary.main} 0%, ${BRAND_COLORS.secondary.dark} 100%)`,
      color: 'white',
    },
    success: {
      background: `linear-gradient(135deg, ${SEMANTIC_COLORS.success.main} 0%, ${SEMANTIC_COLORS.success.dark} 100%)`,
      color: 'white',
    },
  };

  return {
    ...variants[variant],
    borderRadius: BORDER_RADIUS.xl,
    padding: theme.spacing(1.5, 3),
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: SHADOWS.md,
    transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
    
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: SHADOWS.lg,
      filter: 'brightness(1.1)',
    },
  };
});

const PropertyDetails = () => {
  const { propertySlug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load property data
  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!propertySlug) {
          throw new Error('Invalid property URL');
        }
        
        const response = await api.properties.getBySlug(propertySlug);
        
        if (!response.success || !response.data) {
          throw new Error('Property not found');
        }
        
        setProperty(response.data);
        
        try {
          const favoriteResponse = await api.favorites.check(response.data.id);
          setIsFavorite(favoriteResponse.isFavorite || false);
        } catch (favError) {
          console.log('Favorites check failed:', favError);
          setIsFavorite(false);
        }
        
      } catch (err) {
        console.error('Error loading property:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertySlug) {
      loadProperty();
    }
  }, [propertySlug]);

  // Event handlers
  const handleBackToListings = () => {
    const state = location.state;
    
    if (state?.returnUrl) {
      navigate(state.returnUrl);
      return;
    }
    
    if (document.referrer && document.referrer.includes(window.location.origin)) {
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.pathname === '/' && referrerUrl.search) {
        navigate(`/${referrerUrl.search}`);
        return;
      }
    }
    
    navigate('/');
  };

  const handleContactClick = () => {
    if (property) {
      handleContactAgent(property);
    }
  };

  const handleWhatsAppClick = () => {
    if (property) {
      const message = `Hi, I'm interested in ${property.title} (${property.id}). Can you provide more details?`;
      const phoneNumber = property.agentContact.replace(/[^\d]/g, '');
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFavoriteClick = async () => {
    if (!property) return;
    
    try {
      if (isFavorite) {
        await api.favorites.remove(property.id);
        setIsFavorite(false);
      } else {
        await api.favorites.add(property.id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Skeleton variant="text" height={80} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={300} sx={{ mb: 3, borderRadius: BORDER_RADIUS['2xl'] }} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: BORDER_RADIUS.xl }} />
              <Skeleton variant="rectangular" height={150} sx={{ borderRadius: BORDER_RADIUS.xl }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: BORDER_RADIUS.xl }} />
              <Skeleton variant="rectangular" height={150} sx={{ borderRadius: BORDER_RADIUS.xl }} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
          <ActionButton
            variant="primary"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToListings}
          >
            Back to Properties
          </ActionButton>
        </Container>
      </>
    );
  }

  // Render property details
  return (
    <>
      <PropertyDetailsSEO
        property={property}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
      />
      
      <Navbar />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }} separator={<NavigateNextIcon fontSize="small" />}>
          <Link 
            color="inherit" 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            sx={{ cursor: 'pointer' }}
          >
            Home
          </Link>
          <Link 
            color="inherit" 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            sx={{ cursor: 'pointer' }}
          >
            Properties
          </Link>
          <Typography color="text.primary">{property.title}</Typography>
        </Breadcrumbs>

        {/* Back Button */}
        <ActionButton
          variant="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToListings}
          sx={{ mb: 3 }}
        >
          Back to Properties
        </ActionButton>

        {/* Property Header - Above Image */}
        <Fade in timeout={600}>
          <Box sx={{ mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Box>
                <Typography variant="h3" component="h1" fontWeight="600" gutterBottom>
                  {property.title}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="text.secondary">
                    {property.location}, {property.city}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Chip 
                    icon={<HomeIcon />} 
                    label={property.subtype} 
                    variant="outlined" 
                    color="primary"
                  />
                  <Box display="flex" alignItems="center">
                    <DateIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.secondary">
                      Listed {new Date(property.datePosted).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box display="flex" gap={1}>
                <IconButton onClick={handleShareClick} color="primary">
                  <ShareIcon />
                </IconButton>
                <IconButton 
                  onClick={handleFavoriteClick} 
                  color={isFavorite ? 'error' : 'default'}
                >
                  <FavoriteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Hero Image Section */}
        <Fade in timeout={800}>
          <HeroSection>
            <HeroImage
              src={property.images[selectedImageIndex] || property.mainImage}
              alt={property.title}
              onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % property.images.length)}
            />
            
            <PropertyStatusChip 
              label={property.status === 'available' ? 'Available' : property.status}
              color={property.status === 'available' ? 'success' : 'default'}
            />
            
            {property.verified && (
              <VerifiedBadge>
                <VerifiedIcon fontSize="small" />
                <Typography variant="caption" fontWeight="bold">
                  Verified
                </Typography>
              </VerifiedBadge>
            )}
          </HeroSection>
        </Fade>

        {/* Content Below Image - Split Layout */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Left Half - Property Details, Price, Contact */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Slide direction="right" in timeout={1000}>
              <Box>
                {/* Property Details Grid */}
                <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
                  Property Details
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 6 }}>
                    <FeatureCard>
                      <CardContent>
                        <AreaIcon color="primary" fontSize="large" />
                        <Typography variant="h6" fontWeight="600">
                          {formatArea(property.area)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Area
                        </Typography>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                  
                  {property.bedrooms !== undefined && (
                    <Grid size={{ xs: 6 }}>
                      <FeatureCard>
                        <CardContent>
                          <BedIcon color="primary" fontSize="large" />
                          <Typography variant="h6" fontWeight="600">
                            {property.bedrooms}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Bedrooms
                          </Typography>
                        </CardContent>
                      </FeatureCard>
                    </Grid>
                  )}
                  
                  {property.bathrooms && (
                    <Grid size={{ xs: 6 }}>
                      <FeatureCard>
                        <CardContent>
                          <BathIcon color="primary" fontSize="large" />
                          <Typography variant="h6" fontWeight="600">
                            {property.bathrooms}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Bathrooms
                          </Typography>
                        </CardContent>
                      </FeatureCard>
                    </Grid>
                  )}
                  
                  {property.parking && (
                    <Grid size={{ xs: 6 }}>
                      <FeatureCard>
                        <CardContent>
                          <ParkingIcon color="primary" fontSize="large" />
                          <Typography variant="h6" fontWeight="600">
                            {property.parking}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Parking
                          </Typography>
                        </CardContent>
                      </FeatureCard>
                    </Grid>
                  )}
                </Grid>

                {/* Price Section */}
                <PriceSection>
                  <Typography variant="h4" fontWeight="700" gutterBottom>
                    {formatPrice(property.price)}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {formatArea(property.area)} • {property.subtype}
                  </Typography>
                </PriceSection>

                {/* Contact Agent Card */}
                <ContactCard>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 2 }}>
                      <PhoneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="600">
                        Contact Agent
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Quick response guaranteed
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                  
                  <Box display="flex" flexDirection="column" gap={2}>
                    <ActionButton
                      variant="secondary"
                      fullWidth
                      startIcon={<PhoneIcon />}
                      onClick={handleContactClick}
                    >
                      Call Now
                    </ActionButton>
                    
                    <ActionButton
                      variant="success"
                      fullWidth
                      startIcon={<WhatsAppIcon />}
                      onClick={handleWhatsAppClick}
                    >
                      WhatsApp
                    </ActionButton>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<EmailIcon />}
                      sx={{ 
                        borderColor: 'white', 
                        color: 'white',
                        borderRadius: BORDER_RADIUS.xl,
                        '&:hover': { 
                          borderColor: 'white', 
                          bgcolor: 'rgba(255,255,255,0.1)' 
                        }
                      }}
                    >
                      Email Inquiry
                    </Button>
                  </Box>
                  
                  <Typography variant="caption" sx={{ mt: 2, opacity: 0.8, display: 'block' }}>
                    Response within 24 hours guaranteed
                  </Typography>
                </ContactCard>
              </Box>
            </Slide>
          </Grid>

          {/* Right Half - Description Only */}
          <Grid size={{ xs: 12 , md: 6 }}>
            <Slide direction="left" in timeout={1000}>
              <Box>
                {/* Description matching left column height */}
                <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
                  Description
                </Typography>
                <ScrollableDescription sx={{ 
                  height: 'calc(100% - 40px)', // Match left column height minus title
                  minHeight: '500px', // Ensure reasonable minimum height
                  maxHeight: '600px', // Prevent excessive height
                }}>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
                    {property.description}
                  </Typography>
                </ScrollableDescription>
              </Box>
            </Slide>
          </Grid>
        </Grid>

        {/* Full Width Sections Below - Gallery and Features */}
        <Slide direction="up" in timeout={1200}>
          <Box>
            {/* Gallery Section */}
            {property.images && property.images.length > 1 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="600" gutterBottom>
                  Gallery ({property.images.length} photos)
                </Typography>
                <GalleryContainer>
                  <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={8}>
                    {property.images.map((image, index) => (
                      <ImageListItem 
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <img
                          src={image}
                          alt={`${property.title} - Image ${index + 1}`}
                          loading="lazy"
                          style={{ borderRadius: BORDER_RADIUS.lg }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </GalleryContainer>
              </Box>
            )}

            {/* Features Section */}
            {property.features && property.features.length > 0 && (
              <Box>
                <Typography variant="h5" fontWeight="600" gutterBottom>
                  Property Features
                </Typography>
                <FeaturesContainer>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {property.features.map((feature, index) => (
                      <PriceChip
                        key={index}
                        label={feature}
                        icon={<StarIcon />}
                        size="small"
                      />
                    ))}
                  </Box>
                </FeaturesContainer>
              </Box>
            )}
          </Box>
        </Slide>
      </Container>
    </>
  );
};

export default PropertyDetails;