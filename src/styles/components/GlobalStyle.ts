import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-size: 14px;
    margin: 0;
  }

  a {
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
