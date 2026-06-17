import { cn } from '@/lib/utils';

import Icon from './icon';

type EmptyStateProps = {
  description: string;
  icon?: string;
  className?: string;
};

const EmptyState = ({ description, icon, className }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-20 rounded-lg p-24',
        className,
      )}
    >
      {icon && (
        <div className="flex size-80 items-center justify-center rounded-full bg-gray-50 ring-8 ring-gray-50/50">
          <Icon name={icon} className="icon-40 text-gray-400" />
        </div>
      )}
      <p className="text-body-md-400 text-center text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
