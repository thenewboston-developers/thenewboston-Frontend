import {Link} from 'react-router-dom';
import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {DoublingCube as UDoublingCube, MiniBoard as UMiniBoard} from '../Emblems';
import {backgammon, boardPanel, caption, checker, FOREST_CHECKER, IVORY_CHECKER, serif} from '../theme';

// Ranks sit on checkers: brass, ivory and coral for the podium, the board's forest green after that
const RANK_CHECKERS: Record<number, {background: string; rim: string; text: string}> = {
  1: {background: 'radial-gradient(circle at 34% 28%, #fbe7b0, #d9ad55 55%, #9c7128)', rim: '#f6dc9a', text: '#3b2a0c'},
  2: {background: IVORY_CHECKER, rim: '#fffaf0', text: '#3d463f'},
  3: {background: 'radial-gradient(circle at 34% 28%, #f0a585, #c4674c 55%, #8c3f29)', rim: '#f3b79c', text: '#fff4ec'},
};

const rankChecker = (rank: number) =>
  RANK_CHECKERS[rank] ?? {background: FOREST_CHECKER, rim: '#6f8f80', text: backgammon.ink};

export const Amount = styled.strong`
  align-items: baseline;
  color: ${backgammon.brassBright};
  display: flex;
  flex-wrap: wrap;
  font-size: 19px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  gap: 2px 6px;
  justify-content: flex-end;
  overflow-wrap: anywhere;

  small {
    ${caption};
    color: ${backgammon.mist};
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Avatar = styled(UAvatar)<{$rank: number}>`
  border-radius: 50%;
  box-shadow:
    0 0 0 2px ${backgammon.feltDeep},
    0 0 0 3px ${({$rank}) => (RANK_CHECKERS[$rank] ? RANK_CHECKERS[$rank].rim : `${backgammon.ivory}59`)};

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

  @media (max-width: 380px) {
    display: none;
  }
`;

export const Board = styled.section`
  ${boardPanel()};
  margin-top: 28px;
  overflow: hidden;

  @media (max-width: 600px) {
    border-width: 8px;
  }
`;

export const Description = styled.p`
  color: ${backgammon.mist};
  font-size: 13.5px;
  line-height: 1.65;
  margin: 6px 0 0;
  max-width: 640px;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  gap: 32px;
  justify-content: center;
  padding: 34px 28px 40px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    padding: 26px 18px 30px;
    text-align: center;
  }
`;

export const EmptyBoard = styled(UMiniBoard)`
  filter: drop-shadow(0 10px 18px #00000059);
  max-width: 230px;
`;

export const EmptyCopy = styled.div`
  max-width: 420px;

  strong {
    ${serif};
    color: ${backgammon.ink};
    display: block;
    font-size: 23px;
    margin-bottom: 6px;
  }

  p {
    color: ${backgammon.mist};
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
  }
`;

export const Eyebrow = styled.p`
  ${caption};
  color: ${backgammon.brassText};
  font-size: 10px;
  letter-spacing: 0.18em;
  margin: 0 0 6px;
`;

export const Footer = styled.div`
  align-items: center;
  background: #00000026;
  border-top: 1px solid ${backgammon.brass}33;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 16px 28px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const Header = styled.header`
  align-items: center;
  border-bottom: 1px solid ${backgammon.brass}33;
  display: flex;
  gap: 20px;
  padding: 26px 28px 24px;

  @media (max-width: 600px) {
    align-items: flex-start;
    gap: 14px;
    padding: 20px 16px 18px;
  }
`;

export const HeaderCube = styled(UDoublingCube)`
  --cube-size: 66px;

  transform: rotate(-6deg);

  @media (max-width: 600px) {
    --cube-size: 50px;
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
  color: ${backgammon.mist};
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
  color: ${backgammon.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  button {
    background: #ffffff0a;
    border-color: ${backgammon.brass}59;
    color: ${backgammon.ink};
  }

  button:hover:not(:disabled) {
    background: #ffffff14;
    border-color: ${backgammon.brassText};
  }

  button:disabled {
    background: transparent;
    color: ${backgammon.mist};
    opacity: 0.45;
  }

  button:focus-visible {
    border-color: ${backgammon.brassText};
    box-shadow: 0 0 0 2px ${backgammon.brassText}66;
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${backgammon.brassBright};
    border-color: ${backgammon.brassBright};
    color: #173b31;
  }

  span {
    color: ${backgammon.mist};
  }
`;

export const Period = styled.span`
  ${caption};
  border: 1px solid ${backgammon.brass}66;
  border-radius: 999px;
  color: ${backgammon.brassBright};
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

export const RankChecker = styled.span<{$rank: number}>`
  ${checker};
  align-items: center;
  background: ${({$rank}) => rankChecker($rank).background};
  box-shadow:
    inset 0 0 0 1px ${({$rank}) => rankChecker($rank).rim},
    0 3px 0 #021512,
    0 6px 12px #00000059;
  color: ${({$rank}) => rankChecker($rank).text};
  display: inline-flex;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  height: 40px;
  justify-content: center;
  min-width: 40px;
  padding: 0 4px;

  @media (max-width: 480px) {
    font-size: 12px;
    height: 32px;
    min-width: 32px;
  }
`;

export const Retry = styled.button`
  ${caption};
  background: transparent;
  border: 1px solid ${backgammon.brass}80;
  border-radius: 999px;
  color: ${backgammon.brassBright};
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #ffffff14;
  }

  &:focus-visible {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 3px;
  }
`;

export const Row = styled.tr<{$rank: number}>`
  background: ${({$rank}) =>
    $rank === 1 ? `linear-gradient(90deg, ${backgammon.brassText}1f, transparent 70%)` : 'transparent'};
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
    ${caption};
    background: #00000033;
    border-bottom: 1px solid ${backgammon.brass}33;
    color: ${backgammon.brassText};
    font-size: 10px;
    padding: 12px 16px;
    text-align: left;
  }

  td {
    border-bottom: 1px solid ${backgammon.ivory}1a;
    padding: 14px 16px;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  th:first-child,
  td:first-child {
    padding-left: 28px;
    width: 96px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 240px;
  }

  th:last-child,
  td:last-child {
    padding-right: 28px;
    text-align: right;
    width: 170px;
  }

  @media (max-width: 640px) {
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }

    th:last-child,
    td:last-child {
      width: 120px;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      padding-left: 10px;
      padding-right: 10px;
    }

    th:first-child,
    td:first-child {
      padding-left: 14px;
      width: 58px;
    }

    th:last-child,
    td:last-child {
      padding-right: 14px;
      width: 100px;
    }
  }
`;

export const Title = styled.h2`
  ${serif};
  color: ${backgammon.ink};
  font-size: clamp(28px, 3vw, 36px);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
`;

export const Username = styled(Link)`
  color: ${backgammon.ink};
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${backgammon.brassBright};
  }

  &:focus-visible {
    border-radius: 3px;
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 2px;
  }
`;

export const Wins = styled.span`
  align-items: center;
  color: ${backgammon.ink};
  display: inline-flex;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  gap: 14px;
`;

// Shown instead of the wins column once the table is too narrow for it
export const WinsNote = styled.span`
  color: ${backgammon.mist};
  display: none;
  font-size: 12px;
  line-height: 1.5;

  @media (max-width: 640px) {
    display: block;
  }
`;

export const WinsPoint = styled.svg`
  display: block;
  filter: drop-shadow(0 2px 3px #00000059);
  flex-shrink: 0;
  height: 32px;
  width: 142px;
`;
