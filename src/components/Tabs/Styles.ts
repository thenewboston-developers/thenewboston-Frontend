import styled, {css} from 'styled-components';

import {breakpoints, radii} from 'styles';

const HEIGHT = 40;
// The container clips its overflow to scroll horizontally, while a focused Tab draws the 2px ring of shadows.focusRing
// outside of its own box. The padding (which has to stay wider than the ring) leaves room for it at rest, and the
// matching scroll-padding keeps that room when the browser scrolls a focused Tab into view
const PADDING = 4;
// Translucent colors.primary: reads as colors.palette.gray[100] on white panels and stays visible on the page background
const TRACK_BACKGROUND = 'rgb(15 20 25 / 6%)';

const stackOnMobileMixin = css`
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`;

export const Container = styled.div<{$stackOnMobile: boolean}>`
  background: ${TRACK_BACKGROUND};
  border-radius: ${radii.medium};
  display: flex;
  gap: 2px;
  height: ${`${HEIGHT}px`};
  max-width: 100%;
  overflow-x: auto;
  padding: ${`${PADDING}px`};
  scroll-padding: ${`${PADDING}px`};
  scrollbar-width: none;
  width: fit-content;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({$stackOnMobile}) => $stackOnMobile && stackOnMobileMixin}
`;
