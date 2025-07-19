import {SFC, TipAmount} from 'types';

import * as S from './Styles';

export interface TipAmountsProps {
  tipAmounts: TipAmount[];
}

const TipAmounts: SFC<TipAmountsProps> = ({className, tipAmounts}) => {
  if (!tipAmounts || tipAmounts.length === 0) {
    return null;
  }

  return (
    <S.Container className={className}>
      <S.Title>Tips</S.Title>
      <S.TipsList>
        {tipAmounts.map((tip) => (
          <S.TipItem key={tip.currency.id}>
            <S.CurrencyLogo alt={tip.currency.ticker} src={tip.currency.logo} />
            <S.TipInfo>
              <S.Amount>{tip.total_amount}</S.Amount>
              <S.Ticker>{tip.currency.ticker}</S.Ticker>
            </S.TipInfo>
          </S.TipItem>
        ))}
      </S.TipsList>
    </S.Container>
  );
};

export default TipAmounts;
