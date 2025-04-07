import axios from 'axios';
import API_CONFIG from '../config/api';

// Create axios instance with default config
const api = axios.create(API_CONFIG);

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    if (error.response?.data?.errors) {
      // Laravel validation error format
      const messages = Object.values(error.response.data.errors).flat();
      return Promise.reject(new Error(messages.join('\n')));
    }
    if (error.response?.data?.message) {
      // Laravel error message
      return Promise.reject(new Error(error.response.data.message));
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

// Appointments endpoints
export const appointments = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  complete: (id) => api.put(`/appointments/${id}/complete`),
};

// Patients endpoints
export const patients = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
};

// Schedule endpoints
export const schedule = {
  getDaily: (date) => api.get('/schedule', { params: { date } }),
  getAvailableSlots: (date) => api.get('/schedule/available-slots', { params: { date } }),
};

// Profile endpoints
export const profile = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};

// Doctors endpoints
export const doctors = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getSchedule: (id, params) => api.get(`/doctors/${id}/schedule`, { params }),
};

// Departments endpoints
export const departments = {
  getAll: () => api.get('/departments'),
  getById: (id) => api.get(`/departments/${id}`),
};

// Settings endpoints
export const settings = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export default api; 