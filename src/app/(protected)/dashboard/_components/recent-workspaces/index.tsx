'use client';

import Link from 'next/link';

import Icon from '@/components/common/icon';
import ROUTES from '@/lib/routes';
import WorkspaceService from '@/services/workpsace';

import PageLoader from '../page-loader';
import RecentWorkspace from './recent-workspace';

import { useQuery } from '@tanstack/react-query';

const RecentWorkspaces = () => {
  const { data: workspacesResponse, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => WorkspaceService.getWorkspaces({ limit: 5 }),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-200 items-center justify-center rounded-2xl border border-gray-200 bg-white p-16">
        <PageLoader />
      </div>
    );
  }

  const workspaces = workspacesResponse?.data || [];

  return (
    <div className="flex flex-col gap-20 rounded-2xl border border-gray-200 bg-white p-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex size-40 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
            <Icon name="icon-[basil--bookmark-solid]" className="icon-24" />
          </div>
          <h2 className="text-body-md-500 text-gray-900">میزکارهای من</h2>
        </div>
        <Link
          href={ROUTES.DASHBOARD.WORKSPACES.MAIN}
          className="text-body-sm-500 text-primary-500 hover:text-primary-600 transition-colors"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="flex flex-col gap-12">
        {workspaces.length ? (
          workspaces.map((workspace) => (
            <RecentWorkspace key={workspace.id} {...workspace} />
          ))
        ) : (
          <span className="text-gray text-body-md-400 text-center">
            میزکاری یافت نشد.
          </span>
        )}
      </div>
    </div>
  );
};

export default RecentWorkspaces;
