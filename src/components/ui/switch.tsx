import { cn } from '@/lib/utils';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

type SwitchProps = SwitchPrimitive.Root.Props;

const Switch = ({ className, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'relative inline-flex h-24 w-44 shrink-0 cursor-pointer items-center rounded-full p-2 transition-colors duration-300 outline-none',
        'data-checked:bg-primary-600 bg-gray-200',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'block size-20 rounded-full bg-white shadow-sm transition-transform duration-300',
          'data-checked:-translate-x-20 ltr:data-checked:translate-x-20',
        )}
      />
    </SwitchPrimitive.Root>
  );
};

export type { SwitchProps };
export default Switch;
