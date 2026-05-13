'use client';

import { cn } from '@/lib/utils';

import Icon from '../common/icon';

import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

type InputProps = InputPrimitive.Props &
  VariantProps<typeof inputVariants> & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    error?: boolean;
    errorMessage?: string;
  };

const inputVariants = cva(
  'flex w-full items-center gap-10 rounded-sm border bg-white text-body-md-500 px-18 py-8 transition-all duration-300 outline-none cursor-text disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: [
          'text-gray-500 focus-within:text-gray-900 hover:text-gray-900',
          'border-gray-100 focus-within:border-primary-500 hover:border-primary-500',
          'hover:shadow-md focus-within:shadow-md',
        ],
        error: 'text-gray-700! border-error-500! focus-within:border-red-500!',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const Input = ({
  className,
  variant = 'primary',
  startIcon,
  endIcon,
  error,
  errorMessage,
  ...props
}: InputProps) => {
  const activeVariant = error ? 'error' : variant;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className={cn(inputVariants({ variant: activeVariant, className }))}>
        {startIcon && (
          <span
            className={cn(
              '*:icon-24 text-primary-500 flex items-center justify-center',
              error && 'text-error-500',
            )}
          >
            {startIcon}
          </span>
        )}

        <InputPrimitive
          {...props}
          className={cn(
            'w-full p-0',
            'text-body-md-400 bg-transparent placeholder:text-gray-200',
            'border-none outline-none',
            'autofill:[transition:background-color_5000s_ease-in-out_0s]',
          )}
        />

        {endIcon && (
          <span
            className={cn(
              '*:icon-24 text-primary-500 flex items-center justify-center',
              error && 'text-error-500',
            )}
          >
            {endIcon}
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="text-error text-caption-03 flex items-center gap-6">
          <Icon name="icon-[basil--info-triangle-solid]" className="icon-20" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export { inputVariants, type InputProps };
export default Input;
