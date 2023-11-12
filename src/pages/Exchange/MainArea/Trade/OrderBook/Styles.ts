import styled, {css} from 'styled-components';

import {ExchangeOrderType} from 'enums';
import {colors} from 'styles';

const buyMixin = css`
  color: ${colors.palette.green['300']};
`;

const sellMixin = css`
  color: ${colors.palette.red['300']};
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  margin-top: 16px;
  padding: 16px;
`;

export const Table = styled.table`
  margin-top: 16px;
  width: 100%;

  th,
  td {
    text-align: right;
  }
`;

export const Tr = styled.tr``;

export const Td = styled.td<{$orderType?: ExchangeOrderType}>`
  ${({$orderType}) => {
    if ($orderType === ExchangeOrderType.BUY) return buyMixin;
    if ($orderType === ExchangeOrderType.SELL) return sellMixin;
    return;
  }}
`;
