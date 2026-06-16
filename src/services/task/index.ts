import api from '@/lib/api';

import type {
  CreateTaskPayload,
  GetTasksParams,
  TaskResponse,
  TasksResponse,
  UpdateTaskPayload,
  UpdateTaskStatusPayload,
} from './types';

const TaskService = {
  getTasks: async (
    workspaceId: number,
    projectId: number,
    params?: GetTasksParams,
  ) => {
    const response = await api.get<TasksResponse>(
      `/projects/${projectId}/tasks`,
      {
        params,
        headers: {
          'x-workspace-id': workspaceId,
        },
      },
    );
    return response.data;
  },

  getTask: async (workspaceId: number, projectId: number, id: number) => {
    const response = await api.get<TaskResponse>(
      `/projects/${projectId}/tasks/${id}`,
      {
        headers: {
          'x-workspace-id': workspaceId,
        },
      },
    );
    return response.data.data;
  },

  createTask: async (
    workspaceId: number,
    projectId: number,
    payload: CreateTaskPayload,
  ) => {
    const response = await api.post<BaseApiResponse>(
      `/projects/${projectId}/tasks`,
      payload,
      {
        headers: {
          'x-workspace-id': workspaceId,
        },
      },
    );
    return response.data;
  },

  updateTask: async (
    workspaceId: number,
    projectId: number,
    id: number,
    payload: UpdateTaskPayload,
  ) => {
    const response = await api.patch<BaseApiResponse>(
      `/projects/${projectId}/tasks/${id}`,
      payload,
      {
        headers: {
          'x-workspace-id': workspaceId,
        },
      },
    );
    return response.data;
  },

  updateTaskStatus: async (
    workspaceId: number,
    projectId: number,
    id: number,
    payload: UpdateTaskStatusPayload,
  ) => {
    const response = await api.patch<BaseApiResponse>(
      `/projects/${projectId}/tasks/${id}/status`,
      payload,
      {
        headers: {
          'x-workspace-id': workspaceId,
        },
      },
    );
    return response.data;
  },

  deleteTask: async (workspaceId: number, projectId: number, id: number) => {
    const response = await api.delete<BaseApiResponse>(
      `/projects/${projectId}/tasks/${id}`,
      {
        headers: {
          'x-workspace-id': workspaceId,
        },
      },
    );
    return response.data;
  },
};

export default TaskService;
