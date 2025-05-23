// services/auth.ts
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export const login = (data: {username: string; password: string;}) =>
  axios.post(`${API}/auth/login`, data);

export const registerCustomer = (data: any) =>
  axios.post(`${API}/auth/register-customer`, data);

export const registerEmployee = (data: any) =>
  axios.post(`${API}/auth/register-employee`, data);

export const forgotPassword = (email: string) =>
  axios.post(`${API}/auth/forgot-password`, { email });

export const resetPassword = (token: string, newPassword: string) =>
  axios.post(`${API}/auth/reset-password`, { token, newPassword });

export const verifyFaceMulti = (payload: {
  userId: number;
  images: { pose: 'front' | 'left' | 'right'; base64: string }[];
}) => axios.post(`${API}/face/verify-face`, payload);

