'use client';

import Icon from '@/components/common/icon';
import Avatar from '@/components/ui/avatar';
import IconButton from '@/components/ui/icon-button';
import Select from '@/components/ui/select';
import toast from '@/lib/toast';
import type { WorkspaceRole } from '@/services/workpsace/types';
import WorkspaceMemberService from '@/services/workspace-member';
import type { WorkspaceMemberData } from '@/services/workspace-member/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const ROLE_LABELS: Record<WorkspaceRole, string> = {
  owner: 'مالک',
  admin: 'مدیر',
  member: 'عضو',
  guest: 'مهمان',
};

type WorkspaceMemberProps = WorkspaceMemberData & {
  slug: string;
  currentUserRole: WorkspaceRole;
};

type UpdateRolePayload = {
  memberId: number;
  role: WorkspaceRole;
};

const WorkspaceMember = ({
  slug,
  currentUserRole,
  id,
  first_name,
  last_name,
  username,
  avatar,
  workspace_role,
  is_active,
}: WorkspaceMemberProps) => {
  const queryClient = useQueryClient();

  const { mutate: updateRoleMember, isPending: isPendingUpdateRole } =
    useMutation({
      mutationFn: ({ memberId, role }: UpdateRolePayload) =>
        WorkspaceMemberService.updateMemberRole(slug, memberId, { role }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['workspace-members', slug],
        });
      },
      onError: () => {
        toast.error('مشکلی در بروزرسانی نقش کاربر وجود داشت.');
      },
    });

  const { mutate: removeMember, isPending: isPendingRemoveMember } =
    useMutation({
      mutationFn: (memberId: number) =>
        WorkspaceMemberService.removeMember(slug, memberId),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['workspace-members', slug],
        });
      },
      onError: () => {
        toast.error('مشکلی در حذف کاربر از میزکار وجود داشت.');
      },
    });

  const firstName = first_name ?? '';
  const lastName = last_name ?? '';
  const fullName = `${firstName} ${lastName}`.trim() || username;

  const isOwner = currentUserRole === 'owner';
  const isAdmin = currentUserRole === 'admin';

  const canChangeRole = (memberRole: WorkspaceRole) => {
    return isOwner && memberRole !== 'owner';
  };

  const canDelete = (memberRole: WorkspaceRole) => {
    if (memberRole === 'owner') return false;
    if (isOwner) return true;
    if (isAdmin && memberRole !== 'admin') return true;
    return false;
  };

  const roleChangeHandler = (val: string) => {
    if (isPendingUpdateRole) return;
    updateRoleMember({
      memberId: id,
      role: val as WorkspaceRole,
    });
  };

  const removeMemberHandler = () => {
    if (isPendingRemoveMember) return;
    removeMember(id);
  };

  return (
    <div className="flex items-center justify-between px-12 py-16 first:pt-4 last:pb-4">
      <div className="flex items-center gap-12">
        <Avatar
          src={avatar ?? '/images/avatar-placeholder.webp'}
          alt={fullName}
          fallback={fullName}
        />
        <div className="flex flex-col gap-4">
          <span className="text-body-md-500 text-gray-900">{fullName}</span>
          {!is_active && (
            <span className="text-body-sm-400 text-gray-400">
              درحال دعوت...
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8">
        {is_active && canChangeRole(workspace_role) ? (
          <Select
            value={workspace_role}
            onValueChange={roleChangeHandler}
            options={[
              { label: ROLE_LABELS.admin, value: 'admin' },
              { label: ROLE_LABELS.member, value: 'member' },
              { label: ROLE_LABELS.guest, value: 'guest' },
            ]}
            className="text-body-sm-500 w-120 border-gray-200 bg-gray-50 px-12 py-6"
          />
        ) : (
          <span className="text-body-sm-500 rounded-md border border-gray-100 bg-gray-50 px-12 py-6 text-gray-500">
            {ROLE_LABELS[workspace_role]}
          </span>
        )}

        {canDelete(workspace_role) && (
          <IconButton
            onClick={removeMemberHandler}
            size="sm"
            variant="error"
            mode="ghost"
          >
            <Icon name="icon-[basil--trash-solid]" className="icon-20" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default WorkspaceMember;
