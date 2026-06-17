'use client';

import Icon from '@/components/common/icon';
import Button from '@/components/ui/button';
import toast from '@/lib/toast';
import SessionService from '@/services/sessions';

import PageLoader from '../../_components/page-loader';
import SessionCard from './session-card';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Sessions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['sessions'],
    queryFn: () => SessionService.getSessions(),
    placeholderData: (previousData) => previousData,
  });

  const { mutate: clearSessions, isPending } = useMutation({
    mutationFn: () => SessionService.clearSessions(false),
    onSuccess: async () => {
      toast.success('سایر دستگاه‌ها با موفقیت خارج شدند.');
      await queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: () => {
      toast.error('مشکلی در خروج از دستگاه‌ها به وجود آمد.');
    },
  });

  const sessions = data?.data ?? [];

  const clearSessionsHandler = () => {
    if (isPending) return;
    clearSessions();
  };

  if (isLoading && !isPlaceholderData) {
    return <PageLoader className="rounded-lg bg-white" />;
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-16 rounded-lg bg-white p-20 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-subheading-03 text-gray-900">
          لیست دستگاه‌های متصل
        </span>
        <Button
          variant="error"
          className="max-sm:w-full"
          onClick={clearSessionsHandler}
          isLoading={isPending}
          disabled={sessions.length <= 1}
        >
          <Icon name="icon-[basil--logout-solid]" className="icon-20 ml-8" />
          خروج از سایر دستگاه‌ها
        </Button>
      </div>

      <div className="flex flex-col divide-y divide-gray-100 rounded-lg bg-white p-12">
        {sessions.map((session) => (
          <SessionCard key={session.id} {...session} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;
