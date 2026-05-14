'use client';

import { AuthFlowProvider } from '@/contexts/auth-flow';

import ChoosePasswordStep from './choose-password-step';
import EmailStep from './email-step';
import OtpStep from './otp-step';

import { useStep } from 'usehooks-ts';

const RecoverPasswordForm = () => {
  const [currentStep, { goToNextStep, goToPrevStep, reset }] = useStep(3);

  return (
    <AuthFlowProvider>
      {currentStep === 1 && <EmailStep onNext={goToNextStep} />}
      {currentStep === 2 && (
        <OtpStep onNext={goToNextStep} onBack={goToPrevStep} />
      )}
      {currentStep === 3 && <ChoosePasswordStep onReset={reset} />}
    </AuthFlowProvider>
  );
};

export default RecoverPasswordForm;
