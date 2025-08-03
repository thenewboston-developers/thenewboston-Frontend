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

export const markdownStyle = css`
  color: ${colors.palette.gray[800]};
  line-height: 1.6;

  h1 {
    font-size: 2em;
    margin-bottom: 16px;
    margin-top: 24px;

    &:first-child {
      margin-top: 0;
    }
  }

  h2 {
    font-size: 1.5em;
    margin-bottom: 12px;
    margin-top: 20px;
  }

  h3 {
    font-size: 1.17em;
    margin-bottom: 10px;
    margin-top: 16px;
  }

  p {
    margin-bottom: 16px;
  }

  ul,
  ol {
    margin-bottom: 16px;
    padding-left: 32px;
  }

  code {
    background-color: ${colors.palette.gray[100]};
    border-radius: 3px;
    font-family: monospace;
    padding: 2px 4px;
  }

  pre {
    background-color: ${colors.palette.gray[100]};
    border-radius: 3px;
    margin-bottom: 16px;
    overflow-x: auto;
    padding: 16px;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid ${colors.palette.gray[300]};
    color: ${colors.palette.gray[600]};
    margin: 0 0 16px;
    padding-left: 16px;
  }

  a {
    color: ${colors.palette.blue[500]};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  hr {
    border: 0;
    border-top: 1px solid ${colors.palette.gray[300]};
    margin: 24px 0;
  }

  img {
    max-width: 100%;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 16px;
    width: 100%;

    th,
    td {
      border: 1px solid ${colors.palette.gray[300]};
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: ${colors.palette.gray[100]};
      font-weight: 600;
    }
  }
`;

export const pagePadding = css`
  padding: 24px 32px 64px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px 24px 24px;
  }
`;

export const toolbarStyle = css`
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  display: flex;
  height: ${`${TOOLBAR_HEIGHT}px`};
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1;
`;
