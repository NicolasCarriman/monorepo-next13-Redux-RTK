'use client';

import React, { useState } from 'react';
import { SideBarContainer, SidebarComponent, SidebarFooter, SidebarHead, SidebarMainContainer } from './sidebar.styled';
import { CurrentProject } from '../../common/projectName';
import ButtonIcon from '../button-icon/buttonIcon';
import AvatarComponent from '../../common/avatar';
import SideBarLink from '@app/components/common/link';
import Link from 'next/link';

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

  return (
    <SideBarContainer>
      <SidebarComponent onHover={onHover} onLeave={onLeave}>
        <SidebarHead>
          <Link href='./dashboard' className='w-full font-bold text-start'>
            My Company
          </Link>
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
          <SidebarFooter spanLabel={'Emily Brown'}>
            <AvatarComponent isCurrentUser={true} label={'Emily Brown'} />
          </SidebarFooter>
      </SidebarComponent>
    </SideBarContainer>
  );
}

export default Sidebar;
