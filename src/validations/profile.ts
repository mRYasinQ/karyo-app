import { withCleanFields } from '@/lib/utils';

import userSchema from './user';

import { z } from 'zod';

const updateProfileSchema = withCleanFields(
  userSchema.omit({ password: true }).partial(),
);
type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export type { UpdateProfileData };
export { updateProfileSchema };
