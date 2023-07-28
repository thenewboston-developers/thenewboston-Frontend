import {SFC} from 'types';
import * as S from './Styles';

export interface UserLabelProps {
  description: string;
  name: string;
}

const UserLabel: SFC<UserLabelProps> = ({className, description, name}) => {
  return (
    <S.Container className={className}>
      <S.Avatar />
      <S.Right>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default UserLabel;
