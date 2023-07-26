'use client';

import React from 'react';
import DynamicSelector from '../dynamicSelector/dynamicSelector';
import RoundedBox from '@app/components/common/box';
import { useTask } from '@app/hooks/useTasks';
import SubtaskList from '@app/app/dashboard/tasks/components/subtaskList';
import SubtaskController from '@app/app/dashboard/tasks/components/withSubtaskList';

/**
 * this component is responsible for rendering the subtask data
 * and update changes on the state
 */

function SubtaskManager() {
  const {
    getCurrentSubtask,
    setSubTaskId,
    getCurrentTask,
    taskState,
    addNewSubtask,
    setSubtaskItemCheck,
  } = useTask();

  const taskId = taskState.currentTask;
  const subtaskId = taskState.currentSubtask;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const task = getCurrentTask(taskId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subtask = getCurrentSubtask(subtaskId);

  const handleChange = (checked: boolean, id: string) => {
    // this function is responsible for update the checkbox
    setSubtaskItemCheck(checked, id);
  };

  return (
    <RoundedBox>
      <div className='flex flex-row max-h-[40vh] min-h-[35vh] w-[100%] gap-2'>
        { subtask ?
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
        <div className='grow-0  shrink-1 w-[30%] h-full max-h-[34vh] min-height-[40vh] justify-center items-center'>
          {
            task && task.subtasks && (
              <DynamicSelector
                title='subtask'
                elements={task.subtasks}
                selectedId={subtaskId}
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
export default SubtaskManager;
