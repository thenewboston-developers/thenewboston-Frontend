import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

const SIDEBAR_WIDTH = 260;

export const Container = styled.div<{$isMobile: boolean}>`
  background: ${colors.background};
  display: ${({$isMobile}) => ($isMobile ? 'flex' : 'grid')};
  flex-direction: ${({$isMobile}) => ($isMobile ? 'column' : 'unset')};
  grid-template-columns: ${({$isMobile}) => ($isMobile ? 'unset' : `${SIDEBAR_WIDTH}px minmax(0, 1fr)`)};
  height: 100vh;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) and (min-width: ${breakpoints.mobile}) {
    grid-template-columns: min-content minmax(0, 1fr);
  }

  /* Dynamic viewport units keep the bottom navigation visible when mobile browser toolbars are showing */
  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;

export const MainArea = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
`;
