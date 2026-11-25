import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import {fonts} from 'styles';

import {focusRing, plate, room} from '../theme';

type Action = 'double' | 'hit' | 'stand';
type OutcomeTone = 'blackjack' | 'loss' | 'push' | 'win';

// Measured on the controls themselves, so they also stack beside a wide side menu
const COMPACT = '520px';
const NARROW = '820px';

const urgent = keyframes`
  50% {
    opacity: 0.55;
  }
`;

const actionTones: Record<Action, ReturnType<typeof css>> = {
  double: css`
    background: linear-gradient(180deg, #ffd978, ${room.amber} 48%, #d68d17);
    color: ${room.ink};
  `,
  hit: css`
    background: linear-gradient(180deg, #3ad487, ${room.green} 48%, ${room.greenDeep});
    color: #ffffff;
  `,
  stand: css`
    background: linear-gradient(180deg, #f2646c, ${room.red} 48%, ${room.redDeep});
    color: #ffffff;
  `,
};

const resultTones: Record<OutcomeTone, string> = {
  blackjack: room.goldLight,
  loss: room.ember,
  push: room.ivory,
  win: room.mint,
};

const smallButton = css`
  ${focusRing};
  align-items: center;
  background: #ffffff0a;
  border: 1px solid ${room.line};
  border-radius: 10px;
  color: ${room.ivory};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 5px;
  justify-content: center;
  min-height: 40px;
  padding: 0 12px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: #ffffff17;
    border-color: ${room.lineStrong};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.38;
  }
`;

// Hit is green, Stand is red and Double is gold, as on every other table
export const ActionButton = styled.button<{$action: Action}>`
  ${focusRing};
  ${({$action}) => actionTones[$action]};
  align-items: center;
  border: 0;
  border-radius: 16px;
  box-shadow:
    inset 0 1px 0 #ffffff73,
    inset 0 -4px 0 #00000033,
    0 10px 20px #00000059;
  cursor: pointer;
  display: flex;
  flex: 0 1 190px;
  font-family: inherit;
  gap: 11px;
  min-height: 68px;
  min-width: 0;
  padding: 10px 16px;
  position: relative;
  text-align: left;
  transition:
    filter 0.15s ease,
    opacity 0.15s ease,
    transform 0.12s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.7) brightness(0.72);
    opacity: 0.55;
  }

  @container (max-width: ${NARROW}) {
    flex: 1 1 0;
  }

  @container (max-width: ${COMPACT}) {
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    min-height: 74px;
    padding: 9px 6px;
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ActionIcon = styled.span`
  align-items: center;
  background: #00000029;
  border-radius: 50%;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: ${fonts.weight.extraBold};
  height: 36px;
  justify-content: center;
  width: 36px;

  @container (max-width: ${COMPACT}) {
    height: 28px;
    width: 28px;
  }
`;

export const ActionLabel = styled.span`
  display: grid;
  font-size: 17px;
  font-weight: ${fonts.weight.extraBold};
  gap: 1px;
  letter-spacing: 0.05em;
  line-height: 1.15;
  min-width: 0;
  text-transform: uppercase;

  small {
    font-size: 11px;
    font-weight: ${fonts.weight.semiBold};
    letter-spacing: 0;
    opacity: 0.86;
    text-transform: none;
  }

  @container (max-width: ${COMPACT}) {
    font-size: 14px;

    small {
      font-size: 10px;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex: 1 1 100%;
  gap: 12px;
  justify-content: center;

  @container (max-width: ${COMPACT}) {
    gap: 8px;
  }
`;

export const Amount = styled.label`
  align-items: center;
  background: #030b08b3;
  border: 1px solid ${room.rim};
  border-radius: 10px;
  color: ${room.mist};
  display: inline-flex;
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  gap: 4px;
  letter-spacing: 0.08em;
  min-height: 40px;
  padding: 0 11px 0 4px;

  &:focus-within {
    border-color: ${room.gold};
  }

  @container (max-width: ${COMPACT}) {
    flex: 1 1 96px;
    min-width: 0;
  }
`;

export const AmountInput = styled.input`
  appearance: textfield;
  background: transparent;
  border: 0;
  color: ${room.ivory};
  font-family: inherit;
  font-size: 17px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  min-width: 0;
  outline: none;
  padding: 0 4px 0 8px;
  text-align: right;
  width: 84px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  &:disabled {
    opacity: 0.5;
  }

  @container (max-width: ${COMPACT}) {
    flex: 1 1 0;
    width: 40px;
  }
`;

export const AuthButtons = styled(UAuthButtons)`
  button {
    height: 44px;
    padding: 0 20px;
  }

  button:first-child {
    background: transparent;
    border-color: ${room.lineStrong};
    color: ${room.ivory};
  }

  button:first-child:hover {
    background: #ffffff14;
  }
`;

export const Betting = styled.div`
  display: grid;
  flex: 1 1 420px;
  gap: 10px;
  min-width: 0;
`;

export const Controls = styled.div`
  background: linear-gradient(180deg, ${room.nightRaised}, ${room.nightSoft});
  border: 1px solid ${room.rim};
  border-radius: 18px;
  box-shadow: inset 0 1px 0 #ffffff0f;
  container-type: inline-size;
  margin-top: 16px;
  padding: 14px 18px;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const DealButton = styled.button`
  ${focusRing};
  background: linear-gradient(180deg, #fff0bd, ${room.goldLight} 22%, ${room.gold} 62%, #c8992f);
  border: 0;
  border-radius: 16px;
  box-shadow:
    inset 0 1px 0 #ffffffa6,
    inset 0 -4px 0 #00000029,
    0 10px 22px #00000059;
  color: ${room.ink};
  cursor: pointer;
  flex: 0 0 200px;
  font-family: inherit;
  font-size: 23px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: 0.08em;
  line-height: 1.1;
  min-height: 90px;
  padding: 10px 18px;
  text-transform: uppercase;
  transition:
    filter 0.15s ease,
    transform 0.12s ease;

  small {
    display: block;
    font-size: 12.5px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    letter-spacing: 0.02em;
    margin-top: 3px;
    opacity: 0.8;
    text-transform: none;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.07);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.75) brightness(0.7);
    opacity: 0.55;
  }

  @container (max-width: ${NARROW}) {
    flex: 1 1 100%;
    min-height: 62px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Error = styled.p`
  background: linear-gradient(90deg, #4a1a1c, #2a1517);
  border: 1px solid #ff8f7d59;
  border-radius: 10px;
  color: #ffdcd5;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  padding: 10px 12px;
`;

export const Hints = styled.div`
  color: ${room.mist};
  display: grid;
  flex: 1 0 100%;
  font-size: 12px;
  gap: 4px;
  line-height: 1.55;

  &:empty {
    display: none;
  }
`;

// The shortcut key of an action, for players at a keyboard
export const Key = styled.kbd`
  border: 1px solid currentColor;
  border-radius: 5px;
  font-family: inherit;
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  line-height: 1;
  opacity: 0.55;
  padding: 2px 5px;
  position: absolute;
  right: 8px;
  top: 7px;

  @container (max-width: ${COMPACT}) {
    display: none;
  }

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

export const Layout = styled.div`
  align-items: center;
  column-gap: 24px;
  display: grid;
  grid-template-areas:
    'purse stage'
    'messages messages';
  grid-template-columns: auto minmax(0, 1fr);

  @container (max-width: ${NARROW}) {
    grid-template-areas:
      'purse'
      'stage'
      'messages';
    grid-template-columns: minmax(0, 1fr);
    row-gap: 12px;
  }
`;

// The limits move here on a phone, where the table header has no room for them
export const LimitHint = styled.span`
  color: ${room.mist};
  display: none;
  flex: 1 0 100%;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;

  @media (max-width: 600px) {
    display: block;
  }
`;

// Read out when a hand is over; the banner on the felt shows the same to everyone else
export const Live = styled.div`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Messages = styled.div`
  display: grid;
  gap: 10px;
  grid-area: messages;
  margin-top: 14px;

  @container (max-width: ${NARROW}) {
    margin-top: 0;
  }
`;

export const Note = styled.p`
  color: ${room.mist};
  font-size: 12.5px;
  line-height: 1.6;
  margin: 0;
`;

export const NoteLink = styled(Link)`
  color: ${room.goldLight};
  font-weight: ${fonts.weight.semiBold};
`;

export const Notice = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 100%;
  flex-wrap: wrap;
  gap: 12px 18px;
  justify-content: space-between;

  p {
    color: #d5e4dc;
    flex: 1 1 260px;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

export const NoticeButton = styled.button`
  ${smallButton};
  background: ${room.goldSoft};
  border-color: ${room.gold};
  color: ${room.goldLight};
  min-height: 44px;
  padding: 0 20px;
`;

export const NoticeLink = styled(Link)`
  ${smallButton};
  background: ${room.goldSoft};
  border-color: ${room.gold};
  color: ${room.goldLight};
  min-height: 44px;
  padding: 0 20px;
  text-decoration: none;

  &:hover {
    color: ${room.goldLight};
    text-decoration: none;
  }
`;

export const Purse = styled.dl`
  display: grid;
  gap: 12px;
  grid-area: purse;
  margin: 0;
  min-width: 148px;

  dd {
    color: ${room.ivory};
    font-size: 21px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    line-height: 1.2;
    margin: 3px 0 0;
    white-space: nowrap;
  }

  dt {
    ${plate};
    color: ${room.mist};
    font-size: 10px;
  }

  small {
    color: ${room.mist};
    font-size: 11px;
    font-weight: ${fonts.weight.semiBold};
    letter-spacing: 0.06em;
  }

  @container (max-width: ${NARROW}) {
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    dd {
      font-size: 18px;
    }
  }
`;

export const Rack = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;

  @container (max-width: ${NARROW}) {
    justify-content: center;
  }

  @container (max-width: ${COMPACT}) {
    gap: 8px;
  }
`;

export const RackChip = styled.button`
  ${focusRing};
  aspect-ratio: 1;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  filter: drop-shadow(0 5px 5px #00000073);
  flex: 0 1 56px;
  min-width: 0;
  padding: 0;
  transition:
    filter 0.15s ease,
    opacity 0.15s ease,
    transform 0.14s ease;

  &:hover:not(:disabled) {
    transform: translateY(-4px) rotate(-8deg);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.94);
  }

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.85);
    opacity: 0.32;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Result = styled.p<{$tone: OutcomeTone}>`
  align-items: baseline;
  color: ${room.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  gap: 4px 10px;
  line-height: 1.5;
  margin: 0;

  strong {
    color: ${({$tone}) => resultTones[$tone]};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
  }
`;

export const Stage = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  grid-area: stage;
  min-width: 0;
`;

export const Timer = styled.p<{$urgent: boolean}>`
  align-items: center;
  animation: ${({$urgent}) =>
    $urgent
      ? css`
          ${urgent} 1.2s ease-in-out infinite
        `
      : 'none'};
  color: ${({$urgent}) => ($urgent ? room.amber : room.mist)};
  display: flex;
  flex: 1 0 100%;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  gap: 6px;
  justify-content: center;
  line-height: 1.5;
  margin: 0;
  text-align: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Tool = styled.button`
  ${smallButton};

  @container (max-width: ${COMPACT}) {
    flex: 0 0 auto;
    min-width: 40px;
    padding: 0 9px;

    &:last-child {
      display: none;
    }
  }
`;

export const ToolLabel = styled.span`
  @container (max-width: ${COMPACT}) {
    display: none;
  }
`;

export const Tools = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @container (max-width: ${NARROW}) {
    justify-content: center;
  }

  @container (max-width: ${COMPACT}) {
    flex-wrap: nowrap;
  }
`;

export const Warning = styled.span`
  color: ${room.amber};
`;
