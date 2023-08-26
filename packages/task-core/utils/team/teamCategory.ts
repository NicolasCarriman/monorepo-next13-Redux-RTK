import { ITeamCategory, IUser } from "../../models";

export class TeamCategory {
  private name: string;
  private tasks: string[];
  private usersId: string[];
  private categoryid: string;
  private goals: string[];

  constructor(category: ITeamCategory) {
    this.name = category.name;
    this.tasks = category.tasks;
    this.usersId = category.usersId;
    this.categoryid = category.categoryid;
    this.goals = category.goals;
  }

  getName() {
    return this.name;
  }

  getTasks() {
    return this.tasks;
  }

  setUsers(users: string[]): void {
    this.usersId = users;
  }

  getUsers() {
    return this.usersId;
  }

  getId() {
    return this.categoryid;
  }

  getGoals() {
    return this.goals;
  }

  setName(name: string) {
    this.name = name;
  }

  addTask(taskId: string) {
    this.tasks.push(taskId);
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((t) => t !== taskId);
  }

  addUser(userId: string) {
    this.usersId.push(userId);
  }

  deleteUser(userId: string) {
    this.usersId = this.usersId.filter(u => u !== userId);
  }

  getCategory() {
    const category: ITeamCategory = {
      name: this.name,
      tasks: this.tasks,
      usersId: this.usersId,
      categoryid: this.categoryid,
      goals: this.goals
    }
    return category;
  }
}

interface Builder {
  buildName(name: string): TeamCategoryBuilder;
  buildId(id: string): TeamCategoryBuilder;
  createTasks(tasks: string[]): TeamCategoryBuilder;
  createUsers(users: string[]): TeamCategoryBuilder;
  createGoals(goals: string[]): TeamCategoryBuilder;
  getTeamCategory(): ITeamCategory;
}

export class TeamCategoryBuilder implements Builder {

  name: string = '';
  tasks: string[] = [];
  usersId: string[] = [];
  categoryid: string = '';
  goals: string[] = [];

  buildName(name: string): TeamCategoryBuilder {
    this.name = name;
    return this;
  }

  buildId(id: string): TeamCategoryBuilder {
    this.categoryid = id;
    return this;
  }

  createGoals(goals: string[]): TeamCategoryBuilder {
    this.goals = goals;
    return this;
  }

  createTasks(tasks: string[]): TeamCategoryBuilder {
    this.tasks = tasks;
    return this;
  }

  createUsers(users: string[]): TeamCategoryBuilder {
    this.usersId = users;
    return this;
  }

  getTeamCategory(): ITeamCategory {
    const category: ITeamCategory = {
      name: this.name,
      tasks: this.tasks,
      usersId: this.usersId,
      categoryid: this.categoryid,
      goals: this.goals
    }
    return category
  }

}
