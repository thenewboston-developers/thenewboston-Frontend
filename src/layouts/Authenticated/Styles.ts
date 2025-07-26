import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div<{$isMobile: boolean}>`
  display: grid;
  grid-template-columns: ${({$isMobile}) => ($isMobile ? '1fr' : '260px 1fr')};
  height: 100vh;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) and (min-width: ${breakpoints.mobile}) {
    grid-template-columns: min-content 1fr;
  }
`;

export const MainArea = styled.div`
  height: 100%;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    padding-bottom: 60px;
  }
`;
