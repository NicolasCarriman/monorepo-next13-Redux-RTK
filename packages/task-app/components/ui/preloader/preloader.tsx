'use client';

import { store } from '@core/redux/store/store';
import { useRef } from 'react';
import { IProject, ITask, ITeam, IUser } from '@core/models';
import { setProject } from '@core/redux/reducers/projectSlice/project.slice';
import { setUser } from '@core/redux/reducers/userSlice/user.slice';
import { setTeam } from '@core/redux/reducers/teamSlice/team.slice';
import { setTaskState } from '@core/redux/reducers/taskSlice/task.slice';

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
  if (!loaded.current) {
    tasks && store.dispatch(setTaskState(tasks));
    user && store.dispatch(setUser(user));
    project && store.dispatch(setProject(project));
    team && store.dispatch(setTeam(team));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
