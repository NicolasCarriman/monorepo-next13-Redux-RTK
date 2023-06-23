'use client';

import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

function Input(props: InputHTMLAttributes<HTMLInputElement>) {

  return (
    <div
      className={twMerge(`
      flex 
      flex-row 
      w-full 
      gap-3 
      border-gray-300 
      border 
      rounded 
      p-2 
      `, props.disabled && 'bg-gray-200')}
    >
      <input
        autoFocus
        className='ml-2 outline-none w-full font-medium text-blue-200'
        {...props}
      />
    </div>
  );
};

export default Input;
