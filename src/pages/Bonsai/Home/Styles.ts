import styled from 'styled-components';

import UPagination from 'components/Pagination';
import {breakpoints, pagePadding} from 'styles';

export const CardGrid = styled.div`
  column-gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 12px;
  row-gap: 32px;

  @media (max-width: ${breakpoints.largeDesktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const Pagination = styled(UPagination)`
  margin: 32px auto 0;
  width: 100%;
`;
