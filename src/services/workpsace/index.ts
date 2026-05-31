import api from '@/lib/api';

import type {
  GetWorkspacesParams,
  WorkspaceResponse,
  WorkspacesResponse,
} from './types';

const WorkspaceService = {
  getWorkspaces: async (params?: GetWorkspacesParams) => {
    const response = await api.get<WorkspacesResponse>('/workspaces', {
      params,
    });
    return response.data;
  },

  getWorkspace: async (slug: string) => {
    const response = await api.get<WorkspaceResponse>(`/workspaces/${slug}`);
    return response.data.data;
  },
};

export default WorkspaceService;
