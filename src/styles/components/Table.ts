import styled from 'styled-components';
import {colors} from 'styles';

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
