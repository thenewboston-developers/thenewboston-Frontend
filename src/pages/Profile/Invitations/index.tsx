import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {useToggle} from 'hooks';
import InvitationModal from 'modals/InvitationModal';
import {getInvitationLimits, getInvitations, getSelf} from 'selectors/state';
import {SFC} from 'types';
import Invitation from './Invitation';
import * as S from './Styles';

const Invitations: SFC = ({className}) => {
  const [invitationModalIsOpen, toggleInvitationModal] = useToggle(false);
  const invitationLimits = useSelector(getInvitationLimits);
  const invitations = useSelector(getInvitations);
  const self = useSelector(getSelf);

  const invitationLimitAmount = useMemo(() => {
    const invitationLimit = Object.values(invitationLimits).find(
      (_invitationLimit) => _invitationLimit.owner === self.id,
    );
    return invitationLimit?.amount || 0;
  }, [invitationLimits, self.id]);

  const invitationList = useMemo(() => {
    return orderBy(Object.values(invitations), ['created_date'], ['desc']);
  }, [invitations]);

  const renderButton = () => {
    if (invitationList.length >= invitationLimitAmount) return null;
    return <Button onClick={toggleInvitationModal} text="Create" />;
  };

  const renderContent = () => {
    if (!invitationList.length) return <EmptyText>No invitations to display.</EmptyText>;
    const _invitations = invitationList.map((invitation) => <Invitation invitation={invitation} key={invitation.id} />);
    return <S.InvitationContainer>{_invitations}</S.InvitationContainer>;
  };

  return (
    <>
      <S.Container className={className}>
        <SectionHeading
          heading="Invitations"
          rightContent={renderButton()}
          subHeading={`${invitationList.length}/${invitationLimitAmount}`}
        />
        {renderContent()}
      </S.Container>
      {invitationModalIsOpen ? <InvitationModal close={toggleInvitationModal} /> : null}
    </>
  );
};

export default Invitations;
