'use client';

import React, { HTMLAttributes, useState } from 'react';

interface itemsProps extends HTMLAttributes<HTMLInputElement> {
  itemid: string;
  done: boolean;
  // eslint-disable-next-line
  handleDone: (check: boolean, id: string) => void
}
function Item({
  itemid,
  children,
  done,
  handleDone,
  ...rest
}: itemsProps) {
  const [isChecked, setIsChecked] = useState(done);

  const handleChange = () => {
    handleDone(!isChecked, itemid);
    setIsChecked(!isChecked);
  };

  return (
    <div className='flex flex-row w-full gap-3 border-gray-300 border rounded p-2'>
      <input
        type="checkbox"
        className=" w-5 h-5 checked:accent-blue-200"
        id={itemid}
        checked={isChecked}
        onChange={() => handleChange()}
        {...rest}
      />
      <label
        className='w-full font-medium text-gray-600 '
        htmlFor={itemid}
      >
        { children }
      </label>
    </div>
  );
}

export default Item;
