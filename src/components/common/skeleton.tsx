import { cn } from '@/lib/utils';

type SkeletonProps = { className?: string };

const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cn('animate-pulse bg-gray-300', className)}></div>;
};

export type { SkeletonProps };
export default Skeleton;
