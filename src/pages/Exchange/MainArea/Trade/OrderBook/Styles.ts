import {ExchangeOrderType} from 'enums';
import styled, {css} from 'styled-components';
import {colors} from 'styles';

const buyMixin = css`
  color: ${colors.palette.green['300']};
`;

const sellMixin = css`
  color: ${colors.palette.red['300']};
`;

export const Container = styled.div`
  margin-top: 10px;
`;

export const FillStatusBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Table = styled.table`
  margin-top: 16px;
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
    padding: 2px 0;
    text-align: left;
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
  tr {
    border-bottom: 1px solid ${colors.border};
  }

  tbody {
    display: block;
    width: 100%;
  }
`;

export const Tbody = styled.tbody`
  & > tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }
  & > tr > td {
    font-weight: 600;
    padding: 10px 0;
  }
`;

export const Thead = styled.thead`
  & > tr > th {
    color: ${colors.gray};
    text-transform: uppercase;
    padding-bottom: 12px;
  }
`;

export const TableStyle = styled.div`
  min-width: 700px;
`;

export const Box = styled.div`
  background-color: ${colors.white};
  width: 100%;
  max-width: 100%;
  border-radius: 16px;
  overflow-x: auto;
  padding: 20px 20px 0px 20px;
`;

export const TextColor = styled.span`
  color: ${colors.gray};
`;

export const Tr = styled.tr``;

export const Td = styled.td<{$orderType?: ExchangeOrderType}>`
  ${({$orderType}) => {
    if ($orderType === ExchangeOrderType.BUY) return buyMixin;
    if ($orderType === ExchangeOrderType.SELL) return sellMixin;
    return;
  }}
`;
