// theme/constants.js - Centralized Design System Constants

/**
 * Brand Colors - Primary color palette from logo
 */
export const BRAND_COLORS = {
  primary: {
    main: '#2E5BBA',
    light: '#5A7BC8',
    dark: '#1E3F8A',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#FF6B35',
    light: '#FF8A5B',
    dark: '#E55A2B',
    contrastText: '#ffffff',
  },
  tertiary: {
    main: '#DAA520',
    light: '#F4D03F',
    dark: '#B8860B',
    contrastText: '#ffffff',
  },
};

/**
 * Semantic Colors - Contextual color meanings
 */
export const SEMANTIC_COLORS = {
  success: {
    main: '#4CAF50',
    light: '#66BB6A',
    dark: '#2E7D32',
  },
  warning: {
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#F57C00',
  },
  error: {
    main: '#F44336',
    light: '#EF5350',
    dark: '#C62828',
  },
  info: {
    main: '#2196F3',
    light: '#42A5F5',
    dark: '#1565C0',
  },
};

/**
 * Neutral Colors - Grays and text colors
 */
export const NEUTRAL_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#F8F9FA',
    100: '#F1F3F4',
    200: '#E8EAED',
    300: '#DADCE0',
    400: '#BDC1C6',
    500: '#9AA0A6',
    600: '#80868B',
    700: '#5F6368',
    800: '#3C4043',
    900: '#202124',
  },
  black: '#000000',
  text: {
    primary: '#2D3748',
    secondary: '#4A5568',
    disabled: '#A0AEC0',
    hint: '#718096',
  },
};

/**
 * Background Colors
 */
export const BACKGROUND_COLORS = {
  default: '#F8F9FA',
  paper: '#FFFFFF',
  surface: '#F5F5F5',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

/**
 * Typography System
 */
export const TYPOGRAPHY = {
  fontFamily: {
    primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    secondary: '"Poppins", "Inter", "Roboto", sans-serif',
    mono: '"Fira Code", "Monaco", "Consolas", monospace',
  },
  fontSizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    md: '1rem',      // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/**
 * Spacing System (based on 8px grid)
 */
export const SPACING = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
  '5xl': '8rem',  // 128px
};

/**
 * Border Radius System
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

/**
 * Shadow System
 */
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  premium: '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
};

/**
 * Animation & Transitions
 */
export const TRANSITIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

/**
 * Z-Index System
 */
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  navbar: 1100,
  maximum: 9999,
};

/**
 * Component-specific constants
 */
export const COMPONENT_CONSTANTS = {
  navbar: {
    height: '64px',
    heightMobile: '56px',
  },
  sidebar: {
    width: '240px',
    widthCollapsed: '60px',
  },
  footer: {
    height: '60px',
  },
};

/**
 * Gradient Presets
 */
export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
  secondary: `linear-gradient(135deg, ${BRAND_COLORS.secondary.main} 0%, ${BRAND_COLORS.secondary.dark} 100%)`,
  tertiary: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.main} 0%, ${BRAND_COLORS.tertiary.dark} 100%)`,
  success: `linear-gradient(135deg, ${SEMANTIC_COLORS.success.main} 0%, ${SEMANTIC_COLORS.success.dark} 100%)`,
  glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  dark: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 50%, #0F0F0F 100%)',
};

/**
 * Utility function to create rgba colors
 */
export const rgba = (color, alpha) => {
  // Remove # if present
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Utility function to get theme color variations
 */
export const getColorVariations = (baseColor) => ({
  main: baseColor,
  light: adjustBrightness(baseColor, 20),
  dark: adjustBrightness(baseColor, -20),
  rgba: (alpha) => rgba(baseColor, alpha),
});

/**
 * Utility function to adjust color brightness
 */
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}