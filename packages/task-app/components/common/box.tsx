import React from 'react';
import { twMerge } from 'tailwind-merge';

interface RoundedBoxProps {
  children: React.ReactNode;
  className?: string;
}

function RoundedBox({ children, className }: RoundedBoxProps) {
  return (
    <div
      className={twMerge(`
      'relative 
      p-4 
      flex 
      flex-col 
      justify-end 
      gap-4 
      bg-white 
      h-[100%] 
      w-full 
      min-w-[16vw] 
      rounded-2xl 
      shadow-md 
      m-none'
      `, className && className)}
    >
      { children }
    </div>
  );
}

export default RoundedBox;
