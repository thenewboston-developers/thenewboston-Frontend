import Price from 'components/Price';
import {SFC} from 'types';

import * as S from './Styles';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  currencyId?: number;
}

const Tooltip: SFC<TooltipProps> = ({active, payload, label, currencyId}) => {
  if (!active || !payload || !payload.length || !currencyId) return null;

  return (
    <S.Container>
      <S.Date>{label}</S.Date>
      <S.PriceRow>
        <S.Label>Price:</S.Label>
        <S.Value>
          <Price price_amount={Number(payload[0].value)} price_currency={currencyId} />
        </S.Value>
      </S.PriceRow>
    </S.Container>
  );
};

export default Tooltip;
