import api from '@/lib/api';

import type {
  GetWorkspaceMembersParams,
  UpdateWorkspaceMemberPayload,
  WorkspaceMembersResponse,
} from './types';

const WorkspaceMemberService = {
  getMembers: async (slug: string, params?: GetWorkspaceMembersParams) => {
    const response = await api.get<WorkspaceMembersResponse>(
      `/workspaces/${slug}/members`,
      { params },
    );
    return response.data;
  },

  updateMemberRole: async (
    slug: string,
    memberId: number,
    payload: UpdateWorkspaceMemberPayload,
  ) => {
    const response = await api.patch<BaseApiResponse>(
      `/workspaces/${slug}/members/${memberId}`,
      payload,
    );
    return response.data;
  },

  removeMember: async (slug: string, memberId: number) => {
    const response = await api.delete<BaseApiResponse>(
      `/workspaces/${slug}/members/${memberId}`,
    );
    return response.data;
  },
};

export default WorkspaceMemberService;
