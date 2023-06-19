'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '../dashboard.styled';
import { CurrentProject } from '@app/components/common/projectName';
import TaskTable from '@app/components/ui/taskTable/taskTable';
import { ITask } from '@core/models';
import { useAppSelector } from '@app/hooks/redux';
import { Suspense, lazy } from 'react';

const FilterComponent = lazy(() => import('../../../components/ui/filter/filter'));

function TableFilter() {
  const [ filteredTask, setFilteredTask ] = useState<ITask[]>([]);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  return (
    <>
      <DashboardHeader>
        <CurrentProject />
        <Suspense  fallback={<div>loadig component</div>}>
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
