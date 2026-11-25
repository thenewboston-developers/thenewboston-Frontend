import {Link as ULink} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UBadge from 'components/Badge';
import UButton from 'components/Button';
import {Container as EmptyTextContainer} from 'components/EmptyText/Styles';
import {Button as SoundButton} from 'components/GameSoundToggle/Styles';
import {breakpoints, fonts, pagePadding, radii} from 'styles';

import {COMPACT_PLAYER_ROW_QUERY, detailsRowStyle} from '../mixins';
import {boardPanel, classic} from '../theme';

import {matchButton, matchPanel, matchStatus, resultPanel} from './theme';

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

export const BackLink = styled(ULink)`
  color: ${classic.accent};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid ${classic.focus};
    outline-offset: 4px;
  }

  &:hover {
    color: ${classic.text};
  }
`;

export const Badge = styled(UBadge)`
  ${matchStatus};
`;

export const BoardSection = styled.section`
  ${matchPanel};
  align-self: start;
  gap: 18px;
  padding: 20px;
`;

// The running clock is amber; its dot also identifies the active player without relying on color.
export const Button = styled(UButton)`
  ${matchButton};
`;

export const Clock = styled.div<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? classic.accent : classic.surfaceInset)};
  border: 1px solid ${({$isActive}) => ($isActive ? classic.accent : classic.border)};
  border-radius: ${radii.pill};
  color: ${({$isActive}) => ($isActive ? classic.accentInk : classic.textMuted)};
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
        background: ${classic.accentInk};
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
  ${resultPanel};
  color: ${classic.accentInk};
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${EmptyTextContainer} {
    color: ${classic.boardGrid};
  }
`;

export const Heading = styled.h1`
  color: ${classic.text};
  font-size: clamp(24px, 3vw, 32px);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.035em;
  line-height: 1.15;
  margin: 0;
`;

export const InfoLabel = styled.span`
  color: ${classic.textMuted};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const InfoRow = styled.div`
  ${detailsRowStyle};
`;

export const InfoValue = styled.span`
  color: ${classic.text};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  overflow-wrap: anywhere;
  text-align: right;
`;

export const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
`;

export const MatchHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MatchInfo = styled.div`
  ${matchPanel};
  gap: 12px;

  > p {
    color: ${classic.textSecondary};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

export const MatchLayout = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
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
  color: ${classic.textMuted};
  font-size: 13px;
  line-height: 1.6;
`;

export const PanelTitle = styled.h3`
  color: ${classic.text};
  font-size: 16px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin: 0;
`;

export const PendingChallengerName = styled.span`
  color: ${classic.accent};
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
  background: ${classic.accent};
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
    background: ${classic.blackStone};
    border: 1px solid ${classic.borderStrong};
    box-shadow:
      inset 0 -3px 4px rgba(0, 0, 0, 0.4),
      0 6px 12px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  &::after {
    animation: ${pieceClashRight} 2.6s ease-in-out infinite;
    animation-delay: 0.1s;
    background: ${classic.whiteStone};
    border: 1px solid ${classic.boardRim};
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
  background: linear-gradient(90deg, transparent, ${classic.accentSoft}, transparent);
  background-size: 200% 100%;
  border-radius: ${radii.pill};
  height: 4px;
  margin: 16px auto 0;
  max-width: 100%;
  width: 200px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PendingState = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  ${matchPanel};
  align-items: center;
  gap: 24px;
  overflow: hidden;
  padding: 48px 32px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 40px 20px;
  }
`;

export const PendingText = styled.p`
  color: ${classic.textMuted};
  font-size: 15px;
  line-height: 1.5;
  margin: 8px auto 0;
  max-width: 320px;
`;

export const PendingTitle = styled.h2<{$variant?: 'challenger' | 'opponent'}>`
  color: ${classic.text};
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
  background: ${classic.surfaceInset};
  border: 1px solid ${classic.border};
  border-radius: 16px;
  display: flex;
  gap: 12px;
  margin: 0 auto;
  max-width: 680px;
  min-width: 0;
  padding: 12px;
  width: 100%;

  @media ${COMPACT_PLAYER_ROW_QUERY} {
    gap: 8px;
  }

  @media (max-width: 1160px) {
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

export const SoundControls = styled.div`
  ${boardPanel};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;

  padding: 24px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 18px;
  }

  ${SoundButton} {
    background: ${classic.surfaceRaised};
    border-color: ${classic.border};
    color: ${classic.textMuted};

    &:focus-visible {
      outline-color: ${classic.focus};
    }
  }
`;

export const TurnStatus = styled.span`
  color: ${classic.textMuted};
  font-size: 13px;
  line-height: 1.5;
`;
