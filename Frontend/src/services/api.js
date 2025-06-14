// API configuration and methods for backend integration
import { mockProperties, searchProperties as mockSearchProperties, getPropertyStats as mockGetPropertyStats } from '../data/mockData';
import { generatePropertySlug } from '../components/property/utils/PropertyUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// API client class for handling all backend requests
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    // Flag to determine if we're using mock data or real API
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
  }

  // Helper method to get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  // Helper method to set auth token
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  // Helper method to remove auth token
  removeAuthToken() {
    localStorage.removeItem('authToken');
  }
  enhancePropertyData(property) {
  if (!property) return null;
  
  return {
    ...property,
    // Add mock data for fields that might come from backend
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    availabilityStarts: property.datePosted,
    lastUpdated: new Date().toISOString(),
    viewCount: Math.floor(Math.random() * 1000) + 100,
    inquiryCount: Math.floor(Math.random() * 50) + 10,
    // Ensure all images are available
    images: property.images && property.images.length > 0 ? property.images : [property.mainImage],
    // Add more detailed features if not present
    features: property.features || [
      'DTCP Approved',
      'Clear Title',
      'Ready to Move',
      'Prime Location'
    ]
  };
}

  // Get headers with authentication if available
  getHeaders(customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const token = this.getAuthToken();
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    // If using mock data, return mock responses for property endpoints
    if (this.useMockData && endpoint.startsWith('/properties')) {
      return this.handleMockPropertyRequests(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.headers),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response status codes
      if (response.status === 401) {
        // Unauthorized - remove token and redirect to login
        this.removeAuthToken();
        // You can dispatch a logout action or redirect here
        throw new Error('Unauthorized access. Please login again.');
      }
      
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }

  // Handle mock data requests for properties
  async handleMockPropertyRequests(endpoint, options = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    
    try {
      // Handle property by slug lookup
      if (endpoint.startsWith('/properties/slug/')) {
        const slug = endpoint.split('/properties/slug/')[1];
        
        // Find property by matching slug pattern (title + location + city)
        const property = mockProperties.find(p => {
          try {
            const propertySlug = generatePropertySlug(p);
            return propertySlug === slug;
          } catch (error) {
            console.warn('Error generating slug for property:', p.id, error);
            return false;
          }
        });
        
        if (property) {
          // Add additional data that might be needed for property details page
          const enhancedProperty = this.enhancePropertyData(property);;
          
          return { success: true, data: enhancedProperty };
        } else {
          throw new Error('Property not found');
        }
      }
      
      // Handle GET /properties with query parameters
      if (endpoint.startsWith('/properties') && (options.method === undefined || options.method === 'GET')) {
        const [baseEndpoint, queryString] = endpoint.split('?');
        
        if (baseEndpoint === '/properties') {
          if (queryString) {
            // Parse query parameters
            const params = new URLSearchParams(queryString);
            const filters = {};
            for (const [key, value] of params) {
              filters[key] = value;
            }
            const filtered = mockSearchProperties(filters);
            return {
              success: true,
              data: filtered,
              total: filtered.length,
              page: 1,
              limit: filtered.length
            };
          } else {
            // Return all properties
            return {
              success: true,
              data: mockProperties,
              total: mockProperties.length,
              page: 1,
              limit: mockProperties.length
            };
          }
        }
      }
      
      // Handle POST /properties/search
      if (endpoint === '/properties/search' && options.method === 'POST') {
        const searchParams = JSON.parse(options.body || '{}');
        
        // Clean up search parameters
        const cleanParams = {};
        Object.keys(searchParams).forEach(key => {
          const value = searchParams[key];
          if (value && value !== '' && value !== 'all') {
            cleanParams[key] = value;
          }
        });
        
        // Perform search
        let results = mockProperties;
        
        // Apply filters
        if (cleanParams.city) {
          results = results.filter(p => p.city === cleanParams.city);
        }
        if (cleanParams.type) {
          results = results.filter(p => p.type === cleanParams.type);
        }
        if (cleanParams.subtype) {
          results = results.filter(p => p.subtype === cleanParams.subtype);
        }
        if (cleanParams.minPrice) {
          results = results.filter(p => p.price >= parseInt(cleanParams.minPrice));
        }
        if (cleanParams.maxPrice) {
          results = results.filter(p => p.price <= parseInt(cleanParams.maxPrice));
        }
        if (cleanParams.minArea) {
          results = results.filter(p => p.area >= parseInt(cleanParams.minArea));
        }
        if (cleanParams.maxArea) {
          results = results.filter(p => p.area <= parseInt(cleanParams.maxArea));
        }
        if (cleanParams.bathrooms) {
          const minBathrooms = parseInt(cleanParams.bathrooms);
          results = results.filter(p => p.bathrooms && p.bathrooms >= minBathrooms);
        }
        if (cleanParams.searchText) {
          const searchText = cleanParams.searchText.toLowerCase();
          results = results.filter(p => 
            p.title.toLowerCase().includes(searchText) ||
            p.description.toLowerCase().includes(searchText) ||
            p.location.toLowerCase().includes(searchText) ||
            p.city.toLowerCase().includes(searchText)
          );
        }
        
        return {
          success: true,
          data: results,
          total: results.length,
          filters: cleanParams
        };
      }
      
      // Handle specific property by ID (keep for backward compatibility)
      if (endpoint.startsWith('/properties/') && endpoint.split('/').length === 3 && !endpoint.includes('slug')) {
        const id = endpoint.split('/properties/')[1];
        const property = mockProperties.find(p => p.id === id);
        if (property) {
          // Add additional data that might be needed for property details page
          const enhancedProperty = this.enhancePropertyData(property);
          
          return { success: true, data: enhancedProperty };
        } else {
          throw new Error('Property not found');
        }
      }
      
      // Handle related properties
      if (endpoint.includes('/related')) {
        const propertyId = endpoint.split('/properties/')[1].split('/related')[0];
        const currentProperty = mockProperties.find(p => p.id === propertyId);
        
        if (currentProperty) {
          // Find related properties by city and type
          let related = mockProperties.filter(p => 
            p.id !== propertyId && 
            (p.city === currentProperty.city || p.type === currentProperty.type)
          );
          
          // Limit results
          const limit = parseInt(new URLSearchParams(endpoint.split('?')[1] || '').get('limit')) || 4;
          related = related.slice(0, limit);
          
          return { success: true, data: related };
        }
        return { success: true, data: [] };
      }

      // Handle property view recording
      if (endpoint.includes('/view') && options.method === 'POST') {
        const propertyId = endpoint.split('/properties/')[1].split('/view')[0];
        // In real backend, this would increment view count
        return { 
          success: true, 
          message: 'View recorded',
          data: { viewCount: Math.floor(Math.random() * 1000) + 100 }
        };
      }

      // Handle property stats
      if (endpoint.includes('/stats')) {
        const propertyId = endpoint.split('/properties/')[1].split('/stats')[0];
        return {
          success: true,
          data: {
            views: Math.floor(Math.random() * 1000) + 100,
            inquiries: Math.floor(Math.random() * 50) + 10,
            favorites: Math.floor(Math.random() * 25) + 5,
            lastViewed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        };
      }

      // Handle availability check
      if (endpoint.includes('/availability')) {
        return {
          success: true,
          data: {
            available: true,
            lastChecked: new Date().toISOString(),
            status: 'available'
          }
        };
      }

      // Handle visit scheduling
      if (endpoint.includes('/schedule-visit') && options.method === 'POST') {
        const visitData = JSON.parse(options.body || '{}');
        return {
          success: true,
          message: 'Visit scheduled successfully',
          data: {
            visitId: `visit_${Date.now()}`,
            scheduledDate: visitData.preferredDate,
            status: 'confirmed'
          }
        };
      }
      
      // Handle featured properties
      if (endpoint === '/properties/featured') {
        const featured = mockProperties.filter(p => p.verified).slice(0, 6);
        return { success: true, data: featured };
      }
      
      // Handle statistics
      if (endpoint === '/properties/statistics') {
        return { success: true, data: mockGetPropertyStats() };
      }
      
      // Handle city-specific requests
      if (endpoint.includes('/properties/city/')) {
        const city = decodeURIComponent(endpoint.split('/properties/city/')[1]);
        const cityProperties = mockProperties.filter(p => p.city === city);
        return { success: true, data: cityProperties, total: cityProperties.length };
      }
      
      // Handle type-specific requests
      if (endpoint.includes('/properties/type/')) {
        const type = endpoint.split('/properties/type/')[1];
        const typeProperties = mockProperties.filter(p => p.type === type);
        return { success: true, data: typeProperties, total: typeProperties.length };
      }
      
      // Default response for unhandled property endpoints
      return { success: true, data: [], message: 'Endpoint not implemented in mock data' };
      
    } catch (error) {
      throw new Error(`Mock API error: ${error.message}`);
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // File upload method
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional data to form
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
        Authorization: this.getAuthToken() ? `Bearer ${this.getAuthToken()}` : undefined,
      },
    });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Specific API methods for your application
const api = {
  // Authentication
  auth: {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    register: (userData) => apiClient.post('/auth/register', userData),
    logout: () => {
      apiClient.removeAuthToken();
      return apiClient.post('/auth/logout');
    },
    refreshToken: () => apiClient.post('/auth/refresh'),
    forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => apiClient.post('/auth/reset-password', { token, password }),
  },

  // User management
  user: {
    getProfile: () => apiClient.get('/user/profile'),
    updateProfile: (userData) => apiClient.put('/user/profile', userData),
    changePassword: (passwords) => apiClient.patch('/user/change-password', passwords),
    deleteAccount: () => apiClient.delete('/user/account'),
  },

  // Real Estate specific API methods
  properties: {
    getAll: (params) => apiClient.get('/properties', params),
    getById: (id) => apiClient.get(`/properties/${id}`),
    getBySlug: (slug) => apiClient.get(`/properties/slug/${slug}`),
    getFeatured: () => apiClient.get('/properties/featured'),
    getByCity: (city, params) => apiClient.get(`/properties/city/${city}`, params),
    getByType: (type, params) => apiClient.get(`/properties/type/${type}`, params),
    search: (searchParams) => apiClient.post('/properties/search', searchParams),
    create: (propertyData) => apiClient.post('/properties', propertyData),
    update: (id, propertyData) => apiClient.put(`/properties/${id}`, propertyData),
    delete: (id) => apiClient.delete(`/properties/${id}`),
    uploadImages: (propertyId, images) => {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });
      return apiClient.uploadFile(`/properties/${propertyId}/images`, formData);
    },
    getStatistics: () => apiClient.get('/properties/statistics'),
    
    // Enhanced property methods for PropertyDetails page
    getRelated: (propertyId, limit = 4) => apiClient.get(`/properties/${propertyId}/related`, { limit }),
    recordView: (propertyId) => apiClient.post(`/properties/${propertyId}/view`),
    getPropertyStats: (propertyId) => apiClient.get(`/properties/${propertyId}/stats`),
    checkAvailability: (propertyId) => apiClient.get(`/properties/${propertyId}/availability`),
    scheduleVisit: (propertyId, visitData) => apiClient.post(`/properties/${propertyId}/schedule-visit`, visitData),
    getLocationDetails: (propertyId) => apiClient.get(`/properties/${propertyId}/location-details`),
    getPriceHistory: (propertyId) => apiClient.get(`/properties/${propertyId}/price-history`),
    reportIssue: (propertyId, issueData) => apiClient.post(`/properties/${propertyId}/report-issue`, issueData),
  },

  // Location-based APIs
  locations: {
    getCities: () => apiClient.get('/locations/cities'),
    getAreas: (city) => apiClient.get(`/locations/cities/${city}/areas`),
    getNearby: (lat, lng, radius) => apiClient.get(`/locations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
  },

  // Property inquiry and leads
  inquiries: {
    create: (inquiryData) => apiClient.post('/inquiries', inquiryData),
    getAll: (params) => apiClient.get('/inquiries', params),
    getById: (id) => apiClient.get(`/inquiries/${id}`),
    updateStatus: (id, status) => apiClient.patch(`/inquiries/${id}/status`, { status }),
    addNote: (id, note) => apiClient.post(`/inquiries/${id}/notes`, { note }),
  },

  // Favorites/Wishlist
  favorites: {
    getAll: () => apiClient.get('/favorites'),
    add: (propertyId) => apiClient.post('/favorites', { propertyId }),
    remove: (propertyId) => apiClient.delete(`/favorites/${propertyId}`),
    check: (propertyId) => apiClient.get(`/favorites/check/${propertyId}`),
  },

  // Example: Generic data operations (keep existing)
  // Replace these with your actual API endpoints
  data: {
    getAll: (params) => apiClient.get('/data', params),
    getById: (id) => apiClient.get(`/data/${id}`),
    create: (data) => apiClient.post('/data', data),
    update: (id, data) => apiClient.put(`/data/${id}`, data),
    delete: (id) => apiClient.delete(`/data/${id}`),
  },

  // File operations
  files: {
    upload: (file, additionalData) => apiClient.uploadFile('/files/upload', file, additionalData),
    download: (fileId) => apiClient.get(`/files/download/${fileId}`),
    delete: (fileId) => apiClient.delete(`/files/${fileId}`),
  },

  // Utility methods
  utils: {
    healthCheck: () => apiClient.get('/health'),
    getConfig: () => apiClient.get('/config'),
  },

  // Direct access methods for custom requests
  get: (endpoint, params) => apiClient.get(endpoint, params),
  post: (endpoint, data) => apiClient.post(endpoint, data),
  put: (endpoint, data) => apiClient.put(endpoint, data),
  patch: (endpoint, data) => apiClient.patch(endpoint, data),
  delete: (endpoint) => apiClient.delete(endpoint),
  
  // Token management
  setAuthToken: (token) => apiClient.setAuthToken(token),
  getAuthToken: () => apiClient.getAuthToken(),
  removeAuthToken: () => apiClient.removeAuthToken(),
};

export default api;