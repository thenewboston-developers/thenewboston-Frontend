import {useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {
  mdiAccountArrowDownOutline,
  mdiAccountArrowUpOutline,
  mdiAccountBoxPlusOutline,
  mdiCardsOutline,
} from '@mdi/js';
import Icon from '@mdi/react';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import UserDetails from './UserDetails';
import * as S from './Styles';

type IconName = 'Followers' | 'Following' | 'Invitations' | 'Posts';

const IconMapper = {
  Followers: mdiAccountArrowDownOutline,
  Following: mdiAccountArrowUpOutline,
  Invitations: mdiAccountBoxPlusOutline,
  Posts: mdiCardsOutline,
};

const Layout: SFC = ({className}) => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const userId = id ? parseInt(id, 10) : null;

  const renderTab = (displayName: IconName, url: string) => {
    return (
      <Tab isActive={location.pathname === url} onClick={() => navigate(url)}>
        <Icon path={IconMapper[displayName]} size="20px" />
        <span>{displayName}</span>
      </Tab>
    );
  };

  const renderTabs = () => {
    if (!userId) return null;

    return (
      <Tabs>
        {renderTab('Posts', `/profile/${userId}`)}
        {renderTab('Followers', `/profile/${userId}/followers`)}
        {renderTab('Following', `/profile/${userId}/following`)}
        {userId === self.id ? renderTab('Invitations', `/profile/${userId}/invitations`) : null}
      </Tabs>
    );
  };

  return (
    <S.Container className={className}>
      <UserDetails />
      <S.OutletContainer>
        {renderTabs()}
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default Layout;
