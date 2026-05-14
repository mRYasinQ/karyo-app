import type { Metadata } from 'next';

import AuthForm from '../_components/auth-form';
import LoginForm from './_components/login-form';

export const metadata: Metadata = {
  title: 'ورود',
};

export default function Page() {
  return (
    <AuthForm title="ورود به کاریو">
      <LoginForm />
    </AuthForm>
  );
}
