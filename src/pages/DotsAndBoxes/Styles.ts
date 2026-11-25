import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import * as ComputerReward from 'components/ComputerRewardNotice/Styles';
import * as GameResult from 'components/GameResultPanel/Styles';
import * as GameSound from 'components/GameSoundToggle/Styles';
import {fonts, pagePadding} from 'styles';
import {DotsAndBoxesSide} from 'types/dotsAndBoxes';
import {ComputerReward as ComputerRewardData} from 'types/gameFund';

import {BoardFrame} from './BoardStyles';
import {
  cornerDots,
  dotGrid,
  dots,
  dottedLeader,
  ghostButton,
  inkButton,
  label,
  pencilSketch,
  sheet,
  sideColors,
} from './theme';

// Wide match pages put the scorecard, the turn and the resign button in a column beside the board
const wide = '@container dots-match (min-width: 900px)';

const SIDE_FILLS: Record<DotsAndBoxesSide, string> = {blue: dots.blueFill, red: dots.redFill};

// A line drawn between two dots in a player's colour
const lineMark = (color: string) => css`
  background:
    radial-gradient(circle closest-side, ${dots.dot} 86%, transparent) left center / 7px 7px no-repeat,
    radial-gradient(circle closest-side, ${dots.dot} 86%, transparent) right center / 7px 7px no-repeat,
    linear-gradient(${color}, ${color}) center / calc(100% - 6px) 4px no-repeat;
  flex-shrink: 0;
  height: 7px;
  width: 26px;
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 14px;
`;

export const Alert = styled.div`
  align-items: center;
  background: #fff3f0;
  border: 2px solid #ecaa9c;
  border-radius: 4px;
  color: #872d1e;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 18px 0;
  padding: 12px 16px;

  p {
    color: inherit;
    margin: 2px 0 0;
  }
`;

// Narrow pages stack everything in reading order, and the turn bar stays at the top of the screen over the board
export const Arena = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  ${wide} {
    align-items: start;
    column-gap: 28px;
    display: grid;
    grid-template-areas:
      'result result'
      'stage scorecard'
      'stage status'
      'stage last'
      'stage resign'
      'stage .';
    grid-template-columns: minmax(0, 680px) 320px;
    grid-template-rows: auto auto auto auto auto 1fr;
    justify-content: center;
    row-gap: 0;

    ${BoardFrame} {
      grid-area: stage;
      margin-right: 0;
      max-width: min(680px, calc(100dvh - 190px));
    }
  }
`;

export const Badge = styled.span`
  background: #e6ecfb;
  border-radius: 999px;
  color: #2f4585;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 12px;
`;

// The ink button of the lobby; `$secondary` draws it white and `$danger` in red
export const Button = styled.button<{$danger?: boolean; $secondary?: boolean}>`
  ${inkButton};
  ${({$secondary}) => $secondary && ghostButton};
  ${({$danger}) =>
    $danger &&
    css`
      background: ${dots.red};
      border-color: #872d1e;
      box-shadow: 3px 3px 0 #872d1e;

      &:hover:not(:disabled) {
        box-shadow: 5px 5px 0 #872d1e;
      }

      &:active:not(:disabled) {
        box-shadow: 1px 1px 0 #872d1e;
      }
    `}
`;

// The time left on a player's clock, after a row of dots
export const Clock = styled.div`
  ${dottedLeader};
  flex-direction: row-reverse;
  grid-area: clock;
  min-width: 0;

  &::after {
    min-width: 12px;
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
  color: ${dots.inkSoft};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`;

// A finished invitation: an empty board sketched in pencil, the way the lobby shows a clear board
export const Empty = styled.div`
  ${cornerDots(dots.pencilDark, 10, 2)};
  align-items: center;
  background: ${dotGrid('#1738781f', 20)}, ${dots.paper};
  border: 2px dashed ${dots.pencilDark};
  color: ${dots.inkSoft};
  display: flex;
  font-size: 14px;
  gap: 18px;
  line-height: 1.7;
  padding: 18px 22px;
  position: relative;

  p {
    margin: 0;
  }

  ${wide} {
    grid-area: stage;
  }
`;

export const EmptyBoard = styled.span`
  ${pencilSketch};
  flex-shrink: 0;
  height: 60px;
  width: 60px;
`;

export const Eyebrow = styled.p<{$side: DotsAndBoxesSide}>`
  ${label};
  color: ${({$side}) => sideColors[$side].ink};
  margin: 0 0 4px;
`;

export const GhostButton = styled.button`
  align-items: center;
  background: #ffffff;
  border: 2px solid ${dots.ink};
  border-radius: 6px;
  box-shadow: 2px 2px 0 ${dots.ink};
  color: ${dots.ink};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.bold};
  min-height: 38px;
  padding: 0 14px;

  &:hover {
    background: ${dots.blueFill};
  }

  &:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: 3px;
  }
`;

// The last line drawn, after a short stroke in the colour of the player who drew it
export const LastLine = styled.p<{$side: DotsAndBoxesSide}>`
  align-items: center;
  color: ${dots.inkSoft};
  display: flex;
  font-size: 13px;
  gap: 10px;
  justify-content: center;
  line-height: 1.5;
  margin: 0;
  text-align: center;

  &::before {
    ${({$side}) => lineMark(sideColors[$side].ink)};
    content: '';
    width: 20px;
  }

  ${wide} {
    grid-area: last;
    justify-content: flex-start;
    margin-top: 14px;
    text-align: left;
  }
`;

export const MatchContainer = styled(Container)`
  container: dots-match / inline-size;
  max-width: 1100px;
  padding-top: 16px;
`;

// Each player is a box on the scorecard. On their turn its sides are drawn in their colour from the corners and
// it fills with their colour, the way the lobby claims a choice.
export const MatchPlayer = styled.div<{$active: boolean; $side: DotsAndBoxesSide}>`
  ${cornerDots('var(--corner-dot)', 9, 2)};
  --corner-dot: ${dots.pencilDark};
  align-content: start;
  background: ${dotGrid()}, ${dots.paper};
  border: 2px solid ${dots.pencil};
  display: grid;
  gap: 12px;
  grid-template-areas:
    'identity identity'
    'score clock';
  grid-template-columns: auto minmax(0, 1fr);
  min-width: 0;
  padding: 16px 16px 14px;
  position: relative;
  transition: background-color 0.2s ease;

  &::before {
    background-image:
      linear-gradient(${({$side}) => `${sideColors[$side].ink}, ${sideColors[$side].ink}`}),
      linear-gradient(${({$side}) => `${sideColors[$side].ink}, ${sideColors[$side].ink}`}),
      linear-gradient(${({$side}) => `${sideColors[$side].ink}, ${sideColors[$side].ink}`}),
      linear-gradient(${({$side}) => `${sideColors[$side].ink}, ${sideColors[$side].ink}`});
    background-position:
      left top,
      right top,
      right bottom,
      left bottom;
    background-repeat: no-repeat;
    background-size:
      0 4px,
      4px 0,
      0 4px,
      4px 0;
    content: '';
    inset: -3px;
    pointer-events: none;
    position: absolute;
    transition: background-size 0.3s ease-out;
  }

  ${({$active, $side}) =>
    $active &&
    css`
      --corner-dot: ${dots.dot};
      background-color: ${SIDE_FILLS[$side]};
      z-index: 1;

      &::before {
        background-size:
          100% 4px,
          4px 100%,
          100% 4px,
          4px 100%;
      }
    `}

  @container dots-match (max-width: 480px) {
    gap: 10px;
    padding: 14px 12px 12px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before {
      transition: none;
    }
  }
`;

// The turn bar: claimed in the viewer's colour while they draw, plain paper while they wait. `$side` is the
// viewer's side on their turn.
export const MoveToolbar = styled.div<{$side: DotsAndBoxesSide | null}>`
  ${cornerDots(dots.dot, 10, 2)};
  align-items: center;
  background: ${({$side}) => ($side ? SIDE_FILLS[$side] : dots.paper)};
  border: 2px solid ${({$side}) => ($side ? sideColors[$side].ink : dots.ink)};
  box-shadow: 0 12px 20px -16px #17387899;
  color: ${dots.ink};
  display: flex;
  gap: 14px;
  min-height: 64px;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 2;

  strong {
    display: block;
    font-size: 15px;
    font-weight: ${fonts.weight.extraBold};
    line-height: 1.35;
  }

  p {
    color: ${dots.inkSoft};
    font-size: 13px;
    line-height: 1.5;
    margin: 2px 0 0;
  }

  ${wide} {
    grid-area: status;
    margin-top: 18px;
    position: relative;
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
  margin-bottom: 16px;

  ${GameSound.Button} {
    background: #ffffff;
    border: 2px solid ${dots.ink};
    border-radius: 6px;
    box-shadow: 2px 2px 0 ${dots.ink};
    color: ${dots.ink};
    font-weight: ${fonts.weight.bold};

    &:hover {
      background: ${dots.blueFill};
      filter: none;
    }

    &:focus-visible {
      outline-color: ${dots.gold};
    }
  }

  ${GameSound.Button}[aria-pressed='true'] {
    background: ${dots.blueFill};
    border-color: ${dots.blue};
    box-shadow: 2px 2px 0 ${dots.blue};
  }
`;

// Small print under a pending challenge, in a box ruled in pencil
export const Notes = styled.div`
  background: #ffffffcc;
  border: 2px dashed ${dots.pencil};
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;

  p {
    color: ${dots.inkSoft};
    font-size: 13px;
    line-height: 1.65;
    margin: 0;
  }
`;

export const Panel = styled.section`
  ${sheet};
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  padding: 26px 28px 28px;
  scroll-margin-top: 24px;

  @media (max-width: 600px) {
    padding: 22px 18px 24px;
  }

  ${wide} {
    grid-area: stage;
  }
`;

export const PanelHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const PenMark = styled.span<{$side: DotsAndBoxesSide}>`
  ${({$side}) => lineMark(sideColors[$side].ink)};
  width: 30px;
`;

export const PlayerColor = styled.span<{$side: DotsAndBoxesSide}>`
  ${({$side}) => lineMark(sideColors[$side].ink)};
  width: 22px;
`;

export const PlayerIdentity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  grid-area: identity;
  min-width: 0;
`;

export const PlayerName = styled.strong`
  align-items: center;
  color: ${dots.ink};
  display: flex;
  font-size: 15px;
  font-weight: ${fonts.weight.extraBold};
  gap: 10px;
  line-height: 1.3;
  min-width: 0;

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }
`;

// Printed in the player's colour, or in ink on their turn so it stays readable on the coloured box
export const PlayerRole = styled.span<{$active: boolean; $side: DotsAndBoxesSide}>`
  ${label};
  color: ${({$active, $side}) => ($active ? dots.ink : sideColors[$side].ink)};
  font-size: 10px;
  padding-left: 32px;
`;

export const Resign = styled.section<{$confirming: boolean}>`
  ${({$confirming}) =>
    $confirming &&
    css`
      background: #fff3f0;
      border: 2px solid #ecaa9c;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px 16px 16px;

      ${Detail} {
        color: #872d1e;
        font-weight: ${fonts.weight.semiBold};
      }
    `}

  ${wide} {
    grid-area: resign;
    margin-top: 18px;
  }
`;

// The shared result panel, redrawn in ink on the same paper as the rest of the page
export const Result = styled.div`
  ${sheet};

  ${wide} {
    grid-area: result;
    margin-bottom: 28px;
  }

  ${GameResult.Panel} {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    color: ${dots.ink};
    margin: 0;
  }

  ${GameResult.Panel}::before, ${GameResult.Panel}::after {
    content: none;
  }

  ${GameResult.Eyebrow} {
    color: ${dots.ink};
  }

  ${GameResult.Eyebrow} span {
    color: ${dots.inkSoft};
  }

  ${GameResult.Eyebrow} strong {
    background: #ffffff;
    border: 2px solid ${dots.pencilDark};
    border-radius: 0;
    color: ${dots.ink};
  }

  [data-outcome='win'] ${GameResult.Eyebrow} strong {
    background: ${dots.gold};
    border-color: ${dots.goldDeep};
    color: #4a3405;
  }

  ${GameResult.Title} {
    color: ${dots.ink};
  }

  ${GameResult.Description}, ${GameResult.Note} {
    color: ${dots.inkSoft};
  }

  ${GameResult.ScoreLabel} {
    color: ${dots.inkSoft};

    &::before,
    &::after {
      background: ${dots.pencil};
      height: 2px;
    }
  }

  ${GameResult.ScorePlayer} {
    ${cornerDots(dots.dot, 10, 2)};
    background: ${dotGrid()}, ${dots.paper};
    border: 2px solid ${dots.blue};
    border-radius: 0;
    box-shadow: none;
    color: ${dots.blue};

    &::before {
      content: none;
    }
  }

  ${GameResult.ScorePlayer} + ${GameResult.ScorePlayer} {
    border-color: ${dots.red};
    color: ${dots.red};
  }

  ${GameResult.ScorePlayer}:has(${GameResult.WinnerBadge}) {
    background-color: ${dots.blueFill};
  }

  ${GameResult.ScorePlayer} + ${GameResult.ScorePlayer}:has(${GameResult.WinnerBadge}) {
    background-color: ${dots.redFill};
  }

  ${GameResult.ScoreName} {
    color: ${dots.ink};
  }

  ${GameResult.PlayerMarker} {
    background: ${dots.blue};
    border-radius: 2px;
    box-shadow: none;
    height: 4px;
    transform: none;
    width: 14px;
  }

  ${GameResult.ScorePlayer} + ${GameResult.ScorePlayer} ${GameResult.PlayerMarker} {
    background: ${dots.red};
  }

  ${GameResult.ScoreValue} {
    text-shadow: none;
  }

  ${GameResult.WinnerBadge} {
    background: ${dots.gold};
    border: 2px solid ${dots.goldDeep};
    border-radius: 0;
    color: #4a3405;
  }

  ${GameResult.ScoreVersus} {
    background: ${dots.paper};
    border: 2px solid ${dots.ink};
    border-radius: 0;
    box-shadow: none;
    color: ${dots.ink};
  }

  ${GameResult.ScoreTrack} {
    background: ${dots.red};
    border-radius: 2px;
  }

  ${GameResult.ScoreShare} {
    background: ${dots.blue};
    box-shadow: none;
  }

  ${GameResult.Content} {
    border-top: 2px solid ${dots.pencil};
  }

  ${GameResult.Actions} > a, ${GameResult.Actions} > button {
    ${inkButton};
    ${ghostButton};
    line-height: 1.3;
    text-decoration: none;

    &:hover:not(:disabled) {
      filter: none;
    }
  }

  ${GameResult.Actions} > :first-child {
    background: ${dots.ultramarine};
    border-color: ${dots.navy};
    box-shadow: 3px 3px 0 ${dots.navy};
    color: #ffffff;

    &:hover:not(:disabled) {
      background: ${dots.ultramarine};
      box-shadow: 5px 5px 0 ${dots.navy};
    }

    &:active:not(:disabled) {
      box-shadow: 1px 1px 0 ${dots.navy};
    }
  }
`;

// The finished game sketched on a scrap of paper taped to the result, the way the lobby shows its demo game
export const ResultBoard = styled.div`
  background: #ffffff;
  border: 1px solid ${dots.rule};
  border-radius: 3px;
  box-shadow: 0 16px 26px -18px #17387873;
  margin: 22px auto 14px;
  max-width: 210px;
  padding: 14px;
  position: relative;
  transform: rotate(-2deg);

  &::before {
    background: #bfe5cdd9;
    content: '';
    height: 20px;
    left: 50%;
    position: absolute;
    top: -10px;
    transform: translateX(-50%) rotate(3deg);
    width: 78px;
  }
`;

// The computer-win reward inside the result, on paper too; a paid reward keeps its gold card
export const Reward = styled.div<{$status: ComputerRewardData['status']}>`
  ${ComputerReward.Notice} {
    border-radius: 4px;
  }

  ${({$status}) =>
    $status === 'guest' &&
    css`
      ${ComputerReward.Notice} {
        background: ${dotGrid()}, ${dots.paper};
        border: 2px solid ${dots.ink};
        color: ${dots.ink};
      }

      ${ComputerReward.ArtworkCaption}, ${ComputerReward.Eyebrow} {
        color: ${dots.goldDeep};
      }

      ${ComputerReward.GuestTitle}, ${ComputerReward.RewardAmount} {
        color: ${dots.ink};
      }

      ${ComputerReward.FinePrint}, ${ComputerReward.GuestDescription} {
        color: ${dots.inkSoft};
      }
    `}

  ${({$status}) =>
    ($status === 'fund_empty' || $status === 'not_eligible') &&
    css`
      ${ComputerReward.Notice} {
        background: #ffffffcc;
        border: 2px dashed ${dots.pencil};
        border-radius: 0;
        color: ${dots.inkSoft};
      }

      ${ComputerReward.RewardLabel} {
        color: ${dots.ink};
      }
    `}

  ${ComputerReward.CreateAccount} {
    ${inkButton};
    font-size: 14px;
    min-height: 44px;
    padding: 0 18px;
    text-decoration: none;

    &:hover {
      color: #ffffff;
      text-decoration: none;
    }
  }
`;

export const Rules = styled.details`
  ${sheet};
  line-height: 1.75;
  margin-top: 28px;
  padding: 0;

  summary {
    align-items: center;
    color: ${dots.ink};
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: ${fonts.weight.bold};
    gap: 12px;
    list-style: none;
    padding: 18px 24px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    border: 2px solid ${dots.blue};
    content: '';
    flex-shrink: 0;
    height: 13px;
    transform: rotate(-8deg);
    transition: background-color 0.2s ease;
    width: 13px;
  }

  summary::after {
    border-bottom: 2px solid ${dots.ink};
    border-right: 2px solid ${dots.ink};
    content: '';
    height: 8px;
    margin: -4px 4px 0 auto;
    transform: rotate(45deg);
    transition: transform 0.2s ease;
    width: 8px;
  }

  summary:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: -3px;
  }

  &[open] summary::before {
    background: ${dots.blueFill};
  }

  &[open] summary::after {
    margin-top: 4px;
    transform: rotate(-135deg);
  }

  ol {
    color: ${dots.inkSoft};
    counter-reset: rule;
    font-size: 14px;
    line-height: 1.7;
    list-style: none;
    margin: 0;
    padding: 0 24px 22px;
  }

  li {
    counter-increment: rule;
    margin-top: 8px;
    padding-left: 42px;
    position: relative;
  }

  li + li {
    margin-top: 12px;
  }

  li::before {
    align-items: center;
    background: #ffffff;
    border: 2px solid ${dots.pencil};
    color: ${dots.ink};
    content: counter(rule);
    display: flex;
    font-size: 12px;
    font-weight: ${fonts.weight.extraBold};
    height: 26px;
    justify-content: center;
    left: 0;
    position: absolute;
    top: -1px;
    width: 26px;
  }

  @media (prefers-reduced-motion: reduce) {
    summary::before,
    summary::after {
      transition: none;
    }
  }
`;

// The number of boxes a player has claimed, written in a box claimed in their colour
export const Score = styled.strong<{$side: DotsAndBoxesSide}>`
  ${cornerDots(dots.dot, 8, 2)};
  align-items: center;
  align-self: center;
  background: ${({$side}) => SIDE_FILLS[$side]};
  border: 2px solid ${({$side}) => sideColors[$side].ink};
  color: ${({$side}) => sideColors[$side].ink};
  display: inline-flex;
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  grid-area: score;
  height: 44px;
  justify-content: center;
  line-height: 1;
  min-width: 44px;
  padding: 0 6px;
  position: relative;

  @container dots-match (max-width: 480px) {
    font-size: 19px;
    height: 38px;
    min-width: 38px;
  }
`;

// The two players' boxes share a side, and the match terms sit in a box under them. Beside the board they stack.
export const Scorecard = styled.div`
  box-shadow: 0 30px 50px -40px #17387899;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  isolation: isolate;

  > :nth-child(2) {
    margin-left: -2px;
  }

  > :nth-child(3) {
    grid-column: 1 / -1;
    margin-top: -2px;
  }

  ${wide} {
    grid-area: scorecard;
    grid-template-columns: minmax(0, 1fr);

    > :nth-child(2) {
      margin-left: 0;
    }

    > * + * {
      margin-top: -2px;
    }
  }
`;

// A term of the challenge, with a row of dots running to its value
export const Stat = styled.div`
  align-items: baseline;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 7px 0;

  span {
    ${label};
    ${dottedLeader};
    color: ${dots.inkSoft};
    flex: 1;
  }

  strong {
    color: ${dots.ink};
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.extraBold};
  }
`;

export const Status = styled.div`
  align-items: center;
  background: ${dots.paper};
  border: 2px dashed ${dots.pencil};
  border-radius: 4px;
  color: ${dots.inkSoft};
  display: flex;
  font-size: 14px;
  gap: 14px;
  margin: 24px 0;
  padding: 16px 20px;
`;

export const Terms = styled.div`
  ${cornerDots(dots.pencilDark, 9, 2)};
  align-items: center;
  background: #ffffff;
  border: 2px solid ${dots.pencil};
  color: ${dots.inkSoft};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  gap: 6px 16px;
  line-height: 1.5;
  padding: 10px 16px;
  position: relative;

  span {
    align-items: center;
    display: inline-flex;
    gap: 7px;
  }

  span::before {
    border: 2px solid ${dots.pencilDark};
    content: '';
    flex-shrink: 0;
    height: 8px;
    width: 8px;
  }
`;

export const TextLink = styled(Link)`
  color: #3550a8;
  font-size: 13px;
  font-weight: 600;
`;

export const Timer = styled.strong<{$running: boolean}>`
  color: ${({$running}) => ($running ? dots.ink : dots.inkSoft)};
  font-size: 20px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.01em;
  line-height: 1;

  @container dots-match (max-width: 480px) {
    font-size: 18px;
  }
`;

export const TitleSmall = styled.h2`
  color: ${dots.ink};
  font-size: 23px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;
  overflow-wrap: anywhere;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

// The player whose move it is, on a tab over the top side of their box
export const ToMove = styled.span<{$side: DotsAndBoxesSide}>`
  ${label};
  background: ${({$side}) => sideColors[$side].ink};
  color: #ffffff;
  font-size: 9px;
  padding: 3px 7px;
  position: absolute;
  right: 16px;
  top: -10px;
`;
