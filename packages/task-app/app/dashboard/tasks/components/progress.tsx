'use client';

import { PercentageCalculator } from '@app/components/ui/utilis/percentageAnalyzer';
import { useTask } from '@app/hooks/useTasks';
import React from 'react';

function ProgressComponent() {
  const { getAllSubtasksItems } = useTask();
  const taskItems = getAllSubtasksItems();
  const taskProgress = new PercentageCalculator;
  const progress = getTaskProgress();

  function getTaskProgress() {
    if (!taskItems) return;

    const doneItems: boolean[] = taskItems.map((i) => i.done);
    return taskProgress.getTruePercentaje(doneItems);;
  };

  return (
    <>
      {
        progress ?
          <p className='font-medium text-lg'>
            COMPLETED {progress}%
          </p> :
          <p className='font-medium text-lg'>
            COMPLETED 0%
          </p>
      }
    </>
  );
}

export default ProgressComponent;
