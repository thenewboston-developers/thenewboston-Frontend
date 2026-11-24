import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import UAvatar from 'components/Avatar';
import {fonts, pagePadding} from 'styles';

import {naval, navalConsole, navalMono, readout} from './theme';

export type CellState = 'hit' | 'miss' | 'ship' | 'sunk' | 'water';
export type StatusTone = 'deploy' | 'fire' | 'wait';

const CELL_BACKGROUNDS: Record<CellState, string> = {
  hit: 'radial-gradient(circle, #ffc27a 0%, #f2703a 55%, #8f2f17 100%)',
  miss: `radial-gradient(circle, ${naval.sonar} 0 13%, #64d2ec40 16%, transparent 34%), #0a2034`,
  ship: 'linear-gradient(180deg, #4b7a98, #2c5169)',
  sunk: 'radial-gradient(circle, #7a3124, #3a1c1c 85%)',
  water: '#0a2034',
};

const CELL_BORDERS: Record<CellState, string> = {
  hit: '#ffb27a',
  miss: '#1c3a52',
  ship: '#6c9ab7',
  sunk: '#a2483a',
  water: '#1c3a52',
};

const STATUS_TONES: Record<StatusTone, string> = {deploy: naval.gold, fire: naval.amber, wait: naval.sonar};

const impactBurst = keyframes`
  0% { opacity: 0; transform: scale(0.15) rotate(-25deg); }
  18% { opacity: 1; transform: scale(1.3) rotate(10deg); }
  65% { opacity: 0.65; }
  100% { opacity: 0; transform: scale(2.1) rotate(35deg); }
`;

const impactRing = keyframes`
  0% { opacity: 1; transform: scale(0.25); }
  100% { opacity: 0; transform: scale(2.8); }
`;

const impactSparks = keyframes`
  0% { opacity: 1; transform: scale(0.2) rotate(0); }
  70% { opacity: 0.8; }
  100% { opacity: 0; transform: scale(2.3) rotate(35deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 #64d2ec8c; }
  100% { box-shadow: 0 0 0 10px #64d2ec00; }
`;

// Short strips and cards keep the console surface but drop the HUD corner brackets, which crowd them
const compactConsole = css`
  ${navalConsole};

  &::after {
    display: none;
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const AuthButtons = styled(UAuthButtons)`
  button {
    height: 44px;
    padding: 0 20px;
  }

  button:first-child {
    background: transparent;
    border-color: ${naval.steelBright};
    color: ${naval.ice};
  }

  button:first-child:hover {
    background: #ffffff14;
  }
`;

export const Avatar = styled(UAvatar)<{$active: boolean}>`
  border-radius: 50%;
  box-shadow:
    0 0 0 2px ${naval.deep},
    0 0 0 3px ${({$active}) => ($active ? naval.sonar : naval.steelBright)};
  flex-shrink: 0;
`;

export const Badge = styled.span`
  ${readout};
  align-items: center;
  background: ${naval.hull};
  border: 1px solid ${naval.steel};
  border-radius: 999px;
  color: ${naval.mist};
  display: inline-flex;
  font-size: 10px;
  gap: 6px;
  padding: 7px 12px;
`;

export const BoardFrame = styled.div`
  ${navalConsole};
  min-width: 0;
  padding: 22px 24px 18px;
  width: 100%;

  @media (max-width: 550px) {
    border-radius: 14px;
    padding: 12px 10px;

    &::after {
      display: none;
    }
  }
`;

export const BoardGrid = styled.div`
  display: grid;
  gap: 3px;
  grid-template-columns: 18px repeat(10, minmax(0, 1fr));
`;

export const BoardLabel = styled.span`
  align-items: center;
  color: ${naval.fog};
  display: flex;
  font-family: ${navalMono};
  font-size: clamp(9px, 1vw, 11px);
  font-variant-numeric: tabular-nums;
  justify-content: center;
  min-height: 18px;
`;

export const BoardTitle = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  margin-bottom: 14px;

  h2 {
    color: ${naval.ice};
    font-size: 17px;
    font-weight: ${fonts.weight.bold};
    letter-spacing: -0.01em;
    margin: 0;
  }

  span {
    ${readout};
    border: 1px solid ${naval.steel};
    border-radius: 999px;
    color: ${naval.mist};
    font-size: 10px;
    padding: 5px 10px;
  }
`;

export const Button = styled.button<{$danger?: boolean; $secondary?: boolean}>`
  align-items: center;
  background: ${({$danger, $secondary}) => {
    if ($secondary) return naval.hull;
    return $danger ? '#4a1c14' : 'linear-gradient(180deg, #ffbd86, #ff9d55)';
  }};
  border: 1px solid
    ${({$danger, $secondary}) => {
      if ($secondary) return naval.steelBright;
      return $danger ? '#ff7a4d99' : '#ffc89c';
    }};
  border-radius: 12px;
  box-shadow: ${({$danger, $secondary}) =>
    $danger || $secondary ? 'none' : '0 10px 24px #ff8c4026, inset 0 1px 0 #ffffff66'};
  color: ${({$danger, $secondary}) => {
    if ($secondary) return naval.ice;
    return $danger ? '#ffd2bd' : naval.ink;
  }};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  min-height: 44px;
  padding: 11px 18px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    filter 0.15s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({$danger, $secondary}) => ($secondary || $danger ? naval.amberLight : '#ffc89c')};
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid ${naval.amberLight};
    outline-offset: 3px;
  }
`;

export const Calm = styled.div`
  ${navalConsole};
  align-items: center;
  display: flex;
  gap: 20px;
  margin-top: 24px;
  padding: 24px 28px;

  @media (max-width: 600px) {
    padding: 22px 20px;
  }
`;

export const CalmCopy = styled.div`
  strong {
    color: ${naval.ice};
    display: block;
    font-size: 16px;
    margin-bottom: 4px;
  }

  p {
    color: ${naval.mist};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

export const CalmLink = styled(Link)`
  color: ${naval.amberLight};
  font-weight: ${fonts.weight.semiBold};
  white-space: nowrap;

  &:hover {
    color: ${naval.amber};
  }
`;

export const Caption = styled.span`
  ${readout};
  color: ${naval.fog};
  font-size: 9px;
`;

export const Cell = styled.button<{
  $aim?: boolean;
  $invalid?: boolean;
  $preview?: boolean;
  $selected?: boolean;
  $state: CellState;
}>`
  align-items: center;
  aspect-ratio: 1;
  background: ${({$invalid, $preview, $state}) => {
    if ($invalid) return '#ff5a5a40';
    if ($preview) return '#64d2ec4d';
    return CELL_BACKGROUNDS[$state];
  }};
  border: 1px solid
    ${({$invalid, $preview, $selected, $state}) => {
      if ($selected) return naval.amberLight;
      if ($invalid) return '#ff8a8a';
      if ($preview) return naval.sonar;
      return CELL_BORDERS[$state];
    }};
  border-radius: 4px;
  box-shadow: ${({$selected, $state}) => {
    if ($selected) return `inset 0 0 0 2px ${naval.amberLight}`;
    if ($state === 'hit') return '0 0 12px #ff8c4059';
    if ($state === 'ship') return 'inset 0 1px 0 #ffffff26';
    return 'none';
  }};
  color: ${({$state}) => ($state === 'sunk' ? '#ffc2b0' : naval.ice)};
  cursor: pointer;
  display: flex;
  font-size: clamp(12px, 2vw, 22px);
  font-weight: ${fonts.weight.bold};
  justify-content: center;
  min-width: 0;
  padding: 0;
  position: relative;
  touch-action: manipulation;
  transition:
    background 0.12s ease,
    border-color 0.12s ease;

  &:disabled {
    cursor: default;
  }

  &:hover:not(:disabled) {
    background: ${({$aim}) => ($aim ? '#ffad6a24' : '#33607f')};
    border-color: ${({$aim}) => ($aim ? naval.amber : naval.amberLight)};
  }

  ${({$aim}) =>
    $aim &&
    css`
      cursor: crosshair;

      &:hover:not(:disabled)::before {
        background:
          linear-gradient(${naval.amber}, ${naval.amber}) center / 1px 64% no-repeat,
          linear-gradient(${naval.amber}, ${naval.amber}) center / 64% 1px no-repeat;
        content: '';
        inset: 0;
        position: absolute;
      }

      &:hover:not(:disabled)::after {
        border: 1px solid ${naval.amberLight};
        border-radius: 50%;
        content: '';
        inset: 24%;
        position: absolute;
      }
    `}

  &:focus-visible {
    outline: 2px solid ${naval.amberLight};
    outline-offset: 1px;
    z-index: 1;
  }
`;

export const Clock = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 2px;
`;

export const ClockLabel = styled.span<{$active: boolean}>`
  ${readout};
  align-items: center;
  color: ${({$active}) => ($active ? naval.sonar : naval.fog)};
  display: inline-flex;
  font-size: 9px;
  gap: 6px;

  ${({$active}) =>
    $active &&
    css`
      &::before {
        animation: ${pulse} 1.6s ease-out infinite;
        background: currentColor;
        border-radius: 50%;
        content: '';
        height: 6px;
        width: 6px;
      }

      @media (prefers-reduced-motion: reduce) {
        &::before {
          animation: none;
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

export const Deadline = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: auto;
`;

export const Detail = styled.p`
  color: ${naval.mist};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`;

export const Error = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #3b1a12, #1d1519);
  border: 1px solid #ff7a4d66;
  border-radius: 14px;
  color: #ffdccb;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 20px 0;
  padding: 14px 18px;

  p {
    color: inherit;
    flex-basis: 100%;
    margin: 0;
    opacity: 0.8;
  }
`;

export const Fleet = styled.div`
  display: grid;
  gap: 8px;
  margin: 18px 0;
`;

export const FleetButton = styled(Button)<{$placed: boolean; $selected: boolean}>`
  background: ${({$selected}) => ($selected ? 'linear-gradient(180deg, #64d2ec1f, #64d2ec08)' : '#081a2dcc')};
  border-color: ${({$selected}) => ($selected ? naval.sonar : naval.steel)};
  box-shadow: ${({$selected}) => ($selected ? `inset 0 0 0 1px ${naval.sonar}, 0 0 22px #64d2ec1f` : 'none')};
  color: ${naval.ice};
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(0, 1fr) auto 18px;
  justify-content: stretch;
  min-height: 48px;
  padding: 10px 14px;
  text-align: left;

  i {
    background: ${({$placed}) => ($placed ? naval.sonar : 'transparent')};
    border: 1px ${({$placed}) => ($placed ? 'solid' : 'dashed')} ${({$placed}) => ($placed ? naval.sonar : '#6f94ad')};
    border-radius: 2px;
    box-shadow: ${({$placed}) => ($placed ? '0 0 8px #64d2ec59' : 'none')};
    display: block;
    height: 10px;
    width: 10px;
  }

  &:hover:not(:disabled) {
    border-color: ${({$selected}) => ($selected ? naval.sonar : naval.steelBright)};
    filter: none;
  }
`;

export const FleetCheck = styled.span`
  color: ${naval.kelp};
  font-size: 14px;
  text-align: right;
`;

export const FleetName = styled.span`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
`;

export const GhostButton = styled.button`
  ${readout};
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  color: inherit;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #ffffff14;
  }

  &:focus-visible {
    outline: 2px solid ${naval.amberLight};
    outline-offset: 3px;
  }
`;

export const Hull = styled.span`
  display: inline-flex;
  gap: 3px;
`;

export const LastShot = styled.p<{$result: 'hit' | 'miss' | 'sunk'}>`
  ${compactConsole};
  align-items: center;
  border-radius: 14px;
  color: ${naval.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 4px 10px;
  margin: 0 0 16px;
  padding: 10px 16px;

  span {
    ${readout};
    background: ${({$result}) => ($result === 'miss' ? '#64d2ec1f' : '#ffad6a24')};
    border: 1px solid ${({$result}) => ($result === 'miss' ? '#64d2ec66' : '#ffad6a73')};
    border-radius: 999px;
    color: ${({$result}) => ($result === 'miss' ? naval.sonar : naval.amberLight)};
    font-size: 9px;
    padding: 4px 9px;
  }
`;

export const LaunchButton = styled(Button)`
  font-size: 15px;
  gap: 10px;
  min-height: 50px;
  width: 100%;
`;

export const Legend = styled.div`
  ${readout};
  color: ${naval.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 9px;
  gap: 8px 16px;
  margin-top: 12px;

  span {
    align-items: center;
    display: inline-flex;
    gap: 6px;
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

export const Panel = styled.section`
  ${navalConsole};
  min-width: 0;
  padding: 26px 28px;
  scroll-margin-top: 24px;

  @media (max-width: 600px) {
    padding: 22px 20px;
  }
`;

export const PanelActions = styled(Actions)`
  margin-top: 20px;
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

export const PanelHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 14px;
  margin-bottom: 14px;

  h2 {
    margin: 0;
  }
`;

export const Player = styled.div<{$active: boolean}>`
  ${compactConsole};
  align-items: center;
  border-color: ${({$active}) => ($active ? naval.sonar : naval.steel)};
  box-shadow: ${({$active}) =>
    $active ? `inset 0 0 0 1px ${naval.sonar}, 0 0 26px #64d2ec26` : '0 18px 42px #0613231f, inset 0 1px 0 #ffffff0a'};
  display: flex;
  gap: 14px;
  min-width: 0;
  padding: 16px 20px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
`;

export const PlayerIdentity = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    color: ${naval.ice};
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    strong {
      overflow-wrap: anywhere;
      white-space: normal;
    }
  }
`;

export const ResignBar = styled.div<{$confirming: boolean}>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  justify-content: ${({$confirming}) => ($confirming ? 'space-between' : 'flex-end')};
  margin-top: 24px;

  ${({$confirming}) =>
    $confirming &&
    css`
      ${compactConsole};
      border-color: #ff7a4d66;
      padding: 16px 20px;
    `}
`;

export const Rules = styled.details`
  ${navalConsole};
  color: ${naval.mist};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 28px;

  &:not([open])::after {
    display: none;
  }

  summary {
    align-items: center;
    color: ${naval.ice};
    cursor: pointer;
    display: flex;
    font-weight: ${fonts.weight.semiBold};
    gap: 14px;
    list-style: none;
    min-height: 32px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    background: radial-gradient(circle, ${naval.sonar} 0 2px, transparent 3px);
    border: 1px solid #64d2ec8c;
    border-radius: 50%;
    box-shadow: 0 0 12px #64d2ec33;
    content: '';
    flex-shrink: 0;
    height: 24px;
    width: 24px;
  }

  summary::after {
    border-bottom: 2px solid ${naval.amberLight};
    border-right: 2px solid ${naval.amberLight};
    content: '';
    height: 8px;
    margin: -4px 4px 0 auto;
    transform: rotate(45deg);
    transition: transform 0.2s ease;
    width: 8px;
  }

  &[open] summary::after {
    margin-top: 4px;
    transform: rotate(-135deg);
  }

  summary:focus-visible {
    border-radius: 6px;
    outline: 2px solid ${naval.amberLight};
    outline-offset: 4px;
  }

  ol {
    counter-reset: order;
    display: grid;
    gap: 14px;
    list-style: none;
    margin: 20px 0 8px;
    padding: 0;
  }

  li {
    counter-increment: order;
    display: grid;
    gap: 14px;
    grid-template-columns: 36px minmax(0, 1fr);
  }

  li::before {
    ${readout};
    align-items: center;
    background: #ffad6a14;
    border: 1px solid #ffad6a59;
    border-radius: 8px;
    color: ${naval.amberLight};
    content: counter(order, decimal-leading-zero);
    display: flex;
    height: 28px;
    justify-content: center;
    letter-spacing: 0.04em;
    margin-top: 1px;
  }

  @media (max-width: 600px) {
    padding: 18px 20px;
  }
`;

export const ShotEffect = styled.span<{$result: 'hit' | 'miss' | 'sunk'}>`
  color: ${({$result}) => ($result === 'miss' ? '#9ce8ff' : '#ffc46d')};
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 3;

  span {
    inset: 10%;
    position: absolute;
  }

  span:nth-child(1) {
    animation: ${impactRing} ${({$result}) => ($result === 'sunk' ? '1.4s' : '1s')} ease-out both;
    border: 2px solid currentColor;
    border-radius: 50%;
    box-shadow:
      0 0 12px currentColor,
      inset 0 0 8px currentColor;
  }

  span:nth-child(2) {
    animation: ${impactBurst} ${({$result}) => ($result === 'sunk' ? '1.4s' : '0.9s')} ease-out both;
    background: ${({$result}) =>
      $result === 'miss'
        ? 'radial-gradient(circle, #ffffff 0%, #9ce8ff 25%, #3ab8d944 65%, transparent 72%)'
        : 'radial-gradient(circle, #fff9d9 0%, #ffc46d 25%, #f26b29bb 50%, transparent 72%)'};
    border-radius: ${({$result}) => ($result === 'miss' ? '50%' : '35% 60% 40% 65%')};
    filter: drop-shadow(0 0 8px currentColor);
  }

  span:nth-child(3) {
    animation: ${impactSparks} 1.2s ease-out both;
    background: currentColor;
    border-radius: 50%;
    box-shadow:
      -12px -8px 0 currentColor,
      11px -12px 0 currentColor,
      14px 9px 0 currentColor,
      -9px 14px 0 currentColor;
    inset: 45%;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      animation: none !important;
    }

    span:nth-child(2),
    span:nth-child(3) {
      display: none;
    }
  }
`;

export const ShotReport = styled.div`
  ${readout};
  color: ${naval.amberLight};
  font-size: 11px;
  margin-top: 12px;
  min-height: 18px;
`;

export const Small = styled.p`
  color: ${naval.mist};
  font-size: 12px;
  line-height: 1.7;
  margin: 8px 0 0;
`;

// Restyles the shared sound toggle as a HUD chip beside the match badge
export const Sound = styled.span`
  button {
    ${readout};
    background: ${naval.hull};
    border-color: ${naval.steel};
    border-radius: 999px;
    color: ${naval.mist};
    font-size: 10px;
    min-height: 34px;
    padding: 6px 14px;
  }

  button:hover {
    border-color: ${naval.steelBright};
    color: ${naval.ice};
    filter: none;
  }
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #1f3d5699;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 13px 0;

  span {
    color: ${naval.mist};
    font-size: 13px;
  }

  strong {
    color: ${naval.ice};
    font-family: ${navalMono};
    font-size: 14px;
    font-variant-numeric: tabular-nums;
  }
`;

export const StatGroup = styled.div`
  margin: 16px 0 8px;
`;

export const Status = styled.div<{$tone?: StatusTone}>`
  ${compactConsole};
  align-items: center;
  border-color: ${({$tone}) => ($tone ? `${STATUS_TONES[$tone]}73` : naval.steel)};
  box-shadow: ${({$tone}) =>
    $tone ? `0 0 30px ${STATUS_TONES[$tone]}2e, 0 18px 42px #0613231f` : '0 18px 42px #0613231f'};
  color: ${naval.mist};
  display: flex;
  flex-wrap: wrap;
  gap: 14px 18px;
  margin: 16px 0;
  padding: 16px 20px;
`;

export const StatusCopy = styled.div`
  flex: 1;
  min-width: 200px;

  strong {
    color: ${naval.ice};
    display: block;
    font-size: 16px;
  }

  p {
    margin-top: 4px;
  }
`;

export const Swatch = styled.i<{$state: CellState}>`
  background: ${({$state}) => CELL_BACKGROUNDS[$state]};
  border: 1px solid ${({$state}) => CELL_BORDERS[$state]};
  border-radius: 3px;
  display: block;
  height: 12px;
  width: 12px;
`;

export const Tags = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

export const TextLink = styled(Link)`
  color: #255b70;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Timer = styled.strong<{$warning?: boolean}>`
  color: ${({$warning}) => ($warning ? naval.flare : naval.ice)};
  font-family: ${navalMono};
  font-size: 24px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  line-height: 1.1;
`;

export const TitleSmall = styled.h2`
  color: ${naval.ice};
  font-size: 21px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.025em;
  margin: 0 0 10px;
`;

export const VisuallyHidden = styled.span`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
