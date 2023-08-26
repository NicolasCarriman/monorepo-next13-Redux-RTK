import { ITask } from '@core/models';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface ITaskTemplate extends ITask {
  isNewTeam: boolean;
  isNewCategory: boolean;
}

export interface ITaskContext {
  taskContext: ITaskTemplate ,
  setTaskContext: Dispatch<SetStateAction<ITaskTemplate>>, 
}

export const TaskContext = createContext<ITaskContext>({
  taskContext: {
    isNewTeam: false,
    isNewCategory: false,
    taskName: '',
    taskDate: '',
    taskCategory: '',
    taskUsersId: [],
    taskPriority: 'none',
    taskStatus: 'inProgress',
    taskId: ''
  },
  setTaskContext: () => {},
});

export const useTaskContext = () => useContext(TaskContext);
