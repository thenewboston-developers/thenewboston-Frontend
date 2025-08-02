import styled from 'styled-components';

import UPagination from 'components/Pagination';
import {breakpoints, pagePadding} from 'styles';

export const CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: auto;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const Pagination = styled(UPagination)`
  margin-top: 32px;
`;
