type WorkspaceInvitationData = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  logo: Nullable<string>;
  description: string;
};

type GetInvitationsParams = ApiParams;

type InviteUserPayload = {
  email: string;
};

type RespondInvitePayload = {
  accept: boolean;
};

type InvitationsResponse = ApiResponseWithPagination<WorkspaceInvitationData[]>;

export type {
  WorkspaceInvitationData,
  GetInvitationsParams,
  InviteUserPayload,
  RespondInvitePayload,
  InvitationsResponse,
};
