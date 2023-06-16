import {SFC} from 'types';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <div>Profile</div>
    </S.Container>
  );
};

export default Profile;
