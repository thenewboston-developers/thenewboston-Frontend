import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import DefaultAvatar from 'assets/default-avatar.png';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getInvitationLimit} from 'dispatchers/invitationLimits';
import {getInvitations} from 'dispatchers/invitations';
import {getPosts} from 'dispatchers/posts';
import {getUser} from 'dispatchers/users';
import {useToggle, useUser} from 'hooks';
import EditProfileModal from 'modals/EditProfileModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import Artworks from './Artworks';
import Invitations from './Invitations';
import Posts from './Posts';
import * as S from './Styles';

enum ProfileTab {
  ARTWORKS = 'ARTWORKS',
  INVITATIONS = 'INVITATIONS',
  POSTS = 'POSTS',
}

const Profile: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState(ProfileTab.POSTS);
  const [editProfileModalIsOpen, toggleEditProfileModal] = useToggle(false);
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const user = useUser(id);

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    (async () => {
      if (!userId) return;

      try {
        await Promise.all([
          dispatch(getInvitationLimit(userId)),
          dispatch(getInvitations()),
          dispatch(getPosts()),
          dispatch(getUser(userId)),
        ]);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching profile data');
      }
    })();
  }, [dispatch, userId]);

  const renderAvatar = () => {
    if (!user) return;
    return (
      <S.ImgWrapper>
        <S.Img alt="image" src={user.avatar || DefaultAvatar} />
      </S.ImgWrapper>
    );
  };

  const renderEditProfileButton = () => {
    if (self.id !== userId) return null;
    return <S.Button onClick={toggleEditProfileModal} text="Edit Profile" />;
  };

  const renderTabContent = () => {
    const tabContent = {
      [ProfileTab.ARTWORKS]: <Artworks />,
      [ProfileTab.POSTS]: <Posts />,
      [ProfileTab.INVITATIONS]: <Invitations />,
    };

    return <S.TabContent>{tabContent[activeTab]}</S.TabContent>;
  };

  const renderTabs = () => {
    return (
      <Tabs>
        <Tab isActive={activeTab === ProfileTab.POSTS} onClick={() => setActiveTab(ProfileTab.POSTS)}>
          Posts
        </Tab>
        <Tab isActive={activeTab === ProfileTab.ARTWORKS} onClick={() => setActiveTab(ProfileTab.ARTWORKS)}>
          Artworks
        </Tab>
        <Tab isActive={activeTab === ProfileTab.INVITATIONS} onClick={() => setActiveTab(ProfileTab.INVITATIONS)}>
          Invitations
        </Tab>
      </Tabs>
    );
  };

  const renderUsername = () => {
    if (!user) return null;
    return <S.Username>{user.username}</S.Username>;
  };

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          {renderAvatar()}
          {renderUsername()}
          {renderEditProfileButton()}
        </S.Left>
        <S.Right>
          {renderTabs()}
          {renderTabContent()}
        </S.Right>
      </S.Container>
      {editProfileModalIsOpen ? <EditProfileModal close={toggleEditProfileModal} /> : null}
    </>
  );
};

export default Profile;
