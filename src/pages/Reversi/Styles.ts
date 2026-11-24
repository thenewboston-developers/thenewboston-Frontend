import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

const BLACK_DISK = 'radial-gradient(circle at 34% 28%, #5a5666 0%, #24212d 46%, #0d0b12 100%)';
const WHITE_DISK = 'radial-gradient(circle at 34% 28%, #ffffff 0%, #f1ebdd 52%, #cfc5ae 100%)';
const FELT = '#1f7358';
const FELT_DARK = '#124735';
const FOCUS = '#c88a2c';
const INK = '#25212f';
const LINE = '#e8e2d4';

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
  background: #efe9dc;
  border-radius: 999px;
  color: #5b4a25;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
`;

export const BoardFrame = styled.div`
  background: linear-gradient(145deg, #3a3346, ${INK});
  border-radius: 22px;
  box-shadow: 0 14px 32px #1d1a2633;
  display: grid;
  gap: 4px;
  grid-template-columns: 18px minmax(0, 1fr);
  padding: 6px 26px 26px 4px;
`;

export const BoardGrid = styled.div`
  aspect-ratio: 1;
  background: ${FELT_DARK};
  border: 2px solid ${FELT_DARK};
  border-radius: 8px;
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  overflow: hidden;
`;

export const BoardLabel = styled.span`
  align-items: center;
  color: #b9b2c6;
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

// The board stays within the height of the window, so a move never needs scrolling
export const BoardWrap = styled.div`
  margin: 0 auto;
  max-width: min(640px, max(300px, calc(100vh - 290px)));
  width: 100%;
`;

export const Button = styled.button<{$danger?: boolean; $secondary?: boolean}>`
  align-items: center;
  background: ${({$danger, $secondary}) => {
    if ($secondary) return '#f3efe6';
    return $danger ? '#9e3434' : INK;
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? '#ddd5c3' : 'transparent')};
  border-radius: 12px;
  color: ${({$secondary}) => ($secondary ? INK : colors.white)};
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
    filter: brightness(${({$danger, $secondary}) => ($secondary || $danger ? 0.95 : 1.35)});
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }

  &:focus-visible {
    outline: 3px solid ${FOCUS};
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
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const Disk = styled.span<{$animation?: 'flip' | 'place'; $last?: boolean; $side: 'black' | 'white'}>`
  background: ${({$side}) => ($side === 'black' ? BLACK_DISK : WHITE_DISK)};
  border-radius: 50%;
  box-shadow:
    0 2px 3px #0000004d,
    inset 0 -2px 3px #00000026;
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
        background: ${FOCUS};
        border-radius: 50%;
        content: '';
        height: 22%;
        left: 39%;
        position: absolute;
        top: 39%;
        width: 22%;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Empty = styled.div`
  background: #faf8f2;
  border: 1px dashed #d9d1bf;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.7;
  padding: 24px;
`;

export const Error = styled.div`
  background: #fff0ec;
  border: 1px solid #eac8bb;
  border-radius: 12px;
  color: #813e2c;
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  color: #8a7a55;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Field = styled.label`
  color: #4a4458;
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
  background: ${({$side}) => ($side === 'black' ? '#0d0b1259' : '#ffffff73')};
  border-radius: 50%;
  height: 24%;
  transition:
    height 120ms,
    width 120ms;
  width: 24%;
`;

export const Input = styled.input`
  background: ${colors.white};
  border: 1px solid #d6cfbe;
  border-radius: 10px;
  color: ${colors.primary};
  font-family: inherit;
  font-size: 15px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${FOCUS};
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
  grid-template-columns: minmax(0, 1fr) 300px;
  margin-top: 24px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${LINE};
  border-radius: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 18px 20px;

  &:hover {
    border-color: #b8ab8a;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid ${FOCUS};
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
  color: ${INK};
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.035em;
  margin-bottom: 10px;
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
  background: ${colors.white};
  border: 1px solid ${LINE};
  border-radius: 20px;
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
  background: ${({$active}) => ($active ? '#f6f0e1' : '#fbfaf6')};
  border: 1px solid ${({$active}) => ($active ? '#c9b480' : '#ebe6d9')};
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
  border: 1px solid ${({$side}) => ($side === 'black' ? '#0d0b12' : '#b9ae93')};
  border-radius: 50%;
  flex-shrink: 0;
  height: 28px;
  width: 28px;
`;

export const Result = styled.div`
  background: #f6f0e1;
  border: 1px solid #d8c796;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 16px 0;
  padding: 22px;
`;

export const Rules = styled.details`
  background: ${colors.white};
  border: 1px solid ${LINE};
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: ${INK};
    cursor: pointer;
    font-weight: 600;
  }

  li {
    margin-top: 8px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export const Score = styled.div`
  color: ${INK};
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  white-space: nowrap;
`;

export const ScoreBar = styled.div<{$black: number}>`
  background: linear-gradient(90deg, #24212d 0 ${({$black}) => $black}%, #efe8d8 ${({$black}) => $black}% 100%);
  border: 1px solid #cfc5ae;
  border-radius: 999px;
  height: 10px;
  margin-top: 14px;
`;

export const Section = styled.section`
  margin-top: 32px;
`;

export const Select = styled.select`
  background: ${colors.white};
  border: 1px solid #d6cfbe;
  border-radius: 10px;
  color: ${colors.primary};
  font-family: inherit;
  font-size: 14px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${FOCUS};
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
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.6;
  margin: 8px 0 0;
`;

export const Square = styled.button<{$legal?: boolean}>`
  align-items: center;
  background: ${FELT};
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
        background: #2a8a6b;

        ${Hint} {
          height: 62%;
          width: 62%;
        }
      }
    `}

  &:focus-visible {
    outline: 3px solid ${FOCUS};
    outline-offset: -3px;
  }
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #efeadd;
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
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${LINE};
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 16px 0;
  min-height: 80px;
  padding: 18px 20px;
`;

export const TextLink = styled(Link)`
  color: #5b4a25;
  font-size: 13px;
  font-weight: 600;
`;

export const Timer = styled.span`
  color: #5f596b;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const TitleSmall = styled.h2`
  color: ${INK};
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;
