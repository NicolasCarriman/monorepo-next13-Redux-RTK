import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { taskState } from './task.state';
import { ITask, subtask } from '../../../models';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: taskState,
  reducers: {
    setTask: (state, action) => {
      state.tasks = action.payload;
    },
    addSubtask: (state, action) => {
      const subtask = action.payload as subtask;
      const currentTaskId = state.currentTask;
      const tasks = state.tasks;
      if (!currentTaskId) return;

      const currentTask = tasks.find((t) => (t.taskId === currentTaskId));
      if (!currentTask?.subtasks) return;

      const taskWithNewSubtask: ITask = {
        ...currentTask,
        subtasks: [
          ...currentTask.subtasks,
          subtask
        ]
      };

      const updateTasks = tasks.map((task) => {
        if(task.taskId !== currentTaskId) return task;
        else return taskWithNewSubtask;
      });

      state.tasks = updateTasks;
    },
    addTask: (state, action) => {
      const payload = action.payload as ITask;
      state.tasks = [...state.tasks, payload];
    },
    setTaskState: (state, action) => {
      return action.payload
    },
    deleteTask: (state, action) => {
      const payload = action.payload as string;
      const updatedTasks = state.tasks.filter((task) => (
        task.taskId !== payload
      ));
      state.tasks = updatedTasks;
    },
    selectCurrentTask: (state, action) => {
      const payload = action.payload as string;
      state.currentTask = payload;
    },
    selectCurrentSubtask: (state, action) => {
      const payload = action.payload as string;
      state.currentSubtask = payload;
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const tasks = state.tasks;
      const updatedTask = action.payload;
 
      const newTasks = tasks.map((task) => {
        if (task.taskId === updatedTask.taskId) {
          return updatedTask;
        } else {
          return task;
        }
      })
      state.tasks = newTasks;
    },
  }
});

export const {
  setTask,
  addTask,
  selectCurrentTask,
  deleteTask,
  selectCurrentSubtask,
  setTaskState,
  updateTask,
  addSubtask
} = taskSlice.actions;

export default taskSlice.reducer;
