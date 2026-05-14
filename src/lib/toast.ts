import type { ShowToastOptions } from '@/components/common/toast';
import { showToast } from '@/components/common/toast';

const toast = {
  info: (message: string, options?: ShowToastOptions) => {
    return showToast(message, 'info', options);
  },
  success: (message: string, options?: ShowToastOptions) => {
    return showToast(message, 'success', options);
  },
  warning: (message: string, options?: ShowToastOptions) => {
    return showToast(message, 'warning', options);
  },
  error: (message: string, options?: ShowToastOptions) => {
    return showToast(message, 'error', options);
  },
};

export default toast;
