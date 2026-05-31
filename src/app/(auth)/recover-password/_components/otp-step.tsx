'use client';

import OtpCountdown from '@/components/common/otp-countdown';
import Button from '@/components/ui/button';
import OtpField from '@/components/ui/otp-field';
import { useAuthFlow } from '@/contexts/auth-flow';
import ApiError from '@/lib/api-error';
import appConfig from '@/lib/config';
import toast from '@/lib/toast';
import AuthService from '@/services/auth';
import { type OtpData, otpDataSchema } from '@/validations/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

type OtpStepProps = { onNext: () => void; onBack: () => void };

const OtpStep = ({ onNext, onBack }: OtpStepProps) => {
  const { control, handleSubmit } = useForm<OtpData>({
    defaultValues: { otp: '' },
    resolver: zodResolver(otpDataSchema),
  });

  const { setStep, setData, data } = useAuthFlow();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.verifyOtpRecover,
    onSuccess: () => {
      toast.success('کد تایید شد.');
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: resendOtp, isPending: isLoadingResendOtp } = useMutation(
    {
      mutationFn: AuthService.otpRecover,
      onSuccess: () => {
        toast.success('کد بازیابی با موفقیت ارسال شد.');
      },
      onError: (error: ApiError) => {
        toast.error(error.message);
      },
    },
  );

  const submitHandler = async ({ otp }: OtpData) => {
    try {
      await mutateAsync({ email: data.email!, otp });
      setData({ otp });
      setStep('PASSWORD');
      onNext();
    } catch {}
  };

  const onResendHandler = async () => {
    try {
      await resendOtp({ email: data.email! });
    } catch {}
  };

  const backHandler = () => {
    setStep('EMAIL');
    onBack();
  };

  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={handleSubmit(submitHandler)}
    >
      <label className="flex flex-col gap-16">
        <span className="text-body-sm-400 text-gray-400">
          لطفا کد تایید را وارد کنید
        </span>
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <OtpField
              {...field}
              autoSubmit
              error={Boolean(error)}
              errorMessage={error?.message}
              length={5}
            />
          )}
        />
        <OtpCountdown
          initialTime={appConfig.time.otpResendCooldown}
          onResend={onResendHandler}
          isLoading={isLoadingResendOtp}
        />
      </label>
      <Button type="submit" isLoading={isPending}>
        ادامه
      </Button>
      <Button type="button" variant="primary" mode="soft" onClick={backHandler}>
        بازگشت
      </Button>
    </form>
  );
};

export default OtpStep;
