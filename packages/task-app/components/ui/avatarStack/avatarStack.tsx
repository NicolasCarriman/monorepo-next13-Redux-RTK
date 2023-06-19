'use client';

import  AvatarComponent from '@app/components/common/avatar';
import { IUser } from '@core/models';
import { useUsers } from '../hooks/useUsers';
import { useAppSelector } from '@app/hooks/redux';
import { userSelector } from '@core/redux/reducers/userSlice/user.selector';

interface IAvatars {
  usersId: string[];
  label?: boolean
}

/**
 *  this component is responsible to get the users Id
 *  and match with the current users
 */

export const AvatarStack: React.FC<IAvatars> = ({ usersId, label=true }) => {
  const user = useAppSelector(userSelector);
  const { getUsersById } = useUsers();
  const currentUsers = getUsersById(usersId);
  const isCurrentUser = (userId: string) => {
    return userId === user.id;
  };

  return (
    <div
      className='flex flex-row items-center font-medium text-sm gap-4'
    >
      {
        currentUsers && currentUsers.map((user: IUser) => (
          <div
            key={user.id}
            className='flex flex-col justify-center items-center '
          >
            <AvatarComponent
              variant='small'
              label={user.name}
              isCurrentUser={isCurrentUser(user.id)}
            />
            {
              label &&
                <span className='text-center'>{user.name}</span>
            }
          </div>
        ))
      }
    </div>
  );
};
