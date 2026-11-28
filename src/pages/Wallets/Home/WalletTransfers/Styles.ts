import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {cardStyle, colors, eyebrowStyle, fonts, radii} from 'styles';

const BADGE_SIZE = 18;
const RECEIVED_BACKGROUND = '#e6f6ec';
const RECEIVED_COLOR = '#0b7a3b';

const buttonMixin = css`
  background: ${colors.white};
  border: 1px solid ${colors.borderDarker};
  border-radius: ${radii.medium};
  color: ${colors.primary};
  cursor: pointer;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  height: 40px;
  padding: 0 18px;
  transition: background 0.15s ease;

  &:disabled {
    color: ${colors.secondary};
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${colors.palette.blue[500]};
    outline-offset: 2px;
  }

  &:hover:not(:disabled) {
    background: ${colors.whiteHover};
  }
`;

const rowMixin = css`
  align-items: flex-start;
  border-radius: ${radii.medium};
  color: ${colors.primary};
  display: flex;
  gap: 14px;
  padding: 12px;
  text-decoration: none;
`;

export const Amount = styled.div<{$isReceived: boolean}>`
  color: ${({$isReceived}) => ($isReceived ? RECEIVED_COLOR : colors.primary)};
  flex-shrink: 0;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  text-align: right;
  white-space: nowrap;
`;

export const AmountTicker = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  margin-left: 4px;
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
  position: relative;
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Container = styled.section`
  ${cardStyle};
  padding: 20px 12px 12px;
`;

export const Count = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
`;

export const DirectionBadge = styled.span<{$isReceived: boolean}>`
  align-items: center;
  background: ${({$isReceived}) => ($isReceived ? RECEIVED_BACKGROUND : colors.whiteHover)};
  border-radius: 50%;
  bottom: -2px;
  box-shadow: 0 0 0 2px ${colors.white};
  color: ${({$isReceived}) => ($isReceived ? RECEIVED_COLOR : colors.secondary)};
  display: flex;
  height: ${`${BADGE_SIZE}px`};
  justify-content: center;
  position: absolute;
  right: -4px;
  width: ${`${BADGE_SIZE}px`};
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 40px 16px 48px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  align-items: center;
  background: ${colors.whiteHover};
  border-radius: 50%;
  color: ${colors.secondary};
  display: flex;
  height: 52px;
  justify-content: center;
  margin-bottom: 16px;
  width: 52px;
`;

export const EmptyText = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 6px 0 0;
  max-width: 360px;
`;

export const EmptyTitle = styled.h4`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Footer = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.borderSubtle};
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin: 8px 12px 0;
  min-height: 60px;
  padding: 10px 0 0;
`;

export const Group = styled.div`
  & + & {
    margin-top: 8px;
  }
`;

export const GroupLabel = styled.h4`
  ${eyebrowStyle};
  padding: 8px 12px 4px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  justify-content: space-between;
  padding: 0 12px 12px;
`;

export const HeaderText = styled.div`
  flex: 1 1 220px;
  min-width: 0;
`;

export const Heading = styled.h3`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Message = styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${colors.secondary};
  display: -webkit-box;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 2px;
  overflow: hidden;
  overflow-wrap: anywhere;
`;

export const Meta = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.5;
  margin-top: 4px;
`;

export const RetryButton = styled.button`
  ${buttonMixin};
  margin-top: 16px;
`;

export const Row = styled.div`
  ${rowMixin};
`;

export const RowLink = styled(Link)`
  ${rowMixin};
  transition: background 0.15s ease;

  &:focus-visible {
    outline: 2px solid ${colors.palette.blue[500]};
    outline-offset: -2px;
  }

  &:hover {
    background: ${colors.whiteHover};
    color: ${colors.primary};
    text-decoration: none;
  }
`;

export const ShowMoreButton = styled.button`
  ${buttonMixin};
`;

export const SkeletonLines = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
`;

export const SkeletonList = styled.div`
  padding: 8px 0;
`;

export const SkeletonRow = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  padding: 12px;
`;

export const SubHeading = styled.p`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.5;
  margin: 2px 0 0;
`;

export const Title = styled.div`
  color: ${colors.primary};
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;

  strong {
    font-weight: ${fonts.weight.semiBold};
  }
`;
