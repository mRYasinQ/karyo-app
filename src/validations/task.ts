import { withCleanFields } from '@/lib/utils';

import { z } from 'zod';

const taskStatusValues = ['todo', 'in_progress', 'review', 'done'] as const;

const taskSchema = z.object({
  title: z
    .string('عنوان تسک باید رشته باشد.')
    .min(1, 'عنوان تسک الزامی است.')
    .max(100, 'عنوان تسک می‌تواند حداکثر ۱۰۰ کاراکتر باشد.'),
  description: z
    .string('توضیحات باید رشته باشد.')
    .max(500, 'توضیحات می‌تواند حداکثر ۵۰۰ کاراکتر باشد.')
    .nullable()
    .optional(),
  status: z.enum(taskStatusValues),
  due_date: z.string('تاریخ سررسید باید رشته باشد.').nullable().optional(),
  assignee_id: z.number().nullable().optional(),
});

const createTaskSchema = taskSchema;
const updateTaskSchema = withCleanFields(taskSchema.partial());

type CreateTaskData = z.infer<typeof createTaskSchema>;
type UpdateTaskData = z.infer<typeof updateTaskSchema>;

export type { CreateTaskData, UpdateTaskData };
export { createTaskSchema, updateTaskSchema };
export default taskSchema;
