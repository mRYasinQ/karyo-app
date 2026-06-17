'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import WorkspaceLogo from '@/components/common/workspace-logo';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import ROUTES from '@/lib/routes';
import toast from '@/lib/toast';
import WorkspaceService from '@/services/workpsace';
import type { PrivateWorkspaceData } from '@/services/workpsace/types';
import {
  type UpdateWorkspaceData,
  updateWorkspaceSchema,
} from '@/validations/workspace';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type WorkspaceSettingsDialogProps = {
  workspace: PrivateWorkspaceData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const WorkspaceSettingsDialog = ({
  workspace,
  isOpen,
  onOpenChange,
}: WorkspaceSettingsDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLogoDeleted, setIsLogoDeleted] = useState<boolean>(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { name, slug, logo, description } = workspace;

  const { mutate: updateWorkspace, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdateWorkspaceData) => {
      return WorkspaceService.updateWorkspace(slug, payload);
    },
    onSuccess: async () => {
      toast.success('تنظیمات میزکار با موفقیت بروزرسانی شد.');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['workspaces'] }),
        queryClient.invalidateQueries({
          queryKey: ['workspace', slug],
        }),
      ]);
      onOpenChange(false);
      setIsLogoDeleted(false);
    },
    onError: () => {
      toast.error('مشکلی در بروزرسانی میزکار به وجود آمد.');
    },
  });

  const { mutate: deleteWorkspace, isPending: isDeleting } = useMutation({
    mutationFn: () => WorkspaceService.deleteWorkspace(slug),
    onSuccess: async () => {
      toast.success('میزکار با موفقیت حذف شد.');
      await queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      onOpenChange(false);
      router.push(ROUTES.DASHBOARD.WORKSPACES.MAIN);
    },
    onError: () => {
      toast.error('مشکلی در حذف میزکار به وجود آمد.');
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateWorkspaceData>({
    mode: 'onChange',
    resolver: zodResolver(updateWorkspaceSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name,
        description: description ?? '',
      });
      setPreviewImage(logo ?? null);
      setIsLogoDeleted(false);
    }
  }, [isOpen, workspace, reset]);

  const logoChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('logo', file, { shouldValidate: true });
      setIsLogoDeleted(false);
    }
  };
  const deleteLogoHandler = () => {
    setPreviewImage(null);
    setValue('logo', undefined);
    setIsLogoDeleted(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submitHandler = (data: UpdateWorkspaceData) => {
    if (isUpdating) return;

    const payload: UpdateWorkspaceData = {
      name: data.name,
      description: data.description,
    };

    if (payload.logo instanceof File) {
      payload.logo = data.logo;
    } else if (isLogoDeleted) {
      payload.logo = null;
    }

    updateWorkspace(payload);
  };

  const deleteWorkspaceHandler = () => {
    if (isDeleting) return;
    deleteWorkspace();
  };

  return (
    <Dialog title="تنظیمات میزکار" isOpen={isOpen} onOpenChange={onOpenChange}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-24"
      >
        <div className="flex flex-col items-center gap-16 sm:flex-row sm:items-start">
          <div className="group relative size-64 overflow-hidden rounded-xl">
            <WorkspaceLogo
              src={previewImage}
              alt={name}
              fallback={name.charAt(0)}
              width={64}
              height={64}
              className="size-64"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-8 bg-gray-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex size-24 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
              >
                <Icon name="icon-[basil--edit-solid]" className="icon-16" />
              </button>
              {previewImage && (
                <button
                  type="button"
                  onClick={deleteLogoHandler}
                  className="bg-error/80 hover:bg-error flex size-24 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
                >
                  <Icon name="icon-[basil--trash-solid]" className="icon-16" />
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={logoChangeHandler}
            />
          </div>
          <div className="flex flex-col items-center gap-4 sm:items-start sm:pt-8">
            <span className="text-body-md-500 text-gray-900">نشان میزکار</span>
            <span className="text-body-sm-400 text-center text-gray-500 sm:text-right">
              فرمت‌های مجاز: png، jpg و webp. حداکثر حجم: 1 مگابایت
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-700">نام میزکار</span>
            <Input
              {...register('name')}
              placeholder="نام میزکار"
              error={Boolean(errors.name)}
              errorMessage={errors.name?.message}
            />
          </label>

          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-700">
              توضیحات (اختیاری)
            </span>
            <Input
              {...register('description')}
              placeholder="توضیحات کوتاهی درباره این میزکار بنویسید..."
              error={Boolean(errors.description)}
              errorMessage={errors.description?.message}
            />
          </label>
        </div>

        <Button type="submit" isLoading={isUpdating}>
          ذخیره تغییرات
        </Button>
      </form>

      <div className="border-error-100 bg-error-50 mt-32 flex flex-col gap-12 rounded-lg border p-16">
        <div className="flex flex-col gap-4">
          <span className="text-body-md-500 text-error-700">حذف میزکار</span>
          <span className="text-body-sm-400 text-error-600">
            با حذف میزکار، تمامی پروژه‌ها، اعضا و داده‌های آن برای همیشه پاک
            خواهند شد.
          </span>
        </div>
        <div className="flex justify-end">
          <Button
            variant="error"
            onClick={deleteWorkspaceHandler}
            isLoading={isDeleting}
          >
            <Icon name="icon-[basil--trash-solid]" className="icon-20 ml-8" />
            حذف برای همیشه
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default WorkspaceSettingsDialog;
