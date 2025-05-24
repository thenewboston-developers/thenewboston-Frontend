import {useDispatch} from 'react-redux';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';

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
  index: number;
}

const Invitation: SFC<InvitationProps> = ({invitation, index}) => {
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
      menuIcon: mdiSquareEditOutline,
      onClick: toggleInvitationModal,
    },
  ];

  if (!recipient) {
    menuOptions.push({
      label: 'Delete',
      menuIcon: mdiDeleteOutline,
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
      <tr>
        <td className="fixed-width">{index + 1}</td>
        <td>{renderUserLabel()}</td>
        <td>{invitation.note}</td>
        <td>{invitation.code}</td>
        <td>
          <S.InvitationStatusBadgeContainer>{renderInvitationStatusBadge()}</S.InvitationStatusBadgeContainer>
        </td>
        <td>
          <S.DropdownMenuContainer>{renderDropdownMenu()}</S.DropdownMenuContainer>
        </td>
      </tr>

      {invitationModalIsOpen ? <InvitationModal close={toggleInvitationModal} invitation={invitation} /> : null}
    </>
  );
};

export default Invitation;
