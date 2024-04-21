import CoreLogo from 'components/CoreLogo';
import {UserReadSerializer, Core} from 'types';
import * as S from './Styles';

interface ContributorInfoProps {
  core: Core;
  rewardAmount: number;
  user: UserReadSerializer;
}

export const ContributorInfo: React.FC<ContributorInfoProps> = ({core, user, rewardAmount}) => {
  return (
    <>
      <S.UserLabel avatar={user.avatar} description="" id={user.id} username={user.username} />
      {core.logo && <CoreLogo logo={core.logo} width="20px" />}
      &nbsp;
      {rewardAmount.toLocaleString()}
    </>
  );
};
