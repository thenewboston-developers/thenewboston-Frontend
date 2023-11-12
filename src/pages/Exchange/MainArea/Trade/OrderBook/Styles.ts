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
  margin-top: 24px;
`;

export const FillStatusBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Table = styled.table`
  margin-top: 16px;
  width: 100%;

  th,
  td {
    text-align: left;
    padding: 2px 0;
  }

  th:nth-child(3),
  td:nth-child(3),
  th:nth-child(4),
  td:nth-child(4),
  th:nth-child(5),
  td:nth-child(5),
  th:nth-child(6),
  td:nth-child(6) {
    text-align: right;
  }

  th:nth-child(7),
  td:nth-child(7) {
    text-align: center;
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
