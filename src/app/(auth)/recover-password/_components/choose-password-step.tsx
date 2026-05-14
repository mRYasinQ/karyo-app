import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/button';
import PasswordInput from '@/components/ui/password-input';
import { useAuthFlow } from '@/contexts/auth-flow';
import ROUTES from '@/lib/routes';
import { type PasswordData, passwordDataSchema } from '@/validations/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type ChoosePasswordStepProps = { onReset: () => void };

const ChoosePasswordStep = ({ onReset }: ChoosePasswordStepProps) => {
  const [_isLoading, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordData>({
    mode: 'onChange',
    resolver: zodResolver(passwordDataSchema),
  });

  const { setData, setStep } = useAuthFlow();

  const submitHandler = ({ confirmPassword }: PasswordData) => {
    startTransition(() => {
      try {
        // TODO: API Call
        setData({ password: confirmPassword });

        router.replace(ROUTES.HOME);
      } catch {
        // TODO: Toast
      }
    });
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
            لطفا یک گذرواژه جدید انتخاب کنید
          </span>
          <PasswordInput
            {...register('password')}
            placeholder="گذرواژه جدید"
            error={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
        </label>
        <PasswordInput
          {...register('confirmPassword')}
          placeholder="تکرار گذرواژه جدید"
          error={Boolean(errors.confirmPassword)}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>
      <Button type="submit">تغییر گذرواژه و ورود</Button>
      <Button variant="primary" mode="soft" onClick={backHandler}>
        بازگشت
      </Button>
    </form>
  );
};

export default ChoosePasswordStep;
