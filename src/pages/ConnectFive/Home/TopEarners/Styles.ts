import styled from 'styled-components';

import {fonts} from 'styles';

import {PHONE} from '../../Standings/Styles';
import {cosmos} from '../../theme';

export const Amount = styled.strong`
  align-items: baseline;
  color: ${cosmos.gold};
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  gap: 2px 6px;
  justify-content: flex-end;
  overflow-wrap: anywhere;

  small {
    color: ${cosmos.mist};
    font-size: 11px;
    font-weight: ${fonts.weight.bold};
    letter-spacing: 0.08em;
  }

  @media (max-width: ${PHONE}) {
    font-size: 15px;
  }
`;

export const AmountHead = styled.th`
  width: 160px;

  @media (max-width: ${PHONE}) {
    width: 104px;
  }
`;
