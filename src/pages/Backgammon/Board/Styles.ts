import styled, {css, keyframes} from 'styled-components';

const offerPulse = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
`;

export const BoardCube = styled.g<{$animate: boolean; $disabled: boolean; $offered: boolean}>`
  opacity: ${({$disabled}) => ($disabled ? 0.45 : 1)};
  pointer-events: none;
  transform-box: view-box;
  transform-origin: 0 0;
  transition: ${({$animate}) => ($animate ? 'transform 480ms cubic-bezier(0.22, 0.7, 0.25, 1)' : 'none')};

  .cube-offer {
    display: ${({$offered}) => ($offered ? 'inline' : 'none')};
  }

  ${({$offered}) =>
    $offered &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        .cube-offer {
          animation: ${offerPulse} 1.6s ease-in-out infinite;
        }
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

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
    fill: #f8d57b;
    fill-opacity: 0.22;
    stroke: #ffe3a2;
    stroke-width: 3;
  }

  text {
    font-family: inherit;
    pointer-events: none;
    user-select: none;
  }

  .serif {
    font-family: Georgia, 'Times New Roman', serif;
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
