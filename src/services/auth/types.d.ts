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

type LoginData = {
  email: string;
  token: string;
};

type LoginResponse = ApiResponse<LoginData>;
type OtpResponse = ApiResponse<{ email: string }>;
type VerifyOtpResponse = ApiResponse<{ email: string; verified: boolean }>;
type LogoutResponse = BaseApiResponse;

export type {
  LoginPayload,
  ChoosePasswordPayload,
  SendOtpPayload,
  VerifyOtpPayload,
  LoginResponse,
  OtpResponse,
  VerifyOtpResponse,
  LogoutResponse,
};
