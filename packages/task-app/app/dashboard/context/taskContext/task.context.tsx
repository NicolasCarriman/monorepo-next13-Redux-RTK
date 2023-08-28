import { ITask } from '@core/models';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface ITaskTemplate extends ITask {
  isNewTeam: boolean;
  isNewCategory: boolean;
  taskCategoryId: string;
  taskTeam: string;
  taskTeamId: string;
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
    taskCategoryId: '',
    taskUsersId: [],
    taskPriority: 'none',
    taskStatus: 'inProgress',
    taskId: '',
    taskTeam: '',
    taskTeamId: ''
  },
  setTaskContext: () => {}
});

export const useTaskContext = () => useContext(TaskContext);
