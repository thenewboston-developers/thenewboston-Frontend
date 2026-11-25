import styled, {keyframes} from 'styled-components';

const winGlow = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
`;

// A full-size layer whose rotation carries the ball around the wheel; the ball itself only moves along the radius
export const Arm = styled.div`
  inset: 0;
  pointer-events: none;
  position: absolute;
  will-change: transform;
`;

export const Ball = styled.i`
  background: radial-gradient(circle at 34% 28%, #ffffff 0 18%, #f1ead8 46%, #b3a98f 100%);
  border-radius: 50%;
  box-shadow:
    1px 2px 3px #000000a6,
    inset -1px -1px 2px #00000033;
  height: 3.3%;
  left: 50%;
  position: absolute;
  top: 50%;
  transition: opacity 0.12s linear;
  width: 3.3%;
  will-change: transform;
`;

export const Bowl = styled.svg`
  display: block;
  height: 100%;
  inset: 0;
  position: absolute;
  width: 100%;
`;

// Fixed lamp light over the moving parts: a glint across the brass cone and a soft overhead highlight
export const Light = styled.div`
  background:
    radial-gradient(circle at 31% 22%, #ffffff29, transparent 36%),
    radial-gradient(circle at 70% 82%, #00000047, transparent 46%);
  border-radius: 50%;
  inset: 0;
  pointer-events: none;
  position: absolute;

  &::after {
    background: conic-gradient(
      from 205deg,
      transparent 0deg,
      #ffffff8c 16deg,
      transparent 46deg,
      transparent 150deg,
      #ffffff52 182deg,
      transparent 216deg,
      transparent 360deg
    );
    border-radius: 50%;
    content: '';
    inset: 27.5%;
    mix-blend-mode: soft-light;
    position: absolute;
  }
`;

export const Rotor = styled.div`
  inset: 0;
  position: absolute;
  will-change: transform;

  svg {
    display: block;
    height: 100%;
    inset: 0;
    position: absolute;
    width: 100%;
  }
`;

export const Trail = styled.svg`
  height: 100%;
  inset: 0;
  overflow: visible;
  pointer-events: none;
  position: absolute;
  width: 100%;
  will-change: transform;

  circle {
    fill: none;
    stroke: #fffbea;
    stroke-linecap: round;
  }
`;

export const Wheel = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow:
    0 26px 44px #00000080,
    0 6px 12px #00000059;
  position: relative;
  user-select: none;
  width: 100%;
`;

export const WinningPocket = styled.path`
  animation: ${winGlow} 1.1s ease-in-out infinite;
  fill: #f6e0a026;
  stroke: #f6e0a0;
  stroke-linejoin: round;
  stroke-width: 2.4;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
