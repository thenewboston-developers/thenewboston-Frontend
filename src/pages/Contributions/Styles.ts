import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 32px;
`;

export const Table = styled.table`
  margin-top: 12px;
  width: 100%;

  th,
  td {
    padding: 2px 0;
    text-align: left;
  }

  th:nth-child(7),
  td:nth-child(7) {
    text-align: right;
  }
`;

export const Tr = styled.tr``;

export const Td = styled.td``;
