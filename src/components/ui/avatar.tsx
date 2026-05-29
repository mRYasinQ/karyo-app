import { cn } from '@/lib/utils';

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { cva, type VariantProps } from 'class-variance-authority';

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
};

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-700 text-white! cursor-pointer',
  {
    variants: {
      size: {
        24: 'size-24 text-body-sm-500',
        32: 'size-32 text-body-sm-500',
        40: 'size-40 text-body-sm-500',
        48: 'size-48 text-body-sm-500',
        64: 'size-64 text-body-xtra-500',
        80: 'size-80 text-body-xxl-500',
      },
    },
    defaultVariants: {
      size: 40,
    },
  },
);

const getInitials = (name: string, size: number | null) => {
  if (!name) return '';

  const words = name.trim().split(/\s+/);
  const firstLetter = words[0]?.[0] ?? '';

  if (size === 24 || size === 32) return firstLetter;

  const secondLetter = words[1]?.[0] ?? '';
  return secondLetter ? `${firstLetter} ${secondLetter}` : firstLetter;
};

const Avatar = ({ src, alt, fallback, size = 40, className }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ size, className }))}>
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt || fallback}
          className="size-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center">
        {getInitials(fallback, size)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export { avatarVariants };
export default Avatar;
