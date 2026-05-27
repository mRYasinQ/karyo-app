'use client';

import Link from 'next/link';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useAuthFlow } from '@/contexts/auth-flow';
import ApiError from '@/lib/api-error';
import ROUTES from '@/lib/routes';
import toast from '@/lib/toast';
import AuthService from '@/services/auth';
import { type EmailData, emailDataSchema } from '@/validations/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type EmailStepProps = { onNext: () => void };

const EmailStep = ({ onNext }: EmailStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({
    mode: 'onChange',
    resolver: zodResolver(emailDataSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.otpRegister,
    onSuccess: () => {
      toast.success('کد تایید با موفقیت ارسال شد.');
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const { setData, setStep } = useAuthFlow();

  const submitHandler = async (data: EmailData) => {
    try {
      await mutateAsync(data);
      setData({ email: data.email });
      setStep('OTP');
      onNext();
    } catch {}
  };

  return (
    <>
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
        <Button type="submit" isLoading={isPending}>
          ثبت‌نام در کاریو
        </Button>
      </form>
      <p className="text-body-sm-500 text-center text-gray-400">
        حساب کاربری دارم،{' '}
        <Link href={ROUTES.AUTH.LOGIN} className="text-primary">
          وارد میشم
        </Link>
        .
      </p>
    </>
  );
};

export default EmailStep;
