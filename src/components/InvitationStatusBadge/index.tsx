import {InvitationStatus} from 'enums';
import {SFC} from 'types';

import Badge, {BadgeStyle} from 'components/Badge';

export interface InvitationStatusBadgeProps {
  invitationStatus: InvitationStatus;
}

const InvitationStatusBadge: SFC<InvitationStatusBadgeProps> = ({invitationStatus}) => {
  const badgeStyle = {
    [InvitationStatus.ACCEPTED]: BadgeStyle.success,
    [InvitationStatus.PENDING]: BadgeStyle.draft,
  };

  return <Badge badgeStyle={badgeStyle[invitationStatus]} children={invitationStatus} />;
};

export default InvitationStatusBadge;
