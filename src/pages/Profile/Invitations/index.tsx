import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
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

  const renderContent = () => {
    return (
      <S.InvitationsList>
        {invitationList.length === 0 ? (
          <S.EmptyState>
            <p>No invitations to display.</p>
          </S.EmptyState>
        ) : (
          renderInvitations()
        )}
      </S.InvitationsList>
    );
  };

  const renderCreateInvitationButton = () => {
    if (userId !== self.id) return null;
    if (invitationList.length >= invitationLimitAmount) return null;
    return <Button onClick={toggleInvitationModal} text="Create" />;
  };

  const renderInvitations = useCallback(() => {
    return invitationList.map((invitation) => <Invitation invitation={invitation} key={invitation.id} />);
  }, [invitationList]);

  return (
    <>
      <S.Container className={className}>
        <S.Header>
          <S.Heading>
            Invitations — <span>{`${invitationList.length}/${invitationLimitAmount}`}</span>
          </S.Heading>
          {renderCreateInvitationButton()}
        </S.Header>
        {renderContent()}
      </S.Container>
      {invitationModalIsOpen ? <InvitationModal close={toggleInvitationModal} /> : null}
    </>
  );
};

export default Invitations;
