import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getInvitationLimit} from 'dispatchers/invitationLimits';
import {getInvitations as _getInvitations} from 'dispatchers/invitations';
import {useSelfAvatar, useToggle} from 'hooks';
import EditProfileModal from 'modals/EditProfileModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import Invitations from './Invitations';
import * as S from './Styles';

enum Tab {
  POSTS = 'POSTS',
  INVITATIONS = 'INVITATIONS',
}

const Profile: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState(Tab.POSTS);
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
      [Tab.POSTS]: <div>Posts here</div>,
      [Tab.INVITATIONS]: <Invitations />,
    };

    return <S.TabContent>{tabContent[activeTab]}</S.TabContent>;
  };

  const renderTabs = () => {
    return (
      <S.Tabs>
        <S.Tab $isActive={activeTab === Tab.POSTS} onClick={() => setActiveTab(Tab.POSTS)}>
          Posts
        </S.Tab>
        <S.Tab $isActive={activeTab === Tab.INVITATIONS} onClick={() => setActiveTab(Tab.INVITATIONS)}>
          Invitations
        </S.Tab>
      </S.Tabs>
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
