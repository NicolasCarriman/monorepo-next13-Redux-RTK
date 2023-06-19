'use client';

import React, { useEffect, useMemo } from 'react';
import DynamicSelector from '../dynamicSelector/dynamicSelector';
import RoundedBox from '@app/components/common/box';
import { useTask } from '@app/hooks/useTasks';
import SubtaskList from '@app/app/dashboard/tasks/components/subtaskList';
import SubtaskController from '@app/app/dashboard/tasks/components/withSubtaskList';

/**
 * thus component is responsible for rendering the subtask data
 * and update changes on the state
 */

function SubtaskManager() {
  const {
    getCurrentSubtask,
    setSubTaskId,
    getCurrentTask,
    taskState,
    addNewSubtask,
    setSubtaskItem,
    getAllSubtasksItems
  } = useTask();

  const taskId = taskState.currentTask;
  const subtaskId = taskState.currentSubtask;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subtask = useMemo(() => getCurrentSubtask(subtaskId), [ subtaskId]);
  const task = useMemo(() => getCurrentTask(taskId), [getCurrentTask, taskId]);

  const handleChange = (checked: boolean, id: string) => {
    // this function is responsible for update the checkbox
    setSubtaskItem(checked, id);
  };

  useEffect(() => {
    getAllSubtasksItems();
  }, [task]);

  return (
    <RoundedBox>
      <div className='flex flex-row max-h-[40vh] min-h-[35vh] w-[100%] gap-2'>
          <SubtaskController>
            {
              subtask &&
                <SubtaskList subtask={subtask} onChange={handleChange} />
            }
          </SubtaskController>
        <div className='grow-0  shrink-1 w-[30%] h-full max-h-[34vh] min-height-[40vh] justify-center items-center'>
          {
            task && task.subtasks && (
              <DynamicSelector
                title='subtask'
                elements={task.subtasks}
                selectedIndex={0}
                onSelect={(id) => setSubTaskId(id)}
                onClick={(subtaskName) => addNewSubtask(subtaskName)}
                newTabElement={'Crear subtarea'}
              />
            )
          }
        </div>
      </div>
    </RoundedBox >
  );
};
export default React.memo(SubtaskManager);
