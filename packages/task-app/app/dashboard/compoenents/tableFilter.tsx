'use client';

import React, { useEffect, useState } from 'react';
import { DashboardHeader } from '../dashboard.styled';
import { CurrentProject } from '@app/components/common/projectName';
import TaskTable from '@app/components/ui/taskTable/taskTable';
import { ITask } from '@core/models';
import { useAppSelector } from '@app/hooks/redux';
import { Suspense, lazy } from 'react';
import useLocalStorage from '@app/hooks/useLocalStorage';

const FilterComponent = lazy(() => import('../../../components/ui/filter/filter'));

function TableFilter() {
  const [ filteredTask, setFilteredTask ] = useState<ITask[]>([]);
  const taskState = useAppSelector((state) => state.tasks);
  const project = useAppSelector((state) => state.project);
  const user = useAppSelector((state) => state.user);
  const projectName = project.name;
  // eslint-disable-next-line no-unused-vars 
  const [ value, setValue ] = useLocalStorage('tasks', taskState);
  // eslint-disable-next-line no-unused-vars 
  const [ uValue, setUvalue ] = useLocalStorage('user', {});
  // eslint-disable-next-line no-unused-vars 
  const [ pValue, setPvalue ] = useLocalStorage('project', {});
  const tasks = taskState.tasks;

  useEffect(() => {
    setValue(taskState);
    setPvalue(project);
    setUvalue(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskState, project, user]);

  return (
    <>
      <DashboardHeader>
        {
          projectName && 
          <div className='hidden sm:flex'>
            <CurrentProject project={projectName} />
          </div>
        }
        <Suspense  fallback={<div>...loading</div>}>
          <FilterComponent
            data={tasks}
            setData={setFilteredTask}
          />
        </Suspense>
      </DashboardHeader>
      <TaskTable data={filteredTask.length ? filteredTask : tasks} />
    </>
  );
}

export default TableFilter;
