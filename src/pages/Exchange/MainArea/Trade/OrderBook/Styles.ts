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
  font-size: 13px;
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

  h2 {
    color: ${colors.primary};
    font-size: 17px;
    font-weight: ${fonts.weight.semiBold};
    letter-spacing: -0.01em;
    line-height: 1.3;
    margin: 0 0 16px;
  }
`;

export const ColumnHeader = styled.span`
  ${eyebrowStyle};
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
  height: 32px;
  margin-bottom: 4px;
`;

export const Container = styled.div`
  ${contentWidthStyle};
  margin-bottom: 24px;
  margin-top: 16px;
`;

export const EmptyState = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  padding: 40px 20px;
  text-align: center;
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
  color: ${colors.secondary};
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
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
  height: 34px;
  position: relative;
  transition: background 0.15s ease;

  @media (hover: hover) {
    &:hover {
      background: ${colors.palette.gray[50]};
    }
  }
`;

export const OrderSection = styled.div`
  min-width: 0;
`;

export const OrderTotal = styled.span`
  ${valueMixin};
  color: ${colors.secondary};
  font-weight: ${fonts.weight.medium};
`;

export const SectionHeader = styled.div`
  align-items: baseline;
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  padding: 0 12px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 8px;
  }
`;

// eyebrowStyle with the color of the side in place of colors.secondary
export const SectionTitle = styled.h3<{$type: 'buy' | 'sell'}>`
  color: ${({$type}) => ($type === 'buy' ? POSITIVE_TEXT_COLOR : NEGATIVE_TEXT_COLOR)};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  line-height: 1.5;
  margin: 0;
  text-transform: uppercase;
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
