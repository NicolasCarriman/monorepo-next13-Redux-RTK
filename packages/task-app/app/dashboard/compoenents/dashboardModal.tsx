'use client';

import { ButtonAdd } from '@app/components/ui/button-icon/buttonIcon';
import ModalComponent from '@app/components/ui/modal/modal';
import { useModal } from '@app/components/ui/hooks';
import React, { useEffect, useState } from 'react';

function DashboardModal() {
  const { isOpen, onOpen, onClose } = useModal();
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(!isMounted) return null;

  return (
    <>
      <ButtonAdd onClick={onOpen}/>
      <ModalComponent isOpen={isOpen} onClose={onClose} title={'Create Task'}>
      </ModalComponent>
    </>
  );
}

export default DashboardModal;
