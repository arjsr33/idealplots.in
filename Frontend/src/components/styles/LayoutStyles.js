// src/components/styles/LayoutStyles.js - Reusable Layout Components
import { styled } from '@mui/material/styles';
import { Box, Paper, Card } from '@mui/material';
import { BRAND_COLORS, SHADOWS, BORDER_RADIUS, TRANSITIONS } from '../../theme/constants';

// Info boxes with different variants
export const ContactInfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: `${BRAND_COLORS.primary.main}08`,
  borderRadius: BORDER_RADIUS.xl,
  border: `1px solid ${BRAND_COLORS.primary.main}30`,
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

export const WarningInfoBox = styled(ContactInfoBox)({
  backgroundColor: `#ea580c08`,
  borderColor: '#ea580c30',
});

export const SuccessInfoBox = styled(ContactInfoBox)({
  backgroundColor: `#16a34a08`,
  borderColor: '#16a34a30',
});

export const InfoBox = styled(ContactInfoBox)({
  backgroundColor: `#3b82f608`,
  borderColor: '#3b82f630',
});

// Content containers
export const SuccessBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5),
  backgroundColor: 'white',
  borderRadius: BORDER_RADIUS.xl,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
}));

export const ErrorBox = styled(SuccessBox)({
  backgroundColor: '#fef2f2',
  border: `1px solid #fecaca`,
});

export const LoadingBox = styled(SuccessBox)({
  backgroundColor: '#f8fafc',
  border: `1px solid #e2e8f0`,
});

// Ticket/Reference number display
export const TicketNumberBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: `${BRAND_COLORS.primary.main}08`,
  borderRadius: BORDER_RADIUS.xl,
  border: `2px solid ${BRAND_COLORS.primary.main}30`,
  margin: theme.spacing(3, 0, 2, 0),
  textAlign: 'center',
}));

// Card containers
export const ElevatedCard = styled(Card)(({ theme }) => ({
  borderRadius: BORDER_RADIUS['2xl'],
  boxShadow: SHADOWS.lg,
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  overflow: 'hidden',
  
  '&:hover': {
    boxShadow: SHADOWS.xl,
    transform: 'translateY(-2px)',
  },
}));

export const SimpleCard = styled(Card)(({ theme }) => ({
  borderRadius: BORDER_RADIUS.xl,
  boxShadow: SHADOWS.sm,
  overflow: 'hidden',
  border: `1px solid #e5e7eb`,
}));

export const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: BORDER_RADIUS['2xl'],
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: SHADOWS.lg,
}));

// Section containers
export const PageSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 0),
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 0),
  },
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  textAlign: 'center',
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 0),
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0),
  },
}));

export const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: BORDER_RADIUS.xl,
  boxShadow: SHADOWS.sm,
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// Flex containers
export const CenteredContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const SpaceBetweenContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const FlexColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const FlexRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

// Grid containers
export const ResponsiveGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  
  // Desktop: 3 columns
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  
  // Tablet: 2 columns
  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  
  // Mobile: 1 column
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
}));

export const TwoColumnGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  
  // Desktop and Tablet: 2 columns
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
  
  // Mobile: 1 column
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
  },
}));

export const ThreeColumnGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  
  // Large screens: 3 columns
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  
  // Medium screens: 2 columns
  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  
  // Small screens: 1 column
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
}));

export const FourColumnGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  
  // Extra large screens: 4 columns
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  
  // Large screens: 3 columns
  [theme.breakpoints.between('lg', 'xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  
  // Medium screens: 2 columns
  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  
  // Small screens: 1 column
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
}));

// Dividers and separators
export const StyledDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: `linear-gradient(90deg, transparent 0%, ${BRAND_COLORS.primary.main}30 50%, transparent 100%)`,
  margin: theme.spacing(3, 0),
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '100%',
  background: `linear-gradient(180deg, transparent 0%, ${BRAND_COLORS.primary.main}30 50%, transparent 100%)`,
  margin: theme.spacing(0, 2),
}));

// Sidebar layouts
export const SidebarLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  
  // Desktop: Sidebar + main content
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '300px 1fr',
  },
  
  // Tablet: Stacked layout
  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: '250px 1fr',
  },
  
  // Mobile: Single column
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
  },
}));

export const ReverseSidebarLayout = styled(SidebarLayout)(({ theme }) => ({
  // Desktop: Main content + sidebar
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 300px',
  },
  
  // Tablet: Main content + sidebar
  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: '1fr 250px',
  },
}));

// Sticky elements
export const StickyContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  zIndex: 10,
}));

export const StickyHeader = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: 'white',
  borderBottom: `1px solid #e5e7eb`,
  zIndex: 100,
  padding: theme.spacing(2, 0),
}));

// Overlay containers
export const OverlayContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const ModalOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1300,
});

// Animation containers
export const FadeInContainer = styled(Box)({
  animation: 'fadeIn 0.6s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

export const SlideInContainer = styled(Box)({
  animation: 'slideIn 0.6s ease-out',
  '@keyframes slideIn': {
    '0%': { 
      opacity: 0, 
      transform: 'translateY(30px)' 
    },
    '100%': { 
      opacity: 1, 
      transform: 'translateY(0)' 
    },
  },
});

export const ScaleInContainer = styled(Box)({
  animation: 'scaleIn 0.4s ease-out',
  '@keyframes scaleIn': {
    '0%': { 
      opacity: 0, 
      transform: 'scale(0.9)' 
    },
    '100%': { 
      opacity: 1, 
      transform: 'scale(1)' 
    },
  },
});