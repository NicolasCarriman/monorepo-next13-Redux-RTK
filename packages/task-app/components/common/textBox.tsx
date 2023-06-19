import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const TextBox: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return (
    <div
      className={twMerge(`
      p-2 
      text-white 
      z-10 
      rounded-lg 
      transition-all 
      text-sm duration-500 
      bg-blue-200
      max-w-[100%]
      outline-none 
      `, className)
      }
      contentEditable={true} {...rest}/>
  );
};
