import React, { HTMLAttributes } from "react";

function ListItem(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="
    flex 
    flex-row 
    gap-2 
    min-h-12
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
