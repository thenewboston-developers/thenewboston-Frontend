import styled, {css, keyframes} from 'styled-components';

const captured = keyframes`
  0%,
  38% {
    opacity: 1;
    transform: scale(1);
  }

  47%,
  90% {
    opacity: 0;
    transform: scale(0.35) rotate(-18deg);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeAt = (start: number, end: number) => keyframes`
  0%,
  ${start}% {
    opacity: 1;
  }

  ${end}%,
  90% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

// Movement in an SVG is measured in its own units, so these follow the drawing when it scales
const hop = keyframes`
  0%,
  15% {
    transform: translate(0, 0) scale(1);
  }

  32% {
    transform: translate(10px, 10px) scale(1.35);
  }

  50%,
  65% {
    transform: translate(20px, 20px) scale(1);
  }

  82% {
    transform: translate(10px, 10px) scale(1.35);
  }

  100% {
    transform: translate(0, 0) scale(1);
  }
`;

const jump = keyframes`
  0%,
  26% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }

  38% {
    transform: translate(40px, 40px) scale(1.32);
  }

  50%,
  84% {
    opacity: 1;
    transform: translate(80px, 80px) scale(1);
  }

  90% {
    opacity: 0;
    transform: translate(80px, 80px) scale(1);
  }

  91% {
    opacity: 0;
    transform: translate(0, 0) scale(1);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;

const loop = (frames: ReturnType<typeof keyframes>, duration: string) => css`
  ${pieceMotion};
  animation: ${frames} ${duration} ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const pieceMotion = css`
  transform-box: fill-box;
  transform-origin: center;
`;

export const Hop = styled.svg`
  flex-shrink: 0;
  height: 28px;
  width: 28px;
`;

export const HopPiece = styled.g`
  ${loop(hop, '1.6s')};
`;

export const KingsRow = styled.svg`
  display: block;
  height: auto;
  max-width: 300px;
  width: 100%;
`;

export const Matchup = styled.svg`
  display: block;
  flex-shrink: 0;
  height: 28px;
  width: 44px;
`;

export const Scene = styled.svg`
  display: block;
  filter: drop-shadow(0 14px 22px #10201866);
  height: auto;
  max-width: 380px;
  width: 100%;
`;

export const SceneArc = styled.path`
  animation: ${fadeAt(24, 32)} 5.2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SceneCaptured = styled.g`
  ${loop(captured, '5.2s')};
`;

export const SceneDot = styled.circle`
  animation: ${fadeAt(46, 52)} 5.2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SceneJumper = styled.g`
  ${loop(jump, '5.2s')};
`;

export const Tile = styled.svg`
  display: block;
  filter: drop-shadow(0 6px 12px #10201859);
  flex-shrink: 0;
  height: 56px;
  width: 56px;
`;
