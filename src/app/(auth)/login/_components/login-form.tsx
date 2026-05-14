'use client';

import Link from 'next/link';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import ROUTES from '@/lib/routes';
import { type LoginData, loginDataSchema } from '@/validations/auth.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onChange',
    resolver: zodResolver(loginDataSchema),
  });

  const submitHandler = () => {};

  return (
    <>
      <form
        className="flex flex-col gap-12"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-16">
          <label className="flex flex-col gap-16">
            <span className="text-body-sm-400 text-gray-400">
              لطفا ایمیل و گذرواژه خود را وارد کنید
            </span>
            <Input
              {...register('email')}
              placeholder="پست الکترونیک"
              error={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            />
          </label>
          <PasswordInput
            {...register('password')}
            placeholder="گذرواژه"
            error={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
        </div>
        <p className="text-body-sm-500 text-gray-400">
          گذواژه‌ام رو فراموش کردم،{' '}
          <Link href={ROUTES.AUTH.RECOVER_PASSWORD} className="text-primary">
            بازیابی می‌کنم
          </Link>
          .
        </p>
        <Button type="submit">وارد شو</Button>
      </form>
      <p className="text-body-sm-500 text-center text-gray-400">
        حساب کاربری ندارم،{' '}
        <Link href={ROUTES.AUTH.REGISTER} className="text-primary">
          ثبت‌نام می‌کنم
        </Link>
        .
      </p>
    </>
  );
};

export default LoginForm;
