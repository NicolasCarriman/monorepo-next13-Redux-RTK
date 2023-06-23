import { ITask, taskId } from "../../../models";

export interface TaskState {
  tasks: ITask[];
  currentTask: taskId;
  currentSubtask: string;
}

export const taskState: TaskState = {
  tasks: [],
  currentTask: '',
  currentSubtask: ''
}
