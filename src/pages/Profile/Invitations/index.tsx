import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
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

  const renderRows = useCallback(() => {
    return invitationList.map((invitation, index) => (
      <Invitation invitation={invitation} key={invitation.id} index={index} />
    ));
  }, [invitationList]);

  const renderContent = () => {
    if (invitationList.length) {
      return (
        <>
          <S.Table>
            <S.Thead>
              <tr>
                <th className="fixed-width"></th>
                <th>NAME & DATE</th>
                <th>NOTE</th>
                <th>CODE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </S.Thead>
            <S.Tbody>{renderRows()}</S.Tbody>
          </S.Table>
        </>
      );
    }
    return <EmptyText>No invitations to display.</EmptyText>;
  };

  return (
    <>
      <S.Container className={className}>
        <S.Div>
          <S.Header>
            <S.Heading>
              Invitations — <span>{`${invitationList.length}/${invitationLimitAmount}`}</span>
            </S.Heading>
            {renderButton()}
          </S.Header>
          {renderContent()}
        </S.Div>
      </S.Container>
      {invitationModalIsOpen ? <InvitationModal close={toggleInvitationModal} /> : null}
    </>
  );
};

export default Invitations;
