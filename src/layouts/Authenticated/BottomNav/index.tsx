import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  mdiAccount,
  mdiBell,
  mdiCircleMultipleOutline,
  mdiDotsVertical,
  mdiExitToApp,
  mdiHome,
  mdiPineTree,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';

import BadgeCount from './BadgeCount';
import MenuItem from './MenuItem';
import PopupMenu, {PopupMenuOption} from './PopupMenu';
import * as S from './Styles';

const BottomNav: SFC = ({className}) => {
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const popupOptions: PopupMenuOption[] = [
    {
      icon: mdiPineTree,
      label: 'Bonsai',
      onClick: () => navigate('/bonsai'),
    },
    {
      icon: mdiCircleMultipleOutline,
      label: 'Currencies',
      onClick: () => navigate('/currencies'),
    },
    {
      icon: mdiWalletBifoldOutline,
      label: 'Wallets',
      onClick: () => navigate('/wallets'),
    },
    {
      icon: mdiExitToApp,
      label: 'Log out',
      onClick: () => navigate(PATH_AUTHENTICATION.LOGOUT),
    },
  ];

  return (
    <S.Container className={className}>
      <MenuItem icon={mdiHome} rootPath="/feed" text="Home" to="/feed" />
      <MenuItem icon={mdiSwapHorizontalCircleOutline} rootPath="/exchange" text="Exchange" to="/exchange" />
      <MenuItem icon={mdiBell} rootPath="/notifications" text="Notifications" to="/notifications">
        <BadgeCount />
      </MenuItem>
      <MenuItem icon={mdiAccount} rootPath={`/profile/${self.id}`} text="Profile" to={`/profile/${self.id}`} />
      <PopupMenu options={popupOptions}>
        <S.IconWrapper>
          <S.Icon path={mdiDotsVertical} size="24px" />
        </S.IconWrapper>
        <S.Text>More</S.Text>
      </PopupMenu>
    </S.Container>
  );
};

export default BottomNav;
