import {css} from 'styled-components';

import {BadgeStyle} from 'components/Badge';
import {breakpoints, cardStyle, colors, eyebrowStyle, fonts, radii, shadows} from 'styles';

// The two column layout of a match starts right above breakpoints.tablet, where the full navigation and the sidebar
// squeeze the board column. The player rows tighten their pieces and their clock there to leave room for the username
export const COMPACT_PLAYER_ROW_QUERY = `(min-width: ${parseInt(breakpoints.tablet, 10) + 1}px) and (max-width: 1160px)`;

// Translucent colors.primary (same track as components/Tabs): reads as colors.palette.gray[100] on white panels and
// stays visible on the page background
export const SEGMENTED_TRACK_BACKGROUND = 'rgb(15 20 25 / 6%)';

// No step of the orange palette reaches 4.5:1 on top of orange[50], so the warning pill uses a darker shade of that hue
const WARNING_TEXT_COLOR = '#8f4700';

// A white piece has no edge of its own, the tight first shadow outlines it on all sides on top of white surfaces
export const WHITE_PIECE_OUTLINE =
  'drop-shadow(0 0 0.75px rgba(0, 0, 0, 0.75)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35))';

// Light gray block that groups the label/value rows inside of a card
export const detailsBlockStyle = css`
  background: ${colors.palette.gray[50]};
  border-radius: ${radii.medium};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 16px;
  width: 100%;
`;

export const detailsLabelStyle = css`
  ${eyebrowStyle};
  flex-shrink: 0;
`;

export const detailsRowStyle = css`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  min-height: 20px;
  width: 100%;
`;

export const detailsValueStyle = css`
  color: ${colors.primary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: right;
`;

export const linkFocusStyle = css`
  border-radius: 4px;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }
`;

export const loaderPanelStyle = css`
  ${cardStyle};
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 200px;
`;

export const panelStyle = css`
  ${cardStyle};
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: 20px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px;
  }
`;

export const panelSubtitleStyle = css`
  color: ${colors.secondary};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  line-height: 1.5;
`;

export const panelTitleStyle = css`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin: 0;
`;

export const sectionTitleStyle = css`
  color: ${colors.primary};
  font-size: 17px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin: 0;
`;

// Restyles components/Badge as a soft tinted pill (apply it to a styled(UBadge), which receives the badgeStyle prop)
export const statusBadgeStyle = css<{badgeStyle: BadgeStyle}>`
  border-radius: ${radii.pill};
  flex-shrink: 0;
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 2px 10px;

  ${({badgeStyle}) => {
    if (badgeStyle === BadgeStyle.danger || badgeStyle === BadgeStyle.lightRed) {
      return css`
        background-color: ${colors.palette.red[50]};
        color: ${colors.palette.red[800]};
      `;
    }

    if (badgeStyle === BadgeStyle.success || badgeStyle === BadgeStyle.lightGreen) {
      return css`
        background-color: ${colors.palette.green[50]};
        color: ${colors.palette.green[800]};
      `;
    }

    if (badgeStyle === BadgeStyle.warning) {
      return css`
        background-color: ${colors.palette.orange[50]};
        color: ${WARNING_TEXT_COLOR};
      `;
    }

    if (badgeStyle === BadgeStyle.neutral) {
      return css`
        background-color: ${colors.palette.gray[100]};
        color: ${colors.secondary};
      `;
    }

    return css`
      background-color: ${colors.palette.blue[50]};
      color: ${colors.palette.blue[600]};
    `;
  }}
`;

// The card table rules below mirror pages/Currencies/Detail/mixins, copied to avoid coupling the two pages
export const tableBodyStyle = css`
  tr {
    transition: background 0.15s ease;
  }

  @media (hover: hover) {
    tr:hover {
      background: ${colors.palette.gray[50]};
    }
  }

  tr:not(:last-child) td {
    border-bottom: 1px solid ${colors.borderSubtle};
  }
`;

export const tableDataStyle = css`
  color: ${colors.primary};
  font-size: 14px;
  padding: 14px 24px;
  vertical-align: middle;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 12px;
  }
`;

export const tableHeadStyle = css`
  ${eyebrowStyle};
  background: ${colors.palette.gray[50]};
  border-bottom: 1px solid ${colors.borderSubtle};
  padding: 12px 24px;
  text-align: left;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 12px;
  }
`;

// The fixed layout keeps the table as wide as its wrapper on small screens: the columns with an explicit width keep it,
// the remaining column takes what is left and truncates its content instead of growing the table
export const tableStyle = css`
  border-collapse: collapse;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    table-layout: fixed;
  }
`;

// The wrapper owns the card look and its horizontal scroll is the safety net for values that outgrow their column
export const tableWrapperStyle = css`
  ${cardStyle};
  overflow-x: auto;
  overflow-y: hidden;
`;
