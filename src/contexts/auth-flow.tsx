'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

type AuthStep = 'EMAIL' | 'OTP' | 'PASSWORD';
type AuthData = { email?: string; otp?: string; password?: string };

interface AuthFlowContextType {
  data: AuthData;
  setData: (newData: Partial<AuthData>) => void;

  step: AuthStep;
  setStep: (step: AuthStep) => void;
}

const AuthFlowContext = createContext<AuthFlowContextType | undefined>(
  undefined,
);

const AuthFlowProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<AuthStep>('EMAIL');
  const [data, setInternalData] = useState<AuthData>({});

  const setData = (newData: Partial<AuthData>) => {
    setInternalData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <AuthFlowContext.Provider value={{ data, setData, step, setStep }}>
      {children}
    </AuthFlowContext.Provider>
  );
};

const useAuthFlow = () => {
  const context = useContext(AuthFlowContext);
  if (!context) {
    throw new Error('useAuthFlow must be used within AuthFlowProvider');
  }
  return context;
};

export { AuthFlowProvider, useAuthFlow };
export default AuthFlowContext;
