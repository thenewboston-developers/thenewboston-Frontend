import {Link as ULink} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {breakpoints, cardStyle, colors, fonts, radii, shadows} from 'styles';

export type BadgeKind = 'comment' | 'like' | 'mention' | 'money' | 'neutral';

const AVATAR_SIZE = '44px';
const UNREAD_COLOR = colors.palette.blue[500];

const BADGE_COLORS: {[kind in BadgeKind]: string} = {
  comment: colors.palette.blue[500],
  like: colors.accent,
  mention: colors.palette.orange[800],
  money: colors.palette.green[700],
  neutral: colors.backgroundDark,
};

const clampLines = (lines: number) => css`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  overflow: hidden;
`;

// Links inside the card sit above the link that covers the whole card
const aboveCardLink = css`
  position: relative;
  z-index: 1;
`;

export const ActorLink = styled(ULink)`
  ${aboveCardLink};
  border-radius: 4px;
  color: ${colors.primary};
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

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

export const AvatarLink = styled(ULink)`
  ${aboveCardLink};
  border-radius: 50%;
  display: flex;
`;

export const Badge = styled.div<{$kind: BadgeKind}>`
  align-items: center;
  background: ${({$kind}) => BADGE_COLORS[$kind]};
  border: 2px solid ${colors.white};
  border-radius: 50%;
  bottom: -4px;
  color: ${colors.white};
  display: flex;
  height: 22px;
  justify-content: center;
  position: absolute;
  right: -4px;
  width: 22px;
  z-index: 1;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  min-width: 0;
`;

// Covers the whole card, so a click or tap anywhere on it opens the notification
export const CardLink = styled(ULink)`
  border-radius: inherit;
  inset: 0;
  position: absolute;
  z-index: 0;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }
`;

// Same shape and color as a comment under a post, with the corner next to the avatar of the commenter left square
export const CommentBubble = styled.div`
  background: ${colors.palette.gray[100]};
  border-radius: 4px ${radii.large} ${radii.large};
  color: ${colors.primary};
  font-size: 15px;
  line-height: 1.45;
  max-width: 100%;
  padding: 8px 14px;
  width: fit-content;
`;

export const CommentText = styled.div`
  ${clampLines(4)};
  overflow-wrap: anywhere;
  white-space: pre-line;
`;

export const Container = styled.article<{$isRead: boolean}>`
  ${cardStyle};
  display: flex;
  gap: 14px;
  isolation: isolate;
  padding: 16px 20px 16px 16px;
  position: relative;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  ${({$isRead}) =>
    !$isRead &&
    css`
      box-shadow:
        inset 3px 0 0 ${UNREAD_COLOR},
        ${shadows.card};
    `}

  @media (hover: hover) {
    &:hover {
      box-shadow: ${({$isRead}) => ($isRead ? '' : `inset 3px 0 0 ${UNREAD_COLOR}, `)}${shadows.cardHover};
    }
  }

  @media (max-width: ${breakpoints.mini}) {
    gap: 12px;
    padding: 14px 16px 14px 12px;
  }
`;

export const Detail = styled.li`
  background: ${colors.palette.gray[100]};
  border-radius: ${radii.pill};
  color: ${colors.primary};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.4;
  padding: 3px 10px;
`;

export const Details = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
`;

export const Leading = styled.div`
  align-self: flex-start;
  flex-shrink: 0;
  height: ${AVATAR_SIZE};
  position: relative;
  width: ${AVATAR_SIZE};
`;

export const Main = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Mention = styled.span`
  color: ${colors.secondary};
  font-weight: ${fonts.weight.semiBold};
`;

export const PostCard = styled.div`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  display: flex;
  gap: 12px;
  min-width: 0;
  padding: 10px 12px;
`;

// Not upper case like other small labels, since it can hold a username
export const PostCardLabel = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  margin-bottom: 2px;
`;

export const PostCardText = styled.div<{$isContext: boolean}>`
  ${clampLines(2)};
  color: ${({$isContext}) => ($isContext ? colors.secondary : colors.primary)};
  font-size: ${({$isContext}) => ($isContext ? '14px' : '15px')};
  line-height: 1.45;
  overflow-wrap: anywhere;
  white-space: pre-line;
`;

export const PostCardTextContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PostCardThumbnail = styled.img`
  border-radius: ${radii.small};
  flex-shrink: 0;
  height: 48px;
  object-fit: cover;
  width: 48px;
`;

export const PostCardWithoutText = styled.span`
  font-style: italic;
`;

export const Secondary = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.45;
`;

export const Summary = styled.div`
  color: ${colors.primary};
  font-size: 15px;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

export const SummaryContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Time = styled.time`
  color: ${colors.secondary};
  display: block;
  font-size: 13px;
  line-height: 1.3;
  margin-top: 2px;
`;

export const Tip = styled.div`
  align-items: center;
  align-self: flex-start;
  background: ${colors.palette.green[50]};
  border-radius: ${radii.pill};
  color: ${colors.palette.green[800]};
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 6px;
  line-height: 1.4;
  padding: 3px 10px 3px 4px;
`;

export const TipLogo = styled.img`
  border-radius: 50%;
  height: 18px;
  object-fit: cover;
  width: 18px;
`;

export const UnreadDot = styled.span`
  background: ${UNREAD_COLOR};
  border-radius: 50%;
  flex-shrink: 0;
  height: 10px;
  margin-top: 6px;
  width: 10px;
`;

export const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
