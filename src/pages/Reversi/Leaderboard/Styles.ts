import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {BLACK_DISK, boardPanel, caption, reversi, WHITE_DISK} from '../theme';

import {Holding} from './holdings';

const PODIUM: Record<number, string> = {1: reversi.gold, 2: reversi.silver, 3: reversi.bronze};

const isPodium = (rank: number) => rank <= 3;

const rankColor = (rank: number): string => PODIUM[rank] ?? reversi.mint;

// Corner disks take the rank's color; edge disks are plain ivory
const heldColor = (holding: Holding, rank: number): string => (holding === 'edge' ? reversi.ivory : rankColor(rank));

// Hovering a row turns its rank disk over, from black to ivory
const flipOver = keyframes`
  0% { background: ${BLACK_DISK}; color: var(--rank-color); transform: scaleX(1); }
  49.9% { background: ${BLACK_DISK}; color: var(--rank-color); transform: scaleX(0.06); }
  50% { background: ${WHITE_DISK}; color: #202522; transform: scaleX(0.06); }
  100% { background: ${WHITE_DISK}; color: #202522; transform: scaleX(1); }
`;

export const Amount = styled.strong`
  align-items: baseline;
  color: ${reversi.gold};
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  gap: 2px 6px;
  justify-content: flex-end;
  overflow-wrap: anywhere;

  small {
    ${caption};
    color: ${reversi.mist};
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Avatar = styled(UAvatar)<{$rank: number}>`
  border-radius: 50%;
  box-shadow:
    0 0 0 2px ${reversi.panel},
    0 0 0 3px ${({$rank}) => (isPodium($rank) ? `${rankColor($rank)}b3` : reversi.edgeBright)};

  @media (max-width: 480px) {
    img {
      height: 32px;
      width: 32px;
    }
  }
`;

// The username link next to the avatar leads to the same profile, so the avatar stays out of the tab order
export const AvatarLink = styled(Link)`
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
`;

export const Board = styled.section`
  ${boardPanel};
  margin-top: 28px;
  overflow: hidden;
`;

export const Description = styled.p`
  color: ${reversi.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  gap: 28px;
  justify-content: center;
  padding: 36px 28px 40px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 18px;
    text-align: center;
  }
`;

export const EmptyCopy = styled.div`
  max-width: 420px;

  strong {
    color: ${reversi.text};
    display: block;
    font-size: 18px;
    margin-bottom: 6px;
  }

  p {
    color: ${reversi.mist};
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
  }
`;

export const Eyebrow = styled.p`
  ${caption};
  color: ${reversi.gold};
  margin: 0 0 6px;
`;

export const Footer = styled.div`
  align-items: center;
  background: ${reversi.night}66;
  border-top: 1px solid ${reversi.edge};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 18px 28px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

// A small piece of the board around the square the rank holds
export const Glyph = styled.svg`
  border: 1px solid ${reversi.mint}26;
  border-radius: 5px;
  display: block;
  flex-shrink: 0;
  height: 36px;
  width: 36px;
`;

export const Header = styled.header`
  align-items: center;
  border-bottom: 1px solid ${reversi.edge};
  display: flex;
  gap: 18px;
  padding: 28px 28px 24px;

  @media (max-width: 600px) {
    gap: 14px;
    padding: 22px 18px 20px;
  }
`;

export const Heading = styled.div`
  min-width: 0;
`;

export const HeldDisk = styled.circle<{$holding: Holding; $rank: number}>`
  fill: ${({$holding, $rank}) => heldColor($holding, $rank)};
  filter: drop-shadow(0 0 2px ${({$holding, $rank}) => `${heldColor($holding, $rank)}b3`});
`;

export const Identity = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Message = styled.div`
  align-items: center;
  color: ${reversi.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: center;
  line-height: 1.7;
  padding: 40px 24px;
  text-align: center;
`;

export const Note = styled.p`
  color: ${reversi.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  button {
    background: ${reversi.panel};
    border-color: ${reversi.edge};
    color: ${reversi.text};
  }

  button:hover:not(:disabled) {
    background: ${reversi.feltDark};
    border-color: ${reversi.edgeBright};
  }

  button:disabled {
    background: transparent;
    color: ${reversi.fog};
    opacity: 0.5;
  }

  button:focus-visible {
    border-color: ${reversi.mint};
    box-shadow: 0 0 0 2px ${reversi.mint}66;
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${reversi.mint};
    border-color: ${reversi.mint};
    color: ${reversi.ink};
  }

  span {
    color: ${reversi.fog};
  }
`;

export const Period = styled.span`
  ${caption};
  border: 1px solid ${reversi.edgeBright};
  border-radius: 999px;
  color: ${reversi.mist};
  flex-shrink: 0;
  font-size: 10px;
  margin-left: auto;
  padding: 7px 12px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Player = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  min-width: 0;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

// Ranks sit on black disks; the podium's disks are rimmed in gold, silver and bronze
export const RankDisk = styled.span<{$rank: number}>`
  --rank-color: ${({$rank}) => (isPodium($rank) ? rankColor($rank) : reversi.ivory)};
  align-items: center;
  background: ${BLACK_DISK};
  border-radius: 50%;
  box-shadow: ${({$rank}) =>
    isPodium($rank)
      ? `0 0 0 2px ${rankColor($rank)}, 0 0 16px ${rankColor($rank)}40, 0 4px 10px #00000066`
      : `0 0 0 1px ${reversi.edgeBright}, 0 4px 10px #00000066`};
  color: var(--rank-color);
  display: inline-flex;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  height: 34px;
  justify-content: center;
  min-width: 34px;
  padding: 0 4px;

  tr:hover &,
  tr:focus-within & {
    animation: ${flipOver} 420ms ease-in-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    tr:hover &,
    tr:focus-within & {
      animation: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    min-width: 30px;
  }
`;

export const Retry = styled.button`
  ${caption};
  background: transparent;
  border: 1px solid ${reversi.edgeBright};
  border-radius: 999px;
  color: ${reversi.text};
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #ffffff14;
  }

  &:focus-visible {
    outline: 2px solid ${reversi.mintLight};
    outline-offset: 3px;
  }
`;

export const Row = styled.tr<{$rank: number}>`
  background: ${({$rank}) =>
    $rank === 1 ? `linear-gradient(90deg, ${reversi.gold}14, transparent 65%)` : 'transparent'};
  transition: background 0.15s ease;

  &:hover {
    background: ${reversi.mintSoft};
  }
`;

export const SquareLabel = styled.span`
  align-items: center;
  display: inline-flex;
  gap: 12px;

  span {
    ${caption};
    color: ${reversi.mist};
    font-size: 10px;
  }
`;

export const StartDisk = styled.circle<{$side: 'black' | 'white'}>`
  fill: ${({$side}) => ($side === 'black' ? '#202522' : reversi.ivory)};
  stroke: ${({$side}) => ($side === 'black' ? '#b4cbbc73' : 'none')};
  stroke-width: 0.9;
`;

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;

  caption {
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  th {
    ${caption};
    background: ${reversi.night}80;
    border-bottom: 1px solid ${reversi.edge};
    color: ${reversi.fog};
    font-size: 10px;
    padding: 12px 16px;
    text-align: left;
  }

  td {
    border-bottom: 1px solid ${reversi.edge}80;
    padding: 14px 16px;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  th:first-child,
  td:first-child {
    padding-left: 28px;
    width: 92px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 190px;
  }

  th:last-child,
  td:last-child {
    padding-right: 28px;
    text-align: right;
    width: 150px;
  }

  @media (max-width: 760px) {
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 12px 8px;
    }

    th:first-child,
    td:first-child {
      padding-left: 16px;
      width: 62px;
    }

    th:last-child,
    td:last-child {
      padding-right: 16px;
      width: 104px;
    }
  }
`;

export const Title = styled.h2`
  color: ${reversi.text};
  font-size: 26px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.035em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const Username = styled(Link)`
  align-self: flex-start;
  border-radius: 4px;
  color: ${reversi.text};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${reversi.mint};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${reversi.mintLight};
    outline-offset: 2px;
  }
`;

export const Wins = styled.span`
  color: ${reversi.mist};
  font-size: 12px;
  line-height: 1.4;
  margin-top: 3px;
`;
