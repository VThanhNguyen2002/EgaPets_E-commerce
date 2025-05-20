// services/auth.ts
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;
export const login = (data) => axios.post(`${API}/auth/login`, data);
export const registerCustomer = (data) => axios.post(`${API}/auth/register-customer`, data);
export const registerEmployee = (data) => axios.post(`${API}/auth/register-employee`, data);
export const forgotPassword = (email) => axios.post(`${API}/auth/forgot-password`, { email });
export const resetPassword = (token, newPassword) => axios.post(`${API}/auth/reset-password`, { token, newPassword });
export const verifyFaceMulti = (payload) => axios.post(`${API}/face/verify-face`, payload);
