import styled from 'styled-components';

import {breakpoints} from 'styles';

export const CardsContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 1fr);
  padding: 16px 16px 24px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div``;

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px 16px 0;
`;
