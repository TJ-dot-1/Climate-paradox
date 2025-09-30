import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Climate Data API
export const climateDataAPI = {
  getAll: () => api.get('/climate-data'),
  getByCategory: (category) => api.get(`/climate-data?category=${category}`),
  getCategories: () => api.get('/climate-data/categories'),
};

// Stories API
export const storiesAPI = {
  getAll: (params = {}) => api.get('/stories', { params }),
  getStats: () => api.get('/stories/stats'),
  create: (formData) => api.post('/stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Petition API
export const petitionAPI = {
  getSignatures: (page = 1, limit = 20) => 
    api.get('/petition', { params: { page, limit } }),
  getStats: () => api.get('/petition/stats'),
  sign: (data) => api.post('/petition/sign', data),
};

export default api;