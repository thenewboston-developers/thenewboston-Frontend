import {useLocation, useNavigate, useParams, Outlet} from 'react-router-dom';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {SFC} from 'types';
import UserDetails from './UserDetails';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
        {renderTab('Posts', `/profile/${userId}/posts`)}
        {renderTab('Artworks', `/profile/${userId}/artworks`)}
        {renderTab('Invitations', `/profile/${userId}/invitations`)}
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
