import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  padding: 24px 32px;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 260px 1fr;
  }
`;

export const OutletContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;
