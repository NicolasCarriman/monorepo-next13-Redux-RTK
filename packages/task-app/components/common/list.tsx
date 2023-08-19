import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListProps extends HTMLAttributes<HTMLDivElement> {
  data: any[];
  // eslint-disable-next-line no-unused-vars
  renderedItem: (item: any) => React.ReactNode;
  className?: string;
}

function List({
  data,
  renderedItem,
  className,
  ...rest
}: ListProps) {

  return (
    <div
      {...rest}
      className={twMerge(`
      rounded-lg 
      shadow-md  
      border 
      border-gray-300 
      w-70
      overflow-y-hidden
      bg-white  
      `, className && className)}>
        {
          data.map((item, index) => (
            <div key={index} className="py-2 mt-1 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              {renderedItem(item)}
            </div>
          ))
        }
    </div>
  );
}

export default List;






