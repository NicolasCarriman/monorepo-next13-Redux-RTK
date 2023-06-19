'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

function ModalComponent({ isOpen, onClose, title, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modalComponent = isOpen ? (
    <div onClick={onClose} className="z-[200] fixed inset-0 flex items-center justify-center backdrop-filter backdrop-brightness-0 backdrop-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md z-[300]" onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col justify-center items-center gap-4'>
              <p className='text-blue-200 font-medium'>{ title }</p>
              { children }
            </div>
          </div>
      </div>
  ) : null ;

  if(isMounted) {
    const modalRoot = document.getElementById('modal-root');
    if(!modalRoot) return null;
    else return ReactDOM.createPortal(modalComponent, modalRoot);
  } else return null;
}

export default ModalComponent;
