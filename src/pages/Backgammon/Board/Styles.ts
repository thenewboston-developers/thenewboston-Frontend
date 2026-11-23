import styled from 'styled-components';

export const Canvas = styled.svg`
  display: block;
  height: auto;
  overflow: visible;
  width: 100%;

  [role='button'] {
    cursor: pointer;
    outline: none;
  }

  [role='button']:focus-visible .point-focus {
    fill: #e9c76a;
    fill-opacity: 0.22;
    stroke: #ffe3a2;
    stroke-width: 3;
  }

  text {
    font-family: inherit;
    pointer-events: none;
    user-select: none;
  }
`;
