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
      {tipAmounts.map((tip) => {
        const formattedAmount = tip.total_amount.toLocaleString();

        return (
          <S.TipItem
            key={tip.currency.id}
            title={`${formattedAmount} ${tip.currency.ticker} in tips`}
            to={`/currencies/${tip.currency.id}`}
          >
            <S.CurrencyLogo alt={tip.currency.ticker} src={tip.currency.logo} />
            <S.Amount>{formattedAmount}</S.Amount>
          </S.TipItem>
        );
      })}
    </S.Container>
  );
};

export default TipAmounts;
