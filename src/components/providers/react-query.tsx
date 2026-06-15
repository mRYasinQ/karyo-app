'use client';

import { type PropsWithChildren, useState } from 'react';

import ApiError from '@/lib/api-error';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createRetryPolicy = (maxRetries: number) => {
  return (failureCount: number, error: Error) => {
    const apiError = error as ApiError;
    if (apiError?.statusCode >= 400 && apiError?.statusCode < 500) {
      return false;
    }
    return failureCount < maxRetries;
  };
};

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: createRetryPolicy(2),
            retryDelay: (attemptIndex) => {
              return Math.min(1000 * 2 ** attemptIndex, 30000);
            },
          },
          mutations: {
            retry: createRetryPolicy(1),
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
