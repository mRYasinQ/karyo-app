import Loading from '@/components/common/loading';
import { cn } from '@/lib/utils';

type PageLoaderProps = { className?: string };

const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div
      className={cn(
        'flex min-h-400 w-full items-center justify-center',
        className,
      )}
    >
      <Loading size="lg" />
    </div>
  );
};

export default PageLoader;
