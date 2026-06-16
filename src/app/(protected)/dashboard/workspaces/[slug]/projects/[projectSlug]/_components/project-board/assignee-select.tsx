'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/icon';
import Avatar from '@/components/ui/avatar';
import IconButton from '@/components/ui/icon-button';
import Input from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import type { TaskAssignee } from '@/services/task/types';
import WorkspaceMemberService from '@/services/workspace-member';

import { useQuery } from '@tanstack/react-query';
import { useOnClickOutside } from 'usehooks-ts';

type UserData = Pick<
  TaskAssignee,
  'id' | 'first_name' | 'last_name' | 'username' | 'avatar'
>;

type AssigneeSelectProps = {
  workspaceSlug: string;
  value?: Nullable<number>;
  onChange: (value: Nullable<number>) => void;
  initialUser?: Nullable<UserData>;
  placeholder?: string;
};

const AssigneeSelect = ({
  workspaceSlug,
  value,
  onChange,
  initialUser,
  placeholder = 'جستجوی نام یا نام کاربری...',
}: AssigneeSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<Nullable<UserData>>(
    initialUser || null,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef as RefObject<HTMLDivElement>, () => {
    setIsOpen(false);
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (value === null || value === undefined) {
      setSelectedUser(null);
      setSearchTerm('');
    }
  }, [value]);

  useEffect(() => {
    if (initialUser) setSelectedUser(initialUser);
  }, [initialUser]);

  const { data: searchResults, isFetching } = useQuery({
    queryKey: ['search-members', workspaceSlug, debouncedSearch],
    queryFn: () => {
      return WorkspaceMemberService.getMembers(workspaceSlug, {
        search: debouncedSearch,
        limit: 5,
      });
    },
    enabled: debouncedSearch.length > 1 && isOpen,
  });

  const selectHandler = (member: UserData) => {
    setSelectedUser(member);
    onChange(member.id);
    setSearchTerm('');
    setIsOpen(false);
  };

  const clearHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUser(null);
    onChange(null);
    setSearchTerm('');
  };

  const results = searchResults?.data || [];

  return (
    <div className="relative w-full" ref={containerRef}>
      {selectedUser ? (
        <Input
          readOnly
          value={
            selectedUser.first_name
              ? `${selectedUser.first_name} ${selectedUser.last_name || ''}`
              : selectedUser.username || `کاربر ${selectedUser.id}`
          }
          className="cursor-default bg-gray-50 text-gray-800"
          startIcon={
            <Avatar
              src={selectedUser.avatar ?? undefined}
              fallback={selectedUser.first_name || selectedUser.username}
              size={24}
              className="ml-4"
            />
          }
          endIcon={
            <IconButton
              type="button"
              variant="error"
              mode="ghost"
              size="sm"
              onClick={clearHandler}
            >
              <Icon name="icon-[basil--cross-solid]" className="size-20" />
            </IconButton>
          }
        />
      ) : (
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          startIcon={<Icon name="icon-[basil--search-outline]" />}
          endIcon={
            isFetching ? (
              <div className="border-t-primary-500 size-16 animate-spin rounded-full border-2 border-gray-300" />
            ) : undefined
          }
        />
      )}

      {isOpen &&
        !selectedUser &&
        (searchTerm.length > 1 || results.length > 0) && (
          <div className="absolute top-[calc(100%+8px)] z-100 flex max-h-200 w-full flex-col overflow-y-auto rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
            {isFetching ? (
              <div className="text-body-sm-400 p-12 text-center text-gray-500">
                در حال جستجو...
              </div>
            ) : results.length > 0 ? (
              results.map((member) => {
                if (!member.id) return null;

                return (
                  <div
                    key={member.id}
                    onClick={() => selectHandler(member)}
                    className="flex cursor-pointer items-center gap-10 rounded-md p-8 transition-colors hover:bg-gray-50"
                  >
                    <Avatar
                      src={member.avatar ?? undefined}
                      fallback={member.first_name || member.username || 'U'}
                      size={32}
                    />
                    <div className="flex flex-col">
                      <span className="text-body-sm-500 text-gray-800">
                        {member.first_name
                          ? `${member.first_name} ${member.last_name || ''}`
                          : member.username}
                      </span>
                      <span className="text-caption-02 text-gray-400">
                        @{member.username}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-body-sm-400 p-12 text-center text-gray-500">
                کاربری پیدا نشد.
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default AssigneeSelect;
