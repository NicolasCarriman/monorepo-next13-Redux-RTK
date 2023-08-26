import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

function ModalComponent({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modalComponent = isOpen ? (
    <div
      onClick={onClose}
      className="z-[200] fixed inset-0 flex items-center justify-center backdrop-filter backdrop-brightness-75 backdrop-blur-md transition-opacity duration-500"
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
            {children}
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
