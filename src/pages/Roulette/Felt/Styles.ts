import styled, {css, keyframes} from 'styled-components';

import {fonts} from 'styles';

import {room} from '../theme';
import {PocketColor} from '../utils';

// Where a spot's label goes once a chip sits on it: a number becomes a corner index, an outside bet moves up
export type LabelLift = 'corner' | 'up' | null;
export type SeatFlash = 'lost' | 'won' | null;
export type SpotState = 'dimmed' | 'idle' | 'won';
export type SpotTone = PocketColor | 'outside';

const TONES: Record<SpotTone, string> = {
  black: `linear-gradient(180deg, #2e353a, ${room.black})`,
  green: `linear-gradient(180deg, #22ad6c, ${room.greenDeep})`,
  outside: 'linear-gradient(180deg, #ffffff0f, #ffffff05)',
  red: `linear-gradient(180deg, #d83d4d, ${room.redDeep})`,
};

const chipDrop = keyframes`
  0% { opacity: 0; transform: translate(-50%, -110%) scale(1.25); }
  60% { opacity: 1; transform: translate(-50%, -46%) scale(0.96); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const chipSwept = keyframes`
  0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -230%) scale(0.7) rotate(-18deg); }
`;

const chipWon = keyframes`
  0%, 100% { filter: drop-shadow(0 0 0 ${room.brassLight}00); transform: translate(-50%, -50%) scale(1); }
  35% { filter: drop-shadow(0 0 9px ${room.brassLight}); transform: translate(-50%, -62%) scale(1.16); }
  70% { filter: drop-shadow(0 0 5px ${room.brassLight}99); transform: translate(-50%, -50%) scale(1.04); }
`;

const dollyDrop = keyframes`
  0% { opacity: 0; transform: translateY(-14px) scale(1.4); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const payoutRise = keyframes`
  0% { opacity: 0; transform: translate(-50%, -20%) scale(0.6); }
  18% { opacity: 1; transform: translate(-50%, -120%) scale(1.12); }
  75% { opacity: 1; transform: translate(-50%, -150%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -210%) scale(1); }
`;

const winPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 2px ${room.brassLight}, 0 0 10px ${room.brass}73; }
  50% { box-shadow: 0 0 0 2px ${room.brassLight}, 0 0 22px ${room.brassLight}; }
`;

// The croupier's marker on the winning number
export const Dolly = styled.i`
  animation: ${dollyDrop} 0.32s cubic-bezier(0.2, 0.9, 0.3, 1.3) both;
  background: radial-gradient(circle at 35% 28%, #ffffff, ${room.brassLight} 38%, ${room.brassDeep});
  border: 1px solid #ffffffb3;
  border-radius: 50%;
  box-shadow: 0 2px 4px #000000a6;
  height: 10px;
  position: absolute;
  right: 3px;
  top: 3px;
  width: 10px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Felt = styled.div<{$locked: boolean}>`
  display: grid;
  gap: 4px;
  grid-template-columns: minmax(0, 1.15fr) repeat(12, minmax(0, 1fr)) minmax(0, 1.3fr);
  grid-template-rows: repeat(5, minmax(46px, auto));
  transition: filter 0.3s ease;

  ${({$locked}) =>
    $locked &&
    css`
      filter: saturate(0.82) brightness(0.86);
    `}

  @container (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 0.82fr)) repeat(3, minmax(0, 1.2fr));
    grid-template-rows: repeat(14, minmax(42px, auto));
  }
`;

// Brass-edged cloth: the lamp falls on the middle of the table
export const Frame = styled.div`
  background:
    repeating-linear-gradient(45deg, #ffffff05 0 1px, transparent 1px 3px),
    radial-gradient(120% 110% at 50% 0%, #17694e, ${room.felt} 55%, ${room.feltDeep});
  border: 1px solid ${room.rimBright};
  border-radius: 16px;
  box-shadow:
    inset 0 0 0 5px ${room.feltDeep},
    inset 0 0 0 6px ${room.brass}73,
    inset 0 0 46px #00000052;
  container-type: inline-size;
  padding: 16px;
  touch-action: manipulation;
  user-select: none;

  @media (max-width: 600px) {
    border-radius: 14px;
    padding: 13px;
  }
`;

export const Gem = styled.i<{$color: 'black' | 'red'}>`
  background: ${({$color}) =>
    $color === 'red'
      ? `linear-gradient(135deg, #f0596a, ${room.redDeep})`
      : `linear-gradient(135deg, #4a545c, #0d1012)`};
  border: 1px solid #ffffff59;
  border-radius: 2px;
  flex: 0 0 auto;
  height: 10px;
  transform: rotate(45deg);
  width: 10px;
`;

// The winnings rising off the chips that earned them
export const Payout = styled.span`
  animation: ${payoutRise} 1.9s cubic-bezier(0.2, 0.8, 0.3, 1) both;
  background: linear-gradient(180deg, ${room.brassLight}, ${room.brass});
  border-radius: 999px;
  box-shadow: 0 4px 10px #00000080;
  color: ${room.ink};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  left: 50%;
  letter-spacing: 0;
  padding: 3px 9px;
  pointer-events: none;
  position: absolute;
  text-shadow: none;
  top: 0;
  white-space: nowrap;
  writing-mode: horizontal-tb;
  z-index: 4;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(-50%, -130%);
  }
`;

export const Pays = styled.small`
  color: ${room.brassLight};
  font-size: 10px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.04em;
  opacity: 0.75;
`;

export const Seat = styled.span<{$flash: SeatFlash; $lifted: boolean; $outside: boolean; $vertical: boolean}>`
  animation: ${chipDrop} 0.26s cubic-bezier(0.25, 0.9, 0.35, 1.2) both;
  left: ${({$outside}) => ($outside ? '50%' : '64%')};
  pointer-events: none;
  position: absolute;
  top: ${({$outside}) => ($outside ? '68%' : '62%')};
  transform: translate(-50%, -50%);
  width: ${({$outside}) => ($outside ? '24px' : 'min(26px, 70%)')};
  z-index: 2;

  ${({$flash}) =>
    $flash === 'won' &&
    css`
      animation: ${chipWon} 1s ease-in-out 3 both;
    `}

  ${({$flash}) =>
    $flash === 'lost' &&
    css`
      animation: ${chipSwept} 0.7s cubic-bezier(0.5, 0, 0.9, 0.5) 0.35s both;
    `}

  /* The stack being dragged is in the player's hand: only its outline stays on the spot */
  ${({$lifted}) =>
    $lifted &&
    css`
      animation: none;
      opacity: 0.28;
    `}

  @container (max-width: 520px) {
    ${({$vertical}) =>
      $vertical &&
      css`
        top: calc(100% - 22px);
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({$flash}) => ($flash === 'lost' ? 0.35 : 1)};
  }
`;

export const Spot = styled.button<{
  $active: boolean;
  $compact: boolean;
  $covered: boolean;
  $drop: boolean;
  $selected: boolean;
  $state: SpotState;
  $tone: SpotTone;
  $vertical: boolean;
}>`
  align-items: center;
  background: ${({$tone}) => TONES[$tone]};
  border: 1px solid ${({$tone}) => ($tone === 'outside' ? room.lineStrong : '#ffffff24')};
  border-radius: 7px;
  color: ${room.ivory};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  font-size: ${({$tone}) => ($tone === 'outside' ? '12px' : '15px')};
  font-weight: ${fonts.weight.bold};
  gap: 1px;
  grid-column: var(--wide-column);
  grid-row: var(--wide-row);
  justify-content: center;
  letter-spacing: ${({$tone}) => ($tone === 'outside' ? '0.08em' : '0')};
  min-width: 0;
  padding: 0;
  position: relative;
  text-shadow: 0 1px 1px #00000073;
  text-transform: ${({$tone}) => ($tone === 'outside' ? 'uppercase' : 'none')};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease,
    opacity 0.3s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${room.brassLight};
    filter: brightness(1.22);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px) scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${room.brassLight};
    outline-offset: 2px;
    z-index: 3;
  }

  &:disabled {
    cursor: default;
  }

  ${({$covered}) =>
    $covered &&
    css`
      border-color: ${room.brassLight};
      box-shadow: inset 0 0 0 1px ${room.brassLight}8c;
      filter: brightness(1.28);
    `}

  ${({$selected}) =>
    $selected &&
    css`
      border-color: ${room.brassLight};
      box-shadow:
        0 0 0 1px ${room.brassLight},
        0 0 14px ${room.brass}80;
    `}

  ${({$active}) =>
    $active &&
    css`
      box-shadow:
        0 0 0 2px ${room.brassLight},
        0 0 16px ${room.brass}b3;
    `}

  ${({$drop}) =>
    $drop &&
    css`
      border-color: ${room.brassLight};
      box-shadow:
        0 0 0 3px ${room.brassLight},
        0 0 22px ${room.brassLight}b3;
      filter: brightness(1.35);
      transform: scale(1.06);
      z-index: 3;
    `}

  ${({$state}) =>
    $state === 'dimmed' &&
    css`
      opacity: 0.42;
    `}

  ${({$state, $tone}) =>
    $state === 'won' &&
    ($tone === 'outside'
      ? css`
          background: linear-gradient(180deg, ${room.brass}47, ${room.brass}1f);
          border-color: ${room.brassLight};
          color: ${room.brassLight};
        `
      : css`
          animation: ${winPulse} 1.1s ease-in-out infinite;
          border-color: ${room.brassLight};
          z-index: 1;

          @media (prefers-reduced-motion: reduce) {
            animation: none;
            box-shadow: 0 0 0 2px ${room.brassLight};
          }
        `)}

  ${({$compact}) =>
    $compact &&
    css`
      font-size: 10.5px;
      letter-spacing: 0.03em;
    `}

  @container (max-width: 520px) {
    grid-column: var(--tall-column);
    grid-row: var(--tall-row);

    ${({$vertical}) =>
      $vertical &&
      css`
        flex-direction: row;
        gap: 6px;
        writing-mode: vertical-rl;
      `}
  }
`;

export const SpotLabel = styled.span<{$lift: LabelLift}>`
  align-items: center;
  display: inline-flex;
  gap: 6px;
  line-height: 1.1;
  transition: transform 0.2s ease;
  white-space: nowrap;

  ${({$lift}) =>
    $lift === 'corner' &&
    css`
      transform: translate(-10px, -12px) scale(0.78);
    `}

  ${({$lift}) =>
    $lift === 'up' &&
    css`
      transform: translateY(-12px) scale(0.92);
    `}
`;
