import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {
  carved,
  eyebrow,
  focusRing,
  ghostButton,
  glassStone,
  label,
  mancala,
  STONES,
  StoneTone,
  woodPanel,
} from '../theme';

// The first three ranks hold a glass stone: amber gold, pearl and carnelian
const PODIUM: Record<number, StoneTone> = {1: STONES.amber, 2: STONES.ivory, 3: STONES.coral};

export const Amount = styled.strong`
  ${carved};
  align-items: baseline;
  border-radius: 999px;
  color: ${mancala.amberLight};
  display: inline-flex;
  font-size: 17px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  gap: 6px;
  justify-content: flex-end;
  max-width: 100%;
  padding: 9px 16px;
  white-space: nowrap;

  small {
    ${label};
    color: ${mancala.dust};
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 7px 11px;

    small {
      display: none;
    }
  }
`;

export const Avatar = styled(UAvatar)`
  img {
    border-radius: 50%;
  }

  @media (max-width: 480px) {
    img {
      height: 32px;
      width: 32px;
    }
  }
`;

export const AvatarLink = styled(Link)<{$rank: number}>`
  border-radius: 50%;
  box-shadow:
    0 0 0 2px ${({$rank}) => PODIUM[$rank]?.base ?? '#f3c88f40'},
    0 3px 8px #12080366;
  display: block;
  flex: 0 0 auto;

  @media (max-width: 420px) {
    display: none;
  }
`;

export const Board = styled.section`
  ${woodPanel};
  margin-top: 32px;

  @media (max-width: 600px) {
    border-radius: 24px;
  }
`;

export const Description = styled.p`
  color: ${mancala.sand};
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 44px 24px 40px;
  text-align: center;

  strong {
    color: ${mancala.cream};
    font-size: 17px;
    margin-top: 18px;
  }

  p {
    color: ${mancala.sand};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    max-width: 380px;
  }
`;

export const Eyebrow = styled.p`
  ${eyebrow};
  margin: 0 0 4px;
`;

export const Footer = styled.div`
  align-items: center;
  border-top: 1px solid ${mancala.line};
  display: flex;
  flex-wrap: wrap;
  gap: 14px 18px;
  justify-content: space-between;
  padding: 18px 28px 22px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${mancala.line};
  display: flex;
  gap: 18px;
  padding: 26px 28px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 14px;
    padding: 22px 18px;
  }
`;

export const Heading = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 600px) {
    flex-basis: calc(100% - 74px);
  }
`;

export const Identity = styled.div`
  min-width: 0;
`;

export const Message = styled.div`
  align-items: center;
  color: ${mancala.sand};
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 14px;
  justify-content: center;
  padding: 40px 24px;
`;

export const Note = styled.p`
  color: ${mancala.dust};
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  button {
    background: #24120933;
    border-color: ${mancala.line};
    color: ${mancala.cream};
  }

  button:hover:not(:disabled) {
    background: #ffe7c41a;
    border-color: ${mancala.lineBright};
  }

  button:disabled {
    background: transparent;
    color: ${mancala.dust};
    opacity: 0.5;
  }

  button:focus-visible {
    ${focusRing};
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: linear-gradient(180deg, ${mancala.amberLight}, ${mancala.amber});
    border-color: transparent;
    color: ${mancala.ink};
  }

  span {
    color: ${mancala.dust};
  }
`;

export const Period = styled.span`
  ${label};
  border: 1px solid ${mancala.lineBright};
  border-radius: 999px;
  color: ${mancala.sand};
  flex: 0 0 auto;
  font-size: 10px;
  padding: 7px 12px;

  @media (max-width: 600px) {
    margin-left: 74px;
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

// A carved pit with the rank; the first three hold a glass stone
export const Rank = styled.span<{$rank: number}>`
  ${carved};
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 42px;
  justify-content: center;
  width: 42px;

  span {
    color: ${mancala.cream};
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.extraBold};
  }

  ${({$rank}) =>
    PODIUM[$rank] &&
    css`
      span {
        ${glassStone(PODIUM[$rank])};
        align-items: center;
        color: ${mancala.ink};
        display: flex;
        height: 32px;
        justify-content: center;
        width: 32px;
      }
    `}

  @media (max-width: 480px) {
    height: 36px;
    width: 36px;

    span {
      font-size: 13px;
    }

    ${({$rank}) =>
      PODIUM[$rank] &&
      css`
        span {
          height: 27px;
          width: 27px;
        }
      `}
  }
`;

export const Retry = styled.button`
  ${ghostButton};
  min-height: 38px;
  padding: 0 16px;
`;

export const Row = styled.tr<{$rank: number}>`
  background: ${({$rank}) => ($rank === 1 ? 'linear-gradient(90deg, #f6b14f1f, transparent 70%)' : 'transparent')};
  transition: background 150ms ease;

  &:hover {
    background: ${({$rank}) =>
      $rank === 1
        ? 'linear-gradient(90deg, #f6b14f2e, #ffe7c40a 70%)'
        : 'linear-gradient(90deg, #ffe7c40f, transparent)'};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
    background: #2412092e;
    border-bottom: 1px solid ${mancala.line};
    color: ${mancala.dust};
    font-size: 10px;
    padding: 12px 16px;
    text-align: left;
  }

  td {
    border-bottom: 1px solid #f3c88f1a;
    padding: 14px 16px;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  th:first-child,
  td:first-child {
    padding-left: 28px;
    width: 94px;
  }

  th:last-child,
  td:last-child {
    padding-right: 28px;
    text-align: right;
    width: 190px;
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 12px 8px;
    }

    th:first-child,
    td:first-child {
      padding-left: 16px;
      width: 60px;
    }

    th:last-child,
    td:last-child {
      padding-right: 16px;
      width: 108px;
    }
  }
`;

export const Title = styled.h2`
  color: ${mancala.cream};
  font-size: 26px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

export const Username = styled(Link)`
  color: ${mancala.cream};
  display: block;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${mancala.amberLight};
    text-decoration: none;
  }

  &:focus-visible {
    ${focusRing};
    border-radius: 4px;
  }
`;

export const WinStone = styled.i<{$tone: StoneTone}>`
  ${({$tone}) => glassStone($tone)};
  display: block;
  flex: 0 0 auto;
  height: 8px;
  width: 10px;
`;

// A small store holding one stone per rewarded win, up to six
export const WinStones = styled.span`
  ${carved};
  align-items: center;
  border-radius: 999px;
  display: inline-flex;
  gap: 2px;
  min-height: 15px;
  padding: 3px 5px;

  @media (max-width: 420px) {
    display: none;
  }
`;

export const Wins = styled.span`
  align-items: center;
  color: ${mancala.sand};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 4px 8px;
  margin-top: 4px;
`;
