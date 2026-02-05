import styled, {keyframes} from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

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

export const BoardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Clock = styled.div<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.palette.green[50] : colors.white)};
  border: 1px solid ${({$isActive}) => ($isActive ? colors.palette.green[400] : colors.border)};
  border-radius: 12px;
  color: ${({$isActive}) => ($isActive ? colors.palette.green[700] : colors.primary)};
  display: flex;
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: center;
  min-width: 80px;
  padding: 8px 16px;
`;

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  text-transform: uppercase;
`;

export const InfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const InfoValue = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.medium};
`;

export const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
`;

export const MatchInfo = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;

export const MatchLayout = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PanelSubtitle = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const PanelTitle = styled.h3`
  color: ${colors.primary};
  font-size: 16px;
  margin: 0;
`;

export const PendingChallengerName = styled.span`
  color: ${colors.palette.red[500]};
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
`;

export const PendingShimmer = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  animation: ${shimmer} 2s linear infinite;
  background: ${({$variant}) =>
    $variant === 'opponent'
      ? `linear-gradient(90deg, transparent 0%, rgba(220, 13, 22, 0.18) 50%, transparent 100%)`
      : `linear-gradient(90deg, transparent 0%, rgba(15, 20, 25, 0.12) 50%, transparent 100%)`};
  background-size: 200% 100%;
  border-radius: 8px;
  height: 4px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4px;
  width: 200px;
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
  border: 1px solid ${({$variant}) => ($variant === 'opponent' ? colors.palette.red[200] : colors.palette.gray[200])};
  border-radius: 24px;
  box-shadow: 0 24px 40px rgba(15, 20, 25, 0.08);
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
`;

export const PendingText = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  margin: 0;
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
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const PlayerRow = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;
