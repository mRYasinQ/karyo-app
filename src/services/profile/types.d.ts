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

type ProfileResponse = ApiResponse<ProfileData>;

export type { ProfileResponse };
