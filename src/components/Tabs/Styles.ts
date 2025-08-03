import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

const HEIGHT = 48;
const BORDER_RADIUS = HEIGHT / 2;

export const Container = styled.div<{$stackOnMobile: boolean}>`
  background: ${colors.palette.gray[200]};
  border: 1px solid #dfdfdf;
  border-radius: ${`${BORDER_RADIUS}px`};
  display: flex;
  height: ${`${HEIGHT}px`};
  overflow-x: auto;
  padding: 6px;
  width: fit-content;

  ${({$stackOnMobile}) =>
    $stackOnMobile &&
    `
    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
      height: auto;
      width: 100%;
    }
  `}
`;
