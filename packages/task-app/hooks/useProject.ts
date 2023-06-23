import { projectSelector } from '@core/redux/reducers/projectSlice/project.selector';
import { useAppDispatch, useAppSelector } from './redux';
import { ProjectTeam } from '@core/models';
import { addTeam } from '@core/redux/reducers/projectSlice/project.slice';

export const useProject = () => {
  const project = useAppSelector(projectSelector);
  const dispatch = useAppDispatch();

  const addNewTeam = (t: ProjectTeam) => {
    dispatch(addTeam(t));
  };

  return { project, addNewTeam };
};
