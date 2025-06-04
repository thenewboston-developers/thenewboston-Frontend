import {css} from 'styled-components';

import breakpoints from 'styles/breakpoints';
import colors from 'styles/colors';
import {TOOLBAR_HEIGHT} from 'styles/constants';
import fonts from 'styles/fonts';

export const feedPagePadding = css`
  padding: 0 32px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 24px;
  }
`;

export const formLabel = css`
  font-size: 12px;
  margin-bottom: 8px;
`;

export const hiddenScroll = css`
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const inputStyle = css`
  background: ${colors.whiteHover};
  border-radius: 3px;
  font-family: ${fonts.family.default};
  height: 40px;
  padding: 10px 14px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const pagePadding = css`
  padding: 24px 32px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px 24px;
  }
`;

export const toolbarStyle = css`
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  display: flex;
  height: ${`${TOOLBAR_HEIGHT}px`};
  justify-content: space-between;
  padding: 0 16px;
`;
