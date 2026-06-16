import type { TaskStatus } from '@/services/task/types';

const TASK_STATUSES: { name: string; value: TaskStatus }[] = [
  { name: 'برای انجام', value: 'todo' },
  { name: 'درحال انجام', value: 'in_progress' },
  { name: 'برای بررسی', value: 'review' },
  { name: 'انجام شده', value: 'done' },
] as const;

export { TASK_STATUSES };
