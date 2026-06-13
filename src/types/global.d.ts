import type { EnvConfig } from '@/validations/env';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvConfig {}
  }

  type Nullable<T> = T | null;

  type BaseApiResponse = {
    status_code: number;
    message: string;
  };

  type ApiResponse<T> = BaseApiResponse & {
    data: T;
  };

  type ApiResponseWithPagination<T> = ApiResponse<T> & {
    pagination: {
      page: number;
      pages: number;
      total: number;
      limit: number;
      next_page: Nullable<number>;
      prev_page: Nullable<number>;
    };
  };

  type ApiResponseWithOptionalPagination<T> = ApiResponse<T> & {
    pagination?: {
      page: number;
      pages: number;
      total: number;
      limit: number;
      next_page: Nullable<number>;
      prev_page: Nullable<number>;
    };
  };

  type ApiErrorResponse = {
    status_code: number;
    error: string;
  };

  type ApiParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    order?: 'ASC' | 'DESC';
  };
}

export type {};
