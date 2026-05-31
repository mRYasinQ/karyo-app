import Icon from '@/components/common/icon';
import IconButton from '@/components/ui/icon-button';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import type { PropsWithChildren } from 'react';

type DialogProps = {
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;

const Dialog = ({ title, isOpen, onOpenChange, children }: DialogProps) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-24 shadow-2xl outline-none">
          <div className="flex items-center justify-between">
            <DialogPrimitive.Title className="text-heading-6 font-bold text-gray-900">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              render={
                <IconButton variant="secondary" mode="ghost">
                  <Icon name="icon-[basil--cross-solid]" className="size-24" />
                </IconButton>
              }
            />
          </div>
          <DialogPrimitive.Viewport className="mt-24">
            {children}
          </DialogPrimitive.Viewport>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
