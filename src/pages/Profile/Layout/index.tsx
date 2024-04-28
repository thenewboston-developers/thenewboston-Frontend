import {useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import UserDetails from './UserDetails';
import * as S from './Styles';
import PostIcon from 'assets/post.svg';
import ArtworkIcon from 'assets/artwork.svg';
import FollowerIcon from 'assets/followers.svg';
import FollowingIcon from 'assets/following.svg';
import InvivationIcon from 'assets/invitation.svg';

type IconName = 'Artworks' | 'Followers' | 'Following' | 'Invitations' | 'Posts';

const IconMapper = {
  Artworks: ArtworkIcon,
  Followers: FollowerIcon,
  Following: FollowingIcon,
  Invitations: InvivationIcon,
  Posts: PostIcon,
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
        {<img src={IconMapper[displayName]} height={20} width={20} />}
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
