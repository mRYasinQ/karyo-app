import api from '@/lib/api';

import type {
  GetInvitationsParams,
  InvitationsResponse,
  InviteUserPayload,
  RespondInvitePayload,
} from './types';

const WorkspaceInviteService = {
  getInvitations: async (params?: GetInvitationsParams) => {
    const response = await api.get<InvitationsResponse>(
      '/workspaces/invitations',
      { params },
    );
    return response.data;
  },

  inviteUser: async (slug: string, payload: InviteUserPayload) => {
    const response = await api.post<BaseApiResponse>(
      `/workspaces/${slug}/invitations`,
      payload,
    );
    return response.data;
  },

  respondToInvite: async (slug: string, payload: RespondInvitePayload) => {
    const response = await api.post<BaseApiResponse>(
      `/workspaces/${slug}/invitations/respond`,
      payload,
    );
    return response.data;
  },
};

export default WorkspaceInviteService;
