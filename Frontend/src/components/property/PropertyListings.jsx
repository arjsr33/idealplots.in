import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Skeleton,
  Collapse,
  CircularProgress,
} from '@mui/material';
import {
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { propertyTypes, keralaCities } from '../../data/mockData';
import api from '../../services/api';

// Import modular components
import PropertySearch from './PropertySearch';
import PropertyCardComponent from './PropertyCard';
import DynamicSEO from './DynamicSEO';

// Import styles
import {
  StatsContainer,
  PropertyGrid,
  SearchingOverlay,
  SearchIndicator,
  loadMoreButtonStyles
} from './styles/PropertyStyles';

// Import utilities
import {
  getDefaultFilters,
  prepareSearchParams,
  SEARCH_DEBOUNCE_DELAY,
  LOADING_TRANSITION_DELAY
} from './utils/PropertyUtils';

const PropertyListings = () => {
  // State management
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState(getDefaultFilters());
  const [appliedFilters, setAppliedFilters] = useState(getDefaultFilters());

  // Load properties on component mount
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const response = await api.properties.getAll();
        console.log('Properties loaded:', response);
        const propertyData = response.data || [];
        setProperties(propertyData);
        setFilteredProperties(propertyData);
        setDisplayedProperties(propertyData);
        setAppliedFilters(getDefaultFilters());
      } catch (error) {
        console.error('Error loading properties:', error);
        setProperties([]);
        setFilteredProperties([]);
        setDisplayedProperties([]);
        setAppliedFilters(getDefaultFilters());
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

// Handle search and filtering with debounce
useEffect(() => {
  const performSearch = async () => {
    if (properties.length === 0) return;

    setSearching(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const searchParams = prepareSearchParams(filters);
      
      let results;
      if (Object.keys(searchParams).length === 0) {
        results = properties;
      } else {
        const response = await api.properties.search(searchParams);
        results = response.data || [];
      }
      
      setFilteredProperties(results);
      setDisplayedProperties(results);
      setAppliedFilters({ ...filters });
      
    } catch (error) {
      console.error('Error searching properties:', error);
      setFilteredProperties(properties);
      setDisplayedProperties(properties);
      setAppliedFilters({ ...filters });
    } finally {
      setTimeout(() => {
        setSearching(false);
      }, LOADING_TRANSITION_DELAY);
    }
  };

  const timeoutId = setTimeout(performSearch, SEARCH_DEBOUNCE_DELAY);
  return () => clearTimeout(timeoutId);
}, [filters, properties]);

// Event handlers
const handleFilterChange = (field, value) => {
  setFilters(prev => ({
    ...prev,
    [field]: value,
    ...(field === 'type' && { subtype: 'all' })
  }));
};

const handleClearFilters = () => {
  const defaultFilters = getDefaultFilters();
  setFilters(defaultFilters);
  setAppliedFilters(defaultFilters);
};

  const handleLoadMore = async () => {
    try {
      console.log('Load more properties');
      // In future: implement pagination
      // const nextPage = await api.properties.getAll({ page: currentPage + 1 });
    } catch (error) {
      console.error('Error loading more properties:', error);
    }
  };

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={240} />
            <CardContent>
              <Skeleton variant="text" height={32} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Skeleton variant="rectangular" width={80} height={32} />
                <Skeleton variant="rectangular" width={100} height={32} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Render no results message
  const renderNoResults = () => (
    <Box textAlign="center" py={8}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No properties found matching your criteria
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Try adjusting your search filters or browse all properties
      </Typography>
      <Button variant="contained" onClick={handleClearFilters}>
        View All Properties
      </Button>
    </Box>
  );

  // Get results header text
  const getResultsHeaderText = () => {
  if (appliedFilters.city !== 'all' && appliedFilters.type !== 'all') {
      return `Properties in ${appliedFilters.city} - ${propertyTypes[appliedFilters.type]?.name}`;
    } else if (appliedFilters.city !== 'all') {
      return `Properties in ${appliedFilters.city}`;
    } else if (appliedFilters.type !== 'all') {
      return `${propertyTypes[appliedFilters.type]?.name} Properties`;
    } else {
      return 'All Properties';
    }
  };

  return (
    <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 3 }, py: 4 }}>
      {/* Dynamic SEO Component */}
      <DynamicSEO
        filters={appliedFilters}
        properties={displayedProperties}
        propertyTypes={propertyTypes}
        keralaCities={keralaCities}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
        // seoDataFromAPI={seoDataFromAPI} // Backend can provide this
        config={{
          siteName: 'Ideal Plots',
          defaultImage: '/images/kerala-property-default.jpg'
        }}
      />

      {/* Search Component */}
      <PropertySearch
        searchFilters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        propertyTypes={propertyTypes}
        keralaCities={keralaCities}
        displayedPropertiesCount={displayedProperties.length}
        totalPropertiesCount={properties.length}
        searching={searching}
      />

      {/* Stats Container */}
      <StatsContainer sx={{ maxWidth: '1400px', mx: 'auto' }}>
        <Box textAlign="center">
          <Typography variant="h4" color="primary" fontWeight="600">
            {properties.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Properties
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h4" color="primary" fontWeight="600">
            {keralaCities.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cities Covered
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h4" color="primary" fontWeight="600">
            {Object.keys(propertyTypes).length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Property Types
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h4" color="primary" fontWeight="600">
            24/7
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Support Available
          </Typography>
        </Box>
      </StatsContainer>

      {/* Results Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h3" fontWeight="600">
          {getResultsHeaderText()}
          {searching && ' (Searching...)'}
        </Typography>
        <Box display="flex" alignItems="center">
          <FilterIcon color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {searching ? 'Searching...' : `${displayedProperties.length} Results`}
          </Typography>
        </Box>
      </Box>

      {/* Property Listings with Search Overlay */}
      <SearchingOverlay className={searching ? 'searching' : ''}>
        {searching && (
          <SearchIndicator className={searching ? 'visible' : ''}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Searching properties...
            </Typography>
          </SearchIndicator>
        )}
        
        {loading ? (
          renderLoadingSkeleton()
        ) : displayedProperties.length === 0 && !searching ? (
          renderNoResults()
        ) : (
          <Collapse in={!searching} timeout={300}>
            <PropertyGrid 
              container 
              spacing={3} 
              className={searching ? 'searching' : ''}
            >
              {displayedProperties.map((property, index) => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  <PropertyCardComponent property={property} index={index} />
                </Grid>
              ))}
            </PropertyGrid>
          </Collapse>
        )}
      </SearchingOverlay>

      {/* Load More Button */}
      {displayedProperties.length > 0 && !searching && (
        <Box textAlign="center" mt={6}>
          <Button
            variant="outlined"
            size="large"
            sx={loadMoreButtonStyles}
            onClick={handleLoadMore}
          >
            Load More Properties
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PropertyListings;