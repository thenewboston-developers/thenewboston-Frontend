import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {naval, navalConsole, navalMono, readout} from '../theme';

const PODIUM: Record<number, string> = {1: naval.gold, 2: naval.silver, 3: naval.bronze};

const rankColor = (rank: number): string => PODIUM[rank] ?? naval.sonar;

const isPodium = (rank: number) => rank <= 3;

export const Amount = styled.strong`
  align-items: baseline;
  color: ${naval.amberLight};
  display: flex;
  flex-wrap: wrap;
  font-family: ${navalMono};
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  gap: 2px 6px;
  justify-content: flex-end;
  overflow-wrap: anywhere;

  small {
    ${readout};
    color: ${naval.mist};
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Avatar = styled(UAvatar)<{$rank: number}>`
  border-radius: 50%;
  box-shadow:
    0 0 0 2px ${naval.deep},
    0 0 0 3px ${({$rank}) => (isPodium($rank) ? `${rankColor($rank)}b3` : naval.steelBright)};
`;

// The username link next to the avatar leads to the same profile, so the avatar stays out of the tab order
export const AvatarLink = styled(Link)`
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
`;

export const Berths = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Board = styled.section`
  ${navalConsole};
  margin-top: 28px;
  overflow: hidden;
`;

export const Commander = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  min-width: 0;
`;

export const Description = styled.p`
  color: ${naval.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px 24px 44px;
  text-align: center;

  strong {
    color: ${naval.ice};
    font-size: 18px;
  }

  p {
    color: ${naval.mist};
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
    max-width: 440px;
  }
`;

export const Escort = styled.span`
  ${readout};
  color: ${naval.fog};
  font-size: 10px;
`;

export const Eyebrow = styled.p`
  ${readout};
  color: ${naval.amberLight};
  margin: 0 0 6px;
`;

export const Footer = styled.div`
  align-items: center;
  background: #06132366;
  border-top: 1px solid ${naval.steel};
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
  border-bottom: 1px solid ${naval.steel};
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

// A ship drawn as grid cells, lit in its commander's rank color or left as an empty dashed berth
export const Hull = styled.span<{$rank?: number}>`
  display: inline-flex;
  gap: 3px;

  i {
    border-radius: 2px;
    display: block;
    height: 10px;
    width: 10px;

    ${({$rank}) =>
      $rank
        ? css`
            background: ${rankColor($rank)};
            box-shadow: 0 0 8px ${`${rankColor($rank)}59`};
          `
        : css`
            border: 1px dashed ${naval.steelBright};
          `}
  }
`;

export const Identity = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Message = styled.div`
  align-items: center;
  color: ${naval.mist};
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
  color: ${naval.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  button {
    background: ${naval.hull};
    border-color: ${naval.steel};
    color: ${naval.ice};
  }

  button:hover:not(:disabled) {
    background: #12304a;
    border-color: ${naval.steelBright};
  }

  button:disabled {
    background: transparent;
    color: ${naval.fog};
    opacity: 0.5;
  }

  button:focus-visible {
    border-color: ${naval.amber};
    box-shadow: 0 0 0 2px #ffad6a66;
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${naval.amber};
    border-color: ${naval.amber};
    color: ${naval.ink};
  }

  span {
    color: ${naval.fog};
  }
`;

export const Period = styled.span`
  ${readout};
  border: 1px solid ${naval.steelBright};
  border-radius: 999px;
  color: ${naval.mist};
  flex-shrink: 0;
  font-size: 10px;
  margin-left: auto;
  padding: 7px 12px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Rank = styled.span<{$rank: number}>`
  ${readout};
  align-items: center;
  background: ${({$rank}) =>
    isPodium($rank) ? `linear-gradient(180deg, ${rankColor($rank)}33, ${rankColor($rank)}0d)` : naval.hull};
  border: 1px solid ${({$rank}) => (isPodium($rank) ? `${rankColor($rank)}99` : naval.steel)};
  border-radius: 8px;
  box-shadow: ${({$rank}) => (isPodium($rank) ? `0 0 16px ${rankColor($rank)}26` : 'none')};
  color: ${({$rank}) => (isPodium($rank) ? rankColor($rank) : naval.mist)};
  display: inline-flex;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  height: 32px;
  justify-content: center;
  letter-spacing: 0.04em;
  min-width: 46px;
  padding: 0 8px;

  @media (max-width: 480px) {
    font-size: 12px;
    min-width: 38px;
    padding: 0 6px;
  }
`;

export const Retry = styled.button`
  ${readout};
  background: transparent;
  border: 1px solid ${naval.steelBright};
  border-radius: 999px;
  color: ${naval.ice};
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #ffffff14;
  }

  &:focus-visible {
    outline: 2px solid ${naval.amberLight};
    outline-offset: 3px;
  }
`;

export const Row = styled.tr<{$rank: number}>`
  background: ${({$rank}) => ($rank === 1 ? 'linear-gradient(90deg, #f6cb6f14, transparent 65%)' : 'transparent')};
  transition: background 0.15s ease;

  &:hover {
    background: ${naval.sonarSoft};
  }
`;

export const Ship = styled.span`
  align-items: center;
  display: inline-flex;
  gap: 10px;

  span:last-child {
    ${readout};
    color: ${naval.mist};
    font-size: 10px;
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
    ${readout};
    background: #06132380;
    border-bottom: 1px solid ${naval.steel};
    color: ${naval.fog};
    font-size: 10px;
    padding: 12px 16px;
    text-align: left;
  }

  td {
    border-bottom: 1px solid #1f3d5680;
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

  th:nth-child(3),
  td:nth-child(3) {
    width: 200px;
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
      width: 64px;
    }

    th:last-child,
    td:last-child {
      padding-right: 16px;
      width: 104px;
    }
  }
`;

export const Title = styled.h2`
  color: ${naval.ice};
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
  color: ${naval.ice};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${naval.amberLight};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${naval.amberLight};
    outline-offset: 2px;
  }
`;

export const Wins = styled.span`
  color: ${naval.mist};
  font-size: 12px;
  line-height: 1.4;
  margin-top: 3px;
`;
