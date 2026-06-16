import { withCleanFields } from '@/lib/utils';

import { z } from 'zod';

const projectSchema = z.object({
  name: z
    .string('نام پروژه باید رشته باشد.')
    .min(2, 'نام پروژه باید حداقل ۲ کاراکتر باشد.')
    .max(50, 'نام پروژه می‌تواند حداکثر ۵۰ کاراکتر باشد.'),
  description: z
    .string('توضیحات باید رشته باشد.')
    .max(200, 'توضیحات می‌تواند حداکثر ۲۰۰ کاراکتر باشد.')
    .nullable()
    .optional(),
  is_archived: z.boolean().optional(),
  start_date: z.iso
    .date('تاریخ تولد باید یک تاریخ معتبر باشد.')
    .nullable()
    .optional(),
  end_date: z.iso
    .date('تاریخ تولد باید یک تاریخ معتبر باشد.')
    .nullable()
    .optional(),
});

const createProjectSchema = withCleanFields(projectSchema);
const updateProjectSchema = withCleanFields(projectSchema.partial());

type CreateProjectData = z.infer<typeof createProjectSchema>;
type UpdateProjectData = z.infer<typeof updateProjectSchema>;

export type { CreateProjectData, UpdateProjectData };
export { createProjectSchema, updateProjectSchema };
export default projectSchema;
