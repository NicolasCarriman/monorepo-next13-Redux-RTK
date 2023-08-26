/* eslint-disable no-unused-vars */
import { projectSelector } from '@core/redux/reducers/projectSlice/project.selector';
import { useAppDispatch, useAppSelector } from './redux';
import { IProject, IUser, ProjectTeam } from '@core/models';
import { addTeam } from '@core/redux/reducers/projectSlice/project.slice';

interface IProjectHook {
  project: Partial<IProject>;
  addNewTeam(team: ProjectTeam): void;
  getProjectTeams: () => ProjectTeam[];
  getUsersProject: () => IUser[];
}

export const useProject = (): IProjectHook => {
  const project = useAppSelector(projectSelector) as IProject;
  const dispatch = useAppDispatch();

  const getProjectTeams = () => {
    return project.teams;
  };

  const getUsersProject = () => {
    return project.users as IUser[];
  };

  const addNewTeam = (t: ProjectTeam) => {
    dispatch(addTeam(t));
  };

  return {
    project,
    addNewTeam,
    getProjectTeams,
    getUsersProject
  };
};
