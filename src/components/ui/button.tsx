import { cn } from '@/lib/utils';

import ThreeDots from '../icons/three-dots';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { isLoading?: boolean };

const buttonVariants = cva(
  'group/button inline-flex items-center justify-center rounded-md border border-[1.5px] border-transparent bg-clip-padding whitespace-nowrap transition-all duration-300 outline-none select-none cursor-pointer active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
      },
      mode: {
        solid: 'text-white!',
        soft: '',
        outline: '',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'gap-8 px-20 text-button-sm',
        lg: 'gap-12 px-32 text-button-md',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        mode: 'solid',
        className:
          'bg-primary hover:bg-primary-600 disabled:bg-primary-200! disabled:text-white!',
      },
      {
        variant: 'primary',
        mode: 'soft',
        className:
          'bg-primary-50 text-primary-500! hover:bg-primary-100 hover:text-primary-600! disabled:bg-primary-50! disabled:text-primary-300!',
      },
      {
        variant: 'primary',
        mode: 'outline',
        className:
          'border-primary-500! bg-transparent text-primary-500! hover:bg-primary-50 hover:text-primary-600! hover:border-primary-600 disabled:bg-transparent! disabled:text-primary-200! disabled:border-primary-200!',
      },
      {
        variant: 'primary',
        mode: 'ghost',
        className:
          'text-primary-500! hover:bg-primary-50 hover:text-primary-600! disabled:bg-white! disabled:text-primary-200!',
      },
      {
        variant: 'secondary',
        mode: 'solid',
        className:
          'bg-gray-900 hover:bg-gray-800 disabled:bg-white! disabled:text-gray-200!',
      },
      {
        variant: 'secondary',
        mode: 'soft',
        className:
          'bg-gray-50 text-gray-900! hover:bg-gray-100 disabled:bg-gray-50! disabled:text-gray-300!',
      },
      {
        variant: 'secondary',
        mode: 'outline',
        className:
          'border-gray-900! bg-transparent text-gray-900! hover:bg-gray-50 disabled:bg-transparent! disabled:text-gray-200! disabled:border-gray-200!',
      },
      {
        variant: 'secondary',
        mode: 'ghost',
        className:
          'text-gray-900! hover:bg-gray-50 hover:text-gray-800! disabled:bg-white! disabled:text-gray-200!',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      mode: 'solid',
      size: 'sm',
    },
  },
);

const Button = ({
  className,
  variant = 'primary',
  mode = 'solid',
  size = 'sm',
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, mode, className }),
        'relative',
      )}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ThreeDots width={40} height={40} />
        </div>
      )}
      <span className={cn('flex items-center', isLoading && 'invisible')}>
        {children}
      </span>
    </ButtonPrimitive>
  );
};

export { buttonVariants };
export default Button;
