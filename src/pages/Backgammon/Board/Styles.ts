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

export const CheckerPiece = styled.g<{$animate: boolean}>`
  pointer-events: none;
  transform-box: view-box;
  transform-origin: 0 0;
  transition: ${({$animate}) => ($animate ? 'transform 420ms cubic-bezier(0.22, 0.7, 0.25, 1)' : 'none')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
