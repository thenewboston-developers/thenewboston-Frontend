import {css} from 'styled-components';

import colors from 'styles/colors';
import fonts from 'styles/fonts';

export const hiddenScroll = css`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const inputStyle = css`
  background: ${colors.whiteHover};
  border-radius: 3px;
  font-family: ${fonts.family.default};
  height: 40px;
  padding: 10px 14px;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
