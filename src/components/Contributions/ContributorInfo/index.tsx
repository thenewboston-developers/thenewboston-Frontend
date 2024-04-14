import DefaultAvatar from 'assets/default-avatar.png';

import {UserReadSerializer, Core} from 'types';
import * as S from './Styles';

interface ContributorInfoProps {
  user: UserReadSerializer;
  core: Core;
  rewardAmount: number;
}

export const ContributorInfo: React.FC<ContributorInfoProps> = ({core, user, rewardAmount}) => {
  return (
    <>
      <S.UserLabel avatar={user.avatar || DefaultAvatar} description="" id={user.id} username={user.username} />
      {core.logo && <S.CoreLogo src={core.logo} alt="Core logo" />}
      <S.ContributionAmount>{rewardAmount.toLocaleString()}</S.ContributionAmount>
    </>
  );
};
