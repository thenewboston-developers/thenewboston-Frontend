import {useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import UserDetails from './UserDetails';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const userId = id ? parseInt(id, 10) : null;

  const renderTab = (displayName: string, url: string) => {
    return (
      <Tab isActive={location.pathname === url} onClick={() => navigate(url)}>
        {displayName}
      </Tab>
    );
  };

  const renderTabs = () => {
    if (!userId) return null;

    return (
      <Tabs>
        {renderTab('Posts', `/profile/${userId}`)}
        {renderTab('Artworks', `/profile/${userId}/artworks`)}
        {renderTab('Following', `/profile/${userId}/following`)}
        {renderTab('Followers', `/profile/${userId}/followers`)}
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
