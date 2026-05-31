import type { Metadata } from 'next';

import AuthForm from '../_components/auth-form';
import RegisterForm from './_components/register-form';

export const metadata: Metadata = {
  title: 'ثبت‌نام',
};

export default function RegisterPage() {
  return (
    <AuthForm title="ثبت‌نام در کاریو">
      <RegisterForm />
    </AuthForm>
  );
}
