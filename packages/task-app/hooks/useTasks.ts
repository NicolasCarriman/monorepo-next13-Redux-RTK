import { taskSelector } from '@core/redux/reducers/taskSlice/task.selector';
import { useAppDispatch, useAppSelector } from './redux';
import { TaskState } from '@core/redux/reducers/taskSlice/task.state';
import {
  addSubtask,
  addTask,
  deleteTask,
  selectCurrentSubtask,
  selectCurrentTask,
  updateTask
} from '@core/redux/reducers/taskSlice/task.slice';
import { ITask, subtask, subtaskItem } from '@core/models';
import { useTeam } from './useTeam';
import { store } from '@core/index';
import { getRandomId } from '@app/utils/uid';

export const useTask = () => {
  const taskState = useAppSelector(taskSelector) as TaskState;
  const team = store.getState().team;
  const dispatch = useAppDispatch();
  const { getCurrentCategory } = useTeam();

  const getCurrentTask = (taskId: string) => {
    const tasks = taskState.tasks;
    const currentTask: ITask = tasks.find((t: ITask) => t.taskId === taskId);
    return currentTask;
  };

  const setSubTaskId = (subTaskId: string) => {
    dispatch(selectCurrentSubtask(subTaskId));
  };

  /**
   * this function should set the current task id and subtask id on the store
   * @param taskId id from current task
   */

  const setCurrentTask = (taskId: string) => {
    dispatch(selectCurrentTask(taskId));
    const subtask = getCurrentSubtaskId(taskId);

    if (!subtask) {
      setSubTaskId('');
      return;
    };

    setSubTaskId(subtask);
  };

  /**
   * if not have current taskId on the store
   * the code search the first task from the current category team
   */

  const getCurrentTaskId = () => {
    if (!taskState.currentTask) {
      const category = team.currentCategoryId && getCurrentCategory(team.currentCategoryId);
      const taskId = category && category.tasks[0];
      return taskId;
    } else {
      const currentTask = getCurrentTask(taskState.currentTask);
      return currentTask.taskId;
    }
  };

  const deleteCurrentTask = (id: string) => {
    if (id === taskState.currentTask) {
      dispatch(selectCurrentTask(''));
      setSubTaskId('');
    }
    dispatch(deleteTask(id));
  };

  /**
   * need to have currentTaskId on the store
   */

  const getCurrentSubtaskId = (taskId: string) => {
    const task = getCurrentTask(taskId);
    if (!task) return;

    const subtasks = task.subtasks;
    if (!subtasks) return;
    if(subtasks.length === 0) return;

    const currentSubtask = subtasks[0].id;
    return currentSubtask;
  };

  const getCurrentSubtask = (subTaskId: string) => {
    const task = getCurrentTask(taskState.currentTask);
    if (!task) return;
    const subtasks = task.subtasks;
    if (!subtasks) return;
    else {
      const currentSubtask = subtasks.find((subT) => (subT.id === subTaskId));
      return currentSubtask;
    }
  };

  /**
   * this function is called when the user create a new subtaskItem on the current subtask
   * is responsible for add the item on the current subtask and update the tasks state
   * @param item subtaskItem { name: string, done: boolean } 
   */

  const addSubtaskItem = (item: subtaskItem) => {
    const tasks = taskState.tasks;
    const taskId = taskState.currentTask;
    const subtaskId = taskState.currentSubtask;
    const currentTask: ITask | undefined = tasks.find((t: ITask) => t.taskId === taskId);

    if (!currentTask?.subtasks) return;
    const subtasks = currentTask.subtasks;
    // verify if the task exists in the store
    const currentSubtask = currentTask.subtasks.find((s: subtask) => s.id === subtaskId);
    if (!currentSubtask) return;
    // check if current subtask exists in the store
    
    const updatedCurrentSubtask = {
      //copy of current subtask
      ...currentSubtask,
      items: [...currentSubtask.items, item]
    };

    if(!subtasks) return;
    const updatedSubtasks = subtasks.map((subT) => {
      if (subT.id === subtaskId) {
        return updatedCurrentSubtask;
      } else return subT;
    });
  
    const updatedTask = {
      ...currentTask,
      subtasks: updatedSubtasks
    };
    // remplace the subtask updated item on the current task
    dispatch(updateTask(updatedTask));
  };

  const setSubtaskItem = (done: boolean, id: string, item: string) => {
    const tasks = taskState.tasks;
    const taskId = taskState.currentTask;
    const subtaskId = taskState.currentSubtask;
    const currentTask: ITask | undefined = tasks.find((t: ITask) => t.taskId === taskId);
    const newItem: subtaskItem = {
      item: item,
      done: done,
      id: id,
    };


    if (!currentTask?.subtasks) return;
    const subtasks = currentTask.subtasks;
    // verify if the task exists in the store
    const currentSubtask = currentTask.subtasks.find((s: subtask) => s.id === subtaskId);
    if (!currentSubtask) return;
    // check if current subtask exists in the store

    const updatedItem = currentSubtask.items.map((item) => {
      if (item.id === id) return newItem;
      else return item;
    });

    const updatedCurrentSubtask = {
      //copy of current subtask
      ...currentSubtask,
      items: updatedItem
    };

    if(!subtasks) return;
    const updatedSubtasks = subtasks.map((subT) => {
      if (subT.id === subtaskId) {
        return updatedCurrentSubtask;
      } else return subT;
    });

    const updatedTask = {
     ...currentTask,
      subtasks: updatedSubtasks
    };

    dispatch(updateTask(updatedTask));
  };

  const createSubtask = (subtaskName: string) => {
    const subtask = {
      name: subtaskName,
      id: getRandomId(),
      items: []
    };
    return subtask;
  };

  const addNewSubtask = (subtaskName: string) => {
    const subtask = createSubtask(subtaskName);
    dispatch(addSubtask(subtask));
  };

  const getAllSubtasksItems = () => {
    const taskId = taskState.currentTask;
    const task = getCurrentTask(taskId);
    const subtask = task.subtasks;

    if (!subtask) return;

    const items = subtask.flatMap((subT) => subT.items);

    return items;
  };

  const addNewTask = (task: ITask) => {
    dispatch(addTask(task));
  };

  return {
    getCurrentCategory,
    getCurrentSubtaskId,
    getCurrentTaskId,
    getCurrentTask,
    setCurrentTask,
    setSubTaskId,
    getCurrentSubtask,
    addSubtaskItem,
    addNewSubtask,
    setSubtaskItem,
    getAllSubtasksItems,
    deleteCurrentTask,
    addNewTask,
    taskState
  };
};
