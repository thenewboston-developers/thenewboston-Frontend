import styled from 'styled-components';

import UModal from 'components/Modal';
import UPagination from 'components/Pagination';
import {breakpoints, hiddenScroll, radioCardContainerPadding} from 'styles';

export const Modal = styled(UModal)`
  max-height: 80vh;
  width: 680px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
  }
`;

export const Pagination = styled(UPagination)`
  margin-top: 24px;
`;

export const WalletCardContainer = styled.div`
  ${hiddenScroll};
  ${radioCardContainerPadding};
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  max-height: calc(80vh - 200px);

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mini}) {
    grid-template-columns: 1fr;
  }
`;
