import { taskId } from './task.model';
export type userId = string;

export interface IUser {
  name: string;
  id: userId;
  departament: string;
  tasks: taskId[];
}
