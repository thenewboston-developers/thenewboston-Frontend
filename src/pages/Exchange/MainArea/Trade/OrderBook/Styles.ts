import styled, {css} from 'styled-components';

import {OrderType} from 'enums';
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

export const Td = styled.td<{$orderType?: OrderType}>`
  ${({$orderType}) => {
    if ($orderType === OrderType.BUY) return buyMixin;
    if ($orderType === OrderType.SELL) return sellMixin;
    return;
  }}
`;
