import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getInvitationLimit} from 'dispatchers/invitationLimits';
import {getInvitations as _getInvitations} from 'dispatchers/invitations';
import {useSelfAvatar, useToggle} from 'hooks';
import EditProfileModal from 'modals/EditProfileModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import Invitations from './Invitations';
import * as S from './Styles';

enum ProfileTab {
  POSTS = 'POSTS',
  INVITATIONS = 'INVITATIONS',
}

const Profile: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState(ProfileTab.POSTS);
  const [editProfileModalIsOpen, toggleEditProfileModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const selfAvatar = useSelfAvatar();

  useEffect(() => {
    (async () => {
      if (!self.id) return;
      await Promise.all([dispatch(getInvitationLimit(self.id)), dispatch(_getInvitations())]);
    })();
  }, [dispatch, self.id]);

  const renderAvatar = () => {
    return (
      <S.ImgWrapper>
        <S.Img alt="image" src={selfAvatar} />
      </S.ImgWrapper>
    );
  };

  const renderTabContent = () => {
    const tabContent = {
      [ProfileTab.POSTS]: <div>Posts here</div>,
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
        <Tab isActive={activeTab === ProfileTab.INVITATIONS} onClick={() => setActiveTab(ProfileTab.INVITATIONS)}>
          Invitations
        </Tab>
      </Tabs>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          {renderAvatar()}
          <S.Button onClick={toggleEditProfileModal} text="Edit Profile" />
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
