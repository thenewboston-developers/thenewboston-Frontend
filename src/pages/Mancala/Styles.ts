import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import * as GameResult from 'components/GameResultPanel/Styles';
import * as GameSound from 'components/GameSoundToggle/Styles';
import {fonts, pagePadding} from 'styles';

import {amberButton, carved, eyebrow, focusRing, glassStone, label, mancala, STONES, woodPanel} from './theme';

// Walnut ink for text that sits on the light page rather than on a board
const PAGE_INK = '#3b1d0b';
const PAGE_MUTED = '#7b5a3f';

const ripple = keyframes`
  0% { opacity: 0.9; transform: scale(0.7); }
  100% { opacity: 0; transform: scale(1.6); }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const AuthButtons = styled(UAuthButtons)`
  button {
    border-radius: 999px;
    font-weight: ${fonts.weight.bold};
    height: 46px;
    padding: 0 22px;
  }

  button:first-child,
  button:first-child:hover {
    background: transparent;
    border: 1px solid ${mancala.lineBright};
    color: ${mancala.cream};
  }

  button:first-child:hover {
    background: #ffe7c414;
    border-color: ${mancala.sand};
  }

  button:last-child,
  button:last-child:hover {
    background: linear-gradient(180deg, ${mancala.amberLight}, ${mancala.amber} 50%, #e8912c);
    border: 0;
    box-shadow:
      inset 0 1px 0 #fff3d0,
      0 3px 0 ${mancala.amberDeep};
    color: ${mancala.ink};
  }

  button:last-child:hover {
    filter: brightness(1.06);
  }

  button:focus-visible {
    ${focusRing};
  }
`;

export const Badge = styled.span`
  background: linear-gradient(180deg, ${mancala.walnutLight}, ${mancala.walnut});
  border: 1px solid ${mancala.line};
  border-radius: 999px;
  box-shadow:
    inset 0 1px 0 #ffd9a240,
    0 2px 0 ${mancala.edge};
  color: ${mancala.sand};
  display: inline-flex;
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
  padding: 6px 12px;
`;

export const BoardCaption = styled.p`
  color: ${PAGE_MUTED};
  font-size: 12px;
  line-height: 1.6;
  margin: 14px 4px 0;
`;

// Amber glass for the main action; on a board, secondary actions are outlined and conceding is coral
export const Button = styled.button<{$danger?: boolean; $secondary?: boolean}>`
  ${amberButton};
  font-size: 14px;
  min-height: 44px;
  padding: 0 20px;

  ${({$secondary}) =>
    $secondary &&
    css`
      background: #1f10071f;
      border: 1px solid ${mancala.lineBright};
      box-shadow: none;
      color: ${mancala.cream};

      &:hover:not(:disabled) {
        background: #ffe7c414;
        border-color: ${mancala.sand};
        filter: none;
      }
    `}

  ${({$danger}) =>
    $danger &&
    css`
      background: linear-gradient(180deg, #ffb39f, #ec7a5f 50%, #c9553b);
      box-shadow:
        inset 0 1px 0 #ffe1d6,
        inset 0 -2px 0 #9c3b26,
        0 4px 0 #6e2414,
        0 10px 18px #2b120566;
      color: #3a0e05;
    `}

  &:disabled {
    cursor: default;
    opacity: 0.5;
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
  color: ${mancala.sand};
  font-size: 14px;
  line-height: 1.65;
  margin: 0;
`;

export const Error = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #5a1d10, #45230f);
  border: 1px solid #ec7a5f80;
  border-radius: 18px;
  color: #ffe0d4;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 20px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  ${eyebrow};
  margin: 0 0 12px;
`;

// The latest moves, each marked with a stone; the newest is amber
export const Log = styled.ol`
  color: ${mancala.sand};
  display: grid;
  font-size: 13px;
  gap: 10px;
  line-height: 1.5;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    align-items: start;
    display: grid;
    gap: 10px;
    grid-template-columns: 12px minmax(0, 1fr);
  }

  li::before {
    ${glassStone(STONES.ivory)};
    content: '';
    height: 9px;
    margin-top: 5px;
    transform: rotate(-14deg);
    width: 11px;
  }

  li:first-child {
    color: ${mancala.cream};
    font-weight: ${fonts.weight.semiBold};
  }

  li:first-child::before {
    ${glassStone(STONES.amber)};
  }
`;

export const MatchGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) 300px;
  margin-top: 24px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const MatchTitle = styled.h1`
  color: ${PAGE_INK};
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.04em;
  line-height: 1.15;
  margin: 0 0 8px;
  overflow-wrap: anywhere;

  span {
    color: #b56f31;
    font-size: 0.6em;
    font-weight: ${fonts.weight.bold};
    letter-spacing: 0;
    margin: 0 0.15em;
    vertical-align: 0.2em;
  }
`;

// The sound switch becomes a walnut chip, like the match badge beside it
export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: space-between;
  margin-bottom: 24px;

  ${GameSound.Button} {
    background: linear-gradient(180deg, ${mancala.walnutLight}, ${mancala.walnut});
    border: 1px solid ${mancala.line};
    border-radius: 999px;
    box-shadow:
      inset 0 1px 0 #ffd9a240,
      0 2px 0 ${mancala.edge};
    color: ${mancala.sand};
    min-height: 36px;
    padding: 6px 14px;
  }

  ${GameSound.Button}[aria-pressed='true'] {
    color: ${mancala.jade};
  }

  ${GameSound.Button}:hover {
    filter: brightness(1.12);
  }

  ${GameSound.Button}:focus-visible {
    ${focusRing};
  }
`;

export const Panel = styled.section`
  ${woodPanel};
  border-radius: 24px;
  min-width: 0;
  padding: 22px 24px;
  scroll-margin-top: 24px;

  @media (max-width: 600px) {
    padding: 20px 18px;
  }
`;

// The board as it will be set up, beside a pending challenge's terms
export const PendingHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
  margin-bottom: 8px;

  > div:first-child {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;
    gap: 16px;
  }
`;

// A challenge that closed before it started
export const Result = styled.div`
  ${woodPanel};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
  padding: 22px 24px;

  h2 {
    margin: 0;
  }

  a {
    color: ${mancala.amberLight};
  }

  a:focus-visible {
    ${focusRing};
    border-radius: 4px;
  }
`;

// The shared result panel, carved in walnut with the final stores in honey
export const ResultCard = styled.div`
  ${GameResult.Panel} {
    ${woodPanel};
    border-radius: 28px;
    color: ${mancala.cream};
  }

  ${GameResult.Panel}::before {
    background: linear-gradient(90deg, transparent, #ffd9a2a6, transparent);
  }

  ${GameResult.Panel}::after {
    content: none;
  }

  ${GameResult.Eyebrow} {
    color: ${mancala.honey};
  }

  ${GameResult.Eyebrow} span {
    color: ${mancala.dust};
  }

  ${GameResult.Eyebrow} strong {
    background: #24120959;
    border-color: ${mancala.lineBright};
    color: ${mancala.sand};
  }

  [data-outcome='win'] ${GameResult.Eyebrow} strong {
    background: linear-gradient(180deg, ${mancala.amberLight}, ${mancala.amber});
    border-color: transparent;
    color: ${mancala.ink};
  }

  ${GameResult.Title} {
    color: ${mancala.cream};
  }

  ${GameResult.Description}, ${GameResult.Note} {
    color: ${mancala.sand};
  }

  ${GameResult.Content} {
    border-top-color: ${mancala.line};
  }

  ${GameResult.ScoreLabel} {
    color: ${mancala.dust};

    &::before,
    &::after {
      background: ${mancala.line};
    }
  }

  ${GameResult.ScorePlayer} {
    ${carved};
    border-radius: 24px;
    color: ${mancala.sand};

    &::before {
      content: none;
    }
  }

  ${GameResult.ScorePlayer}:has(${GameResult.WinnerBadge}) {
    border-color: #ffe2a399;
    box-shadow:
      inset 0 5px 10px #0d0603b3,
      0 0 0 1px #ffe2a366,
      0 0 26px #ffc76b33;
    color: ${mancala.amberLight};
  }

  ${GameResult.ScoreName} {
    color: ${mancala.cream};
  }

  ${GameResult.PlayerMarker} {
    ${glassStone(STONES.turquoise)};
    height: 9px;
    transform: rotate(-14deg);
    width: 11px;
  }

  ${GameResult.ScorePlayer} + ${GameResult.ScorePlayer} ${GameResult.PlayerMarker} {
    ${glassStone(STONES.amethyst)};
  }

  ${GameResult.ScoreValue} {
    text-shadow: 0 2px 0 #1a0a02;
  }

  ${GameResult.ScoreVersus} {
    ${carved};
    box-shadow:
      inset 0 3px 6px #0d0603b3,
      0 0 0 6px ${mancala.walnut};
    color: ${mancala.sand};
  }

  ${GameResult.ScoreTrack} {
    background: linear-gradient(90deg, #6e3aa3, #a46cd8);
  }

  ${GameResult.ScoreShare} {
    background: linear-gradient(90deg, #138f84, #5fd3bd);
    box-shadow: 2px 0 8px #7fe6d066;
  }

  ${GameResult.WinnerBadge} {
    background: linear-gradient(180deg, ${mancala.amberLight}, ${mancala.amber});
    border: 0;
    color: ${mancala.ink};
  }

  ${GameResult.Actions} > a,
  ${GameResult.Actions} > button {
    background: #1f10071f;
    border: 1px solid ${mancala.lineBright};
    border-radius: 999px;
    box-shadow: none;
    color: ${mancala.cream};
  }

  ${GameResult.Actions} > a:first-child,
  ${GameResult.Actions} > button:first-child {
    background: linear-gradient(180deg, ${mancala.amberLight}, ${mancala.amber} 48%, #e8912c);
    border-color: transparent;
    box-shadow:
      inset 0 1px 0 #fff3d0,
      0 4px 0 ${mancala.amberDeep};
    color: ${mancala.ink};
  }

  ${GameResult.Actions} > a:focus-visible,
  ${GameResult.Actions} > button:focus-visible {
    ${focusRing};
  }
`;

// The board in miniature, standing in for the default trophy on the result panel
export const ResultArtwork = styled.div`
  margin: 0 auto;
  max-width: 230px;
  width: 100%;
`;

export const Rules = styled.details`
  ${woodPanel};
  border-radius: 24px;
  color: ${mancala.sand};
  margin-top: 32px;
  padding: 0;

  summary {
    align-items: center;
    border-radius: 24px;
    color: ${mancala.cream};
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: ${fonts.weight.semiBold};
    gap: 12px;
    list-style: none;
    padding: 18px 24px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    ${glassStone(STONES.amber)};
    content: '';
    flex: 0 0 auto;
    height: 16px;
    transform: rotate(-14deg);
    width: 20px;
  }

  summary::after {
    border-bottom: 2px solid ${mancala.sand};
    border-right: 2px solid ${mancala.sand};
    content: '';
    height: 8px;
    margin-left: auto;
    transform: translateY(-2px) rotate(45deg);
    width: 8px;
  }

  &[open] summary::after {
    transform: translateY(2px) rotate(225deg);
  }

  summary:focus-visible {
    ${focusRing};
    outline-offset: -3px;
  }

  ol {
    counter-reset: rule;
    display: grid;
    gap: 12px;
    list-style: none;
    margin: 0;
    padding: 4px 24px 24px;
  }

  li {
    counter-increment: rule;
    display: grid;
    font-size: 14px;
    gap: 14px;
    grid-template-columns: 28px minmax(0, 1fr);
    line-height: 1.65;
    margin: 0;
  }

  li::before {
    ${carved};
    align-items: center;
    border-radius: 50%;
    color: ${mancala.amberLight};
    content: counter(rule);
    display: flex;
    font-size: 12px;
    font-weight: ${fonts.weight.bold};
    height: 28px;
    justify-content: center;
    width: 28px;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 1180px) and (min-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Small = styled.p`
  color: ${mancala.dust};
  font-size: 12px;
  line-height: 1.6;
  margin: 8px 0 0;
`;

// A line of the terms, with a carved groove beneath it
export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #1f0e0566;
  box-shadow: 0 1px 0 #ffd9a214;
  color: ${mancala.sand};
  display: flex;
  font-size: 14px;
  gap: 12px;
  justify-content: space-between;
  line-height: 1.5;
  padding: 12px 0;

  strong {
    color: ${mancala.cream};
    font-variant-numeric: tabular-nums;
  }

  &:last-child {
    border: 0;
    box-shadow: none;
  }
`;

export const Status = styled.div`
  ${woodPanel};
  align-items: center;
  border-radius: 20px;
  color: ${mancala.sand};
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 14px;
  margin: 24px 0 0;
  padding: 18px 22px;

  ${Detail} {
    flex: 1;
    min-width: 200px;
  }
`;

export const Subtitle = styled.p`
  color: ${PAGE_MUTED};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const TextLink = styled(Link)`
  color: #7a4a25;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
`;

export const TitleSmall = styled.h2`
  color: ${mancala.cream};
  font-size: 20px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.025em;
  margin: 0 0 12px;
`;

// Whose turn it is, on a strip of the board; a jade edge when it is yours
export const TurnBanner = styled.div<{$yours: boolean}>`
  ${woodPanel};
  align-items: center;
  border-radius: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 0 0 20px;
  min-height: 76px;
  padding: 16px 22px;

  strong {
    color: ${mancala.cream};
    font-size: 17px;
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  [role='status'] {
    ${label};
    color: ${mancala.dust};
  }

  ${({$yours}) =>
    $yours &&
    css`
      border-color: #7fe6d080;
      box-shadow:
        inset 0 1px 0 #ffd9a259,
        inset 0 0 0 1px #7fe6d033,
        0 6px 0 ${mancala.edge},
        0 0 30px #7fe6d026,
        0 18px 30px #3d1e0c38;
    `}
`;

// A glass stone: jade and rippling when it is your move, amber otherwise
export const TurnIndicator = styled.span<{$yours: boolean}>`
  ${({$yours}) => glassStone($yours ? STONES.jade : STONES.amber)};
  flex: 0 0 auto;
  height: 18px;
  position: relative;
  transform: rotate(-14deg);
  width: 22px;

  &::after {
    border: 2px solid ${mancala.jade};
    border-radius: 50%;
    content: '';
    display: ${({$yours}) => ($yours ? 'block' : 'none')};
    inset: -6px;
    opacity: 0;
    position: absolute;
  }

  @media (prefers-reduced-motion: no-preference) {
    &::after {
      animation: ${ripple} 1.8s ease-out infinite;
    }
  }
`;
