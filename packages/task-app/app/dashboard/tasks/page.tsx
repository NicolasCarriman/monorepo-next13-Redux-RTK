'use client';
import { useAppSelector } from '@app/hooks/redux';
import GridComponent from './components/grid';
import React, { useEffect, useRef } from 'react';
import { teamSelector } from '@core/redux/reducers/teamSlice/team.selector';
import { projectSelector } from '@core/redux/reducers/projectSlice/project.selector';
import { userSelector } from '@core/redux/reducers/userSlice/user.selector';
import useLocalStorage from '@app/hooks/useLocalStorage';
import { taskSelector } from '@core/redux/reducers/taskSlice/task.selector';
import { useDispatch } from 'react-redux';
import { setUser } from '@core/redux/reducers/userSlice/user.slice';
import { setProject } from '@core/redux/reducers/projectSlice/project.slice';
import { setTeam } from '@core/redux/reducers/teamSlice/team.slice';
import { setTaskState } from '@core/redux/reducers/taskSlice/task.slice';

function Tasks() {
  const loaded = useRef(false);
  const team = useAppSelector(teamSelector);
  const project = useAppSelector(projectSelector);
  const user = useAppSelector(userSelector);
  const tasks = useAppSelector(taskSelector);
  const dispatch = useDispatch();
  const [userStored] = useLocalStorage('user', {});
  const [projectStored] = useLocalStorage('project', {});
  const [teamStored, setTeamStored] = useLocalStorage('team', {});
  const [taskStored, setTaskStored] = useLocalStorage('tasks', {});

  useEffect(() => {
    userStored && dispatch(setUser(userStored));
    projectStored && dispatch(setProject(projectStored));
    teamStored && dispatch(setTeam(teamStored));
    taskStored && dispatch(setTaskState(taskStored));
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (team.teamCategory.length) {
      setTeamStored(team);
    }
    if (tasks.tasks.length) {
      setTaskStored(tasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, project, user, tasks]);

  return (
    <>
      {
        loaded.current &&
        <GridComponent
        />
      }
    </>
  );
};

export default Tasks;
