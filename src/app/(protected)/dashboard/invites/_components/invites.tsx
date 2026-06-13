'use client';

import { useState } from 'react';

import PageLoader from '@/app/(protected)/dashboard/_components/page-loader';
import Icon from '@/components/common/icon';
import Pagination from '@/components/common/pagination';
import WorkspaceInviteService from '@/services/workspace-invite';

import InviteCard from './invite-card';

import { useQuery } from '@tanstack/react-query';

const Invites = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['workspace-invitations', page],
    queryFn: () =>
      WorkspaceInviteService.getInvitations({
        page,
        limit: 8,
        order: 'ASC',
      }),
    placeholderData: (previousData) => previousData,
  });

  const invitations = data?.data ?? [];
  const pagination = data?.pagination;

  if (isLoading && !isPlaceholderData) {
    return <PageLoader className="rounded-lg bg-white" />;
  }

  if (!invitations.length) return <EmptyInvites />;

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col divide-y divide-gray-100 rounded-lg bg-white p-12">
        {invitations.map((invite) => (
          <InviteCard key={invite.id} {...invite} />
        ))}
      </div>

      <Pagination
        page={page}
        pages={pagination?.pages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
};

const EmptyInvites = () => {
  return (
    <div className="flex min-h-400 w-full flex-col items-center justify-center gap-20 rounded-lg bg-white p-24">
      <div className="flex size-80 items-center justify-center rounded-full bg-gray-50 ring-8 ring-gray-50/50">
        <Icon
          name="icon-[basil--envelope-open-outline]"
          className="size-40 text-gray-400"
        />
      </div>
      <p className="text-body-md-400 text-center text-gray-500">
        در حال حاضر هیچ دعوت‌نامه‌ای ندارید.
      </p>
    </div>
  );
};

export default Invites;
