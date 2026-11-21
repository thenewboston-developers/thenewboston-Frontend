import styled, {css} from 'styled-components';

import {breakpoints, cardStyle, colors, eyebrowStyle, fonts, radii} from 'styles';

import {contentWidthStyle, NEGATIVE_TEXT_COLOR, POSITIVE_TEXT_COLOR} from '../../mixins';

// Shared by the column headers and the order rows, so the three columns line up: amount on the left, price and total
// right aligned like the numbers they hold
const columnsMixin = css`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 0 12px;

  /* Limited to the value cells (spans), so the hover tooltip that is rendered inside of a row keeps its own alignment */
  > span:not(:first-child) {
    text-align: right;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
    padding: 0 8px;
  }
`;

const valueMixin = css`
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// The overflow stays visible, the tooltip of the first rows reaches above the card
export const Box = styled.div`
  ${cardStyle};
  padding: 24px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const ColumnHeader = styled.span`
  ${eyebrowStyle};
  font-size: 12px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ColumnHeaders = styled.div`
  ${columnsMixin};
  align-items: center;
  background: ${colors.palette.gray[50]};
  border-radius: ${radii.small};
  height: 40px;
  margin-bottom: 4px;
`;

export const Container = styled.div`
  ${contentWidthStyle};
  margin-bottom: 24px;
  margin-top: 24px;
`;

export const Description = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 6px 0 0;
`;

export const EmptySide = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  padding: 32px 12px;
  text-align: center;
`;

export const EmptyState = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  padding: 40px 20px;
  text-align: center;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Heading = styled.h2`
  color: ${colors.primary};
  font-size: 20px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0;
`;

export const OrderBookContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${breakpoints.tablet}) {
    gap: 20px;
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const OrderCount = styled.span`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.pill};
  color: ${colors.secondary};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  padding: 2px 8px;
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const OrderPrice = styled.span<{$type: 'buy' | 'sell'}>`
  ${valueMixin};
  color: ${({$type}) => ($type === 'buy' ? POSITIVE_TEXT_COLOR : NEGATIVE_TEXT_COLOR)};
  font-weight: ${fonts.weight.semiBold};
`;

export const OrderQuantity = styled.span`
  ${valueMixin};
  color: ${colors.primary};
  font-weight: ${fonts.weight.medium};
`;

// Hovering a row only reveals its tooltip, so the row does not present itself as clickable
export const OrderRow = styled.div`
  ${columnsMixin};
  align-items: center;
  border-radius: ${radii.small};
  cursor: default;
  height: 40px;
  position: relative;
  transition: background 0.15s ease;

  @media (hover: hover) {
    &:hover {
      background: ${colors.palette.gray[50]};
    }
  }
`;

export const OrderSection = styled.div<{$type: 'buy' | 'sell'}>`
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  border-top: 3px solid ${({$type}) => ($type === 'buy' ? colors.palette.green[800] : colors.palette.red[600])};
  min-width: 0;
  padding: 16px 12px 12px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px 8px 8px;
  }
`;

export const OrderTotal = styled.span`
  ${valueMixin};
  color: ${colors.secondary};
  font-weight: ${fonts.weight.medium};
`;

export const SectionHeader = styled.div`
  align-items: baseline;
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding: 0 12px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 8px;
  }
`;

export const SectionTitle = styled.h3<{$type: 'buy' | 'sell'}>`
  color: ${({$type}) => ($type === 'buy' ? POSITIVE_TEXT_COLOR : NEGATIVE_TEXT_COLOR)};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  margin: 0;
`;

export const Spread = styled.div`
  align-items: baseline;
  background: ${colors.palette.gray[50]};
  border-radius: ${radii.medium};
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
  padding: 10px 12px;
`;

export const SpreadLabel = styled.span`
  ${eyebrowStyle};
`;

export const SpreadValue = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
`;
