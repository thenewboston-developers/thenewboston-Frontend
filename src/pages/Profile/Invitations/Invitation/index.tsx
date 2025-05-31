import {useDispatch} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu from 'components/DropdownMenu';
import InvitationStatusBadge from 'components/InvitationStatusBadge';
import UserLabel from 'components/UserLabel';
import {deleteInvitation} from 'dispatchers/invitations';
import {InvitationStatus, ToastType} from 'enums';
import {useToggle} from 'hooks';
import InvitationModal from 'modals/InvitationModal';
import {AppDispatch, Invitation as TInvitation, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

export interface InvitationProps {
  invitation: TInvitation;
}

const Invitation: SFC<InvitationProps> = ({invitation}) => {
  const [invitationModalIsOpen, toggleInvitationModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const {recipient} = invitation;

  const handleDelete = async () => {
    try {
      await dispatch(deleteInvitation(invitation.id));
      displayToast('Invitation deleted!', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error deleting invitation');
    }
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: toggleInvitationModal,
    },
  ];

  if (!recipient) {
    menuOptions.push({
      label: 'Delete',
      onClick: handleDelete,
    });
  }

  const renderDropdownMenu = () => {
    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderInvitationStatusBadge = () => {
    const invitationStatus = recipient ? InvitationStatus.ACCEPTED : InvitationStatus.PENDING;
    return <InvitationStatusBadge invitationStatus={invitationStatus} />;
  };

  const renderUserLabel = () => {
    return (
      <UserLabel
        avatar={recipient ? recipient.avatar : null}
        description={shortDate(invitation.created_date, true)}
        id={recipient ? recipient.id : null}
        username={recipient ? recipient.username : '----'}
      />
    );
  };

  return (
    <>
      <S.InvitationCard>
        <S.InvitationHeader>
          <S.InvitationMainInfo>{renderUserLabel()}</S.InvitationMainInfo>
          <S.InvitationActions>
            <S.StatusBadgeWrapper>{renderInvitationStatusBadge()}</S.StatusBadgeWrapper>
            <S.DropdownMenuWrapper>{renderDropdownMenu()}</S.DropdownMenuWrapper>
          </S.InvitationActions>
        </S.InvitationHeader>

        <S.InvitationDetails>
          <S.DetailItem>
            <S.DetailLabel>Invitation Code</S.DetailLabel>
            <S.CodeValue>{invitation.code}</S.CodeValue>
          </S.DetailItem>

          {invitation.note && (
            <S.NoteItem>
              <S.DetailLabel>Note</S.DetailLabel>
              <S.DetailValue>{invitation.note}</S.DetailValue>
            </S.NoteItem>
          )}
        </S.InvitationDetails>
      </S.InvitationCard>

      {invitationModalIsOpen ? <InvitationModal close={toggleInvitationModal} invitation={invitation} /> : null}
    </>
  );
};

export default Invitation;
