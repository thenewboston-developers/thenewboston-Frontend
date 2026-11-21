import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts, hiddenScroll, pagePadding, radii, shadows} from 'styles';

import {contentWidthStyle} from '../mixins';

const ORDER_GAP = 16;

export const BrowseLink = styled(ULink)`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.pill};
  color: ${colors.palette.blue[900]};
  display: inline-flex;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: center;
  min-height: 44px;
  padding: 10px 20px;
  text-align: center;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: 2px solid ${colors.white};
    outline-offset: 3px;
  }

  &:hover {
    background: ${colors.palette.blue[50]};
    text-decoration: none;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  ${hiddenScroll};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  ${contentWidthStyle};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const EmptyDescription = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 1.7;
  margin: 12px 0 24px;
  max-width: 420px;
`;

export const EmptyIcon = styled.div`
  align-items: center;
  background: ${colors.palette.blue[50]};
  border: 1px solid ${colors.palette.blue[100]};
  border-radius: 20px;
  color: ${colors.palette.blue[600]};
  display: flex;
  height: 72px;
  justify-content: center;
  margin-bottom: 24px;
  width: 72px;
`;

export const EmptyState = styled.div`
  ${cardStyle};
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 64px 24px;
  text-align: center;
`;

export const EmptyTitle = styled.h2`
  color: ${colors.palette.blue[900]};
  font-size: 24px;
  letter-spacing: -0.03em;
`;

export const EndMessageContainer = styled.div`
  margin-top: 20px;
`;

export const HistoryHeader = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: space-between;
  margin: 0 0 16px;
`;

export const HistoryLabel = styled.span`
  color: ${colors.secondary};
  font-size: 14px;
`;

export const HistoryTitle = styled.h2`
  color: ${colors.palette.blue[900]};
  font-size: 20px;
  letter-spacing: -0.025em;
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${`${ORDER_GAP}px`};
`;

export const OrderSkeletonContainer = styled.div`
  .react-loading-skeleton {
    border-radius: ${radii.large};
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${`${ORDER_GAP}px`};

  ${OrderContainer} + & {
    margin-top: ${`${ORDER_GAP}px`};
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
  }
`;
