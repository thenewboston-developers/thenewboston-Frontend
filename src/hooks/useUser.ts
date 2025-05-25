import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getSelf, getUsers} from 'selectors/state';
import {UserReadSerializer} from 'types';

const useUser = (id: string | undefined): UserReadSerializer | null => {
  const self = useSelector(getSelf);
  const users = useSelector(getUsers);

  return useMemo(() => {
    if (!id) return null;

    const userId = parseInt(id, 10);

    if (userId === self.id) {
      return {
        avatar: self.avatar,
        id: self.id!,
        is_manual_contribution_allowed: self.is_manual_contribution_allowed,
        username: self.username!,
      };
    }

    return users[userId] || null;
  }, [id, self, users]);
};

export default useUser;
