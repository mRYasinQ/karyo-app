'use client';

import { useEffect } from 'react';

import Icon from '@/components/common/icon';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import toast from '@/lib/toast';
import TaskService from '@/services/task';
import type { CreateTaskPayload, TaskStatus } from '@/services/task/types';
import { type CreateTaskData, createTaskSchema } from '@/validations/task';

import { TASK_STATUSES } from '../../_constants/task-status';
import AssigneeSelect from './assignee-select';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

type CreateTaskDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: number;
  workspaceSlug: string;
  projectId: number;
  defaultStatus?: TaskStatus;
};

const statusOptions = TASK_STATUSES.map((status) => ({
  label: status.name,
  value: status.value,
}));

const CreateTaskDialog = ({
  isOpen,
  onOpenChange,
  workspaceId,
  workspaceSlug,
  projectId,
  defaultStatus = 'todo',
}: CreateTaskDialogProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateTaskData>({
    mode: 'onChange',
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: '',
        description: '',
        status: defaultStatus,
        due_date: '',
        assignee_id: null,
      });
    }
  }, [isOpen, defaultStatus, reset]);

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (payload: CreateTaskPayload) => {
      return TaskService.createTask(workspaceId, projectId, payload);
    },
    onSuccess: async () => {
      toast.success('وظیفه با موفقیت ایجاد شد.');
      onOpenChange(false);
      await queryClient.invalidateQueries({
        queryKey: ['tasks', workspaceId, projectId],
      });
    },
    onError: () => {
      toast.error('مشکلی در ایجاد وظیفه به وجود آمد.');
    },
  });

  const submitHandler = (data: CreateTaskData) => {
    if (isPending) return;

    const newTask: CreateTaskPayload = { ...data };
    if (data.due_date) newTask.due_date = new Date(data.due_date).toISOString();

    createTask(newTask);
  };

  return (
    <Dialog
      title="ایجاد وظیفه جدید"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-16"
      >
        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">عنوان وظیفه</span>
          <Input
            {...register('title')}
            placeholder="عنوان وظیفه"
            error={Boolean(errors.title)}
            errorMessage={errors.title?.message}
            autoFocus
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">
            توضیحات (اختیاری)
          </span>
          <Input
            {...register('description')}
            placeholder="توضیحات وظیفه"
            error={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">مسئول انجام</span>
          <Controller
            name="assignee_id"
            control={control}
            render={({ field }) => (
              <AssigneeSelect
                workspaceSlug={workspaceSlug}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </label>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-400">وضعیت</span>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  options={statusOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="h-44 w-full"
                />
              )}
            />
            {errors.status && (
              <p className="text-error text-caption-03 flex items-center gap-6">
                <Icon
                  name="icon-[basil--info-triangle-solid]"
                  className="icon-20"
                />
                {errors.status.message}
              </p>
            )}
          </label>

          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-400">
              مهلت انجام (اختیاری)
            </span>
            <Input
              type="date"
              dir="ltr"
              {...register('due_date')}
              error={Boolean(errors.due_date)}
              errorMessage={errors.due_date?.message}
            />
          </label>
        </div>

        <Button type="submit" isLoading={isPending}>
          ایجاد وظیفه
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateTaskDialog;
