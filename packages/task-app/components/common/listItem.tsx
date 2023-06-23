import React, { HTMLAttributes } from 'react';

function ListItem(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='
    flex 
    flex-row 
    gap-2 
    h-8
    hover:bg-blue-200 
    hover:text-white 
    p-4 
    rounded-md
    cursor-pointer
    items-center
    '
    {...props}
    />
  );
}

export default ListItem;
