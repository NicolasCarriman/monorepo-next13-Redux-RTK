'use client';

import React, { useState } from 'react';
import { SelectorContainer, TabsContainer } from './dynamicSelector.styled';
import Tab from '@app/components/common/tab';
import { twMerge } from 'tailwind-merge';
import style from '../../../app/style/animate.module.css';
import Button from '@app/components/common/button';
import { IoIosAddCircle } from 'react-icons/io';
import { HiCheck } from 'react-icons/hi';
import { TextBox } from '@app/components/common/textBox';

type selectableElement = {
  id: string;
  name: string;
}

interface DynamicSelectorProps {
  title: React.ReactNode;
  elements: selectableElement[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onClick?: (text: string) => void;
  newTabElement?: React.ReactNode;
  selectedId: string | undefined;
}
/**
 * this component is responsible to provide a simple selectable interface
 * 
 * @param title title of the component
 * @param elements array of elements to be selected
 * @param selectedIndex index of the element that is selected
 * @param onSelect function to be called when the element is selected
 * @param onClick function with text content as a parameter
 */

function DynamicSelector({
  title,
  elements,
  onSelect,
  onClick,
  newTabElement,
  selectedId
}: DynamicSelectorProps) {
  const [content, setContent ] = useState('');
  const [slide, setSlide] = useState(false);
  const [render, setRender] = useState('tabs');
  // use hook to manage the transition between tabs and menu
  const isTabs = render === 'tabs';
  const isMenu = render === 'menu';

  //todo: make a customHook
  const isSelected = (id: string) => {
    if (id === selectedId) {
      return true;
    } else return false;
  };

  const handleInput = (event: any) => {
    const content = event.target.innerText;
    setContent(content);
  };

  const handleSelect = (id: string) => {
    onSelect(id);
  };

  const handleClick = () => {
    if (isTabs) {
      setRender('menu');
    }
    if (isMenu) {
      setRender('tabs');
      if (!onClick) return;
      onClick(content);
    }
  };

  return (
    <SelectorContainer>
      <p>{title}</p>
      <div
        onAnimationEnd={() => {
          setRender('menu');
          setSlide(false);  
        }}
        className={twMerge(`
        overflow-hidden
        w-full
        h-full
        `, slide && style.slideY
      )}>
      {isTabs &&
          <TabsContainer >
            {
              elements.map((el) => (
                <Tab
                  key={el.id}
                  selected={isSelected(el.id)}
                  onClick={() => handleSelect(el.id)}
                >
                  {el.name}
                </Tab>
              ))
            }
          </TabsContainer>
      }
      {
        isMenu &&
        <TextBox
          onInput={handleInput}
          className={style.appearAnimation}>
            {newTabElement}
          </TextBox>
      }
      </div>
      <Button variant='animated' onClick={handleClick} size={'small'}>
        {
           isTabs && <IoIosAddCircle className='h-8 w-8'  />
        }
        {
           isMenu && <HiCheck className='h-8 w-8 '  />
        }
      </Button>
    </SelectorContainer>
  );
}

export default DynamicSelector;
