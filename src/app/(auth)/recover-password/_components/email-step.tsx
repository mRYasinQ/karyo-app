'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useAuthFlow } from '@/contexts/auth-flow';
import { type EmailData, emailDataSchema } from '@/validations/auth.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type EmailStepProps = { onNext: () => void };

const EmailStep = ({ onNext }: EmailStepProps) => {
  const [_isLoading, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({
    mode: 'onChange',
    resolver: zodResolver(emailDataSchema),
  });

  const { setData, setStep } = useAuthFlow();

  const submitHandler = ({ email }: EmailData) => {
    startTransition(() => {
      try {
        // TODO: API Call
        setData({ email });

        setStep('OTP');
        onNext();
      } catch {
        // TODO: Toast
      }
    });
  };

  const backHandler = () => router.back();

  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={handleSubmit(submitHandler)}
    >
      <label className="flex flex-col gap-16">
        <span className="text-body-sm-400 text-gray-400">
          لطفا ایمیل خود را وارد کنید
        </span>
        <Input
          {...register('email')}
          placeholder="پست الکترونیک"
          error={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        />
      </label>
      <Button type="submit">شروع فرآیند بازیابی حساب</Button>
      <Button variant="primary" mode="soft" onClick={backHandler}>
        بازگشت
      </Button>
    </form>
  );
};

export default EmailStep;
