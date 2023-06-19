'use client';

import React, { useRef } from 'react';
import TaskCard from '../taskCard/taskCard';
import { ITask } from '@core/models';
import { useCarrousel } from '../hooks/useCarrousel';
import { CarrouselArrows, CarrouselMain } from './carrousel.styled';

/**
 * todo: make this component more flexible
 */

interface CarrouselProps {
  data: ITask[];
};

function Carrousel({ data }: CarrouselProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { next, prev } = useCarrousel(data);

  const handleNext = () => {
    if (!elementRef.current) return;
    next(elementRef.current);
  };

  const handlePrev = () => {
    if (!elementRef.current) return;
    prev(elementRef.current);
  };

  return (
    <div className='w-full h-full flex flex-row justify-center items-center'>
      <CarrouselArrows side={'left'} onClick={handlePrev} />
      <CarrouselMain>
        <div ref={elementRef} className='max-w-[90%] h-full flex items-center justify-start p-1 gap-4'>
          {
            data.map((item) => (
              <TaskCard key={item.taskId} data={item} />
            ))
          }
        </div>
      </CarrouselMain>
      <CarrouselArrows side={'right'} onClick={handleNext} />
    </div>
  );
}

export default Carrousel;
