
import { useAppSelector } from '@app/hooks/redux';
import { projectSelector } from '@core/redux/reducers/projectSlice/project.selector';
import { IUser } from '@core/models';

interface IUserHook {
  // eslint-disable-next-line no-unused-vars
  getUsersById: (userId: string[]) => IUser[];
}

export const useUsers = (): IUserHook => {
  const users = useAppSelector(projectSelector).users as IUser[];

  const getUsersById = (usersId: string[]) => {
    const matchedUsers = users.filter((user) => usersId.includes(user.id));
    return matchedUsers;
  };

  return ({
    getUsersById
  });
};
