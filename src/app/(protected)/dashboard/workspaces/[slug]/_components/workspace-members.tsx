'use client';

import { useState } from 'react';

import Icon from '@/components/common/icon';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import useDebounce from '@/hooks/use-debounce';
import toast from '@/lib/toast';
import type { WorkspaceRole } from '@/services/workpsace/types';
import WorkspaceMemberService from '@/services/workspace-member';

import PageLoader from '../../../_components/page-loader';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const ROLE_LABELS: Record<WorkspaceRole, string> = {
  owner: 'مالک',
  admin: 'مدیر',
  member: 'عضو',
  guest: 'مهمان',
};

type WorkspaceMembersProps = {
  slug: string;
  currentUserRole: WorkspaceRole;
};

type UpdateRolePayload = {
  memberId: number;
  role: WorkspaceRole;
};

const WorkspaceMembers = ({ slug, currentUserRole }: WorkspaceMembersProps) => {
  const [search, setSearch] = useState<string>('');

  const queryClient = useQueryClient();

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery({
    queryKey: ['workspace-members', slug, debouncedSearch],
    queryFn: () =>
      WorkspaceMemberService.getMembers(slug, {
        search: debouncedSearch || undefined,
      }),
  });

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

  const members = data?.data ?? [];

  const isOwner = currentUserRole === 'owner';
  const isAdmin = currentUserRole === 'admin';

  const canChangeRole = (memberRole: WorkspaceRole) =>
    isOwner && memberRole !== 'owner';

  const canDelete = (memberRole: WorkspaceRole) => {
    if (memberRole === 'owner') return false;
    if (isOwner) return true;
    if (isAdmin && memberRole !== 'admin') return true;
    return false;
  };

  return (
    <div className="flex flex-col gap-22">
      <div className="flex flex-col items-center justify-between gap-16 rounded-lg bg-white p-20 sm:flex-row">
        <Input
          placeholder="جستجوی عضو..."
          dir="rtl"
          className="w-full sm:w-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {(isOwner || isAdmin) && (
          <Button
            variant="primary"
            className="flex items-center gap-8 max-sm:w-full"
          >
            <Icon name="icon-[basil--plus-solid]" className="size-24" />
            دعوت عضو جدید
          </Button>
        )}
      </div>

      {isLoading ? (
        <PageLoader />
      ) : members.length ? (
        <div className="flex flex-col divide-y divide-gray-100 rounded-lg bg-white p-12">
          {members.map(
            ({
              id,
              first_name,
              last_name,
              username,
              avatar,
              workspace_role,
            }) => {
              const firstName = first_name ?? '';
              const lastName = last_name ?? '';

              const fullName = `${firstName} ${lastName}`.trim() || username;

              return (
                <div
                  key={id}
                  className="flex items-center justify-between px-12 py-16 first:pt-4 last:pb-4"
                >
                  <div className="flex items-center gap-12">
                    <Avatar
                      src={avatar ?? '/images/avatar-placeholder.webp'}
                      alt={fullName}
                      fallback={fullName}
                    />
                    <span className="text-body-md-500 text-gray-900">
                      {fullName}
                    </span>
                  </div>

                  <div className="flex items-center gap-8">
                    {canChangeRole(workspace_role) ? (
                      <Select
                        value={workspace_role}
                        onValueChange={(val) =>
                          updateRoleMember({
                            memberId: id,
                            role: val as WorkspaceRole,
                          })
                        }
                        options={[
                          { label: ROLE_LABELS.admin, value: 'admin' },
                          { label: ROLE_LABELS.member, value: 'member' },
                          { label: ROLE_LABELS.guest, value: 'guest' },
                        ]}
                        disabled={isPendingUpdateRole}
                        className="text-body-sm-500 w-120 border-gray-200 bg-gray-50 px-12 py-6"
                      />
                    ) : (
                      <span className="text-body-sm-500 rounded-md border border-gray-100 bg-gray-50 px-12 py-6 text-gray-500">
                        {ROLE_LABELS[workspace_role]}
                      </span>
                    )}

                    {canDelete(workspace_role) && (
                      <IconButton
                        onClick={() => removeMember(id)}
                        disabled={isPendingRemoveMember}
                        size="sm"
                        variant="secondary"
                        mode="ghost"
                      >
                        <Icon
                          name="icon-[basil--trash-solid]"
                          className="size-20"
                        />
                      </IconButton>
                    )}
                  </div>
                </div>
              );
            },
          )}
        </div>
      ) : (
        <EmptyWorkspaceMembers />
      )}
    </div>
  );
};

const EmptyWorkspaceMembers = () => {
  return (
    <div className="text-body-md-500 py-40 text-center text-gray-500">
      هیچ عضوی یافت نشد.
    </div>
  );
};

export default WorkspaceMembers;
