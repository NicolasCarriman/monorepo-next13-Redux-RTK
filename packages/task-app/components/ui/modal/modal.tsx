import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  taskName?: string;         
  taskDescription?: string;
  
}


function ModalComponent({ isOpen, onClose, title, taskName, taskDescription, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modalComponent = isOpen ? (
    <div onClick={onClose} className="z-[200] fixed inset-0 flex items-center justify-center backdrop-filter backdrop-brightness-0 backdrop-opacity-50">
      <div className="bg-white p-6 w-4/5 max-w-3xl rounded-lg shadow-md z-[300]" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
            &times;
          </button>
          <div className='flex flex-col justify-center items-center gap-4 md:flex-row'>
            <div className="flex-1">
              <p className='text-blue-500 font-semibold text-lg mb-4'>{ title }</p>
              {/* Aquí el formulario que renderiza y actualiza los estados */}
              { children } 
            </div>
            <div className="flex-1 ml-4">
              <p className='text-gray-600 font-medium mb-4 font-semibold '>Task Preview:</p>
              {/* Card-like preview with 3D effect */}
              <div className="border rounded-lg p-4 shadow-2xl transform bg-gray-50 transition-transform duration-300 hover:scale-105 hover:translate-y-[-5px] perspective-[1000px]">
                <h3 className="text-xl font-bold mb-2">{taskName || "Task Name"}</h3>
                <p className="text-gray-600">{taskDescription || "Task Description"}</p>
              </div>
            </div>
          </div>
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

