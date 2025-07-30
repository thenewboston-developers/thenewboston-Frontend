import {useSelector} from 'react-redux';
import {mdiAccount, mdiBell, mdiCircleMultipleOutline, mdiHome, mdiSwapHorizontalCircleOutline} from '@mdi/js';

import {getSelf} from 'selectors/state';
import {SFC} from 'types';

import BadgeCount from './BadgeCount';
import MenuItem from './MenuItem';
import * as S from './Styles';

const BottomNav: SFC = ({className}) => {
  const self = useSelector(getSelf);

  return (
    <S.Container className={className}>
      <MenuItem icon={mdiCircleMultipleOutline} rootPath="/currencies" text="Currencies" to="/currencies" />
      <MenuItem icon={mdiSwapHorizontalCircleOutline} rootPath="/exchange" text="Exchange" to="/exchange" />
      <MenuItem icon={mdiHome} rootPath="/feed" text="Home" to="/feed" />
      <MenuItem icon={mdiBell} rootPath="/notifications" text="Notifications" to="/notifications">
        <BadgeCount />
      </MenuItem>
      <MenuItem icon={mdiAccount} rootPath={`/profile/${self.id}`} text="Profile" to={`/profile/${self.id}`} />
    </S.Container>
  );
};

export default BottomNav;
