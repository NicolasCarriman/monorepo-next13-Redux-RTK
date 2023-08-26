import { useProject } from '@app/hooks/useProject';
import { ITask, ProjectTeam, category } from '@core/models';
import { useState } from 'react';
import { ITaskTemplate } from '../context';
import { TeamBuilder } from '@core/utils/team/teamBuilder';
import { TeamCategoryBuilder, TeamCategory } from '@core/utils/team/teamCategory';
import { getRandomId } from '@app/utils';
import { useTeam } from '@app/hooks/useTeam';
import { Team } from '@core/utils/team/team';
import { useTask } from '@app/hooks/useTasks';

interface TeamMediatorHook {
  getSelectedTeam: () => ProjectTeam | undefined;
  // eslint-disable-next-line no-unused-vars
  setSelectedTeam: (id: string) => void;
  getTeamCategories: () => category[] | undefined[];
  // eslint-disable-next-line no-unused-vars
  update: (task: ITaskTemplate) => void;
  isNewTeam: boolean;
}

export const useTeamMediator = (): TeamMediatorHook => {
  const { getProjectTeams, addNewTeam } = useProject();
  const { addNewTask } = useTask();
  const { getCurrentCategory, addNewCategory, updateTeamCategory } = useTeam();
  const [team, setTeam] = useState<ProjectTeam>();

  const isNewTeam = !getSelectedTeam();

  const setSelectedTeam = (id: string) => {
    const selectedTeam = getProjectTeams().find((t) => t.id === id);
    if (!selectedTeam) return;

    setTeam(selectedTeam);
  };

  function getSelectedTeam() {
    return team;
  };

  const getTeamCategories = () => {
    return getSelectedTeam()?.categories ?? [];
  };

  const createNewTeam = (teamName: string) => {
    const teamId = getRandomId();
    const newTeam = new TeamBuilder()
      .buildDepartament(teamName)
      .buildId(teamId);
    return newTeam;
  };

  const createNewCategory = (categoryName: string) => {
    const categoryId = getRandomId();

    const newCategory = new TeamCategoryBuilder()
      .buildName(categoryName)
      .buildId(categoryId);
    return newCategory;
  };

  const updateNewCategory = (task: ITaskTemplate) => {
    const category = createNewCategory(task.taskCategory)
      .createTasks([task.taskId])
      .createUsers(task.taskUsersId)
      .getTeamCategory();

    addNewCategory(category);
    return category;
  };

  /**
   * this function add the category and update team on the store 
   * @param task 
   */

  const updateNewTeam = (task: ITaskTemplate) => {
    const category = updateNewCategory(task);
    const newTeam = createNewTeam('teamName')
      .withTeamCategory([category])
      .buildId(getRandomId())
      .buildDepartament(task.taskTeam)
      .getTeam();  
    return newTeam;
  };

  /**
   * this function updates the current
   * task category usersId
   * and tasksId with the new task provided
   * @param task is the task template to use for the update operation
   */

  const updateCategoryWithNewTask = (task: ITaskTemplate) => {
    const teamCategory = getCurrentCategory(task.taskCategoryId);
    if (!teamCategory) return;
    const teamCategoryCopy = JSON.parse(JSON.stringify(teamCategory));

    const getUniqueUsers = () => {
      const allUsers = teamCategory.usersId.concat(task.taskUsersId);
      const setUniqueUsers = new Set(allUsers);
      const uniqueUsers = [...setUniqueUsers];
      return uniqueUsers;
    };

    const users = getUniqueUsers();

    const updatedCategory = new TeamCategory(teamCategoryCopy);
    updatedCategory.addTask(task.taskId);
    updatedCategory.setUsers(users);

    updateTeamCategory(updatedCategory.getCategory());

  };

  const taskAdapter = (taskTemplate: ITaskTemplate): ITask => {
    const task: ITask = {
      taskName: taskTemplate.taskName,
      taskDate: taskTemplate.taskDate,
      taskCategory: taskTemplate.taskCategory,
      taskUsersId: taskTemplate.taskUsersId,
      taskPriority: taskTemplate.taskPriority,
      taskStatus: taskTemplate.taskStatus,
      taskId: taskTemplate.taskId
    };
    return task;
  };

  const projectTeamAdapter = (team: Team): ProjectTeam => {
    const categories: category[] = team.teamCategory.map((c) => {
      return {
        name: c.name,
        id: c.categoryid
      };
    });
  
    const projectTeam: ProjectTeam = {
      departament: team.departament,
      id: team.id,
      categories: categories
    };

    return projectTeam;
  };


  const update = (task: ITaskTemplate): void => {
    const newTask = taskAdapter(task); // get the new task as ITask model object

    if (task.isNewTeam) {
      // if is new team add new team and category on the store
      const newTeam = projectTeamAdapter(updateNewTeam(task));
      // new updated TeamProject
      addNewTeam(newTeam);
    } else if (!task.isNewTeam && task.isNewCategory) {
      // if is new category only update new category on the store
      updateNewCategory(task);
    }
    else if(!task.isNewCategory) {
      // if not is new category then update users on the category
      updateCategoryWithNewTask(task);
    }

    addNewTask(newTask); // addTask to tasks list
  };

  return {
    setSelectedTeam,
    getSelectedTeam,
    getTeamCategories,
    isNewTeam,
    update
  };

};
