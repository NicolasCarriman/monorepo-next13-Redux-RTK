'use client';
import React from 'react';
import { ITask } from '@core/models/task.model';
import Card from '@app/components/common/card';
import { TaskPriority, TaskStatus } from '../../common/taskItem';
import DateComponent from '@app/components/common/date';
import { AvatarStack } from '../avatarStack/avatarStack';
import { twMerge } from 'tailwind-merge';
import { useTask } from '@app/hooks/useTasks';

interface TaskCardProps {
  data:ITask
}
function TaskCard({ data }: TaskCardProps) {
  const { taskState, setCurrentTask }  = useTask();
  const isSelected = taskState.currentTask === data.taskId;
  const handleClick = (id: string) => { 
    setCurrentTask(id);
  };

  return (
    <Card
      onClick={() => handleClick(data.taskId)}
      className={
        twMerge(`
        transition-all
        duration-300
        hover:bg-blue-200 
        hover:text-white 
        `, isSelected && 'bg-[#D6FFE8]'
        )
      }
      header={
        <>
          <DateComponent date={data.taskDate} />
          <TaskPriority priority={data.taskPriority} />
        </>
      }
      footer={
        <TaskStatus status={data.taskStatus} />
      }
    >
        <p className= 'mb-4 overflow-wrap break-word font-medium text-sm'>
          {data.taskName}
        </p>
        <AvatarStack label={false} usersId={data.taskUsersId}  />
    </Card>
  );
}

export default TaskCard;
