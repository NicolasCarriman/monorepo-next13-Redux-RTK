'use client';

import React, { useEffect, useState } from 'react';
import Carrousel from '../../../../components/ui/carrousel/carrousel';
import TeamCategoryCard from '../../../../components/ui/teamCategoryCard.tsx/teamCategoryCard';
import SubtaskManager from '../../../../components/ui/subtaskManager/subtaskManager';
import DateComponent from '../../../../components/common/date';
import { useTeam } from '@app/hooks/useTeam';
import { useTask } from '@app/hooks/useTasks';
import ProgressComponent from './progress';
import RoundedBox from '@app/components/common/box';

/**
 * todo: this component needs implement refactorization
 */

function GridComponent() {

  const [tasksId, setTaskId] = useState<string[]>([]);
  const { getCurrentTeamTasks, getCurrentCategory, team } = useTeam();
  const { taskState, getCurrentTask } = useTask();
  const date = new Date();
  const today = `${date.getMonth() + 1}/${date.getDate()}`;

  const tasks = getCurrentTeamTasks(tasksId);
  const selectedTask = getCurrentTask(taskState.currentTask);
  const categoryId = team.currentCategoryId;
  const category = categoryId && getCurrentCategory(categoryId);


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
              <p className='text-white '>
                {
                taskState.currentTask ?
                  selectedTask.taskDescription :
                  'Aún no has seleccionado una tarea.'
                }
              </p>  
          </div>
        </div>
      </div>
      <div className='col-span-1 '>
        <div className='flex h-[100%] justify-center items-center min-h-[12vh] bg-white shadow-sm'>
        <DateComponent variant='medium' date={today}></DateComponent>
        </div>
      </div>
      <div className='col-span-2'>
        <RoundedBox className='flex flex-row gap-2 items-center justify-between pl-12 pr-12'>
        {
          taskState.currentTask ?
          <ProgressComponent /> :
          <p className='font-medium text-blue-200'>
             Aún no has seleccionado una tarea.
          </p>
        }
        </RoundedBox>
      </div>
    </div>
  );
}

export default GridComponent;
