import api from '@/lib/api';
import { buildFormData } from '@/lib/utils';

import type {
  CreateWorkspacePayload,
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

  createWorkspace: async (payload: CreateWorkspacePayload) => {
    const hasFile = payload.logo instanceof File;

    if (hasFile) {
      const formData = buildFormData(payload);

      const response = await api.post<BaseApiResponse>(
        '/workspaces',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    }

    const response = await api.post<BaseApiResponse>('/workspaces', payload);
    return response.data;
  },
};

export default WorkspaceService;
