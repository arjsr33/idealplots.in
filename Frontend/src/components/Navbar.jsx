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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  Sell as SellIcon,
  Login as LoginIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import {
  BRAND_COLORS,
  SHADOWS,
  BORDER_RADIUS,
  TRANSITIONS,
  Z_INDEX,
  rgba,
} from '../theme/constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogoClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Navigation items
  const navItems = [
    { label: 'Submit Enquiry', icon: <PhoneIcon />, onClick: () => console.log('Submit Enquiry') },
    { label: 'Sell Property', icon: <SellIcon />, onClick: () => console.log('Sell Property') },
    { label: 'Login', icon: <LoginIcon />, onClick: () => console.log('Login'), primary: true },
  ];

  // Mobile drawer
  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} mb={2}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: BRAND_COLORS.tertiary.dark,
            background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.dark} 0%, ${BRAND_COLORS.tertiary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
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
              <Box sx={{ mr: 2, color: BRAND_COLORS.tertiary.main }}>{item.icon}</Box>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{ 
                  fontWeight: item.primary ? 600 : 400,
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
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: scrolled 
            ? `linear-gradient(135deg, ${rgba(BRAND_COLORS.tertiary.main, 0.95)} 0%, ${rgba(BRAND_COLORS.tertiary.dark, 0.95)} 100%)` 
            : `linear-gradient(135deg, ${rgba(BRAND_COLORS.tertiary.main, 0.4)} 0%, ${rgba(BRAND_COLORS.tertiary.dark, 0.4)} 100%)`,
          backdropFilter: 'blur(20px)',
          boxShadow: scrolled ? SHADOWS.lg : 'none',
          transition: `all ${TRANSITIONS.duration.slow} ${TRANSITIONS.easing.default}`,
          color: scrolled ? '#1a1a1a' : 'white',
          borderBottom: scrolled ? `1px solid ${rgba(BRAND_COLORS.tertiary.main, 0.2)}` : 'none',
          zIndex: Z_INDEX.navbar,
          width: '100%',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 'none',
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: { xs: '60px !important', sm: '68px !important' },
        }}>
          {/* Logo */}
          <Box 
            display="flex" 
            alignItems="center" 
            onClick={handleLogoClick}
            sx={{ 
              cursor: 'pointer',
              transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
              '&:hover': { transform: 'scale(1.02)' }
            }}
          >
            {!logoError ? (
              <Box
                component="img"
                src="/Idealplotslogo.jpg"
                alt="Ideal Plots Logo"
                onError={() => setLogoError(true)}
                sx={{
                  width: { xs: 40, sm: 44, md: 48 },
                  height: { xs: 40, sm: 44, md: 48 },
                  mr: { xs: 1, sm: 1.2, md: 1.5 },
                  borderRadius: 0,
                  border: `2px solid ${rgba(BRAND_COLORS.primary.main, 0.3)}`,
                  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
                  objectFit: 'cover',
                  boxShadow: `0 4px 16px ${rgba(BRAND_COLORS.primary.main, 0.25)}`,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: { xs: 40, sm: 44, md: 48 },
                  height: { xs: 40, sm: 44, md: 48 },
                  mr: { xs: 1, sm: 1.2, md: 1.5 },
                  background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 0,
                  border: `2px solid ${rgba(BRAND_COLORS.primary.main, 0.3)}`,
                  color: 'white',
                  boxShadow: `0 4px 16px ${rgba(BRAND_COLORS.primary.main, 0.3)}`,
                }}
              >
                <HomeIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' } }} />
              </Box>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: BRAND_COLORS.primary.main,
                display: { xs: 'none', sm: 'block' },
                fontSize: { sm: '0.85rem', md: '0.95rem', lg: '1.1rem' },
                background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.dark} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              IDEALPLOTS.IN
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={1}>
              {navItems.slice(0, -1).map((item) => (
                <Button
                  key={item.label}
                  variant="outlined"
                  startIcon={item.icon}
                  onClick={item.onClick}
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
                    color: '#1a1a1a',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: BORDER_RADIUS.lg,
                    transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
                    textTransform: 'none',
                    fontWeight: 500,
                    mx: 0.3,
                    px: 2,
                    py: 1,
                    minWidth: { md: '100px', lg: '110px' },
                    fontSize: { md: '0.85rem', lg: '0.9rem' },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #f8f8f8 0%, #eeeeee 50%, #e0e0e0 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: SHADOWS.md,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                startIcon={navItems[navItems.length - 1].icon}
                onClick={navItems[navItems.length - 1].onClick}
                sx={{
                  background: `linear-gradient(135deg, ${BRAND_COLORS.tertiary.dark} 0%, ${BRAND_COLORS.tertiary.main} 50%, ${BRAND_COLORS.tertiary.light} 100%)`,
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: BORDER_RADIUS.xl,
                  transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.easing.default}`,
                  textTransform: 'none',
                  mx: 0.5,
                  px: { md: 2.5, lg: 3.5 },
                  py: { md: 1.2, lg: 1.5 },
                  minWidth: { md: '90px', lg: '110px' },
                  fontSize: { md: '0.9rem', lg: '1rem' },
                  boxShadow: `0 4px 16px ${rgba(BRAND_COLORS.tertiary.main, 0.4)}`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${rgba(BRAND_COLORS.tertiary.dark, 0.9)} 0%, ${BRAND_COLORS.tertiary.dark} 50%, ${BRAND_COLORS.tertiary.main} 100%)`,
                    transform: 'translateY(-3px)',
                    boxShadow: `0 8px 30px ${rgba(BRAND_COLORS.tertiary.main, 0.5)}`,
                  },
                }}
              >
                {navItems[navItems.length - 1].label}
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                color: '#2c1810',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                p: { xs: 1, sm: 1.5 },
                '&:hover': { 
                  backgroundColor: rgba(BRAND_COLORS.primary.main, 0.15),
                  transform: 'scale(1.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: 250,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer */}
      <Toolbar sx={{ minHeight: { xs: '60px', sm: '68px' } }} />
    </>
  );
};

export default Navbar;