import { taskId } from './task.model';
import { userId } from './user.model';

export interface ITeamCategory {
  name: string;
  tasks: taskId[]; //index task by taskid
  usersId: userId[]
  categoryid: string
  goals: string[]
}

export interface ITeam {
  departament: string;
  id: string;
  teamCategory: ITeamCategory[];
  currentCategoryId?: string;
}
