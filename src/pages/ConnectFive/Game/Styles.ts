import styled, {css, keyframes} from 'styled-components';

import UAvatar from 'components/Avatar';
import UIcon from 'components/Icon';
import UModal from 'components/Modal';
import {colors, fonts, pagePadding} from 'styles';

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
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

const impact = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.15);
  }
  20% {
    opacity: 0.85;
  }
  60% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.8);
  }
`;

const impactGlow = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`;

const starTwinkle = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(0.9) rotate(-8deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1) rotate(8deg);
  }
`;

const winPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.08);
  }
`;

export const Board = styled.div`
  --board-grid-inset: calc(100% / 28);

  aspect-ratio: 1 / 1;
  background-color: #d7b07a;
  background-image:
    linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 55%),
    radial-gradient(circle at 18% 28%, rgba(120, 82, 46, 0.2), transparent 55%),
    radial-gradient(circle at 76% 72%, rgba(120, 82, 46, 0.12), transparent 60%),
    linear-gradient(90deg, rgba(145, 100, 59, 0.16) 0%, rgba(117, 80, 44, 0.08) 100%);
  border: 2px solid #b48353;
  border-radius: 16px;
  box-shadow:
    inset 0 0 0 1px rgba(73, 46, 19, 0.35),
    0 12px 22px rgba(36, 22, 9, 0.2);
  display: grid;
  gap: 0;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  grid-template-rows: repeat(14, minmax(0, 1fr));
  margin: 0 auto;
  max-width: calc(100vh - 360px);
  overflow: hidden;
  position: relative;
  width: 100%;

  &::before {
    background-image:
      linear-gradient(to right, rgba(76, 52, 24, 0.55) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(76, 52, 24, 0.55) 1px, transparent 1px);
    background-position: 0 0;
    background-size: calc((100% - 1px) / 13) calc((100% - 1px) / 13);
    content: '';
    inset: var(--board-grid-inset);
    pointer-events: none;
    position: absolute;
    z-index: 0;
  }
`;

export const BoardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Cell = styled.button<{$isPreview: boolean; $isPreviewInvalid: boolean}>`
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  z-index: 1;

  ${({$isPreviewInvalid}) =>
    $isPreviewInvalid &&
    css`
      background-color: rgba(239, 83, 80, 0.18);
    `}
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

export const EloChange = styled.div`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
`;

export const EloChangeLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  text-transform: uppercase;
`;

export const EloChangeValue = styled.div<{$variant: 'down' | 'equal' | 'up'}>`
  align-items: center;
  color: ${({$variant}) => {
    if ($variant === 'up') return colors.palette.green[600];
    if ($variant === 'down') return colors.palette.red[600];
    return colors.palette.gray[600];
  }};
  display: flex;
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
`;

export const GameLayout = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const ImpactRing = styled.span<{$variant: 'black' | 'white'}>`
  --impact-color: ${({$variant}) => ($variant === 'black' ? '255, 255, 255' : '0, 0, 0')};

  animation: ${impactGlow} 0.6s ease-out forwards;
  background: radial-gradient(
    circle,
    rgba(var(--impact-color), 0.35) 0%,
    rgba(var(--impact-color), 0.18) 38%,
    transparent 68%
  );
  border-radius: 50%;
  height: 90%;
  left: 50%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 1;

  &::before,
  &::after {
    animation: ${impact} 0.9s ease-out forwards;
    border: 2px solid rgba(var(--impact-color), 0.7);
    border-radius: 50%;
    box-shadow: 0 0 18px rgba(var(--impact-color), 0.4);
    content: '';
    height: 100%;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  &::after {
    animation-delay: 0.12s;
    border-width: 1px;
    box-shadow: 0 0 24px rgba(var(--impact-color), 0.45);
  }
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
  color: ${colors.palette.orange[700]};
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
  background: ${({$variant}) => ($variant === 'opponent' ? colors.palette.orange[500] : colors.palette.blue[500])};
  border-radius: 50%;
  height: 12px;
  width: 12px;
`;

export const PendingDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const PendingIcon = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  align-items: center;
  animation: ${float} 3s ease-in-out infinite;
  background: ${({$variant}) =>
    $variant === 'opponent'
      ? `linear-gradient(135deg, ${colors.palette.orange[500]} 0%, ${colors.palette.orange[700]} 100%)`
      : `linear-gradient(135deg, ${colors.palette.blue[500]} 0%, ${colors.palette.blue[700]} 100%)`};
  border-radius: 50%;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 80px;
`;

export const PendingIconInner = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  background: ${colors.white};
  border-radius: 50%;
  height: 40px;
  position: relative;
  width: 40px;

  &::before,
  &::after {
    background: ${({$variant}) => ($variant === 'opponent' ? colors.palette.orange[500] : colors.palette.blue[500])};
    border-radius: 50%;
    content: '';
    height: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
  }

  &::before {
    left: 6px;
  }

  &::after {
    right: 6px;
  }
`;

export const PendingShimmer = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  animation: ${shimmer} 2s linear infinite;
  background: ${({$variant}) =>
    $variant === 'opponent'
      ? `linear-gradient(90deg, transparent 0%, rgba(255, 152, 0, 0.15) 50%, transparent 100%)`
      : `linear-gradient(90deg, transparent 0%, rgba(47, 92, 129, 0.1) 50%, transparent 100%)`};
  background-size: 200% 100%;
  border-radius: 8px;
  height: 4px;
  margin-top: 4px;
  width: 200px;
`;

export const PendingState = styled.div<{$variant?: 'challenger' | 'opponent'}>`
  align-items: center;
  background: ${({$variant}) =>
    $variant === 'opponent'
      ? `linear-gradient(135deg, ${colors.palette.orange[50]} 0%, ${colors.palette.red[50]} 100%)`
      : `linear-gradient(135deg, ${colors.palette.blue[50]} 0%, ${colors.palette.orange[50]} 100%)`};
  border: 1px solid ${({$variant}) => ($variant === 'opponent' ? colors.palette.orange[200] : colors.palette.blue[200])};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 48px 32px;
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
      ? `linear-gradient(135deg, ${colors.palette.orange[600]} 0%, ${colors.palette.orange[800]} 100%)`
      : `linear-gradient(135deg, ${colors.palette.blue[600]} 0%, ${colors.palette.blue[800]} 100%)`};
  background-clip: text;
  color: transparent;
  font-size: 24px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const Piece = styled.div<{$isLastMove: boolean; $isWinning: boolean; $variant: 'black' | 'white'}>`
  background: ${({$variant}) => ($variant === 'black' ? '#141414' : '#f8f5ef')};
  border: 1px solid ${({$variant}) => ($variant === 'black' ? '#0a0a0a' : '#2b2b2b')};
  border-radius: 50%;
  box-shadow: ${({$isWinning, $variant}) => {
    const baseShadow =
      $variant === 'black'
        ? '0 6px 10px rgba(0, 0, 0, 0.35)'
        : '0 6px 10px rgba(0, 0, 0, 0.25), inset 0 -2px 3px rgba(0, 0, 0, 0.18)';
    const winningShadow = $isWinning
      ? `, 0 0 0 3px ${colors.palette.orange[400]}, 0 0 14px rgba(255, 152, 0, 0.45)`
      : '';

    return `${baseShadow}${winningShadow}`;
  }};
  height: 70%;
  position: relative;
  transform-origin: center;
  width: 70%;
  z-index: 2;

  &::after {
    border-radius: 50%;
    content: '';
    height: 16%;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16%;
  }

  ${({$isLastMove, $variant}) =>
    $isLastMove &&
    css`
      &::after {
        background: ${$variant === 'black' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.7)'};
        box-shadow: 0 0 6px ${$variant === 'black' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.35)'};
        opacity: 1;
      }
    `}

  ${({$isWinning}) =>
    $isWinning &&
    css`
      animation: ${winPulse} 1.6s ease-in-out infinite;
    `}
`;

export const PlayerAvatar = styled(UAvatar)<{$variant: 'black' | 'white'}>`
  margin-right: 12px;
  position: relative;

  &::after {
    background: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
    border: 2px solid ${({$variant}) => ($variant === 'black' ? colors.background : colors.palette.gray[700])};
    border-radius: 50%;
    bottom: -2px;
    box-shadow: ${({$variant}) => ($variant === 'white' ? '0 1px 2px rgba(0, 0, 0, 0.35)' : 'none')};
    content: '';
    height: 12px;
    position: absolute;
    right: -2px;
    width: 12px;
  }
`;

export const PlayerLabel = styled.div`
  align-items: center;
  display: flex;
`;

export const PlayerLabelDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PlayerName = styled.span<{$isClickable: boolean}>`
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

  &:hover {
    cursor: ${({$isClickable}) => ($isClickable ? 'pointer' : 'default')};
  }
`;

export const PlayerRow = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const PlayerSideText = styled.span<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? colors.black : colors.palette.gray[600])};
  font-size: 12px;
`;

export const Preview = styled.div<{$isInvalid: boolean; $variant: 'black' | 'white'}>`
  border: 1px solid transparent;
  border-radius: 50%;
  height: 70%;
  left: 50%;
  opacity: 0.6;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  z-index: 3;

  ${({$isInvalid, $variant}) =>
    $isInvalid
      ? css`
          background: ${colors.palette.red[300]};
          border-color: ${colors.palette.red[500]};
        `
      : css`
          background: ${$variant === 'black' ? 'rgba(20, 20, 20, 0.65)' : 'rgba(248, 245, 239, 0.7)'};
          border-color: ${$variant === 'black' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.2)'};
        `}
`;

export const PrizePoolPanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PurchaseLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PurchaseMeta = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const PurchaseName = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const PurchasePanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const PurchaseRow = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const RematchNotice = styled.div`
  color: ${colors.palette.red[600]};
  font-size: 12px;
  margin-top: 8px;
`;

export const RematchStateText = styled.div<{$variant: 'neutral' | 'warning'}>`
  color: ${({$variant}) => ($variant === 'warning' ? colors.palette.red[600] : colors.secondary)};
  font-size: 14px;
  margin-top: 8px;
`;

export const ResultModal = styled(UModal)`
  max-width: calc(100vw - 32px);
  width: 420px;
`;

export const ResultOutcome = styled.span<{$variant: 'draw' | 'loss' | 'win'}>`
  color: ${({$variant}) => {
    if ($variant === 'win') return colors.palette.green[600];
    if ($variant === 'loss') return colors.palette.red[600];
    return colors.palette.gray[600];
  }};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
`;

export const ResultSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SpecialIcon = styled.svg<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
  display: block;
  filter: ${({$variant}) => ($variant === 'white' ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' : 'none')};
  height: 24px;
  width: 24px;
`;

export const SpendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SpendPanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const SpendProgressBar = styled.div`
  background-color: ${colors.palette.gray[200]};
  border-radius: 2px;
  height: 4px;
  overflow: hidden;
  position: relative;
`;

export const SpendProgressFill = styled.div<{$percentage: number}>`
  background-color: ${colors.palette.green[500]};
  height: 100%;
  transition: width 0.3s ease;
  width: ${({$percentage}) => $percentage}%;
`;

export const SpendRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SpendRowHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const SpendRowName = styled.span`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;

export const SpendRowValue = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: 24px;
  margin: 0;
`;

export const Toolbar = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  flex-wrap: nowrap;
  gap: 0;
  overflow: hidden;
`;

export const ToolButton = styled.button<{$isActive: boolean; $isDisabled: boolean}>`
  align-items: center;
  background: ${({$isActive, $isDisabled}) => {
    if ($isDisabled) return colors.palette.gray[100];
    if ($isActive) return colors.palette.blue[100];
    return colors.white;
  }};
  border: 0;
  border-radius: 0;
  border-right: 1px solid ${colors.border};
  box-shadow: ${({$isActive, $isDisabled}) =>
    $isActive && !$isDisabled ? `inset 0 0 0 2px ${colors.palette.blue[500]}` : 'none'};
  cursor: ${({$isDisabled}) => ($isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  filter: ${({$isDisabled}) => ($isDisabled ? 'grayscale(1)' : 'none')};
  height: 52px;
  justify-content: center;
  opacity: ${({$isDisabled}) => ($isDisabled ? 0.5 : 1)};
  padding: 6px;
  position: relative;
  width: 52px;

  &:first-child {
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-bottom-right-radius: 12px;
    border-right: 0;
    border-top-right-radius: 12px;
  }
`;

export const ToolButtonReadOnly = styled.div<{$isDisabled: boolean}>`
  align-items: center;
  background: ${({$isDisabled}) => ($isDisabled ? colors.palette.gray[100] : colors.white)};
  border-radius: 0;
  border-right: 1px solid ${colors.border};
  display: flex;
  filter: ${({$isDisabled}) => ($isDisabled ? 'grayscale(1)' : 'none')};
  height: 52px;
  justify-content: center;
  opacity: ${({$isDisabled}) => ($isDisabled ? 0.5 : 1)};
  padding: 6px;
  position: relative;
  width: 52px;

  &:first-child {
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-bottom-right-radius: 12px;
    border-right: 0;
    border-top-right-radius: 12px;
  }
`;

export const ToolCount = styled.span`
  background: ${colors.white};
  border-radius: 6px;
  bottom: 4px;
  color: ${colors.palette.gray[700]};
  font-size: 10px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1;
  padding: 1px 4px;
  pointer-events: none;
  position: absolute;
  right: 4px;
`;

export const ToolIcon = styled.svg<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
  display: block;
  filter: ${({$variant}) => ($variant === 'white' ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' : 'none')};
  height: 24px;
  width: 24px;
`;

export const WinningStar = styled(UIcon)`
  animation: ${starTwinkle} 1.4s ease-in-out infinite;
  color: ${colors.palette.orange[400]};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  z-index: 4;
`;
