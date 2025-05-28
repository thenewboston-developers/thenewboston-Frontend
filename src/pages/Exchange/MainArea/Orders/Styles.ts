import styled, {css} from 'styled-components';

import {ExchangeOrderType} from 'enums';
import {colors} from 'styles';

export const Container = styled.div`
  margin-top: 24px;
`;

export const DropdownMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const FillStatusBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;

  thead,
  tbody {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  th,
  td {
    padding: 12px 8px;
    text-align: left;
    font-size: 14px;
  }

  th:nth-child(3),
  td:nth-child(3),
  th:nth-child(4),
  td:nth-child(4),
  th:nth-child(5),
  td:nth-child(5) {
    text-align: right;
  }

  th:nth-child(6),
  td:nth-child(6),
  th:nth-child(7),
  td:nth-child(7) {
    text-align: center;
  }

  tr {
    border-bottom: 1px solid ${colors.border};
  }

  tbody {
    display: block;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
    width: 100%;
  }
`;

export const Tbody = styled.tbody`
  & > tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${colors.palette.gray['100']};
    }
  }
  & > tr > td {
    font-weight: 500;
    padding: 14px 8px;
    color: ${colors.primary};
  }
`;

export const Thead = styled.thead`
  & > tr > th {
    color: ${colors.secondary};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    padding: 12px 8px;
    letter-spacing: 0.05em;
  }
`;

export const TableStyle = styled.div`
  min-width: 900px;
  overflow-x: auto;
`;

export const Box = styled.div`
  background-color: ${colors.white};
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 24px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: ${colors.primary};
    margin: 0 0 4px 0;
  }
`;

const buyMixin = css`
  color: ${colors.palette.green['600']};
  font-weight: 600;
`;

const sellMixin = css`
  color: ${colors.palette.red['700']};
  font-weight: 600;
`;

export const OrderType = styled.span<{$orderType: ExchangeOrderType}>`
  ${({$orderType}) => {
    if ($orderType === ExchangeOrderType.BUY) return buyMixin;
    if ($orderType === ExchangeOrderType.SELL) return sellMixin;
    return;
  }}
`;

export const DateWrapper = styled.div`
  line-height: 1.4;
`;

export const TimeText = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
`;
