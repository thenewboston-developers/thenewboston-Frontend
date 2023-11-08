import styled from 'styled-components';

import {breakpoints} from 'styles';

export const ArtworkCards = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  margin-top: 16px;

  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${breakpoints.largeDesktop}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${breakpoints.xlDesktop}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const Container = styled.div``;
