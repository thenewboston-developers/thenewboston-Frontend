import {Link} from 'react-router-dom';
import styled from 'styled-components';

import * as ComputerReward from 'components/ComputerRewardNotice/Styles';
import * as GameResult from 'components/GameResultPanel/Styles';
import * as GameSound from 'components/GameSoundToggle/Styles';
import {pagePadding} from 'styles';

import {board, boardPanel, label} from './theme';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: ${board.pale};
  border: 1px solid ${board.paleBorder};
  border-radius: 999px;
  color: ${board.ink};
  display: inline-flex;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 12px;
`;

export const Button = styled.button<{$secondary?: boolean; $danger?: boolean}>`
  align-items: center;
  background: ${({$secondary, $danger}) => {
    if ($secondary) return board.pale;
    return $danger ? '#9a4036' : board.accent;
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? board.paleBorder : 'transparent')};
  border-radius: 12px;
  color: ${({$danger}) => ($danger ? '#ffffff' : board.ink)};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  gap: 8px;
  justify-content: center;
  min-height: 44px;
  padding: 11px 18px;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 3px solid ${board.accentDark};
    outline-offset: 3px;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1500px;
  padding-bottom: 48px;
  padding-top: 28px;
`;

export const Detail = styled.p`
  color: ${board.muted};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`;

export const Empty = styled.div`
  background: ${board.pale};
  border: 1px dashed ${board.paleBorder};
  border-radius: 16px;
  color: ${board.muted};
  line-height: 1.7;
  padding: 24px;
`;

export const Error = styled.div`
  background: #fff1ec;
  border: 1px solid #eac8bb;
  border-radius: 12px;
  color: #813e2c;
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  ${label};
  color: ${board.muted};
  margin: 0 0 12px;
`;

export const Field = styled.label`
  color: ${board.ink};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GuestActions = styled.div`
  margin: 24px 0 8px;
`;

export const Input = styled.input`
  background: ${board.ivoryLight};
  border: 1px solid ${board.paleBorder};
  border-radius: 10px;
  color: ${board.ink};
  font: inherit;
  min-height: 44px;
  padding: 10px 12px;
  width: 100%;
`;

export const LastMove = styled.p`
  color: ${board.mist};
  font-size: 13px;
  line-height: 1.7;
  margin: 16px 0 0;
  text-align: center;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MatchArena = styled.section`
  ${boardPanel};
  align-items: start;
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 310px);
  padding: 28px;

  @media (max-width: 1050px) {
    gap: 20px;
    grid-template-columns: 1fr;
    padding: 20px;
  }

  @media (max-width: 550px) {
    border-radius: 18px;
    gap: 16px;
    padding: 12px;
  }
`;

export const MatchBoard = styled.div`
  grid-column: 1;
  grid-row: 1;
  min-width: 0;

  @media (max-width: 1050px) {
    grid-row: 2;
  }
`;

export const MatchContainer = styled(Container)`
  max-width: 1340px;
  padding-top: 24px;

  @media (max-width: 550px) {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 16px;
  }
`;

export const MatchHeading = styled.div`
  h1 {
    color: ${board.ink};
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 750;
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 8px 0 0;
  }
`;

export const MatchInfo = styled.div`
  align-items: center;
  border-top: 1px solid ${board.line};
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 10px;
  padding-top: 16px;

  span {
    background: ${board.edge};
    border: 1px solid ${board.line};
    border-radius: 8px;
    color: ${board.mist};
    padding: 6px 10px;
  }
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: ${board.ivoryLight};
  border: 1px solid ${board.paleBorder};
  border-radius: 14px;
  color: ${board.ink};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 18px 20px;
  text-decoration: none;

  &:hover {
    background: ${board.pale};
    text-decoration: none;
  }
`;

export const MatchResult = styled.div`
  ${GameResult.Panel} {
    background: linear-gradient(145deg, ${board.forest}, ${board.edge});
    border-color: ${board.line};
    color: ${board.ivoryLight};
    margin: 0 0 24px;
  }

  ${GameResult.Description},
  ${GameResult.Note},
  ${GameResult.Eyebrow} span {
    color: ${board.mist};
  }

  ${GameResult.Title} {
    color: ${board.ivoryLight};
  }

  ${GameResult.Actions} > :first-child {
    background: ${board.accent};
    border-color: ${board.accentLight};
    box-shadow: 0 3px 0 ${board.accentDark};
    color: ${board.ink};
  }

  ${GameResult.Actions} > :first-child::after {
    content: none;
  }

  ${GameResult.Actions} > a,
  ${GameResult.Actions} > button {
    color: ${board.ivoryLight};

    &:focus-visible {
      outline-color: ${board.gold};
    }
  }

  ${GameResult.Actions} > :first-child {
    color: ${board.ink};
  }
`;

export const MatchReward = styled.div<{$paid: boolean}>`
  ${ComputerReward.Notice} {
    background: ${({$paid}) =>
      $paid
        ? `linear-gradient(120deg, ${board.ivoryLight}, #fff3d3)`
        : `linear-gradient(145deg, ${board.forest}, ${board.edge})`};
    border-color: ${({$paid}) => ($paid ? board.gold : board.line)};
    color: ${({$paid}) => ($paid ? board.ink : board.mist)};
  }

  ${ComputerReward.GuestDescription},
  ${ComputerReward.RewardLabel} {
    color: ${board.mist};
  }

  ${ComputerReward.GuestTitle} {
    color: ${board.ivoryLight};
  }

  ${ComputerReward.ArtworkCaption},
  ${ComputerReward.Eyebrow},
  ${ComputerReward.RewardAmount} {
    color: ${board.gold};
  }

  ${ComputerReward.CreateAccount} {
    background: ${board.gold};
    box-shadow: 0 4px 0 #a87b36;
    color: ${board.ink};

    &:focus-visible {
      outline-color: ${board.gold};
    }

    &:hover {
      background: ${board.ivory};
      color: ${board.ink};
    }
  }
`;

export const MatchSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 18px;
  grid-column: 2;
  grid-row: 1;
  min-width: 0;

  @media (max-width: 1050px) {
    grid-column: 1;
  }
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const MatchNavigation = styled(Navigation)`
  align-items: end;
  margin-bottom: 22px;

  ${GameSound.Button} {
    background: ${board.pale};
    border-color: ${board.paleBorder};
    color: ${board.ink};
    min-height: 44px;

    &:focus-visible {
      outline-color: ${board.accentDark};
    }
  }
`;

export const Panel = styled.section`
  background: ${board.ivoryLight};
  border: 1px solid ${board.paleBorder};
  border-radius: 20px;
  color: ${board.ink};
  min-width: 0;
  padding: 24px;
  scroll-margin-top: 24px;
`;

export const PanelGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const PieceMarker = styled.span<{$white: boolean}>`
  background: ${({$white}) => ($white ? board.pieceLight : board.pieceDark)};
  border: 2px solid ${({$white}) => ($white ? '#d9d2b6' : '#a4b793')};
  border-radius: 50%;
  box-shadow: inset 0 0 0 3px ${({$white}) => ($white ? '#c7bea354' : '#a4b79333')};
  flex-shrink: 0;
  height: 34px;
  width: 34px;
`;

export const Player = styled.div<{$active: boolean}>`
  background: ${({$active}) => ($active ? board.forest : board.edge)};
  border: 1px solid ${({$active}) => ($active ? board.accent : board.line)};
  border-radius: 16px;
  color: ${board.ivoryLight};
  padding: 18px;
`;

export const MatchPlayer = styled(Player)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;

  @media (max-width: 550px) {
    gap: 14px;
    padding: 12px;
  }
`;

export const PlayerClock = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
`;

export const PlayerGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const PlayerIdentity = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  min-width: 0;

  div {
    min-width: 0;
  }

  strong {
    display: block;
    font-size: 15px;
    overflow-wrap: anywhere;
  }

  @media (max-width: 400px) {
    align-items: start;
    flex-direction: column;
  }
`;

export const PlayerLabel = styled.p`
  color: ${board.mist};
  font-size: 13px;
  line-height: 1.5;
  margin: 4px 0 0;
`;

export const Rules = styled.details`
  background: ${board.pale};
  border: 1px solid ${board.paleBorder};
  border-radius: 16px;
  color: ${board.muted};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: ${board.ink};
    cursor: pointer;
    font-weight: 600;
  }

  li {
    margin-top: 8px;
  }
`;

export const Section = styled.section`
  margin-top: 28px;
`;

export const Select = styled.select`
  background: ${board.ivoryLight};
  border: 1px solid ${board.paleBorder};
  border-radius: 10px;
  color: ${board.ink};
  font: inherit;
  min-height: 44px;
  padding: 10px 12px;
  width: 100%;
`;

export const Small = styled.p`
  color: ${board.muted};
  font-size: 13px;
  line-height: 1.7;
  margin: 8px 0 0;
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid ${board.paleBorder};
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 14px 0;
`;

export const Status = styled.div`
  align-items: center;
  background: ${board.pale};
  border: 1px solid ${board.paleBorder};
  border-radius: 16px;
  color: ${board.ink};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 20px 0;
  min-height: 80px;
  padding: 18px 22px;
`;

export const MoveToolbar = styled(Status)`
  background: ${board.edge};
  border-color: ${board.line};
  color: ${board.ivoryLight};
  gap: 10px;
  margin: 0 0 18px;
  min-height: 0;
  padding: 16px 18px;

  p {
    color: ${board.mist};
    margin-top: 4px;
  }

  strong {
    color: ${board.accentLight};
  }

  ${Button}:focus-visible {
    outline-color: ${board.gold};
  }

  @media (max-width: 550px) {
    padding: 12px;
  }
`;

export const TextLink = styled(Link)`
  color: ${board.accentDark};
  font-size: 14px;
  font-weight: 600;

  &:focus-visible {
    outline: 2px solid ${board.accentDark};
    outline-offset: 3px;
  }
`;

export const Timer = styled.strong`
  color: ${board.ivoryLight};
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  line-height: 1;
`;

export const TitleSmall = styled.h2`
  color: ${board.ink};
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;

export const TurnBadge = styled.span`
  background: ${board.accent};
  border-radius: 6px;
  color: ${board.ink};
  font-size: 12px;
  font-weight: 700;
  padding: 5px 8px;
`;
