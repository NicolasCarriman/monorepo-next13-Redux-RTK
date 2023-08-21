'use client';

import { ButtonAdd } from '@app/components/ui/button-icon/buttonIcon';
import ModalComponent from '@app/components/ui/modal/modal';
import { useModal } from '@app/components/ui/hooks';
import React, { useEffect, useState } from 'react';
import TaskForm from './taskForm';
import { useTeam } from '@app/hooks/useTeam';
import useLocalStorage from '@app/hooks/useLocalStorage';
import withThreeDForm, { CubePerspective } from '@app/components/hoc/withThreeD';
import TaskPreview from './taskPreview';

const TaskOverview = withThreeDForm(CubePerspective, TaskForm);

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
    <>
      <ButtonAdd onClick={onOpen} />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={'Create Task'}
      >
        <div className="flex flex-row md:flex-row gap-3">

          <TaskOverview
            closeModal={onClose}
            firstFace={<TaskPreview />}
            secondFace={<div> second face </div>}

            next={function (): void {
              throw new Error('Function not implemented.');
            } } prev={function (): void {
              throw new Error('Function not implemented.');
            } }
            />
        </div>
      </ModalComponent>
    </>
  );
}

export default DashboardModal;
