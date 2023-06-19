import { ITask } from "./task.model"
import { ITeam } from "./team.model"
import { IUser } from "./user.model"

export interface IProject {
  name: string
  description: string
  teams: ITeam[]
  users: Partial<IUser[]>
  tasks: ITask[]
}