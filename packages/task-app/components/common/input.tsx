'use client';

import React, { InputHTMLAttributes, useRef } from 'react';

function Input(props: InputHTMLAttributes<HTMLInputElement>) {

  return (
    <div className='flex flex-row w-full gap-3 border-gray-300 border rounded p-2'>
      <input
        autoFocus
        className='ml-8 outline-none w-full font-medium text-blue-200'
        {...props}
      />
    </div>
  );
};

export default Input;
