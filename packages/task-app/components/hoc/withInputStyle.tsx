import React, { ReactNode } from 'react';
import '../../app/style/animate.module.css';
interface StyledWrapperProps {
  children: ReactNode;
}

//todo: turn this component into high order component

const StyledWrapper: React.FC<StyledWrapperProps> = ({ children }) => (
  <div
    className="
    flex 
    items-center
    w-full 
    gap-4 
    border
    rounded-lg 
    h-auto
    p-[2.5vh]
    bg-gray-50 
    shadow-md
    hover:shadow-lg
    border-gray-300
    transition-all duration-200 
    transform
    hover:translate-y-1 
    z-20
    mb-4
    "
    >
    {children}
  </div>
);

export default StyledWrapper;
