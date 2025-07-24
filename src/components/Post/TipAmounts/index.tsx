import {Link} from 'react-router-dom';

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
      {tipAmounts.map((tip) => (
        <S.TipItem as={Link} key={tip.currency.id} to={`/currencies/${tip.currency.id}`}>
          <S.CurrencyLogo alt={tip.currency.ticker} src={tip.currency.logo} />
          <S.Amount>{tip.total_amount.toLocaleString()}</S.Amount>
        </S.TipItem>
      ))}
    </S.Container>
  );
};

export default TipAmounts;
