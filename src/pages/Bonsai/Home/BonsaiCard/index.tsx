import {Bonsai, SFC} from 'types';

import * as S from './Styles';

export interface BonsaiCardProps {
  bonsai: Bonsai;
}

const BonsaiCard: SFC<BonsaiCardProps> = ({bonsai, className}) => {
  return (
    <S.Container className={className} to={`/bonsai/${bonsai.id}`}>
      {bonsai.images[0]?.url ? (
        <S.Image alt={bonsai.name} src={bonsai.images[0].url ?? ''} />
      ) : (
        <S.ImagePlaceholder>No image available</S.ImagePlaceholder>
      )}
      <S.Body>
        <S.Name>{bonsai.name}</S.Name>
        <S.Species>{bonsai.species}</S.Species>
        <S.Teaser>{bonsai.teaser}</S.Teaser>
        <S.PriceRow>
          {bonsai.price_currency?.logo ? (
            <S.CurrencyLogo alt={`${bonsai.price_currency.ticker} logo`} src={bonsai.price_currency.logo} />
          ) : null}
          <S.Price>
            {bonsai.price_amount.toLocaleString()} {bonsai.price_currency?.ticker}
          </S.Price>
        </S.PriceRow>
      </S.Body>
    </S.Container>
  );
};

export default BonsaiCard;
