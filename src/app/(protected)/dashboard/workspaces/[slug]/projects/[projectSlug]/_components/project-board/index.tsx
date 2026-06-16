'use client';

import { useEffect, useState } from 'react';

import PageLoader from '@/app/(protected)/dashboard/_components/page-loader';
import Icon from '@/components/common/icon';
import Button from '@/components/ui/button';
import toast from '@/lib/toast';
import TaskService from '@/services/task';
import type { TaskData, TaskStatus } from '@/services/task/types';

import { TASK_STATUSES } from '../../_constants/task-status';
import TaskCard from './task-card';

import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ProjectBoardProps = {
  workspaceId: number;
  projectId: number;
  workspaceRole: string;
};

type BoardState = Record<TaskStatus, TaskData[]>;

type UpdateTaskStatusArgs = {
  taskId: number;
  status: TaskStatus;
};

const ProjectBoard = ({
  workspaceId,
  projectId,
  workspaceRole,
}: ProjectBoardProps) => {
  const [columns, setColumns] = useState<BoardState>({
    todo: [],
    in_progress: [],
    review: [],
    done: [],
  });

  const queryClient = useQueryClient();

  const isOwner = workspaceRole === 'owner';
  const isAdmin = workspaceRole === 'admin';
  const canDrag = workspaceRole !== 'guest';
  const canEdit = isOwner || isAdmin;

  const { data: tasksResponse, isLoading } = useQuery({
    queryKey: ['tasks', workspaceId, projectId],
    queryFn: () => TaskService.getTasks(workspaceId, projectId),
  });

  useEffect(() => {
    if (tasksResponse?.data) {
      const groupedTasks: BoardState = {
        todo: [],
        in_progress: [],
        review: [],
        done: [],
      };

      tasksResponse.data.forEach((task) => {
        if (groupedTasks[task.status]) groupedTasks[task.status].push(task);
      });

      setColumns(groupedTasks);
    }
  }, [tasksResponse?.data]);

  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: ({ taskId, status }: UpdateTaskStatusArgs) => {
      return TaskService.updateTaskStatus(workspaceId, projectId, taskId, {
        status,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', workspaceId, projectId],
      });
    },
    onError: async () => {
      toast.error('خطا در تغییر وضعیت وظیفه.');
      await queryClient.invalidateQueries({
        queryKey: ['tasks', workspaceId, projectId],
      });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newColumns = { ...columns };
    const sourceList = Array.from(newColumns[sourceStatus]);
    const destList = Array.from(newColumns[destStatus]);

    const taskId = Number(draggableId);
    const movedTaskIndex = sourceList.findIndex((t) => t.id === taskId);

    if (movedTaskIndex === -1) return;
    const movedTask = sourceList[movedTaskIndex];

    if (sourceStatus === destStatus) {
      sourceList.splice(source.index, 1);
      sourceList.splice(destination.index, 0, movedTask);
      newColumns[sourceStatus] = sourceList;
      setColumns(newColumns);

      return;
    }

    sourceList.splice(source.index, 1);
    movedTask.status = destStatus;
    destList.splice(destination.index, 0, movedTask);

    newColumns[sourceStatus] = sourceList;
    newColumns[destStatus] = destList;
    setColumns(newColumns);

    updateTaskStatus({ taskId, status: destStatus });
  };

  if (isLoading) {
    return <PageLoader className="rounded-lg bg-white" />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-start gap-20 overflow-x-auto pb-12">
        {TASK_STATUSES.map((statusObj) => {
          const status = statusObj.value;
          const tasks = columns[status] || [];

          return (
            <div
              key={status}
              className="flex w-xs shrink-0 flex-col gap-16 rounded-xl border border-gray-200 bg-gray-50 p-16 shadow-sm"
            >
              <div className="flex items-center justify-between px-4 pb-4">
                <h3 className="text-body-md-600 text-gray-800">
                  {statusObj.name}
                </h3>
                <span className="text-caption-02 flex h-24 min-w-24 items-center justify-center rounded-full bg-gray-200 px-8 font-medium text-gray-600">
                  {tasks.length}
                </span>
              </div>

              {status === 'todo' && canEdit && (
                <Button
                  variant="secondary"
                  mode="soft"
                  className="w-full justify-start border border-dashed border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                >
                  <Icon
                    name="icon-[basil--plus-solid]"
                    className="mr-4 size-20 text-gray-500"
                  />
                  <span className="text-gray-600">ایجاد تسک جدید</span>
                </Button>
              )}

              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={(el) => {
                      provided.innerRef(el);
                    }}
                    {...provided.droppableProps}
                    className="flex min-h-150 flex-col gap-10"
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                        isDragDisabled={!canDrag}
                      >
                        {(provided, snapshot) => (
                          <TaskCard
                            task={task}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default ProjectBoard;
