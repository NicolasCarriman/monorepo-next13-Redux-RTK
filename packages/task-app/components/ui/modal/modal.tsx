import { priorityType } from '@core/models';
import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TaskPreview from './TaskPreview';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  taskName?: string;
  taskDescription?: string;
  taskPriority?: priorityType | string;
  children?: ReactNode;
}

function ModalComponent({
  isOpen,
  onClose,
  title,
  taskName,
  taskDescription,
  taskPriority,
  children,
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modalComponent = isOpen ? (
    <div
    onClick={onClose}
    className="z-[200] fixed inset-0 flex items-center justify-center backdrop-filter backdrop-brightness-0 backdrop-opacity-50 transition-opacity duration-500"
  >
    <div
      className="bg-white p-4 md:p-6 w-[70vw] rounded-lg shadow-xl z-[300] transform transition-transform duration-500"
      onClick={(e) => e.stopPropagation()}
    >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            &times;
          </button>
          <div className="border-b pb-3 mb-4">
            <h2 className="text-blue-500 font-semibold text-2xl mb-4">
              {title}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              {children}
            </div>
            <div className="flex-1 ml-4">
              <h3 className="text-gray-600 mb-4 font-semibold ">
                Task Preview:
              </h3>
              <TaskPreview
                taskName={taskName}
                taskDescription={taskDescription}
                taskPriority={taskPriority}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (isMounted) {
    const modalRoot = document.getElementById('modal-root');
    return modalRoot ? ReactDOM.createPortal(modalComponent, modalRoot) : null;
  }
  return null;
}

export default ModalComponent;


