import Image from 'next/image';

import { cn } from '@/lib/utils';

type WorkspaceLogoProps = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fallback: string;
  className?: string;
};

const WorkspaceLogo = ({
  src,
  alt,
  width = 48,
  height = 48,
  fallback,
  className,
}: WorkspaceLogoProps) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('h-full w-full rounded-xl object-cover', className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'bg-primary-50 text-primary-600 flex h-full w-full items-center justify-center rounded-xl',
        className,
      )}
    >
      <span className="text-body-lg-500 font-bold">{fallback}</span>
    </div>
  );
};

export default WorkspaceLogo;
