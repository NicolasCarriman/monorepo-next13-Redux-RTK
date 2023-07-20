'use client';

import { store } from '@core/redux/store/store';
import { useRef } from 'react';
import { ITeam, IUser } from '@core/models';
import { setProject } from '@core/redux/reducers/projectSlice/project.slice';
import { setUser } from '@core/redux/reducers/userSlice/user.slice';
import { setTeam } from '@core/redux/reducers/teamSlice/team.slice';
import { setTaskState } from '@core/redux/reducers/taskSlice/task.slice';
import useLocalStorage from '@app/hooks/useLocalStorage';

interface IPreloader {
  tasks?: any;
  user?: IUser;
  project?: any;
  team?: ITeam;
}

function Preloader({
  tasks,
  user,
  project,
  team
}: IPreloader) {
  const loaded = useRef(false);
  // eslint-disable-next-line no-unused-vars
  const [ taskValue, _task, isTaskValue ] = useLocalStorage('tasks', tasks);
  // eslint-disable-next-line no-unused-vars
  const [ userValue, _user,  isUserValue ] = useLocalStorage('user', user);
  // eslint-disable-next-line no-unused-vars
  const [ teamValue, _team, isTeamValue ] = useLocalStorage('team', team);

  if (!loaded.current) {

    isTaskValue ? store.dispatch(setTaskState(taskValue)) : tasks && store.dispatch(setTaskState(tasks)); 

    isUserValue ? store.dispatch(setUser(userValue)) : user && store.dispatch(setUser(user));

    isTeamValue ? store.dispatch(setTeam(teamValue)) : team && store.dispatch(setTeam(team));

    project && store.dispatch(setProject(project));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
