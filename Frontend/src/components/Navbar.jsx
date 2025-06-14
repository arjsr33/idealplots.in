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

// Styled components with metallic golden theme
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled 
    ? 'linear-gradient(135deg, rgba(218, 165, 32, 0.95) 0%, rgba(184, 134, 11, 0.95) 50%, rgba(146, 107, 20, 0.95) 100%)' 
    : 'linear-gradient(135deg, rgba(218, 165, 32, 0.4) 0%, rgba(184, 134, 11, 0.3) 50%, rgba(146, 107, 20, 0.4) 100%)',
  backdropFilter: 'blur(20px)',
  boxShadow: scrolled 
    ? '0 8px 32px rgba(184, 134, 11, 0.25)' 
    : 'none',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  color: scrolled ? '#1a1a1a' : 'white',
  borderBottom: scrolled ? '1px solid rgba(218, 165, 32, 0.2)' : 'none',
  position: 'fixed', // Ensure it's always fixed
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100, // High z-index to stay above other content
  
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
        radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 223, 87, 0.08) 0%, transparent 50%),
        linear-gradient(45deg, rgba(218, 165, 32, 0.05) 0%, rgba(184, 134, 11, 0.03) 100%)
      `
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
  transition: 'all 0.3s ease',
  height: 48, // Reduced from 80 to 48
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: 48, // Reduced from 80 to 48 (40% smaller)
  height: 48, // Reduced from 80 to 48 (40% smaller)
  marginRight: theme.spacing(1.5), // Reduced margin proportionally
  borderRadius: 0, // Sharp corners
  border: '2px solid rgba(46, 91, 186, 0.3)',
  transition: 'all 0.3s ease',
  objectFit: 'cover',
  boxShadow: '0 4px 16px rgba(46, 91, 186, 0.25)',
}));

// Updated NavButton with metallic white background and black text
const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.3), // Reduced margin
  padding: theme.spacing(1, 2), // Reduced padding from (1.5, 3) to (1, 2)
  background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)', // Metallic white gradient
  color: '#1a1a1a', // Black text
  borderColor: 'rgba(255, 255, 255, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  fontWeight: 500, // Reduced from 600 for elegance
  fontSize: '0.85rem', // Reduced from 1rem
  letterSpacing: '0.3px', // Reduced letter spacing
  borderRadius: 8, // Reduced border radius
  textTransform: 'none',
  minWidth: '100px', // Reduced from 130px
  minHeight: '36px', // Reduced from 48px
  position: 'relative',
  overflow: 'hidden',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Classy modern font
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)', // Metallic shadow
  '&:hover': {
    background: 'linear-gradient(135deg, #f8f8f8 0%, #eeeeee 50%, #e0e0e0 100%)', // Slightly darker on hover
    color: '#000000',
    transform: 'translateY(-1px)', // Reduced lift effect
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)', // Enhanced metallic shadow
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)', // White shimmer effect
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const PrimaryNavButton = styled(Button)(({ theme, scrolled }) => ({
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1.5, 3.5),
  background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #CD853F 100%)',
  color: 'white',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.5px',
  borderRadius: 12,
  textTransform: 'none',
  minWidth: '110px',
  minHeight: '48px',
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  boxShadow: '0 4px 16px rgba(218, 165, 32, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #996F00 0%, #B8860B 50%, #DAA520 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 30px rgba(218, 165, 32, 0.5)',
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
  color: '#2c1810', // Consistent dark brown color
  padding: 12,
  '&:hover': {
    backgroundColor: 'rgba(46, 91, 186, 0.15)', // Consistent blue hover
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
    // Navigate to enquiry form or open modal
    console.log('Submit Enquiry clicked');
    // In future: navigate('/enquiry') or open enquiry modal
  };

  const handleSellProperty = () => {
    // Navigate to sell property page
    console.log('Sell Property clicked');
    // In future: navigate('/sell-property')
  };

  const handleLogin = () => {
    // Navigate to login page
    console.log('Login clicked');
    // In future: navigate('/login') or open login modal
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
          color: '#B8860B',
          fontWeight: 600,
          background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)',
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
              <Box sx={{ mr: 2, color: '#DAA520' }}>
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
          <Toolbar sx={{ justifyContent: 'space-between', py: 1.5, minHeight: '68px !important' }}> {/* Reduced from py: 2.5 and minHeight: 112px */}
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
                    width: 48, // Reduced from 80 to 48
                    height: 48, // Reduced from 80 to 48
                    mr: 1.5, // Reduced margin
                    background: 'linear-gradient(135deg, #2E5BBA 0%, #1E3F8A 100%)',
                    borderRadius: 0, // Sharp corners
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(46, 91, 186, 0.3)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(46, 91, 186, 0.3)',
                  }}
                >
                  <HomeIcon sx={{ fontSize: '1.5rem' }} /> {/* Reduced icon size */}
                </Box>
              )}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start',
                height: 48, // Reduced from 80 to 48
                paddingTop: 0.5 // Reduced padding
              }}>
                <Typography
                  variant="h6" // Reduced from h5
                  component="div"
                  sx={{
                    fontWeight: 700, // Reduced from 800
                    color: '#2E5BBA',
                    display: { xs: 'none', sm: 'block' },
                    textShadow: '1px 1px 2px rgba(0,0,0,0.15)', // Reduced shadow
                    letterSpacing: '0.8px', // Reduced from 1px
                    fontSize: { sm: '0.95rem', md: '1.1rem' }, // Reduced font sizes
                    background: 'linear-gradient(135deg, #2E5BBA 0%, #1E3F8A 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    marginBottom: 0,
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Classy modern font
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
          keepMounted: true, // Better open performance on mobile
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