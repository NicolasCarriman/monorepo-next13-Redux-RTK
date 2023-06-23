'use client';
import React, { useState } from 'react';
import { ITask, statusType } from '@core/models/task.model';
import Card from '@app/components/common/card';
import { TaskPriority, TaskStatus } from '../../common/taskItem';
import DateComponent from '@app/components/common/date';
import { AvatarStack } from '../avatarStack/avatarStack';
import { twMerge } from 'tailwind-merge';
import { useTask } from '@app/hooks/useTasks';
import { useAppSelector } from '@app/hooks/redux';
import { userSelector } from '@core/redux/reducers/userSlice/user.selector';
import List from '@app/components/common/list';
import ListItem from '@app/components/common/listItem';

interface TaskCardProps {
  data: ITask
}
function TaskCard({ data }: TaskCardProps) {
  const user = useAppSelector(userSelector);
  const { taskState, setCurrentTask, changeStatus } = useTask();
  const [showList, setShowList] = useState(false);
  const isSelected = taskState.currentTask === data.taskId;
  const isEditable = data.taskUsersId.includes(user.id);
  const allStatus: statusType[] = ['done', 'stuck', 'inProgress'];

  const handleClick = (id: string) => {
    setCurrentTask(id);
  };

  const handleShow = () => {
    if (!isEditable) return;
    setShowList(true);
  };

  const handleStatus = (status: statusType) => {
    const task = data;
    changeStatus(status, task);
    setShowList(false);
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
        <>
          <TaskStatus onClick={handleShow} edit={isEditable} status={data.taskStatus} />
          {
            showList &&
            <List
              className='
                absolute
                mb-[23vh]
                bg-white 
                text-black
              '
              data={allStatus}
              renderedItem={(status) =>
                <ListItem onClick={() => handleStatus(status)}>
                  {status}
                </ListItem>
              } />
          }
        </>
      }
    >
      <p className='mb-4 overflow-wrap break-word font-medium text-sm'>
        {data.taskName}
      </p>
      <AvatarStack label={false} usersId={data.taskUsersId} />
    </Card>
  );
}

export default TaskCard;
