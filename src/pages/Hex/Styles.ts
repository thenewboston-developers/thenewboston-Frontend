import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import * as GameResult from 'components/GameResultPanel/Styles';
import * as GameSound from 'components/GameSoundToggle/Styles';
import {fonts, pagePadding} from 'styles';
import {HexSide} from 'types/hex';

import {BoardFrame} from './BoardStyles';
import {boardPanel, edgeBands, glassButton, glassStone, hex, HEXAGON, label, lattice, sideAccent} from './theme';

// Wide match pages put the players and the turn in a column beside the board
const wide = '@container hex-match (min-width: 940px)';

// A plain midnight card for the smaller pieces of a match
const card = css`
  background: linear-gradient(165deg, ${hex.navy}, ${hex.midnight} 80%);
  border: 1px solid #ffffff17;
  border-radius: 18px;
  box-shadow:
    0 14px 30px #0b142c1f,
    inset 0 1px 0 #ffffff0d;
  color: ${hex.ice};
  color-scheme: dark;
`;

const dangerButton = css`
  --accent: ${hex.rubyLight};
  --accent-deep: #6e1a13;
  --accent-glow: #e0483c40;
  --button-bottom: #a3291f;
  --button-top: #c93b2f;
`;

const outlineButton = css`
  background: #ffffff0a;
  border: 1px solid #ffffff2e;
  box-shadow: none;
  color: ${hex.ice};
  font-weight: ${fonts.weight.semiBold};
  text-shadow: none;

  &:hover:not(:disabled) {
    background: #ffffff17;
    border-color: #ffffff4d;
    filter: none;
  }

  &:active:not(:disabled) {
    box-shadow: none;
    transform: translateY(1px);
  }

  &:focus-visible {
    outline-color: ${hex.gold};
  }

  &:disabled {
    background: transparent;
    border-color: #ffffff1a;
    box-shadow: none;
    color: #6f7ba3;
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Alert = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #3a1517, #161a33);
  border: 1px solid #e0483c66;
  border-radius: 14px;
  color: #ffd9d3;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 20px 0;
  padding: 14px 18px;
`;

export const AlertNote = styled.p`
  color: #f0b3a9;
  font-size: 12px;
  margin: 2px 0 0;
`;

// The players, the turn, the board and the details of the match. Its buttons take the viewer's color.
export const Arena = styled.div<{$side: HexSide}>`
  ${({$side}) => sideAccent($side)};
  display: flex;
  flex-direction: column;
  gap: 14px;

  ${wide} {
    align-items: start;
    column-gap: 24px;
    display: grid;
    grid-template-areas:
      'result result'
      'main players'
      'main turn'
      'main .';
    grid-template-columns: minmax(0, 1000px) 320px;
    grid-template-rows: auto auto auto 1fr;
    justify-content: center;
    row-gap: 0;
  }
`;

export const Badge = styled.span`
  align-items: center;
  background: #e9ecf6;
  border-radius: 999px;
  color: #3a4775;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  gap: 8px;
  padding: 7px 12px;
`;

// The match's buttons: raised glass in the color of the side around them, `$secondary` as an outline and `$danger`
// in deep ruby
export const Button = styled.button<{$danger?: boolean; $secondary?: boolean}>`
  ${glassButton};
  display: inline-flex;
  font-size: 14px;
  min-height: 46px;
  padding: 0 20px;

  &:disabled {
    background: #1d2a52;
    box-shadow: 0 4px 0 #111b38;
    color: ${hex.haze};
    cursor: default;
    text-shadow: none;
  }

  ${({$danger}) => $danger && dangerButton};
  ${({$secondary}) => $secondary && outlineButton};
`;

export const Container = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1500px;
  padding-bottom: 48px;
  padding-top: 28px;
`;

export const Detail = styled.p`
  color: ${hex.mist};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`;

// The last move, the terms of the match and the resign button; a single strip under the board on wide pages
export const Details = styled.div`
  ${card};
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 18px 18px;

  ${wide} {
    align-items: center;
    column-gap: 20px;
    flex-flow: row wrap;

    /* The terms take a row of their own under the last move and the resign button */
    > ul {
      flex-basis: 100%;
      order: 1;
    }
  }
`;

// A challenge that was never played, beside the empty board it would have been played on
export const Empty = styled.div`
  ${boardPanel};
  align-items: center;
  display: flex;
  gap: 24px;
  padding: 26px 28px;

  p {
    color: ${hex.mist};
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
  }

  a {
    color: ${hex.cobaltLight};
  }

  @media (max-width: 600px) {
    gap: 16px;
    padding: 22px 20px;
  }
`;

// The board of a challenge that was never played, dimmed like the boards in the lobby that are not picked
export const EmptyBoard = styled.div`
  --board-blue: #33477a;
  --board-cells: #8c94b0;
  --board-grout: ${hex.midnight};
  --board-red: #6c3c47;
  flex-shrink: 0;
  width: 132px;

  @media (max-width: 600px) {
    width: 84px;
  }
`;

export const Eyebrow = styled.p`
  ${label};
  color: var(--accent);
  margin: 0 0 6px;
`;

export const GhostButton = styled.button`
  ${label};
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  color: inherit;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #ffffff14;
  }

  &:focus-visible {
    outline: 2px solid ${hex.gold};
    outline-offset: 3px;
  }
`;

export const LastMove = styled.p`
  color: ${hex.mist};
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
`;

// The board, the challenge or the challenge that was never played, with the details of the match under it
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;

  ${wide} {
    grid-area: main;

    ${BoardFrame} {
      max-width: min(100%, calc((100dvh - 170px) * var(--board-aspect) + 36px));
    }
  }
`;

// The match number, after a cell split between the two sides
export const MatchBadge = styled(Badge)`
  &::before {
    background: linear-gradient(135deg, ${hex.ruby} 50%, ${hex.cobalt} 50%);
    clip-path: ${HEXAGON};
    content: '';
    flex-shrink: 0;
    height: 14px;
    width: 12px;
  }
`;

export const MatchContainer = styled(Container)`
  container: hex-match / inline-size;
  padding-top: 16px;
`;

// A player's card. The player to move has theirs lit in their color.
export const MatchPlayer = styled.div<{$active: boolean; $side: HexSide}>`
  ${card};
  ${({$side}) => sideAccent($side)};
  container: hex-player / inline-size;
  min-width: 0;
  overflow: hidden;
  position: relative;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({$active}) =>
    $active &&
    css`
      background:
        radial-gradient(120% 100% at 0% 0%, var(--accent-soft), transparent 65%),
        linear-gradient(165deg, ${hex.navy}, ${hex.midnight} 80%);
      border-color: var(--accent-strong);
      box-shadow:
        0 14px 30px var(--accent-glow),
        inset 0 1px 0 #ffffff14;
    `}
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 24px;
`;

// The sound toggle is drawn as a pill like the match badge next to it
export const MatchNavigation = styled(Navigation)`
  margin-bottom: 14px;

  ${GameSound.Button} {
    background: #e9ecf6;
    border-color: #d5dbef;
    border-radius: 999px;
    color: #3a4775;
    font-size: 12px;
    min-height: 32px;
    padding: 5px 12px;
  }
`;

export const Notes = styled.div`
  display: grid;
  gap: 6px;
`;

export const Pending = styled.section<{$side: HexSide}>`
  ${boardPanel};
  ${({$side}) => sideAccent($side)};
  --panel-glow: ${({$side}) => ($side === 'red' ? '#a640342e' : '#2456b440')};
  container: hex-pending / inline-size;
  padding: 28px;

  @media (max-width: 600px) {
    padding: 22px 18px;
  }
`;

// The board the challenge will be played on
export const PendingBoard = styled.div`
  align-self: center;
  width: 100%;

  @container hex-pending (max-width: 620px) {
    display: none;
  }
`;

export const PendingCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
`;

export const PendingHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const PendingLayout = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: minmax(0, 1fr) minmax(160px, 240px);

  @container hex-pending (max-width: 620px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PlayerBody = styled.div`
  align-items: center;
  column-gap: 12px;
  display: grid;
  grid-template-areas:
    'seal name clock'
    'seal role clock';
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 14px 16px 17px;
  row-gap: 3px;

  @container hex-player (max-width: 250px) {
    grid-template-areas:
      'seal clock'
      'name name'
      'role role';
    grid-template-columns: auto minmax(0, 1fr);
    padding: 12px 12px 15px;
    row-gap: 4px;
  }
`;

export const PlayerName = styled.strong`
  align-self: end;
  color: ${hex.ice};
  font-size: 15px;
  grid-area: name;
  line-height: 1.3;
  overflow-wrap: anywhere;

  @container hex-player (max-width: 250px) {
    font-size: 14px;
    margin-top: 6px;
  }
`;

export const PlayerRole = styled.span<{$active: boolean}>`
  ${label};
  align-self: start;
  color: ${({$active}) => ($active ? 'var(--accent)' : hex.haze)};
  font-size: 10px;
  grid-area: role;
  letter-spacing: 0.08em;

  @container hex-player (max-width: 250px) {
    font-size: 9px;
  }
`;

export const PlayerSeal = styled.span`
  grid-area: seal;
  width: 40px;

  @container hex-player (max-width: 250px) {
    width: 34px;
  }
`;

export const Players = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${wide} {
    gap: 12px;
    grid-area: players;
    grid-template-columns: minmax(0, 1fr);
    margin-bottom: 14px;
  }
`;

// The prize, after a gold cell
export const Prize = styled.strong`
  align-items: center;
  color: ${hex.gold};
  display: flex;
  font-size: 15px;
  gap: 10px;
  line-height: 1.5;

  &::before {
    background: linear-gradient(135deg, #ffe7a3, ${hex.goldDeep});
    clip-path: ${HEXAGON};
    content: '';
    flex-shrink: 0;
    height: 18px;
    width: 16px;
  }
`;

export const Resign = styled.div`
  align-items: flex-start;
  border-top: 1px solid #ffffff14;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;

  ${wide} {
    align-items: center;
    border-top: 0;
    flex-flow: row wrap;
    margin-left: auto;
    padding-top: 0;
  }
`;

export const ResignQuestion = styled.p`
  color: #ffd9d3;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

// The shared result panel on the board's midnight, with the winner's two edges along its border and the board's
// honeycomb in place of its grid
export const Result = styled.div<{$side: HexSide}>`
  ${({$side}) => sideAccent($side)};

  ${wide} {
    grid-area: result;
    margin-bottom: 20px;
  }

  ${GameResult.Panel} {
    background:
      radial-gradient(70% 90% at 100% 0%, var(--accent-glow), transparent 65%),
      linear-gradient(165deg, ${hex.navy}, ${hex.midnight} 80%);
    margin: 0;
  }

  ${GameResult.Panel}::before {
    background: ${({$side}) => edgeBands($side)};
    border-radius: inherit;
    height: auto;
    inset: 0;
    opacity: 0.75;
    pointer-events: none;
  }

  ${GameResult.Panel}::after {
    background-image: ${lattice};
    background-position: right -1px top -1px;
    background-size: auto;
    height: auto;
    inset: 0;
    mask-image: radial-gradient(75% 90% at 100% 0%, #000000, transparent);
    transform: none;
    width: auto;
  }
`;

export const Rules = styled.details`
  ${boardPanel};
  color: ${hex.mist};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 28px;

  summary {
    align-items: center;
    color: ${hex.ice};
    cursor: pointer;
    display: flex;
    font-weight: 600;
    gap: 14px;
    list-style: none;
    min-height: 32px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  /* A cell split between the two sides */
  summary::before {
    background: linear-gradient(135deg, ${hex.ruby} 50%, ${hex.cobalt} 50%);
    clip-path: ${HEXAGON};
    content: '';
    flex-shrink: 0;
    height: 26px;
    width: 23px;
  }

  summary::after {
    border-bottom: 2px solid ${hex.mist};
    border-right: 2px solid ${hex.mist};
    content: '';
    height: 8px;
    margin: -4px 4px 0 auto;
    transform: rotate(45deg);
    transition: transform 0.2s ease;
    width: 8px;
  }

  &[open] summary::after {
    margin-top: 4px;
    transform: rotate(-135deg);
  }

  summary:focus-visible {
    border-radius: 6px;
    outline: 2px solid ${hex.gold};
    outline-offset: 4px;
  }

  ol {
    counter-reset: order;
    display: grid;
    gap: 14px;
    list-style: none;
    margin: 20px 0 8px;
    padding: 0;
  }

  li {
    counter-increment: order;
    display: grid;
    gap: 14px;
    grid-template-columns: 32px minmax(0, 1fr);
    margin: 0;
  }

  /* Numbers on cells that take turns between red and blue, as the players do */
  li::before {
    align-items: center;
    background: #e0483c38;
    clip-path: ${HEXAGON};
    color: ${hex.rubyLight};
    content: counter(order);
    display: flex;
    font-size: 12px;
    font-weight: ${fonts.weight.extraBold};
    height: 30px;
    justify-content: center;
    width: 26px;
  }

  li:nth-child(even)::before {
    background: #2f72da3d;
    color: ${hex.cobaltLight};
  }

  @media (max-width: 600px) {
    padding: 18px 20px;
  }
`;

export const Small = styled.p`
  color: ${hex.mist};
  font-size: 12px;
  line-height: 1.7;
  margin: 0;
`;

export const Stat = styled.div`
  align-items: baseline;
  border-bottom: 1px solid #ffffff14;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  justify-content: space-between;
  padding: 11px 0;

  dt {
    color: ${hex.mist};
    font-size: 13px;
  }

  dd {
    color: ${hex.ice};
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    margin: 0;
  }
`;

export const Stats = styled.dl`
  border-top: 1px solid #ffffff14;
  margin: 0;
`;

export const Status = styled.div`
  align-items: center;
  background: ${hex.midnight};
  border: 1px solid ${hex.line};
  border-radius: 14px;
  color: ${hex.mist};
  display: flex;
  font-size: 14px;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 20px;
`;

// A glass stone of either side, sized for running text
export const Stone = styled.span<{$side: HexSide}>`
  ${({$side}) => sideAccent($side)};
  ${glassStone};
  display: inline-block;
  flex-shrink: 0;
  height: 10px;
  margin-right: 7px;
  vertical-align: -1px;
  width: 10px;
`;

// The swap rule, marked with the gold of the rivalry emblem's arc
export const SwapNote = styled.p`
  align-items: flex-start;
  background: #0b142c99;
  border: 1px solid ${hex.line};
  border-radius: 12px;
  color: ${hex.mist};
  display: flex;
  font-size: 13px;
  gap: 10px;
  line-height: 1.6;
  margin: 0;
  padding: 10px 12px;
  width: 100%;

  svg {
    color: ${hex.gold};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

// The board size, the stake and the prize, each after a cell in the viewer's color
export const Terms = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    align-items: center;
    background: #0b142c99;
    border: 1px solid ${hex.line};
    border-radius: 999px;
    color: ${hex.mist};
    display: inline-flex;
    font-size: 12px;
    font-weight: ${fonts.weight.semiBold};
    gap: 8px;
    line-height: 1.4;
    padding: 6px 12px 6px 10px;
  }

  li::before {
    background: var(--accent-strong);
    clip-path: ${HEXAGON};
    content: '';
    flex-shrink: 0;
    height: 10px;
    width: 9px;
  }
`;

export const TextLink = styled(Link)`
  color: #3f4f8a;
  font-size: 13px;
  font-weight: 600;
`;

// The share of a player's thinking time that is left, along the bottom of their card
export const TimeLeft = styled.span`
  background: #ffffff0f;
  bottom: 0;
  height: 3px;
  left: 0;
  position: absolute;
  right: 0;

  span {
    background: linear-gradient(90deg, var(--accent-deep), var(--accent-strong));
    display: block;
    height: 100%;
    transition: width 0.25s linear;
  }
`;

export const Timer = styled.strong<{$active: boolean}>`
  color: ${({$active}) => ($active ? '#ffffff' : hex.mist)};
  font-size: 26px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  grid-area: clock;
  justify-self: end;
  letter-spacing: -0.02em;
  line-height: 1;

  @container hex-player (max-width: 250px) {
    font-size: 22px;
  }
`;

export const Title = styled.h2`
  color: ${hex.ice};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

// Full width under the turn's text in the side column and on phones
export const TurnActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 550px) {
    width: 100%;

    button {
      flex: 1 1 auto;
    }
  }

  ${wide} {
    width: 100%;

    button {
      flex: 1 1 auto;
    }
  }
`;

// Whose turn it is, in the color of the side to move. On narrow pages it stays in view above the board.
export const TurnBar = styled.div<{$side: HexSide}>`
  ${card};
  ${({$side}) => sideAccent($side)};
  align-items: center;
  background:
    radial-gradient(90% 160% at 0% 0%, var(--accent-soft), transparent 60%),
    linear-gradient(165deg, ${hex.navy}, ${hex.midnight} 80%);
  border-color: var(--accent-glow);
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  padding: 12px 16px 14px;
  position: sticky;
  top: 0;
  z-index: 2;

  @media (max-width: 550px) {
    padding: 10px 12px 12px;
  }

  ${wide} {
    gap: 14px;
    grid-area: turn;
    margin-bottom: 14px;
    padding: 18px 18px 20px;
    position: static;
  }
`;

export const TurnCopy = styled.div`
  display: flex;
  flex: 1 1 180px;
  flex-direction: column;
  gap: 3px;
  min-width: 0;

  strong {
    color: #ffffff;
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  @media (max-width: 550px) {
    strong {
      font-size: 15px;
    }
  }
`;

export const TurnMarker = styled.span`
  align-self: flex-start;
  flex-shrink: 0;
  width: 40px;

  @media (max-width: 550px) {
    width: 34px;
  }
`;

export const TurnText = styled.span`
  color: ${hex.mist};
  font-size: 13px;
  line-height: 1.6;

  @media (max-width: 550px) {
    font-size: 12px;
    line-height: 1.5;
  }
`;
