import envSchema from '@/validations/env';

const validatedConfig = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

const appConfig = {
  node_env: validatedConfig.NODE_ENV,
  api: {
    base_url: validatedConfig.NEXT_PUBLIC_API_URL,
  },
  time: {
    otpResendCooldown: 180,
  },
};

export default appConfig;
