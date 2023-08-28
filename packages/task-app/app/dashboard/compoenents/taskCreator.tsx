'use client';

import withThreeDForm, { CubePerspective  } from '@app/components/hoc/withThreeD';
import React from 'react';
import TaskForm from './taskForm';
import { FirstFacePreview, SecondFaceTaskPreview } from './taskPreview';

const TaskOverview = withThreeDForm(CubePerspective, TaskForm);
// create a new TaskOverview component with the given task form

interface ITaskCreator {
  closeModal(): void;
}

function TaskCreator(
  {
    closeModal
  }: ITaskCreator
) {

  const cubeProps = {
    firstFace: <FirstFacePreview />,
    secondFace: <SecondFaceTaskPreview />
  };

  const taskFormProps = {
    closeModal: closeModal,
    next: () => {},
    prev: () => {},
  };

  return (
    <div className='flex flex-row h-[70vh] gap-[2%] '>
      <TaskOverview
        cubeProps={cubeProps}
        formProps={taskFormProps}
      />
    </div>
  );
}

export default TaskCreator;
