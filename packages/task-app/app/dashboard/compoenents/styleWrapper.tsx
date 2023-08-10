import React, { ReactNode } from 'react';

interface StyledWrapperProps {
  children: ReactNode;
}

const StyledWrapper: React.FC<StyledWrapperProps> = ({ children }) => (
    <div className="
      flex 
      items-center
      w-full 
      gap-4 
      border-gray-300 
      border 
      rounded-lg 
      p-4
      shadow-md
      hover:shadow-lg
      transition-shadow duration-200
      transition-transform duration-200
      transform hover:-translate-y-1
      mb-4
    ">
      {children}
    </div>
  );

export default StyledWrapper;