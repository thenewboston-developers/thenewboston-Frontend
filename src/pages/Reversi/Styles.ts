import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import * as GameResult from 'components/GameResultPanel/Styles';
import {fonts, pagePadding} from 'styles';

import {BLACK_DISK, boardPanel, caption, reversi, WHITE_DISK} from './theme';

const flipFromBlack = keyframes`
  0% {
    background: ${BLACK_DISK};
    transform: scaleX(1);
  }

  49% {
    background: ${BLACK_DISK};
  }

  50% {
    background: ${WHITE_DISK};
    transform: scaleX(0.04);
  }

  100% {
    background: ${WHITE_DISK};
    transform: scaleX(1);
  }
`;

const flipFromWhite = keyframes`
  0% {
    background: ${WHITE_DISK};
    transform: scaleX(1);
  }

  49% {
    background: ${WHITE_DISK};
  }

  50% {
    background: ${BLACK_DISK};
    transform: scaleX(0.04);
  }

  100% {
    background: ${BLACK_DISK};
    transform: scaleX(1);
  }
`;

const place = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.55);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: ${reversi.mintSoft};
  border: 1px solid ${reversi.edge};
  border-radius: 999px;
  color: ${reversi.mint};
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
`;

export const BoardFrame = styled.div`
  background: linear-gradient(145deg, #263c30, #0a120e);
  border: 1px solid ${reversi.edgeBright};
  border-radius: 22px;
  box-shadow:
    0 20px 42px #00000059,
    inset 0 1px 0 #ffffff24;
  display: grid;
  gap: 4px;
  grid-template-columns: 18px minmax(0, 1fr);
  padding: 6px 26px 26px 4px;
`;

export const BoardGrid = styled.div`
  aspect-ratio: 1;
  background: ${reversi.feltDark};
  border: 1px solid ${reversi.gold}73;
  border-radius: 8px;
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  overflow: hidden;
`;

export const BoardLabel = styled.span`
  align-items: center;
  color: ${reversi.mist};
  display: flex;
  font-size: 11px;
  font-weight: 600;
  justify-content: center;
  text-transform: uppercase;
`;

export const BoardLabels = styled.div<{$direction: 'column' | 'row'}>`
  display: grid;
  grid-auto-flow: ${({$direction}) => $direction};
  ${({$direction}) =>
    $direction === 'row'
      ? css`
          grid-template-rows: repeat(8, minmax(0, 1fr));
        `
      : css`
          grid-template-columns: repeat(8, minmax(0, 1fr));
          min-height: 16px;
        `}
`;

export const BoardLegend = styled.div`
  align-items: center;
  color: ${reversi.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 12px 24px;
  justify-content: center;
  margin-top: 18px;
`;

export const BoardLegendItem = styled.span<{$last?: boolean}>`
  align-items: center;
  display: inline-flex;
  gap: 9px;

  &::before {
    background: ${({$last}) => ($last ? reversi.gold : 'transparent')};
    border: 2px solid ${reversi.gold};
    border-radius: ${({$last}) => ($last ? '2px' : '50%')};
    content: '';
    height: 10px;
    transform: ${({$last}) => ($last ? 'rotate(45deg)' : 'none')};
    width: 10px;
  }
`;

// Keep the playable board comfortable on wide screens while allowing narrow screens to use their full width.
export const BoardWrap = styled.div`
  margin: 0 auto;
  max-width: min(680px, max(340px, calc(100vh - 300px)));
  width: 100%;
`;

export const Button = styled.button<{$danger?: boolean; $secondary?: boolean}>`
  align-items: center;
  background: ${({$danger, $secondary}) => {
    if ($secondary) return reversi.ink;
    return $danger ? '#853d35' : reversi.mint;
  }};
  border: 1px solid ${({$danger, $secondary}) => ($danger || $secondary ? reversi.edgeBright : reversi.mint)};
  border-radius: 12px;
  color: ${({$danger, $secondary}) => ($danger || $secondary ? reversi.text : reversi.ink)};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  min-height: 44px;
  padding: 11px 18px;
  transition:
    filter 150ms,
    opacity 150ms;

  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }

  &:focus-visible {
    outline: 3px solid ${reversi.gold};
    outline-offset: 3px;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  background: radial-gradient(ellipse at 50% 0, #1b3b294d, transparent 65%), ${reversi.night};
  color: ${reversi.text};
  color-scheme: dark;
  margin: 0 auto;
  max-width: 1500px;
  min-height: 100%;
  padding-bottom: 48px;
  padding-top: 28px;
`;

export const Detail = styled.p`
  color: ${reversi.mist};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const Disk = styled.span<{$animation?: 'flip' | 'place'; $last?: boolean; $side: 'black' | 'white'}>`
  background: ${({$side}) => ($side === 'black' ? BLACK_DISK : WHITE_DISK)};
  border-radius: 50%;
  box-shadow:
    0 2px 3px #0000004d,
    inset 0 -2px 3px #00000026,
    inset 0 0 0 1px #ffffff26;
  height: 78%;
  position: relative;
  width: 78%;

  ${({$animation, $side}) =>
    $animation === 'flip' &&
    css`
      animation: ${$side === 'black' ? flipFromWhite : flipFromBlack} 420ms ease-in-out both;
    `}

  ${({$animation}) =>
    $animation === 'place' &&
    css`
      animation: ${place} 180ms ease-out both;
    `}

  ${({$last}) =>
    $last &&
    css`
      &::after {
        background: ${reversi.gold};
        border: 1px solid ${reversi.ink};
        border-radius: 2px;
        content: '';
        height: 22%;
        left: 39%;
        position: absolute;
        top: 39%;
        transform: rotate(45deg);
        width: 22%;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Empty = styled.div`
  background: ${reversi.ink};
  border: 1px dashed ${reversi.edgeBright};
  border-radius: 16px;
  color: ${reversi.mist};
  line-height: 1.7;
  padding: 24px;
`;

export const Error = styled.div`
  background: #351d19;
  border: 1px solid #8e5145;
  border-radius: 12px;
  color: ${reversi.rose};
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  color: ${reversi.mint};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Field = styled.label`
  color: ${reversi.mist};
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
`;

export const FieldGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GuestActions = styled.div`
  margin: 24px 0 8px;
`;

export const Hint = styled.span<{$side: 'black' | 'white'}>`
  background: ${({$side}) => ($side === 'black' ? '#101b1314' : '#ffffff14')};
  border: 2px solid ${reversi.gold};
  border-radius: 50%;
  height: 26%;
  transition:
    height 120ms,
    width 120ms;
  width: 26%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Input = styled.input`
  background: ${reversi.ink};
  border: 1px solid ${reversi.edgeBright};
  border-radius: 10px;
  color: ${reversi.text};
  font-family: inherit;
  font-size: 15px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${reversi.gold};
    outline-offset: 2px;
  }
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
`;

export const MatchGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) 320px;
  margin-top: 24px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const MatchHeader = styled.header`
  align-items: center;
  border-bottom: 1px solid ${reversi.edge};
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding-bottom: 24px;

  > div:first-child {
    flex: 1;
    min-width: min(100%, 240px);
  }
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: ${reversi.ink};
  border: 1px solid ${reversi.edge};
  border-radius: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 18px 20px;

  &:hover {
    border-color: ${reversi.mint};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid ${reversi.gold};
    outline-offset: 2px;
  }
`;

// The first column of a match: notices and the turn status sit above the board, evenly spaced
export const MatchMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;

  && > * {
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export const MatchTitle = styled.h1`
  color: ${reversi.text};
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.035em;
  margin: 0 0 10px;
  overflow-wrap: anywhere;
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
  ${boardPanel};
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

export const Player = styled.div<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) => ($active ? '#224532' : reversi.ink)};
  border: 1px solid ${({$active}) => ($active ? reversi.mint : reversi.edge)};
  border-radius: 14px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 14px;
`;

export const PlayerIdentity = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  min-width: 0;
`;

export const PlayerName = styled.strong`
  display: block;
  font-size: 14px;
  overflow-wrap: anywhere;
`;

export const PlayerPiece = styled.span<{$side: 'black' | 'white'}>`
  background: ${({$side}) => ($side === 'black' ? BLACK_DISK : WHITE_DISK)};
  border: 1px solid ${({$side}) => ($side === 'black' ? '#647367' : '#b9ae93')};
  border-radius: 50%;
  flex-shrink: 0;
  height: 28px;
  width: 28px;
`;

export const PlayerTurn = styled.span`
  ${caption};
  color: ${reversi.mint};
  display: block;
  font-size: 9px;
  margin-top: 6px;
`;

export const Result = styled.div`
  background: ${reversi.panel};
  border: 1px solid ${reversi.edgeBright};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 16px 0;
  padding: 22px;
`;

export const ResultWrap = styled.div`
  ${GameResult.Panel} {
    background: radial-gradient(ellipse at 90% 0, #f2cc7924, transparent 55%), ${reversi.panel};
    border-color: ${reversi.edgeBright};
    color: ${reversi.text};
    margin: 0;
  }

  ${GameResult.Description},
  ${GameResult.Note},
  ${GameResult.Eyebrow} span {
    color: ${reversi.mist};
  }

  ${GameResult.Actions} > a {
    color: ${reversi.mint};
  }

  ${GameResult.Actions} > button:focus-visible,
  ${GameResult.Actions} > a:focus-visible {
    outline-color: ${reversi.gold};
  }
`;

export const Rules = styled.details`
  ${boardPanel};
  color: ${reversi.mist};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: ${reversi.text};
    cursor: pointer;
    font-weight: 600;
  }

  summary:focus-visible {
    border-radius: 4px;
    outline: 2px solid ${reversi.gold};
    outline-offset: 4px;
  }

  li {
    margin-top: 8px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export const Score = styled.div`
  color: ${reversi.text};
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  white-space: nowrap;
`;

export const ScoreBar = styled.div<{$black: number}>`
  background: linear-gradient(90deg, #171c18 0 ${({$black}) => $black}%, #efe8d8 ${({$black}) => $black}% 100%);
  border: 1px solid #cfc5ae;
  border-radius: 999px;
  height: 10px;
  margin-top: 14px;
`;

export const Section = styled.section`
  margin-top: 32px;
`;

export const Select = styled.select`
  background: ${reversi.ink};
  border: 1px solid ${reversi.edgeBright};
  border-radius: 10px;
  color: ${reversi.text};
  font-family: inherit;
  font-size: 14px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${reversi.gold};
    outline-offset: 2px;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1180px) and (min-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Small = styled.p`
  color: ${reversi.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 8px 0 0;
`;

export const SoundControls = styled.div`
  > button {
    background: ${reversi.panel};
    border-color: ${reversi.edgeBright};
    color: ${reversi.mint};
    min-height: 44px;
  }

  > button:hover {
    background: ${reversi.forest};
    filter: brightness(1.15);
  }

  > button:focus-visible {
    outline-color: ${reversi.gold};
  }
`;

export const Square = styled.button<{$legal?: boolean}>`
  align-items: center;
  background: ${reversi.felt};
  border: 0;
  cursor: ${({$legal}) => ($legal ? 'pointer' : 'default')};
  display: flex;
  justify-content: center;
  min-width: 0;
  padding: 0;

  ${({$legal}) =>
    $legal &&
    css`
      &:hover,
      &:focus-visible {
        background: ${reversi.feltHover};

        ${Hint} {
          border-color: ${reversi.mintLight};
          height: 62%;
          width: 62%;
        }
      }
    `}

  &:focus-visible {
    outline: 3px solid ${reversi.mintLight};
    outline-offset: -3px;
  }
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid ${reversi.edge};
  display: flex;
  gap: 12px;
  justify-content: space-between;
  line-height: 1.5;
  padding: 12px 0;

  &:last-child {
    border: 0;
  }
`;

export const Status = styled.div`
  ${boardPanel};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 16px 0;
  min-height: 80px;
  padding: 18px 20px;
`;

export const TextLink = styled(Link)`
  color: ${reversi.mint};
  font-size: 13px;
  font-weight: 600;

  &:hover {
    color: ${reversi.mintLight};
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid ${reversi.gold};
    outline-offset: 4px;
  }
`;

export const Timer = styled.span`
  color: ${reversi.mist};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const TitleSmall = styled.h2`
  color: ${reversi.text};
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;
