import styled, {css, keyframes} from 'styled-components';

import {backgammon} from '../theme';

// Board coordinates of the hit (see HIT_BOARD): the black checker leaves point 17, lands on point 21 and the white
// blot it hits slides to the bar. The base styles are the final position, so reduced motion shows the result.
const BLOT_HOME = 'translate(629px, 81px)';
const ON_THE_BAR = 'translate(446px, 413px)';
const HITTER_HOME = 'translate(321px, 173px) scale(1)';
const HITTER_LANDED = 'translate(629px, 81px) scale(1)';

const blotSent = keyframes`
  0%, 33% { opacity: 1; transform: ${BLOT_HOME}; }
  37% { transform: translate(618px, 98px); }
  52%, 86% { opacity: 1; transform: ${ON_THE_BAR}; }
  92% { opacity: 0; transform: ${ON_THE_BAR}; }
  93% { opacity: 0; transform: ${BLOT_HOME}; }
  100% { opacity: 1; transform: ${BLOT_HOME}; }
`;

const hit = keyframes`
  0%, 12% { opacity: 1; transform: ${HITTER_HOME}; }
  23% { transform: translate(475px, 150px) scale(1.16); }
  33%, 86% { opacity: 1; transform: ${HITTER_LANDED}; }
  92% { opacity: 0; transform: ${HITTER_LANDED}; }
  93% { opacity: 0; transform: ${HITTER_HOME}; }
  100% { opacity: 1; transform: ${HITTER_HOME}; }
`;

// The dice land at the start of every loop and leave with the checkers at its end
const rollIn = keyframes`
  0% { opacity: 0; transform: translateY(-30px) rotate(-120deg) scale(0.7); }
  7% { opacity: 1; transform: translateY(5px) rotate(8deg) scale(1.03); }
  10%, 88% { opacity: 1; transform: none; }
  94%, 100% { opacity: 0; transform: none; }
`;

const tumble = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  40% { transform: translateY(-7px) rotate(120deg); }
  70% { transform: translateY(0) rotate(200deg); }
  100% { transform: translateY(0) rotate(360deg); }
`;

// Same landing, but the 4 has been played once the hit lands
const usedDie = keyframes`
  0% { opacity: 0; transform: translateY(-30px) rotate(-120deg) scale(0.7); }
  7% { opacity: 1; transform: translateY(5px) rotate(8deg) scale(1.03); }
  10%, 33% { opacity: 1; transform: none; }
  38%, 88% { opacity: 0.4; transform: none; }
  94%, 100% { opacity: 0; transform: none; }
`;

const movingPiece = css`
  transform-box: view-box;
  transform-origin: 0 0;
`;

export const Blot = styled.g`
  ${movingPiece};
  transform: ${ON_THE_BAR};

  @media (prefers-reduced-motion: no-preference) {
    animation: ${blotSent} 7s cubic-bezier(0.45, 0.05, 0.3, 1) infinite;
  }
`;

export const Cube = styled.svg`
  display: block;
  flex-shrink: 0;
  height: auto;
  width: var(--cube-size, 72px);
`;

export const DicePair = styled.span`
  --die-size: 42px;

  display: block;
  flex-shrink: 0;
  height: 70px;
  position: relative;
  width: 92px;

  > span {
    position: absolute;
  }

  > span:first-child {
    left: 2px;
    top: 4px;
    transform: rotate(-14deg);
  }

  > span:last-child {
    bottom: 4px;
    right: 2px;
    transform: rotate(9deg);
  }
`;

// Sized by --die-size; percentages would resolve against the parent, so the insets are derived from it too
export const Die = styled.span`
  --size: var(--die-size, 28px);

  background: linear-gradient(145deg, #fffaf0, #eadcbc);
  border-radius: calc(var(--size) * 0.22);
  box-shadow:
    inset 0 -2px 0 #cdbb92,
    inset 0 1px 0 #ffffff,
    0 2px 0 #9e8a60,
    0 5px 10px #00000052;
  box-sizing: border-box;
  display: grid;
  flex-shrink: 0;
  gap: calc(var(--size) * 0.05);
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  height: var(--size);
  padding: calc(var(--size) * 0.17);
  width: var(--size);
`;

export const Hitter = styled.g`
  ${movingPiece};
  transform: ${HITTER_LANDED};

  @media (prefers-reduced-motion: no-preference) {
    animation: ${hit} 7s cubic-bezier(0.45, 0.05, 0.3, 1) infinite;
  }
`;

export const MiniBoard = styled.svg`
  display: block;
  height: auto;
  width: 100%;
`;

export const Pip = styled.i<{$visible: boolean}>`
  background: radial-gradient(circle at 38% 32%, #4a5852, #121b18);
  border-radius: 50%;
  opacity: ${({$visible}) => ($visible ? 1 : 0)};
`;

export const PointStack = styled.svg`
  display: block;
  flex-shrink: 0;
  height: 52px;
  width: 26px;
`;

export const RollingDice = styled.span`
  --die-size: 22px;

  display: inline-flex;
  gap: 8px;

  @media (prefers-reduced-motion: no-preference) {
    > span {
      animation: ${tumble} 1.3s ease-in-out infinite;
    }

    > span:last-child {
      animation-delay: 0.18s;
    }
  }
`;

export const Scene = styled.figure`
  display: grid;
  gap: 12px;
  justify-items: center;
  margin: 0;

  > svg {
    filter: drop-shadow(0 10px 18px #0000004d);
    max-width: 360px;
  }

  [data-die='0'] {
    opacity: 0.4;
  }

  @media (prefers-reduced-motion: no-preference) {
    [data-die] {
      animation: ${rollIn} 7s ease-out infinite;
      transform-box: fill-box;
      transform-origin: center;
    }

    [data-die='0'] {
      animation-name: ${usedDie};
    }
  }
`;

export const SceneCaption = styled.figcaption`
  color: ${backgammon.mist};
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
`;
