import Icon from '@/components/common/icon';
import WorkspaceLogo from '@/components/common/workspace-logo';
import Button from '@/components/ui/button';
import type { PrivateWorkspaceData } from '@/services/workpsace/types';

type WorkspaceHeaderProps = PrivateWorkspaceData;

const WorkspaceHeader = ({
  name,
  slug,
  logo,
  workspace_role,
}: WorkspaceHeaderProps) => {
  const isOwner = workspace_role === 'owner';

  return (
    <div className="flex flex-col gap-20 rounded-lg bg-white p-24 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-16">
        <WorkspaceLogo
          src={logo}
          alt={name}
          fallback={name.charAt(0)}
          width={64}
          height={64}
          className="size-64 bg-white"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-subheading-04 text-gray-900">{name}</h2>
          <span className="text-body-sm-400 text-gray-500" dir="ltr">
            @{slug}
          </span>
        </div>
      </div>

      <Button
        variant="secondary"
        className="flex items-center gap-8 max-sm:w-full"
      >
        <Icon
          name={
            isOwner
              ? 'icon-[basil--settings-alt-solid]'
              : 'icon-[basil--logout-solid]'
          }
          className="ml-8 size-20"
        />
        {isOwner ? 'تنظیمات میزکار' : 'خروج از میزکار'}
      </Button>
    </div>
  );
};

export default WorkspaceHeader;
