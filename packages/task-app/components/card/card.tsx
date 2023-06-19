'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

function Card({
  header,
  children,
  footer,
  className
}: CardProps) {

  return (
    <div
      className={twMerge(`
        relative 
        p-4 
        flex 
        flex-col 
        justify-start 
        gap-3 
        bg-white 
        h-full 
        rounded-2xl 
        shadow-md 
        m-none 
        min-w-[16vw] 
        w-full`,
          className && className
        )
      }
    >
      <div className='flex flex-row justify-between items-center text-gray-600'>
        {header}
      </div>
      <div className='flex flex-col justify-end w-full h-full'>
        {children}
      </div>
      {
        footer ?
          <div className='flex flex-row justify-center items-center mt-4'>
            {footer}
          </div>
          : null
      }
    </div>
  );
}

export default Card;
