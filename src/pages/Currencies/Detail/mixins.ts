import {css} from 'styled-components';

import {breakpoints, cardStyle, colors, fonts} from 'styles';

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

export const loaderPanelStyle = css`
  ${cardStyle};
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 200px;
`;

export const tableBodyStyle = css`
  tr {
    transition: background 0.15s ease;
  }

  tr:hover {
    background: ${colors.palette.gray[50]};
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
  background: ${colors.palette.gray[50]};
  border-bottom: 1px solid ${colors.borderSubtle};
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  padding: 12px 24px;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 12px;
  }
`;

// The fixed layout keeps the table as wide as its wrapper on small screens: the columns with an explicit width keep it,
// the remaining column takes what is left and truncates or wraps its content instead of growing the table
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
