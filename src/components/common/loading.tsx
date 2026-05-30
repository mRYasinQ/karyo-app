import { cn } from '@/lib/utils';

import type { HTMLAttributes } from 'react';

type Size = 'sm' | 'md' | 'lg';
interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

const Loading = ({ size = 'md', className, ...props }: LoadingProps) => {
  const sizeClasses = {
    sm: 'size-16 border-2',
    md: 'size-24 border-2',
    lg: 'size-32 border-3',
  };

  return (
    <div
      className={cn(
        'border-primary-500 animate-spin rounded-full border-solid border-t-transparent',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};

export default Loading;
