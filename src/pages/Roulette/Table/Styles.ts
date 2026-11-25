import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import {fonts} from 'styles';

import {focusRing, plate, room, roomPanel} from '../theme';
import {PocketColor} from '../utils';

type RibbonTone = 'hint' | 'live' | 'lost' | 'note' | 'won';

const POCKETS: Record<PocketColor, string> = {
  black: `linear-gradient(160deg, #3a4249, ${room.black} 62%)`,
  green: `linear-gradient(160deg, #2bc27c, ${room.greenDeep} 62%)`,
  red: `linear-gradient(160deg, #e64f5f, ${room.redDeep} 62%)`,
};

const dots = keyframes`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75%, 100% { content: '...'; }
`;

const plaquePop = keyframes`
  0% { opacity: 0; transform: scale(0.4) rotate(-12deg); }
  60% { opacity: 1; transform: scale(1.14) rotate(2deg); }
  100% { opacity: 1; transform: scale(1) rotate(0); }
`;

const plaqueWait = keyframes`
  0%, 100% { box-shadow: 0 0 0 3px ${room.brass}40, 0 8px 18px #00000073; }
  50% { box-shadow: 0 0 0 7px ${room.brass}1f, 0 8px 18px #00000073; }
`;

const recentIn = keyframes`
  0% { opacity: 0; transform: translateX(-10px) scale(0.6); }
  100% { opacity: 1; transform: translateX(0) scale(1); }
`;

const ribbonIn = keyframes`
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const sheen = keyframes`
  0% { background-position: 180% 0; }
  100% { background-position: -80% 0; }
`;

const spinPulse = keyframes`
  0%, 100% { box-shadow: 0 10px 22px #00000059, 0 0 0 0 ${room.brass}66; }
  50% { box-shadow: 0 10px 22px #00000059, 0 0 0 9px ${room.brass}00; }
`;

const smallButton = css`
  ${focusRing};
  align-items: center;
  background: #ffffff0d;
  border: 1px solid ${room.line};
  border-radius: 9px;
  color: ${room.ivory};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: #ffffff1c;
    border-color: ${room.brass};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const Action = styled.div`
  display: grid;
  gap: 10px;
  min-width: 0;
`;

export const ActionNote = styled.p`
  color: ${room.mist};
  font-size: 12.5px;
  line-height: 1.55;
  margin: 0;
  min-height: 19px;
`;

export const Admin = styled.div`
  margin-top: 24px;
`;

export const AmountField = styled.label`
  align-items: center;
  background: #03130e99;
  border: 1px solid ${room.rimBright};
  border-radius: 10px;
  display: flex;
  flex: 1 1 110px;
  gap: 8px;
  max-width: 240px;
  min-width: 0;
  padding: 0 12px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-within {
    border-color: ${room.brassLight};
    box-shadow: 0 0 0 3px ${room.brass}33;
  }

  span {
    ${plate};
    color: ${room.mist};
    font-size: 10px;
  }
`;

export const AmountInput = styled.input`
  background: transparent;
  border: 0;
  color: ${room.ivory};
  flex: 1;
  font-family: inherit;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  min-height: 40px;
  min-width: 0;
  outline: none;
  padding: 0;
  width: 100%;

  &:disabled {
    opacity: 0.5;
  }
`;

export const AuthButtons = styled(UAuthButtons)`
  button {
    height: 44px;
    padding: 0 20px;
  }

  button:first-child {
    background: transparent;
    border-color: ${room.rimBright};
    color: ${room.ivory};
  }

  button:first-child:hover {
    background: #ffffff14;
  }
`;

export const Balance = styled.div`
  align-items: baseline;
  background: #03130e8c;
  border: 1px solid ${room.rim};
  border-radius: 999px;
  display: inline-flex;
  gap: 7px;
  padding: 7px 14px;

  small {
    ${plate};
    color: ${room.mist};
    font-size: 10px;
  }

  span {
    color: ${room.mist};
    font-size: 11px;
    font-weight: ${fonts.weight.semiBold};
  }

  strong {
    color: ${room.brassLight};
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }
`;

export const Console = styled.section`
  ${roomPanel};
  container-type: inline-size;
  margin-bottom: 24px;
  outline: none;
  padding: 22px 28px 28px;
  scroll-margin-top: 20px;

  @media (max-width: 600px) {
    border-radius: 16px;
    padding: 18px 14px 20px;
  }
`;

// On a single-column table the spin stays within reach: this bar rides the bottom edge of the screen while the
// player moves between the wheel and the betting layout
export const Dock = styled.div`
  display: none;

  @container (max-width: 880px) {
    backdrop-filter: blur(10px);
    background: #06231ae6;
    border: 1px solid ${room.brass}80;
    border-radius: 18px;
    bottom: 10px;
    box-shadow: 0 -10px 26px #00000066;
    display: block;
    margin-top: 16px;
    padding: 10px 12px;
    position: sticky;
    z-index: 6;
  }
`;

export const Dots = styled.span`
  display: inline-block;
  text-align: left;
  width: 1.2em;

  &::after {
    animation: ${dots} 1.2s steps(1) infinite;
    content: '';
  }
`;

export const Error = styled.p`
  background: linear-gradient(90deg, #4a1a1c, #2a1517);
  border: 1px solid #ff8f7d59;
  border-radius: 12px;
  color: #ffdcd5;
  font-size: 13.5px;
  line-height: 1.6;
  margin: 0;
  padding: 12px 14px;
`;

export const Eyebrow = styled.p`
  ${plate};
  color: ${room.brass};
  margin: 0 0 6px;
`;

export const FeltColumn = styled.div`
  display: grid;
  gap: 14px;
  min-width: 0;
`;

export const GhostButton = styled.button`
  ${smallButton};
  justify-self: start;
  min-height: 40px;
  padding: 0 16px;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 14px 20px;
  justify-content: space-between;
  margin-bottom: 22px;
`;

export const Panels = styled.div`
  align-items: stretch;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const Plaque = styled.div<{$color: PocketColor | null; $spinning: boolean}>`
  align-items: center;
  background: ${({$color}) => ($color ? POCKETS[$color] : 'linear-gradient(160deg, #134b39, #082a1f)')};
  border: 2px solid ${room.brassLight};
  border-radius: 50%;
  box-shadow:
    0 0 0 3px ${room.brass}40,
    0 8px 18px #00000073;
  color: ${({$color}) => ($color ? '#ffffff' : room.brass)};
  display: flex;
  flex: 0 0 auto;
  font-size: 27px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  height: 62px;
  justify-content: center;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 3px #00000080;
  width: 62px;

  ${({$color}) =>
    $color &&
    css`
      animation: ${plaquePop} 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
    `}

  ${({$spinning}) =>
    $spinning &&
    css`
      animation: ${plaqueWait} 1.1s ease-in-out infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Play = styled.div`
  align-items: start;
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(260px, 400px) minmax(580px, 1fr);

  @container (max-width: 880px) {
    gap: 22px;
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Quick = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const QuickButton = styled.button`
  ${smallButton};
  font-size: 12.5px;
  min-height: 30px;
  padding: 0 9px;
`;

export const Rack = styled.div`
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

export const RackChip = styled.button<{$selected: boolean}>`
  ${focusRing};
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition:
    filter 0.18s ease,
    transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.3);
  width: 46px;

  &::after {
    border: 2px solid ${room.brassLight};
    border-radius: 50%;
    box-shadow: 0 0 14px ${room.brass}b3;
    content: '';
    inset: -5px;
    opacity: ${({$selected}) => ($selected ? 1 : 0)};
    position: absolute;
    transition: opacity 0.18s ease;
  }

  &:hover {
    transform: translateY(-3px);
  }

  ${({$selected}) =>
    $selected
      ? css`
          transform: translateY(-5px);

          &:hover {
            transform: translateY(-5px);
          }
        `
      : css`
          filter: saturate(0.8) brightness(0.82);
        `}

  @media (max-width: 600px) {
    width: 42px;
  }
`;

// The padded rail along the player's edge of the table: chips, the bet, and the spin
export const Rail = styled.div`
  align-items: center;
  background: linear-gradient(180deg, #0a2e22, #06211800);
  border: 1px solid ${room.rim};
  border-radius: 16px;
  display: grid;
  gap: 18px 22px;
  grid-template-columns: 156px minmax(0, 1.3fr) minmax(0, 1fr);
  padding: 18px;

  @container (max-width: 880px) {
    grid-template-columns: 156px minmax(0, 1fr);
  }

  @container (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);

    ${Rack} {
      justify-content: flex-start;
    }
  }

  @media (max-width: 600px) {
    padding: 14px;
  }
`;

export const RailAction = styled.div`
  min-width: 0;

  @container (max-width: 880px) {
    display: none;
  }
`;

export const Recent = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  min-height: 30px;

  @container (max-width: 880px) and (min-width: 600px) {
    align-self: start;
    justify-content: flex-start;
  }
`;

export const RecentEmpty = styled.span`
  color: ${room.mist};
  font-size: 12.5px;
`;

export const RecentNumber = styled.span<{$color: PocketColor; $latest: boolean}>`
  align-items: center;
  background: ${({$color}) => POCKETS[$color]};
  border: 1px solid ${({$latest}) => ($latest ? room.brassLight : '#ffffff2e')};
  border-radius: 7px;
  color: #ffffff;
  display: inline-flex;
  font-size: ${({$latest}) => ($latest ? '14px' : '12px')};
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  height: ${({$latest}) => ($latest ? '30px' : '25px')};
  justify-content: center;
  min-width: ${({$latest}) => ($latest ? '30px' : '25px')};
  padding: 0 4px;

  ${({$latest}) =>
    $latest &&
    css`
      animation: ${recentIn} 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Result = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  justify-content: center;
  width: 100%;

  @container (max-width: 880px) and (min-width: 600px) {
    align-self: end;
    justify-content: flex-start;
  }
`;

export const ResultCopy = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;

  span {
    color: ${room.mist};
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }

  strong {
    color: ${room.ivory};
    font-size: 16px;
    letter-spacing: -0.01em;
  }
`;

export const Ribbon = styled.p<{$tone: RibbonTone}>`
  animation: ${ribbonIn} 0.3s ease both;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 10px 14px;
  text-align: center;

  ${({$tone}) => {
    switch ($tone) {
      case 'won':
        return css`
          animation:
            ${ribbonIn} 0.3s ease both,
            ${sheen} 2.2s linear 0.3s 2;
          background:
            linear-gradient(105deg, transparent 38%, #ffffff66 50%, transparent 62%) 180% 0 / 250% 100% no-repeat,
            linear-gradient(180deg, ${room.brassLight}, ${room.brass});
          color: ${room.ink};
          font-size: 15px;
          font-weight: ${fonts.weight.bold};
        `;
      case 'lost':
        return css`
          background: #ffffff0d;
          border: 1px solid ${room.line};
          color: ${room.ivory};
          font-weight: ${fonts.weight.semiBold};
        `;
      case 'live':
        return css`
          ${plate};
          background: #03130e99;
          border: 1px solid ${room.brass}80;
          color: ${room.brassLight};
          font-size: 12px;
          padding: 12px 14px;
        `;
      case 'note':
        return css`
          background: ${room.brassSoft};
          border: 1px solid ${room.brass}66;
          color: ${room.brassLight};
        `;
      default:
        return css`
          border: 1px dashed ${room.line};
          color: ${room.mist};
        `;
    }
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const RibbonSlot = styled.div`
  min-height: 44px;
`;

export const Slip = styled.div`
  display: grid;
  gap: 10px;
  min-width: 0;
`;

export const SlipHeader = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
`;

export const SlipLabel = styled.span`
  ${plate};
  color: ${room.brass};
  font-size: 10px;
`;

export const SlipNote = styled.p`
  color: ${room.mist};
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
`;

export const SlipSpot = styled.strong`
  color: ${room.ivory};
  font-size: 15px;
`;

export const SpinButton = styled.button<{$spinning?: boolean}>`
  ${focusRing};
  animation: ${spinPulse} 2.4s ease-in-out infinite;
  background:
    linear-gradient(105deg, transparent 40%, #ffffff59 50%, transparent 60%) 180% 0 / 250% 100% no-repeat,
    linear-gradient(180deg, ${room.brassLight}, ${room.brass} 55%, #c2983f);
  border: 1px solid ${room.brassLight};
  border-radius: 14px;
  box-shadow: 0 10px 22px #00000059;
  color: ${room.ink};
  cursor: pointer;
  font-family: inherit;
  font-size: 17px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: 0.02em;
  line-height: 1.25;
  min-height: 58px;
  padding: 6px 16px;
  transition:
    filter 0.15s ease,
    transform 0.15s ease;
  width: 100%;

  &:hover:not(:disabled) {
    animation:
      ${spinPulse} 2.4s ease-in-out infinite,
      ${sheen} 0.9s ease;
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px) scale(0.99);
  }

  &:disabled {
    animation: none;
    box-shadow: none;
    cursor: not-allowed;
    filter: saturate(0.35) brightness(0.72);
  }

  ${({$spinning}) =>
    $spinning &&
    css`
      &:disabled {
        ${plate};
        background: #03130e99;
        border-color: ${room.brass}80;
        color: ${room.brassLight};
        cursor: progress;
        filter: none;
        font-size: 13px;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Status = styled.span<{$open: boolean}>`
  ${plate};
  align-items: center;
  background: #03130e8c;
  border: 1px solid ${room.rim};
  border-radius: 999px;
  color: ${({$open}) => ($open ? room.mint : room.mist)};
  display: inline-flex;
  font-size: 10px;
  gap: 8px;
  padding: 8px 13px;

  &::before {
    background: ${({$open}) => ($open ? room.mint : room.mist)};
    border-radius: 50%;
    box-shadow: ${({$open}) => ($open ? `0 0 8px ${room.mint}` : 'none')};
    content: '';
    height: 7px;
    width: 7px;
  }
`;

export const StepButton = styled.button`
  ${smallButton};
  flex: 0 0 auto;
  font-size: 20px;
  min-height: 42px;
  padding: 0;
  width: 42px;
`;

export const Stepper = styled.div`
  display: flex;
  gap: 8px;
`;

export const Title = styled.h2`
  color: ${room.ivory};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;
`;

export const Toggle = styled.button<{$active: boolean}>`
  ${focusRing};
  align-items: center;
  background: ${({$active}) => ($active ? room.brassSoft : '#03130e8c')};
  border: 1px solid ${({$active}) => ($active ? room.brass : room.rim)};
  border-radius: 50%;
  color: ${({$active}) => ($active ? room.brassLight : room.mist)};
  cursor: pointer;
  display: inline-flex;
  height: 36px;
  justify-content: center;
  padding: 0;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  width: 36px;

  &:hover {
    border-color: ${room.brassLight};
    color: ${room.brassLight};
  }
`;

export const Tools = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const WheelColumn = styled.div`
  display: grid;
  gap: 18px;
  justify-items: center;
  min-width: 0;

  /* A single-column table with room to spare: the result sits beside the wheel instead of under it */
  @container (max-width: 880px) and (min-width: 600px) {
    column-gap: 36px;
    grid-template-columns: minmax(0, 300px) minmax(0, 300px);
    justify-content: center;
  }
`;

export const WheelFrame = styled.div`
  max-width: 400px;
  padding: 4px;
  width: 100%;

  @container (max-width: 880px) {
    max-width: 340px;
  }

  @container (max-width: 880px) and (min-width: 600px) {
    grid-row: 1 / span 2;
  }
`;
