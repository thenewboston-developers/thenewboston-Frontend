import styled, {css, keyframes} from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import UIcon from 'components/Icon';
import UUserLabel from 'components/UserLabel';
import {Description as UserLabelDescription, Username as UserLabelUsername} from 'components/UserLabel/Styles';
import {breakpoints, cardStyle, colors, fonts, radii, shadows} from 'styles';

import UTipAmounts from './TipAmounts';

const ACTION_HEIGHT = '34px';

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

const ghostPillStyle = css`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: ${radii.pill};
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${fonts.family.default};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  height: ${ACTION_HEIGHT};
  transition:
    background 0.15s ease,
    color 0.15s ease;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }
`;

// The icon color follows the parent control, so the wrapper must not run its own (slower) color transition
export const ActionIcon = styled(UIcon)`
  transition: none;
`;

export const ActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  justify-content: space-between;
  margin-top: 16px;

  @media (max-width: ${breakpoints.mini}) {
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 8px;
  }
`;

// The negative margin lines the heart glyph up with the left edge of the post content
export const ActionsLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
  margin-left: -7px;
  min-width: 0;
`;

export const CommentToggle = styled.button`
  ${ghostPillStyle};
  gap: 6px;
  padding: 0 12px 0 10px;

  @media (hover: hover) {
    &:hover {
      background: ${colors.palette.blue[50]};
      color: ${colors.palette.blue[600]};
    }
  }
`;

export const Container = styled.div`
  ${cardStyle};
  min-width: 0;
  padding: 20px 24px;

  @media (max-width: ${breakpoints.mini}) {
    border: none;
    border-bottom: 1px solid ${colors.borderSubtle};
    border-radius: 0;
    box-shadow: none;
    padding: 0;
  }
`;

export const Content = styled.div`
  color: ${colors.primary};
  font-size: 15px;
  line-height: 1.55;
  margin-top: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 16px;
  }
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
`;

export const Image = styled.img`
  border-radius: 12px;
  cursor: pointer;
  margin-top: 16px;
  max-height: 600px;
  max-width: 100%;
  object-fit: cover;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  @media (max-width: ${breakpoints.mini}) {
    border-radius: 0;
    width: 100%;

    /* The image is full bleed here, so an outer ring would be cut off at the screen edges. An outline is used for the
       inner ring because an inset box-shadow is painted underneath the image itself. */
    &:focus-visible {
      box-shadow: none;
      outline: 2px solid ${colors.palette.blue[500]};
      outline-offset: -2px;
    }
  }
`;

export const LikeButton = styled.button<{$animate: boolean; $isLiked: boolean}>`
  ${ghostPillStyle};
  color: ${({$isLiked}) => ($isLiked ? colors.accent : colors.secondary)};
  justify-content: center;
  padding: 0;
  position: relative;
  width: ${ACTION_HEIGHT};

  /* Hover is limited to real pointers so a sticky touch hover cannot make an unliked heart look liked */
  @media (hover: hover) {
    &:hover {
      background: ${colors.accentSoft};
      color: ${colors.accent};
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      background 0.15s ease,
      color 0.15s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.92);
    }

    ${({$animate}) =>
      $animate &&
      css`
        &::before,
        &::after {
          animation: ${sparkle} 0.6s ease-out;
          content: '✨';
          font-size: 12px;
          pointer-events: none;
          position: absolute;
        }

        &::before {
          left: -6px;
          top: -6px;
        }

        &::after {
          animation-delay: 0.2s;
          bottom: -6px;
          right: -6px;
        }
      `}
  }
`;

export const LikeCount = styled.button`
  ${ghostPillStyle};
  font-variant-numeric: tabular-nums;
  padding: 0 10px;

  @media (hover: hover) {
    &:hover {
      background: ${colors.whiteHover};
      color: ${colors.primary};
    }
  }
`;

export const LikeIcon = styled(ActionIcon)<{$animate: boolean}>`
  ${({$animate}) =>
    $animate &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${likeAnimation} 0.6s ease-out;
      }
    `}
`;

export const LikeWrapper = styled.div`
  align-items: center;
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
  border-radius: 4px;
  color: ${colors.palette.blue[600]};
  cursor: pointer;
  display: block;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  margin-top: 4px;
  padding: 0;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TipAmounts = styled(UTipAmounts)`
  margin-left: auto;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px 16px 0;
  }
`;

export const UserLabel = styled(UUserLabel)`
  ${UserLabelDescription} {
    font-size: 13px;
  }

  ${UserLabelUsername} {
    font-size: 15px;
  }
`;

export const VideoPlayer = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const VideoWrapper = styled.div`
  background: ${colors.black};
  border-radius: 12px;
  margin-top: 16px;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;

  @media (max-width: ${breakpoints.mini}) {
    border-radius: 0;
  }
`;
