import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Avatar,
  Fade,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Verified as VerifiedIcon,
  SquareFoot as AreaIcon,
} from '@mui/icons-material';
import { PropertyCard, PriceChip } from './styles/PropertyStyles';
import { 
  formatPrice, 
  formatArea, 
  handleContactAgent, 
  handlePropertyClick,
  getPropertyTypeDisplay,
  getAnimationDelay
} from './utils/PropertyUtils';

const PropertyCardComponent = ({ property, index }) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    handlePropertyClick(property, navigate);
  };

  const onContactClick = (e) => {
    handleContactAgent(property, e);
  };

  return (
    <Fade in timeout={getAnimationDelay(index)}>
      <PropertyCard 
        onClick={onCardClick}
        sx={{
          // Exact fixed dimensions
          height: 570, // Exactly 570px height
          width: 446, // Exactly 446px width
          minWidth: 446, // Force exact width
          maxWidth: 446, // Force exact width
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto', // Center in grid cell
        }}
      >
        <CardMedia
          component="img"
          height="250" // Increased image height for larger card
          image={property.mainImage}
          alt={property.title}
          sx={{ 
            objectFit: 'cover', // Crop image to fit exactly
            flexShrink: 0, // Don't allow image to shrink
            width: 446, // Exact width
          }}
        />
        
        <CardContent 
          sx={{ 
            p: 3, // Increased padding for larger card
            flex: 1, // Fill remaining space (320px after 250px image)
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden', // Prevent content overflow
            width: 446, // Exact width
            boxSizing: 'border-box',
          }}
        >
          {/* Top Content Section */}
          <Box sx={{ flex: 1 }}>
            {/* Property Title and Verification */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
              <Typography 
                variant="h6" 
                component="h3" 
                fontWeight="600" 
                color="primary"
                sx={{
                  fontSize: '1.2rem', // Larger font for bigger card
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2, // Limit to 2 lines
                  WebkitBoxOrient: 'vertical',
                  flex: 1,
                  mr: 1,
                  height: '3.12em', // Fixed height for consistency (larger)
                }}
              >
                {property.title}
              </Typography>
              {property.verified && (
                <VerifiedIcon color="success" fontSize="small" sx={{ flexShrink: 0 }} />
              )}
            </Box>
            
            {/* Location */}
            <Box display="flex" alignItems="center" mb={1}>
              <LocationIcon color="action" fontSize="small" sx={{ mr: 1, flexShrink: 0 }} />
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '1rem', // Larger text for bigger card
                }}
              >
                {property.location}, {property.city}
              </Typography>
            </Box>

            {/* Property Type */}
            <Box display="flex" alignItems="center" mb={1.5}>
              <HomeIcon color="action" fontSize="small" sx={{ mr: 1, flexShrink: 0 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                {property.subtype}
              </Typography>
            </Box>

            {/* Price and Area */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <PriceChip 
                label={formatPrice(property.price)} 
                size="small"
                sx={{ 
                  fontSize: '0.9rem', // Larger for bigger card
                  maxWidth: '65%',
                  '& .MuiChip-label': {
                    px: 1.5,
                  }
                }}
              />
              <Chip 
                label={formatArea(property.area)} 
                variant="outlined" 
                size="small" 
                icon={<AreaIcon />}
                sx={{ fontSize: '1rem' }}
              />
            </Box>

            {/* Property Details */}
            {property.bedrooms !== undefined && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                mb={1.5} 
                sx={{ fontSize: '1rem' }}
              >
                {property.bedrooms} Bed • {property.bathrooms} Bath • {property.parking} Parking
              </Typography>
            )}
            
            {property.bedrooms === undefined && property.bathrooms && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                mb={1.5} 
                sx={{ fontSize: '0.85rem' }}
              >
                {property.bathrooms} Bath • {getPropertyTypeDisplay(property)}
              </Typography>
            )}

            {/* Description - Fixed height container */}
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{
                fontSize: '1rem', // Larger for bigger card
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3, // More lines for bigger card
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.4,
                height: '4.2em', // Fixed height for 3 lines
                mb: 1.5,
              }}
            >
              {property.description}
            </Typography>
          </Box>

          {/* Bottom Section - Agent Contact (Fixed at bottom) */}
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center"
            sx={{ 
              mt: 'auto', // Push to bottom
              pt: 1,
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', mr: 1 }}>
                <PhoneIcon fontSize="small" />
              </Avatar>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Agent Available
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PhoneIcon />}
              onClick={onContactClick}
              sx={{ 
                fontSize: '0.85rem',
                px: 2,
                py: 0.75,
                minWidth: 'auto',
              }}
            >
              Contact
            </Button>
          </Box>
        </CardContent>
      </PropertyCard>
    </Fade>
  );
};

export default PropertyCardComponent;