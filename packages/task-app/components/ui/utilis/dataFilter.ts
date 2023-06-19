import { ITask } from '@core/models/task.model';
import { IFilter } from '../models';

/**
 * Class given filter metods to management data table
 */

export class DataFilter {
  private data: ITask[];
  readonly params: Partial<IFilter>;

  constructor(data: ITask[], params: Partial<IFilter>) {
    this.data = data;
    this.params = params;
  }

  filterBySearch(search: string, tableData: ITask[]) {
    const filteredData = tableData.filter((task) =>
      task.taskName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    return filteredData;
  }

  filterByStatus(status: string, tableData: ITask[]): ITask[] {
    const filteredResult = tableData.filter((task) => (task.taskStatus === status));
    return filteredResult;
  }

  filterByPriority(priority: string, tableData: ITask[]): ITask[] {
    const filteredResult = tableData.filter((task) => (task.taskPriority === priority));
    return filteredResult;
  }

  filterByCategory(category: string, tableData: ITask[]): ITask[] {
    const filteredResult = tableData.filter((task) => (task.taskCategory === category));
    return filteredResult;
  }

  sortByDate(ascending: boolean = true, tableData: ITask[]): ITask[] {
    const sortedData = [...tableData];
    sortedData.sort((firstTask, nextTask) =>
      ascending
        ? new Date(firstTask.taskDate).getTime() - new Date(nextTask.taskDate).getTime()
        : new Date(nextTask.taskDate).getTime() - new Date(firstTask.taskDate).getTime()
    );
    return sortedData;
  }

/**
  * GetFilteredData: call the filter metods on steps and store results
  */

  getFilteredData() {
    let filteredData = [...this.data];
    const params = this.params;

    if (params.category) {
      filteredData = this.filterByCategory(params.category, filteredData);
    }

    if (params.priority) {
      filteredData = this.filterByPriority(params.priority, filteredData);
    }

    if (params.status) {
      filteredData = this.filterByStatus(params.status, filteredData);
    }

    if (params.date) {
      filteredData = this.sortByDate(params.date, filteredData);
    }

    return filteredData;
  }

};
