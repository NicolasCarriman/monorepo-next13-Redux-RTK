'use client';

import React, { useEffect, useState } from 'react';
import Carrousel from '../../../../components/ui/carrousel/carrousel';
import TeamCategoryCard from '../../../../components/ui/teamCategoryCard.tsx/teamCategoryCard';
import SubtaskManager from '../../../../components/ui/subtaskManager/subtaskManager';
import DateComponent from '../../../../components/common/date';
import RoundedBox from '../../../../components/common/box';
import { useAppSelector } from '@app/hooks/redux';
import { useTeam } from '@app/hooks/useTeam';
import { taskSelector } from '@core/redux/reducers/taskSlice/task.selector';
import { useTask } from '@app/hooks/useTasks';
import { PercentageCalculator } from '../../../../components/ui/utilis/percentageAnalyzer';

/**
 * todo: this function needs implement refactorization
 */

function GridComponent() {

  const [tasksId, setTaskId] = useState<string[]>([]);
  const { getCurrentTeamTasks, getCurrentCategory, team } = useTeam();
  const { getCurrentTask, getAllSubtasksItems } = useTask();
  const taskState = useAppSelector(taskSelector);
  const date = new Date();
  const today = `${date.getMonth() + 1}/${date.getDate()}`;

  const tasks = getCurrentTeamTasks(tasksId);
  const categoryId = team.currentCategoryId;
  const category = categoryId && getCurrentCategory(categoryId);
  const currentTaskId = taskState.currentTask;
  const currentTask = getCurrentTask(currentTaskId);
  const taskItems =  getAllSubtasksItems();
  const taskProgress = new PercentageCalculator;
  const progress = getTaskProgress();

  function getTaskProgress() {
    if(!taskItems) return;

    const doneItems: boolean[] = taskItems.map((i) => i.done);
    return taskProgress.getTruePercentaje(doneItems);;
  };

  const validateCategory = () => {
    if (!category) {
      throw new Error(
        'Invalid category id or category not localized on the state'
      );
    } else {
      setTaskId(category.tasks);
    }
  };

  useEffect(() => {
    //this useEffect set current category on task dashboard
    try {
      validateCategory();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, category]);


  return (
    <div className='grid grid-flow-row grid-cols-6 gap-4 w-full '>
      <div className='col-span-4 row-span-2 min-[45vh]'>
        {
          tasks.length ?
            <Carrousel data={tasks} />
            :
            <p className='text-blue-200 font-medium flex justify-center items-center'>
              Aún no hay tareas asignadas en esta categoría. 😔
            </p>
        }
      </div>
      <div className='col-span-2 row-span-2 h-[47vh]'>
        <TeamCategoryCard />
      </div>
      <div className='col-span-3 row-span-3 max-h-[47vh] min-h-[40vh]'>
        <SubtaskManager />
      </div>
      <div className='col-span-3 row-span-2 bg-gray-800 rounded-lg flex justify-center items-start'>
        <div className='h-full flex pl-2 pr-2 flex-col justify-center gap-2 items-start w-full'>
          <p className='sticky top-0 bg-gray-800 w-full text-white font-medium text-lg'>Task Description</p>
          <div className=' overflow-auto max-h-[12vh] h-full'>
            {
              currentTask &&
              <p className='text-white '>
                {currentTask.taskDescription}
              </p>
            }
          </div>
        </div>
      </div>
      <div className='col-span-1 '>
        <div className='flex h-[100%] justify-center items-center min-h-[12vh] bg-white shadow-sm'>
          <DateComponent date={today}></DateComponent>
        </div>
      </div>
      <div className='col-span-2'>
        <RoundedBox>
          {
            progress ?
            <p className='font-medium text-lg'>
              COMPLETED {progress}%
            </p> :
            <p className='font-medium text-lg'>
              COMPLETED 0%
            </p>
          }
        </RoundedBox>
      </div>
    </div>
  );
}

export default GridComponent;
