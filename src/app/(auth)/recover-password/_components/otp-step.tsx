'use client';

import { useTransition } from 'react';

import Button from '@/components/ui/button';
import OtpField from '@/components/ui/otp-field';
import { useAuthFlow } from '@/contexts/auth-flow';
import { type OtpData, otpDataSchema } from '@/validations/auth.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

type OtpStepProps = { onNext: () => void; onBack: () => void };

const OtpStep = ({ onNext, onBack }: OtpStepProps) => {
  const [_isLoading, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<OtpData>({
    defaultValues: { otp: '' },
    resolver: zodResolver(otpDataSchema),
  });

  const { setStep, setData } = useAuthFlow();

  const submitHandler = ({ otp }: OtpData) => {
    startTransition(() => {
      try {
        // TODO: API Call
        setData({ otp });

        setStep('PASSWORD');
        onNext();
      } catch {
        // TODO: Toast
      }
    });
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
      </label>
      <Button type="submit">ادامه</Button>
      <Button variant="primary" mode="soft" onClick={backHandler}>
        بازگشت
      </Button>
    </form>
  );
};

export default OtpStep;
