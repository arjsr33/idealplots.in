import { styled } from '@mui/material/styles';
import { Paper, Box, Card, Chip, Grid, TextField, Select, InputLabel } from '@mui/material';

// Main search container with elegant dark theme
export const CompactSearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 50%, #0F0F0F 100%)',
  color: 'white',
  borderRadius: 16,
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.01) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  }
}));

// Search box width container
export const SearchBoxContainer = styled(Box)(({ theme }) => ({
  width: '70%',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    width: '85%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

// Property card with hover animations
export const PropertyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.15)',
  },
}));

// Price chip with gradient
export const PriceChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
  color: 'white',
}));

// Stats container
export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
  backgroundColor: '#f8f9fa',
  borderRadius: 12,
  marginBottom: theme.spacing(3),
}));

// Property grid with search animations
export const PropertyGrid = styled(Grid)(({ theme }) => ({
  transition: 'opacity 0.3s ease-in-out',
  '&.searching': {
    opacity: 0.6,
  },
}));

// Search overlay for loading states
export const SearchingOverlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 10,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    pointerEvents: 'none',
  },
  '&.searching::before': {
    opacity: 1,
  },
}));

// Search indicator with animations
export const SearchIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 20,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  backgroundColor: 'white',
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(3),
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  '&.visible': {
    opacity: 1,
  },
}));

// Elegant text field for search form
export const ElegantTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    transition: 'all 0.3s ease',
    '& fieldset': { 
      borderColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      '& fieldset': { borderColor: 'transparent' },
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.1)',
      '& fieldset': { borderColor: 'transparent' },
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
    '&::placeholder': { 
      color: 'rgba(255, 255, 255, 0.7)',
      opacity: 1,
    }
  },
}));

// Elegant select for filters
export const ElegantSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  borderRadius: 12,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  color: 'white',
  transition: 'all 0.3s ease',
  '& .MuiOutlinedInput-notchedOutline': { 
    borderColor: 'transparent',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
  },
  '&.Mui-focused': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.1)',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

// Elegant input label
export const ElegantInputLabel = styled(InputLabel)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  '&.Mui-focused': {
    color: 'rgba(255, 255, 255, 0.9)',
  },
}));

// Clear filters button styles
export const clearFiltersButtonStyles = {
  borderColor: 'rgba(255, 255, 255, 0.3)',
  color: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 3,
  height: '56px',
  fontWeight: 400,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-1px)',
  }
};

// Load more button styles
export const loadMoreButtonStyles = {
  px: 4, 
  py: 1.5
};

// Search title styles
export const searchTitleStyles = {
  mb: 3, 
  textAlign: 'center',
  background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '0.5px'
};

// Results counter styles
export const resultsCounterStyles = {
  opacity: 0.8, 
  textAlign: 'center'
};