type GetWorkspacesParams = ApiParams & {
  search?: string;
};

type WorkspaceRole = 'owner' | 'admin' | 'member' | 'guest';
type PrivateWorkspaceData = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  logo: Nullable<string>;
  workspace_role: WorkspaceRole;
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

type WorkspacesResponse = ApiResponseWithPagination<PrivateWorkspaceData[]>;
type WorkspaceResponse = ApiResponse<PrivateWorkspaceData>;

export type {
  PrivateWorkspaceData,
  GetWorkspacesParams,
  CreateWorkspacePayload,
  UpdateWorkspacePayload,
  WorkspacesResponse,
  WorkspaceResponse,
};
