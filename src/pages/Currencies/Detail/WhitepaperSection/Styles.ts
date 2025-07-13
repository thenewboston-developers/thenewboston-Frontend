import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MarkdownContainer = styled.div`
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
