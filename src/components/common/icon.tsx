import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef, ElementType } from 'react';

type IconProps<T extends ElementType> = {
  as?: T;
  name: string;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const Icon = <T extends ElementType = 'span'>({
  as,
  name,
  className,
  ...props
}: IconProps<T>) => {
  const Component = as || 'span';

  return (
    <Component
      role="img"
      aria-hidden="true"
      className={cn(name, className)}
      {...props}
    />
  );
};

export type { IconProps };
export default Icon;
