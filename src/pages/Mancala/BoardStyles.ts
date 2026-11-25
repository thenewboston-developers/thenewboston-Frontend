import styled, {css, keyframes} from 'styled-components';

import {fonts} from 'styles';

import {STONE_RATIO} from './Emblems/geometry';
import {carved, focusRing, glassStone, honeyWood, mancala, STONES, StoneTone, woodPanel} from './theme';

// Ink burnt into the honey board, for the direction lane and store labels
const INK = '#4a2410';
const INK_SOFT = '#8a4a18';

// A bowl carved into the honey board, lit from the top left like the pits of the hero's board
const BOWL_SHADOW = 'inset 3px 7px 12px #5e2a0bb3, inset -1px -3px 4px #ffdcaa66, 0 1px 0 #ffe7bf80';
const MARKED_SHADOW = `${BOWL_SHADOW}, 0 0 0 2px #fff0c8, 0 0 20px #ffd27abf`;
const PLAYABLE_SHADOW = `${BOWL_SHADOW}, 0 0 0 2px #7fe6d0d9, 0 0 16px #7fe6d059`;

const countArrival = keyframes`
  0% { transform: scale(1); }
  45% { transform: scale(1.18); }
  100% { transform: scale(1); }
`;

const stoneFlight = keyframes`
  0% { opacity: 0; transform: translate(var(--from-x), var(--from-y)) translate(-50%, -50%) rotate(0deg) scale(0.8); }
  12% { opacity: 1; }
  50% { opacity: 1; transform: translate(var(--arc-x), var(--arc-y)) translate(-50%, -50%) rotate(90deg) scale(1.2); }
  94% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--to-x), var(--to-y)) translate(-50%, -50%) rotate(180deg) scale(0.85); }
`;

const stoneLanding = keyframes`
  0%, 65% { opacity: 0; transform: translate(-50%, -100%) rotate(var(--tilt, 0deg)) scale(0.65); }
  85% { opacity: 1; transform: translate(-50%, -45%) rotate(var(--tilt, 0deg)) scale(1.08, 0.92); }
  100% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--tilt, 0deg)) scale(1); }
`;

const bowl = css`
  background: radial-gradient(ellipse 110% 100% at 60% 72%, #eba862 0%, #cd8642 50%, #9e5b24 100%);
  border: 1px solid #7a3d1433;
  box-shadow: ${BOWL_SHADOW};
`;

const pit = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: clamp(7px, 1.2vw, 12px);
  min-width: 0;
`;

// The honey board of the hero's art, sitting on the walnut table
export const Board = styled.div`
  ${honeyWood};
  border-radius: clamp(22px, 4vw, 44px);
  box-shadow:
    inset 0 2px 1px #ffe2b399,
    inset 0 -5px 2px #7a3f1666,
    0 8px 0 #6b3412,
    0 18px 28px #1a0a0273;
  display: grid;
  gap: clamp(6px, 1.2vw, 14px);
  grid-template-columns: minmax(0, 1fr) minmax(0, 6.9fr) minmax(0, 1fr);
  padding: clamp(10px, 1.8vw, 23px);
  position: relative;
  user-select: none;
`;

export const Clock = styled.span`
  ${carved};
  border-radius: 999px;
  color: ${mancala.cream};
  font-size: clamp(12px, 1.6vw, 16px);
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.035em;
  margin-left: auto;
  padding: 5px 12px;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 4px 8px;
  }
`;

// The stone count under a pit: a dark carved tally, legible on the light wood
export const Count = styled.span<{$changed: boolean}>`
  ${carved};
  border-radius: 999px;
  color: ${mancala.cream};
  display: inline-grid;
  font-size: clamp(11px, 1.5vw, 15px);
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  line-height: 1;
  min-width: 26px;
  padding: 4px 8px;
  place-items: center;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${({$changed}) => ($changed ? countArrival : 'none')} 300ms ease-out;
  }

  @media (max-width: 480px) {
    min-width: 20px;
    padding: 3px 5px;
  }
`;

export const DirectionLane = styled.div`
  align-items: center;
  color: ${INK_SOFT}b3;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  min-height: 22px;

  > span:first-child,
  > span:last-child {
    flex: 1;
    font-size: 17px;
    line-height: 1;
  }

  > span:last-child {
    text-align: right;
  }
`;

export const EmptyPit = styled.span`
  background: #7a3d1459;
  border-radius: 50%;
  height: 4px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
`;

export const FlyingStone = styled.span`
  ${glassStone(STONES.turquoise)};
  animation: ${stoneFlight} 240ms cubic-bezier(0.35, 0, 0.55, 1) both;
  aspect-ratio: ${STONE_RATIO} / 1;
  box-shadow:
    inset 0 -2px 3px #0a5b5580,
    0 5px 9px #1a0a0280;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 5;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const Hollow = styled.span<{$marked: boolean; $playable: boolean; $source: boolean}>`
  ${bowl};
  aspect-ratio: 1;
  border-radius: 50%;
  display: block;
  outline: ${({$source}) => ($source ? `2px dashed ${INK_SOFT}` : '2px solid transparent')};
  outline-offset: 3px;
  position: relative;
  transition:
    box-shadow 160ms,
    outline-color 160ms;
  width: 100%;

  ${({$playable}) =>
    $playable &&
    css`
      border-color: #7fe6d0;
      box-shadow: ${PLAYABLE_SHADOW};
    `}

  ${({$marked}) =>
    $marked &&
    css`
      border-color: #fff0c8;
      box-shadow: ${MARKED_SHADOW};
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MovementLabel = styled.span<{$moving: boolean}>`
  color: ${({$moving}) => ($moving ? INK : `${INK_SOFT}b3`)};
  font-size: clamp(8px, 1.15vw, 11px);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: ${({$moving}) => ($moving ? '0.03em' : '0.24em')};
  line-height: 1.2;
  text-align: center;
  text-shadow: 0 1px 0 #ffd9a073;
`;

export const Pit = styled.div`
  ${pit};
`;

export const PitButton = styled.button`
  ${pit};
  background: none;
  border: 0;
  border-radius: 14px;
  cursor: pointer;
  font: inherit;
  padding: 0;
  touch-action: manipulation;

  &:disabled {
    cursor: default;
  }

  &[aria-busy='true'] {
    opacity: 0.65;
  }

  &:focus-visible {
    ${focusRing};
    outline-offset: 4px;
  }

  @media (hover: hover) {
    &:hover:not(:disabled) ${Hollow} {
      border-color: #c5fff0;
      box-shadow:
        ${BOWL_SHADOW},
        0 0 0 3px #a5f2dd,
        0 0 24px #7fe6d08c;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 160ms;

    &:active:not(:disabled) {
      transform: translateY(2px);
    }
  }
`;

// A small honey tile with the player's initial, like the lobby's emblems
export const PlayerAvatar = styled.span`
  ${honeyWood};
  align-items: center;
  border-radius: 12px;
  box-shadow:
    inset 0 1px 0 #ffe2b399,
    inset 0 -2px 0 #7a3f1666,
    0 2px 0 #6b3412;
  color: ${INK};
  display: flex;
  flex: 0 0 38px;
  font-size: 16px;
  font-weight: ${fonts.weight.extraBold};
  height: 38px;
  justify-content: center;

  @media (max-width: 480px) {
    border-radius: 9px;
    flex-basis: 28px;
    font-size: 13px;
    height: 28px;
  }
`;

export const PlayerIdentity = styled.div`
  min-width: 0;
`;

export const PlayerMeta = styled.span`
  color: ${mancala.dust};
  display: block;
  font-size: 11px;
  letter-spacing: 0.02em;
  margin-top: 3px;
`;

export const PlayerName = styled.strong`
  color: ${mancala.cream};
  display: block;
  font-size: clamp(13px, 1.5vw, 16px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// The player to move gets a jade edge and a jade clock, like a playable pit
export const PlayerRail = styled.div<{$active: boolean}>`
  align-items: center;
  border-left: 3px solid ${({$active}) => ($active ? mancala.jade : '#f3c88f26')};
  display: flex;
  gap: 12px;
  margin: 0 4px;
  padding: 2px 0 2px 12px;

  ${({$active}) =>
    $active &&
    css`
      ${Clock} {
        box-shadow:
          inset 0 5px 10px #0d0603b3,
          0 0 0 1px #7fe6d080;
        color: ${mancala.jade};
      }
    `}

  @media (max-width: 480px) {
    gap: 8px;
    margin: 0;
    padding-left: 8px;
  }
`;

export const RailScore = styled.strong`
  color: ${mancala.amberLight};
  display: grid;
  font-size: clamp(20px, 2.4vw, 27px);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  min-width: 42px;
  text-align: right;

  small {
    color: ${mancala.dust};
    font-size: 9px;
    font-weight: ${fonts.weight.semiBold};
    letter-spacing: 0.08em;
    margin-top: 4px;
    text-transform: uppercase;
  }
`;

export const Row = styled.div`
  display: grid;
  gap: clamp(5px, 1vw, 12px);
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

export const Rows = styled.div`
  display: grid;
  gap: 4px;
  grid-template-rows: 1fr auto 1fr;
`;

// An oval glass stone like the hero's, turned a little so no pile looks stacked by hand
export const Stone = styled.span<{$landing: number; $store: boolean; $tone: StoneTone}>`
  ${({$tone}) => glassStone($tone)};
  aspect-ratio: ${STONE_RATIO} / 1;
  position: absolute;
  transform: translate(-50%, -50%) rotate(var(--tilt, 0deg));
  width: ${({$store}) => ($store ? '27%' : '25%')};

  @media (prefers-reduced-motion: no-preference) {
    animation: ${({$landing}) => ($landing ? stoneLanding : 'none')} ${({$landing}) => $landing}ms ease-out both;
  }
`;

export const Store = styled.div<{$marked: boolean; $near: boolean}>`
  ${bowl};
  border-color: ${({$near}) => ($near ? '#7fe6d066' : '#7a3d1433')};
  border-radius: 999px;
  min-width: 0;
  position: relative;

  ${({$marked}) =>
    $marked &&
    css`
      border-color: #fff0c8;
      box-shadow: ${MARKED_SHADOW};
    `}
`;

// The store's tally, carved dark like the pit counts so it reads over the wood and the stones
export const StoreBadge = styled.span`
  ${carved};
  align-items: center;
  border-radius: 999px;
  display: flex;
  flex-direction: column;
  left: 50%;
  min-width: 64%;
  padding: clamp(4px, 0.8vw, 8px) clamp(3px, 0.6vw, 6px);
  position: absolute;
  top: 6%;
  transform: translateX(-50%);
  z-index: 1;
`;

export const StoreCount = styled.span<{$changed: boolean}>`
  color: ${mancala.cream};
  font-size: clamp(15px, 2.6vw, 28px);
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  line-height: 1;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${({$changed}) => ($changed ? countArrival : 'none')} 380ms ease-out;
  }
`;

export const StoreLabel = styled.span`
  color: ${mancala.dust};
  font-size: clamp(6px, 0.8vw, 8px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.12em;
  margin-top: 3px;
`;

// The walnut table the honey board sits on
export const Table = styled.div`
  ${woodPanel};
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: clamp(14px, 2.3vw, 28px);

  @media (max-width: 480px) {
    border-radius: 20px;
    gap: 18px;
    padding: 12px 8px;
  }
`;

export const TableHint = styled.p`
  color: ${mancala.sand};
  font-size: 12px;
  line-height: 1.5;
  margin: -8px 0 0;
  text-align: center;
`;

export const TurnPill = styled.span`
  background: #7fe6d01f;
  border: 1px solid #7fe6d066;
  border-radius: 999px;
  color: #b8f7e8;
  flex-shrink: 0;
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  padding: 5px 9px;

  @media (max-width: 480px) {
    font-size: 9px;
    padding: 4px 6px;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;
