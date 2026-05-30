import userSchema from './user';

import { z } from 'zod';

const updateProfileSchema = userSchema.omit({ password: true }).partial();
type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export type { UpdateProfileData };
export { updateProfileSchema };
