import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div``;

export const DropdownMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FillStatusBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Table = styled.table`
  margin-top: 12px;
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
    text-align: left;
  }

  th:nth-child(3),
  td:nth-child(3),
  th:nth-child(4),
  td:nth-child(4),
  th:nth-child(5),
  td:nth-child(5),
  th:nth-child(7),
  td:nth-child(7) {
    text-align: right;
  }

  th:nth-child(6),
  td:nth-child(6) {
    text-align: center;
  }
  tr {
    border-bottom: 1px solid ${colors.border};
  }

  tbody {
    display: block;
    max-height: calc(100vh - 240px);
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
  padding: 26px 20px;
`;

export const TextAlignment = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
`;

export const TextColor = styled.span`
  color: ${colors.gray};
`;
