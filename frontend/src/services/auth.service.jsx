import api from "../config/config";

/**
 * @typedef {Object} RegisterData
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginData
 * @property {string} email
 * @property {string} password
 */

export const authService = {
  /**
   * @param {RegisterData} data
   */
  async register(data) {
    const response = await api.post('/users/register', data);
    console.log("response",response);
    return response.data;
  },

  /**
   * @param {LoginData} data
   */
  async login(data) {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getAllUsers() {
    const response = await api.get('/users');
    console.log(response.data);
    return response.data;
  },

  async updateUserRole(userId, role) {
    const response = await api.put(`/users/${userId}`, { role });
    return response.data;
  },

  async deleteUser(userId) {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  }

};
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});