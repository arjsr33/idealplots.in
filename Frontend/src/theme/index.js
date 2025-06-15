// theme/index.js - Improved Material-UI Theme Configuration

import { createTheme } from '@mui/material/styles';
import {
  BRAND_COLORS,
  SEMANTIC_COLORS,
  NEUTRAL_COLORS,
  BACKGROUND_COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TRANSITIONS,
  BREAKPOINTS,
  Z_INDEX,
} from './constants';

/**
 * Create the main application theme
 */
export const createAppTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      // Brand colors
      primary: {
        ...BRAND_COLORS.primary,
        contrastText: '#ffffff',
      },
      secondary: {
        ...BRAND_COLORS.secondary,
        contrastText: '#ffffff',
      },
      tertiary: {
        ...BRAND_COLORS.tertiary,
        contrastText: '#ffffff',
      },
      
      // Semantic colors
      success: SEMANTIC_COLORS.success,
      warning: SEMANTIC_COLORS.warning,
      error: SEMANTIC_COLORS.error,
      info: SEMANTIC_COLORS.info,
      
      // Background colors
      background: {
        default: isDark ? NEUTRAL_COLORS.gray[900] : BACKGROUND_COLORS.default,
        paper: isDark ? NEUTRAL_COLORS.gray[800] : BACKGROUND_COLORS.paper,
        surface: isDark ? NEUTRAL_COLORS.gray[700] : BACKGROUND_COLORS.surface,
      },
      
      // Text colors
      text: {
        primary: isDark ? NEUTRAL_COLORS.white : NEUTRAL_COLORS.text.primary,
        secondary: isDark ? NEUTRAL_COLORS.gray[300] : NEUTRAL_COLORS.text.secondary,
        disabled: isDark ? NEUTRAL_COLORS.gray[500] : NEUTRAL_COLORS.text.disabled,
      },
      
      // Divider and border colors
      divider: isDark ? NEUTRAL_COLORS.gray[700] : NEUTRAL_COLORS.gray[200],
      
      // Custom colors for specific use cases
      custom: {
        glass: 'rgba(255, 255, 255, 0.1)',
        overlay: BACKGROUND_COLORS.overlay,
        navbar: {
          background: isDark ? NEUTRAL_COLORS.gray[900] : 'rgba(255, 255, 255, 0.95)',
          scrolled: isDark ? NEUTRAL_COLORS.gray[800] : 'rgba(218, 165, 32, 0.95)',
        },
      },
    },

    typography: {
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      
      // Heading styles
      h1: {
        fontSize: TYPOGRAPHY.fontSizes['5xl'],
        fontWeight: TYPOGRAPHY.fontWeights.bold,
        lineHeight: TYPOGRAPHY.lineHeights.tight,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: TYPOGRAPHY.fontSizes['4xl'],
        fontWeight: TYPOGRAPHY.fontWeights.semibold,
        lineHeight: TYPOGRAPHY.lineHeights.tight,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: TYPOGRAPHY.fontSizes['3xl'],
        fontWeight: TYPOGRAPHY.fontWeights.semibold,
        lineHeight: TYPOGRAPHY.lineHeights.normal,
      },
      h4: {
        fontSize: TYPOGRAPHY.fontSizes['2xl'],
        fontWeight: TYPOGRAPHY.fontWeights.medium,
        lineHeight: TYPOGRAPHY.lineHeights.normal,
      },
      h5: {
        fontSize: TYPOGRAPHY.fontSizes.xl,
        fontWeight: TYPOGRAPHY.fontWeights.medium,
        lineHeight: TYPOGRAPHY.lineHeights.normal,
      },
      h6: {
        fontSize: TYPOGRAPHY.fontSizes.lg,
        fontWeight: TYPOGRAPHY.fontWeights.medium,
        lineHeight: TYPOGRAPHY.lineHeights.normal,
      },
      
      // Body text styles
      body1: {
        fontSize: TYPOGRAPHY.fontSizes.md,
        fontWeight: TYPOGRAPHY.fontWeights.normal,
        lineHeight: TYPOGRAPHY.lineHeights.normal,
      },
      body2: {
        fontSize: TYPOGRAPHY.fontSizes.sm,
        fontWeight: TYPOGRAPHY.fontWeights.normal,
        lineHeight: TYPOGRAPHY.lineHeights.normal,
      },
      
      // Button and caption styles
      button: {
        fontSize: TYPOGRAPHY.fontSizes.sm,
        fontWeight: TYPOGRAPHY.fontWeights.medium,
        textTransform: 'none',
        letterSpacing: '0.025em',
      },
      caption: {
        fontSize: TYPOGRAPHY.fontSizes.xs,
        fontWeight: TYPOGRAPHY.fontWeights.normal,
        lineHeight: TYPOGRAPHY.lineHeights.normal,
      },
    },

    spacing: (factor) => `${factor * 8}px`, // 8px base unit

    breakpoints: {
      values: {
        xs: parseInt(BREAKPOINTS.xs),
        sm: parseInt(BREAKPOINTS.sm),
        md: parseInt(BREAKPOINTS.md),
        lg: parseInt(BREAKPOINTS.lg),
        xl: parseInt(BREAKPOINTS.xl),
      },
    },

    shape: {
      borderRadius: parseInt(BORDER_RADIUS.lg),
    },

    shadows: [
      SHADOWS.none,
      SHADOWS.sm,
      SHADOWS.sm,
      SHADOWS.md,
      SHADOWS.md,
      SHADOWS.lg,
      SHADOWS.lg,
      SHADOWS.xl,
      SHADOWS.xl,
      SHADOWS['2xl'],
      SHADOWS['2xl'],
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
      SHADOWS.premium,
    ],

    transitions: {
      duration: {
        shortest: parseInt(TRANSITIONS.duration.fast),
        shorter: parseInt(TRANSITIONS.duration.fast),
        short: parseInt(TRANSITIONS.duration.normal),
        standard: parseInt(TRANSITIONS.duration.normal),
        complex: parseInt(TRANSITIONS.duration.slow),
        enteringScreen: parseInt(TRANSITIONS.duration.normal),
        leavingScreen: parseInt(TRANSITIONS.duration.fast),
      },
      easing: {
        easeInOut: TRANSITIONS.easing.easeInOut,
        easeOut: TRANSITIONS.easing.easeOut,
        easeIn: TRANSITIONS.easing.easeIn,
        sharp: TRANSITIONS.easing.default,
      },
    },

    zIndex: {
      mobileStepper: Z_INDEX.base,
      fab: Z_INDEX.base + 50,
      speedDial: Z_INDEX.base + 50,
      appBar: Z_INDEX.navbar,
      drawer: Z_INDEX.fixed,
      modal: Z_INDEX.modal,
      snackbar: Z_INDEX.popover,
      tooltip: Z_INDEX.tooltip,
    },

    components: {
      // Button component overrides
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: BORDER_RADIUS.lg,
            fontWeight: TYPOGRAPHY.fontWeights.medium,
            fontSize: TYPOGRAPHY.fontSizes.sm,
            padding: `${SPACING.sm} ${SPACING.lg}`,
            transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            boxShadow: SHADOWS.md,
            '&:hover': {
              boxShadow: SHADOWS.lg,
            },
          },
          outlined: {
            borderWidth: '1px',
            '&:hover': {
              borderWidth: '1px',
            },
          },
        },
        variants: [
          // Primary gradient button
          {
            props: { variant: 'gradient', color: 'primary' },
            style: {
              background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
              color: BRAND_COLORS.primary.contrastText,
              '&:hover': {
                background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 100%)`,
              },
            },
          },
          // Secondary gradient button
          {
            props: { variant: 'gradient', color: 'secondary' },
            style: {
              background: `linear-gradient(135deg, ${BRAND_COLORS.secondary.main} 0%, ${BRAND_COLORS.secondary.dark} 100%)`,
              color: BRAND_COLORS.secondary.contrastText,
              '&:hover': {
                background: `linear-gradient(135deg, ${BRAND_COLORS.secondary.dark} 0%, ${BRAND_COLORS.secondary.main} 100%)`,
              },
            },
          },
          // Tertiary gradient button
          {
            props: { variant: 'gradient', color: 'tertiary' },
            style: {
              background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.main} 0%, ${BRAND_COLORS.tertiary.dark} 100%)`,
              color: BRAND_COLORS.tertiary.contrastText,
              '&:hover': {
                background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.dark} 0%, ${BRAND_COLORS.tertiary.main} 100%)`,
              },
            },
          },
        ],
      },

      // Card component overrides
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS['2xl'],
            boxShadow: SHADOWS.md,
            transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: SHADOWS.lg,
            },
          },
        },
      },

      // Paper component overrides
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS['2xl'],
          },
          elevation1: {
            boxShadow: SHADOWS.sm,
          },
          elevation2: {
            boxShadow: SHADOWS.md,
          },
          elevation3: {
            boxShadow: SHADOWS.lg,
          },
        },
      },

      // Chip component overrides
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS.xl,
            fontWeight: TYPOGRAPHY.fontWeights.medium,
            fontSize: TYPOGRAPHY.fontSizes.xs,
          },
        },
      },

      // TextField component overrides
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: BORDER_RADIUS.xl,
              transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: BRAND_COLORS.primary.light,
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: BRAND_COLORS.primary.main,
                  borderWidth: '2px',
                },
              },
            },
          },
        },
      },

      // AppBar component overrides
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(20px)',
            borderBottom: 'none',
          },
        },
      },

      // Drawer component overrides
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
            borderRight: `1px solid ${NEUTRAL_COLORS.gray[200]}`,
          },
        },
      },
    },
  });
};

// Export the default theme instance
export const theme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

// Custom hook for theme switching
export const useAppTheme = (mode = 'light') => {
  return createAppTheme(mode);
};

// Export individual theme sections for direct use
export {
  BRAND_COLORS,
  SEMANTIC_COLORS,
  NEUTRAL_COLORS,
  BACKGROUND_COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TRANSITIONS,
  BREAKPOINTS,
  Z_INDEX,
} from './constants';