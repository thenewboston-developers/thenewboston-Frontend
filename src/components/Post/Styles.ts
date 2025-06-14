import styled, {css, keyframes} from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import UIcon from 'components/Icon';
import {breakpoints, colors, fonts} from 'styles';

const likeAnimation = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }
  10% {
    transform: scale(0.8) rotate(-8deg);
  }
  30% {
    transform: scale(1.4) rotate(12deg);
  }
  50% {
    transform: scale(1.2) rotate(-5deg);
  }
  70% {
    transform: scale(1.3) rotate(3deg);
  }
  90% {
    transform: scale(1.1) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

const sparkle = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(1.5) rotate(360deg);
  }
`;

export const BoxLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  margin: 8px 0;
`;

export const LikeWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 2px;
`;

export const Container = styled.div`
  background: #fff;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px 24px;
  transition: all 0.2s ease;
`;

export const Content = styled.div`
  color: ${colors.palette.gray[800]};
  font-size: 15px;
  line-height: 1.4;
  margin-bottom: 16px;
  margin-top: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const Date = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 13px;
  font-weight: ${fonts.weight.regular};
  line-height: 1.2;
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mini}) {
    justify-content: center;
  }
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
  margin-top: -4px;
`;

export const Img = styled.img`
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 16px;
  margin-top: 12px;
  max-height: 600px;
  max-width: 100%;
  object-fit: cover;
`;

export const LongContent = styled.span`
  word-break: break-all;
`;

export const Text = styled.div`
  display: flex;
`;

export const TextContent = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const TextLink = styled.button`
  background: none;
  border: none;
  color: ${colors.palette.blue[600]};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  margin-left: 4px;
  outline: none;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.palette.blue[700]};
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }
`;

export const Top = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const LikeButton = styled.button<{$animate: boolean}>`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 4px;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.palette.gray[100]};
    border-radius: 50%;
  }

  &:active {
    transform: scale(0.95);
  }

  ${({$animate}) =>
    $animate &&
    css`
      &::before,
      &::after {
        content: '✨';
        position: absolute;
        font-size: 12px;
        animation: ${sparkle} 0.6s ease-out;
        pointer-events: none;
      }

      &::before {
        top: -8px;
        left: -8px;
      }

      &::after {
        bottom: -8px;
        right: -8px;
        animation-delay: 0.2s;
      }
    `}
`;

export const LikeIcon = styled(UIcon)<{$isLiked: boolean; $animate: boolean}>`
  & path {
    fill: ${({$isLiked}) => ($isLiked ? colors.palette.red[500] : colors.palette.gray[600])} !important;
  }

  ${({$animate}) =>
    $animate &&
    css`
      animation: ${likeAnimation} 0.6s ease-out;
    `}
`;

export const LikeCount = styled.button`
  background: transparent;
  border: none;
  color: ${colors.palette.gray[700]};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  padding: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.palette.gray[900]};
    text-decoration: underline;
  }
`;
