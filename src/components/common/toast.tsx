'use client';

import { cn } from '@/lib/utils';

import Icon from './icon';

import { toast as sonnerToast } from 'sonner';

type ToastType = keyof typeof variantIcons;
type ToastProps = {
  id?: string | number;
  title?: string;
  message: string;
  type: ToastType;
  icon?: boolean;
  onClose?: () => void;
};
type ShowToastOptions = Omit<ToastProps, 'message' | 'type'>;

const variantIcons = {
  info: (
    <Icon
      name="icon-[basil--info-circle-outline]"
      className="text-primary icon-32"
    />
  ),
  success: (
    <Icon
      name="icon-[basil--checked-box-outline]"
      className="text-success icon-32"
    />
  ),
  warning: (
    <Icon
      name="icon-[basil--info-triangle-outline]"
      className="text-warning icon-32"
    />
  ),
  error: (
    <Icon name="icon-[basil--cancel-outline]" className="text-error icon-32" />
  ),
};

const Toast = ({
  id,
  title,
  message,
  type,
  icon = true,
  onClose,
}: ToastProps) => {
  const closeHandler = () => {
    onClose?.();
    sonnerToast.dismiss(id);
  };

  return (
    <div
      className={cn(
        'flex cursor-pointer gap-12 p-16',
        'rounded-2xl border border-r-4 border-gray-100 bg-white',
        {
          'border-r-primary': type === 'info',
          'border-r-success': type === 'success',
          'border-r-warning': type === 'warning',
          'border-r-error': type === 'error',
        },
        !title && 'items-center',
      )}
      onClick={closeHandler}
    >
      {icon && variantIcons[type]}
      <div className="flex flex-col gap-6">
        {title && (
          <span className="text-subheading-03 text-gray-900">{title}</span>
        )}
        <p className="text-body-sm-500 text-gray-500">{message}</p>
      </div>
    </div>
  );
};

const showToast = (
  message: string,
  type: ToastType,
  options: ShowToastOptions = {},
) => {
  sonnerToast.custom((id) => <Toast {...{ ...options, id, type, message }} />);
};

export type { ToastProps, ShowToastOptions };
export { showToast };
export default Toast;
