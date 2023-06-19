'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { InputFilter, SortableFilter, FilterContainer, ItemFilter } from './filter.styled';
import { ITask } from '@core/models/task.model';
import { DataFilter } from '../utilis';
import { IFilter } from '../models';
import ButtonComponent from '../../common/button';

interface Props {
  data: ITask[];
  setData: React.Dispatch<React.SetStateAction<ITask[]>>
}

function FilterComponent({ data, setData }: Props) {
  const [params, setParams] = useState<Partial<IFilter>>({
    search: '',
    priority: undefined,
    category: undefined,
    status: undefined,
    date: false,
  });
  const [reset, setReset] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const myFilter = new DataFilter(data, params);

  const setSearch = (s: string) => {
    setData(
      myFilter.filterBySearch(s, data)
    );
  };

  const setPriority = (p: string) => {
    setReset(false);
    setParams({
      ...params,
      priority: p
    });
  };

  const setStatus = (s: string) => {
    setReset(false);
    setParams({
      ...params,
      status: s,
    });
  };

  const setCategory = (c: string) => {
    setReset(false);
    setParams({
      ...params,
      category: c
    });
  };

  const setDate = (acending: boolean) => {
    setParams({
      ...params,
      date: acending
    });
  };

  const handleReset = () => {
    setParams({
      search: '',
      priority: undefined,
      category: undefined,
      status: undefined,
      date: false,
    });
    setData([]);
    setReset(true);
    setNoMatch(false);
  };

  const getMenuOptions = (label: string) => {
    const uniqueValues = new Set();

    switch (label) {
      case 'status':
        data.forEach((task) => uniqueValues.add(task.taskStatus));
        break;
      case 'priority':
        data.forEach((task) => uniqueValues.add(task.taskPriority));
        break;
      case 'date':
        data.forEach((task) => uniqueValues.add(task.taskDate));
        break;
      case 'category':
        data.forEach((task) => uniqueValues.add(task.taskCategory));
        break;
      default:
        return [];
    }

    return Array.from(uniqueValues) as string[];
  };

  useEffect(() => {
    if (myFilter.getFilteredData().length === data.length) return;
    setData(myFilter.getFilteredData());
    if (!myFilter.getFilteredData().length){
      setNoMatch(true);  
      const timeoutId = setTimeout(() => {
        setNoMatch(false);
        handleReset();
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <FilterContainer>
      {
        noMatch &&
        <div
          className='
            bg-blue-200 
            absolute 
            w-[calc(100vw)]
            top-0 
            left-0 
            right-0 
            h-[12vh] 
            z-[160]
            flex 
            justify-center 
            items-center 
            text-white 
            font-bold 
            text-xl 
            shadow-lg'
        >
          ¡Lo siento, no se encontraron resultados
          de búsqueda para las tareas! 😢🔍
        </div>
      }
      <InputFilter
        onChange={(e) => setSearch(e.target.value)}
      />
      <Suspense fallback={<div>loadingComponent</div>}>
        <ItemFilter
          reset={reset}
          label={'priority'}
          onOptionChange={setPriority}
          itemOptions={getMenuOptions('priority')}
        />
        <ItemFilter
          reset={reset}
          label={'status'}
          onOptionChange={setStatus}
          itemOptions={getMenuOptions('status')}
        />
        <ItemFilter
          reset={reset}
          label={'category'}
          onOptionChange={setCategory}
          itemOptions={getMenuOptions('category')}
        />
        <SortableFilter
          onClick={() => setDate(true)}
          label='date'
        />
      </Suspense>
      <ButtonComponent
        size={'medium'}
        variant='filter'
        onClick={() => handleReset()}
      >
        reset
      </ButtonComponent>
    </FilterContainer>
  );
}

export default FilterComponent;
