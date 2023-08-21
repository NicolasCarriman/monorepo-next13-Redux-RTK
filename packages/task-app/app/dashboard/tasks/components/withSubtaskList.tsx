'useClient';

import Button from '@app/components/common/button';
import React, { useState } from 'react';
import { useTask } from '@app/hooks/useTasks';
import { subtaskItem } from '@core/models';
import { getRandomId } from '@app/utils';
import Input from '../../../../components/common/input';

interface SubtaskController {
  children: React.ReactNode;
}

/**
 * todo: implement more eficient methods of rendering optimization
 * this component is responsible to controller for tasks editing
 */

function SubtaskController({
  children
}: SubtaskController) {
  const {
    addSubtaskItem,
    getCurrentTask,
    taskState
  } = useTask();
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState('');

  const taskName = getCurrentTask(taskState.currentTask).taskName;
  const newItem: subtaskItem = {
    item: value,
    done: false,
    id: getRandomId()
  };

  const handleClick = () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }
    // validate if input is showing else add to list a new item
  
    addSubtaskItem(newItem);
    setShowInput(false);
  };

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    addSubtaskItem(newItem);
    setShowInput(false);
  };

  return (
    <div className='grow flex flex-col w-[70%] justify-start items-center max-h-[42vh]'>
      {
        taskName &&
        <p className='text-blue-200 font-medium'>{taskName}</p>
      }
      <div className='flex flex-col w-[100%] justify-start h-[80%] items-center max-h-[29vh] min-h-[29vh] overflow-auto transition-all duration-300'>
        {
          showInput && <Input
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            onKeyDown={handleKeydown} />
        }
        {
          children
        }
      </div>
      <div className='flex flex-row justify-end items-center h-[20%]'>
        <Button
          variant='filter'
          size={'medium'}
          onClick={handleClick}
        >
          Add item
        </Button>
      </div>
    </div>
  );
}

export default SubtaskController;
