import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import WorkspaceLogo from '@/components/common/workspace-logo';
import Button from '@/components/ui/button';
import ROUTES from '@/lib/routes';
import toast from '@/lib/toast';
import type { PrivateWorkspaceData } from '@/services/workpsace/types';
import WorkspaceMemberService from '@/services/workspace-member';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type WorkspaceHeaderProps = PrivateWorkspaceData;

const WorkspaceHeader = ({
  name,
  slug,
  logo,
  workspace_role,
}: WorkspaceHeaderProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const isOwner = workspace_role === 'owner';

  const { mutate: leaveWorkspace, isPending } = useMutation({
    mutationFn: () => WorkspaceMemberService.leaveWorkspace(slug),
    onSuccess: async () => {
      toast.success('با موفقیت از میزکار خارج شدید.');
      await queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      router.push(ROUTES.DASHBOARD.WORKSPACES.MAIN);
    },
    onError: () => {
      toast.error('مشکلی در خروج از میزکار به وجود آمد.');
    },
  });

  const leaveWorkspaceHandler = () => {
    if (isPending) return;
    leaveWorkspace();
  };

  return (
    <div className="flex flex-col gap-20 rounded-lg bg-white p-24 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-16">
        <WorkspaceLogo
          src={logo}
          alt={name}
          fallback={name.charAt(0)}
          width={64}
          height={64}
          priority
          className="size-64 bg-white"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-subheading-04 text-gray-900">{name}</h2>
          <span className="text-body-sm-400 text-gray-500" dir="ltr">
            @{slug}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-12 max-sm:w-full">
        {isOwner ? (
          <Button
            variant="secondary"
            className="flex items-center gap-8 max-sm:w-full"
          >
            <Icon
              name="icon-[basil--settings-alt-solid]"
              className="ml-8 size-20"
            />
            تنظیمات میزکار
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="flex items-center gap-8 max-sm:w-full"
            onClick={leaveWorkspaceHandler}
          >
            <Icon name="icon-[basil--logout-solid]" className="ml-8 size-20" />
            خروج از میزکار
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHeader;
