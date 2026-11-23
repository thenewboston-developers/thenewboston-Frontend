import {Link} from 'react-router-dom';

import {SFC} from 'types';

import bnsiLogo from './bnsi.png';
import * as S from './Styles';

const FeaturedCurrency: SFC = ({className}) => (
  <S.Container aria-labelledby="featured-currency-title" className={className}>
    <S.Identity>
      <S.Logo alt="" height={64} src={bnsiLogo} width={64} />
      <div>
        <S.Eyebrow>Featured currency</S.Eyebrow>
        <S.CurrencyName>
          BNSI <span>by thenewbonsai</span>
        </S.CurrencyName>
      </div>
    </S.Identity>
    <S.Title id="featured-currency-title">Buy real bonsai trees with BNSI.</S.Title>
    <S.Description>
      Turn your BNSI into a living bonsai tree. Explore the trees at thenewbonsai, find your favorite, and use BNSI to
      buy it from the owner.
    </S.Description>
    <S.Actions>
      <S.ShopLink href="https://thenewbonsai.com/shop">Shop bonsai trees</S.ShopLink>
      <Link to="/currencies/7">Explore BNSI</Link>
    </S.Actions>
    <S.PurchaseNote>Contact the owner to purchase. Pickup only in Brooklyn, NY.</S.PurchaseNote>
  </S.Container>
);

export default FeaturedCurrency;
