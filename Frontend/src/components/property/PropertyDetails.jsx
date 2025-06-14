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

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '60vh',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
  cursor: 'pointer',
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PropertyStatusChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 2,
  fontWeight: 'bold',
}));

const VerifiedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 2,
  backgroundColor: 'rgba(76, 175, 80, 0.9)',
  color: 'white',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const PriceSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #2E5BBA 0%, #1E3F8A 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  position: 'sticky',
  top: theme.spacing(12),
}));

const PropertyDetails = () => {
  const { propertySlug } = useParams();
  const navigate = useNavigate();
  
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
        
        // Fetch property details by slug
        const response = await api.properties.getBySlug(propertySlug);
        
        if (!response.success || !response.data) {
          throw new Error('Property not found');
        }
        
        setProperty(response.data);
        
        // Check if property is in favorites
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
    
    // If we have a return URL from navigation state, use it
    if (state?.returnUrl) {
      navigate(state.returnUrl);
      return;
    }
    
    // If we have URL referrer information, try to use it
    if (document.referrer && document.referrer.includes(window.location.origin)) {
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.pathname === '/' && referrerUrl.search) {
        navigate(`/${referrerUrl.search}`);
        return;
      }
    }
    
    // Fallback to home page
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
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You can add a toast notification here
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
          <Skeleton variant="rectangular" height={400} sx={{ mb: 4, borderRadius: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={200} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
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
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToListings}
          >
            Back to Properties
          </Button>
        </Container>
      </>
    );
  }

  // Render property details
  return (
    <>
      {/* Enhanced SEO for Property Details */}
      <PropertyDetailsSEO
        property={property}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
      />
      
      <Navbar />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }} separator={<NavigateNextIcon fontSize="small" />}>
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
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToListings}
          sx={{ mb: 3 }}
        >
          Back to Properties
        </Button>

        {/* Hero Image Section */}
        <Fade in timeout={800}>
          <HeroSection>
            <HeroImage
              src={property.images[selectedImageIndex] || property.mainImage}
              alt={property.title}
              onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % property.images.length)}
            />
            
            {/* Property Status */}
            <PropertyStatusChip 
              label={property.status === 'available' ? 'Available' : property.status}
              color={property.status === 'available' ? 'success' : 'default'}
            />
            
            {/* Verified Badge */}
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

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Slide direction="up" in timeout={1000}>
              <Box>
                {/* Property Title and Actions */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                  <Box>
                    <Typography variant="h3" component="h1" fontWeight="600" gutterBottom>
                      {property.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        {property.location}, {property.city}
                      </Typography>
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

                {/* Property Type and Date */}
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Chip 
                    icon={<HomeIcon />} 
                    label={property.subtype} 
                    variant="outlined" 
                    color="primary"
                  />
                  <Box display="flex" alignItems="center">
                    <DateIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Listed {new Date(property.datePosted).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Property Features Grid */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={6} sm={3}>
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
                    <Grid item xs={6} sm={3}>
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
                    <Grid item xs={6} sm={3}>
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
                    <Grid item xs={6} sm={3}>
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

                {/* Description */}
                <Paper sx={{ p: 3, mb: 4 }}>
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {property.description}
                  </Typography>
                </Paper>

                {/* Features */}
                {property.features && property.features.length > 0 && (
                  <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h5" fontWeight="600" gutterBottom>
                      Property Features
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {property.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          variant="outlined"
                          color="primary"
                          icon={<StarIcon />}
                        />
                      ))}
                    </Box>
                  </Paper>
                )}

                {/* Image Gallery */}
                {property.images && property.images.length > 1 && (
                  <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h5" fontWeight="600" gutterBottom>
                      Gallery
                    </Typography>
                    <ImageList variant="masonry" cols={3} gap={8}>
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
                            style={{ borderRadius: 8 }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Paper>
                )}
              </Box>
            </Slide>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Slide direction="left" in timeout={1200}>
              <Box>
                {/* Price Section */}
                <PriceSection sx={{ mb: 3 }}>
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
                        Get property details
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                  
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PhoneIcon />}
                      onClick={handleContactClick}
                      sx={{ 
                        bgcolor: 'white', 
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                      }}
                    >
                      Call Now
                    </Button>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<WhatsAppIcon />}
                      onClick={handleWhatsAppClick}
                      sx={{ 
                        borderColor: 'white', 
                        color: 'white',
                        '&:hover': { 
                          borderColor: 'white', 
                          bgcolor: 'rgba(255,255,255,0.1)' 
                        }
                      }}
                    >
                      WhatsApp
                    </Button>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<EmailIcon />}
                      sx={{ 
                        borderColor: 'white', 
                        color: 'white',
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
        </Grid>
      </Container>
    </>
  );
};

export default PropertyDetails;