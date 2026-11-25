import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import * as ComputerReward from 'components/ComputerRewardNotice/Styles';
import * as GameResult from 'components/GameResultPanel/Styles';
import * as GameSound from 'components/GameSoundToggle/Styles';
import {fonts, pagePadding} from 'styles';
import {BackgammonSide} from 'types/backgammon';
import {ComputerReward as ComputerRewardData} from 'types/gameFund';

import * as DiceStyles from './Dice/Styles';
import {DoublingCube as UDoublingCube} from './Emblems';
import {backgammon, boardPanel, brassButton, caption, checker, FOREST_CHECKER, IVORY_CHECKER, serif} from './theme';

const clockTick = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const turnPulse = keyframes`
  0% { box-shadow: 0 0 0 0 #f2d9a799; }
  100% { box-shadow: 0 0 0 10px #f2d9a700; }
`;

const visuallyHidden = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

// Board and sidebar side by side once there is room for both, a single column otherwise
export const Arena = styled.div`
  container: backgammon-match / inline-size;
  margin-top: 24px;
`;

export const Badge = styled.span`
  --die-size: 16px;

  align-items: center;
  background: ${backgammon.feltDeep};
  border: 1px solid ${backgammon.brass}66;
  border-radius: 999px;
  color: ${backgammon.brassBright};
  display: inline-flex;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  padding: 6px 13px 6px 7px;
`;

// The dice are rolled into the middle of the roller's half of the board, between the two rows of points, with the
// caption on the outside
export const BoardDice = styled.div`
  --die-size: clamp(18px, 4.6cqw, 46px);

  align-items: center;
  display: flex;
  height: 9.7%;
  justify-content: center;
  left: 47.2%;
  pointer-events: none;
  position: absolute;
  top: 45.15%;
  width: 39.3%;

  ${DiceStyles.Group} {
    flex-direction: row-reverse;
  }

  &[data-side='left'] {
    left: 2.8%;
  }

  &[data-side='left'] ${DiceStyles.Group} {
    flex-direction: row;
  }

  @container backgammon-board (max-width: 560px) {
    ${DiceStyles.Caption} {
      ${visuallyHidden};
    }
  }
`;

export const BoardFrame = styled.div`
  border-radius: 2.4% / 3.75%;
  box-shadow:
    0 3px 0 #1b0e06,
    0 22px 44px #1d0f0647;
  container: backgammon-board / inline-size;
  position: relative;
`;

export const Busy = styled.span`
  color: ${backgammon.brassText};
  font-size: 13px;
  font-style: italic;
`;

export const Button = styled.button<{$danger?: boolean; $secondary?: boolean}>`
  ${brassButton};
  display: inline-flex;
  font-size: 14px;
  min-height: 44px;
  padding: 0 18px;

  ${({$secondary}) =>
    $secondary &&
    css`
      background: #ffffff0a;
      border-color: ${backgammon.ivory}80;
      box-shadow: none;
      color: ${backgammon.ink};

      &:hover:not(:disabled) {
        background: #ffffff1a;
      }

      &:active:not(:disabled) {
        box-shadow: none;
        transform: translateY(1px);
      }
    `}

  ${({$danger}) =>
    $danger &&
    css`
      background: linear-gradient(180deg, #b4654b, #8e4632);
      border-color: #d38e74;
      box-shadow:
        0 3px 0 #5e2a1c,
        0 10px 20px #0000004d;
      color: #fff8f0;

      &:hover:not(:disabled) {
        background: linear-gradient(180deg, #c07055, #9a4e38);
      }

      &:active:not(:disabled) {
        box-shadow:
          0 1px 0 #5e2a1c,
          0 4px 10px #0000004d;
      }
    `}

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }
`;

export const Clock = styled.span<{$low: boolean; $running: boolean}>`
  align-items: center;
  color: ${backgammon.mist};
  display: inline-flex;
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  gap: 6px;
  margin-top: 3px;
  white-space: nowrap;

  &::before {
    background: ${({$running}) => ($running ? backgammon.brassBright : `${backgammon.mist}4d`)};
    border-radius: 50%;
    content: '';
    flex-shrink: 0;
    height: 6px;
    width: 6px;
  }

  strong {
    color: ${({$low}) => ($low ? '#ffb49a' : backgammon.ink)};
    font-weight: ${fonts.weight.semiBold};
  }

  ${({$running}) =>
    $running &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        &::before {
          animation: ${clockTick} 1s ease-in-out infinite;
        }
      }
    `}
`;

export const Container = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1500px;
  padding-bottom: 48px;
  padding-top: 28px;
`;

export const CubeRow = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;

  strong {
    color: ${backgammon.ink};
    display: block;
    font-size: 15px;
    font-weight: ${fonts.weight.semiBold};
  }

  span {
    color: ${backgammon.mist};
    display: block;
    font-size: 13px;
    overflow-wrap: anywhere;
  }
`;

export const Detail = styled.p`
  color: ${backgammon.mist};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const Error = styled.div`
  align-items: center;
  background: #fbefe8;
  border: 1px solid #e3bfae;
  border-left: 4px solid ${backgammon.coral};
  border-radius: 10px;
  color: #7a3a26;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  ${caption};
  color: ${backgammon.brassText};
  font-size: 10px;
  letter-spacing: 0.18em;
  margin: 0 0 8px;
`;

export const Fact = styled.span<{$accent?: boolean}>`
  ${caption};
  align-items: center;
  background: ${({$accent}) => ($accent ? '#f6e8c8' : '#ffffffb3')};
  border: 1px solid ${({$accent}) => ($accent ? '#d9b97a' : '#d8cdb6')};
  border-radius: 999px;
  color: ${({$accent}) => ($accent ? '#6b4b16' : '#5a4632')};
  display: inline-flex;
  font-size: 10px;
  letter-spacing: 0.12em;
  padding: 5px 11px;
`;

export const Facts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

export const GuestActions = styled.div`
  button {
    border-radius: 8px;
    min-height: 44px;
  }

  button:first-child {
    background: transparent;
    border: 1px solid ${backgammon.ivory}80;
    color: ${backgammon.ink};

    &:hover {
      background: #ffffff12;
    }
  }

  button:last-child {
    background: linear-gradient(180deg, #f8e6bd, #e8c98a);
    border: 1px solid #fff0c9;
    box-shadow: 0 2px 0 ${backgammon.brassDeep};
    color: #173b31;

    &:hover {
      background: linear-gradient(180deg, #fff1d1, #efd59f);
    }
  }

  button:focus-visible {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 3px;
  }
`;

export const MatchGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr);

  @container backgammon-match (min-width: 980px) {
    grid-template-columns: minmax(0, 1fr) 300px;
  }
`;

export const MatchTitle = styled.h1`
  ${serif};
  align-items: center;
  color: #24170e;
  display: flex;
  flex-wrap: wrap;
  font-size: clamp(28px, 3.4vw, 40px);
  gap: 4px 14px;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
  overflow-wrap: anywhere;
`;

export const MoveButton = styled(Button)`
  border-radius: 999px;
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  min-height: 34px;
  padding: 0 14px;
`;

export const MoveList = styled.details`
  border-top: 1px solid ${backgammon.brass}33;
  margin-top: 14px;
  padding-top: 12px;

  summary {
    ${caption};
    color: ${backgammon.brassText};
    cursor: pointer;
    font-size: 10px;
    letter-spacing: 0.16em;
    margin-bottom: 10px;
    width: fit-content;

    &:focus-visible {
      border-radius: 4px;
      outline: 2px solid ${backgammon.brassBright};
      outline-offset: 4px;
    }
  }
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Panel = styled.section`
  ${boardPanel()};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px 24px 24px;

  @media (max-width: 600px) {
    border-width: 8px;
    padding: 18px 16px 20px;
  }
`;

export const PanelCube = styled(UDoublingCube)`
  --cube-size: 64px;

  margin: -8px 0 -10px;
  transform: rotate(-7deg);
`;

export const PanelHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const PanelLink = styled(Link)`
  color: ${backgammon.brassBright};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  width: fit-content;

  &:hover {
    color: #fff1d1;
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 3px;
  }
`;

export const Pill = styled.span`
  ${caption};
  border: 1px solid ${backgammon.brass}59;
  border-radius: 999px;
  color: ${backgammon.brassBright};
  font-size: 9.5px;
  padding: 4px 10px;
  white-space: nowrap;
`;

// A small walnut and felt panel for the sidebar and short notices
export const Plaque = styled.section`
  ${boardPanel({frame: 8, points: false})};
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 18px 20px;
`;

export const PlaqueHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;

  ${Eyebrow} {
    margin: 0;
  }
`;

export const Player = styled.div<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) =>
    $active ? `linear-gradient(180deg, ${backgammon.brassText}29, ${backgammon.brassText}0d)` : '#ffffff08'};
  border: 1px solid ${({$active}) => ($active ? backgammon.brassText : `${backgammon.ivory}26`)};
  border-radius: 10px;
  box-shadow: ${({$active}) => ($active ? `inset 0 0 0 1px ${backgammon.brassText}66` : 'none')};
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 12px 14px;
`;

export const PlayerChecker = styled.span<{$side: BackgammonSide}>`
  ${checker};
  background: ${({$side}) => ($side === 'white' ? IVORY_CHECKER : FOREST_CHECKER)};
  box-shadow:
    inset 0 0 0 1px ${({$side}) => ($side === 'white' ? '#bfae86' : '#8fb0a1')},
    0 2px 4px #00000059;
  color: ${({$side}) => ($side === 'white' ? '#9c8a5f' : '#9fc0b1')};
  height: 30px;
  width: 30px;
`;

export const PlayerIdentity = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  min-width: 0;
`;

export const PlayerName = styled.strong`
  color: ${backgammon.ink};
  display: block;
  font-size: 15px;
  overflow-wrap: anywhere;

  span {
    color: ${backgammon.brassText};
    font-size: 12px;
    font-weight: ${fonts.weight.semiBold};
  }
`;

export const Players = styled.div`
  display: grid;
  gap: 10px;
`;

export const Preview = styled.p`
  color: ${backgammon.mist};
  font-size: 12.5px;
  line-height: 1.6;
  margin: 12px 0 0;

  strong {
    color: ${backgammon.brassBright};
    font-variant-numeric: tabular-nums;
  }
`;

// The shared result panel, laid on the same walnut and felt as the board
export const Result = styled.div`
  ${GameResult.Panel} {
    ${boardPanel({frame: 10})};
    margin: 18px 0 0;
  }

  ${GameResult.Panel}::before {
    background: linear-gradient(90deg, transparent, ${backgammon.brassBright}8c, transparent);
  }

  ${GameResult.Panel}::after {
    content: none;
  }

  ${GameResult.Eyebrow} {
    color: ${backgammon.brassText};
  }

  ${GameResult.Eyebrow} span {
    color: ${backgammon.mist};
  }

  ${GameResult.Eyebrow} strong {
    background: #00000033;
    border-color: ${backgammon.brass}80;
    color: ${backgammon.brassBright};
  }

  [data-outcome='win'] ${GameResult.Eyebrow} strong {
    background: linear-gradient(180deg, #f8e6bd, #e8c98a);
    border-color: #fff0c9;
    color: #173b31;
  }

  ${GameResult.Title} {
    ${serif};
    color: ${backgammon.ink};
    letter-spacing: -0.02em;
  }

  ${GameResult.Description}, ${GameResult.Note} {
    color: ${backgammon.mist};
  }

  ${GameResult.Content} {
    border-top-color: ${backgammon.brass}40;
  }

  ${GameResult.Content}:empty {
    display: none;
  }

  ${GameResult.Content} > strong {
    color: ${backgammon.brassBright};
  }

  ${GameResult.ScoreLabel} {
    color: ${backgammon.brassText};

    &::before,
    &::after {
      background: ${backgammon.brass}40;
    }
  }

  ${GameResult.ScorePlayer} {
    background: #00000026;
    border-color: ${backgammon.ivory}2e;
    border-radius: 12px;
    color: ${backgammon.ink};

    &::before {
      content: none;
    }
  }

  ${GameResult.ScorePlayer}:has(${GameResult.WinnerBadge}) {
    background: linear-gradient(180deg, ${backgammon.brassText}29, ${backgammon.brassText}0d);
    border-color: ${backgammon.brassText};
    box-shadow: inset 0 0 0 1px ${backgammon.brassText}66;
    color: ${backgammon.brassBright};
  }

  ${GameResult.ScoreName} {
    color: ${backgammon.ink};
  }

  ${GameResult.PlayerMarker} {
    ${checker};
    background: ${IVORY_CHECKER};
    box-shadow: inset 0 0 0 1px #bfae86;
    color: #9c8a5f;
    height: 16px;
    transform: none;
    width: 16px;
  }

  ${GameResult.ScorePlayer} + ${GameResult.ScorePlayer} ${GameResult.PlayerMarker} {
    background: ${FOREST_CHECKER};
    box-shadow: inset 0 0 0 1px #8fb0a1;
    color: #9fc0b1;
  }

  ${GameResult.ScoreValue} {
    text-shadow: 0 2px 0 #00000059;
  }

  ${GameResult.ScoreVersus} {
    ${serif};
    background: ${backgammon.walnut};
    border-color: ${backgammon.brass}99;
    box-shadow: 0 0 0 6px ${backgammon.feltDeep};
    color: ${backgammon.brassBright};
    font-style: italic;
    text-transform: none;
  }

  ${GameResult.ScoreTrack} {
    background: linear-gradient(90deg, #2a4c41, #5f8071);
  }

  ${GameResult.ScoreShare} {
    background: linear-gradient(90deg, #cdbf9c, #fffaf0);
    box-shadow: 2px 0 8px #fffaf066;
  }

  ${GameResult.WinnerBadge} {
    background: linear-gradient(180deg, #f8e6bd, #e8c98a);
    border: 0;
    color: #173b31;
  }

  ${GameResult.Actions} > a,
  ${GameResult.Actions} > button {
    background: #ffffff0a;
    border: 1px solid ${backgammon.ivory}80;
    border-radius: 8px;
    color: ${backgammon.ink};
    min-height: 46px;

    &:focus-visible {
      outline-color: ${backgammon.brassBright};
    }
  }

  ${GameResult.Actions} > a:first-child,
  ${GameResult.Actions} > button:first-child {
    ${brassButton};
  }
`;

// Reward notices inside the result panel: the guest invitation joins the walnut and brass, the paid receipt keeps its
// own gold, and the plain notes become quiet lines on the felt
export const Reward = styled.div<{$status: ComputerRewardData['status']}>`
  ${({$status}) =>
    ($status === 'fund_empty' || $status === 'not_eligible') &&
    css`
      ${ComputerReward.Notice} {
        background: #00000026;
        border: 1px solid ${backgammon.ivory}26;
        border-left: 3px solid ${backgammon.brassText};
        border-radius: 8px;
        color: ${backgammon.mist};
      }

      ${ComputerReward.RewardLabel} {
        color: ${backgammon.ink};
      }
    `}

  ${({$status}) =>
    $status === 'guest' &&
    css`
      ${ComputerReward.Notice} {
        background:
          radial-gradient(ellipse at 88% 30%, #0d5a4f99, transparent 60%),
          linear-gradient(120deg, ${backgammon.walnutDeep}, #3a2213);
        border: 1px solid ${backgammon.brass}80;
        border-radius: 14px;
        color: ${backgammon.ink};
      }

      ${ComputerReward.ArtworkCaption}, ${ComputerReward.Eyebrow} {
        color: ${backgammon.brassText};
      }

      ${ComputerReward.GuestDescription} {
        color: ${backgammon.mist};
      }

      ${ComputerReward.GuestTitle} {
        ${serif};
        color: ${backgammon.ink};
      }

      ${ComputerReward.RewardAmount} {
        color: ${backgammon.brassBright};
      }
    `}

  ${({$status}) =>
    $status === 'paid' &&
    css`
      ${ComputerReward.Notice} {
        border-radius: 14px;
      }
    `}

  ${ComputerReward.CreateAccount} {
    ${brassButton};
    text-decoration: none;

    &:hover {
      color: #173b31;
      text-decoration: none;
    }
  }
`;

export const Rules = styled.details`
  ${boardPanel({frame: 8, points: false})};
  color: ${backgammon.mist};
  line-height: 1.75;
  margin-top: 28px;
  padding: 18px 24px;

  summary {
    ${serif};
    align-items: center;
    color: ${backgammon.ink};
    cursor: pointer;
    display: flex;
    font-size: 21px;
    gap: 12px;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      border-bottom: 2px solid ${backgammon.brassText};
      border-right: 2px solid ${backgammon.brassText};
      content: '';
      height: 9px;
      margin: 0 6px 4px auto;
      transform: rotate(45deg);
      transition: transform 0.2s ease;
      width: 9px;
    }

    &:focus-visible {
      border-radius: 4px;
      outline: 2px solid ${backgammon.brassBright};
      outline-offset: 6px;
    }
  }

  &[open] summary::after {
    margin-bottom: -4px;
    transform: rotate(-135deg);
  }

  ol {
    margin: 18px 0 16px;
    padding-left: 22px;
  }

  li {
    margin-top: 10px;
  }

  li::marker {
    color: ${backgammon.brassText};
    font-weight: ${fonts.weight.bold};
  }

  p:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${backgammon.ink};
  }

  @media (max-width: 600px) {
    border-width: 6px;
    padding: 16px 16px 18px;
  }
`;

export const Score = styled.strong`
  color: ${backgammon.ink};
  font-size: 32px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  line-height: 1;
  text-shadow: 0 2px 0 #00000059;
  white-space: nowrap;
`;

export const Sidebar = styled.aside`
  display: grid;
  gap: 18px;

  @container backgammon-match (min-width: 640px) and (max-width: 979px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Small = styled.p`
  color: ${backgammon.mist};
  font-size: 12.5px;
  line-height: 1.5;
  margin: 5px 0 0;
`;

export const Stat = styled.div`
  align-items: baseline;
  border-bottom: 1px dashed ${backgammon.brass}40;
  display: flex;
  font-size: 14px;
  gap: 12px;
  justify-content: space-between;
  line-height: 1.5;
  padding: 9px 0;

  span {
    color: ${backgammon.mist};
  }

  strong {
    color: ${backgammon.ink};
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.semiBold};
    text-align: right;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Status = styled.div`
  ${boardPanel({frame: 6, points: false})};
  align-items: center;
  color: ${backgammon.mist};
  display: flex;
  font-size: 14px;
  gap: 14px;
  margin-top: 24px;
  padding: 14px 18px;
`;

export const TableCube = styled(UDoublingCube)`
  --cube-size: 56px;

  margin: -6px -2px -8px -4px;
  transform: rotate(-6deg);
`;

export const TextLink = styled(Link)`
  color: #305a40;
  font-size: 13px;
  font-weight: 600;
`;

export const TitleChecker = styled(PlayerChecker)`
  height: 0.7em;
  width: 0.7em;
`;

export const TitlePlayer = styled.span`
  align-items: center;
  display: inline-flex;
  gap: 12px;
  min-width: 0;
`;

export const TitleSmall = styled.h2`
  ${serif};
  color: ${backgammon.ink};
  font-size: 26px;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
`;

export const Toolbar = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  ${GameSound.Button} {
    background: ${backgammon.feltDeep};
    border: 1px solid ${backgammon.brass}66;
    border-radius: 999px;
    color: ${backgammon.brassBright};
    font-size: 12px;
    min-height: 34px;
    padding: 6px 13px 6px 10px;

    &:hover {
      filter: brightness(1.2);
    }

    &:focus-visible {
      outline: 2px solid ${backgammon.brass};
      outline-offset: 3px;
    }
  }

  ${GameSound.Button}[aria-pressed='true'] {
    background: linear-gradient(180deg, #f8e6bd, #e8c98a);
    border-color: #fff0c9;
    color: #173b31;
  }
`;

export const TurnBar = styled.div`
  ${boardPanel({frame: 6, points: false})};
  margin-top: 14px;
  padding: 14px 18px 16px;
`;

export const TurnChecker = styled(PlayerChecker)<{$yours: boolean}>`
  height: 36px;
  width: 36px;

  ${({$yours}) =>
    $yours &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${turnPulse} 1.6s ease-out infinite;
      }
    `}
`;

export const TurnHeader = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 14px 18px;
  justify-content: space-between;
`;

export const TurnText = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 260px;
  gap: 14px;
  min-width: 0;

  strong {
    ${serif};
    color: ${backgammon.ink};
    display: block;
    font-size: 21px;
    line-height: 1.2;
  }
`;

export const Versus = styled.span`
  color: #8a7660;
  font-size: 0.55em;
  font-style: italic;
`;

export const Watching = styled(Status)`
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;
