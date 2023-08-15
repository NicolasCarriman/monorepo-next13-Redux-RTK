import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSpring, animated } from '@react-spring/web';

interface ListProps extends HTMLAttributes<HTMLDivElement> {
  data: any[];
  renderedItem: (item: any) => React.ReactNode;
  className?: string;
}

function List({
  data,
  renderedItem,
  className,
  ...rest
}: ListProps) {
  const isListVisible = data.length > 0;

  const animationProps = useSpring({
    opacity: isListVisible ? 1 : 0,
    maxHeight: isListVisible ? '250px' : '0px',
    config: {
      tension: 280,
      friction: 60
    }
  });

  return (
    <animated.div
      {...rest}
      style={animationProps}
      className={twMerge(`
      rounded-lg 
      shadow-md  
      border 
      border-gray-300 
      w-70
      overflow-y-hidden
      bg-white  
      `, className && className)}>
      <div className="overflow-y-auto max-h-64">
        {
          data.map((item, index) => (
            <div key={index} className="py-2 mt-1 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              {renderedItem(item)}
            </div>
          ))
        }
      </div>
    </animated.div>
  );
}

export default List;






