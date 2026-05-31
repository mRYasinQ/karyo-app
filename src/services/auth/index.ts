import api from '@/lib/api';

import type {
  ChoosePasswordPayload,
  LoginPayload,
  LoginResponse,
  OtpResponse,
  SendOtpPayload,
  VerifyEmailPayload,
  VerifyEmailResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from './types';

const AuthService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post<LoginResponse>('/auth/login', payload);
    return response.data.data;
  },

  register: async (payload: ChoosePasswordPayload) => {
    const response = await api.post<LoginResponse>('/auth/register', payload);
    return response.data.data;
  },
  otpRegister: async (payload: SendOtpPayload) => {
    const response = await api.post<OtpResponse>(
      '/auth/register/send-otp',
      payload,
    );
    return response.data.data;
  },
  verifyOtpRegister: async (payload: VerifyOtpPayload) => {
    const response = await api.post<VerifyOtpResponse>(
      '/auth/register/verify-otp',
      payload,
    );
    return response.data.data;
  },

  recover: async (payload: ChoosePasswordPayload) => {
    const response = await api.post<LoginResponse>('/auth/recover', payload);
    return response.data.data;
  },
  otpRecover: async (payload: SendOtpPayload) => {
    const response = await api.post<OtpResponse>(
      '/auth/recover/send-otp',
      payload,
    );
    return response.data.data;
  },
  verifyOtpRecover: async (payload: VerifyOtpPayload) => {
    const response = await api.post<VerifyOtpResponse>(
      '/auth/recover/verify-otp',
      payload,
    );
    return response.data.data;
  },

  EmailOtp: async () => {
    const response = await api.post<OtpResponse>('/auth/verify-email/send-otp');
    return response.data.data;
  },
  verifyEmailOtp: async (payload: VerifyEmailPayload) => {
    const response = await api.post<VerifyEmailResponse>(
      '/auth/verify-email/verify-otp',
      payload,
    );
    return response.data;
  },

  logout: async () => {
    const response = await api.post<BaseApiResponse>('/auth/logout');
    return response.data;
  },
};

export default AuthService;
