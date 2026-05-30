import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const buildFormData = <T extends Record<string, unknown>>(
  payload: T,
): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value == null) return;

    if (typeof value === 'string') {
      if (value.trim() !== '') {
        formData.append(key, value);
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      formData.append(key, String(value));
    } else if (value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    }
  });

  return formData;
};

export { buildFormData, cn };
