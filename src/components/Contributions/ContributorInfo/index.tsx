import DefaultAvatar from 'assets/default-avatar.png';

import * as S from './Styles';
import {UserReadSerializer, Core} from 'types';

interface ContributorInfoProps {
  user: UserReadSerializer;
  core: Core;
  rewardAmount: number;
}

export const ContributorInfo: React.FC<ContributorInfoProps> = ({core, user, rewardAmount}) => {
  return (
    <>
      <S.Avatar src={user.avatar || DefaultAvatar} alt={`${user.username} avatar`} />
      <S.ContributorName>{user.username}</S.ContributorName>
      {core.logo && <S.CoreLogo src={core.logo} alt="Core logo" />}
      <S.ContributionAmount>{rewardAmount.toLocaleString()}</S.ContributionAmount>
    </>
  );
};
