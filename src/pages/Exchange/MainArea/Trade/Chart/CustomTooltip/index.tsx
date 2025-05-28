import Price from 'components/Price';
import {SFC} from 'types';

import * as S from './Styles';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  currencyId?: number;
}

const CustomTooltip: SFC<CustomTooltipProps> = ({active, payload, label, currencyId}) => {
  if (active && payload && payload.length && currencyId) {
    return (
      <S.TooltipContainer>
        <S.TooltipDate>{label}</S.TooltipDate>
        <S.TooltipPrice>
          <S.TooltipLabel>Price:</S.TooltipLabel>
          <S.TooltipValue>
            <Price price_amount={Number(payload[0].value)} price_currency={currencyId} />
          </S.TooltipValue>
        </S.TooltipPrice>
      </S.TooltipContainer>
    );
  }
  return null;
};

export default CustomTooltip;
