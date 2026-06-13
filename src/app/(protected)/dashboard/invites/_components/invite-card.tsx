'use client';

import Icon from '@/components/common/icon';
import WorkspaceLogo from '@/components/common/workspace-logo';
import Button from '@/components/ui/button';
import toast from '@/lib/toast';
import WorkspaceInviteService from '@/services/workspace-invite';
import type { WorkspaceInvitationData } from '@/services/workspace-invite/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type InviteItemProps = WorkspaceInvitationData;

const InviteCard = ({ name, slug, logo }: InviteItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: respondToInvite, isPending } = useMutation({
    mutationFn: (accept: boolean) =>
      WorkspaceInviteService.respondToInvite(slug, { accept }),
    onSuccess: async (_, accept) => {
      toast.success(
        accept ? 'دعوت‌نامه با موفقیت پذیرفته شد.' : 'دعوت‌نامه رد شد.',
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['workspace-invitations'] }),
        accept && queryClient.invalidateQueries({ queryKey: ['workspaces'] }),
      ]);
    },
    onError: () => {
      toast.error('خطایی در ثبت پاسخ رخ داد.');
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
    <div className="flex flex-col gap-16 px-12 py-16 first:pt-4 last:pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-12">
        <WorkspaceLogo
          src={logo}
          alt={name}
          fallback={name.charAt(0)}
          width={48}
          height={48}
          className="size-48"
        />
        <span className="text-body-md-400 text-gray-900">
          شما به میزکار <span className="font-semibold">{name}</span> دعوت
          شده‌اید.
        </span>
      </div>

      <div className="flex items-center gap-8 max-sm:w-full">
        <Button
          variant="secondary"
          mode="soft"
          className="max-sm:flex-1"
          onClick={decilineInviteHandler}
        >
          <Icon name="icon-[basil--cross-solid]" className="ml-8 size-22" />
          رد دعوت
        </Button>
        <Button
          variant="primary"
          className="max-sm:flex-1"
          onClick={acceptInviteHandler}
        >
          <Icon name="icon-[basil--check-solid]" className="ml-8 size-22" />
          پذیرفتن
        </Button>
      </div>
    </div>
  );
};

export default InviteCard;
