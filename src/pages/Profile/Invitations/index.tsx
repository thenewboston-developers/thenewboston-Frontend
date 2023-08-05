import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
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
  const {id} = useParams();
  const invitationLimits = useSelector(getInvitationLimits);
  const invitations = useSelector(getInvitations);
  const self = useSelector(getSelf);

  const userId = id ? parseInt(id, 10) : null;

  const invitationLimitAmount = useMemo(() => {
    const invitationLimit = Object.values(invitationLimits).find(
      (_invitationLimit) => _invitationLimit.owner === userId,
    );
    return invitationLimit?.amount || 0;
  }, [invitationLimits, userId]);

  const invitationList = useMemo(() => {
    const _invitations = Object.values(invitations).filter(({owner}) => owner === userId);
    return orderBy(_invitations, ['created_date'], ['desc']);
  }, [invitations, userId]);

  const renderButton = () => {
    if (userId !== self.id) return null;
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
