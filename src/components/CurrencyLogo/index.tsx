import {SFC} from 'types';

import * as S from './Styles';

export interface CurrencyLogoProps {
  logo: string;
  width?: string;
}

const CurrencyLogo: SFC<CurrencyLogoProps> = ({className, logo, width}) => {
  return (
    <S.Container className={className}>
      <S.ImgWrapper width={width}>
        <S.Img alt="logo" src={logo} />
      </S.ImgWrapper>
    </S.Container>
  );
};

export default CurrencyLogo;
