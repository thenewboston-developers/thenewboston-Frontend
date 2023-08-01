import Badge, {BadgeStyle} from 'components/Badge';
import {InvitationStatus} from 'enums';
import {SFC} from 'types';

export interface InvitationStatusBadgeProps {
  invitationStatus: InvitationStatus;
}

const InvitationStatusBadge: SFC<InvitationStatusBadgeProps> = ({invitationStatus}) => {
  const badgeStyle = {
    [InvitationStatus.ACCEPTED]: BadgeStyle.success,
    [InvitationStatus.PENDING]: BadgeStyle.draft,
  };

  return <Badge badgeStyle={badgeStyle[invitationStatus]} text={invitationStatus} />;
};

export default InvitationStatusBadge;
