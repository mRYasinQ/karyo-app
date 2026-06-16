'use client';

import { useEffect } from 'react';

import Icon from '@/components/common/icon';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import toast from '@/lib/toast';
import TaskService from '@/services/task';
import type { TaskData, UpdateTaskPayload } from '@/services/task/types';
import { type UpdateTaskData, updateTaskSchema } from '@/validations/task';

import { TASK_STATUSES } from '../../_constants/task-status';
import AssigneeSelect from './assignee-select';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

type UpdateTaskDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: number;
  workspaceSlug: string;
  projectId: number;
  task: TaskData;
};

const statusOptions = TASK_STATUSES.map((status) => ({
  label: status.name,
  value: status.value,
}));

const UpdateTaskDialog = ({
  isOpen,
  onOpenChange,
  workspaceId,
  workspaceSlug,
  projectId,
  task,
}: UpdateTaskDialogProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateTaskData>({
    mode: 'onChange',
    resolver: zodResolver(updateTaskSchema),
  });

  useEffect(() => {
    if (isOpen && task) {
      reset({
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        assignee_id: task.assignee?.id ?? null,
        due_date: task.due_date
          ? new Date(task.due_date).toISOString().split('T')[0]
          : '',
      });
    }
  }, [isOpen, task, reset]);

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdateTaskPayload) => {
      return TaskService.updateTask(workspaceId, projectId, task.id, payload);
    },
    onSuccess: async () => {
      toast.success('وظیفه با موفقیت بروزرسانی شد.');
      onOpenChange(false);
      await queryClient.invalidateQueries({
        queryKey: ['tasks', workspaceId, projectId],
      });
    },
    onError: () => {
      toast.error('مشکلی در بروزرسانی وظیفه به وجود آمد.');
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: () => {
      return TaskService.deleteTask(workspaceId, projectId, task.id);
    },
    onSuccess: async () => {
      toast.success('وظیفه با موفقیت حذف شد.');
      onOpenChange(false);
      await queryClient.invalidateQueries({
        queryKey: ['tasks', workspaceId, projectId],
      });
    },
    onError: () => {
      toast.error('مشکلی در حذف وظیفه به وجود آمد.');
    },
  });

  const submitHandler = (data: UpdateTaskData) => {
    if (isUpdating) return;

    const payload: UpdateTaskPayload = { ...data };

    if (data.due_date) {
      payload.due_date = new Date(data.due_date).toISOString();
    } else if (data.due_date === '') {
      payload.due_date = null;
    }

    if (data.description === '') {
      payload.description = null;
    }

    updateTask(payload);
  };

  const deleteHandler = () => {
    if (isDeleting) return;
    deleteTask();
  };

  return (
    <Dialog title="ویرایش وظیفه" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                initialUser={task.assignee}
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

        <div className="flex items-center gap-12">
          <Button
            type="button"
            variant="error"
            mode="soft"
            onClick={deleteHandler}
            isLoading={isDeleting}
            disabled={isUpdating}
          >
            <Icon name="icon-[basil--trash-solid]" className="ml-8 size-20" />
            حذف وظیفه
          </Button>
          <Button type="submit" isLoading={isUpdating} className="flex-1">
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default UpdateTaskDialog;
