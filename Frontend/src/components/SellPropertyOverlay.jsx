// src/components/SellPropertyOverlay.jsx - Complete Property Listing Form
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Slide,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  Home as HomeIcon,
  CloudUpload as UploadIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  PhotoCamera as PhotoIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  AttachMoney as PriceIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

// Import reusable styled components
import {
  LargeDialog,
  ResponsiveDialogTitle,
  ResponsiveDialogContent,
  LargeTextField,
} from './styles/ModalStyles';
import {
  LargePrimaryButton,
  CancelButton,
  SubmitButton,
} from './styles/ButtonStyles';
import {
  SuccessBox,
  TicketNumberBox,
  TwoColumnGrid,
  ThreeColumnGrid,
  InfoBox,
} from './styles/LayoutStyles';

import { BRAND_COLORS, BORDER_RADIUS } from '../theme/constants';

// Property types and data
const propertyTypes = [
  'Residential Plot',
  'Commercial Plot',
  'Agricultural Land',
  'Villa',
  'Apartment',
  'House',
  'Commercial Building',
  'Warehouse',
  'Shop',
  'Office Space'
];

const keralaCities = [
  'Thiruvananthapuram',
  'Kochi',
  'Kozhikode',
  'Thrissur',
  'Kollam',
  'Palakkad',
  'Alappuzha',
  'Kottayam',
  'Kannur',
  'Kasaragod',
  'Malappuram',
  'Pathanamthitta',
  'Idukki',
  'Wayanad'
];

// Generate listing ID
const generateListingId = () => {
  const prefix = 'PROP';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Slide transition
const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Dummy backend functions
const checkUserExists = async (email) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate some users already exist
  const existingEmails = ['test@example.com', 'user@demo.com', 'admin@site.com'];
  return existingEmails.includes(email.toLowerCase());
};

const createUserAccount = async (userData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('Creating user account:', userData);
  return {
    userId: `USER${Date.now()}`,
    success: true,
    message: 'Account created successfully'
  };
};

const submitPropertyListing = async (propertyData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Submitting property listing:', propertyData);
  return {
    listingId: generateListingId(),
    success: true,
    message: 'Property listing submitted for review'
  };
};

const SellPropertyOverlay = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  
  // Form data
  const [propertyData, setPropertyData] = useState({
    // Property Details
    title: '',
    description: '',
    propertyType: '',
    price: '',
    area: '',
    city: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    parking: false,
    furnished: false,
    
    // Images
    mainImage: null,
    galleryImages: [],
    
    // User Details
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [listingId, setListingId] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);

  const steps = [
    'Property Details',
    'Images & Gallery',
    'Account & Submit'
  ];

  // Check if user exists when email changes
  useEffect(() => {
    const checkEmail = async () => {
      if (propertyData.email && /\S+@\S+\.\S+/.test(propertyData.email)) {
        setCheckingUser(true);
        try {
          const exists = await checkUserExists(propertyData.email);
          setUserExists(exists);
        } catch (error) {
          console.error('Error checking user:', error);
        } finally {
          setCheckingUser(false);
        }
      } else {
        setUserExists(false);
      }
    };

    const timeoutId = setTimeout(checkEmail, 500);
    return () => clearTimeout(timeoutId);
  }, [propertyData.email]);

  // Handle input changes
  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setPropertyData(prev => ({
      ...prev,
      [field]: field === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle file uploads
  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPropertyData(prev => ({ ...prev, mainImage: file }));
      if (formErrors.mainImage) {
        setFormErrors(prev => ({ ...prev, mainImage: '' }));
      }
    }
  };

  const handleGalleryUpload = (event) => {
    const files = Array.from(event.target.files);
    setPropertyData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...files].slice(0, 10) // Max 10 images
    }));
  };

  const removeGalleryImage = (index) => {
    setPropertyData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  // Validation for each step
  const validateStep = (step) => {
    const errors = {};
    
    if (step === 0) {
      // Property Details validation
      if (!propertyData.title.trim()) errors.title = 'Property title is required';
      if (!propertyData.description.trim()) errors.description = 'Description is required';
      if (!propertyData.propertyType) errors.propertyType = 'Property type is required';
      if (!propertyData.price) errors.price = 'Price is required';
      if (!propertyData.area) errors.area = 'Area is required';
      if (!propertyData.city) errors.city = 'City is required';
      if (!propertyData.location.trim()) errors.location = 'Location is required';
      
    } else if (step === 1) {
      // Images validation
      if (!propertyData.mainImage) errors.mainImage = 'Main image is required';
      if (propertyData.galleryImages.length === 0) errors.galleryImages = 'At least one gallery image is required';
      
    } else if (step === 2) {
      // User details validation
      if (!propertyData.name.trim()) errors.name = 'Name is required';
      if (!propertyData.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(propertyData.email)) errors.email = 'Invalid email';
      if (!propertyData.phone.trim()) errors.phone = 'Phone is required';
      else if (!/^\d{10}$/.test(propertyData.phone)) errors.phone = 'Invalid phone number';
      
      if (!userExists) {
        if (!propertyData.password) errors.password = 'Password is required';
        else if (propertyData.password.length < 8) errors.password = 'Password must be at least 8 characters';
        if (!propertyData.confirmPassword) errors.confirmPassword = 'Please confirm password';
        else if (propertyData.password !== propertyData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
      }
      
      if (!propertyData.termsAccepted) errors.termsAccepted = 'Please accept terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(activeStep)) {
      const newCompleted = { ...completed };
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      setActiveStep(prev => prev + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;
    
    setIsSubmitting(true);
    try {
      let userId = null;
      
      // Create account if user doesn't exist
      if (!userExists) {
        const userResult = await createUserAccount({
          name: propertyData.name,
          email: propertyData.email,
          phone: propertyData.phone,
          password: propertyData.password,
        });
        userId = userResult.userId;
      }
      
      // Submit property listing
      const listingResult = await submitPropertyListing({
        ...propertyData,
        userId,
        submittedAt: new Date().toISOString(),
      });
      
      setListingId(listingResult.listingId);
      setSubmitSuccess(true);
      
    } catch (error) {
      console.error('Submission error:', error);
      setFormErrors({ submit: 'Error submitting property. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close
  const handleClose = () => {
    if (submitSuccess) {
      // Reset form
      setPropertyData({
        title: '', description: '', propertyType: '', price: '', area: '',
        city: '', location: '', bedrooms: '', bathrooms: '', parking: false,
        furnished: false, mainImage: null, galleryImages: [], name: '',
        email: '', phone: '', password: '', confirmPassword: '', termsAccepted: false,
      });
      setActiveStep(0);
      setCompleted({});
      setSubmitSuccess(false);
      setFormErrors({});
    }
    onClose();
  };

  // Render step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TwoColumnGrid>
            <LargeTextField
              fullWidth
              label="Property Title"
              value={propertyData.title}
              onChange={handleInputChange('title')}
              error={!!formErrors.title}
              helperText={formErrors.title}
              placeholder="e.g., Spacious 3BHK Villa in Kochi"
              InputProps={{
                startAdornment: <HomeIcon sx={{ mr: 2, color: 'action.active' }} />
              }}
            />
            
            <LargeTextField
              fullWidth
              select
              label="Property Type"
              value={propertyData.propertyType}
              onChange={handleInputChange('propertyType')}
              error={!!formErrors.propertyType}
              helperText={formErrors.propertyType}
            >
              {propertyTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </LargeTextField>
            
            <LargeTextField
              fullWidth
              label="Price (₹)"
              value={propertyData.price}
              onChange={handleInputChange('price')}
              error={!!formErrors.price}
              helperText={formErrors.price}
              placeholder="e.g., 50,00,000"
              InputProps={{
                startAdornment: <PriceIcon sx={{ mr: 2, color: 'action.active' }} />
              }}
            />
            
            <LargeTextField
              fullWidth
              label="Area (Sq Ft)"
              value={propertyData.area}
              onChange={handleInputChange('area')}
              error={!!formErrors.area}
              helperText={formErrors.area}
              placeholder="e.g., 1200"
            />
            
            <LargeTextField
              fullWidth
              select
              label="City"
              value={propertyData.city}
              onChange={handleInputChange('city')}
              error={!!formErrors.city}
              helperText={formErrors.city}
            >
              {keralaCities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </LargeTextField>
            
            <LargeTextField
              fullWidth
              label="Specific Location"
              value={propertyData.location}
              onChange={handleInputChange('location')}
              error={!!formErrors.location}
              helperText={formErrors.location}
              placeholder="e.g., Marine Drive, Near Metro Station"
              InputProps={{
                startAdornment: <LocationIcon sx={{ mr: 2, color: 'action.active' }} />
              }}
            />
            
            <LargeTextField
              fullWidth
              label="Bedrooms"
              type="number"
              value={propertyData.bedrooms}
              onChange={handleInputChange('bedrooms')}
              placeholder="e.g., 3"
            />
            
            <LargeTextField
              fullWidth
              label="Bathrooms"
              type="number"
              value={propertyData.bathrooms}
              onChange={handleInputChange('bathrooms')}
              placeholder="e.g., 2"
            />
            
            <Box sx={{ gridColumn: '1 / -1' }}>
              <LargeTextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={propertyData.description}
                onChange={handleInputChange('description')}
                error={!!formErrors.description}
                helperText={formErrors.description}
                placeholder="Describe your property, its features, nearby amenities, etc."
                InputProps={{
                  startAdornment: <DescriptionIcon sx={{ mr: 2, color: 'action.active', alignSelf: 'flex-start', mt: 1 }} />
                }}
              />
            </Box>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyData.parking}
                  onChange={handleInputChange('parking')}
                />
              }
              label="Parking Available"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyData.furnished}
                  onChange={handleInputChange('furnished')}
                />
              }
              label="Furnished"
            />
          </TwoColumnGrid>
        );
        
      case 1:
        return (
          <Box>
            {/* Main Image Upload */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Main Property Image
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This will be displayed on the property card. Choose your best photo.
              </Typography>
              
              <Box
                sx={{
                  border: `2px dashed ${formErrors.mainImage ? 'red' : BRAND_COLORS.primary.main}`,
                  borderRadius: BORDER_RADIUS.lg,
                  padding: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: `${BRAND_COLORS.primary.main}08`,
                  },
                }}
                onClick={() => document.getElementById('main-image-upload').click()}
              >
                <input
                  id="main-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  style={{ display: 'none' }}
                />
                
                {propertyData.mainImage ? (
                  <Box>
                    <img
                      src={URL.createObjectURL(propertyData.mainImage)}
                      alt="Main property"
                      style={{
                        maxWidth: '200px',
                        maxHeight: '150px',
                        borderRadius: BORDER_RADIUS.md,
                        marginBottom: 16,
                      }}
                    />
                    <Typography variant="body2">
                      {propertyData.mainImage.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Click to change image
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <PhotoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Upload Main Image
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click to browse or drag and drop
                    </Typography>
                  </Box>
                )}
              </Box>
              {formErrors.mainImage && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {formErrors.mainImage}
                </Typography>
              )}
            </Box>
            
            {/* Gallery Images */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Gallery Images
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add multiple images to showcase different angles and features (Max 10 images)
              </Typography>
              
              <Box
                sx={{
                  border: `2px dashed ${formErrors.galleryImages ? 'red' : BRAND_COLORS.primary.main}`,
                  borderRadius: BORDER_RADIUS.lg,
                  padding: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  mb: 3,
                  '&:hover': {
                    backgroundColor: `${BRAND_COLORS.primary.main}08`,
                  },
                }}
                onClick={() => document.getElementById('gallery-upload').click()}
              >
                <input
                  id="gallery-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  style={{ display: 'none' }}
                />
                
                <UploadIcon sx={{ fontSize: 36, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body1">
                  Upload Gallery Images
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Select multiple images
                </Typography>
              </Box>
              
              {propertyData.galleryImages.length > 0 && (
                <ThreeColumnGrid>
                  {propertyData.galleryImages.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        borderRadius: BORDER_RADIUS.md,
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Gallery ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeGalleryImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </ThreeColumnGrid>
              )}
              
              {formErrors.galleryImages && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {formErrors.galleryImages}
                </Typography>
              )}
            </Box>
          </Box>
        );
        
      case 2:
        return (
          <Box>
            <InfoBox sx={{ mb: 4 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Account Creation</strong>
              </Typography>
              <Typography variant="body2">
                We'll create an account for you to manage your property listings. 
                You'll be able to edit, update, and track your properties after submission.
              </Typography>
            </InfoBox>
            
            <TwoColumnGrid>
              <LargeTextField
                fullWidth
                label="Full Name"
                value={propertyData.name}
                onChange={handleInputChange('name')}
                error={!!formErrors.name}
                helperText={formErrors.name}
                placeholder="Enter your full name"
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 2, color: 'action.active' }} />
                }}
              />
              
              <LargeTextField
                fullWidth
                label="Email Address"
                type="email"
                value={propertyData.email}
                onChange={handleInputChange('email')}
                error={!!formErrors.email}
                helperText={formErrors.email || (checkingUser ? 'Checking...' : userExists ? 'Account exists - you can log in after submission' : '')}
                placeholder="your.email@example.com"
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 2, color: 'action.active' }} />,
                  endAdornment: checkingUser && <CircularProgress size={20} />
                }}
              />
              
              <LargeTextField
                fullWidth
                label="Phone Number"
                value={propertyData.phone}
                onChange={handleInputChange('phone')}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                placeholder="9876543210"
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 2, color: 'action.active' }} />
                }}
              />
              
              {!userExists && (
                <>
                  <LargeTextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={propertyData.password}
                    onChange={handleInputChange('password')}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    placeholder="Minimum 8 characters"
                    InputProps={{
                      startAdornment: <LockIcon sx={{ mr: 2, color: 'action.active' }} />
                    }}
                  />
                  
                  <LargeTextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={propertyData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    placeholder="Re-enter password"
                    InputProps={{
                      startAdornment: <LockIcon sx={{ mr: 2, color: 'action.active' }} />
                    }}
                  />
                </>
              )}
            </TwoColumnGrid>
            
            {userExists && (
              <Alert severity="info" sx={{ mt: 3, borderRadius: BORDER_RADIUS.lg }}>
                <Typography variant="body2">
                  An account with this email already exists. You can log in to your account after property submission to manage your listings.
                </Typography>
              </Alert>
            )}
            
            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={propertyData.termsAccepted}
                    onChange={handleInputChange('termsAccepted')}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the <strong>Terms & Conditions</strong> and <strong>Privacy Policy</strong>
                  </Typography>
                }
              />
              {formErrors.termsAccepted && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {formErrors.termsAccepted}
                </Typography>
              )}
            </Box>
            
            {formErrors.submit && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {formErrors.submit}
              </Alert>
            )}
          </Box>
        );
        
      default:
        return null;
    }
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
            <HomeIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
            <Box>
              <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">
                Sell Your Property
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5, opacity: 0.9 }}>
                List your property and reach thousands of buyers
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
          <Box>
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel={isMobile}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {/* Step Content */}
            <Box sx={{ mb: 4, minHeight: '400px' }}>
              {renderStepContent(activeStep)}
            </Box>
            
            {/* Navigation Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                {activeStep > 0 && (
                  <CancelButton
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back
                  </CancelButton>
                )}
              </Box>
              
              <Box>
                {activeStep === steps.length - 1 ? (
                  <LargePrimaryButton
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Property'}
                  </LargePrimaryButton>
                ) : (
                  <LargePrimaryButton
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Next
                  </LargePrimaryButton>
                )}
              </Box>
            </Box>
          </Box>
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
              Property Submitted Successfully!
            </Typography>
            <Typography variant={isMobile ? "body1" : "h6"} color="text.secondary" paragraph sx={{ mb: 4 }}>
              Your property is now under review. We'll notify you once it's approved and live.
            </Typography>
            
            <TicketNumberBox sx={{ minWidth: { xs: '100%', md: '400px' } }}>
              <Typography variant={isMobile ? "h6" : "h5"} color="primary" fontWeight="600" gutterBottom>
                Your Listing ID
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
                {listingId}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please save this ID for tracking your listing
              </Typography>
            </TicketNumberBox>
            
            <Alert severity="success" sx={{ borderRadius: BORDER_RADIUS.lg, textAlign: 'left', maxWidth: '500px', mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                📧 <strong>Confirmation email sent</strong> to {propertyData.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                📱 <strong>SMS notification sent</strong> to {propertyData.phone}
              </Typography>
              <Typography variant="body1">
                🏠 <strong>Account created</strong> - You can now manage your listings
              </Typography>
            </Alert>

            <InfoBox sx={{ maxWidth: '500px' }}>
              <Typography variant="body2" fontWeight="600" gutterBottom>
                What happens next?
              </Typography>
              <Typography variant="body2" component="div">
                • Our team will review your property within 24-48 hours<br/>
                • You'll receive approval notification via email & SMS<br/>
                • Your property will be live and visible to buyers<br/>
                • You can log in to manage and edit your listing anytime
              </Typography>
            </InfoBox>
          </SuccessBox>
        )}
      </ResponsiveDialogContent>
    </LargeDialog>
  );
};

export default SellPropertyOverlay;