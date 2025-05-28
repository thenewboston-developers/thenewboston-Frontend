import FillStatusBadge from 'components/FillStatusBadge';
import {AssetPair, ExchangeOrder, SFC} from 'types';

import * as S from './Styles';

interface TooltipProps {
  order: ExchangeOrder;
  activeAssetPair: AssetPair;
  date: string;
  time: string;
  type: 'buy' | 'sell';
}

const Tooltip: SFC<TooltipProps> = ({order, activeAssetPair, date, time, type}) => {
  return (
    <S.Tooltip>
      <S.TooltipContent>
        <S.TooltipRow>
          <S.TooltipLabel>Date:</S.TooltipLabel>
          <S.TooltipValue>
            {date.trim()} {time.trim()}
          </S.TooltipValue>
        </S.TooltipRow>
        <S.TooltipRow>
          <S.TooltipLabel>Order Type:</S.TooltipLabel>
          <S.TooltipValue $type={type}>{order.order_type}</S.TooltipValue>
        </S.TooltipRow>
        <S.TooltipRow>
          <S.TooltipLabel>Order Quantity:</S.TooltipLabel>
          <S.TooltipValue>
            {order.quantity.toLocaleString()} {activeAssetPair.primary_currency.ticker}
          </S.TooltipValue>
        </S.TooltipRow>
        <S.TooltipRow>
          <S.TooltipLabel>Filled Amount:</S.TooltipLabel>
          <S.TooltipValue>
            {order.filled_amount.toLocaleString()} {activeAssetPair.primary_currency.ticker}
          </S.TooltipValue>
        </S.TooltipRow>
        <S.TooltipRow>
          <S.TooltipLabel>Status:</S.TooltipLabel>
          <S.TooltipValue>
            <FillStatusBadge fillStatus={order.fill_status} />
          </S.TooltipValue>
        </S.TooltipRow>
      </S.TooltipContent>
    </S.Tooltip>
  );
};

export default Tooltip;
