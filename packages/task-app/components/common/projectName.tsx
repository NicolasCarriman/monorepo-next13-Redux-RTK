'use client';

import { useAppSelector } from '@app/hooks/redux';
import { IProject } from '@core/models';
import React from 'react';

export const CurrentProject = () => {

  const project = useAppSelector((state) => state.project) as Partial<IProject>;
  return (
    <p
      className='font-bold cursor-pointer'
    >
      {project.name && project.name}
    </p>
  );
};
