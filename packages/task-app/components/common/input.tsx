'use client';
import {  useState } from 'react';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}
function Input({ setValue, ...props }: InputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

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
      shadow-sm
      hover:shadow-md
      transition-shadow duration-200
      `, props.disabled && 'bg-gray-200')}>
        <input
            autoFocus
            className='ml-9 outline-none w-full font-medium text-blue-200 bg-transparent placeholder-blue-300'
            onChange={handleInputChange}
            {...props}
        />
    </div>
  );
}
export default Input;