import { HTMLAttributes } from 'react';

export const SelectorContainer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className='flex flex-col h-full w-full font-medium justify-start items-center gap-4 p-2 shadow-lg rounded-lg'
      {...props}
    />
  );
};

export const TabsContainer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className='flex flex-col overflow-auto h-full w-full'
      {...props}
    />
  );
};
