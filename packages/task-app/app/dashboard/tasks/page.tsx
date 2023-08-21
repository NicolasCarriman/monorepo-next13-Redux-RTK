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
import Layer from './components/layer';
import RoundedBox from '@app/components/common/box';
import SubtaskManager from '@app/components/ui/subtaskManager/subtaskManager';
import DynamicSelector from '@app/components/ui/dynamicSelector/dynamicSelector';
import { useTask } from '@app/hooks/useTasks';
import SubtaskController from './components/withSubtaskList';
import SubtaskList from './components/subtaskList';

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
  const {
    getCurrentTask,
    setSubTaskId,
    getCurrentSubtask,
    addNewSubtask,
    setSubtaskItemCheck
  } = useTask();

  const currentTask = getCurrentTask(tasks.currentTask);
  const subtask = getCurrentSubtask(tasks.currentSubtask);

  const handleChange = (checked: boolean, id: string) => {
    // this function is responsible for update the checkbox
    setSubtaskItemCheck(checked, id);
  };

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
        <Layer>
          <RoundedBox className='w-[20%]' >
            {
              currentTask && currentTask.subtasks && (
                <DynamicSelector
                  title='subtask'
                  elements={currentTask.subtasks}
                  selectedId={tasks.currentSubtask}
                  onSelect={(id) => setSubTaskId(id)}
                  onClick={(subtaskName) => addNewSubtask(subtaskName)}
                  newTabElement={'Crear subtarea'}
                />
              )
            }
          </RoundedBox>
          <RoundedBox className='w-[50vw]' >
            {subtask ?
              <SubtaskController>
                <SubtaskList subtask={subtask} onChange={handleChange} />
              </SubtaskController>
              :
              <div className='flex flex-col justify-center items-center text-center gap-4 w-full'>
                <h2 className='text-lg font-medium'>
                  ¡Oops! Parece que hay un pequeño problema 😅
                </h2>
                <p>
                  📝¡Hola! Todavía no se ha creado ninguna subtarea o no se ha seleccionado ninguna tarea.
                </p>
              </div>
            }
          </RoundedBox>
          <RoundedBox className='w-[20%]' >
            testing
          </RoundedBox>
        </Layer>
      }
    </>
  );
};

export default Tasks;
