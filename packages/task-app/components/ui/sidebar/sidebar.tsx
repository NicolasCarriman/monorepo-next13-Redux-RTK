'use client';

import React, { useState } from 'react';
import { SideBarContainer, SidebarComponent, SidebarFooter, SidebarHead, SidebarMainContainer } from './sidebar.styled';
import ButtonIcon from '../button-icon/buttonIcon';
import AvatarComponent from '../../common/avatar';
import SideBarLink from '@app/components/common/link';
import Link from 'next/link';
import Burger from '@app/components/common/burger';

/**
 * todo: fix navigation structure
 * navigation structure should be composed by li component
 */

function Sidebar() {
  const [active, setActive] = useState(false);
  const [responsiveMenu, setResponsiveMenu] = useState(false);

  const handleClick = () => {
    setResponsiveMenu((state) => !state);
  };

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
        <Burger
          onClick={handleClick}
          isOpen={responsiveMenu}
        />
      </SidebarComponent>
      {
        responsiveMenu &&
        <div className='relative bottom-6 bg-white z-[300]'>
          <SideBarLink href={'./dashboard/tasks'} >
            <ButtonIcon type='task' showText={true} />
          </SideBarLink>
          <ButtonIcon type='stats' showText={true} disabled={true} />
          <ButtonIcon type='notifications' showText={true} disabled />
          <ButtonIcon type='projects' showText={true} disabled />
          <ButtonIcon type='team' showText={true} disabled />
          <ButtonIcon type='calendar' showText={true} disabled />
        </div>
      }
    </SideBarContainer>
  );
}

export default Sidebar;
