import api from '@/lib/api';

import type { SessionsResponse } from './types';

const SessionService = {
  getSessions: async (params?: ApiParams) => {
    const response = await api.get<SessionsResponse>('/sessions', { params });
    return response.data;
  },

  revokeSession: async (id: number) => {
    const response = await api.delete<BaseApiResponse>(`/sessions/${id}`);
    return response.data;
  },

  clearSessions: async (includeCurrent: boolean = false) => {
    const response = await api.post<BaseApiResponse>('/sessions/clear', {
      include_current: includeCurrent,
    });
    return response.data;
  },
};

export default SessionService;
