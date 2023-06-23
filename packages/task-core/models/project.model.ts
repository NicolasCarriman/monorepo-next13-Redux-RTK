import { ITask } from "./task.model"
import { IUser } from "./user.model"

export type category = {
  name: string,
  id: string
}

export interface ProjectTeam {
  departament: string,
  id: string,
  category: category[],
}

export interface IProject {
  name: string
  description: string
  teams: ProjectTeam[]
  users: Partial<IUser[]>
  tasks: ITask[]
}
