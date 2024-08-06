import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {mdiAccountArrowDownOutline, mdiAccountArrowUpOutline, mdiBrushOutline, mdiCardsOutline} from '@mdi/js';
import Icon from '@mdi/react';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {SFC} from 'types';
import UserDetails from './UserDetails';
import * as S from './Styles';

type IconName = 'Artworks' | 'Followers' | 'Following' | 'Posts';

const IconMapper = {
  Artworks: mdiBrushOutline,
  Followers: mdiAccountArrowDownOutline,
  Following: mdiAccountArrowUpOutline,
  Posts: mdiCardsOutline,
};

const Layout: SFC = ({className}) => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
        {renderTab('Artworks', `/profile/${userId}/artworks`)}
        {renderTab('Followers', `/profile/${userId}/followers`)}
        {renderTab('Following', `/profile/${userId}/following`)}
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
