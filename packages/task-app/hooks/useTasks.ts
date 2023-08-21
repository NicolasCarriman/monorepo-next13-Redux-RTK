import { taskSelector } from '@core/redux/reducers/taskSlice/task.selector';
import { useAppDispatch, useAppSelector } from './redux';
import { TaskState } from '@core/redux/reducers/taskSlice/task.state';
import {
  addTask,
  deleteTask,
  selectCurrentSubtask,
  selectCurrentTask,
  updateTask
} from '@core/redux/reducers/taskSlice/task.slice';
import { ITask, statusType, subtask, subtaskItem } from '@core/models';
import { useTeam } from './useTeam';
import { Subtask, TaskClass } from '@core/utils/task';

export const useTask = () => {
  const taskState = useAppSelector(taskSelector) as TaskState;
  const dispatch = useAppDispatch();
  const { getCurrentCategory } = useTeam();
 
  const getCurrentTask = (taskId: string) => {
    const tasks = taskState.tasks;
    const currentTask: ITask | undefined = tasks.find((t: ITask) => t.taskId === taskId);
    if (!currentTask) return tasks[0];
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

  const deleteCurrentTask = (id: string) => {
    if (id === taskState.currentTask) {
      dispatch(selectCurrentTask(''));
      setSubTaskId('');
    }
    dispatch(deleteTask(id));
  };

  /**
   * this function return the subtask id of the current subtask on the store
   * @param taskId the id of the current task selected on the store
   */

  function getCurrentSubtaskId(taskId: string) {
    const task = getCurrentTask(taskId);
    if (!task) return;

    const subtasks = task.subtasks;
    if (!subtasks) return;
    if (subtasks.length === 0) return;

    const currentSubtask = subtasks[0].id;
    return currentSubtask;
  };

  const getCurrentSubtask = (subTaskId: string): subtask | undefined => {
    const task = getCurrentTask(taskState.currentTask);
    if (!task) return;
    const subtasks = task.subtasks;
    if (!subtasks) return;

    const currentSubtask = subtasks.find((subT) => (subT.id === subTaskId));
    return currentSubtask;

  };

  /**
   * this function is called when the user create a new subtaskItem on the current subtask
   * is responsible for add the item on the current subtask and update the tasks state
   * @param item subtaskItem { name: string, done: boolean } 
   */

  const addSubtaskItem = (item: subtaskItem) => {
    const taskId = taskState.currentTask;
    const subtaskId = taskState.currentSubtask;
    const currentTask: ITask | undefined = getCurrentTask(taskId);

    const task = new TaskClass({ ...currentTask });
    const subtask = task.getSubtask(subtaskId);

    function addStItem(subtask: Subtask) {
      if (!subtask) return;
      subtask.addSubtaskItem(item);
    }

    addStItem(subtask);

    // remplace the subtask updated item on the current task
    dispatch(updateTask(task.getTask()));
  };

  /**
   *  this function is called to add change the check status from subtask on the current task
   * @param done check if the subtask is done
   * @param id id of the subtask
   */

  const setSubtaskItemCheck = (done: boolean, id: string) => {
    const taskId = taskState.currentTask;
    const subtaskId = taskState.currentSubtask;
    const currentTask: ITask = getCurrentTask(taskId);
    const task = new TaskClass(currentTask);
    const subtask = task.getSubtask(subtaskId);

    function setCheck(subtask: Subtask, id: string, done: boolean): void {
      subtask.editSubtaskItemCheck(id, done);
    }

    setCheck(subtask, id, done);

    dispatch(updateTask(task.getTask()));
  };

  const addNewSubtask = (subtaskName: string) => {
    const currentTaskId = taskState.currentTask;
    const currentTask = getCurrentTask(currentTaskId);
    const task = new TaskClass(currentTask);
    task.createSubtask(subtaskName);

    dispatch(updateTask(task.getTask()));
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

  /**
   * this function is called when the user try to change the task status
   * @param status type of status to update
   * @param task taskdata to update
   */

  const changeStatus = (status: statusType, task: ITask) => {
    const updatedTask = {
      ...task,
      taskStatus: status
    };

    dispatch(updateTask(updatedTask));
  };

  return {
    getCurrentCategory,
    getCurrentTask,
    setCurrentTask,
    setSubTaskId,
    getCurrentSubtask,
    addSubtaskItem,
    addNewSubtask,
    getAllSubtasksItems,
    setSubtaskItemCheck,
    deleteCurrentTask,
    addNewTask,
    changeStatus,
    taskState
  };
};
