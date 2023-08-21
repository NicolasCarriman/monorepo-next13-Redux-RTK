'use client';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

//inputComponent

function Input({ setValue, ...props }: InputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <input
      id={props.name}
      autoFocus
      className="input-group__input outline-none w-full font-medium text-blue-200 bg-transparent placeholder-blue-300"
      onChange={handleInputChange}
      {...props}
    />
  );
}


export default Input;
