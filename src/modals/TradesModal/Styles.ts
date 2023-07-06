import styled from 'styled-components';

import UModal from 'components/Modal';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 640px;
`;

export const Table = styled.table`
  width: 100%;

  th,
  td {
    text-align: left;
  }

  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3),
  th:nth-child(4),
  td:nth-child(4) {
    text-align: right;
  }
`;
