import {createGlobalStyle} from 'styled-components';

import {colors, fonts} from 'styles';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: ${colors.background};
    color: ${colors.primary};
    font-family: ${fonts.family.default};
    font-size: 14px;
    font-weight: ${fonts.weight.regular};
    margin: 0;
  }

  a {
    color: ${colors.primary};
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 16px;
  }

  h4 {
    font-size: 14px;
  }

  p {
    margin: 0 0 20px 0;
  }

`;

export default GlobalStyle;
