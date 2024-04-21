import Coin from 'assets/coin.svg';
import {SFC} from 'types';
import * as S from './Styles';

export interface CoreLogoProps {
  logo: string | null;
  width?: string;
}

const CoreLogo: SFC<CoreLogoProps> = ({className, logo, width}) => {
  return (
    <S.Container className={className}>
      <S.ImgWrapper width={width}>
        <S.Img alt="logo" src={logo || Coin} />
      </S.ImgWrapper>
    </S.Container>
  );
};

export default CoreLogo;
