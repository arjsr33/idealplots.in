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
      <PropertyCard onClick={onCardClick}>
        <CardMedia
          component="img"
          height="240"
          image={property.mainImage}
          alt={property.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 3 }}>
          {/* Property Title and Verification */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h6" component="h3" fontWeight="600" color="primary">
              {property.title}
            </Typography>
            {property.verified && (
              <VerifiedIcon color="success" fontSize="small" />
            )}
          </Box>
          
          {/* Location */}
          <Box display="flex" alignItems="center" mb={1}>
            <LocationIcon color="action" fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {property.location}, {property.city}
            </Typography>
          </Box>

          {/* Property Type */}
          <Box display="flex" alignItems="center" mb={2}>
            <HomeIcon color="action" fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {property.subtype}
            </Typography>
          </Box>

          {/* Price and Area */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <PriceChip label={formatPrice(property.price)} size="medium" />
            <Chip 
              label={formatArea(property.area)} 
              variant="outlined" 
              size="small" 
              icon={<AreaIcon />}
            />
          </Box>

          {/* Property Details - Conditional rendering based on property type */}
          {property.bedrooms !== undefined && (
            <Typography variant="body2" color="text.secondary" mb={2}>
              {property.bedrooms} Bed • {property.bathrooms} Bath • {property.parking} Parking
            </Typography>
          )}
          
          {property.bedrooms === undefined && property.bathrooms && (
            <Typography variant="body2" color="text.secondary" mb={2}>
              {property.bathrooms} Bath • {getPropertyTypeDisplay(property)}
            </Typography>
          )}

          {/* Description */}
          <Typography variant="body2" color="text.secondary" mb={3}>
            {property.description.substring(0, 100)}...
          </Typography>

          {/* Agent Contact Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', mr: 1 }}>
                <PhoneIcon fontSize="small" />
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                Agent Available
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PhoneIcon />}
              onClick={onContactClick}
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