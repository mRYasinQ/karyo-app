type ProjectData = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: Nullable<string>;
  is_archived: boolean;
  start_date: Nullable<string>;
  end_date: Nullable<string>;
  workspace: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    logo: Nullable<string>;
    description: Nullable<string>;
  };
};

type GetProjectsParams = ApiParams & {
  search?: string;
  is_archived?: boolean;
  start_date?: string;
  end_date?: string;
};

type ProjectPayload = {
  name: string;
  slug: string;
  description?: Nullable<string>;
  is_archived?: boolean;
  start_date?: Nullable<string>;
  end_date?: Nullable<string>;
};

type CreateProjectPayload = ProjectPayload;
type UpdateProjectPayload = Partial<ProjectPayload>;

type ProjectsResponse = ApiResponseWithPagination<ProjectData[]>;
type ProjectResponse = ApiResponse<ProjectData>;

export type {
  ProjectData,
  GetProjectsParams,
  CreateProjectPayload,
  UpdateProjectPayload,
  ProjectsResponse,
  ProjectResponse,
};
