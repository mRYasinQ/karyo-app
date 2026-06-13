'use client';

import { useState } from 'react';

import EmptyState from '@/components/common/empty-state';
import Pagination from '@/components/common/pagination';
import WorkspaceInviteService from '@/services/workspace-invite';

import PageLoader from '../../_components/page-loader';
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

  if (!invitations.length) {
    return (
      <EmptyState
        icon="icon-[basil--envelope-open-outline]"
        description="در حال حاضر هیچ دعوتنامه‌ای ندارید."
        className="min-h-400 bg-white"
      />
    );
  }

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

export default Invites;
