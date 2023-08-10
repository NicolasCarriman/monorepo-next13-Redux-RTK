'use client';
import { InputHTMLAttributes } from 'react';

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
    <input
      autoFocus
      className='outline-none w-full font-medium text-blue-200 bg-transparent placeholder-blue-300'
      onChange={handleInputChange}
      {...props}
    />
  );
}

export default Input;