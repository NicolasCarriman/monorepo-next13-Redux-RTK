import React, { HTMLAttributes } from 'react';

function ListItem(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="
    flex 
    flex-row 
    gap-2 
    min-h-[4vh] 
    pl-6
    hover:bg-blue-200 
    hover:text-white  
    rounded-md
    cursor-pointer
    items-center
    "
      {...props}
    />
  );
}

export default ListItem;
