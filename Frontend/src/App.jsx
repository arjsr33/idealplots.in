import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Homepage from './pages/HomePage';
import PropertyDetails from './components/property/PropertyDetails';
import './App.css';

// Create Material-UI theme with logo colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E5BBA', // Blue from logo
      light: '#5A7BC8',
      dark: '#1E3F8A',
    },
    secondary: {
      main: '#FF6B35', // Orange from logo
      light: '#FF8A5B',
      dark: '#E55A2B',
    },
     tertiary: {
      main: '#DAA520', // Golden color
      light: '#F4D03F',
      dark: '#B8860B',
    },
    background: {
      default: '#f8f9fa',
    },
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Add consistent transition
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/property/:propertySlug" element={<PropertyDetails />} />
            {/* Add more routes here as you build more pages */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;