import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import {fonts} from 'styles';

import {focusRing, plate, table, tablePanel} from '../theme';

type RibbonTone = 'hint' | 'live' | 'lost' | 'won';
type SpotState = 'deciding' | 'empty' | 'lost' | 'pulled' | 'riding' | 'waiting' | 'won';

const callPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 ${table.gold}80, inset 0 0 18px #00000040; }
  50% { box-shadow: 0 0 0 9px ${table.gold}00, inset 0 0 18px #00000040; }
`;

const chipDrop = keyframes`
  0% { opacity: 0; transform: translate(-50%, -80%) scale(1.15); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const feltWin = keyframes`
  0%, 100% { border-color: ${table.rimBright}; }
  30%, 70% { border-color: ${table.goldLight}; }
`;

const ribbonIn = keyframes`
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const wonGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 2px ${table.win}66, 0 0 18px ${table.win}40; }
  50% { box-shadow: 0 0 0 5px ${table.win}26, 0 0 26px ${table.win}66; }
`;

const smallButton = css`
  ${focusRing};
  align-items: center;
  background: #ffffff0d;
  border: 1px solid ${table.line};
  border-radius: 9px;
  color: ${table.ivory};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: center;
  min-height: 36px;
  padding: 0 12px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: #ffffff1c;
    border-color: ${table.gold};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const Admin = styled.div`
  margin-top: 24px;
`;

export const Advice = styled.p`
  align-items: center;
  color: ${table.goldLight};
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 7px;
  line-height: 1.5;
  margin: 0;
`;

// The site's secondary button is drawn for light pages: on the dark rail Sign In takes the table's own outline
export const AuthButtons = styled(UAuthButtons)`
  justify-content: flex-start;

  button {
    height: 44px;
    padding: 0 20px;
  }

  button:first-child {
    background: transparent;
    border-color: ${table.rimBright};
    color: ${table.ivory};
  }

  button:first-child:hover {
    background: #ffffff14;
  }
`;

export const Balance = styled.div`
  align-items: baseline;
  background: #050e2499;
  border: 1px solid ${table.rim};
  border-radius: 10px;
  display: flex;
  gap: 7px;
  min-height: 38px;
  padding: 7px 12px;

  small {
    ${plate};
    color: ${table.mist};
    font-size: 10px;
  }

  span {
    color: ${table.mist};
    font-size: 11px;
    font-weight: ${fonts.weight.bold};
  }

  strong {
    color: ${table.goldLight};
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
  }
`;

export const BetLabel = styled.span`
  ${plate};
  color: ${table.mist};
`;

export const BetRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
`;

export const BetValue = styled.span`
  color: ${table.ivory};
  font-size: 20px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  min-width: 88px;
  text-align: center;

  span {
    ${plate};
    color: ${table.mist};
    font-size: 10px;
  }
`;

export const Cards = styled.div`
  display: flex;
  gap: clamp(6px, 1.4vw, 12px);
  justify-content: center;
`;

export const ChoiceButton = styled.button<{$primary?: boolean; $suggested?: boolean}>`
  ${focusRing};
  align-items: center;
  background: ${({$primary}) =>
    $primary ? `linear-gradient(180deg, ${table.goldLight}, ${table.gold})` : '#ffffff12'};
  border: 1px solid ${({$primary}) => ($primary ? table.goldLight : table.lineStrong)};
  border-radius: 12px;
  box-shadow: ${({$suggested}) => ($suggested ? `0 0 0 3px ${table.win}8c` : 'none')};
  color: ${({$primary}) => ($primary ? table.ink : table.ivory)};
  cursor: pointer;
  display: flex;
  flex: 1 1 150px;
  flex-direction: column;
  font-family: inherit;
  font-size: 17px;
  font-weight: ${fonts.weight.bold};
  gap: 2px;
  justify-content: center;
  letter-spacing: -0.01em;
  min-height: 62px;
  padding: 8px 14px;
  transition:
    filter 0.15s ease,
    transform 0.1s ease;

  small {
    font-size: 12px;
    font-weight: ${fonts.weight.semiBold};
    letter-spacing: 0;
    opacity: 0.78;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const Choices = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Circle = styled.span<{$state: SpotState}>`
  align-items: center;
  border: 2px ${({$state}) => ($state === 'pulled' || $state === 'lost' ? 'dashed' : 'solid')}
    ${({$state}) => ($state === 'deciding' ? table.goldLight : `${table.gold}99`)};
  border-radius: 50%;
  box-shadow: inset 0 0 18px #00000040;
  display: flex;
  height: var(--spot-size);
  justify-content: center;
  position: relative;
  width: var(--spot-size);

  ${({$state}) =>
    $state === 'deciding' &&
    css`
      animation: ${callPulse} 1.5s ease-in-out infinite;
    `}

  ${({$state}) =>
    $state === 'won' &&
    css`
      animation: ${wonGlow} 1.4s ease-in-out 3;
      border-color: ${table.win};
    `}

  b {
    color: ${table.gold};
    font-family: Georgia, 'Times New Roman', serif;
    font-size: calc(var(--spot-size) * 0.42);
    font-weight: ${fonts.weight.bold};
    opacity: ${({$state}) => ($state === 'pulled' || $state === 'lost' ? 0.55 : 0.3)};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Console = styled.section`
  ${tablePanel};
  padding: 22px 26px 26px;

  &:focus-visible {
    outline: 2px solid ${table.goldLight};
    outline-offset: 4px;
  }

  @media (max-width: 600px) {
    border-radius: 16px;
    padding: 18px 14px 20px;
  }
`;

export const Deal = styled.div`
  display: grid;
  gap: clamp(12px, 2.2vw, 20px);
`;

export const DealButton = styled.button`
  ${focusRing};
  background: linear-gradient(180deg, ${table.goldLight}, ${table.gold});
  border: 1px solid ${table.goldLight};
  border-radius: 12px;
  box-shadow: 0 10px 22px #00000059;
  color: ${table.ink};
  cursor: pointer;
  font-family: inherit;
  font-size: 17px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  min-height: 54px;
  padding: 0 22px;
  transition:
    filter 0.15s ease,
    transform 0.1s ease;
  width: 100%;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background: #ffffff14;
    border-color: ${table.line};
    box-shadow: none;
    color: ${table.mist};
    cursor: not-allowed;
  }
`;

export const Error = styled.p`
  background: #c6323f26;
  border: 1px solid #ff9d8f66;
  border-radius: 10px;
  color: #ffd2cb;
  font-size: 13px;
  line-height: 1.55;
  margin: 0;
  padding: 10px 12px;
`;

export const Eyebrow = styled.p`
  ${plate};
  color: ${table.gold};
  margin: 0 0 4px;
`;

export const Felt = styled.div<{$won: boolean}>`
  --card-width: clamp(54px, 9.6vw, 96px);
  --spot-size: clamp(58px, 9vw, 82px);
  background:
    radial-gradient(90% 70% at 50% 38%, ${table.feltBright}, transparent 70%),
    linear-gradient(180deg, ${table.felt}, ${table.feltDeep});
  border: 1px solid ${table.rimBright};
  border-radius: 20px 20px 46% 46% / 20px 20px 16% 16%;
  box-shadow:
    inset 0 0 0 6px #0a1a40,
    inset 0 0 0 7px ${table.gold}59,
    inset 0 -30px 60px #00000040;
  display: grid;
  gap: clamp(12px, 2vw, 18px);
  justify-items: center;
  overflow: hidden;
  padding: clamp(20px, 3vw, 30px) clamp(12px, 2.4vw, 26px) clamp(30px, 5vw, 46px);
  position: relative;
  scroll-margin-top: 12px;

  ${({$won}) =>
    $won &&
    css`
      animation: ${feltWin} 1.8s ease-in-out 2;
    `}

  @media (max-width: 600px) {
    border-radius: 16px 16px 32% 32% / 16px 16px 9% 9%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const FeltColumn = styled.div`
  display: grid;
  gap: 16px;
  min-width: 0;
`;

export const GhostButton = styled.button`
  ${smallButton};
  justify-self: start;
`;

export const Group = styled.div`
  display: grid;
  gap: 14px;
  justify-items: center;
`;

export const GroupLabel = styled.span`
  ${plate};
  color: ${table.goldLight};
  font-size: 10px;
  opacity: 0.85;
`;

export const Header = styled.header`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 14px 20px;
  justify-content: space-between;
  margin-bottom: 18px;
`;

// The lettering printed along the player's edge of the felt
export const Marque = styled.span`
  color: ${table.gold};
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(11px, 1.5vw, 14px);
  font-style: italic;
  letter-spacing: 0.24em;
  opacity: 0.6;
  text-align: center;
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;

  @media (max-width: 600px) {
    letter-spacing: 0.12em;
  }
`;

export const Note = styled.p`
  color: ${table.mist};
  font-size: 12.5px;
  line-height: 1.6;
  margin: 0;
`;

export const Outcome = styled.div<{$won: boolean}>`
  animation: ${ribbonIn} 0.3s ease both;
  background: ${({$won}) => ($won ? '#7fe3b01f' : '#ffffff0d')};
  border: 1px solid ${({$won}) => ($won ? `${table.win}80` : table.line)};
  border-radius: 12px;
  display: grid;
  gap: 2px;
  padding: 11px 14px;

  span {
    color: ${table.mist};
    font-size: 12.5px;
    line-height: 1.5;
  }

  strong {
    color: ${({$won}) => ($won ? table.win : table.ivory)};
    font-size: 17px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    letter-spacing: -0.01em;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Panels = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  margin-top: 24px;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Play = styled.div`
  align-items: start;
  display: grid;
  gap: 22px;
  grid-template-columns: minmax(0, 1.7fr) minmax(240px, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Prompt = styled.p`
  color: ${table.ivory};
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  margin: 0;
`;

export const Rack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const RackButton = styled.button<{$selected?: boolean}>`
  ${smallButton};
  background: ${({$selected}) => ($selected ? table.goldSoft : '#ffffff0d')};
  border-color: ${({$selected}) => ($selected ? table.gold : table.line)};
  color: ${({$selected}) => ($selected ? table.goldLight : table.ivory)};
  font-variant-numeric: tabular-nums;
  min-width: 42px;
`;

export const Rail = styled.div`
  background: #050e2466;
  border: 1px solid ${table.rim};
  border-radius: 16px;
  display: grid;
  gap: 12px;
  padding: 16px 18px 18px;

  @media (max-width: 600px) {
    padding: 14px;
  }
`;

export const Ribbon = styled.p<{$tone: RibbonTone}>`
  animation: ${ribbonIn} 0.25s ease both;
  background: ${({$tone}) => ($tone === 'won' ? '#0b2a1fcc' : '#050e24b3')};
  border: 1px solid
    ${({$tone}) => {
      if ($tone === 'won') return table.win;
      if ($tone === 'lost') return `${table.loss}80`;
      return $tone === 'live' ? `${table.gold}99` : table.line;
    }};
  border-radius: 999px;
  color: ${({$tone}) => {
    if ($tone === 'won') return table.win;
    if ($tone === 'lost') return '#ffd2cb';
    return $tone === 'live' ? table.goldLight : table.mist;
  }};
  font-size: 13.5px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  margin: 0;
  padding: 7px 16px;
  text-align: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const RibbonSlot = styled.div`
  display: flex;
  justify-content: center;
  min-height: 36px;
  position: relative;
`;

export const Spot = styled.div<{$state: SpotState}>`
  display: grid;
  gap: 6px;
  justify-items: center;
  opacity: ${({$state}) => ($state === 'empty' ? 0.85 : 1)};
`;

export const SpotCaption = styled.span`
  ${plate};
  color: ${table.goldLight};
  font-size: 10px;
  opacity: 0.85;
`;

export const SpotChip = styled.span<{$ghost: boolean}>`
  --chip-size: calc(var(--spot-size) * 0.74);
  animation: ${chipDrop} 0.3s ease both;
  left: 50%;
  opacity: ${({$ghost}) => ($ghost ? 0.45 : 1)};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SpotNote = styled.span<{$state: SpotState}>`
  ${plate};
  color: ${({$state}) => {
    if ($state === 'won') return table.win;
    if ($state === 'lost') return table.loss;
    if ($state === 'deciding') return table.goldLight;
    return table.mist;
  }};
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  text-align: center;
`;

export const Spots = styled.div`
  display: flex;
  gap: clamp(14px, 4vw, 38px);
  justify-content: center;
  position: relative;
`;

export const Status = styled.span<{$open: boolean}>`
  ${plate};
  align-items: center;
  background: #050e2499;
  border: 1px solid ${({$open}) => ($open ? `${table.win}80` : table.line)};
  border-radius: 999px;
  color: ${({$open}) => ($open ? table.win : table.mist)};
  display: inline-flex;
  font-size: 10px;
  gap: 7px;
  min-height: 30px;
  padding: 0 12px;

  &::before {
    background: currentColor;
    border-radius: 50%;
    content: '';
    height: 6px;
    width: 6px;
  }
`;

export const StepButton = styled.button`
  ${smallButton};
  font-size: 20px;
  min-height: 40px;
  min-width: 40px;
  padding: 0;
`;

export const Stepper = styled.div`
  align-items: center;
  background: #050e2499;
  border: 1px solid ${table.rimBright};
  border-radius: 12px;
  display: flex;
  gap: 4px;
  padding: 4px;
`;

export const TextLink = styled(Link)`
  color: ${table.goldLight};
  font-weight: ${fonts.weight.semiBold};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${table.ivory};
  }
`;

export const Title = styled.h2`
  color: ${table.ivory};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;
`;

export const Toggle = styled.button<{$active: boolean}>`
  ${smallButton};
  background: ${({$active}) => ($active ? table.goldSoft : '#ffffff0d')};
  border-color: ${({$active}) => ($active ? table.gold : table.line)};
  color: ${({$active}) => ($active ? table.goldLight : table.mist)};
  gap: 6px;
  min-height: 38px;
`;

export const Tools = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
