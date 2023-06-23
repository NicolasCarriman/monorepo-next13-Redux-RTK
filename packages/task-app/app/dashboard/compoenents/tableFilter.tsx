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
  const projectName = useAppSelector((state) => state.project.name);
  // eslint-disable-next-line no-unused-vars 
  const [ value, setValue ] = useLocalStorage('tasks', taskState);
  const tasks = taskState.tasks;

  useEffect(() => {
    setValue(taskState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskState]);

  return (
    <>
      <DashboardHeader>
        {
          projectName && 
          <CurrentProject project={projectName} />
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
