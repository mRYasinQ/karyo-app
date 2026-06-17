import { cn } from '@/lib/utils';

import Icon from '../common/icon';

import { Select as SelectPrimitive } from '@base-ui/react/select';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const Select = ({
  value,
  onValueChange,
  options,
  placeholder,
  className,
  disabled,
}: SelectProps) => {
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={(val) => val !== null && onValueChange?.(val)}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className={cn(
          'text-body-md-500 flex cursor-pointer items-center justify-between gap-10 rounded-sm border bg-white px-18 py-8 transition-all duration-300 outline-none',
          'hover:border-primary-500 focus-within:border-primary-500 border-gray-100 text-gray-500! focus-within:text-gray-900 hover:text-gray-900',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          className,
        )}
      >
        <span className="truncate">
          {selectedLabel || <SelectPrimitive.Value placeholder={placeholder} />}
        </span>
        <SelectPrimitive.Icon
          render={
            <Icon name="icon-[basil--caret-down-solid]" className="icon-20" />
          }
        />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner className="z-100" sideOffset={8}>
          <SelectPrimitive.Popup className="z-100 min-w-(--anchor-width) origin-(--transform-origin) rounded-md border border-gray-100 bg-white p-4 shadow-lg transition-all outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            {options.map(({ label, value }) => (
              <SelectPrimitive.Item
                key={value}
                value={value}
                className="text-body-md-400 focus:bg-primary-50 focus:text-primary-600 data-highlighted:bg-primary-50 data-highlighted:text-primary-600 flex cursor-pointer items-center justify-between rounded-sm px-12 py-8 text-gray-700 outline-none select-none hover:bg-gray-50"
              >
                <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator
                  render={
                    <Icon
                      name="icon-[basil--check-solid]"
                      className="text-primary-600 icon-20"
                    />
                  }
                />
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export type { SelectOption, SelectProps };
export default Select;
