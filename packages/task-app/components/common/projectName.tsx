'use client';

import React from 'react';

interface CurrentProjectProps {
  project: string;
}

export const CurrentProject: React.FC<CurrentProjectProps> = (
  {
    project
  }
) => {

  return (
    <a
      className='font-bold cursor-pointer'
    >
      {project}
    </a>
  );
};
