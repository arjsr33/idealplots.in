import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  useTheme,
  useMediaQuery,
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

// Responsive styled components
import { styled } from '@mui/material/styles';

const ResponsiveContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4, 3),
  
  // Responsive padding
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(4, 2),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2, 1),
  },
}));

const ResponsiveStatsContainer = styled(StatsContainer)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  
  // Responsive layout
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
  },
}));

const ResponsiveResultsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  
  // Responsive layout
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const ResponsivePropertyGrid = styled(PropertyGrid)(({ theme }) => ({
  // Custom grid spacing for different screen sizes
  '& .MuiGrid-item': {
    // Desktop: 3 columns (33.33% each)
    [theme.breakpoints.up('lg')]: {
      flexBasis: '33.333%',
      maxWidth: '33.333%',
    },
    // Tablet: 2 columns (50% each)
    [theme.breakpoints.between('md', 'lg')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    // Small tablet: 2 columns (50% each)
    [theme.breakpoints.between('sm', 'md')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    // Mobile: 1 column (100%)
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

const PropertyListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

  // Helper functions for URL state management
  const getFiltersFromURL = () => {
    return {
      searchText: searchParams.get('search') || '',
      city: searchParams.get('city') || 'all',
      type: searchParams.get('type') || 'all',
      subtype: searchParams.get('subtype') || 'all',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minArea: searchParams.get('minArea') || '',
      maxArea: searchParams.get('maxArea') || '',
    };
  };

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key === 'searchText' ? 'search' : key, value);
      }
    });
    
    setSearchParams(params, { replace: true });
  };

  // State management
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState(() => {
    const urlFilters = getFiltersFromURL();
    const hasUrlParams = Object.values(urlFilters).some(val => val && val !== 'all' && val !== '');
    return hasUrlParams ? urlFilters : getDefaultFilters();
  });
  const [appliedFilters, setAppliedFilters] = useState(() => {
    const urlFilters = getFiltersFromURL();
    const hasUrlParams = Object.values(urlFilters).some(val => val && val !== 'all' && val !== '');
    return hasUrlParams ? urlFilters : getDefaultFilters();
  });

  // Load properties effect
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const response = await api.properties.getAll();
        console.log('Properties loaded:', response);
        const propertyData = response.data || [];
        setProperties(propertyData);
        
        const urlFilters = getFiltersFromURL();
        const hasSearchParams = Object.values(urlFilters).some(val => val && val !== 'all' && val !== '');
        
        if (hasSearchParams) {
          setFilters(urlFilters);
          setAppliedFilters(urlFilters);
        } else {
          setFilteredProperties(propertyData);
          setDisplayedProperties(propertyData);
          setAppliedFilters(getDefaultFilters());
        }
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

  // Search and filtering effect
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

  // URL change effect
  useEffect(() => {
    const handleUrlChange = () => {
      const urlFilters = getFiltersFromURL();
      const hasUrlParams = Object.values(urlFilters).some(val => val && val !== 'all' && val !== '');
      
      if (hasUrlParams) {
        setFilters(urlFilters);
      } else {
        setFilters(getDefaultFilters());
      }
    };

    handleUrlChange();
  }, [searchParams]);

  // Event handlers
  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value,
      ...(field === 'type' && { subtype: 'all' })
    };
    
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = getDefaultFilters();
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleLoadMore = async () => {
    try {
      console.log('Load more properties');
      // Future: implement pagination
    } catch (error) {
      console.error('Error loading more properties:', error);
    }
  };

  // Get responsive grid spacing
  const getGridSpacing = () => {
    if (isSmallMobile) return 2;
    if (isMobile) return 2;
    if (isTablet) return 2.5;
    return 3;
  };

  // Get responsive grid columns
  const getGridColumns = () => {
    if (isMobile) return 12; // 1 column on mobile
    if (isTablet) return 6;  // 2 columns on tablet
    return 4; // 3 columns on desktop
  };

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <ResponsivePropertyGrid container spacing={getGridSpacing()}>
      {[...Array(isMobile ? 3 : isTablet ? 4 : 6)].map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: getGridColumns() }} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={isMobile ? 200 : isTablet ? 220 : 250} />
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
    </ResponsivePropertyGrid>
  );

  // Render no results message
  const renderNoResults = () => (
    <Box textAlign="center" py={isMobile ? 4 : 8}>
      <Typography 
        variant={isMobile ? "body1" : "h6"} 
        color="text.secondary" 
        gutterBottom
        sx={{ px: isMobile ? 2 : 0 }}
      >
        No properties found matching your criteria
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        mb={3}
        sx={{ px: isMobile ? 2 : 0 }}
      >
        Try adjusting your search filters or browse all properties
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleClearFilters}
        size={isMobile ? "medium" : "large"}
      >
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

  // Get responsive heading variant
  const getHeadingVariant = () => {
    if (isSmallMobile) return 'h6';
    if (isMobile) return 'h5';
    return 'h5';
  };

  return (
    <ResponsiveContainer>
      {/* Dynamic SEO Component */}
      <DynamicSEO
        filters={appliedFilters}
        properties={displayedProperties}
        propertyTypes={propertyTypes}
        keralaCities={keralaCities}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
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
      <ResponsiveStatsContainer>
        <Box textAlign="center">
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            color="primary" 
            fontWeight="600"
          >
            {properties.length}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
          >
            Total Properties
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            color="primary" 
            fontWeight="600"
          >
            {keralaCities.length}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
          >
            Cities Covered
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            color="primary" 
            fontWeight="600"
          >
            {Object.keys(propertyTypes).length}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
          >
            Property Types
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            color="primary" 
            fontWeight="600"
          >
            24/7
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
          >
            Support Available
          </Typography>
        </Box>
      </ResponsiveStatsContainer>

      {/* Results Header */}
      <ResponsiveResultsHeader>
        <Typography 
          variant={getHeadingVariant()} 
          component="h3" 
          fontWeight="600"
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
            lineHeight: 1.3,
          }}
        >
          {getResultsHeaderText()}
          {searching && ' (Searching...)'}
        </Typography>
        <Box display="flex" alignItems="center">
          <FilterIcon 
            color="action" 
            sx={{ 
              mr: 1, 
              fontSize: isMobile ? '1.2rem' : '1.5rem' 
            }} 
          />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
          >
            {searching ? 'Searching...' : `${displayedProperties.length} Results`}
          </Typography>
        </Box>
      </ResponsiveResultsHeader>

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
            <ResponsivePropertyGrid 
              container 
              spacing={getGridSpacing()} 
              className={searching ? 'searching' : ''}
            >
              {displayedProperties.map((property, index) => (
                <Grid  
                  key={property.id}
                  size={{xs:12,sm:6,md:3}}
                >
                  <PropertyCardComponent property={property} index={index} />
                </Grid>
              ))}
            </ResponsivePropertyGrid>
          </Collapse>
        )}
      </SearchingOverlay>

      {/* Load More Button */}
      {displayedProperties.length > 0 && !searching && (
        <Box textAlign="center" mt={isMobile ? 4 : 6}>
          <Button
            variant="outlined"
            size={isMobile ? "medium" : "large"}
            sx={{
              ...loadMoreButtonStyles,
              fontSize: isMobile ? '0.9rem' : '1rem',
              padding: isMobile ? '8px 16px' : '12px 24px',
            }}
            onClick={handleLoadMore}
          >
            Load More Properties
          </Button>
        </Box>
      )}
    </ResponsiveContainer>
  );
};

export default PropertyListings;