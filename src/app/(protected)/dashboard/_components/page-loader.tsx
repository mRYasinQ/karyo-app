import Loading from '@/components/common/loading';

const PageLoader = () => {
  return (
    <div className="flex min-h-400 w-full items-center justify-center">
      <Loading size="lg" />
    </div>
  );
};

export default PageLoader;
