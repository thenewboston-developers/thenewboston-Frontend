import {useSelector} from 'react-redux';

import DefaultAvatar from 'assets/default-avatar.png';
import {getSelf} from 'selectors/state';

const useSelfAvatar = () => {
  const self = useSelector(getSelf);

  return self.avatar || DefaultAvatar;
};

export default useSelfAvatar;
