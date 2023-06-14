import {css} from 'styled-components';

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
