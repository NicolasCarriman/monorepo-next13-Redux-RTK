'use client';

import { ButtonAdd } from '@app/components/ui/button-icon/buttonIcon';
import ModalComponent from '@app/components/ui/modal/modal';
import { useModal } from '@app/components/ui/hooks';
import React, { useEffect, useState } from 'react';
import TaskForm from './taskForm';
import { useTeam } from '@app/hooks/useTeam';
import useLocalStorage from '@app/hooks/useLocalStorage';

function DashboardModal() {
  const { isOpen, onOpen, onClose } = useModal();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { team } = useTeam();
  // eslint-disable-next-line
  const [value, setValue] = useLocalStorage('team', {});
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  setValue(team);
  // eslint-disable-next-line
  }, [team])
  
  if(!isMounted) return null;

  return (
    <>
      <ButtonAdd onClick={onOpen}/>
      <ModalComponent isOpen={isOpen} onClose={onClose} taskName={taskName}
          taskDescription={taskDescription} title={'Create Task'}>
        <TaskForm closeModal={onClose} setTaskName={setTaskName}  
            setTaskDescription={setTaskDescription} />
      </ModalComponent>
    </>
  );
}

export default DashboardModal;
