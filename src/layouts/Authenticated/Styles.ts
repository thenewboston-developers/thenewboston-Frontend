import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div<{$isMobile: boolean}>`
  display: ${({$isMobile}) => ($isMobile ? 'flex' : 'grid')};
  flex-direction: ${({$isMobile}) => ($isMobile ? 'column' : 'unset')};
  grid-template-columns: ${({$isMobile}) => ($isMobile ? 'unset' : '260px 1fr')};
  height: 100vh;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) and (min-width: ${breakpoints.mobile}) {
    grid-template-columns: min-content 1fr;
  }
`;

export const MainArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;
