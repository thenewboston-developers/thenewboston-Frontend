import Coin from 'assets/coin.svg';
import {SFC} from 'types';
import * as S from './Styles';

export interface ArticleLogoProps {
  logo: string | null;
  width?: number;
}

const ArticleLogo: SFC<ArticleLogoProps> = ({className, logo, width}) => {
  return (
    <S.Container className={className}>
      <S.ImgWrapper width={width}>
        <S.Img alt="logo" src={logo || Coin} />
      </S.ImgWrapper>
    </S.Container>
  );
};

export default ArticleLogo;
