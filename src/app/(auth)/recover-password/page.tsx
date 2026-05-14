import type { Metadata } from 'next';

import AuthForm from '../_components/auth-form';
import RecoverPasswordForm from './_components/recover-password-form';

export const metadata: Metadata = {
  title: 'بازیابی گذرواژه',
};

export default function RecoverPassword() {
  return (
    <AuthForm title="بازیابی حساب کاریو">
      <RecoverPasswordForm />
    </AuthForm>
  );
}
