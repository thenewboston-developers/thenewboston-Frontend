import {css, RuleSet} from 'styled-components';

import {Container as BadgeContainer} from 'components/Badge/Styles';
import {ExchangeOrderStatus} from 'enums';
import {breakpoints, cardStyle, colors, eyebrowStyle, fonts, radii, shadows} from 'styles';

const SEGMENT_HEIGHT = 32;
const SEGMENTED_CONTROL_HEIGHT = 40;
const SEGMENTED_CONTROL_PADDING = 4;
// Same track as components/Tabs: reads as colors.palette.gray[100] on white panels
const SEGMENTED_TRACK_BACKGROUND = 'rgb(15 20 25 / 6%)';
// The orange palette has no step that reaches 4.5:1 on its own tints, so the darkest step is deepened to keep the hue
const WARNING_TEXT_COLOR = `color-mix(in srgb, ${colors.palette.orange[900]} 65%, ${colors.black})`;

// Text colors for gains and losses on white surfaces (both pass 4.5:1). The tinted badges below use darker steps, because
// the 50 tints lower the contrast
export const NEGATIVE_TEXT_COLOR = colors.palette.red[600];
export const POSITIVE_TEXT_COLOR = colors.palette.green[800];

export const badgeStyle = css`
  align-items: center;
  border-radius: ${radii.pill};
  display: inline-flex;
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.04em;
  line-height: 1.5;
  padding: 2px 10px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const contentWidthStyle = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  width: 100%;
`;

export const emptyStateStyle = css`
  ${cardStyle};
  padding: 56px 24px;
  text-align: center;
`;

export const emptySubtextStyle = css`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
`;

export const emptyTextStyle = css`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
  margin-bottom: 4px;
`;

const infoBadgeStyle = css`
  background: ${colors.palette.blue[50]};
  color: ${colors.palette.blue[600]};
`;

export const loaderPanelStyle = css`
  ${cardStyle};
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 200px;
`;

export const negativeBadgeStyle = css`
  background: ${colors.palette.red[50]};
  color: ${colors.palette.red[800]};
`;

export const positiveBadgeStyle = css`
  background: ${colors.palette.green[50]};
  color: ${colors.palette.green[800]};
`;

// Look of components/Tabs. The padding (which has to stay wider than the 2px focus ring of a segment) and the matching
// scroll-padding keep the ring of a focused segment from being clipped by the horizontal scroll
export const segmentedTrackStyle = css`
  background: ${SEGMENTED_TRACK_BACKGROUND};
  border-radius: ${radii.medium};
  display: flex;
  gap: 2px;
  height: ${`${SEGMENTED_CONTROL_HEIGHT}px`};
  max-width: 100%;
  overflow-x: auto;
  padding: ${`${SEGMENTED_CONTROL_PADDING}px`};
  scroll-padding: ${`${SEGMENTED_CONTROL_PADDING}px`};
  scrollbar-width: none;
  width: fit-content;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// Look of a components/Tab, for native buttons that live inside of a segmentedTrackStyle container
export const segmentStyle = css<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) => ($active ? colors.white : 'transparent')};
  border: none;
  border-radius: ${radii.small};
  box-shadow: ${({$active}) => ($active ? shadows.card : 'none')};
  color: ${({$active}) => ($active ? colors.primary : colors.secondary)};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${fonts.family.default};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${({$active}) => ($active ? fonts.weight.semiBold : fonts.weight.medium)};
  height: ${`${SEGMENT_HEIGHT}px`};
  justify-content: center;
  outline: none;
  padding: 0 14px;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease,
    color 0.15s ease;
  user-select: none;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${({$active}) => ($active ? `${shadows.card}, ${shadows.focusRing}` : shadows.focusRing)};
  }

  @media (hover: hover) {
    &:hover {
      color: ${colors.primary};
    }
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 10px;
  }
`;

// The cells own the background (instead of the row) so that a sticky first column stays opaque while the rest of the row
// scrolls underneath it
export const tableBodyStyle = css`
  td {
    background: ${colors.white};
    transition: background 0.15s ease;
  }

  tr:not(:last-child) td {
    border-bottom: 1px solid ${colors.borderSubtle};
  }

  @media (hover: hover) {
    tr:hover td {
      background: ${colors.palette.gray[50]};
    }
  }
`;

export const tableDataStyle = css`
  color: ${colors.primary};
  font-size: 14px;
  height: 60px;
  padding: 0 12px;
  vertical-align: middle;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    height: 56px;
    padding: 0 8px;
  }
`;

export const tableHeadStyle = css`
  ${eyebrowStyle};
  background: ${colors.palette.gray[50]};
  border-bottom: 1px solid ${colors.borderSubtle};
  height: 44px;
  padding: 0 12px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    height: 40px;
    padding: 0 8px;
  }
`;

// Separate borders (instead of collapsed ones) keep the row separators attached to a sticky first column
export const tableStyle = css`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
`;

// The wrapper owns the card look and its horizontal scroll is the safety net for values that outgrow their column
export const tableWrapperStyle = css`
  ${cardStyle};
  overflow-x: auto;
  overflow-y: hidden;
`;

// Keeps a label available to assistive technology while removing it from the visual layout
export const visuallyHiddenStyle = css`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const warningBadgeStyle = css`
  background: ${colors.palette.orange[50]};
  color: ${colors.primary};

  @supports (color: color-mix(in srgb, red, blue)) {
    color: ${WARNING_TEXT_COLOR};
  }
`;

const fillStatusBadgeStyles: Record<number, RuleSet> = {
  [ExchangeOrderStatus.CANCELLED]: negativeBadgeStyle,
  [ExchangeOrderStatus.FILLED]: positiveBadgeStyle,
  [ExchangeOrderStatus.OPEN]: infoBadgeStyle,
  [ExchangeOrderStatus.PARTIALLY_FILLED]: warningBadgeStyle,
};

// FillStatusBadge does not accept a className, so the element wrapped around it restyles the shared Badge as a tinted
// pill
export const fillStatusBadgeWrapperStyle = css<{$status: number}>`
  align-items: center;
  display: inline-flex;

  ${BadgeContainer} {
    ${badgeStyle};
    ${({$status}) => fillStatusBadgeStyles[$status]};
  }
`;
