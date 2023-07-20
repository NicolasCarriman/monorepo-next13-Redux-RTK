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
  const [ taskValue ] = useLocalStorage('tasks', tasks);
  const [ userValue ] = useLocalStorage('user', user);
  const [ teamValue ] = useLocalStorage('team', team);

  if (!loaded.current) {
    if(taskValue) {
      //check if the task is in the local storage
      store.dispatch(setTaskState(taskValue));
    } else tasks && store.dispatch(setTaskState(tasks));

    if(userValue) {
      store.dispatch(setUser(userValue));
    } else user && store.dispatch(setUser(user));

    if (!teamValue) {
      team && store.dispatch(setTeam(team));
    } 

    project && store.dispatch(setProject(project));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
