import styled, {keyframes} from 'styled-components';

const drop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-85%) scale(1.12);
  }

  70% {
    opacity: 1;
    transform: translateY(4%) scale(1);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

export const Chip = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
`;

// One chip of a stack: its face, and a sliver of its edge showing above the chip below
export const Layer = styled.span<{$edge: string}>`
  animation: ${drop} calc(260ms * var(--speed, 1)) cubic-bezier(0.3, 0.8, 0.3, 1) both;
  aspect-ratio: 1;
  border-radius: 50%;
  bottom: calc(var(--level) * var(--chip-w) * 0.105);
  box-shadow:
    0 calc(var(--chip-w) * 0.07) 0 ${({$edge}) => $edge},
    0 calc(var(--chip-w) * 0.1) 0 #000000a6;
  display: block;
  left: 0;
  position: absolute;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Stack = styled.span`
  aspect-ratio: 1;
  display: block;
  filter: drop-shadow(0 calc(var(--chip-w) * 0.14) calc(var(--chip-w) * 0.1) #00120bb3);
  position: relative;
  width: var(--chip-w);
`;
