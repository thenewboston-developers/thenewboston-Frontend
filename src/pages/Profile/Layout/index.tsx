import {useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {
  mdiAccountArrowDownOutline,
  mdiAccountArrowUpOutline,
  mdiAccountBoxPlusOutline,
  mdiCardsOutline,
  mdiCircleMultipleOutline,
} from '@mdi/js';
import Icon from '@mdi/react';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';

import * as S from './Styles';
import UserDetails from './UserDetails';

type IconName = 'Collection' | 'Followers' | 'Following' | 'Invitations' | 'Posts';

const IconMapper = {
  Collection: mdiCircleMultipleOutline,
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
      <S.TabsWrapper>
        <Tabs>
          {renderTab('Posts', `/profile/${userId}`)}
          {renderTab('Followers', `/profile/${userId}/followers`)}
          {renderTab('Following', `/profile/${userId}/following`)}
          {renderTab('Collection', `/profile/${userId}/collection`)}
          {userId === self.id ? renderTab('Invitations', `/profile/${userId}/invitations`) : null}
        </Tabs>
      </S.TabsWrapper>
    );
  };

  return (
    <S.Container className={className}>
      <S.TopSection>
        <S.ContentWrapper>
          <UserDetails />
          {renderTabs()}
        </S.ContentWrapper>
      </S.TopSection>
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default Layout;
