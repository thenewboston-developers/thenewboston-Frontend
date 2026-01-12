import styled, {css, keyframes} from 'styled-components';

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

export const Board = styled.div`
  background: ${colors.border};
  border-radius: 12px;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  overflow: hidden;
  width: 100%;
`;

export const BoardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BoardWrapper = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const Cell = styled.button<{$isPreview: boolean; $isPreviewInvalid: boolean}>`
  align-items: center;
  aspect-ratio: 1 / 1;
  background: ${colors.white};
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;

  ${({$isPreviewInvalid}) =>
    $isPreviewInvalid &&
    css`
      background: ${colors.palette.red[50]};
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

export const LoadingState = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
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

export const Piece = styled.div<{$variant: 'playerA' | 'playerB'}>`
  background: ${({$variant}) => ($variant === 'playerA' ? colors.palette.blue[500] : colors.palette.orange[500])};
  border-radius: 50%;
  height: 70%;
  width: 70%;
`;

export const PlayerInfo = styled.div<{$isActive: boolean}>`
  align-items: center;
  color: ${({$isActive}) => ($isActive ? colors.palette.green[700] : colors.primary)};
  display: flex;
  gap: 10px;
`;

export const PlayerName = styled.div`
  color: inherit;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const PlayerRow = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const Preview = styled.div<{$isInvalid: boolean}>`
  border-radius: 50%;
  height: 70%;
  left: 50%;
  opacity: 0.6;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;

  ${({$isInvalid}) =>
    $isInvalid
      ? css`
          background: ${colors.palette.red[300]};
        `
      : css`
          background: ${colors.palette.gray[300]};
        `}
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

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SpecialIcon = styled.img`
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
  background-color: ${colors.palette.blue[500]};
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

  &:last-child {
    border-right: 0;
  }
`;

export const ToolButtonReadOnly = styled.div<{$isDisabled: boolean}>`
  align-items: center;
  background: ${({$isDisabled}) => ($isDisabled ? colors.palette.gray[100] : colors.white)};
  border-right: 1px solid ${colors.border};
  display: flex;
  filter: ${({$isDisabled}) => ($isDisabled ? 'grayscale(1)' : 'none')};
  height: 52px;
  justify-content: center;
  opacity: ${({$isDisabled}) => ($isDisabled ? 0.5 : 1)};
  padding: 6px;
  position: relative;
  width: 52px;

  &:last-child {
    border-right: 0;
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

export const ToolIcon = styled.img`
  display: block;
  height: 24px;
  width: 24px;
`;
