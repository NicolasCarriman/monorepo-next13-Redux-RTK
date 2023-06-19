import { useState } from 'react';
/**
 * this function is used to slide elements
 * The 'position' state is responsible for providing the number of elements to slide
 */
export const useCarrousel = (
  data: unknown[]
) => {
  const [positions, setPositions] = useState({
    firstPos: 1,
    lastPosition: 3
  });

  const totalElements = data.length;
  const isNextElement = positions.lastPosition < totalElements;
  const isPrevElement = positions.firstPos > 1;
  const gapFromEL = 14; // this is the gap between the elements on the carrousel

  const next = (element: HTMLDivElement) => {
    if (!element) return;

    const childrenEl = element.firstChild as HTMLDivElement;
    const childrenWidth = childrenEl.offsetWidth;

    if (isNextElement) {
      // ckeck if next element exists
      const slidePosition = (childrenWidth + gapFromEL) * (positions.firstPos);

      element.style.transition = '0.5s';
      element.style.transform = `translateX(-${slidePosition}px)`;

      setPositions({
        firstPos: positions.firstPos + 1,
        lastPosition: positions.lastPosition + 1
      });

    } else {
      element.style.transition = '0.5s';
      element.style.transform = 'translateX(0px)';

      setPositions({
        // reset position of elements
        firstPos: 1,
        lastPosition: 3
      });
    }
  };

  const prev = (element: HTMLDivElement) => {
    if (!element) return;
    const childrenEl = element.firstChild as HTMLDivElement;
    const childrenWidth = childrenEl.offsetWidth;

    if (isPrevElement) {
      // ckeck if prev element exists
      const slidePosition = (childrenWidth + gapFromEL) * (positions.firstPos - 2);

      element.style.transition = '0.5s';
      element.style.transform = `translateX(${slidePosition}px)`;

      setPositions({
        firstPos: positions.firstPos - 1,
        lastPosition: positions.lastPosition - 1
      });
    } else {
      const lastElementPosition = totalElements - positions.lastPosition;
      const finalPosition = lastElementPosition * (childrenWidth + gapFromEL);
      element.style.transition = '0.5s';
      element.style.transform = `translateX(-${finalPosition}px)`;

      {
        setPositions({
          // change to last position
          firstPos: totalElements - 2,
          lastPosition: totalElements
        });
      }
    }
  };

  return {
    next,
    prev
  };

};
