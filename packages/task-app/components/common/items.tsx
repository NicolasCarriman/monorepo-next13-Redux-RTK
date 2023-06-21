'use client';

import React, { HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface itemsProps extends HTMLAttributes<HTMLInputElement> {
  item: string;
  itemId: string;
  done: boolean;
  // eslint-disable-next-line
  handleDone: (check: boolean, id: string, item: string) => void
}

function Item({
  item,
  itemId,
  children,
  done,
  handleDone,
  className,
  ...rest
}: itemsProps) {
  const [isChecked, setIsChecked] = useState(done);

  const handleChange = useCallback(() => {
    handleDone(!isChecked, itemId, item);
    setIsChecked(!isChecked);
  }, [handleDone, isChecked, itemId, item]);

  const mergedClassName = useMemo(
    () => twMerge(`
      flex 
      flex-row 
      w-full gap-3 
      border-gray-300 
      border 
      rounded 
      p-2
    `, className && className),
    [className]
  );

  return (
    <div className={mergedClassName}>
      <input
        type="checkbox"
        className=" w-5 h-5 checked:accent-blue-200"
        id={itemId}
        checked={isChecked}
        onChange={() => handleChange()}
        {...rest}
      />
      <label
        className='w-full font-medium text-gray-600 '
        htmlFor={itemId}
      >
        { children }
      </label>
    </div>
  );
}

export default React.memo(Item);
