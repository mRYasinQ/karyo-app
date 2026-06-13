'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import PageLoader from '@/app/(protected)/dashboard/_components/page-loader';
import EmptyState from '@/components/common/empty-state';
import Icon from '@/components/common/icon';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import type { WorkspaceRole } from '@/services/workpsace/types';
import WorkspaceMemberService from '@/services/workspace-member';

import WorkspaceMember from './workspace-member';

import { useQuery } from '@tanstack/react-query';

const InviteMemberDialog = dynamic(() => import('./invite-member-dialog'), {
  ssr: false,
});

type WorkspaceMembersProps = {
  slug: string;
  currentUserRole: WorkspaceRole;
};

const WorkspaceMembers = ({ slug, currentUserRole }: WorkspaceMembersProps) => {
  const [search, setSearch] = useState<string>('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery({
    queryKey: ['workspace-members', slug, debouncedSearch],
    queryFn: () =>
      WorkspaceMemberService.getMembers(slug, {
        search: debouncedSearch || undefined,
      }),
  });

  const members = data?.data ?? [];

  const isOwner = currentUserRole === 'owner';
  const isAdmin = currentUserRole === 'admin';

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
            onClick={() => setIsInviteDialogOpen(true)}
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
          {members.map((member) => (
            <WorkspaceMember
              key={member.id}
              slug={slug}
              currentUserRole={currentUserRole}
              {...member}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          description="هیچ عضوی یافت نشد."
          className="text-body-md-500 py-40"
        />
      )}

      <InviteMemberDialog
        slug={slug}
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
      />
    </div>
  );
};

export default WorkspaceMembers;
