import {
  IoIosBuild,
  IoIosStats
} from 'react-icons/io';
import {
  MdNotificationsActive,
  MdWork,
  MdCalendarToday,
  MdContacts
} from 'react-icons/md';
import ButtonComponent from '../../common/button';

export interface ResponsiveProps {
  showText: boolean
  disabled?: boolean
}

export const ButtonNotification: React.FC<ResponsiveProps> = (props) => {
  return (
    <ButtonComponent
      variant='iconButton'
      size={ props.showText ? 'medium' : 'small' }
      leftIcon={<MdNotificationsActive/>}
      disabled={props.disabled}
      >
      {
        props.showText ? 'Notifications' : null
      }
    </ButtonComponent>
  );
};

export const ButtonStatistics: React.FC<ResponsiveProps> = (props) => {
  return (
    <ButtonComponent
      variant='iconButton'
      size={ props.showText ? 'medium' : 'small' }
      leftIcon={<IoIosStats/>}
      disabled={props.disabled}
      >
      {
        props.showText ? 'Statistics' : null
      }
    </ButtonComponent>
  );
};

export const ButtonTask: React.FC<ResponsiveProps> = (props) => {
  return (
    <ButtonComponent
      variant='iconButton'
      size={ props.showText ? 'medium' : 'small' }
      leftIcon={<IoIosBuild/>}
      disabled={props.disabled}
      >
      {
        props.showText ? 'Tasks' : null
      }
    </ButtonComponent>
  );
};

export const ButtonTeam: React.FC<ResponsiveProps> = (props) => {
  return (
    <ButtonComponent
      variant='iconButton'
      size={ props.showText ? 'medium' : 'small' }
      leftIcon={<MdContacts/>}
      disabled={props.disabled}
      >
      {
        props.showText ? 'Team' : null
      }
    </ButtonComponent>
  );
};

export const ButtonProjects: React.FC<ResponsiveProps> = (props) => {
  return (
    <ButtonComponent
      variant='iconButton'
      size={ props.showText ? 'medium' : 'small' }
      leftIcon={<MdWork/>}
      disabled={props.disabled}
      >
      {
        props.showText ? 'Projects' : null
      }
    </ButtonComponent>
  );
};

export const ButtonCalendar: React.FC<ResponsiveProps> = (props) => {
  return (
    <ButtonComponent
      variant='iconButton'
      size={ props.showText ? 'medium' : 'small' }
      leftIcon={<MdCalendarToday/>}
      disabled={props.disabled}
      >
      {
        props.showText ? 'Calendar' : null
      }
    </ButtonComponent>
  );
};
