// src/App.jsx - Using Your Existing Hook
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Homepage from './pages/HomePage';
import PropertyDetails from './components/property/PropertyDetails';
import EnquiryFormOverlay from './components/EnquiryFormOverlay';
import { EnquiryFormProvider, useEnquiryForm } from './hooks/useEnquiryForm';
import { theme } from './theme';
import './App.css';

// Main App Content Component
const AppContent = () => {
  const { isOpen, closeEnquiryForm } = useEnquiryForm();

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/property/:propertySlug" element={<PropertyDetails />} />
          {/* Add more routes here as you build more pages */}
        </Routes>
      </div>
      
      {/* Global Enquiry Form Overlay */}
      <EnquiryFormOverlay 
        open={isOpen} 
        onClose={closeEnquiryForm} 
      />
    </>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EnquiryFormProvider>
        <Router>
          <AppContent />
        </Router>
      </EnquiryFormProvider>
    </ThemeProvider>
  );
}

export default App;