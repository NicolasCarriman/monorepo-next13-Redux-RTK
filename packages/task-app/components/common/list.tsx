import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListProps extends  HTMLAttributes<HTMLDivElement>{
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
        border 
        border-gray-300 
        w-full
      `, className && className)}>
      {
        data.map((item) => {
          return (
            <div key={item.id}>
              {
                renderedItem && renderedItem(item)
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default List;
