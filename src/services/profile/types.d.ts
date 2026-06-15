type RoleData = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  permissions: string[];
};

type ProfileData = {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: Nullable<string>;
  last_name: Nullable<string>;
  username: string;
  email: string;
  avatar: Nullable<string>;
  is_active: boolean;
  is_email_verified: boolean;
  role: RoleData;
  birthday: Nullable<string>;
};

type UpdateProfilePayload = {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  password?: string;
  birthday?: string;
  avatar?: Nullable<File>;
};

type ProfileResponse = ApiResponse<ProfileData>;

export type { ProfileData, ProfileResponse, RoleData, UpdateProfilePayload };
