'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import EmptyState from '@/components/common/empty-state';
import Icon from '@/components/common/icon';
import Pagination from '@/components/common/pagination';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import ROUTES from '@/lib/routes';
import WorkspaceService from '@/services/workpsace';

import PageLoader from '../../_components/page-loader';
import WorkspaceCard from './workspace-card';

import { useQuery } from '@tanstack/react-query';

const Workspaces = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

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
    <div className="flex flex-col gap-22">
      <div className="flex flex-col items-center justify-between gap-16 rounded-lg bg-white p-20 sm:flex-row">
        <Input
          placeholder="جستجوی میزکار..."
          dir="rtl"
          className="w-full sm:w-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="flex items-center gap-8 max-sm:w-full"
          nativeButton={false}
          render={<Link href={ROUTES.DASHBOARD.WORKSPACES.CREATE} />}
        >
          <Icon name="icon-[basil--plus-solid]" className="icon-24" />
          ایجاد میزکار
        </Button>
      </div>

      {isLoading && !isPlaceholderData ? (
        <PageLoader className="rounded-lg bg-white" />
      ) : workspaces.length ? (
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
      ) : (
        <EmptyState
          icon="icon-[basil--folder-open-outline]"
          description="هیچ میزکاری یافت نشد. برای شروع یک میزکار جدید ایجاد کنید."
          className="min-h-400 bg-white"
        />
      )}
    </div>
  );
};

export default Workspaces;
