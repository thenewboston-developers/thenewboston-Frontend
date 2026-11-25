import styled, {css} from 'styled-components';

import {fonts} from 'styles';

import {plate, table} from '../theme';

export const Eyebrow = styled.p`
  ${plate};
  color: ${table.gold};
  margin: 0 0 4px;
`;

export const Footnote = styled.p`
  color: ${table.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 12px 0 0;
`;

export const Heading = styled.h3`
  color: ${table.ivory};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  margin: 0 0 10px;
`;

export const Paytable = styled.section`
  background: #050e2466;
  border: 1px solid ${table.rim};
  border-radius: 16px;
  min-width: 0;
  padding: 16px 16px 18px;
`;

export const Row = styled.tr<{$held: boolean; $won: boolean}>`
  td,
  th {
    border-top: 1px solid ${table.line};
    padding: 8px 6px;
    transition: background 0.3s ease;
  }

  td {
    color: ${table.goldLight};
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.semiBold};
    text-align: right;
    white-space: nowrap;
  }

  td:last-child {
    color: ${table.mist};
  }

  th {
    color: ${table.ivory};
    font-weight: ${fonts.weight.semiBold};
    text-align: left;
  }

  ${({$held}) =>
    $held &&
    css`
      td,
      th {
        background: ${table.goldSoft};
      }
    `}

  ${({$won}) =>
    $won &&
    css`
      td,
      td:last-child,
      th {
        background: #7fe3b026;
        color: ${table.win};
      }
    `}
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13px;
  line-height: 1.4;
  width: 100%;

  thead th {
    ${plate};
    color: ${table.mist};
    font-size: 10px;
    padding: 0 6px 7px;
    text-align: right;

    &:first-child {
      text-align: left;
    }

    small {
      display: block;
      font-size: 9px;
      letter-spacing: 0.08em;
      opacity: 0.8;
    }
  }
`;

export const Tag = styled.span<{$won: boolean}>`
  ${plate};
  border: 1px solid ${({$won}) => ($won ? table.win : table.gold)};
  border-radius: 999px;
  color: ${({$won}) => ($won ? table.win : table.goldLight)};
  display: inline-block;
  font-size: 8.5px;
  margin-left: 8px;
  padding: 2px 7px;
  vertical-align: 1px;
  white-space: nowrap;
`;
