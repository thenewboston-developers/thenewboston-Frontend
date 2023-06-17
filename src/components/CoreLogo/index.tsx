import Coin from 'assets/coin.svg';
import {SFC} from 'types';
import * as S from './Styles';

export interface CoreLogoProps {
  logo: string | null;
}

const CoreLogo: SFC<CoreLogoProps> = ({className, logo}) => {
  return (
    <S.Container className={className}>
      <S.ImgWrapper>
        <S.Img alt="logo" src={logo || Coin} />
      </S.ImgWrapper>
    </S.Container>
  );
};

export default CoreLogo;
