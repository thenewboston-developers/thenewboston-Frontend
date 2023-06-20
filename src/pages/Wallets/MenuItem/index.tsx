import CoreLogo from 'components/CoreLogo';
import {SFC} from 'types';
import * as S from './Styles';

const MenuItem: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <CoreLogo logo="https://avatars.githubusercontent.com/u/12706692?s=200&v=4" />
      <S.Text>
        <S.Ticker>TNB</S.Ticker>
        <S.Domain>thenewboston.com</S.Domain>
        <S.Balance>Balance: 1,000</S.Balance>
      </S.Text>
    </S.Container>
  );
};

export default MenuItem;
