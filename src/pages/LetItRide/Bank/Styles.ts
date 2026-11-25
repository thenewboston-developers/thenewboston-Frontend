import styled from 'styled-components';

import {fonts} from 'styles';

import {plate, table} from '../theme';

export const Figures = styled.dl`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 20px 0 0;

  dd {
    color: ${table.ivory};
    font-size: 19px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    letter-spacing: -0.02em;
    margin: 6px 0 0;
    overflow-wrap: anywhere;
  }

  div {
    background: #050e2473;
    border: 1px solid ${table.rim};
    border-radius: 12px;
    min-width: 0;
    padding: 12px 14px;
  }

  dt {
    ${plate};
    color: ${table.mist};
    font-size: 9.5px;
  }

  small {
    color: ${table.mist};
    font-size: 11px;
    font-weight: ${fonts.weight.regular};
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Limits = styled.ul`
  list-style: none;
  margin: 8px 0 0;
  padding: 0;

  li {
    align-items: baseline;
    border-bottom: 1px solid ${table.line};
    color: ${table.mist};
    display: flex;
    flex-wrap: wrap;
    font-size: 13.5px;
    gap: 4px 12px;
    justify-content: space-between;
    padding: 10px 0;
  }

  strong {
    color: ${table.goldLight};
    font-variant-numeric: tabular-nums;
  }
`;

export const LimitsNote = styled.p`
  color: ${table.mist};
  font-size: 12px;
  margin: 10px 0 0;
`;

export const LimitsTitle = styled.h3`
  ${plate};
  color: ${table.gold};
  font-size: 10px;
  margin: 22px 0 0;
`;
