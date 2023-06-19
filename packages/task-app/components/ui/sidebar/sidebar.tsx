'use client';

import React, { useState } from 'react';
import { SideBarContainer, SidebarComponent, SidebarFooter, SidebarHead, SidebarMainContainer } from './sidebar.styled';
import { CurrentProject } from '../../common/projectName';
import ButtonIcon from '../button-icon/buttonIcon';
import AvatarComponent from '../../common/avatar';
import { IUser, store } from '@core/index';
import SideBarLink from '@app/components/common/link';

/**
 * todo: fix navigation structure
 * navigation structure should be composed by li component
 */

function Sidebar() {

  const [active, setActive] = useState(false);

  const onHover = () => {
    setActive(true);
  };

  const onLeave = () => {
    setActive(false);
  };

  const avatar = store.getState().user as IUser;

  return (
    <SideBarContainer>
      <SidebarComponent onHover={onHover} onLeave={onLeave}>
        <SidebarHead>
          <SideBarLink href='./dashboard'>
            <CurrentProject />
          </SideBarLink>
        </SidebarHead>
        <SidebarMainContainer>
            <SideBarLink href={'./dashboard/tasks'} >
              <ButtonIcon type='task' showText={active} />
            </SideBarLink>
            <ButtonIcon type='stats' showText={active} disabled={true} />
            <ButtonIcon type='notifications' showText={active} disabled />
            <ButtonIcon type='projects' showText={active} disabled />
            <ButtonIcon type='team' showText={active} disabled />
            <ButtonIcon type='calendar' showText={active} disabled />
        </SidebarMainContainer>
        <SidebarFooter spanLabel={avatar.name}>
          <AvatarComponent isCurrentUser={true} label={avatar.name} />
        </SidebarFooter>
      </SidebarComponent>
    </SideBarContainer>
  );
}

export default Sidebar;
