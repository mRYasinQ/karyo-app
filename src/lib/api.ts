import ApiError from './api-error';
import appConfig from './config';

import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: appConfig.api.base_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const apiError = new ApiError(
      error.response?.data.error ?? 'مشکلی وجود داشت.',
      error.response?.data.status_code ?? 500,
    );

    return Promise.reject(apiError);
  },
);

export default api;
