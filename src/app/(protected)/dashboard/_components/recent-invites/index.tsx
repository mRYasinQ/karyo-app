'use client';

import Icon from '@/components/common/icon';
import WorkspaceInviteService from '@/services/workspace-invite';

import PageLoader from '../page-loader';
import RecentInvite from './recent-invite';

import { useQuery } from '@tanstack/react-query';

const RecentInvites = () => {
  const { data: invitesResponse, isLoading } = useQuery({
    queryKey: ['invitations'],
    queryFn: () => WorkspaceInviteService.getInvitations({ limit: 5 }),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-200 items-center justify-center rounded-2xl border border-gray-200 bg-white p-16">
        <PageLoader />
      </div>
    );
  }

  const invites = invitesResponse?.data || [];

  return (
    <div className="flex flex-col gap-20 rounded-2xl border border-gray-200 bg-white p-24">
      <div className="flex items-center gap-12">
        <div className="flex size-40 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
          <Icon name="icon-[basil--envelope-outline]" className="icon-24" />
        </div>
        <h2 className="text-body-md-500 text-gray-900">دعوت‌نامه‌های اخیر</h2>
      </div>

      <div className="flex flex-col gap-12">
        {invites.length ? (
          invites.map((workspace) => (
            <RecentInvite key={workspace.id} {...workspace} />
          ))
        ) : (
          <span className="text-gray text-body-md-400 text-center">
            دعوت‌نامه‌ای یافت نشد.
          </span>
        )}
      </div>
    </div>
  );
};

export default RecentInvites;
