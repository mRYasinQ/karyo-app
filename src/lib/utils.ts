import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

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

const withCleanFields = <T extends z.ZodTypeAny>(schema: T) => {
  return z.preprocess((data) => {
    if (typeof data !== 'object' || data === null) return data;

    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === '' ? undefined : value,
      ]),
    );
  }, schema) as unknown as T;
};

export { cn, buildFormData, withCleanFields };
