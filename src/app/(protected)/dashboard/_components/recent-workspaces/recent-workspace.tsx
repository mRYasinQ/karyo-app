import Link from 'next/link';

import Icon from '@/components/common/icon';
import Avatar from '@/components/ui/avatar';
import ROUTES from '@/lib/routes';
import type { PrivateWorkspaceData } from '@/services/workpsace/types';

type RecentWorkspaceProps = PrivateWorkspaceData;

const RecentWorkspace = ({ logo, name, slug }: RecentWorkspaceProps) => {
  return (
    <Link
      href={ROUTES.DASHBOARD.WORKSPACES.SHOW(slug)}
      className="group hover:border-primary-100 hover:bg-primary-50/50 flex flex-col gap-16 rounded-xl border border-gray-100 bg-gray-50 p-12 transition-colors sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-12">
        <Avatar src={logo ?? undefined} fallback={name} size={32} />
        <span className="text-body-sm-500 group-hover:text-primary-700 text-gray-800 transition-colors">
          {name}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <Icon
          name="icon-[basil--caret-left-solid]"
          className="group-hover:text-primary-500 icon-20 text-gray-400 transition-transform group-hover:-translate-x-4"
        />
      </div>
    </Link>
  );
};

export default RecentWorkspace;
