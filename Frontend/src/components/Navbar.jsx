import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  Sell as SellIcon,
  Login as LoginIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// NEW: Import from centralized theme constants
import {
  BRAND_COLORS,
  SHADOWS,
  BORDER_RADIUS,
  TRANSITIONS,
  Z_INDEX,
  rgba,
} from '../theme/constants';

// Styled components with metallic golden theme - UPDATED
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled 
    // BEFORE: Hard-coded RGBA values
    // ? 'linear-gradient(135deg, rgba(218, 165, 32, 0.95) 0%, rgba(184, 134, 11, 0.95) 50%, rgba(146, 107, 20, 0.95) 100%)' 
    // : 'linear-gradient(135deg, rgba(218, 165, 32, 0.4) 0%, rgba(184, 134, 11, 0.3) 50%, rgba(146, 107, 20, 0.4) 100%)',
    // NEW: Use centralized colors with rgba utility
    ? `linear-gradient(135deg, ${rgba(BRAND_COLORS.tertiary.main, 0.95)} 0%, ${rgba(BRAND_COLORS.tertiary.dark, 0.95)} 50%, ${rgba(BRAND_COLORS.tertiary.dark, 0.95)} 100%)` 
    : `linear-gradient(135deg, ${rgba(BRAND_COLORS.tertiary.main, 0.4)} 0%, ${rgba(BRAND_COLORS.tertiary.dark, 0.3)} 50%, ${rgba(BRAND_COLORS.tertiary.dark, 0.4)} 100%)`,
  backdropFilter: 'blur(20px)',
  boxShadow: scrolled 
    // BEFORE: ? '0 8px 32px rgba(184, 134, 11, 0.25)' 
    ? SHADOWS.lg // NEW: Use centralized shadow
    : 'none',
  // BEFORE: transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: `all ${TRANSITIONS.duration.slow} ${TRANSITIONS.easing.default}`, // NEW: Use centralized transition
  color: scrolled ? '#1a1a1a' : 'white',
  borderBottom: scrolled ? `1px solid ${rgba(BRAND_COLORS.tertiary.main, 0.2)}` : 'none', // NEW: Use rgba utility
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  // BEFORE: zIndex: 1100,
  zIndex: Z_INDEX.navbar, // NEW: Use centralized z-index
  
  // Add subtle metallic texture
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: scrolled 
      ? `
        radial-gradient(circle at 25% 25%, ${rgba(BRAND_COLORS.tertiary.light, 0.1)} 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, ${rgba(BRAND_COLORS.tertiary.light, 0.08)} 0%, transparent 50%),
        linear-gradient(45deg, ${rgba(BRAND_COLORS.tertiary.main, 0.05)} 0%, ${rgba(BRAND_COLORS.tertiary.dark, 0.03)} 100%)
      ` // NEW: Use centralized colors with rgba
      : 'none',
    pointerEvents: 'none',
    zIndex: 1,
  },
  
  // Content should be above the texture
  '& .MuiToolbar-root': {
    position: 'relative',
    zIndex: 2,
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  cursor: 'pointer',
  // BEFORE: transition: 'all 0.3s ease',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`, // NEW: Use centralized transition
  height: 48,
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginRight: theme.spacing(1.5),
  borderRadius: 0,
  // BEFORE: border: '2px solid rgba(46, 91, 186, 0.3)',
  border: `2px solid ${rgba(BRAND_COLORS.primary.main, 0.3)}`, // NEW: Use centralized color with rgba
  // BEFORE: transition: 'all 0.3s ease',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`, // NEW: Use centralized transition
  objectFit: 'cover',
  // BEFORE: boxShadow: '0 4px 16px rgba(46, 91, 186, 0.25)',
  boxShadow: `0 4px 16px ${rgba(BRAND_COLORS.primary.main, 0.25)}`, // NEW: Use centralized color with rgba
}));

// Updated NavButton with metallic white background and black text - UPDATED
const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.3),
  padding: theme.spacing(1, 2),
  background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
  color: '#1a1a1a',
  borderColor: 'rgba(255, 255, 255, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  fontWeight: 500,
  fontSize: '0.85rem',
  letterSpacing: '0.3px',
  // BEFORE: borderRadius: 8,
  borderRadius: BORDER_RADIUS.lg, // NEW: Use centralized border radius
  textTransform: 'none',
  minWidth: '100px',
  minHeight: '36px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  // BEFORE: transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`, // NEW: Use centralized transition
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  '&:hover': {
    background: 'linear-gradient(135deg, #f8f8f8 0%, #eeeeee 50%, #e0e0e0 100%)',
    color: '#000000',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const PrimaryNavButton = styled(Button)(({ theme, scrolled }) => ({
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1.5, 3.5),
  // BEFORE: background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #CD853F 100%)',
  background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.dark} 0%, ${BRAND_COLORS.tertiary.main} 50%, ${BRAND_COLORS.tertiary.light} 100%)`, // NEW: Use centralized colors
  color: 'white',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.5px',
  // BEFORE: borderRadius: 12,
  borderRadius: BORDER_RADIUS.xl, // NEW: Use centralized border radius
  textTransform: 'none',
  minWidth: '110px',
  minHeight: '48px',
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  // BEFORE: boxShadow: '0 4px 16px rgba(218, 165, 32, 0.4)',
  boxShadow: `0 4px 16px ${rgba(BRAND_COLORS.tertiary.main, 0.4)}`, // NEW: Use centralized color with rgba
  // BEFORE: transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`, // NEW: Use centralized transition
  '&:hover': {
    // BEFORE: background: 'linear-gradient(135deg, #996F00 0%, #B8860B 50%, #DAA520 100%)',
    background: `linear-gradient(135deg, ${rgba(BRAND_COLORS.tertiary.dark, 0.9)} 0%, ${BRAND_COLORS.tertiary.dark} 50%, ${BRAND_COLORS.tertiary.main} 100%)`, // NEW: Use centralized colors
    transform: 'translateY(-3px)',
    // BEFORE: boxShadow: '0 8px 30px rgba(218, 165, 32, 0.5)',
    boxShadow: `0 8px 30px ${rgba(BRAND_COLORS.tertiary.main, 0.5)}`, // NEW: Use centralized color with rgba
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const MobileMenuButton = styled(IconButton)(() => ({
  color: '#2c1810',
  padding: 12,
  '&:hover': {
    // BEFORE: backgroundColor: 'rgba(46, 91, 186, 0.15)',
    backgroundColor: rgba(BRAND_COLORS.primary.main, 0.15), // NEW: Use centralized color with rgba
  },
}));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitEnquiry = () => {
    console.log('Submit Enquiry clicked');
  };

  const handleSellProperty = () => {
    console.log('Sell Property clicked');
  };

  const handleLogin = () => {
    console.log('Login clicked');
  };

  // Navigation items
  const navItems = [
    {
      label: 'Submit Enquiry',
      icon: <PhoneIcon />,
      onClick: handleSubmitEnquiry,
      variant: 'outlined'
    },
    {
      label: 'Sell Property',
      icon: <SellIcon />,
      onClick: handleSellProperty,
      variant: 'outlined'
    },
    {
      label: 'Login',
      icon: <LoginIcon />,
      onClick: handleLogin,
      variant: 'contained'
    }
  ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} mb={2}>
        <Typography variant="h6" component="div" sx={{ 
          // BEFORE: color: '#B8860B',
          color: BRAND_COLORS.tertiary.dark, // NEW: Use centralized color
          fontWeight: 600,
          // BEFORE: background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)',
          background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.dark} 0%, ${BRAND_COLORS.tertiary.main} 100%)`, // NEW: Use centralized colors
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} onClick={item.onClick} sx={{ cursor: 'pointer' }}>
            <Box display="flex" alignItems="center" width="100%">
              <Box sx={{ 
                mr: 2, 
                // BEFORE: color: '#DAA520' 
                color: BRAND_COLORS.tertiary.main // NEW: Use centralized color
              }}>
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: item.variant === 'contained' ? 600 : 400,
                  color: '#2c1810'
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" scrolled={scrolled} elevation={0}>
        <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 3 } }}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1.5, minHeight: '68px !important' }}>
            {/* Logo Section */}
            <Logo onClick={handleLogoClick}>
              {!logoError ? (
                <LogoImage 
                  src="/Idealplotslogo.jpg" 
                  alt="Ideal Plots Logo"
                  onError={handleLogoError}
                />
              ) : (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    mr: 1.5,
                    // BEFORE: background: 'linear-gradient(135deg, #2E5BBA 0%, #1E3F8A 100%)',
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`, // NEW: Use centralized colors
                    borderRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // BEFORE: border: '2px solid rgba(46, 91, 186, 0.3)',
                    border: `2px solid ${rgba(BRAND_COLORS.primary.main, 0.3)}`, // NEW: Use centralized color with rgba
                    color: 'white',
                    // BEFORE: boxShadow: '0 4px 16px rgba(46, 91, 186, 0.3)',
                    boxShadow: `0 4px 16px ${rgba(BRAND_COLORS.primary.main, 0.3)}`, // NEW: Use centralized color with rgba
                  }}
                >
                  <HomeIcon sx={{ fontSize: '1.5rem' }} />
                </Box>
              )}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start',
                height: 48,
                paddingTop: 0.5 
              }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    // BEFORE: color: '#2E5BBA',
                    color: BRAND_COLORS.primary.main, // NEW: Use centralized color
                    display: { xs: 'none', sm: 'block' },
                    textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
                    letterSpacing: '0.8px',
                    fontSize: { sm: '0.95rem', md: '1.1rem' },
                    // BEFORE: background: 'linear-gradient(135deg, #2E5BBA 0%, #1E3F8A 100%)',
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`, // NEW: Use centralized colors
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    marginBottom: 0,
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  }}
                >
                  IDEALPLOTS.IN
                </Typography>
              </Box>
            </Logo>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box display="flex" alignItems="center" gap={1}>
                {navItems.slice(0, -1).map((item) => (
                  <NavButton
                    key={item.label}
                    variant={item.variant}
                    startIcon={item.icon}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </NavButton>
                ))}
                <PrimaryNavButton
                  variant="contained"
                  startIcon={navItems[navItems.length - 1].icon}
                  onClick={navItems[navItems.length - 1].onClick}
                >
                  {navItems[navItems.length - 1].label}
                </PrimaryNavButton>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <MobileMenuButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </MobileMenuButton>
            )}
          </Toolbar>
        </Box>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: 'background.paper'
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer to prevent content from going under fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;