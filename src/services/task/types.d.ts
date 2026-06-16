type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

type TaskAssignee = {
  id: number;
  created_at: string;
  first_name: Nullable<string>;
  last_name: Nullable<string>;
  username: string;
  avatar: Nullable<string>;
};

type TaskData = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: Nullable<string>;
  status: TaskStatus;
  due_date: Nullable<string>;
  assignee: Nullable<TaskAssignee>;
};

type GetTasksParams = ApiParams & {
  sort_by?: string;
  order?: 'ASC' | 'DESC';
  search?: string;
  status?: TaskStatus;
  assignee_id?: number;
};

type CreateTaskPayload = {
  title: string;
  description?: Nullable<string>;
  due_date?: Nullable<string>;
  status?: TaskStatus;
  assignee_id?: Nullable<number>;
};

type UpdateTaskPayload = Partial<CreateTaskPayload>;

type UpdateTaskStatusPayload = {
  status: TaskStatus;
};

type TasksResponse = ApiResponseWithPagination<TaskData[]>;
type TaskResponse = ApiResponse<TaskData>;

export type {
  TaskStatus,
  TaskAssignee,
  TaskData,
  GetTasksParams,
  CreateTaskPayload,
  UpdateTaskPayload,
  UpdateTaskStatusPayload,
  TasksResponse,
  TaskResponse,
};
