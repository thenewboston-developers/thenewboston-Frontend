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
        bio: self.bio || '',
        discord_username: self.discord_username,
        facebook_username: self.facebook_username,
        github_username: self.github_username,
        id: self.id!,
        instagram_username: self.instagram_username,
        is_staff: self.is_staff,
        linkedin_username: self.linkedin_username,
        pinterest_username: self.pinterest_username,
        reddit_username: self.reddit_username,
        tiktok_username: self.tiktok_username,
        twitch_username: self.twitch_username,
        x_username: self.x_username,
        username: self.username!,
        youtube_username: self.youtube_username,
      };
    }

    return users[userId] || null;
  }, [id, self, users]);
};

export default useUser;
