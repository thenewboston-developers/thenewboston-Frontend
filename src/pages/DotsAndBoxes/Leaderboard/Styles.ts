import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {cornerDots, dots, label, sheet} from '../theme';

// Gold, silver and bronze boxes for the first three ranks: [light, dark, side, text]
const PODIUM: Record<number, [string, string, string, string]> = {
  1: ['#ffe9a6', dots.gold, dots.goldDeep, '#4a3405'],
  2: ['#f6f8fc', '#d3d9e6', '#8a94ae', '#262f4d'],
  3: ['#ffe2cc', '#eaa979', '#a55d2b', '#4a2508'],
};

const isPodium = (rank: number) => rank <= 3;

// A claimed box: the podium colours for the first three ranks, plain paper with pencil sides after that
const rankBox = ($rank: number) =>
  isPodium($rank)
    ? css`
        background: linear-gradient(180deg, ${PODIUM[$rank][0]}, ${PODIUM[$rank][1]});
        border-color: ${PODIUM[$rank][2]};
        color: ${PODIUM[$rank][3]};
      `
    : css`
        background: #ffffff;
        border-color: ${dots.pencil};
        color: ${dots.inkSoft};
      `;

export const Amount = styled.strong`
  align-items: baseline;
  color: ${dots.ink};
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
    color: ${dots.inkSoft};
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Avatar = styled(UAvatar)`
  img {
    border-radius: 0;
    display: block;
  }

  @media (max-width: 480px) {
    img {
      height: 32px;
      width: 32px;
    }
  }
`;

// The avatar sits in a box of its own, drawn in the rank's colour
export const AvatarBox = styled.span<{$rank: number}>`
  ${({$rank}) => cornerDots(isPodium($rank) ? dots.dot : dots.pencilDark, 8, 2)};
  background: #ffffff;
  border: 2px solid ${({$rank}) => (isPodium($rank) ? PODIUM[$rank][2] : dots.pencil)};
  display: flex;
  padding: 2px;
  position: relative;
`;

// The username next to the avatar leads to the same profile, so the avatar stays out of the tab order
export const AvatarLink = styled(Link)`
  display: flex;
  flex-shrink: 0;
`;

export const Board = styled.section`
  ${sheet};
  margin-top: 30px;
`;

export const Description = styled.p`
  color: ${dots.inkSoft};
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 24px 40px;
  text-align: center;

  strong {
    color: ${dots.ink};
    font-size: 18px;
    margin-top: 8px;
  }

  p {
    color: ${dots.inkSoft};
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
    max-width: 440px;
  }
`;

export const Eyebrow = styled.p`
  ${label};
  color: #8a5e00;
  margin: 0 0 6px;
`;

export const Footer = styled.div`
  align-items: center;
  border-top: 2px solid ${dots.pencil};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 16px 28px;

  @media (max-width: 480px) {
    padding: 14px 16px;
  }
`;

export const Header = styled.header`
  align-items: center;
  border-bottom: 2px solid ${dots.pencil};
  display: flex;
  gap: 18px;
  padding: 26px 28px 22px;

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
  gap: 3px;
  min-width: 0;
`;

export const Message = styled.div`
  align-items: center;
  color: ${dots.inkSoft};
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
  color: ${dots.inkSoft};
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
`;

// Page buttons are boxes too; the current page is the claimed one
export const Pagination = styled(UPagination)`
  button {
    background: #ffffff;
    border: 2px solid ${dots.pencil};
    border-radius: 0;
    color: ${dots.ink};
    font-weight: ${fonts.weight.bold};
  }

  button:hover:not(:disabled) {
    background: #ffffff;
    border-color: ${dots.pencilDark};
  }

  button:disabled {
    background: transparent;
    color: ${dots.pencilDark};
    opacity: 0.6;
  }

  button:focus-visible {
    border-color: ${dots.blue};
    box-shadow: none;
    outline: 3px solid ${dots.gold};
    outline-offset: 2px;
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${dots.blueFill};
    border-color: ${dots.blue};
    color: ${dots.ink};
  }

  span {
    color: ${dots.inkSoft};
  }
`;

export const Period = styled.span`
  ${label};
  border: 2px solid ${dots.pencil};
  color: ${dots.inkSoft};
  flex-shrink: 0;
  font-size: 10px;
  margin-left: auto;
  padding: 6px 10px;

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

// The rank written in a claimed box, the way the board writes initials in claimed boxes
export const Rank = styled.span<{$rank: number}>`
  ${({$rank}) => cornerDots(isPodium($rank) ? dots.dot : dots.pencilDark, 8, 2)};
  ${({$rank}) => rankBox($rank)};
  align-items: center;
  border-style: solid;
  border-width: 2px;
  display: inline-flex;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  height: 36px;
  justify-content: center;
  min-width: 36px;
  padding: 0 4px;
  position: relative;

  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    min-width: 30px;
  }
`;

export const Retry = styled.button`
  ${label};
  background: #ffffff;
  border: 2px solid ${dots.ink};
  border-radius: 6px;
  box-shadow: 2px 2px 0 ${dots.ink};
  color: ${dots.ink};
  cursor: pointer;
  padding: 8px 14px;

  &:hover {
    background: ${dots.blueFill};
  }

  &:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: 3px;
  }
`;

export const Row = styled.tr<{$rank: number}>`
  background: ${({$rank}) => ($rank === 1 ? 'linear-gradient(90deg, #fff3c7, transparent 70%)' : 'transparent')};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f3f6ff;
  }
`;

// Rows are separated by a line of dots, like the rows of the board
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
    border-bottom: 2px solid ${dots.pencil};
    color: ${dots.inkSoft};
    font-size: 10px;
    padding: 12px 16px;
    text-align: left;
  }

  td {
    background: radial-gradient(circle, ${dots.pencilDark} 1.2px, transparent 1.7px) left bottom / 12px 5px repeat-x;
    padding: 14px 16px;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    background: none;
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
      width: 58px;
    }

    th:last-child,
    td:last-child {
      padding-right: 16px;
      width: 96px;
    }
  }
`;

export const Title = styled.h2`
  color: ${dots.ink};
  font-size: 26px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.035em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

// The trophy in a gold box with a dot on each corner
export const TrophyBox = styled.span`
  ${cornerDots(dots.dot, 10, 2)};
  align-items: center;
  background: linear-gradient(180deg, ${PODIUM[1][0]}, ${PODIUM[1][1]});
  border: 2px solid ${dots.goldDeep};
  color: #4a3405;
  display: flex;
  flex-shrink: 0;
  height: 54px;
  justify-content: center;
  position: relative;
  width: 54px;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const Username = styled(Link)`
  color: ${dots.ink};
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${dots.blue};
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 3px solid ${dots.gold};
    outline-offset: 2px;
  }
`;

export const WinChain = styled.span`
  display: inline-flex;

  i {
    background: ${dots.blueFill};
    border: 2px solid ${dots.blue};
    display: block;
    height: 11px;
    width: 11px;
  }

  i + i {
    margin-left: -2px;
  }

  /* Phones keep the room for the name and the count */
  @media (max-width: 480px) {
    display: none;
  }
`;

export const Wins = styled.span`
  align-items: center;
  color: ${dots.inkSoft};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 4px 8px;
`;
