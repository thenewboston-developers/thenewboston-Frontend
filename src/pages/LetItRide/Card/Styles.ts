import styled, {css, keyframes} from 'styled-components';

import {table} from '../theme';

const dealIn = keyframes`
  0% { opacity: 0; transform: translate3d(0, -34px, 0) rotate(-7deg) scale(0.92); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0) scale(1); }
`;

const side = css`
  backface-visibility: hidden;
  border-radius: inherit;
  inset: 0;
  position: absolute;
`;

export const Back = styled.span`
  ${side};
  background:
    radial-gradient(circle at 50% 50%, ${table.gold}66 0 9%, transparent 10%),
    repeating-linear-gradient(45deg, #ffffff14 0 2px, transparent 2px 9px),
    repeating-linear-gradient(-45deg, #ffffff14 0 2px, transparent 2px 9px), linear-gradient(160deg, #2a4f9f, #142c66);
  border: 3px solid ${table.ivory};
  box-shadow: inset 0 0 0 1px ${table.gold}8c;
`;

export const Card = styled.span<{$dimmed: boolean; $lifted: boolean; $order: number}>`
  animation: ${dealIn} 0.42s cubic-bezier(0.2, 0.8, 0.3, 1) both;
  animation-delay: ${({$order}) => $order * 70}ms;
  aspect-ratio: 5 / 7;
  border-radius: 9px;
  display: block;
  filter: ${({$dimmed}) => ($dimmed ? 'brightness(0.62) saturate(0.7)' : 'none')};
  perspective: 700px;
  transition:
    filter 0.3s ease,
    translate 0.3s ease;
  translate: 0 ${({$lifted}) => ($lifted ? '-8px' : '0')};
  width: var(--card-width, 84px);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

// One index, top left: a second one printed upside down would turn a 9 into a 6 at this size
export const Corner = styled.span`
  align-items: center;
  display: flex;
  flex-direction: column;
  left: 8%;
  line-height: 1;
  position: absolute;
  top: 6%;

  b {
    font-size: calc(var(--card-width, 84px) * 0.27);
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  i {
    font-size: calc(var(--card-width, 84px) * 0.21);
    font-style: normal;
    margin-top: 2px;
  }
`;

export const Face = styled.span<{$red: boolean}>`
  ${side};
  background: linear-gradient(160deg, #fffdf6, #efe7d2);
  border: 1px solid #ffffff;
  box-shadow: inset 0 0 0 1px #00000014;
  color: ${({$red}) => ($red ? table.red : table.spade)};
  font-family: Georgia, 'Times New Roman', serif;
  transform: rotateY(180deg);
`;

export const Inner = styled.span<{$faceUp: boolean}>`
  border-radius: inherit;
  box-shadow: 0 8px 16px #0000004d;
  display: block;
  height: 100%;
  position: relative;
  transform: rotateY(${({$faceUp}) => ($faceUp ? '180deg' : '0deg')});
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.3, 0.7, 0.2, 1);
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Pip = styled.span`
  bottom: 7%;
  font-size: calc(var(--card-width, 84px) * 0.6);
  line-height: 1;
  position: absolute;
  right: 9%;
`;
