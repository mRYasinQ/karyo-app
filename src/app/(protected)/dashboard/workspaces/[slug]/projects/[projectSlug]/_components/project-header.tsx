'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import IconButton from '@/components/ui/icon-button';
import ROUTES from '@/lib/routes';
import toast from '@/lib/toast';
import ProjectService from '@/services/projects';
import type { ProjectData } from '@/services/projects/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const UpdateProjectDialog = dynamic(() => import('./update-project-dialog'), {
  ssr: false,
});

type ProjectHeaderProps = ProjectData;

const ProjectHeader = (props: ProjectHeaderProps) => {
  const {
    id,
    name,
    is_archived,
    workspace: { id: workspaceId, slug: workspaceSlug, workspace_role },
  } = props;

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isOwner = workspace_role === 'owner';
  const isAdmin = workspace_role === 'admin';
  const canEdit = isOwner || isAdmin;

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: () => ProjectService.deleteProject(workspaceId, id),
    onSuccess: async () => {
      toast.success('پروژه با موفقیت حذف شد.');
      await queryClient.invalidateQueries({
        queryKey: ['projects', workspaceId],
      });
      router.replace(ROUTES.DASHBOARD.WORKSPACES.SHOW(workspaceSlug));
    },
    onError: () => {
      toast.error('مشکلی در حذف پروژه به وجود آمد.');
    },
  });

  const openSettingsHandler = () => {
    setIsSettingsOpen(true);
  };

  const removeProjectHandler = () => {
    if (isDeleting) return;
    deleteProject();
  };

  return (
    <>
      <div className="flex flex-col gap-16 rounded-lg bg-white p-16 sm:flex-row sm:items-center sm:justify-between sm:p-20">
        <div className="flex items-center gap-12 sm:gap-16">
          <div className="bg-primary-50 text-primary-600 flex size-40 shrink-0 items-center justify-center rounded-xl sm:size-44">
            <Icon
              name="icon-[basil--clipboard-outline]"
              className="icon-20 sm:icon-24"
            />
          </div>
          <div className="flex gap-6 max-sm:flex-col sm:items-center sm:gap-12">
            <h3 className="text-body-lg-500 sm:text-subheading-02 break-all text-gray-900">
              {name}
            </h3>
            <span className="text-caption-03 w-fit shrink-0 rounded-full bg-gray-100 px-8 py-4 font-medium text-gray-600">
              {is_archived ? 'بایگانی شده' : 'بایگانی نشده'}
            </span>
          </div>
        </div>

        {canEdit && (
          <div className="flex items-center justify-end gap-8 border-t border-gray-50 pt-12 sm:border-0 sm:pt-0">
            <IconButton
              variant="secondary"
              mode="ghost"
              size="sm"
              onClick={openSettingsHandler}
            >
              <Icon name="icon-[basil--settings-outline]" className="icon-24" />
            </IconButton>
            <IconButton
              variant="error"
              mode="ghost"
              size="sm"
              onClick={removeProjectHandler}
            >
              <Icon name="icon-[basil--trash-solid]" className="icon-24" />
            </IconButton>
          </div>
        )}
      </div>

      {canEdit && (
        <UpdateProjectDialog
          project={props}
          isOpen={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
        />
      )}
    </>
  );
};

export default ProjectHeader;
