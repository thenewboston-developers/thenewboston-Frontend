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
