'use client';

import { store } from '@core/redux/store/store';
import { useRef } from 'react';
import { IProject, ITask, ITeam, IUser } from '@core/models';
import { setProject } from '@core/redux/reducers/projectSlice/project.slice';
import { setUser } from '@core/redux/reducers/userSlice/user.slice';
import { setTeam } from '@core/redux/reducers/teamSlice/team.slice';
import { setTaskState } from '@core/redux/reducers/taskSlice/task.slice';
import useLocalStorage from '@app/hooks/useLocalStorage';

interface IPreloader {
  tasks?: ITask[];
  user?: IUser;
  project?: IProject;
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

  if (!loaded.current) {
    if(taskValue) {
      //check if the task is in the local storage
      store.dispatch(setTaskState(taskValue));
    } else tasks && store.dispatch(setTaskState(tasks));

    if(userValue) {
      store.dispatch(setUser(userValue));
    } else user && store.dispatch(setUser(user));

    project && store.dispatch(setProject(project));
    team && store.dispatch(setTeam(team));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
