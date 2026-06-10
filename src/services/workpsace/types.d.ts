type GetWorkspacesParams = ApiParams & {
  search?: string;
};

type WorkspaceData = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  logo: Nullable<string>;
  description: Nullable<string>;
};

type WorkspacePayload = {
  name: string;
  slug: string;
  logo?: Nullable<File>;
  description?: Nullable<string>;
};

type CreateWorkspacePayload = WorkspacePayload;
type UpdateWorkspacePayload = Partial<Omit<WorkspacePayload, 'slug'>>;

type WorkspacesResponse = ApiResponseWithPagination<WorkspaceData[]>;
type WorkspaceResponse = ApiResponse<WorkspaceData>;

export type {
  WorkspaceData,
  GetWorkspacesParams,
  CreateWorkspacePayload,
  UpdateWorkspacePayload,
  WorkspacesResponse,
  WorkspaceResponse,
};
