'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';
import ROUTES from '@/lib/routes';
import toast from '@/lib/toast';
import ProjectService from '@/services/projects';
import type {
  ProjectData,
  UpdateProjectPayload,
} from '@/services/projects/types';
import {
  type UpdateProjectData,
  updateProjectSchema,
} from '@/validations/project';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';

type UpdateProjectDialogProps = {
  project: ProjectData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const formatDateForInput = (dateStr: string | null) => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().split('T')[0];
};

const UpdateProjectDialog = ({
  project,
  isOpen,
  onOpenChange,
}: UpdateProjectDialogProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateProjectData>({
    mode: 'onChange',
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description ?? '',
      is_archived: project.is_archived,
      start_date: formatDateForInput(project.start_date),
      end_date: formatDateForInput(project.end_date),
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: project.name,
        description: project.description ?? '',
        is_archived: project.is_archived,
        start_date: formatDateForInput(project.start_date),
        end_date: formatDateForInput(project.end_date),
      });
    }
  }, [isOpen, project, reset]);

  const { mutate: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdateProjectPayload) =>
      ProjectService.updateProject(project.workspace.id, project.id, payload),
    onSuccess: async (_, variables) => {
      toast.success('پروژه با موفقیت بروزرسانی شد.');
      onOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ['projects', project.workspace.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ['project', project.workspace.id, project.slug],
      });

      if (variables.slug && variables.slug !== project.slug) {
        router.replace(
          ROUTES.DASHBOARD.PROJECTS.SHOW(
            project.workspace.slug,
            variables.slug,
          ),
        );
      }
    },
    onError: () => {
      toast.error('مشکلی در بروزرسانی پروژه به وجود آمد.');
    },
  });

  const submitHandler = (data: UpdateProjectData) => {
    if (isUpdating) return;

    const generatedSlug = data.name
      ? slugify(data.name, {
          lower: true,
          strict: true,
          trim: true,
        })
      : project.slug;
    const payload: UpdateProjectPayload = { ...data, slug: generatedSlug };

    if (data.start_date) {
      payload.start_date = new Date(data.start_date).toISOString();
    } else {
      payload.start_date = null;
    }

    if (data.end_date) {
      payload.end_date = new Date(data.end_date).toISOString();
    } else {
      payload.end_date = null;
    }

    updateProject(payload);
  };

  return (
    <Dialog title="تنظیمات پروژه" isOpen={isOpen} onOpenChange={onOpenChange}>
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
          <span className="text-body-sm-400 text-gray-400">توضیحات</span>
          <Input
            {...register('description')}
            placeholder="توضیحات کوتاهی درباره پروژه..."
            error={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
        </label>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-400">تاریخ شروع</span>
            <Input
              type="date"
              dir="ltr"
              {...register('start_date')}
              error={Boolean(errors.start_date)}
              errorMessage={errors.start_date?.message}
            />
          </label>

          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-400">تاریخ پایان</span>
            <Input
              type="date"
              dir="ltr"
              {...register('end_date')}
              error={Boolean(errors.end_date)}
              errorMessage={errors.end_date?.message}
            />
          </label>
        </div>

        <label className="flex cursor-pointer items-center gap-12">
          <Controller
            control={control}
            name="is_archived"
            render={({ field: { value, onChange, ref } }) => (
              <Switch checked={value} onCheckedChange={onChange} ref={ref} />
            )}
          />
          <span className="text-body-sm-400 text-gray-400">بایگانی پروژه</span>
        </label>

        <Button type="submit" isLoading={isUpdating}>
          ذخیره تغییرات
        </Button>
      </form>
    </Dialog>
  );
};

export default UpdateProjectDialog;
