import { userId } from "./user.model";

export type statusType = 'done' | 'stuck' | 'inProgress';
export type priorityType = 'high' | 'low' | 'none' | 'medium';
export type taskId = string;

type subtaskItem = {
  item: string;
  done: boolean
}

export type subtask = {
  name: string;
  id: string;
  items: subtaskItem[]
}

export interface ITask {
  taskName: string
  taskDate: string
  taskDescription?: string
  taskCategory: string
  taskUsersId: userId[]
  taskPriority: priorityType
  taskStatus: statusType
  taskId: taskId
  subtasks?: subtask[]
}
