import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

export { cn };
