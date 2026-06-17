'use client';

import Icon from '@/components/common/icon';
import Avatar from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { TaskData } from '@/services/task/types';

import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd';

type TaskCardProps = {
  task: TaskData;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onClick?: () => void;
};

const TaskCard = ({ task, provided, snapshot, onClick }: TaskCardProps) => {
  return (
    <div
      ref={(el) => {
        provided.innerRef(el);
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={onClick}
      className={cn(
        'group flex flex-col gap-12 rounded-lg border border-gray-100 bg-white p-14 transition-all duration-200 ease-in-out hover:border-gray-300 hover:shadow-md',
        onClick && 'cursor-pointer',
        snapshot.isDragging &&
          'border-primary-500 ring-primary-100 scale-105 rotate-2 shadow-xl ring-2',
      )}
    >
      <span className="text-body-sm-500 line-clamp-2 leading-relaxed text-gray-800">
        {task.title}
      </span>

      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-12">
        {task.due_date ? (
          <div className="flex items-center gap-6 text-gray-400 transition-colors group-hover:text-gray-500">
            <Icon name="icon-[basil--calendar-outline]" className="icon-16" />
            <span className="text-caption-02 tracking-wide">
              {new Date(task.due_date).toLocaleDateString('fa-IR', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        ) : (
          <div />
        )}

        {task.assignee && (
          <Avatar
            src={task.assignee.avatar ?? undefined}
            fallback={task.assignee.first_name || task.assignee.username}
            size={24}
            className="ring-2 ring-white"
          />
        )}
      </div>
    </div>
  );
};

export default TaskCard;
