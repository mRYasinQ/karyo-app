'use client';

import { useState } from 'react';

import Icon from '../common/icon';
import Input, { type InputProps } from './input';

type PasswordInputProps = Omit<InputProps, 'endIcon' | 'type'>;

const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      endIcon={
        <Icon
          name={
            showPassword
              ? 'icon-[basil--eye-closed-solid]'
              : 'icon-[basil--eye-solid]'
          }
          className="cursor-pointer"
          onClick={handleShowPassword}
        />
      }
      {...props}
    />
  );
};

export default PasswordInput;
