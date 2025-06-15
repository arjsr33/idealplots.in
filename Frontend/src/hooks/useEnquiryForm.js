// src/hooks/useEnquiryForm.js
import { createContext, useContext, useState, useCallback, createElement } from 'react';

// Create context for enquiry form state
const EnquiryFormContext = createContext();

// Custom hook to use enquiry form
export const useEnquiryForm = () => {
  const context = useContext(EnquiryFormContext);
  if (!context) {
    throw new Error('useEnquiryForm must be used within an EnquiryFormProvider');
  }
  return context;
};

// Provider component to wrap your app
export const EnquiryFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contextData, setContextData] = useState(null);

  const openEnquiryForm = useCallback((data = null) => {
    setContextData(data);
    setIsOpen(true);
  }, []);

  const closeEnquiryForm = useCallback(() => {
    setIsOpen(false);
    setContextData(null);
  }, []);

  const value = {
    isOpen,
    contextData,
    openEnquiryForm,
    closeEnquiryForm,
  };

  return createElement(
    EnquiryFormContext.Provider,
    { value },
    children
  );
};

export default useEnquiryForm;