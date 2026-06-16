'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import toast from '@/lib/toast';
import ProjectService from '@/services/projects';
import type { CreateProjectPayload } from '@/services/projects/types';
import {
  type CreateProjectData,
  createProjectSchema,
} from '@/validations/project';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

type CreateProjectDialogProps = {
  workspaceId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateProjectDialog = ({
  workspaceId,
  isOpen,
  onOpenChange,
}: CreateProjectDialogProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectData>({
    mode: 'onChange',
    resolver: zodResolver(createProjectSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
      });
    }
  }, [isOpen, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      ProjectService.createProject(workspaceId, payload),
    onSuccess: async () => {
      toast.success('پروژه با موفقیت ایجاد شد.');
      onOpenChange(false);
      await queryClient.invalidateQueries({
        queryKey: ['projects', workspaceId],
      });
    },
    onError: () => {
      toast.error('مشکلی در ایجاد پروژه به وجود آمد.');
    },
  });

  const submitHandler = (data: CreateProjectData) => {
    if (isPending) return;

    const generatedSlug = slugify(data.name, {
      lower: true,
      strict: true,
      trim: true,
    });
    const payload: CreateProjectPayload = { ...data, slug: generatedSlug };
    if (data.start_date) {
      payload.start_date = new Date(data.start_date).toISOString();
    }
    if (data.end_date) payload.end_date = new Date(data.end_date).toISOString();

    mutate(payload);
  };

  return (
    <Dialog
      title="ایجاد پروژه جدید"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-16"
      >
        <label className="flex flex-col gap-8">
          <span className="text-body-sm-400 text-gray-400">نام پروژه</span>
          <Input
            {...register('name')}
            placeholder="نام پروژه را وارد کنید"
            error={Boolean(errors.name)}
            errorMessage={errors.name?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">
            توضیحات (اختیاری)
          </span>
          <Input
            {...register('description')}
            placeholder="توضیحات کوتاهی درباره پروژه..."
            error={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
        </label>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-400">
              تاریخ شروع (اختیاری)
            </span>
            <Input
              type="date"
              dir="ltr"
              {...register('start_date')}
              error={Boolean(errors.start_date)}
              errorMessage={errors.start_date?.message}
            />
          </label>

          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-400">
              تاریخ پایان (اختیاری)
            </span>
            <Input
              type="date"
              dir="ltr"
              {...register('end_date')}
              error={Boolean(errors.end_date)}
              errorMessage={errors.end_date?.message}
            />
          </label>
        </div>

        <Button type="submit" isLoading={isPending}>
          ایجاد پروژه
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateProjectDialog;
