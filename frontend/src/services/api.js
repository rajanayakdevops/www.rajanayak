import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API_URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Contact API Request:', request.method?.toUpperCase(), request.url, request.data);
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Contact API Success:', response.status, response.data);
    return response;
  },
  error => {
    console.error('Contact API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getContacts: () => api.get('/contact')
};

export const projectAPI = {
  getProjects: () => api.get('/projects'),
  getProject: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data)
};

export const visitorAPI = {
  incrementVisitor: () => api.post('/visitors/increment'),
  getVisitorCount: () => api.get('/visitors/count')
};

export const codingStatsAPI = {
  getCodingStats: () => api.get('/coding-stats'),
  updateCodingStats: (platform, data) => api.put(`/coding-stats/${platform}`, data)
};

export const testimonialAPI = {
  getTestimonials: () => api.get('/testimonials'),
  createTestimonial: (data) => api.post('/testimonials', data)
};

export default api;