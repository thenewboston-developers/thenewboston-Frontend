import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 16px;
`;

export const DropdownMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Table = styled.table`
  margin-top: 16px;
  width: 100%;

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
`;
