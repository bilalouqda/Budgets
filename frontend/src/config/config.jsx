import axios from 'axios';

const API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("token",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("config",config);
    return config;
  },
  (error) => {
    console.log("error",error);
    return Promise.reject(error);
  }
);

export default axiosInstance;