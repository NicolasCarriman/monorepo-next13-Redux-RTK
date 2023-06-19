'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

interface ArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  side: 'left' | 'right'
};

function Arrow({ side, ...rest }: ArrowProps) {

  const isRightSide = side === 'right';

  return (
    <button
      className={twMerge(`
          h-12 w-12 
          text-blue-200 
          text-2xl 
          font-light 
          flex 
          items-center 
          justify-center 
          `, isRightSide && 'rotate-180'
      )}
      {...rest}
    >
      <IoIosArrowBack className='transition-all duration-100 hover:scale-150'/>
    </button>
  );
}

export default Arrow;
