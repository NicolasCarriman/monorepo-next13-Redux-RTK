'use client';

import { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';
import { InputComponent } from '../../common';
import ButtonComponent from '../../common/button';

interface InputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string
}

interface ContainerProps {
  children: React.ReactNode
};

export const FilterContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='hidden sm:flex flex-column w-auto gap-4'>
      { children }
    </div>  
  );
};

export const InputFilter: React.FC<InputProps> = ({ onChange, value }) => {
  return (
    <InputComponent
      onChange={onChange}
      value={value}
      icon={
        <AiOutlineSearch className='w-6 h-6' />
      }
    />
  );
};

export interface ItemProps {
  label: string;
  itemOptions?: string[];
  // eslint-disable-next-line no-unused-vars
  onOptionChange: (selectedOption: string) => void;
  reset: boolean;
}


export const ItemFilter: React.FC<ItemProps> = (props) => {
  const { label, itemOptions, onOptionChange, reset } = props;
  const [ selectedOption, setSelectedOption ] = useState('');

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
    onOptionChange(option);
  };

  useEffect(() => {
    if(reset) {
      setSelectedOption('default');
    }
  }, [reset]);

  return (
    <div
      className='flex flex-col items-center'
    >
      <select
        className="hover:text-blue-100 font-medium px-2 py-1 rounded-lg shadow-sm shadow-gray-500/40 h-10 w-28 text-gray-500 bg-transparent outline-none"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value='default' hidden>
          {label}
        </option>
        {
          itemOptions && itemOptions.map((item, index) => (
            <option
              className='rounded-md outline-none'
              key={index}
              value={item}
            >
              {item}
            </option>
          ))
        }
      </select>
    </div>
  );
};

interface SortableProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const SortableFilter: React.FC<SortableProps> = ({ label, onClick }) => {
  return (
    <ButtonComponent
      size={'medium'}
      variant='filter'
      rightIcon={
        <HiChevronDown />
      }
      onClick={onClick}
    >
      {label}
    </ButtonComponent>
  );
};
