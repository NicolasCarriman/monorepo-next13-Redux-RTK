'use client';

import { ButtonAdd } from '@app/components/ui/button-icon/buttonIcon';
import ModalComponent from '@app/components/ui/modal/modal';
import { useModal } from '@app/components/ui/hooks';
import React, { useEffect, useState } from 'react';
import TaskForm from './taskForm';
import { useTeam } from '@app/hooks/useTeam';
import useLocalStorage from '@app/hooks/useLocalStorage';
import { priorityType } from '@core/models';

function DashboardModal() {
  const { isOpen, onOpen, onClose } = useModal();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<priorityType | string>('');
  const { team } = useTeam();
  
  const [value, setValue] = useLocalStorage('team', {});

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setValue(team);
  }, [team]);

  if (!isMounted) return null;

  return (
    <>
      <ButtonAdd onClick={onOpen} />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        taskName={taskName}
        taskDescription={taskDescription}
        taskPriority={taskPriority}
        title={'Create Task'}
      >
       <TaskForm
          closeModal={onClose}
          setTaskName={setTaskName}
          setTaskDescription={setTaskDescription}
          setTaskPriority={setTaskPriority}
        />
      </ModalComponent>
    </>
  );
}

export default DashboardModal;


