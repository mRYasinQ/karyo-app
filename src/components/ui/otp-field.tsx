'use client';

import { useId } from 'react';

import { cn } from '@/lib/utils';

import Icon from '../common/icon';
import { inputVariants } from './input';

import { OTPFieldPreview as OTPFieldPrimitive } from '@base-ui/react/otp-field';

type OtpFieldProps = {
  length: number;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  autoSubmit?: boolean;
};

const OtpField = ({
  length,
  error,
  errorMessage,
  value,
  onChange,
  disabled,
  autoSubmit,
}: OtpFieldProps) => {
  const id = useId();

  const activeVariant = error ? 'error' : 'primary';

  return (
    <div className="flex w-full flex-col gap-8">
      <OTPFieldPrimitive.Root
        id={id}
        length={length}
        dir="ltr"
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        autoSubmit={autoSubmit}
        className="flex w-full justify-between gap-8"
      >
        {Array.from({ length }, (_, index) => (
          <OTPFieldPrimitive.Input
            key={index}
            className={cn(
              inputVariants({ variant: activeVariant }),
              'text-body-lg-500 h-54 w-full justify-center p-0 text-center',
              'focus-within:ring-0 focus-within:ring-offset-0',
              'selection:bg-transparent',
            )}
          />
        ))}
      </OTPFieldPrimitive.Root>

      {errorMessage && (
        <p className="text-error text-caption-03 flex items-center gap-6">
          <Icon name="icon-[basil--info-triangle-solid]" className="icon-20" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export type { OtpFieldProps };
export default OtpField;
