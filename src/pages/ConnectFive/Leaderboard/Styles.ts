import styled from 'styled-components';

import {breakpoints, fonts, pagePadding} from 'styles';

import {PHONE} from '../Standings/Styles';
import {classic} from '../theme';

export const Container = styled.div`
  ${pagePadding};
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  width: 100%;
`;

export const Elo = styled.div<{$inLine: boolean}>`
  color: ${({$inLine}) => ($inLine ? classic.accent : classic.text)};
  font-size: 17px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  white-space: nowrap;

  @media (max-width: ${PHONE}) {
    font-size: 15px;
  }
`;

export const EloCell = styled.td`
  text-align: right;
`;

export const EloHead = styled.th`
  width: 120px;

  /* Outranks the left aligned headers of the standings table */
  && {
    text-align: right;
  }

  @media (max-width: ${PHONE}) {
    width: 84px;
  }
`;

export const RecordCell = styled.td`
  color: ${classic.textMuted};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  white-space: nowrap;

  /* Phones have no room for the record column, StackedRecord shows the value below the ELO instead */
  @media (max-width: ${breakpoints.mini}) {
    display: none;
  }
`;

export const RecordHead = styled.th`
  width: 150px;

  @media (max-width: ${breakpoints.mini}) {
    display: none;
  }
`;

// Only rendered on phones, where the record column is hidden
export const StackedRecord = styled.div`
  color: ${classic.textMuted};
  display: none;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  margin-top: 2px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mini}) {
    display: block;
  }
`;
