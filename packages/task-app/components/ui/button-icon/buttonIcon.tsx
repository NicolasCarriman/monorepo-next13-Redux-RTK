import React from 'react';
import {
  ButtonCalendar,
  ButtonNotification,
  ButtonProjects,
  ButtonStatistics,
  ButtonTask,
  ButtonTeam,
  ResponsiveProps
} from './buttonicon.styled';
import { IoIosAddCircle } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import Button from '@app/components/common/button';

interface Props extends ResponsiveProps {
  type: 'notifications' | 'stats' | 'projects' | 'team' | 'calendar' | 'task'
}

function ButtonIcon({ type, showText, disabled }: Props) {

  let component: JSX.Element;
  switch (type) {
    case 'notifications':
      component = <ButtonNotification showText={showText} disabled={disabled} />;
      break;
    case 'stats':
      component = <ButtonStatistics showText={showText} disabled={disabled}/>;
      break;
    case 'projects':
      component = <ButtonProjects showText={showText} disabled={disabled}/>;
      break;
    case 'calendar':
      component = <ButtonCalendar showText={showText} disabled={disabled}/>;
      break;
    case 'team':
      component = <ButtonTeam  showText={showText} disabled={disabled}/>;
      break;
    case 'task':
      component = <ButtonTask showText={showText} disabled={disabled}/>;
      break;
    default:
      component = <ButtonTeam showText={showText} disabled={disabled}/>;
      break;
  }

  return component;
}

export default ButtonIcon;
interface ButtonAddProps {
  onClick?: () => void
}
export const ButtonAdd = ( { onClick }: ButtonAddProps) => {
  return (
    <Button
      variant='animated'
      onClick={onClick}
      size='small'
    >
      <IoIosAddCircle className='h-8 w-8'  />
    </Button>
  );
};


export const ButtonDelete = ( { onClick }: ButtonAddProps) => {
  return (
    <Button
      onClick={onClick}
      size='small'
    >
      <AiOutlineDelete className='h-6 w-6 text-white'  />
    </Button>
  );
};
