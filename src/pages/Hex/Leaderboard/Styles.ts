import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {boardPanel, glassStone, hex, HEXAGON, label, sideAccent, SQUARE_HEXAGON} from '../theme';

// Gold, silver and bronze cells for the first three ranks: [light, dark, text]
const PODIUM: Record<number, [string, string, string]> = {
  1: ['#ffe48f', hex.goldDeep, '#3b2a06'],
  2: ['#f1f4fa', '#a9b2c6', '#262c3d'],
  3: ['#f6c49c', '#b8733e', '#3a1f0b'],
};

// An empty cell with a fine edge, for ranks past the podium
const RANK_CELL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 38"><polygon points="17,1.5 32.2,10.25 32.2,27.75 17,36.5 1.8,27.75 1.8,10.25" fill="${hex.navy}" stroke="${hex.lineBright}" stroke-width="1.5"/></svg>`;

const isPodium = (rank: number) => rank <= 3;

export const Amount = styled.strong`
  align-items: baseline;
  color: #ffe08a;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  gap: 2px 6px;
  justify-content: flex-end;
  overflow-wrap: anywhere;

  small {
    ${label};
    color: ${hex.mist};
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Avatar = styled(UAvatar)`
  img {
    border-radius: 0;
    clip-path: ${SQUARE_HEXAGON};
  }

  @media (max-width: 480px) {
    img {
      height: 32px;
      width: 32px;
    }
  }
`;

// A hexagon a little larger than the avatar, showing as its rim: the podium color, or a plain edge
export const AvatarFrame = styled.span<{$rank: number}>`
  align-items: center;
  background: ${({$rank}) =>
    isPodium($rank) ? `linear-gradient(180deg, ${PODIUM[$rank][0]}, ${PODIUM[$rank][1]})` : hex.lineBright};
  clip-path: ${SQUARE_HEXAGON};
  display: flex;
  height: 46px;
  justify-content: center;
  width: 46px;

  @media (max-width: 480px) {
    height: 37px;
    width: 37px;
  }
`;

// The username link next to the avatar leads to the same profile, so the avatar stays out of the tab order
export const AvatarLink = styled(Link)`
  display: flex;
  flex-shrink: 0;
`;

export const Board = styled.section`
  ${boardPanel};
  --panel-glow: #ffd6661f;
  margin-top: 28px;
  overflow: hidden;
`;

export const Description = styled.p`
  color: ${hex.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 36px 24px 44px;
  text-align: center;

  strong {
    color: ${hex.ice};
    font-size: 18px;
    margin-top: 6px;
  }

  p {
    color: ${hex.mist};
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
    max-width: 440px;
  }
`;

export const Eyebrow = styled.p`
  ${label};
  color: ${hex.gold};
  margin: 0 0 6px;
`;

export const Footer = styled.div`
  align-items: center;
  background: #0b142c66;
  border-top: 1px solid ${hex.line};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 18px 28px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const Header = styled.header`
  align-items: center;
  border-bottom: 1px solid ${hex.line};
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

export const Identity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const Message = styled.div`
  align-items: center;
  color: ${hex.mist};
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
  color: ${hex.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  button {
    background: ${hex.navy};
    border-color: ${hex.line};
    color: ${hex.ice};
  }

  button:hover:not(:disabled) {
    background: #1a2a52;
    border-color: ${hex.lineBright};
  }

  button:disabled {
    background: transparent;
    color: ${hex.haze};
    opacity: 0.5;
  }

  button:focus-visible {
    border-color: ${hex.gold};
    box-shadow: 0 0 0 2px #ffd66666;
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${hex.gold};
    border-color: ${hex.gold};
    color: #2a1d02;
  }

  span {
    color: ${hex.haze};
  }
`;

export const Period = styled.span`
  ${label};
  border: 1px solid ${hex.lineBright};
  border-radius: 999px;
  color: ${hex.mist};
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

// The rank written on a cell: gold, silver and bronze for the podium, glowing; an empty cell after that
export const Rank = styled.span<{$rank: number}>`
  display: inline-flex;
  filter: ${({$rank}) => (isPodium($rank) ? `drop-shadow(0 0 10px ${PODIUM[$rank][0]}40)` : 'none')};

  span {
    align-items: center;
    display: flex;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.extraBold};
    height: 38px;
    justify-content: center;
    width: 34px;

    ${({$rank}) =>
      isPodium($rank)
        ? css`
            background: linear-gradient(180deg, ${PODIUM[$rank][0]}, ${PODIUM[$rank][1]});
            clip-path: ${HEXAGON};
            color: ${PODIUM[$rank][2]};
          `
        : css`
            background: url('data:image/svg+xml,${encodeURIComponent(RANK_CELL)}') center / contain no-repeat;
            color: ${hex.mist};
          `}
  }

  @media (max-width: 480px) {
    span {
      font-size: 12px;
      height: 32px;
      width: 29px;
    }
  }
`;

export const Retry = styled.button`
  ${label};
  background: transparent;
  border: 1px solid ${hex.lineBright};
  border-radius: 999px;
  color: ${hex.ice};
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

export const Row = styled.tr<{$rank: number}>`
  background: ${({$rank}) => ($rank === 1 ? 'linear-gradient(90deg, #ffd66614, transparent 65%)' : 'transparent')};
  transition: background 0.15s ease;

  &:hover {
    background: #ffffff0a;
  }
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
    ${label};
    background: #0b142c80;
    border-bottom: 1px solid ${hex.line};
    color: ${hex.haze};
    font-size: 10px;
    padding: 12px 16px;
    text-align: left;
  }

  td {
    border-bottom: 1px solid #26355f80;
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

  th:last-child,
  td:last-child {
    padding-right: 28px;
    text-align: right;
    width: 150px;
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 12px 8px;
    }

    th:first-child,
    td:first-child {
      padding-left: 16px;
      width: 56px;
    }

    th:last-child,
    td:last-child {
      padding-right: 16px;
      width: 96px;
    }
  }
`;

export const Title = styled.h2`
  color: ${hex.ice};
  font-size: 26px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.035em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

// The trophy on a gold cell
export const TrophyCell = styled.span`
  align-items: center;
  background: linear-gradient(180deg, #ffe48f, ${hex.goldDeep});
  clip-path: ${HEXAGON};
  color: #3b2a06;
  display: flex;
  flex-shrink: 0;
  height: 58px;
  justify-content: center;
  width: 50px;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const Username = styled(Link)`
  color: ${hex.ice};
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid ${hex.gold};
    outline-offset: 2px;
  }
`;

export const Wins = styled.span`
  align-items: center;
  color: ${hex.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 4px 8px;
`;

export const WinStones = styled.span`
  ${sideAccent('red')};
  display: inline-flex;
  gap: 2px;

  i {
    ${glassStone};
    display: block;
    height: 9px;
    width: 9px;
  }

  /* Phones keep the room for the name and the count */
  @media (max-width: 480px) {
    display: none;
  }
`;
