
import { ITask, priorityType, statusType, subtaskItem, subtask } from '../../models/index';
import { getRandomId } from '../getRandomId';

/**
 * this class is used as template to generate the task
 * and manage basic methods
 */

class TaskBase {

  protected task: ITask;
  
  constructor(task: ITask) {
    this.task = JSON.parse(JSON.stringify(task));
  }

  public setTaskName(taskName: string): void {
    this.task.taskName = taskName;
  }

  public setTaskDate(taskDate: string): void {
    this.task.taskDate = taskDate;
  }

  public setTaskCategory(taskCategory: string): void {
    this.task.taskCategory = taskCategory;
  }

  public setPriority(priority: priorityType): void {
    this.task.taskPriority = priority;
  }

  public setStatus(status: statusType): void {
    this.task.taskStatus = status;
  }

  public setId(id: string): void {
    this.task.taskId = id;
  }

  public addUser = (id: string) => {
    this.task.taskUsersId.push(id);
  };

  public addSubtask = (subtask: subtask) => {
    if (!this.task.subtasks) {
      this.task.subtasks = [subtask];
    } else this.task.subtasks.push(subtask);
  };

  public removeUser = (id: string) => {
    const updatedTask = this.task.taskUsersId.filter(userId => userId !== id);
    this.task.taskUsersId = updatedTask;
  };

  public getUserId = (id: string) => {
    const user = this.task.taskUsersId.find((uid) => uid === id);
    if (!user) {
      throw new Error('User not found');
    } else return user;
  };

  public getTask() {
    return this.task;
  }
};

/**
 * this class is used to generate a new subtask object
 * width methods on subtaskItems like add, remove, get, edit
 */

export class Subtask {
  private name: string;
  private id: string;
  private items: subtaskItem[];
  // eslint-disable-next-line no-unused-vars
  private updateSubtask: (subtask: subtask) => void;

  // eslint-disable-next-line no-unused-vars
  constructor(subtaskName: string, id: string, items: subtaskItem[], updateSubtask: (subtask: subtask) => void) {
    this.name = subtaskName;
    this.id = id;
    this.items = [...items];
    this.updateSubtask = updateSubtask;
  }

  public getSubtask(): subtask {
    return {
      name: this.name,
      id: this.id,
      items: this.items
    };
  }

  public addSubtaskItem(item: subtaskItem): void {
    this.items.push(item);
    this.updateSubtask(this.getSubtask());
  }

  private setSubtaskItem(item: subtaskItem): void {
    
    this.items = this.items.map(it => {
      if (it.id === item.id) {
        return item;
      } else return it;
    });
  }

  public createNewSubtaskItem(itemName: string): void {
    const newItem: subtaskItem = {
      item: itemName,
      done: false,
      id: getRandomId()
    };
    this.addSubtaskItem(newItem);
  }

  public getSubtaskItem(id: string) {
    const currentItem = this.items.find(item => item.id === id);

    if (!currentItem) {
      throw new Error('item not found');
    } else {
      return currentItem;
    }
  };



  public editSubtaskItemName(id: string, name: string): void {
    const item = this.getSubtaskItem(id);

    try {
      item.item = name;
    } catch (err) {
      console.error(err);
    }

    this.setSubtaskItem(item);

    this.updateSubtask(this.getSubtask());

  }

  public editSubtaskItemCheck(id: string, status: boolean): void {
    const item = { ...this.getSubtaskItem(id) };

    item.done = status;
    this.setSubtaskItem(item);

    this.updateSubtask(this.getSubtask());
  }

  public removeSubtaskItem(id: string): void {
    const deletedItems = this.items.filter(item => item.id !== id);
    this.items = deletedItems;

    this.updateSubtask(this.getSubtask());
  }
}

/**
 * this class implements the task interface
 * is used to manage tasks methods and create tasks
 */

export class TaskClass extends TaskBase {

  public updateSubtask(subtask: subtask):void {
    const subtasks = this.getTask().subtasks;
    if (!subtasks) {
      throw new Error ('subtask not found');
    }

    const updatedSubtask = subtasks.map((s) => {
      if (s.id === subtask.id) {
        return subtask;
      } else return s;
    });

    this.task.subtasks = updatedSubtask;
  }

  public createSubtask(subtaskName: string): void {
    const subtask = {
      name: subtaskName,
      id: getRandomId(),
      items: []
    };

    this.addSubtask(subtask);
  }

  public getSubtask(subtaskId: string): Subtask {
    // return a new Subtask class to get the current methods
    const subtasks = this.getTask().subtasks;
    if (!subtasks) {
      throw new Error('subtasks not found');
    }

    const subtask = subtasks.find((s) => s.id === subtaskId);
    if (!subtask) {
      throw new Error('subtask not found');
    } else {

      const foundSubtask = new Subtask(subtask.name, subtask.id, subtask.items, this.updateSubtask.bind(this));
      return foundSubtask;
    }
  }

};
