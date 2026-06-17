'use client';

import Icon from '@/components/common/icon';
import IconButton from '@/components/ui/icon-button';
import toast from '@/lib/toast';
import SessionService from '@/services/sessions';
import type { SessionData } from '@/services/sessions/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type SessionCardProps = SessionData;

const SessionCard = ({
  id,
  browser,
  os,
  is_current,
  created_at,
}: SessionCardProps) => {
  const queryClient = useQueryClient();

  const { mutate: revokeSession, isPending } = useMutation({
    mutationFn: () => SessionService.revokeSession(id),
    onSuccess: async () => {
      toast.success('دستگاه با موفقیت حذف شد.');
      await queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: () => {
      toast.error('مشکلی در حذف دستگاه به وجود آمد.');
    },
  });

  const revokeSessionHandler = () => {
    if (isPending) return;
    revokeSession();
  };

  return (
    <div className="flex items-center justify-between px-12 py-16 first:pt-4 last:pb-4">
      <div className="flex items-center gap-8">
        <span className="text-body-md-500 text-gray-900" dir="ltr">
          {os} - {browser}
        </span>
        <span className="text-body-sm-400 text-gray-400">
          {new Date(created_at).toLocaleDateString('fa-IR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        {is_current && (
          <span className="bg-primary-50 text-primary-600 text-caption-03 rounded-md px-8 py-4 font-semibold">
            دستگاه فعلی
          </span>
        )}
      </div>

      {!is_current && (
        <IconButton
          variant="error"
          mode="ghost"
          size="sm"
          onClick={revokeSessionHandler}
        >
          <Icon name="icon-[basil--logout-solid]" className="icon-20" />
        </IconButton>
      )}
    </div>
  );
};

export default SessionCard;
