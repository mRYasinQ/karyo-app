import api from '@/lib/api';

import type {
  CreateProjectPayload,
  GetProjectsParams,
  ProjectResponse,
  ProjectsResponse,
  UpdateProjectPayload,
} from './types';

const ProjectService = {
  getProjects: async (workspaceId: number, params?: GetProjectsParams) => {
    const response = await api.get<ProjectsResponse>('/projects', {
      params,
      headers: {
        'x-workspace-id': workspaceId,
      },
    });
    return response.data;
  },

  getProject: async (workspaceId: number, slug: string) => {
    const response = await api.get<ProjectResponse>(`/projects/${slug}`, {
      headers: {
        'x-workspace-id': workspaceId,
      },
    });
    return response.data.data;
  },

  createProject: async (workspaceId: number, payload: CreateProjectPayload) => {
    const response = await api.post<BaseApiResponse>('/projects', payload, {
      headers: {
        'x-workspace-id': workspaceId,
      },
    });
    return response.data;
  },

  updateProject: async (
    workspaceId: number,
    id: number,
    payload: UpdateProjectPayload,
  ) => {
    const response = await api.patch<BaseApiResponse>(
      `/projects/${id}`,
      payload,
      {
        headers: {
          'x-workspace-id': workspaceId,
        },
      },
    );
    return response.data;
  },

  deleteProject: async (workspaceId: number, id: number) => {
    const response = await api.delete<BaseApiResponse>(`/projects/${id}`, {
      headers: {
        'x-workspace-id': workspaceId,
      },
    });
    return response.data;
  },
};

export default ProjectService;
