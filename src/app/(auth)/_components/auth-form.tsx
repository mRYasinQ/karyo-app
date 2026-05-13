import type { PropsWithChildren } from 'react';

type AuthFormProps = { title: string } & PropsWithChildren;

const AuthForm = ({ title, children }: AuthFormProps) => {
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-caption-01 text-gray-900">{title}</h1>
      {children}
    </div>
  );
};

export default AuthForm;
