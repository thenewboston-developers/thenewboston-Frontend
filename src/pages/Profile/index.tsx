import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {getInvitationLimit} from 'dispatchers/invitationLimits';
import {getInvitations as _getInvitations} from 'dispatchers/invitations';
import {useSelfAvatar, useToggle} from 'hooks';
import EditProfileModal from 'modals/EditProfileModal';
import InvitationModal from 'modals/InvitationModal';
import {getInvitationLimits, getInvitations, getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import Invitation from './Invitation';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  const [editProfileModalIsOpen, toggleEditProfileModal] = useToggle(false);
  const [invitationModalIsOpen, toggleInvitationModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const invitationLimits = useSelector(getInvitationLimits);
  const invitations = useSelector(getInvitations);
  const self = useSelector(getSelf);
  const selfAvatar = useSelfAvatar();

  useEffect(() => {
    (async () => {
      if (!self.id) return;
      await Promise.all([dispatch(getInvitationLimit(self.id)), dispatch(_getInvitations())]);
    })();
  }, [dispatch, self.id]);

  const invitationLimitAmount = useMemo(() => {
    const invitationLimit = Object.values(invitationLimits).find(
      (_invitationLimit) => _invitationLimit.owner === self.id,
    );
    return invitationLimit?.amount || 0;
  }, [invitationLimits, self.id]);

  const invitationList = useMemo(() => {
    return Object.values(invitations);
  }, [invitations]);

  const renderAvatar = () => {
    return (
      <S.ImgWrapper>
        <S.Img alt="image" src={selfAvatar} />
      </S.ImgWrapper>
    );
  };

  const renderContent = () => {
    if (!!invitationList.length) return renderInvitations();
    return <EmptyText>No invitations to display.</EmptyText>;
  };

  const renderCreateInvitationButton = () => {
    if (invitationList.length >= invitationLimitAmount) return null;
    return <Button onClick={toggleInvitationModal} text="Create" />;
  };

  const renderInvitations = () => {
    const orderedInvitations = orderBy(invitationList, ['created_date'], ['desc']);
    const _invitations = orderedInvitations.map((invitation) => (
      <Invitation invitation={invitation} key={invitation.id} />
    ));
    return <S.Invitations>{_invitations}</S.Invitations>;
  };

  const renderSectionHeading = () => {
    return (
      <SectionHeading
        heading="Invitations"
        rightContent={renderCreateInvitationButton()}
        subHeading={`${invitationList.length}/${invitationLimitAmount}`}
      />
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
          {renderSectionHeading()}
          {renderContent()}
        </S.Right>
      </S.Container>
      {editProfileModalIsOpen ? <EditProfileModal close={toggleEditProfileModal} /> : null}
      {invitationModalIsOpen ? <InvitationModal close={toggleInvitationModal} /> : null}
    </>
  );
};

export default Profile;
