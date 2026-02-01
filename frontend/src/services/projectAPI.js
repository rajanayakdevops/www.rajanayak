import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const projectAPI = {
  // Get all projects
  getAll: () => axios.get(`${API_URL}/projects`),
  
  // Get single project
  getById: (id) => axios.get(`${API_URL}/projects/${id}`),
  
  // Create new project
  create: (data) => axios.post(`${API_URL}/projects`, data),
  
  // Update project
  update: (id, data) => axios.put(`${API_URL}/projects/${id}`, data),
  
  // Delete project
  delete: (id) => axios.delete(`${API_URL}/projects/${id}`)
};

export default projectAPI;