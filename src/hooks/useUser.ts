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
        // user stats are available in users state, not in self state.
        default_wallet_balance: users[self.id]?.default_wallet_balance ?? undefined,
        followers_count: users[self.id]?.followers_count ?? undefined,
        following_count: users[self.id]?.following_count ?? undefined,
        id: self.id!,
        username: self.username!,
      };
    }

    return users[userId] || null;
  }, [id, self, users]);
};

export default useUser;
