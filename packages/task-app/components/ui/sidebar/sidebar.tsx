'use client';

import React, { useEffect, useState } from 'react';
import { SideBarContainer, SidebarComponent, SidebarFooter, SidebarHead, SidebarMainContainer } from './sidebar.styled';
import { CurrentProject } from '../../common/projectName';
import ButtonIcon from '../button-icon/buttonIcon';
import AvatarComponent from '../../common/avatar';
import { IUser, store } from '@core/index';
import SideBarLink from '@app/components/common/link';
import useLocalStorage from '@app/hooks/useLocalStorage';

/**
 * todo: fix navigation structure
 * navigation structure should be composed by li component
 */

function Sidebar() {

  const [active, setActive] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [project, setProject] = useLocalStorage('project', {});
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useLocalStorage('user', {});

  const projectName = store.getState().project.name;
  const avatar = store.getState().user as IUser;

  const onHover = () => {
    setActive(true);
  };

  const onLeave = () => {
    setActive(false);
  };

  useEffect(() => {
    projectName && setProject(store.getState().project);
    avatar.name.length && setUser(store.getState().user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName, avatar]);

  return (
    <SideBarContainer>
      <SidebarComponent onHover={onHover} onLeave={onLeave}>
        <SidebarHead>
          <SideBarLink href='./dashboard'>
            {
              projectName &&
              <CurrentProject project={projectName} />
            }
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
        {
          avatar &&
          <SidebarFooter spanLabel={avatar.name}>
            <AvatarComponent isCurrentUser={true} label={avatar.name} />
          </SidebarFooter>
        }
      </SidebarComponent>
    </SideBarContainer>
  );
}

export default Sidebar;
