import React from 'react';

interface RoundedBoxProps {
  children: React.ReactNode;
}

function RoundedBox({ children }: RoundedBoxProps) {
  return (
    <div
      className='relative p-4 flex flex-col justify-end gap-4 bg-white h-[100%] w-full min-w-[16vw] rounded-2xl shadow-md m-none'
    >
      { children }
    </div>
  );
}

export default RoundedBox;
