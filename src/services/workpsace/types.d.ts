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

type WorkspacesResponse = ApiResponseWithPagination<WorkspaceData[]>;
type WorkspaceResponse = ApiResponse<WorkspaceData>;

export type {
  WorkspaceData,
  GetWorkspacesParams,
  WorkspacesResponse,
  WorkspaceResponse,
};
