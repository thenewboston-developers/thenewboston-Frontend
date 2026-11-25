import styled, {css, keyframes} from 'styled-components';

import {backgammon} from '../theme';

const tumble = keyframes`
  0% { transform: translateY(-5px) rotate(-18deg) scale(0.88); }
  24% { transform: translateY(-12px) rotate(24deg) scale(1.06); }
  52% { transform: translateY(1px) rotate(-12deg) scale(0.97); }
  76% { transform: translateY(-4px) rotate(6deg); }
  100% { transform: translateY(0) rotate(0) scale(1); }
`;

// Gives way to the dice when the board is narrow, ending in an ellipsis
export const Caption = styled.span`
  color: ${backgammon.mist};
  flex: 0 1 auto;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Dice = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: calc(var(--die-size, 42px) * 0.24);
`;

// Sized by --die-size so the dice can grow and shrink with the board they are rolled on
export const Die = styled.div<{$animate: boolean; $index: number; $rolling: boolean; $used: boolean}>`
  --size: var(--die-size, 42px);

  align-items: center;
  background: linear-gradient(145deg, #fffaf0, #eadcbc);
  border-radius: calc(var(--size) * 0.22);
  box-shadow:
    inset 0 -2px 0 #cdbb92,
    inset 0 1px 0 #ffffff,
    0 2px 0 #9e8a60,
    0 5px 10px #00000052;
  display: grid;
  gap: calc(var(--size) * 0.07);
  grid-template-columns: repeat(3, 1fr);
  height: var(--size);
  opacity: ${({$used}) => ($used ? 0.35 : 1)};
  padding: calc(var(--size) * 0.18);
  transform-origin: center;
  transition: opacity 140ms;
  width: var(--size);

  @media (prefers-reduced-motion: no-preference) {
    ${({$animate, $index, $rolling}) =>
      ($rolling || $animate) &&
      css`
        animation: ${tumble} 560ms ${$index * 45}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${$rolling ? 'infinite' : '1'}
          both;
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Dot = styled.span<{$visible: boolean}>`
  aspect-ratio: 1;
  background: ${({$visible}) => ($visible ? 'radial-gradient(circle at 38% 32%, #4a5852, #121b18)' : 'transparent')};
  border-radius: 50%;
`;

export const Group = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  max-width: 100%;
`;
