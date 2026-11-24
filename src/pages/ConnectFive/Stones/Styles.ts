import styled, {css, keyframes, RuleSet} from 'styled-components';

import {fonts} from 'styles';

import {cosmos} from '../theme';

export type StoneTone = 'empty' | 'gold' | 'ivory' | 'obsidian';

// Emblem tiles draw their board lines EMBLEM_CELL pixels apart, starting EMBLEM_CELL pixels in
const EMBLEM_CELL = 9;
// Board art lays its lines BOARD_CELL pixels apart, the first ones EMBLEM_CELL pixels in as well
const BOARD_CELL = EMBLEM_CELL * 2;

const boardPoint = (cells: number) => EMBLEM_CELL + BOARD_CELL * cells + 0.5;

const ghostPulse = keyframes`
  0%, 100% {
    opacity: 0.45;
    transform: translate(-50%, -50%) scale(0.85);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const loaderPulse = keyframes`
  0%, 100% {
    filter: saturate(0.2) brightness(0.55);
    transform: scale(0.85);
  }
  40% {
    filter: none;
    transform: scale(1);
  }
`;

const ringPulse = keyframes`
  0% {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(0.6);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.6);
  }
`;

const toneStyles: Record<StoneTone, RuleSet> = {
  empty: css`
    background: transparent;
    border: 1px dashed rgba(206, 181, 255, 0.5);
  `,
  gold: css`
    background: radial-gradient(circle at 34% 30%, #fff8e3 0%, #ffd990 38%, #eba941 78%, #b9741a 100%);
    box-shadow:
      0 0 10px rgba(255, 200, 96, 0.5),
      inset 0 -1px 2px rgba(110, 60, 0, 0.35);
  `,
  ivory: css`
    background: radial-gradient(circle at 34% 30%, #ffffff 0%, #f6f1e7 45%, #d3cab8 100%);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.45),
      inset 0 -1px 2px rgba(80, 64, 40, 0.25);
  `,
  obsidian: css`
    background: radial-gradient(circle at 34% 30%, #6b6474 0%, #26222d 42%, #08070b 100%);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(206, 181, 255, 0.24);
  `,
};

// An emblem stone sits on an intersection of its tile, counted in board cells from the top left one
const placedStone = css<{$x: number; $y: number}>`
  left: ${({$x}) => `${EMBLEM_CELL * ($x + 1) + 0.5}px`};
  position: absolute;
  top: ${({$y}) => `${EMBLEM_CELL * ($y + 1) + 0.5}px`};
  transform: translate(-50%, -50%);
`;

export const Stone = styled.span<{$size: number; $tone: StoneTone}>`
  ${({$tone}) => toneStyles[$tone]};
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  flex-shrink: 0;
  height: ${({$size}) => `${$size}px`};
  position: relative;
  width: ${({$size}) => `${$size}px`};
`;

export const BoardArt = styled.span<{$columns: number; $rows: number}>`
  background:
    linear-gradient(rgba(206, 181, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(206, 181, 255, 0.16) 1px, transparent 1px), linear-gradient(160deg, #1d1440, #0c0820);
  background-position:
    ${`${EMBLEM_CELL}px ${EMBLEM_CELL}px`},
    ${`${EMBLEM_CELL}px ${EMBLEM_CELL}px`},
    0 0;
  background-size: ${`${BOARD_CELL}px ${BOARD_CELL}px`}, ${`${BOARD_CELL}px ${BOARD_CELL}px`}, auto;
  border: 1px solid ${cosmos.edge};
  border-radius: 18px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  display: block;
  flex-shrink: 0;
  height: ${({$rows}) => `${BOARD_CELL * $rows + 2}px`};
  max-width: 100%;
  overflow: hidden;
  position: relative;
  width: ${({$columns}) => `${BOARD_CELL * $columns + 2}px`};
`;

// The gold line through the stones of a winning line, drawn from the center of its first stone to its last
export const BoardArtLine = styled.span<{$from: [number, number]; $to: [number, number]}>`
  background: ${cosmos.gold};
  box-shadow: 0 0 8px rgba(255, 200, 96, 0.75);
  height: 2px;
  left: ${({$from}) => `${boardPoint($from[0])}px`};
  position: absolute;
  top: ${({$from}) => `${boardPoint($from[1])}px`};
  transform: ${({$from, $to}) => `translateY(-50%) rotate(${Math.atan2($to[1] - $from[1], $to[0] - $from[0])}rad)`};
  transform-origin: 0 50%;
  width: ${({$from, $to}) => `${BOARD_CELL * Math.hypot($to[0] - $from[0], $to[1] - $from[1])}px`};
`;

export const BoardArtStone = styled(Stone)<{$x: number; $y: number}>`
  left: ${({$x}) => `${boardPoint($x)}px`};
  position: absolute;
  top: ${({$y}) => `${boardPoint($y)}px`};
  transform: translate(-50%, -50%);
`;

export const EmblemGhost = styled(Stone)<{$x: number; $y: number}>`
  ${placedStone};
  animation: ${ghostPulse} 2.4s ease-in-out infinite;
  border-color: ${cosmos.gold};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const EmblemLine = styled.span`
  background: ${cosmos.gold};
  box-shadow: 0 0 6px rgba(255, 200, 96, 0.7);
  height: 2px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: ${`${Math.round(EMBLEM_CELL * 4 * Math.SQRT2)}px`};
`;

export const EmblemRing = styled.span<{$x: number; $y: number}>`
  ${placedStone};
  animation: ${ringPulse} 2s ease-out infinite;
  border: 2px solid ${cosmos.lavender};
  border-radius: 50%;
  height: 18px;
  width: 18px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.6;
  }
`;

export const EmblemSpark = styled.span`
  background: ${cosmos.gold};
  box-shadow: 0 0 10px rgba(255, 200, 96, 0.9);
  height: 7px;
  left: 50%;
  position: absolute;
  top: 12px;
  transform: translateX(-50%) rotate(45deg);
  width: 7px;
`;

export const EmblemStone = styled(Stone)<{$x: number; $y: number}>`
  ${placedStone};
`;

export const EmblemTile = styled.span`
  background:
    linear-gradient(rgba(206, 181, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(206, 181, 255, 0.16) 1px, transparent 1px), linear-gradient(160deg, #241a4b, #0e0923);
  background-position:
    ${`${EMBLEM_CELL}px ${EMBLEM_CELL}px`},
    ${`${EMBLEM_CELL}px ${EMBLEM_CELL}px`},
    0 0;
  background-size: ${`${EMBLEM_CELL}px ${EMBLEM_CELL}px`}, ${`${EMBLEM_CELL}px ${EMBLEM_CELL}px`}, auto;
  border: 1px solid ${cosmos.edgeBright};
  border-radius: 16px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 8px 20px rgba(8, 4, 24, 0.35);
  display: block;
  flex-shrink: 0;
  height: ${`${EMBLEM_CELL * 6}px`};
  overflow: hidden;
  position: relative;
  width: ${`${EMBLEM_CELL * 6}px`};
`;

export const Ghost = styled(BoardArtStone)`
  animation: ${ghostPulse} 2.4s ease-in-out infinite;
  border-color: ${cosmos.gold};
  box-shadow: 0 0 14px rgba(255, 200, 96, 0.35);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const KitFuse = styled.span`
  background: ${cosmos.gold};
  border-radius: 1px;
  box-shadow: 0 0 6px rgba(255, 200, 96, 0.9);
  height: 4px;
  position: absolute;
  right: 0;
  top: -1px;
  transform: rotate(45deg);
  width: 4px;
`;

export const KitPiece = styled.span<{$isVertical: boolean}>`
  align-items: center;
  display: inline-flex;
  flex-direction: ${({$isVertical}) => ($isVertical ? 'column' : 'row')};
  flex-shrink: 0;
  gap: 1px;
  justify-content: center;
  position: relative;
`;

export const Loader = styled.span`
  align-items: center;
  display: inline-flex;
  gap: 8px;
  position: relative;

  &::before {
    background: rgba(206, 181, 255, 0.25);
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  > span {
    animation: ${loaderPulse} 1.4s ease-in-out infinite;
  }

  ${[1, 2, 3, 4].map(
    (index) => css`
      > span:nth-child(${index + 1}) {
        animation-delay: ${`${index * 0.14}s`};
      }
    `,
  )}

  @media (prefers-reduced-motion: reduce) {
    > span {
      animation: none;
    }
  }
`;

export const RankStone = styled(Stone)`
  align-items: center;
  color: ${({$tone}) => ($tone === 'gold' ? cosmos.goldInk : cosmos.lilac)};
  display: inline-flex;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  justify-content: center;
  letter-spacing: -0.02em;
  line-height: 1;
  vertical-align: middle;
  z-index: 1;
`;

export const StoneRow = styled.span<{$gap: number}>`
  align-items: center;
  display: inline-flex;
  gap: ${({$gap}) => `${$gap}px`};
  position: relative;

  &::before {
    background: rgba(206, 181, 255, 0.28);
    content: '';
    height: 1px;
    left: -4px;
    position: absolute;
    right: -4px;
  }
`;

export const WinningLine = styled.span`
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 4px;
  position: relative;

  &::before {
    background: ${cosmos.gold};
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  span {
    background: ${cosmos.gold};
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255, 206, 108, 0.5);
    height: 6px;
    position: relative;
    width: 6px;
  }
`;

// A table cell holding a rank stone, with the gold line that runs to the stones of the rows above and below it
export const winningLineCell = css<{$lineAbove: boolean; $lineBelow: boolean}>`
  position: relative;

  &::before,
  &::after {
    background: ${cosmos.gold};
    box-shadow: 0 0 8px rgba(255, 200, 96, 0.55);
    content: '';
    left: calc(50% - 1px);
    position: absolute;
    width: 2px;
  }

  /* Starts a pixel higher to cover the border between the two rows */
  &::before {
    display: ${({$lineAbove}) => ($lineAbove ? 'block' : 'none')};
    height: calc(50% + 1px);
    top: -1px;
  }

  &::after {
    bottom: 0;
    display: ${({$lineBelow}) => ($lineBelow ? 'block' : 'none')};
    top: 50%;
  }
`;
