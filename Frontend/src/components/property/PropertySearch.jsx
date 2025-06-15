import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Button,
  FormControl,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { 
  CompactSearchContainer,
  SearchBoxContainer,
  ElegantTextField,
  ElegantSelect,
  ElegantInputLabel,
  clearFiltersButtonStyles,
  searchTitleStyles,
  resultsCounterStyles
} from './styles/PropertyStyles';
import { getAvailableSubtypes } from './utils/PropertyUtils';

const PropertySearch = ({
  searchFilters,
  onFilterChange,
  onClearFilters,
  propertyTypes,
  keralaCities,
  displayedPropertiesCount,
  totalPropertiesCount,
  searching
}) => {
  const availableSubtypes = getAvailableSubtypes(propertyTypes, searchFilters.type);

  return (
    <CompactSearchContainer elevation={4} sx={{ mx: 0 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        fontWeight="300" 
        sx={searchTitleStyles}
      >
        Find Your Dream Property
      </Typography>
      
      <SearchBoxContainer>
        {/* First Row - Main Search Fields */}
        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          <Grid size={{xs:12,md:6}}>
            <ElegantTextField
              fullWidth
              placeholder="Search by location, title..."
              value={searchFilters.searchText}
              onChange={(e) => onFilterChange('searchText', e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1.5, color: 'rgba(255,255,255,0.6)' }} />,
              }}
            />
          </Grid>
          
          <Grid size={{xs:12,sm:6,md:3}}>
            <FormControl fullWidth>
              <ElegantInputLabel>City</ElegantInputLabel>
              <ElegantSelect
                value={searchFilters.city}
                onChange={(e) => onFilterChange('city', e.target.value)}
                label="City"
              >
                <MenuItem value="all">All Cities</MenuItem>
                {keralaCities.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </ElegantSelect>
            </FormControl>
          </Grid>

          <Grid size={{xs:12,sm:6,md:3}}>
            <FormControl fullWidth>
              <ElegantInputLabel>Type</ElegantInputLabel>
              <ElegantSelect
                value={searchFilters.type}
                onChange={(e) => onFilterChange('type', e.target.value)}
                label="Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                {Object.entries(propertyTypes).map(([key, type]) => (
                  <MenuItem key={key} value={key}>{type.name}</MenuItem>
                ))}
              </ElegantSelect>
            </FormControl>
          </Grid>
        </Grid>

        {/* Second Row - Additional Filters */}
        <Grid container spacing={2.5}>
          <Grid size={{xs:12,sm:6,md:2}}>
            <FormControl fullWidth>
              <ElegantInputLabel>Subtype</ElegantInputLabel>
              <ElegantSelect
                value={searchFilters.subtype}
                onChange={(e) => onFilterChange('subtype', e.target.value)}
                disabled={searchFilters.type === 'all'}
                label="Subtype"
              >
                <MenuItem value="all">All Subtypes</MenuItem>
                {availableSubtypes.map(subtype => (
                  <MenuItem key={subtype} value={subtype}>{subtype}</MenuItem>
                ))}
              </ElegantSelect>
            </FormControl>
          </Grid>

          <Grid size={{xs:6,sm:3,md:1.5}}>
            <FormControl fullWidth>
              <ElegantInputLabel>Baths</ElegantInputLabel>
              <ElegantSelect
                value={searchFilters.bathrooms}
                onChange={(e) => onFilterChange('bathrooms', e.target.value)}
                label="Baths"
              >
                <MenuItem value="all">Any</MenuItem>
                <MenuItem value="1">1+</MenuItem>
                <MenuItem value="2">2+</MenuItem>
                <MenuItem value="3">3+</MenuItem>
                <MenuItem value="4">4+</MenuItem>
                <MenuItem value="5">5+</MenuItem>
              </ElegantSelect>
            </FormControl>
          </Grid>

          <Grid size={{xs:6,sm:6,md:1.5}}>
            <ElegantTextField
              fullWidth
              placeholder="Min Price (₹)"
              type="number"
              value={searchFilters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
            />
          </Grid>

          <Grid size={{xs:6,sm:6,md:1.5}}>
            <ElegantTextField
              fullWidth
              placeholder="Max Price (₹)"
              type="number"
              value={searchFilters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            />
          </Grid>

          <Grid size={{xs:6,sm:6,md:1.5}}>
            <ElegantTextField
              fullWidth
              placeholder="Min Area (sq ft)"
              type="number"
              value={searchFilters.minArea}
              onChange={(e) => onFilterChange('minArea', e.target.value)}
            />
          </Grid>

          <Grid size={{xs:6,sm:6,md:1.5}}>
            <ElegantTextField
              fullWidth
              placeholder="Max Area (sq ft)"
              type="number"
              value={searchFilters.maxArea}
              onChange={(e) => onFilterChange('maxArea', e.target.value)}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:1.5}}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={onClearFilters}
              fullWidth
              sx={clearFiltersButtonStyles}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>

        {/* Results Counter */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
          <Typography variant="body2" sx={resultsCounterStyles}>
            Showing {displayedPropertiesCount} of {totalPropertiesCount} properties
            {searching && ' (Searching...)'}
          </Typography>
        </Box>
      </SearchBoxContainer>
    </CompactSearchContainer>
  );
};

export default PropertySearch;