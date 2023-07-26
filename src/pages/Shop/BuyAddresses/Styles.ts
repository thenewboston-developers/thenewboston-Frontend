import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Addresses = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 12px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div`
  padding: 24px 32px;
`;
