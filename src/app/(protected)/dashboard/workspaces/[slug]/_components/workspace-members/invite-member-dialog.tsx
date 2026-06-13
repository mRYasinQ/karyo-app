'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import toast from '@/lib/toast';
import WorkspaceInviteService from '@/services/workspace-invite';
import {
  type InviteMemberData,
  inviteMemberSchema,
} from '@/validations/workspace';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type InviteMemberDialogProps = {
  slug: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const InviteMemberDialog = ({
  slug,
  isOpen,
  onOpenChange,
}: InviteMemberDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteMemberData>({
    mode: 'onChange',
    resolver: zodResolver(inviteMemberSchema),
  });

  useEffect(() => {
    if (isOpen) reset({ email: '' });
  }, [isOpen, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: InviteMemberData) =>
      WorkspaceInviteService.inviteUser(slug, payload),
    onSuccess: () => {
      toast.success('دعوت‌نامه با موفقیت ارسال شد.');
      onOpenChange(false);
    },
    onError: () => {
      toast.error('مشکلی در ارسال دعوت‌نامه به وجود آمد.');
    },
  });

  const submitHandler = (data: InviteMemberData) => {
    if (isPending) return;
    mutate(data);
  };

  return (
    <Dialog title="دعوت عضو جدید" isOpen={isOpen} onOpenChange={onOpenChange}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-16"
      >
        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">
            پست الکترونیک کاربر
          </span>
          <Input
            placeholder="پست الکترونیک"
            dir="rtl"
            {...register('email')}
            error={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        </label>
        <Button type="submit" isLoading={isPending}>
          ارسال دعوت‌نامه
        </Button>
      </form>
    </Dialog>
  );
};

export default InviteMemberDialog;
