import React, { useState } from 'react';
import { ITaskTemplate, TaskContext } from './taskContext/task.context';

interface Props {
  children: React.ReactNode
}

function ContextProvider({ children }: Props) {
  const [taskContext, setTaskContext] = useState<ITaskTemplate>({
    isNewTeam: false,
    isNewCategory: false,
    taskName: '',
    taskDate: '',
    taskDescription: '',
    taskCategory: '',
    taskCategoryId: '',
    taskUsersId: [],
    taskPriority: 'none',
    taskStatus: 'inProgress',
    taskId: '',
    taskTeam: '',
    taskTeamId: ''
  });

  return (
    <TaskContext.Provider value={{ taskContext, setTaskContext }}>
      {children}
    </TaskContext.Provider>
  );
}

export default ContextProvider;
