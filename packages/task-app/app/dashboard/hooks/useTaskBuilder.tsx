/* eslint-disable no-unused-vars */
import { priorityType } from '@core/models';
import { ITaskTemplate, useTaskContext } from '../context';
import { getRandomId } from '@app/utils';
import { useTeamMediator } from './useTeamMediator';

interface ITaskBuilder {
  setTaskName: (name: string) => void;
  getTaskName(): string;
  setTaskDescription: (name: string) => void;
  getTaskDescription(): string | undefined;
  reset(): void;
  buildTask: () => ITaskTemplate;
  getTaskPriority: () => priorityType;
  setTaskPriority: (priority: priorityType) => void;
  getTaskUsersId: () => string[];
  addTaskUserId: (id: string) => void;
  deleteTaskUserId: (id: string) => void;
  setTaskCategory: (id: string) => void;
  getTaskCategory: () => string;
  setTaskDate: (date: string) => void;
  getTaskDate: () => string;
  setTaskId: (id: string) => void;
  setTaskNewTeam: (isNew: boolean) => void;
  setTaskNewCategory: (isNew: boolean) => void;
  setTaskCategoryId: (id: string) => void;
  isNewCategory: () => boolean;
  isNewTeam: () => boolean;
  setTaskTeam: (team: string) => void;
  getTaskTeam: () => string;
}

function useTaskBuilder(): ITaskBuilder {

  const { taskContext, setTaskContext } = useTaskContext();
  const { update } = useTeamMediator();

  const setTaskDate = (date: string) => {
    setTaskContext((state) => ({ ...state, taskDate: date }));
  };

  const getTaskDate = () => {
    return taskContext.taskDate;
  };

  const setTaskId = (id: string) => {
    setTaskContext((state) => ({ ...state, taskId: id }));
  };

  const setTaskName = (name: string): void => {

    const id = getRandomId();
    setTaskDate(getActualDate());
    setTaskId(id);

    setTaskContext((state) => ({
      ...state,
      taskName: name
    }));

  };

  const setTaskDescription = (description: string): void => {
    setTaskContext((state) => (
      {
        ...state,
        taskDescription: description
      }
    ));
  };

  const setTaskPriority = (priority: priorityType) => {
    setTaskContext((state) => ({
      ...state,
      taskPriority: priority
    }));
  };

  const getTaskPriority = () => {
    return taskContext.taskPriority;
  };

  const getTaskName = () => {
    return taskContext.taskName;
  };

  const getTaskDescription = (): string | undefined => {
    return taskContext.taskDescription;
  };

  const getTaskUsersId = (): string[] => {
    return taskContext.taskUsersId;
  };

  const setTaskUsersId = (usersId: string[]) => {
    setTaskContext((state) => (
      {
        ...state,
        taskUsersId: usersId
      }
    ));
  };

  const setTaskTeam = (team: string) => {
    setTaskContext((state) => (
      {
        ...state,
        taskTeam: team
      }
    ));
  };

  const getTaskTeam = () => {
    return taskContext.taskTeam;
  };

  const setTaskCategory = (taskCategory: string) => {
    setTaskContext((state) => (
      {
        ...state,
        taskCategory: taskCategory
      }
    ));
  };

  const getTaskCategory = () => {
    return taskContext.taskCategory;
  };

  const setTaskNewTeam = (isNew: boolean) => {
    setTaskContext((state) => ({ ...state, isNewTeam: isNew }));
  };

  const setTaskNewCategory = (isNew: boolean) => {
    setTaskContext((state) => ({ ...state, isNewCategory: isNew }));
  };
  
  const setTaskCategoryId = (id: string) => {
    setTaskContext((state) => ({ ...state, taskCategoryId: id }));
    
  };

  const isNewCategory = () => {
    return taskContext.isNewCategory;
  };

  const isNewTeam = () => {
    return taskContext.isNewTeam;
  };


  const addTaskUserId = (id: string) => {

    let taskUsers = getTaskUsersId().slice(); // copy of taskUsers to be muted

    if (taskUsers.find(userId => userId === id)) return; // validate userId not already exists 

    taskUsers.push(id);

    setTaskContext((state) => (
      {
        ...state,
        taskUsersId: taskUsers
      }
    ));
  };

  const deleteTaskUserId = (taskUsersId: string) => {
    const taskUsers = getTaskUsersId();
    const filteredUsers = taskUsers.filter((userId) => userId !== taskUsersId);

    setTaskUsersId(filteredUsers);
  };

  const getActualDate = (): string => {
    const date = new Date();
    const today = `${date.getMonth() + 1}/${date.getDate()}`;
    return today;
  };

  const buildTask = (): ITaskTemplate => {
    update(taskContext);
    return taskContext;
  };

  const reset = (): void => {
    setTaskContext(
      {
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
      }
    );
  };

  return {
    setTaskName,
    getTaskName,
    setTaskDescription,
    getTaskDescription,
    getTaskPriority,
    setTaskPriority,
    getTaskUsersId,
    setTaskCategory,
    getTaskCategory,
    setTaskNewCategory,
    setTaskNewTeam,
    isNewCategory,
    isNewTeam,
    setTaskId,
    setTaskDate,
    addTaskUserId,
    deleteTaskUserId,
    reset,
    setTaskCategoryId,
    setTaskTeam,
    getTaskTeam,
    getTaskDate,
    buildTask
  };
}

export default useTaskBuilder;
