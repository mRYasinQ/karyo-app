import type { WorkspaceRole } from '../workpsace/types';

type WorkspaceMemberData = {
  id: number;
  first_name: Nullable<string>;
  last_name: Nullable<string>;
  username: string;
  avatar: Nullable<string>;
  birthday: Nullable<string>;
  workspace_role: WorkspaceRole;
  is_active: boolean;
  joined_at: string;
};

type GetWorkspaceMembersParams = ApiParams & {
  search?: string;
  is_active?: boolean;
  role?: WorkspaceRole;
};

type UpdateWorkspaceMemberPayload = {
  role: Omit<WorkspaceRole, 'owner'>;
};

type WorkspaceMembersResponse = ApiResponseWithOptionalPagination<
  WorkspaceMemberData[]
>;

export type {
  WorkspaceMemberData,
  GetWorkspaceMembersParams,
  WorkspaceMembersResponse,
  UpdateWorkspaceMemberPayload,
};
