import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),

  NEXT_PUBLIC_API_URL: z.url(),
});

type EnvConfig = z.infer<typeof envSchema>;

export type { EnvConfig };
export default envSchema;
