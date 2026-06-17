'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import PageLoader from '@/app/(protected)/dashboard/_components/page-loader';
import EmptyState from '@/components/common/empty-state';
import Icon from '@/components/common/icon';
import Pagination from '@/components/common/pagination';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import ProjectService from '@/services/projects';
import type { WorkspaceRole } from '@/services/workpsace/types';

import WorkspaceProject from './workspace-project';

import { useQuery } from '@tanstack/react-query';

const CreateProjectDialog = dynamic(() => import('./create-project-dialog'), {
  ssr: false,
});

type WorkspaceProjectsProps = {
  workspaceId: number;
  workspaceSlug: string;
  currentUserRole: WorkspaceRole;
};

const WorkspaceProjects = ({
  workspaceId,
  workspaceSlug,
  currentUserRole,
}: WorkspaceProjectsProps) => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['projects', workspaceId, page, debouncedSearch],
    queryFn: () =>
      ProjectService.getProjects(workspaceId, {
        page,
        limit: 6,
        search: debouncedSearch || undefined,
      }),
    placeholderData: (previousData) => previousData,
  });

  const projects = data?.data ?? [];
  const pagination = data?.pagination;

  const isOwner = currentUserRole === 'owner';
  const isAdmin = currentUserRole === 'admin';

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center justify-between gap-16 rounded-lg bg-white p-20 sm:flex-row">
        <Input
          placeholder="جستجوی پروژه..."
          dir="rtl"
          className="w-full sm:w-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {(isOwner || isAdmin) && (
          <Button
            variant="primary"
            className="max-sm:w-full"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Icon name="icon-[basil--add-solid]" className="icon-20 ml-8" />
            ایجاد پروژه جدید
          </Button>
        )}
      </div>

      {isLoading && !isPlaceholderData ? (
        <PageLoader className="min-h-400 rounded-lg bg-white" />
      ) : projects.length ? (
        <>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <WorkspaceProject
                key={project.id}
                {...project}
                workspaceSlug={workspaceSlug}
              />
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
          icon="icon-[basil--clipboard-outline]"
          description={
            debouncedSearch
              ? 'پروژه‌ای با این مشخصات یافت نشد.'
              : 'هنوز هیچ پروژه‌ای در این میزکار ایجاد نشده است.'
          }
          className="min-h-400 bg-white"
        />
      )}

      <CreateProjectDialog
        workspaceId={workspaceId}
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default WorkspaceProjects;
