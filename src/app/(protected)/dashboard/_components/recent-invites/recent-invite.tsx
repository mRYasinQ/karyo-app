'use client';

import Icon from '@/components/common/icon';
import Avatar from '@/components/ui/avatar';
import IconButton from '@/components/ui/icon-button';
import toast from '@/lib/toast';
import WorkspaceInviteService from '@/services/workspace-invite';
import type { WorkspaceInvitationData } from '@/services/workspace-invite/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type RecentInviteProps = WorkspaceInvitationData;

const RecentInvite = ({ logo, name, slug }: RecentInviteProps) => {
  const queryClient = useQueryClient();

  const { mutate: respondToInvite, isPending } = useMutation({
    mutationFn: (accept: boolean) => {
      return WorkspaceInviteService.respondToInvite(slug, { accept });
    },
    onSuccess: async (_, accept) => {
      toast.success(
        accept ? 'با موفقیت به میزکار پیوستید.' : 'دعوت‌نامه رد شد.',
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['invitations'] }),
        accept && queryClient.invalidateQueries({ queryKey: ['workspaces'] }),
      ]);
    },
    onError: () => {
      toast.error('مشکلی در ثبت پاسخ به وجود آمد.');
    },
  });

  const acceptInviteHandler = () => {
    if (isPending) return;
    respondToInvite(true);
  };

  const decilineInviteHandler = () => {
    if (isPending) return;
    respondToInvite(false);
  };

  return (
    <div className="flex flex-col gap-16 rounded-xl border border-gray-100 bg-gray-50 p-12 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-12">
        <Avatar src={logo ?? undefined} fallback={name} size={32} />
        <span className="text-body-sm-500 text-gray-800">{name}</span>
      </div>

      <div className="flex items-center gap-8">
        <IconButton variant="success" size="sm" onClick={acceptInviteHandler}>
          <Icon name="icon-[basil--check-solid]" />
        </IconButton>
        <IconButton variant="error" size="sm" onClick={decilineInviteHandler}>
          <Icon name="icon-[basil--cross-solid]" />
        </IconButton>
      </div>
    </div>
  );
};

export default RecentInvite;
