import ApiError from './api-error';
import appConfig from './config';
import ROUTES from './routes';

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
    const errorMessage = error.response?.data.error ?? 'مشکلی وجود داشت.';
    const statusCode = error.response?.data.status_code ?? 500;
    const requestUrl = error.config?.url ?? '';

    if (typeof window !== 'undefined') {
      if (statusCode === 401) {
        localStorage.removeItem('token');
        window.location.href = ROUTES.AUTH.LOGIN;
      }

      if (statusCode === 403) {
        if (requestUrl.startsWith('/workspaces')) {
          window.location.href = ROUTES.DASHBOARD.WORKSPACES.MAIN;
        } else {
          window.location.href = ROUTES.DASHBOARD.MAIN;
        }
      }
    }

    const apiError = new ApiError(errorMessage, statusCode);

    return Promise.reject(apiError);
  },
);

export default api;
