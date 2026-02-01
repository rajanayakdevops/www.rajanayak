import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('API Request:', request.method?.toUpperCase(), request.url);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const achievementAPI = {
  // Get all achievements
  getAll: () => axios.get(`${API_URL}/achievements`),
  
  // Get single achievement
  getById: (id) => axios.get(`${API_URL}/achievements/${id}`),
  
  // Create new achievement
  create: (data) => axios.post(`${API_URL}/achievements`, data),
  
  // Update achievement
  update: (id, data) => axios.put(`${API_URL}/achievements/${id}`, data),
  
  // Delete achievement
  delete: (id) => axios.delete(`${API_URL}/achievements/${id}`)
};

export default achievementAPI;