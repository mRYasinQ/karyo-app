type LoginPayload = {
  email: string;
  password: string;
};

type ChoosePasswordPayload = {
  email: string;
  otp: string;
  password: string;
};

type SendOtpPayload = {
  email: string;
};

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

type VerifyEmailPayload = {
  otp: string;
};

type LoginData = {
  email: string;
  token: string;
};

type LoginResponse = ApiResponse<LoginData>;
type OtpResponse = ApiResponse<{ email: string }>;
type VerifyOtpResponse = ApiResponse<{ email: string; verified: boolean }>;
type VerifyEmailResponse = ApiResponse<{
  email: string;
  is_email_verified: boolean;
}>;

export type {
  LoginPayload,
  ChoosePasswordPayload,
  SendOtpPayload,
  VerifyOtpPayload,
  VerifyEmailPayload,
  LoginResponse,
  OtpResponse,
  VerifyOtpResponse,
  VerifyEmailResponse,
};
