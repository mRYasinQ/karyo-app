'use client';

import { type ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import ROUTES from '@/lib/routes';
import WorkspaceService from '@/services/workpsace';
import workspaceSchema, { type WorkspaceData } from '@/validations/workspace';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const CreateWorkspaceForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLogoDeleted, setIsLogoDeleted] = useState<boolean>(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WorkspaceData>({
    mode: 'onChange',
    resolver: zodResolver(workspaceSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: WorkspaceService.createWorkspace,
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      router.push(ROUTES.DASHBOARD.WORKSPACES.SHOW(payload.slug));
    },
  });

  const logoChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('logo', file);
      setIsLogoDeleted(false);
    }
  };
  const deleteLogoHandler = () => {
    setPreviewImage(null);
    setValue('logo', null);
    setIsLogoDeleted(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const logoClickHandler = () => {
    fileInputRef.current?.click();
  };

  const submitHandler = (data: WorkspaceData) => {
    if (isPending) return;

    const payload: WorkspaceData = {
      name: data.name,
      slug: data.slug,
    };

    if (data.description) payload.description = data.description;

    if (data.logo instanceof File) {
      payload.logo = data.logo;
    } else if (isLogoDeleted) {
      payload.logo = null;
    }

    mutate(payload);
  };

  return (
    <form
      className="flex flex-col gap-32"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex flex-col items-center gap-16 sm:flex-row sm:items-start">
        <div className="group relative size-80 overflow-hidden rounded-2xl">
          {previewImage ? (
            <Image
              src={previewImage}
              alt="لوگو میزکار"
              width={48}
              height={48}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            <div className="bg-primary-50 text-primary-600 flex h-full w-full items-center justify-center rounded-xl">
              <span className="text-body-lg-500 font-bold">م</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center gap-8 bg-gray-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={logoClickHandler}
              className="flex size-32 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
            >
              <Icon name="icon-[basil--edit-solid]" className="size-20" />
            </button>
            {previewImage && (
              <button
                type="button"
                onClick={deleteLogoHandler}
                className="bg-error/80 hover:bg-error flex size-32 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
              >
                <Icon name="icon-[basil--trash-solid]" className="size-20" />
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
        <div className="flex flex-col items-center gap-4 sm:items-start sm:pt-16">
          <span className="text-body-md-500 text-gray-900">لوگو میزکار</span>
          <span className="text-body-sm-400 text-center text-gray-500 sm:text-right">
            فرمت‌های مجاز: png، jpg و webp. حداکثر حجم: 1 مگابایت
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">نام میزکار</span>
          <Input
            placeholder="نام میزکار خود را وارد کنید"
            {...register('name')}
            error={Boolean(errors.name)}
            errorMessage={errors.name?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">شناسه میزکار</span>
          <Input
            placeholder="workspace-slug"
            dir="ltr"
            {...register('slug')}
            error={Boolean(errors.slug)}
            errorMessage={errors.slug?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">
            توضیحات (اختیاری)
          </span>
          <Input
            placeholder="توضیحات مختصری درباره میزکار بنویسید"
            {...register('description')}
            error={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
        </label>
      </div>

      <div className="mt-8 flex justify-end gap-12">
        <Button variant="primary" type="submit" isLoading={isPending}>
          ایجاد میزکار
        </Button>
      </div>
    </form>
  );
};

export default CreateWorkspaceForm;
