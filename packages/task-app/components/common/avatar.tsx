import React from 'react';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  label: string;
  variant?: 'medium' | 'small'
  isCurrentUser?: boolean;
}

function AvatarComponent({ label, variant = 'medium', isCurrentUser = false }: AvatarProps) {

  const medium = (variant === 'medium') && 'w-12 h-12 text-xl ';
  const small = (variant === 'small') && 'w-6 h-6 text-sm ';
  const currentUsers = isCurrentUser && 'bg-blue-200 ';

  return (
    <div className={twMerge(`
      rounded-full 
      w-12 
      h-12 
      bg-green-500 
      text-white 
      text-2xl 
      flex 
      justify-center 
      items-center 
      border-2 
      border-gray-200 
      `,
      medium,
      small,
      currentUsers
      )}
    >{
      label.slice(0,1)
    }</div>
  );
}

export default AvatarComponent;
