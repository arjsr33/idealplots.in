// src/components/styles/ButtonStyles.js - Reusable Button Styling
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { BRAND_COLORS, SHADOWS, BORDER_RADIUS, TRANSITIONS } from '../../theme/constants';

// Large, prominent buttons
export const LargePrimaryButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS.xl,
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: SHADOWS.lg,
  border: 'none',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  // Desktop: Large button
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 6),
    minHeight: '56px',
  },
  
  // Mobile: Medium button
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5, 4),
    minHeight: '48px',
    fontSize: '1rem',
  },
  
  '&:hover': {
    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.xl,
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    transform: 'none',
    boxShadow: 'none',
  },
}));

// Large secondary button
export const LargeSecondaryButton = styled(LargePrimaryButton)({
  background: `linear-gradient(135deg, ${BRAND_COLORS.secondary.main} 0%, ${BRAND_COLORS.secondary.dark} 100%)`,
  '&:hover': {
    background: `linear-gradient(135deg, ${BRAND_COLORS.secondary.dark} 0%, ${BRAND_COLORS.secondary.main} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.xl,
  },
});

// Large tertiary button
export const LargeTertiaryButton = styled(LargePrimaryButton)({
  background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.main} 0%, ${BRAND_COLORS.tertiary.dark} 100%)`,
  '&:hover': {
    background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.dark} 0%, ${BRAND_COLORS.tertiary.main} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.xl,
  },
});

// Standard submit button
export const SubmitButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS.xl,
  padding: theme.spacing(1.5, 4),
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: SHADOWS.md,
  border: 'none',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.lg,
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    transform: 'none',
    boxShadow: 'none',
  },
}));

// Cancel/Close button
export const CancelButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: BRAND_COLORS.primary.main,
  borderRadius: BORDER_RADIUS.lg,
  padding: theme.spacing(1.5, 3),
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  border: `1px solid ${BRAND_COLORS.primary.main}`,
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    backgroundColor: `${BRAND_COLORS.primary.main}08`,
    borderColor: BRAND_COLORS.primary.dark,
    transform: 'translateY(-1px)',
  },
}));

// Danger/Delete button
export const DangerButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS.xl,
  padding: theme.spacing(1.5, 4),
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: SHADOWS.md,
  border: 'none',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    background: `linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.lg,
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    transform: 'none',
    boxShadow: 'none',
  },
}));

// Success button
export const SuccessButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, #16a34a 0%, #15803d 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS.xl,
  padding: theme.spacing(1.5, 4),
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: SHADOWS.md,
  border: 'none',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    background: `linear-gradient(135deg, #15803d 0%, #16a34a 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.lg,
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    transform: 'none',
    boxShadow: 'none',
  },
}));

// Warning button
export const WarningButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, #ea580c 0%, #c2410c 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS.xl,
  padding: theme.spacing(1.5, 4),
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: SHADOWS.md,
  border: 'none',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    background: `linear-gradient(135deg, #c2410c 0%, #ea580c 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: SHADOWS.lg,
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    transform: 'none',
    boxShadow: 'none',
  },
}));

// Floating Action Button style
export const FloatingButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  borderRadius: '50%',
  minWidth: '56px',
  width: '56px',
  height: '56px',
  padding: 0,
  boxShadow: SHADOWS.lg,
  border: 'none',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
    transform: 'scale(1.1)',
    boxShadow: SHADOWS.xl,
  },
}));

// Icon button with brand styling
export const BrandIconButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: BRAND_COLORS.primary.main,
  borderRadius: BORDER_RADIUS.lg,
  minWidth: '48px',
  width: '48px',
  height: '48px',
  padding: 0,
  border: `1px solid ${BRAND_COLORS.primary.main}30`,
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    backgroundColor: `${BRAND_COLORS.primary.main}08`,
    borderColor: BRAND_COLORS.primary.main,
    transform: 'scale(1.05)',
  },
}));

// Compact button for limited spaces
export const CompactButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  color: 'white',
  borderRadius: BORDER_RADIUS.md,
  padding: theme.spacing(1, 2),
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  minHeight: '36px',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    transform: 'none',
  },
}));

// Outline button variants
export const OutlinePrimaryButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: BRAND_COLORS.primary.main,
  borderRadius: BORDER_RADIUS.lg,
  padding: theme.spacing(1.5, 3),
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'none',
  border: `2px solid ${BRAND_COLORS.primary.main}`,
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    backgroundColor: BRAND_COLORS.primary.main,
    color: 'white',
    transform: 'translateY(-1px)',
    boxShadow: SHADOWS.md,
  },
}));

export const OutlineSecondaryButton = styled(OutlinePrimaryButton)({
  color: BRAND_COLORS.secondary.main,
  borderColor: BRAND_COLORS.secondary.main,
  
  '&:hover': {
    backgroundColor: BRAND_COLORS.secondary.main,
    color: 'white',
    transform: 'translateY(-1px)',
    boxShadow: SHADOWS.md,
  },
});

// Ghost button (minimal styling)
export const GhostButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: BRAND_COLORS.primary.main,
  borderRadius: BORDER_RADIUS.lg,
  padding: theme.spacing(1.5, 3),
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'none',
  border: 'none',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
  
  '&:hover': {
    backgroundColor: `${BRAND_COLORS.primary.main}08`,
    transform: 'translateY(-1px)',
  },
}));