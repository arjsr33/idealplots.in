// src/components/EnquiryFormOverlay.jsx - Clean Version Using Reusable Styles
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Slide,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

// Import reusable styled components
import {
  LargeDialog,
  ResponsiveDialogTitle,
  ResponsiveDialogContent,
  ResponsiveFormContainer,
  LargeTextField,
} from './styles/ModalStyles';
import {
  LargePrimaryButton,
} from './styles/ButtonStyles';
import {
  ContactInfoBox,
  SuccessBox,
  TicketNumberBox,
} from './styles/LayoutStyles';

import { BRAND_COLORS, BORDER_RADIUS } from '../theme/constants';
import { useEnquiryForm } from '../hooks/useEnquiryForm';

// Generate ticket number
const generateTicketNumber = () => {
  const prefix = 'ENQ';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Slide transition
const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Local storage key
const FORM_DATA_KEY = 'enquiry_form_data';

const EnquiryFormOverlay = ({ open, onClose }) => {
  const { contextData } = useEnquiryForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  // Function to get initial requirements based on context
  const getInitialRequirements = () => {
    if (contextData?.propertyTitle) {
      return `I am interested in ${contextData.propertyTitle} priced at ${contextData.propertyPrice}. Please provide more details.`;
    }
    if (contextData?.propertyId) {
      return `I would like more information about property ID: ${contextData.propertyId}`;
    }
    return '';
  };

  // Load saved form data
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(FORM_DATA_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } else if (contextData) {
        setFormData(prev => ({
          ...prev,
          requirements: getInitialRequirements()
        }));
      }
    } catch (error) {
      localStorage.removeItem(FORM_DATA_KEY);
    }
  }, [contextData]);

  // Save form data
  useEffect(() => {
    if (formData.name || formData.email || formData.phone || formData.requirements) {
      try {
        localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    }
  }, [formData]);

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errors.phone = 'Invalid phone number';
    if (!formData.requirements.trim()) errors.requirements = 'Requirements are required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const ticket = generateTicketNumber();
      setTicketNumber(ticket);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const enquiryData = {
        ...formData,
        ticketNumber: ticket,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
        context: contextData,
      };
      
      console.log('Enquiry submitted:', enquiryData);
      localStorage.removeItem(FORM_DATA_KEY);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        handleClose();
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close
  const handleClose = () => {
    if (submitSuccess) {
      setFormData({ name: '', email: '', phone: '', requirements: '' });
      setSubmitSuccess(false);
      setFormErrors({});
    }
    onClose();
  };

  // Dynamic title based on context
  const getFormTitle = () => {
    if (contextData?.propertyTitle) {
      return `Enquiry for ${contextData.propertyTitle}`;
    }
    return 'Submit Your Enquiry';
  };

  return (
    <LargeDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      maxWidth={false}
      fullWidth={false}
    >
      <ResponsiveDialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <PhoneIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
            <Box>
              <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">
                {getFormTitle()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5, opacity: 0.9 }}>
                Tell us about your property requirements
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose} 
            sx={{ 
              color: 'white',
              p: 1.5,
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
          </IconButton>
        </Box>
      </ResponsiveDialogTitle>
      
      <ResponsiveDialogContent>
        {!submitSuccess ? (
          <ResponsiveFormContainer component="form" onSubmit={handleSubmit}>
            {/* Context info */}
            {contextData && (
              <Alert severity="info" sx={{ mb: 4, borderRadius: BORDER_RADIUS.lg, fontSize: '1rem' }}>
                <Typography variant="body1">
                  {contextData.propertyTitle && `Property: ${contextData.propertyTitle}`}
                  {contextData.source && ` • Source: ${contextData.source}`}
                </Typography>
              </Alert>
            )}
            <br/>
            <Box className="form-grid">
              {/* Left Column */}
              <Box className="left-column">
                <LargeTextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  disabled={isSubmitting}
                  placeholder="Enter your full name"
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 2, color: 'action.active', fontSize: 24 }} />
                  }}
                />
                
                <LargeTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 2, color: 'action.active', fontSize: 24 }} />
                  }}
                />
                
                <LargeTextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone || "We'll call you back within 24 hours"}
                  disabled={isSubmitting}
                  placeholder="9876543210"
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ mr: 2, color: 'action.active', fontSize: 24 }} />
                  }}
                />

                {/* Contact info box - desktop only */}
                {!isMobile && (
                  <ContactInfoBox>
                    <Typography variant="h6" color="primary" fontWeight="600" gutterBottom>
                      📞 Need Immediate Assistance?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Call us directly: <strong>+91 98765 43210</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available 24/7 for your property needs
                    </Typography>
                  </ContactInfoBox>
                )}
              </Box>
              
              {/* Right Column */}
              <Box className="right-column">
                <LargeTextField
                  fullWidth
                  label="Your Requirements"
                  multiline
                  rows={isMobile ? 4 : 8}
                  value={formData.requirements}
                  onChange={handleInputChange('requirements')}
                  error={!!formErrors.requirements}
                  helperText={formErrors.requirements}
                  disabled={isSubmitting}
                  placeholder="Please describe your property requirements, budget, preferred location, timeline, etc."
                  InputProps={{
                    startAdornment: <DescriptionIcon sx={{ mr: 2, color: 'action.active', alignSelf: 'flex-start', mt: 1, fontSize: 24 }} />
                  }}
                />

                {/* Contact info box - mobile only */}
                {isMobile && (
                  <ContactInfoBox>
                    <Typography variant="body2" color="primary" fontWeight="600" gutterBottom>
                      📞 Need Immediate Assistance?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Call us: <strong>+91 98765 43210</strong> (24/7)
                    </Typography>
                  </ContactInfoBox>
                )}
                
                <Box sx={{ mt: 'auto', pt: 2 }}>
                  <LargePrimaryButton
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </LargePrimaryButton>
                </Box>
              </Box>
            </Box>
          </ResponsiveFormContainer>
        ) : (
          <SuccessBox>
            <CheckCircleIcon 
              sx={{ 
                fontSize: { xs: 80, md: 120 }, 
                color: BRAND_COLORS.primary.main, 
                mb: 3,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' }
                }
              }} 
            />
            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="600" gutterBottom color="text.primary">
              Enquiry Submitted Successfully!
            </Typography>
            <Typography variant={isMobile ? "body1" : "h6"} color="text.secondary" paragraph sx={{ mb: 4 }}>
              Thank you for your enquiry. We'll get back to you within 24 hours.
            </Typography>
            
            <TicketNumberBox sx={{ minWidth: { xs: '100%', md: '400px' } }}>
              <Typography variant={isMobile ? "h6" : "h5"} color="primary" fontWeight="600" gutterBottom>
                Your Ticket Number
              </Typography>
              <Typography 
                variant={isMobile ? "h5" : "h3"} 
                fontWeight="700" 
                color="primary" 
                sx={{ 
                  fontFamily: 'monospace',
                  letterSpacing: 1,
                  wordBreak: 'break-all',
                  mb: 2
                }}
              >
                {ticketNumber}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please save this number for tracking your request
              </Typography>
            </TicketNumberBox>
            
            <Alert severity="success" sx={{ borderRadius: BORDER_RADIUS.lg, textAlign: 'left', maxWidth: '500px' }}>
              <Typography variant="body1" gutterBottom>
                📧 <strong>Confirmation email sent</strong> to {formData.email}
              </Typography>
              <Typography variant="body1">
                📞 <strong>Emergency contact:</strong> +91 98765 43210
              </Typography>
            </Alert>
          </SuccessBox>
        )}
      </ResponsiveDialogContent>
    </LargeDialog>
  );
};

export default EnquiryFormOverlay;