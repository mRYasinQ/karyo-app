import Button from '@/components/ui/button';
import PasswordInput from '@/components/ui/password-input';
import { useAuth } from '@/contexts/auth';
import { useAuthFlow } from '@/contexts/auth-flow';
import ApiError from '@/lib/api-error';
import toast from '@/lib/toast';
import AuthService from '@/services/auth';
import { type PasswordData, passwordDataSchema } from '@/validations/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type ChoosePasswordStepProps = { onReset: () => void };

const ChoosePasswordStep = ({ onReset }: ChoosePasswordStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordData>({
    mode: 'onChange',
    resolver: zodResolver(passwordDataSchema),
  });

  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.register,
    onSuccess: ({ token }) => {
      login(token, { hasToast: false });
      toast.success('ثبت نام با موفقیت انجام شد.');
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });

  const { setStep, data } = useAuthFlow();

  const submitHandler = ({ confirmPassword }: PasswordData) => {
    mutate({ email: data.email!, otp: data.otp!, password: confirmPassword });
  };

  const backHandler = () => {
    setStep('EMAIL');
    onReset();
  };

  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex flex-col gap-16">
        <label className="flex flex-col gap-16">
          <span className="text-body-sm-400 text-gray-400">
            لطفا یک گذرواژه انتخاب کنید
          </span>
          <PasswordInput
            {...register('password')}
            placeholder="گذرواژه"
            error={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
        </label>
        <PasswordInput
          {...register('confirmPassword')}
          placeholder="تکرار گذرواژه"
          error={Boolean(errors.confirmPassword)}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>
      <Button type="submit" isLoading={isPending}>
        همین حالا وارد شوید
      </Button>
      <Button variant="primary" mode="soft" onClick={backHandler}>
        بازگشت
      </Button>
    </form>
  );
};

export default ChoosePasswordStep;
