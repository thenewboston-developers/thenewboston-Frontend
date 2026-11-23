import {Link} from 'react-router-dom';

import {breakpoints} from 'styles';
import {SFC} from 'types';

import bnsiLogo from './bnsi.png';
import bonsaiHero from './bonsai-hero.webp';
import bonsaiPanorama from './bonsai-panorama.webp';
import * as S from './Styles';

const FeaturedCurrency: SFC = ({className}) => (
  <S.Container aria-labelledby="featured-currency-title" className={className}>
    <S.Copy>
      <S.Identity>
        <S.Logo alt="" height={36} src={bnsiLogo} width={36} />
        <S.Eyebrow>
          Featured currency <span>BNSI</span>
        </S.Eyebrow>
      </S.Identity>
      <S.Title id="featured-currency-title">
        Your BNSI.<span>A real bonsai.</span>
      </S.Title>
      <S.Description>
        Buy real bonsai trees with BNSI at thenewbonsai. Find a tree you love and make it part of your world.
      </S.Description>
      <S.Actions>
        <S.ShopLink href="https://thenewbonsai.com/shop">Shop bonsai trees</S.ShopLink>
        <Link to="/currencies/7">Explore BNSI</Link>
      </S.Actions>
      <S.PurchaseNote>
        Contact the owner to purchase.
        <br />
        Pickup only in Brooklyn, NY.
      </S.PurchaseNote>
    </S.Copy>
    <S.Artwork>
      <source height={1000} media={`(max-width: ${breakpoints.mobile})`} srcSet={bonsaiHero} width={1000} />
      <S.BonsaiImage
        alt="Bonsai artwork featuring a sculpted juniper with lush green foliage and a weathered trunk"
        decoding="async"
        height={600}
        src={bonsaiPanorama}
        width={1800}
      />
    </S.Artwork>
  </S.Container>
);

export default FeaturedCurrency;
