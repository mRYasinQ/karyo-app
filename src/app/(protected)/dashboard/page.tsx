import type { Metadata } from 'next';

import RecentInvites from './_components/recent-invites';
import RecentWorkspaces from './_components/recent-workspaces';

export const metadata: Metadata = {
  title: 'پیش‌خوان',
};

export default function DashboardPage() {
  return (
    <div className="m-20 grid grid-cols-1 gap-24 lg:grid-cols-12">
      <div className="flex flex-col gap-24 lg:col-span-6">
        <RecentWorkspaces />
      </div>
      <div className="flex flex-col gap-24 lg:col-span-6">
        <RecentInvites />
      </div>
    </div>
  );
}
