'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/icon';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import ApiError from '@/lib/api-error';
import toast from '@/lib/toast';
import ProfileService from '@/services/profile';
import type { UpdateProfilePayload } from '@/services/profile/types';
import {
  type UpdateProfileData,
  updateProfileSchema,
} from '@/validations/profile';

import PageLoader from '../../_components/page-loader';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const ProfileForm = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isAvatarDeleted, setIsAvatarDeleted] = useState<boolean>(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: ProfileService.getProfile,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ProfileService.updateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('نمایه با موفقیت بروزرسانی شد.');
      setIsAvatarDeleted(false);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    mode: 'onChange',
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        birthday: user.birthday ? user.birthday.split('T')[0] : '',
      });
      setPreviewImage(user.avatar ?? null);
    }
  }, [user, reset]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('avatar', file);
      setIsAvatarDeleted(false);
    }
  };

  const handleDeleteAvatar = () => {
    setPreviewImage(null);
    setValue('avatar', undefined);
    setIsAvatarDeleted(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const submitHandler = (data: UpdateProfileData) => {
    if (isPending) return;

    const payload: UpdateProfilePayload = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      birthday: data.birthday,
    };

    if (data.avatar instanceof File) {
      payload.avatar = data.avatar;
    } else if (isAvatarDeleted) {
      payload.avatar = null;
    }

    mutate(payload);
  };

  if (isLoading) return <PageLoader />;

  const fullName = user
    ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || 'کاربر'
    : 'کاربر';

  return (
    <form
      className="flex flex-col gap-32"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex flex-col items-center gap-16 sm:flex-row sm:items-start">
        <div className="group relative size-80 overflow-hidden rounded-full">
          <Avatar
            size={80}
            src={previewImage ?? '/images/avatar-placeholder.webp'}
            alt={fullName}
            fallback={fullName}
          />
          <div className="absolute inset-0 flex items-center justify-center gap-8 bg-gray-900/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="flex size-32 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
            >
              <Icon name="icon-[basil--edit-solid]" className="size-20" />
            </button>
            {previewImage && (
              <button
                type="button"
                onClick={handleDeleteAvatar}
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
            onChange={handleAvatarChange}
          />
        </div>
        <div className="flex flex-col items-center gap-4 sm:items-start sm:pt-16">
          <span className="text-body-md-500 text-gray-900">تصویر نمایه</span>
          <span className="text-body-sm-400 text-center text-gray-500 sm:text-right">
            فرمت‌های مجاز: png، jpg و webp. حداکثر حجم: 1 مگابایت
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">نام</span>
          <Input
            {...register('first_name')}
            placeholder="نام خود را وارد کنید"
            error={Boolean(errors.first_name)}
            errorMessage={errors.first_name?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">نام خانوادگی</span>
          <Input
            {...register('last_name')}
            placeholder="نام خانوادگی خود را وارد کنید"
            error={Boolean(errors.last_name)}
            errorMessage={errors.last_name?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">نام کاربری</span>
          <Input
            {...register('username')}
            placeholder="نام کاربری"
            dir="ltr"
            error={Boolean(errors.username)}
            errorMessage={errors.username?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">پست الکترونیک</span>
          <Input
            {...register('email')}
            placeholder="پست الکترونیک"
            dir="ltr"
            error={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        </label>

        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">تاریخ تولد</span>
          <Input
            type="date"
            {...register('birthday')}
            dir="ltr"
            error={Boolean(errors.birthday)}
            errorMessage={errors.birthday?.message}
          />
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending} className="max-md:w-full">
          ذخیره تغییرات
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
