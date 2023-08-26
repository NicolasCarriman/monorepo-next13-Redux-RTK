import { ITask, ITeam, ITeamCategory, IUser, taskId } from '@core/models';
import { useAppDispatch, useAppSelector } from './redux';
import { teamSelector } from '@core/redux/reducers/teamSlice/team.selector';
import { taskSelector } from '@core/redux/reducers/taskSlice/task.selector';
import { addCategory, selectCategory, updateCategory } from '@core/redux/reducers/teamSlice/team.slice';
import { getRandomId } from '@app/utils';
import { userSelector } from '@core/redux/reducers/userSlice/user.selector';

interface useTeamsHook {
  //eslint-disable-next-line
  getCurrentCategory: (cateogryId: string | undefined) => ITeamCategory | undefined;
  //eslint-disable-next-line
  getCurrentTeamTasks: (tasksId: taskId[]) => ITask[];
  //eslint-disable-next-line
  getCategoryId: (userId: string) => string | undefined;
  //eslint-disable-next-line
  setCurrenCategory: (categoryId: string) => void;
  //eslint-disable-next-line
  addCategoryByName: (name: string) => void
  //eslint-disable-next-line
  addGoal: (goal: string) => void
  //eslint-disable-next-line
  updateTeamCategory: (category: ITeamCategory) => void
  //eslint-disable-next-line
  addNewCategory: (category: ITeamCategory) => void
  getTeamCategories: () => ITeamCategory[];
  team: ITeam; 
};

export const useTeam = (): useTeamsHook => {
  const dispatch = useAppDispatch();
  const team = useAppSelector(teamSelector) as ITeam;
  const tasks = useAppSelector(taskSelector);
  const user = useAppSelector(userSelector) as IUser;

  const getCategoryId = (userId: string) => {
    const currentCategory = team.teamCategory.find((c) => c.usersId.includes(userId));
    return currentCategory?.categoryid;
  };

  const getCurrentCategory = (cateogryId: string | undefined) => {
    if (!cateogryId) return;
    const currentCategory = team.teamCategory.find((c) => c.categoryid === cateogryId);
    return currentCategory;
  };

  const getCurrentTeamTasks = (tasksId: taskId[]) => {
    const currentTasks = tasks.tasks.filter((t) => tasksId.includes(t.taskId));
    return currentTasks;
  };

  const getTeamCategories = () => {
    return team.teamCategory;
  };

  const setCurrenCategory = (categoryId: string) => {
    dispatch(selectCategory(categoryId));
  };

  const addNewCategory = (category: ITeamCategory) => {
    dispatch(addCategory(category));
  };

  const addCategoryByName = (name: string) => {
    const userId = user.id;

    const newCategory: ITeamCategory = {
      //create a new category with the name provides by the function
      name: name,
      tasks: [],
      usersId: [userId],
      categoryid: getRandomId(),
      goals: []
    };

    dispatch(addCategory(newCategory));
  };

  const addGoal = (goal: string) => {
    const newGoal = [goal];
    const categoryId = team.currentCategoryId as string; // in this case the category already exists
    const currentCategory = getCurrentCategory(categoryId);

    if (!currentCategory) return;
    // verify if current category exists

    const updatedCategory = {
      ...currentCategory,
      goals: newGoal
    };

    dispatch(updateCategory(updatedCategory));
  };

  const updateTeamCategory = (category: ITeamCategory): void => {
    dispatch(updateCategory(category));
  };

  return {
    getCurrentCategory,
    getCurrentTeamTasks,
    getCategoryId,
    setCurrenCategory,
    addCategoryByName,
    addGoal,
    addNewCategory,
    updateTeamCategory,
    getTeamCategories,
    team
  };
};
