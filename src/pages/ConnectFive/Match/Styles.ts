import styled, {css, keyframes} from 'styled-components';

import UBadge from 'components/Badge';
import {breakpoints, colors, fonts, pagePadding, radii, shadows} from 'styles';

import {
  COMPACT_PLAYER_ROW_QUERY,
  detailsLabelStyle,
  detailsRowStyle,
  detailsValueStyle,
  panelStyle,
  panelSubtitleStyle,
  panelTitleStyle,
  statusBadgeStyle,
} from '../mixins';

// Mirrors the max-width of the board (see Board/Styles), so the player rows line up with its edges. The floor keeps the
// player, the pieces and the clock on one line when a short viewport shrinks the board
const PLAYER_ROW_MAX_WIDTH = 'max(560px, calc(100vh - 360px))';

const cloudSwirl = keyframes`
  0% {
    transform: translate(-12%, -8%) rotate(0deg) scale(1);
  }
  50% {
    transform: translate(10%, 12%) rotate(180deg) scale(1.08);
  }
  100% {
    transform: translate(-12%, -8%) rotate(360deg) scale(1);
  }
`;

const cloudSwirlReverse = keyframes`
  0% {
    transform: translate(8%, -10%) rotate(0deg) scale(1);
  }
  50% {
    transform: translate(-10%, 8%) rotate(-180deg) scale(1.12);
  }
  100% {
    transform: translate(8%, -10%) rotate(-360deg) scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const pieceClashLeft = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) translateX(-18px) scale(0.98);
  }
  50% {
    transform: translate(-50%, -50%) translateX(-6px) scale(1.04);
  }
`;

const pieceClashRight = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) translateX(18px) scale(0.98);
  }
  50% {
    transform: translate(-50%, -50%) translateX(6px) scale(1.04);
  }
`;

const pieceSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 80%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const Badge = styled(UBadge)`
  ${statusBadgeStyle};
`;

export const BoardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

// The running clock is the dark one, the dot repeats the state for readers who cannot tell the fills apart
export const Clock = styled.div<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.primary : colors.white)};
  border: 1px solid ${({$isActive}) => ($isActive ? colors.primary : colors.borderSubtle)};
  border-radius: ${radii.pill};
  color: ${({$isActive}) => ($isActive ? colors.white : colors.secondary)};
  display: flex;
  flex-shrink: 0;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  grid-area: clock;
  height: 40px;
  justify-content: center;
  margin-left: auto;
  min-width: 96px;
  padding: 0 16px;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  ${({$isActive}) =>
    $isActive &&
    css`
      &::before {
        background: ${colors.palette.green[400]};
        border-radius: 50%;
        content: '';
        flex-shrink: 0;
        height: 6px;
        width: 6px;
      }
    `}

  @media ${COMPACT_PLAYER_ROW_QUERY} {
    font-size: 15px;
    gap: 6px;
    height: 36px;
    min-width: 84px;
    padding: 0 12px;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoLabel = styled.span`
  ${detailsLabelStyle};
`;

export const InfoRow = styled.div`
  ${detailsRowStyle};
`;

export const InfoValue = styled.span`
  ${detailsValueStyle};
`;

export const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
`;

export const MatchInfo = styled.div`
  ${panelStyle};
  gap: 12px;
`;

export const MatchLayout = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PanelSubtitle = styled.span`
  ${panelSubtitleStyle};
`;

export const PanelTitle = styled.h3`
  ${panelTitleStyle};
`;

export const PendingChallengerName = styled.span`
  color: ${colors.accent};
  font-weight: ${fonts.weight.semiBold};
`;

export const PendingContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

export const PendingDot = styled.span<{$delay: number; $variant?: 'challenger' | 'opponent'}>`
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${({$delay}) => $delay}s;
  background: ${({$variant}) => ($variant === 'opponent' ? colors.palette.red[600] : colors.palette.darkGray[600])};
  border-radius: 50%;
  height: 12px;
  width: 12px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PendingDots = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
`;

export const PendingIcon = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  align-items: center;
  animation: ${float} 3s ease-in-out infinite;
  display: flex;
  height: 72px;
  justify-content: center;
  position: relative;
  width: 72px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PendingIconInner = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  animation: ${pieceSpin} 6.4s linear infinite;
  height: 60px;
  position: relative;
  transform-origin: center;
  width: 60px;

  &::before,
  &::after {
    border-radius: 50%;
    content: '';
    height: 30px;
    left: 50%;
    position: absolute;
    top: 50%;
    width: 30px;
  }

  &::before {
    animation: ${pieceClashLeft} 2.6s ease-in-out infinite;
    background: ${colors.palette.darkGray[900]};
    border: 1px solid ${colors.palette.darkGray[700]};
    box-shadow:
      inset 0 -3px 4px rgba(0, 0, 0, 0.4),
      0 6px 12px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  &::after {
    animation: ${pieceClashRight} 2.6s ease-in-out infinite;
    animation-delay: 0.1s;
    background: ${colors.white};
    border: 1px solid ${colors.palette.darkGray[600]};
    box-shadow:
      inset 0 -2px 3px rgba(0, 0, 0, 0.18),
      0 6px 12px rgba(0, 0, 0, 0.25);
  }

  /* The keyframes own the placement of the two pieces, so the still version has to position them itself */
  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::before {
      animation: none;
      transform: translate(-50%, -50%) translateX(-12px);
    }

    &::after {
      animation: none;
      transform: translate(-50%, -50%) translateX(12px);
    }
  }
`;

export const PendingShimmer = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  animation: ${shimmer} 2s linear infinite;
  background: ${({$variant}) =>
    $variant === 'opponent'
      ? `linear-gradient(90deg, transparent 0%, rgba(220, 13, 22, 0.18) 50%, transparent 100%)`
      : `linear-gradient(90deg, transparent 0%, rgba(15, 20, 25, 0.12) 50%, transparent 100%)`};
  background-size: 200% 100%;
  border-radius: ${radii.pill};
  height: 4px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  max-width: 100%;
  width: 200px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PendingState = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  align-items: center;
  background: ${({$variant}) =>
    $variant === 'opponent'
      ? `radial-gradient(circle at 12% 14%, rgba(220, 13, 22, 0.09) 0%, rgba(255, 255, 255, 0) 58%),
        radial-gradient(circle at 86% 18%, rgba(123, 170, 214, 0.2) 0%, rgba(255, 255, 255, 0) 55%),
        radial-gradient(circle at 24% 86%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0) 55%),
        linear-gradient(145deg, ${colors.white} 0%, ${colors.palette.red[50]} 34%, ${colors.palette.blue[50]} 68%, ${colors.white} 100%)`
      : `radial-gradient(circle at 12% 14%, rgba(123, 170, 214, 0.2) 0%, rgba(255, 255, 255, 0) 55%),
        radial-gradient(circle at 86% 18%, rgba(220, 13, 22, 0.09) 0%, rgba(255, 255, 255, 0) 58%),
        radial-gradient(circle at 24% 86%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0) 55%),
        linear-gradient(145deg, ${colors.white} 0%, ${colors.palette.blue[50]} 34%, ${colors.palette.red[50]} 68%, ${colors.white} 100%)`};
  border: 1px solid ${({$variant}) => ($variant === 'opponent' ? colors.palette.red[50] : colors.borderSubtle)};
  border-radius: ${radii.large};
  box-shadow: ${shadows.card};
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
  padding: 48px 32px;
  position: relative;

  &::before,
  &::after {
    content: '';
    inset: -40%;
    opacity: 0.55;
    position: absolute;
    z-index: 0;
  }

  &::before {
    animation: ${cloudSwirl} 28s ease-in-out infinite;
    background:
      radial-gradient(circle at 18% 30%, rgba(220, 13, 22, 0.16) 0%, rgba(220, 13, 22, 0) 64%),
      radial-gradient(circle at 70% 25%, rgba(123, 170, 214, 0.2) 0%, rgba(123, 170, 214, 0) 62%),
      radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 64%);
    filter: blur(16px);
  }

  &::after {
    animation: ${cloudSwirlReverse} 36s ease-in-out infinite;
    background:
      radial-gradient(circle at 25% 70%, rgba(123, 170, 214, 0.18) 0%, rgba(123, 170, 214, 0) 64%),
      radial-gradient(circle at 78% 65%, rgba(220, 13, 22, 0.15) 0%, rgba(220, 13, 22, 0) 64%),
      radial-gradient(circle at 52% 35%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 64%);
    filter: blur(20px);
    opacity: 0.28;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 40px 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;

export const PendingText = styled.p`
  color: ${colors.secondary};
  font-size: 15px;
  line-height: 1.5;
  margin: 8px auto 0;
  max-width: 320px;
`;

export const PendingTitle = styled.h2<{$variant?: 'challenger' | 'opponent'}>`
  -webkit-background-clip: text;
  background: ${({$variant}) =>
    $variant === 'opponent'
      ? `linear-gradient(135deg, ${colors.palette.darkGray[900]} 0%, ${colors.palette.red[500]} 100%)`
      : `linear-gradient(135deg, ${colors.palette.darkGray[900]} 0%, ${colors.palette.darkGray[500]} 100%)`};
  background-clip: text;
  color: transparent;
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.25;
  margin: 0;
  overflow-wrap: anywhere;
`;

// PlayerInfo, PieceToolbar and Clock name their own grid areas. Phones move the pieces to a line of their own, on the
// side of the row that faces the board
export const PlayerRow = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin: 0 auto;
  max-width: ${PLAYER_ROW_MAX_WIDTH};
  min-width: 0;
  width: 100%;

  @media ${COMPACT_PLAYER_ROW_QUERY} {
    gap: 8px;
  }

  @media (max-width: ${breakpoints.mini}) {
    display: grid;
    gap: 8px 12px;
    grid-template-areas:
      'player clock'
      'toolbar toolbar';
    grid-template-columns: minmax(0, 1fr) auto;

    &:last-child {
      grid-template-areas:
        'toolbar toolbar'
        'player clock';
    }
  }
`;
