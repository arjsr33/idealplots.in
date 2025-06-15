import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Homepage from './pages/HomePage';
import PropertyDetails from './components/property/PropertyDetails';
import './App.css';
import { theme } from './theme'

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