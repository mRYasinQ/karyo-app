'use client';

import { useEffect } from 'react';

import OtpCountdown from '@/components/common/otp-countdown';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import OtpField from '@/components/ui/otp-field';
import ApiError from '@/lib/api-error';
import appConfig from '@/lib/config';
import toast from '@/lib/toast';
import AuthService from '@/services/auth';
import { type OtpData, otpDataSchema } from '@/validations/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

type VerifyEmailDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const VerifyEmailDialog = ({
  isOpen,
  onOpenChange,
}: VerifyEmailDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate: sendEmailOtp, isPending: isPendingEmailOtp } = useMutation({
    mutationFn: AuthService.EmailOtp,
    onSuccess: () => {
      toast.success('کد تایید با موفقیت ارسال شد.');
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const { mutate: verifyEmail, isPending: isPendingVerify } = useMutation({
    mutationFn: AuthService.verifyEmailOtp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('ایمیل با موفقیت تایید شد.');
      onOpenChange(false);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const { control, handleSubmit, reset } = useForm<OtpData>({
    defaultValues: { otp: '' },
    resolver: zodResolver(otpDataSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset({ otp: '' });
    }
  }, [isOpen, reset]);

  const verifyOtpEmailHandler = (data: OtpData) => {
    if (isPendingVerify) return;
    verifyEmail(data);
  };

  const onResendHandler = () => {
    if (isPendingEmailOtp) return;
    sendEmailOtp();
  };

  return (
    <Dialog title="تایید ایمیل" isOpen={isOpen} onOpenChange={onOpenChange}>
      <form
        className="flex flex-col gap-12"
        onSubmit={handleSubmit(verifyOtpEmailHandler)}
      >
        <div className="flex flex-col gap-16">
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <OtpField
                {...field}
                error={Boolean(error)}
                errorMessage={error?.message}
                length={5}
              />
            )}
          />
          <OtpCountdown
            initialTime={appConfig.time.otpResendCooldown}
            onResend={onResendHandler}
            isLoading={isPendingEmailOtp}
          />
        </div>
        <Button type="submit" isLoading={isPendingVerify}>
          تایید ایمیل
        </Button>
      </form>
    </Dialog>
  );
};

export default VerifyEmailDialog;
