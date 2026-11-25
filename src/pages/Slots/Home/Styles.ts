import {Link, NavLink} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import {breakpoints, colors, pagePadding} from 'styles';

import slotsTheme from '../theme';

const CHIP_TONES = ['#8b5cf6', '#22d3ee', '#ff2e93'];

const turn = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
`;

const chase = keyframes`
  0%, 100% {
    opacity: 0.28;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const breathe = keyframes`
  0%, 100% {
    box-shadow:
      0 0 0 4px rgba(255, 215, 106, 0.85),
      0 0 20px rgba(255, 46, 147, 0.4),
      0 14px 28px rgba(0, 0, 0, 0.5);
  }
  50% {
    box-shadow:
      0 0 0 4px rgba(255, 233, 168, 1),
      0 0 40px rgba(255, 46, 147, 0.7),
      0 14px 28px rgba(0, 0, 0, 0.5);
  }
`;

const glare = keyframes`
  0% {
    transform: skewX(-18deg) translateX(0);
  }
  28%,
  100% {
    transform: skewX(-18deg) translateX(620%);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-3px, 1px);
  }
  40% {
    transform: translate(3px, -1px);
  }
  60% {
    transform: translate(-2px, -1px);
  }
  80% {
    transform: translate(2px, 1px);
  }
`;

const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${slotsTheme.goldLight};
    outline-offset: 3px;
  }
`;

export const Admin = styled.div`
  margin-top: 24px;
  max-width: 560px;
`;

export const Alert = styled.p`
  background: rgba(255, 46, 147, 0.12);
  border: 1px solid rgba(255, 46, 147, 0.4);
  border-radius: 12px;
  color: #ffd1e5;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  padding: 10px 14px;
`;

export const AuthButtons = styled(UAuthButtons)`
  justify-content: center;

  > button:first-child {
    background: rgba(255, 255, 255, 0.92);
    border-color: transparent;
    color: ${colors.primary};
  }

  > button:first-child:hover {
    background: #ffffff;
  }
`;

export const BackLink = styled(Link)`
  color: ${colors.secondary};
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: ${colors.primary};
    text-decoration: none;
  }
`;

export const BetBox = styled.div`
  display: grid;
  gap: 10px;
  min-width: 0;
`;

export const BetHeader = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  justify-content: space-between;

  label {
    color: ${slotsTheme.textFaint};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  span {
    color: ${slotsTheme.textMuted};
    font-size: 12px;
  }
`;

export const BetInput = styled.input`
  appearance: textfield;
  background: #07051a;
  border: 1px solid rgba(255, 233, 168, 0.28);
  border-radius: 12px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);
  color: ${slotsTheme.win};
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  height: 46px;
  min-width: 0;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 215, 106, 0.4);
  width: 100%;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:disabled {
    opacity: 0.7;
  }

  &:focus-visible {
    border-color: ${slotsTheme.gold};
    outline: 2px solid rgba(246, 196, 83, 0.5);
    outline-offset: 1px;
  }
`;

export const Bulb = styled.span`
  animation: ${chase} var(--bulb-speed) ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--bulb-step));
  background: radial-gradient(circle at 35% 35%, #fffbe8 0%, #ffd76a 45%, #b7791f 100%);
  border-radius: 50%;
  box-shadow:
    0 0 8px rgba(255, 215, 106, 0.85),
    0 0 16px rgba(255, 46, 147, 0.35);
  height: 8px;
  width: 8px;

  &:nth-child(2n) {
    background: radial-gradient(circle at 35% 35%, #ffe4f1 0%, #ff5aa8 45%, #9d174d 100%);
    box-shadow:
      0 0 8px rgba(255, 90, 168, 0.85),
      0 0 16px rgba(139, 92, 246, 0.35);
  }

  @container slots-cabinet (max-width: 480px) {
    &:nth-child(n + 15) {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.85;
  }
`;

export const Bulbs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 14px 4px;
`;

export const Cabinet = styled.div`
  --bulb-speed: 2.6s;
  --bulb-step: 0.12s;

  background: linear-gradient(180deg, #2e2068 0%, #1c1347 40%, #120c30 100%);
  border-radius: 32px;
  box-shadow:
    0 40px 70px rgba(3, 1, 12, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  container: slots-cabinet / inline-size;
  max-width: 760px;
  padding: 14px clamp(12px, 2.6vw, 28px) 18px;
  position: relative;
  width: 100%;

  /* Brushed gold rim */
  &::before {
    background: ${slotsTheme.goldGradient};
    border-radius: inherit;
    content: '';
    inset: 0;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    padding: 2px;
    pointer-events: none;
    position: absolute;
  }

  &[data-state='spinning'] {
    --bulb-speed: 0.8s;
    --bulb-step: 0.035s;
  }
  &[data-state='win'],
  &[data-state='jackpot'] {
    --bulb-speed: 0.5s;
    --bulb-step: 0s;
  }

  &[data-state='jackpot'] {
    animation: ${shake} 0.45s ease-in-out 2;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-state='jackpot'] {
      animation: none;
    }
  }
`;

export const CabinetFooter = styled.div`
  align-items: center;
  border-top: 1px solid ${slotsTheme.line};
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 14px;
`;

export const Chip = styled.button<{$tone: number}>`
  background:
    radial-gradient(circle, #241a58 0 50%, transparent 52%),
    repeating-conic-gradient(${({$tone}) => CHIP_TONES[$tone % 3]} 0 18deg, #f7f3ff 18deg 30deg);
  border: 2px solid rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.4),
    inset 0 0 0 3px rgba(0, 0, 0, 0.18);
  color: #ffffff;
  cursor: pointer;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  height: 44px;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  width: 44px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &[aria-pressed='true'] {
    box-shadow:
      0 0 0 2px ${slotsTheme.win},
      0 8px 18px rgba(255, 215, 106, 0.35);
    transform: translateY(-3px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  ${focusRing}
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Controls = styled.form`
  align-items: center;
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: 18px;

  @container slots-cabinet (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Eyebrow = styled.p`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0 0 8px;
`;

export const Floor = styled.div`
  background:
    radial-gradient(900px 420px at 38% -6%, rgba(139, 92, 246, 0.45), transparent 65%),
    radial-gradient(700px 380px at -6% 104%, rgba(255, 46, 147, 0.22), transparent 62%),
    radial-gradient(700px 380px at 106% 104%, rgba(34, 211, 238, 0.16), transparent 62%),
    linear-gradient(180deg, #150f3a 0%, #0b0824 55%, ${slotsTheme.ink} 100%);
  border-radius: 28px;
  box-shadow: 0 30px 70px rgba(12, 8, 40, 0.28);
  color: ${slotsTheme.text};
  container: slots-floor / inline-size;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(12px, 2.6vw, 32px);
  position: relative;

  /* Star field */
  &::before {
    animation: ${twinkle} 6s ease-in-out infinite;
    background-image:
      radial-gradient(1.5px 1.5px at 8% 14%, #ffffff, transparent 70%),
      radial-gradient(1px 1px at 22% 72%, #ffffff, transparent 70%),
      radial-gradient(1.5px 1.5px at 36% 30%, rgba(255, 233, 168, 0.9), transparent 70%),
      radial-gradient(1px 1px at 58% 8%, #ffffff, transparent 70%),
      radial-gradient(1.5px 1.5px at 74% 64%, rgba(255, 233, 168, 0.9), transparent 70%),
      radial-gradient(1px 1px at 88% 22%, #ffffff, transparent 70%),
      radial-gradient(1.5px 1.5px at 94% 86%, #ffffff, transparent 70%),
      radial-gradient(1px 1px at 46% 92%, #ffffff, transparent 70%),
      radial-gradient(1px 1px at 66% 40%, #ffffff, transparent 70%),
      radial-gradient(1.5px 1.5px at 14% 48%, rgba(255, 233, 168, 0.9), transparent 70%);
    content: '';
    inset: 0;
    opacity: 0.7;
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`;

export const FloorGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) 300px;

  @container slots-floor (max-width: 1020px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const FooterNote = styled.span`
  align-items: center;
  color: ${slotsTheme.textMuted};
  display: inline-flex;
  font-size: 12px;
  gap: 6px;

  svg {
    color: ${slotsTheme.positive};
  }
`;

export const FundGrid = styled.dl`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 14px 0 0;

  div {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 12px;
    min-width: 0;
    padding: 10px;
  }

  dt {
    color: ${slotsTheme.textFaint};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  dd {
    color: ${slotsTheme.text};
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 800;
    margin: 4px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Header = styled.header`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 18px 0 22px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
    margin: 12px 0 16px;
  }
`;

export const HeaderSide = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Lower = styled.div`
  align-items: start;
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  margin-top: 24px;

  @container slots-floor (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const LowerSide = styled.div`
  display: grid;
  gap: 16px;
  min-width: 0;
`;

export const MachineColumn = styled.div`
  display: grid;
  isolation: isolate;
  justify-items: center;
  min-width: 0;
  position: relative;
`;

export const Marker = styled.span<{$side: 'left' | 'right'}>`
  border-bottom: 9px solid transparent;
  border-top: 9px solid transparent;
  filter: drop-shadow(0 0 6px rgba(255, 215, 106, 0.9));
  height: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  z-index: 4;

  ${({$side}) =>
    $side === 'left'
      ? css`
          border-left: 10px solid ${slotsTheme.gold};
          left: 3px;
        `
      : css`
          border-right: 10px solid ${slotsTheme.gold};
          right: 3px;
        `}
`;

export const Marquee = styled.div`
  display: grid;
  gap: 4px;
  justify-items: center;
  min-height: clamp(62px, 13cqi, 86px);
  padding: 4px 0 2px;
  position: relative;

  > div:not([aria-hidden]) {
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  &[data-celebrating] > div:not([aria-hidden]) {
    opacity: 0;
    transform: scale(0.92);
  }
`;

export const MarqueeTag = styled.div`
  color: ${slotsTheme.textMuted};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-align: center;
`;

export const MarqueeTitle = styled.div`
  align-items: center;
  display: flex;
  gap: clamp(8px, 2vw, 16px);

  span {
    background: ${slotsTheme.goldText};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    filter: drop-shadow(0 2px 0 rgba(122, 74, 14, 0.9)) drop-shadow(0 0 16px rgba(255, 215, 106, 0.35));
    font-size: clamp(30px, 6.4cqi, 48px);
    font-weight: 800;
    letter-spacing: 0.16em;
    line-height: 1.05;
    padding-left: 0.16em;
    text-transform: uppercase;
  }

  svg {
    height: clamp(26px, 5.4cqi, 40px);
    width: clamp(26px, 5.4cqi, 40px);
  }
`;

export const MaxChip = styled.button`
  background: linear-gradient(180deg, #ffe9a8, #f6c453 55%, #c98a24);
  border: 0;
  border-radius: 999px;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  color: #3b2106;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  height: 44px;
  letter-spacing: 0.12em;
  padding: 0 16px;
  text-transform: uppercase;
  transition: transform 0.15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &[aria-pressed='true'] {
    box-shadow:
      0 0 0 2px #ffffff,
      0 8px 18px rgba(255, 215, 106, 0.45);
    transform: translateY(-3px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  ${focusRing}
`;

export const Messages = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 14px;

  &:empty {
    display: none;
  }
`;

export const Meter = styled.div`
  background: linear-gradient(180deg, #07051a, #0e0a28);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);
  min-width: 0;
  padding: 8px 10px;
  text-align: center;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  span {
    color: ${slotsTheme.textFaint};
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  strong {
    color: ${slotsTheme.win};
    display: block;
    font-size: clamp(15px, 3.4cqi, 22px);
    font-variant-numeric: tabular-nums;
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 0 12px rgba(255, 215, 106, 0.45);
    white-space: nowrap;
  }

  small {
    color: ${slotsTheme.textMuted};
    font-size: 0.55em;
    font-weight: 700;
    margin-left: 4px;
    text-shadow: none;
  }

  &[data-lit] {
    border-color: rgba(255, 215, 106, 0.7);
    box-shadow:
      inset 0 2px 8px rgba(0, 0, 0, 0.6),
      0 0 20px rgba(255, 215, 106, 0.35);
  }
`;

export const Meters = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 18px;
`;

export const Notice = styled.p`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: ${slotsTheme.textMuted};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  padding: 10px 14px;
`;

export const Page = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1320px;
  padding-bottom: 48px;
  padding-top: 28px;
`;

export const Pending = styled.div`
  background: rgba(246, 196, 83, 0.08);
  border: 1px solid rgba(246, 196, 83, 0.4);
  border-radius: 18px;
  display: grid;
  gap: 12px;
  justify-items: start;
  margin-top: 18px;
  padding: 16px 18px;

  p {
    color: ${slotsTheme.goldLight};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

export const ReelsFrame = styled.div`
  background: linear-gradient(180deg, #0d0926 0%, #05030f 100%);
  border-radius: 24px;
  box-shadow:
    inset 0 3px 14px rgba(0, 0, 0, 0.85),
    0 0 0 2px #3b2b80,
    0 0 0 4px rgba(246, 196, 83, 0.78),
    0 0 0 6px #241a58,
    0 22px 44px rgba(0, 0, 0, 0.45);
  margin-top: 14px;
  overflow: hidden;
  padding: clamp(8px, 1.6cqi, 14px) clamp(16px, 3cqi, 24px);
  position: relative;

  /* A sheet of glass over the reels catches the light now and then */
  &::after {
    animation: ${glare} 8s ease-in-out 1.5s infinite;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
    bottom: 0;
    content: '';
    left: -30%;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: skewX(-18deg);
    width: 22%;
    z-index: 5;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      display: none;
    }
  }
`;

export const Result = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 14px;
  color: ${slotsTheme.textMuted};
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 4px 10px;
  justify-content: space-between;
  line-height: 1.5;
  padding: 10px 14px;

  strong {
    color: ${slotsTheme.text};
    font-size: 15px;
  }

  &[data-tier='win'],
  &[data-tier='nice'],
  &[data-tier='big'],
  &[data-tier='huge'],
  &[data-tier='jackpot'] {
    background: linear-gradient(90deg, rgba(255, 215, 106, 0.16), rgba(255, 46, 147, 0.08));
    border-color: rgba(255, 215, 106, 0.5);

    strong {
      color: ${slotsTheme.goldLight};
    }
  }
`;

export const RetryButton = styled.button`
  background: linear-gradient(180deg, #ffe9a8, #f6c453 55%, #c98a24);
  border: 0;
  border-radius: 999px;
  color: #3b2106;
  cursor: pointer;
  font-size: 15px;
  font-weight: 800;
  padding: 13px 26px;

  &:disabled {
    cursor: progress;
    opacity: 0.7;
  }
  ${focusRing}
`;

export const Side = styled.div`
  display: grid;
  gap: 16px;
  min-width: 0;

  @container slots-floor (max-width: 1020px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
`;

export const SignIn = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed rgba(255, 233, 168, 0.35);
  border-radius: 18px;
  display: grid;
  gap: 12px;
  justify-items: center;
  margin-top: 18px;
  padding: 18px;
  text-align: center;

  p {
    color: ${slotsTheme.textMuted};
    font-size: 14px;
    margin: 0;
  }
`;

export const SoundButton = styled.button`
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  color: ${slotsTheme.text};
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  gap: 6px;
  padding: 7px 12px;

  &[aria-pressed='true'] {
    border-color: rgba(255, 215, 106, 0.55);
    color: ${slotsTheme.goldLight};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
  ${focusRing}
`;

export const SpinAmount = styled.span`
  color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

export const SpinButton = styled.button`
  animation: ${breathe} 2.4s ease-in-out infinite;
  background: radial-gradient(circle at 50% 28%, #ff7a9a 0%, #f0174f 38%, #b5103d 70%, #5c0420 100%);
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  display: grid;
  gap: 4px;
  height: 132px;
  justify-self: center;
  place-content: center;
  position: relative;
  transition:
    transform 0.12s ease,
    filter 0.2s ease;
  width: 132px;

  /* Rotating ring of gold lights */
  &::before {
    animation: ${turn} 14s linear infinite;
    background: repeating-conic-gradient(from 0deg, rgba(255, 233, 168, 0.95) 0deg 4deg, transparent 4deg 12deg);
    border-radius: 50%;
    content: '';
    inset: -12px;
    mask: radial-gradient(circle closest-side, transparent 84%, #000 86%, #000 96%, transparent 98%);
    pointer-events: none;
    position: absolute;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: scale(1.04);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    animation: none;
    box-shadow:
      0 0 0 4px rgba(255, 233, 168, 0.35),
      0 14px 28px rgba(0, 0, 0, 0.5);
    cursor: not-allowed;
    filter: grayscale(0.7) brightness(0.7);
  }

  &[data-spinning] {
    cursor: progress;
    filter: none;
  }

  &[data-spinning]::before {
    animation-duration: 1s;
  }

  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 8px;
  }

  @container slots-cabinet (max-width: 520px) {
    align-items: center;
    border-radius: 999px;
    gap: 10px;
    grid-auto-flow: column;
    height: 64px;
    justify-self: stretch;
    width: 100%;

    &::before {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::before {
      animation: none;
    }
  }
`;

export const SpinLabel = styled.span`
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1;
  padding-left: 0.12em;
  text-shadow: 0 2px 0 rgba(92, 4, 32, 0.8);
  text-transform: uppercase;

  &[data-small] {
    font-size: 14px;
    letter-spacing: 0.08em;
  }
`;

export const Stats = styled.dl`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;

  div {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 12px;
    min-width: 0;
    padding: 10px;
  }

  dt {
    color: ${slotsTheme.textFaint};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  dd {
    color: ${slotsTheme.text};
    font-size: 17px;
    font-variant-numeric: tabular-nums;
    font-weight: 800;
    margin: 4px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  dd[data-sign='up'] {
    color: ${slotsTheme.positive};
  }

  dd[data-sign='down'] {
    color: ${slotsTheme.negative};
  }
`;

export const Status = styled.span`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: 999px;
  color: ${colors.secondary};
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  gap: 8px;
  padding: 8px 12px;

  &::before {
    background: #c3c9d1;
    border-radius: 50%;
    content: '';
    height: 8px;
    width: 8px;
  }

  &[data-available]::before {
    background: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
  }
`;

export const StepButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  color: ${slotsTheme.text};
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  height: 46px;
  line-height: 1;
  transition:
    background 0.15s ease,
    transform 0.1s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
  }

  &:active:not(:disabled) {
    transform: scale(0.94);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
  ${focusRing}
`;

export const Stepper = styled.div`
  align-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: 46px minmax(0, 1fr) 46px;
`;

export const Sunburst = styled.div`
  animation: ${turn} 140s linear infinite;
  background: repeating-conic-gradient(from 0deg, rgba(255, 233, 168, 0.07) 0deg 6deg, transparent 6deg 18deg);
  border-radius: 50%;
  height: 1500px;
  left: 50%;
  margin: -750px 0 0 -750px;
  mask-image: radial-gradient(circle, #000 0%, rgba(0, 0, 0, 0.55) 26%, transparent 58%);
  opacity: 0.8;
  pointer-events: none;
  position: absolute;
  top: 44%;
  transition: opacity 0.8s ease;
  width: 1500px;
  z-index: -1;

  ${Floor}[data-state='win'] &,
  ${Floor}[data-state='jackpot'] & {
    animation-duration: 24s;
    opacity: 1;
  }

  ${Floor}[data-state='jackpot'] & {
    background: repeating-conic-gradient(
      from 0deg,
      rgba(255, 46, 147, 0.16) 0deg 6deg,
      transparent 6deg 12deg,
      rgba(255, 233, 168, 0.16) 12deg 18deg,
      transparent 18deg 24deg
    );
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Tab = styled(NavLink)`
  border-radius: 999px;
  color: ${colors.secondary};
  font-size: 14px;
  font-weight: 600;
  padding: 8px 18px;
  text-decoration: none;

  &:hover {
    color: ${colors.primary};
    text-decoration: none;
  }
  &.active,
  &.active:hover {
    background: ${slotsTheme.night};
    box-shadow: 0 6px 14px rgba(16, 11, 46, 0.25);
    color: #ffffff;
  }
`;

export const Tabs = styled.nav`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: 999px;
  display: inline-flex;
  gap: 4px;
  padding: 4px;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: clamp(32px, 4vw, 44px);
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0;
`;
