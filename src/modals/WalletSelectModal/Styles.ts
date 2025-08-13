import styled from 'styled-components';

import UModal from 'components/Modal';
import UPagination from 'components/Pagination';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 720px;
`;

export const Pagination = styled(UPagination)`
  margin-top: 16px;
`;

export const WalletCardContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
