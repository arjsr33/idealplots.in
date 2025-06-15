// src/components/styles/ModalStyles.js - Reusable Modal Styling
import { styled } from '@mui/material/styles';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';
import { BRAND_COLORS, SHADOWS, BORDER_RADIUS, TRANSITIONS } from '../../theme/constants';

// Large responsive dialog
export const LargeDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS.xl,
    margin: 0,
    overflow: 'hidden',
    
    // Desktop: Large size (1280x720 ratio)
    [theme.breakpoints.up('md')]: {
      maxWidth: '1200px',
      width: '90vw',
      maxHeight: '800px',
      height: '85vh',
    },
    
    // Tablet: Medium size
    [theme.breakpoints.between('sm', 'md')]: {
      maxWidth: '700px',
      width: '85vw',
      maxHeight: '600px',
      height: '80vh',
    },
    
    // Mobile: Tall and narrow
    [theme.breakpoints.down('sm')]: {
      maxWidth: '95vw',
      width: '95vw',
      maxHeight: '90vh',
      height: '90vh',
      margin: theme.spacing(1),
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
  },
}));

// Medium responsive dialog
export const MediumDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS.xl,
    margin: 0,
    overflow: 'hidden',
    
    // Desktop: Medium size
    [theme.breakpoints.up('md')]: {
      maxWidth: '800px',
      width: '70vw',
      maxHeight: '600px',
      height: '70vh',
    },
    
    // Tablet: Small-medium size
    [theme.breakpoints.between('sm', 'md')]: {
      maxWidth: '600px',
      width: '80vw',
      maxHeight: '500px',
      height: '70vh',
    },
    
    // Mobile: Full screen
    [theme.breakpoints.down('sm')]: {
      maxWidth: '95vw',
      width: '95vw',
      maxHeight: '85vh',
      height: '85vh',
      margin: theme.spacing(1),
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
  },
}));

// Small responsive dialog
export const SmallDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS.xl,
    margin: theme.spacing(2),
    overflow: 'hidden',
    
    // Desktop: Small size
    [theme.breakpoints.up('md')]: {
      maxWidth: '500px',
      width: '40vw',
      maxHeight: '400px',
    },
    
    // Tablet: Medium size
    [theme.breakpoints.between('sm', 'md')]: {
      maxWidth: '450px',
      width: '70vw',
      maxHeight: '450px',
    },
    
    // Mobile: Large size
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90vw',
      width: '90vw',
      maxHeight: '70vh',
      margin: theme.spacing(1),
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(6px)',
  },
}));

// Responsive dialog title
export const ResponsiveDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  borderRadius: `${BORDER_RADIUS['2xl']}px ${BORDER_RADIUS['2xl']}px 0 0`,
  position: 'relative',
  
  // Desktop: More padding
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 5),
  },
  
  // Tablet: Medium padding
  [theme.breakpoints.between('sm', 'md')]: {
    padding: theme.spacing(3, 4),
  },
  
  // Mobile: Compact padding
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5, 3),
  },
}));

// Alternative dialog titles with different colors
export const SecondaryDialogTitle = styled(ResponsiveDialogTitle)({
  background: `linear-gradient(135deg, ${BRAND_COLORS.secondary.main} 0%, ${BRAND_COLORS.secondary.dark} 100%)`,
});

export const TertiaryDialogTitle = styled(ResponsiveDialogTitle)({
  background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.main} 0%, ${BRAND_COLORS.tertiary.dark} 100%)`,
});

// Responsive dialog content
export const ResponsiveDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: '#fafafa',
  borderRadius: `0 0 ${BORDER_RADIUS['2xl']}px ${BORDER_RADIUS['2xl']}px`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  
  // Desktop: Large padding
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5, 6),
  },
  
  // Tablet: Medium padding
  [theme.breakpoints.between('sm', 'md')]: {
    padding: theme.spacing(4, 5),
  },
  
  // Mobile: Compact padding and scroll
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
}));

// White dialog content (alternative)
export const WhiteDialogContent = styled(ResponsiveDialogContent)({
  backgroundColor: 'white',
});

// Dark dialog content (alternative)
export const DarkDialogContent = styled(ResponsiveDialogContent)({
  backgroundColor: '#f5f5f5',
});

// Responsive form container
export const ResponsiveFormContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  
  // Desktop: Two-column layout
  [theme.breakpoints.up('md')]: {
    '& .form-grid': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: theme.spacing(4),
      height: '100%',
    },
    '& .left-column': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
    '& .right-column': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
  },
  
  // Mobile: Single column
  [theme.breakpoints.down('md')]: {
    '& .form-grid': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
  },
}));

// Three-column form container
export const ThreeColumnFormContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  
  // Desktop: Three-column layout
  [theme.breakpoints.up('lg')]: {
    '& .form-grid': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: theme.spacing(3),
      height: '100%',
    },
  },
  
  // Tablet: Two-column layout
  [theme.breakpoints.between('md', 'lg')]: {
    '& .form-grid': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: theme.spacing(3),
      height: '100%',
    },
  },
  
  // Mobile: Single column
  [theme.breakpoints.down('md')]: {
    '& .form-grid': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
  },
}));

// Large, well-spaced text fields
export const LargeTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'white',
    transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
    
    // Desktop: Larger input fields
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
      '& input': {
        padding: theme.spacing(2, 2, 2, 0),
      },
      '& textarea': {
        padding: theme.spacing(2, 2, 2, 0),
      },
    },
    
    // Mobile: Standard size
    [theme.breakpoints.down('md')]: {
      '& input': {
        padding: theme.spacing(1.5, 1.5, 1.5, 0),
      },
      '& textarea': {
        padding: theme.spacing(1.5, 1.5, 1.5, 0),
      },
    },
    
    '&:hover': {
      backgroundColor: '#fff',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: BRAND_COLORS.primary.main,
        borderWidth: '1px',
      },
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: BRAND_COLORS.primary.main,
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
    '&.Mui-focused': {
      color: BRAND_COLORS.primary.main,
    },
  },
  '& .MuiFormHelperText-root': {
    fontSize: '0.875rem',
    marginTop: theme.spacing(1),
  },
}));

// Standard text field with brand colors
export const BrandTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'white',
    transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
    
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: BRAND_COLORS.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: BRAND_COLORS.primary.main,
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: BRAND_COLORS.primary.main,
    },
  },
}));

// Compact text field for smaller spaces
export const CompactTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'white',
    '& input': {
      padding: theme.spacing(1, 1.5),
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: BRAND_COLORS.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: BRAND_COLORS.primary.main,
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: BRAND_COLORS.primary.main,
    },
  },
}));