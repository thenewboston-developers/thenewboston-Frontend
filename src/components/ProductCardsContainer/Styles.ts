import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(5, 1fr);
  padding: 24px 32px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mini}) {
    grid-template-columns: auto;
  }
`;
