import { withCleanFields } from '@/lib/utils';

import { slugSchema } from './base';
import { emailSchema } from './user';

import { z } from 'zod';

const workspaceSchema = z.object({
  name: z
    .string('نام میزکار باید رشته باشد.')
    .min(2, 'نام میزکار باید حداقل ۲ کاراکتر باشد.')
    .max(50, 'نام میزکار می‌تواند حداکثر ۵۰ کاراکتر باشد.'),
  slug: slugSchema,
  logo: z.file().nullable().optional(),
  description: z
    .string('توضیحات باید رشته باشد.')
    .max(200, 'توضیحات می‌تواند حداکثر ۲۰۰ کاراکتر باشد.')
    .nullable()
    .optional(),
});

const updateWorkspaceSchema = withCleanFields(
  workspaceSchema.omit({ slug: true }).partial(),
);

const inviteMemberSchema = z.object({
  email: emailSchema,
});

type WorkspaceData = z.infer<typeof workspaceSchema>;
type UpdateWorkspaceData = z.infer<typeof updateWorkspaceSchema>;
type InviteMemberData = z.infer<typeof inviteMemberSchema>;

export type { WorkspaceData, UpdateWorkspaceData, InviteMemberData };
export { updateWorkspaceSchema, inviteMemberSchema };
export default workspaceSchema;
