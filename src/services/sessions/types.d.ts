type SessionData = {
  id: number;
  created_at: string;
  updated_at: string;
  browser: string;
  os: string;
  is_current: boolean;
  expire_at: string;
};

type SessionsResponse = ApiResponseWithOptionalPagination<SessionData[]>;

export type { SessionData, SessionsResponse };
