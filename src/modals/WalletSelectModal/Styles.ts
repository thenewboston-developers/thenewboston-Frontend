import styled from 'styled-components';

import UModal from 'components/Modal';
import UPagination from 'components/Pagination';
import {breakpoints, colors, hiddenScroll, radioCardContainerPadding} from 'styles';

export const Modal = styled(UModal)`
  max-height: 80vh;
  width: 680px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
  }
`;

export const ContentContainer = styled.div``;

export const LoaderContainer = styled.div<{$height: number}>`
  align-items: center;
  display: flex;
  height: ${({$height}) => `${$height}px`};
  justify-content: center;
`;

export const Pagination = styled(UPagination)`
  margin-top: 24px;
`;

export const SearchInput = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${colors.palette.gray[300]};
  color: ${colors.primary};
  font-size: 15px;
  margin-bottom: 20px;
  padding: 8px 2px;
  width: 100%;

  &:focus {
    border-bottom: 1px solid ${colors.palette.gray[500]};
    outline: none;
  }

  &::placeholder {
    color: ${colors.palette.gray[500]};
  }
`;

export const WalletCardContainer = styled.div`
  ${hiddenScroll};
  ${radioCardContainerPadding};
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  max-height: calc(80vh - 240px);

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mini}) {
    grid-template-columns: 1fr;
  }
`;
