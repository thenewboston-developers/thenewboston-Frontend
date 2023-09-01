import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Artworks = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mini}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div``;

export const Img = styled.img`
  max-width: 100%;
`;
