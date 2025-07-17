import FillStatusBadge from 'components/FillStatusBadge';
import {ExchangeOrderSide} from 'enums';
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
    <S.Container>
      <S.Content>
        <S.Row>
          <S.Label>Date:</S.Label>
          <S.Value>
            {date.trim()} {time.trim()}
          </S.Value>
        </S.Row>
        <S.Row>
          <S.Label>Order Type:</S.Label>
          <S.Value $type={type}>{order.side === ExchangeOrderSide.BUY ? 'BUY' : 'SELL'}</S.Value>
        </S.Row>
        <S.Row>
          <S.Label>Order Quantity:</S.Label>
          <S.Value>
            {order.quantity.toLocaleString()} {activeAssetPair.primary_currency.ticker}
          </S.Value>
        </S.Row>
        <S.Row>
          <S.Label>Filled Amount:</S.Label>
          <S.Value>
            {order.filled_quantity.toLocaleString()} {activeAssetPair.primary_currency.ticker}
          </S.Value>
        </S.Row>
        <S.Row>
          <S.Label>Status:</S.Label>
          <S.Value>
            <FillStatusBadge status={order.status} />
          </S.Value>
        </S.Row>
      </S.Content>
    </S.Container>
  );
};

export default Tooltip;
