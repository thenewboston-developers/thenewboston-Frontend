import styled, {keyframes} from 'styled-components';

import UIcon from 'components/Icon';
import {Wrapper as IconWrapper} from 'components/Icon/Styles';
import UModal, {ModalBody as UModalBody, ModalFooter as UModalFooter} from 'components/Modal';
import {Header as ModalHeader} from 'components/Modal/Styles';
import {eyebrowStyle, fonts, radii} from 'styles';

import {classic} from '../../theme';
import {resultPanel} from '../theme';

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

export const EloChange = styled.div`
  align-items: center;
  animation: ${fadeInUp} 0.4s ease-out 0.15s both;
  background: #ffffff08;
  border: 1px solid #ffffff18;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 18px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const EloChangeArrow = styled(UIcon)`
  color: ${classic.textMuted};
  flex-shrink: 0;
  margin: 0 -4px;
`;

export const EloChangeLabel = styled.span`
  ${eyebrowStyle};
  color: ${classic.textMuted};
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
    if ($variant === 'up') return classic.positive;
    if ($variant === 'down') return classic.negative;
    return classic.textMuted;
  }};
  display: flex;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  gap: 6px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const EloNumber = styled.span`
  color: ${classic.text};
  font-size: 20px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
`;

export const RematchNotice = styled.div`
  animation: ${fadeInUp} 0.3s ease-out 0.2s both;
  background: ${classic.negativeSoft};
  border-radius: ${radii.medium};
  color: ${classic.negative};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
  margin-top: 12px;
  padding: 10px 14px;
  text-align: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const RematchStateText = styled.div<{$variant: 'neutral' | 'warning'}>`
  animation: ${fadeInUp} 0.3s ease-out 0.2s both;
  background: ${({$variant}) => ($variant === 'warning' ? classic.negativeSoft : classic.surfaceRaised)};
  border-radius: ${radii.medium};
  color: ${({$variant}) => ($variant === 'warning' ? classic.negative : classic.textMuted)};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
  margin-top: 16px;
  padding: 10px 14px;
  text-align: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ResultModal = styled(UModal)`
  background: ${classic.surface};
  border: 1px solid ${classic.borderStrong};
  color: ${classic.text};
  max-height: calc(100dvh - 32px);
  max-width: calc(100vw - 32px);
  overflow: hidden;
  width: 620px;

  ${ModalHeader} {
    border-color: ${classic.border};

    ${IconWrapper}:hover {
      background: ${classic.surfaceRaised};
    }
  }

  > div:first-child {
    flex-shrink: 0;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
`;

export const ResultModalBody = styled(UModalBody)`
  ${resultPanel};
  min-height: 0;
  overflow-y: auto;
  padding: 12px;

  > section {
    margin: 0;
  }
`;

export const ResultModalFooter = styled(UModalFooter)`
  border-top: 1px solid ${classic.border};
  flex-shrink: 0;
  flex-wrap: wrap;
  padding: 12px 16px;
`;

export const ResultTnbChange = styled.div`
  align-items: center;
  animation: ${fadeInUp} 0.4s ease-out 0.2s both;
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ResultTnbChangeValue = styled.span<{$variant: 'loss' | 'win'}>`
  color: ${({$variant}) => ($variant === 'win' ? classic.positive : classic.negative)};
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
`;
