import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {board, boardPanel, checkerPattern, label} from '../theme';

interface PieceColors {
  edge: string;
  ring: string;
  rim: string;
  text: string;
  top: string;
}

// The top three ranks are crowned kings in gold, silver and bronze; everyone after them is a cobalt checker
const CHECKER: PieceColors = {edge: board.edge, ring: '#3553d6', rim: '#4b67df', text: board.mist, top: '#1b2f8f'};

const KINGS: Record<number, PieceColors> = {
  1: {edge: '#8f6416', ring: '#d6a23a', rim: '#ffe9a8', text: '#3d2a05', top: board.gold},
  2: {edge: '#6f7889', ring: '#b9c1cf', rim: '#ffffff', text: '#272d3b', top: board.silver},
  3: {edge: '#7a4722', ring: '#c58552', rim: '#f6cda9', text: '#3d220e', top: board.bronze},
};

const crown = (color: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 12'%3E%3Cpath d='M2.2 11 .6 2.2 5.7 6 10 .6 14.3 6 19.4 2.2 17.8 11Z' fill='${encodeURIComponent(
    color,
  )}' stroke='%230a1547' stroke-linejoin='round' stroke-width='1.1'/%3E%3C/svg%3E")`;

const isKing = (rank: number) => rank <= 3;

const pieceColors = (rank: number): PieceColors => KINGS[rank] ?? CHECKER;

export const Amount = styled.strong`
  align-items: baseline;
  color: ${board.gold};
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
    color: ${board.mist};
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Avatar = styled(UAvatar)<{$rank: number}>`
  border-radius: 50%;
  box-shadow:
    0 0 0 2px ${board.navy},
    0 0 0 4px ${({$rank}) => (isKing($rank) ? pieceColors($rank).top : board.line)};
`;

// The username link next to the avatar leads to the same profile, so the avatar stays out of the tab order
export const AvatarLink = styled(Link)`
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
`;

export const Board = styled.section`
  ${boardPanel};
  margin-top: 30px;
  overflow: hidden;
`;

export const Description = styled.p`
  color: ${board.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

// The board's edge: two rows of ivory and cobalt squares between the header and the standings
export const Edge = styled.div`
  ${checkerPattern('#fdebcfd9', 20)};
  background-color: ${board.cobalt};
  box-shadow:
    0 -1px 0 ${board.edge},
    0 1px 0 ${board.edge};
  height: 20px;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 36px 24px 44px;
  text-align: center;

  strong {
    color: ${board.ivoryLight};
    font-size: 18px;
    margin-top: 8px;
  }

  p {
    color: ${board.mist};
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
    max-width: 440px;
  }
`;

export const Eyebrow = styled.p`
  ${label};
  color: ${board.gold};
  margin: 0 0 6px;
`;

export const Footer = styled.div`
  align-items: center;
  background: #0a154766;
  border-top: 1px solid ${board.line};
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
  min-width: 0;
`;

export const Message = styled.div`
  align-items: center;
  color: ${board.mist};
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
  color: ${board.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  button {
    background: ${board.navy};
    border-color: ${board.line};
    color: ${board.ivoryLight};
  }

  button:hover:not(:disabled) {
    background: #1b2f8f;
    border-color: #4b67df;
  }

  button:disabled {
    background: transparent;
    color: ${board.haze};
    opacity: 0.5;
  }

  button:focus-visible {
    border-color: ${board.gold};
    box-shadow: 0 0 0 2px #f4c95d66;
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${board.gold};
    border-color: ${board.gold};
    color: ${board.ink};
  }

  span {
    color: ${board.haze};
  }
`;

export const Period = styled.span`
  ${label};
  border: 1px solid #4b67df;
  border-radius: 999px;
  color: ${board.mist};
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
`;

// A checker seen from above with the rank on it; a king is two stacked discs under a crown
export const Rank = styled.span<{$rank: number}>`
  align-items: center;
  background: ${({$rank}) => {
    const {ring, top} = pieceColors($rank);
    return `radial-gradient(circle, ${top} 0 50%, ${ring} 51% 58%, ${top} 59%)`;
  }};
  border: 2px solid ${({$rank}) => pieceColors($rank).rim};
  border-radius: 999px;
  box-shadow: ${({$rank}) => {
    const {edge, top} = pieceColors($rank);
    return isKing($rank) ? `0 3px 0 ${edge}, 0 5px 0 ${top}, 0 8px 0 ${edge}` : `0 3px 0 ${edge}`;
  }};
  color: ${({$rank}) => pieceColors($rank).text};
  display: inline-flex;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  height: 38px;
  justify-content: center;
  letter-spacing: -0.02em;
  min-width: 38px;
  padding: 0 6px;
  position: relative;

  ${({$rank}) =>
    isKing($rank) &&
    css`
      margin-top: 8px;

      &::before {
        background: ${crown(pieceColors($rank).top)} center / contain no-repeat;
        content: '';
        height: 12px;
        left: 50%;
        position: absolute;
        top: -12px;
        transform: translateX(-50%);
        width: 20px;
      }
    `}

  @media (max-width: 480px) {
    font-size: 11px;
    height: 34px;
    min-width: 34px;
  }
`;

export const Retry = styled.button`
  ${label};
  background: transparent;
  border: 1px solid #4b67df;
  border-radius: 999px;
  color: ${board.ivoryLight};
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #ffffff14;
  }

  &:focus-visible {
    outline: 2px solid ${board.gold};
    outline-offset: 3px;
  }
`;

export const Row = styled.tr<{$rank: number}>`
  background: ${({$rank}) => ($rank === 1 ? 'linear-gradient(90deg, #f4c95d1c, transparent 65%)' : 'transparent')};
  transition: background 0.15s ease;

  &:hover {
    background: #2a46c933;
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
    background: #0a154780;
    border-bottom: 1px solid ${board.line};
    color: ${board.haze};
    font-size: 10px;
    padding: 12px 16px;
    text-align: left;
  }

  td {
    border-bottom: 1px solid ${board.lineSoft};
    padding: 14px 16px;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  th:first-child,
  td:first-child {
    padding-left: 28px;
    width: 100px;
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
      width: 66px;
    }

    th:last-child,
    td:last-child {
      padding-right: 16px;
      width: 104px;
    }
  }
`;

export const Title = styled.h2`
  color: ${board.ivoryLight};
  font-size: 26px;
  font-weight: ${fonts.weight.extraBold};
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
  color: ${board.ivoryLight};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${board.gold};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${board.gold};
    outline-offset: 2px;
  }
`;

export const Wins = styled.span`
  color: ${board.mist};
  font-size: 12px;
  line-height: 1.4;
  margin-top: 3px;
`;
