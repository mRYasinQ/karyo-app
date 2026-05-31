'use client';

import { useEffect, useState } from 'react';

import Icon from '@/components/common/icon';
import Pagination from '@/components/common/pagination';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import WorkspaceService from '@/services/workpsace';

import PageLoader from '../../_components/page-loader';
import WorkspaceCard from './workspace-card';

import { useQuery } from '@tanstack/react-query';

const Workspaces = () => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timerId);
  }, [search]);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['workspaces', page, debouncedSearch],
    queryFn: () =>
      WorkspaceService.getWorkspaces({
        page,
        search: debouncedSearch || undefined,
        limit: 12,
      }),
    placeholderData: (previousData) => previousData,
  });

  const workspaces = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col gap-22">
      <div className="flex flex-col items-center justify-between gap-16 rounded-lg bg-white p-20 sm:flex-row">
        <Input
          placeholder="جستجوی میزکار..."
          dir="rtl"
          className="w-full sm:w-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="flex items-center gap-8 max-sm:w-full">
          <Icon name="icon-[basil--plus-solid]" className="size-24" />
          ایجاد میزکار
        </Button>
      </div>

      {isLoading && !isPlaceholderData ? (
        <PageLoader className="rounded-lg bg-white" />
      ) : workspaces.length === 0 ? (
        <div className="flex min-h-400 w-full flex-col items-center justify-center gap-20 rounded-lg bg-white p-24">
          <div className="flex size-80 items-center justify-center rounded-full bg-gray-50 ring-8 ring-gray-50/50">
            <Icon
              name="icon-[basil--folder-open-outline]"
              className="size-40 text-gray-400"
            />
          </div>
          <p className="text-body-md-400 text-center text-gray-500">
            هیچ میزکاری یافت نشد. برای شروع یک میزکار جدید ایجاد کنید.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workspaces.map((workspace) => (
              <WorkspaceCard key={workspace.id} {...workspace} />
            ))}
          </div>

          <Pagination
            page={page}
            pages={pagination?.pages ?? 1}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Workspaces;
