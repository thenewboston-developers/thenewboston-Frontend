import {css} from 'styled-components';

import colors from 'styles/colors';
import {TOOLBAR_HEIGHT} from 'styles/constants';
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

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const listItemDescription = css`
  color: ${colors.secondary};
  font-size: 12px;
  margin-top: 2px;
`;

export const listItemName = css`
  font-weight: 600;
`;

export const radioCardStyle = css<{$isActive: boolean}>`
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${({$isActive}) => ($isActive ? colors.palette.blue['300'] : colors.border)};
  display: flex;
  flex: auto;
  justify-content: center;
  margin: 6px;
  padding: 16px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

export const toolbarStyle = css`
  background: #24292f;
  color: #fff;
  display: flex;
  height: ${`${TOOLBAR_HEIGHT}px`};
  justify-content: space-between;
  padding: 0 16px;
`;
