import styled, {keyframes} from 'styled-components';

import UIcon from 'components/Icon';
import UModal from 'components/Modal';
import {colors, fonts} from 'styles';

const eloPop = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const resultPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

const resultShine = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
`;

export const EloChange = styled.div`
  align-items: center;
  animation: ${fadeInUp} 0.4s ease-out 0.15s both;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 24px 0;
`;

export const EloChangeArrow = styled(UIcon)`
  color: ${colors.palette.gray[400]};
  flex-shrink: 0;
  margin: 0 -4px;
`;

export const EloChangeLabel = styled.span`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const EloChangeRow = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const EloChangeValue = styled.div<{$variant: 'down' | 'equal' | 'up'}>`
  align-items: center;
  animation: ${eloPop} 0.5s ease-out 0.3s both;
  color: ${({$variant}) => {
    if ($variant === 'up') return colors.palette.green[600];
    if ($variant === 'down') return colors.palette.red[600];
    return colors.palette.gray[600];
  }};
  display: flex;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  gap: 6px;
`;

export const EloNumber = styled.span`
  color: ${colors.primary};
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
`;

export const RematchNotice = styled.div`
  animation: ${fadeInUp} 0.3s ease-out 0.2s both;
  background: ${colors.palette.red[50]};
  border: 1px solid ${colors.palette.red[200]};
  border-radius: 10px;
  color: ${colors.palette.red[600]};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  margin-top: 12px;
  padding: 10px 12px;
  text-align: center;
`;

export const RematchStateText = styled.div<{$variant: 'neutral' | 'warning'}>`
  animation: ${fadeInUp} 0.3s ease-out 0.2s both;
  background: ${({$variant}) => ($variant === 'warning' ? colors.palette.red[50] : colors.palette.gray[50])};
  border: 1px solid ${({$variant}) => ($variant === 'warning' ? colors.palette.red[200] : colors.palette.gray[200])};
  border-radius: 10px;
  color: ${({$variant}) => ($variant === 'warning' ? colors.palette.red[600] : colors.secondary)};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  margin-top: 12px;
  padding: 10px 12px;
  text-align: center;
`;

export const ResultFaceIcon = styled(UIcon)<{$variant: 'loss' | 'win'}>`
  color: ${({$variant}) => ($variant === 'win' ? colors.palette.green[500] : colors.palette.red[500])};
  flex-shrink: 0;
`;

export const ResultModal = styled(UModal)`
  max-width: calc(100vw - 32px);
  width: 420px;
`;

export const ResultOutcome = styled.span<{$variant: 'loss' | 'win'}>`
  -webkit-background-clip: text;
  background: ${({$variant}) => {
    if ($variant === 'win') {
      return `linear-gradient(135deg, ${colors.palette.green[500]} 0%, ${colors.palette.green[700]} 100%)`;
    }

    return `linear-gradient(135deg, ${colors.palette.red[500]} 0%, ${colors.palette.red[700]} 100%)`;
  }};
  background-clip: text;
  color: transparent;
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.05em;
  position: relative;
  text-transform: uppercase;
  z-index: 1;
`;

export const ResultSummary = styled.div<{$variant: 'loss' | 'win'}>`
  align-items: center;
  animation: ${resultPulse} 2s ease-in-out infinite;
  background: ${({$variant}) => {
    if ($variant === 'win') {
      return `linear-gradient(145deg, ${colors.palette.green[50]} 0%, ${colors.palette.green[100]} 50%, ${colors.palette.green[50]} 100%)`;
    }

    return `linear-gradient(145deg, ${colors.palette.red[50]} 0%, ${colors.palette.red[100]} 50%, ${colors.palette.red[50]} 100%)`;
  }};
  border: 2px solid
    ${({$variant}) => {
      if ($variant === 'win') return colors.palette.green[300];

      return colors.palette.red[300];
    }};
  border-radius: 20px;
  box-shadow: ${({$variant}) => {
    if ($variant === 'win') {
      return `0 8px 32px rgba(34, 197, 94, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)`;
    }

    return `0 8px 32px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)`;
  }};
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 32px;
  overflow: hidden;
  padding: 28px 24px;
  position: relative;
  text-align: center;

  &::before {
    animation: ${resultShine} 3s ease-in-out infinite;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    width: 50%;
    z-index: 0;
  }

  &::after {
    background: ${({$variant}) => {
      if ($variant === 'win') {
        return `radial-gradient(circle at 80% 20%, ${colors.palette.green[200]} 0%, transparent 50%)`;
      }

      return `radial-gradient(circle at 80% 20%, ${colors.palette.red[200]} 0%, transparent 50%)`;
    }};
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.6;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export const ResultTnbChange = styled.div`
  align-items: center;
  animation: ${fadeInUp} 0.4s ease-out 0.2s both;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const ResultTnbChangeValue = styled.span<{$variant: 'loss' | 'win'}>`
  color: ${({$variant}) => ($variant === 'win' ? colors.palette.green[600] : colors.palette.red[600])};
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
`;
