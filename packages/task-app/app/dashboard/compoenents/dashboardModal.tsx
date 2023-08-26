'use client';

import { ButtonAdd } from '@app/components/ui/button-icon/buttonIcon';
import { useModal } from '@app/components/ui/hooks';
import React, { useEffect, useState } from 'react';
import { useTeam } from '@app/hooks/useTeam';
import useLocalStorage from '@app/hooks/useLocalStorage';
import ModalComponent from '@app/components/ui/modal/modal';
import TaskCreator from './taskCreator';
import ContextProvider from '../context/provider';

function DashboardModal() {
  const { isOpen, onOpen, onClose } = useModal();
  const { team } = useTeam();

  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useLocalStorage('team', {});

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setValue(team);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  if (!isMounted) return null;

  return (
    <ContextProvider>
      <ButtonAdd onClick={onOpen} />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={'Create Task'}
      >
        <TaskCreator closeModal={onClose} />
      </ModalComponent>
    </ContextProvider>
  );
}

export default DashboardModal;
